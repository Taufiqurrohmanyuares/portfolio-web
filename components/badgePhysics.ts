// Simulasi fisika tali + kartu (verlet integration), tanpa dependency.
// Titik 0 = jangkar (tetap), titik 1..N-1 = tali, titik N = pusat massa kartu.

export const ROPE_POINTS = 8;
export const CLIP_H = 41; // jarak dari tepi atas kartu ke titik pivot (cincin klip)

const GRAVITY = 0.85; // px per langkah^2 (langkah = 1/60 detik)
const DAMPING = 0.994;
const ITERATIONS = 14;
const BODY_INV_MASS = 0.25; // kartu lebih "berat" daripada tali

export type Point = { x: number; y: number; px: number; py: number; im: number };

function constrain(a: Point, b: Point, len: number, rigid: boolean) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const d = Math.hypot(dx, dy) || 1e-4;
  if (!rigid && d <= len) return; // tali boleh kendur, tapi tidak boleh melar
  const w = a.im + b.im;
  if (w === 0) return;
  const k = (d - len) / d / w;
  a.x += dx * k * a.im;
  a.y += dy * k * a.im;
  b.x -= dx * k * b.im;
  b.y -= dy * k * b.im;
}

export class BadgeSim {
  readonly pts: Point[] = [];
  private readonly segLen: number;
  private target: { x: number; y: number } | null = null;

  constructor(
    readonly ax: number,
    readonly ay: number,
    readonly ropeLen: number,
    readonly rod: number,
    private readonly minX: number,
    private readonly maxX: number
  ) {
    this.segLen = ropeLen / (ROPE_POINTS - 1);
    for (let i = 0; i < ROPE_POINTS; i++) {
      const y = ay + this.segLen * i;
      this.pts.push({ x: ax, y, px: ax, py: y, im: i === 0 ? 0 : 1 });
    }
    const by = this.pts[ROPE_POINTS - 1].y + rod;
    this.pts.push({ x: ax, y: by, px: ax, py: by, im: BODY_INV_MASS });
  }

  get clip() {
    return this.pts[ROPE_POINTS - 1];
  }
  get body() {
    return this.pts[ROPE_POINTS];
  }
  get dragging() {
    return this.target !== null;
  }
  // Sudut kartu (radian, searah jarum jam positif) mengikuti arah klip -> pusat kartu
  get angle() {
    return Math.atan2(-(this.body.x - this.clip.x), this.body.y - this.clip.y);
  }

  // Batasi target seret: tetap di dalam stage dan dalam jangkauan tali
  clampTarget(x: number, y: number) {
    x = Math.min(this.maxX, Math.max(this.minX, x));
    const dx = x - this.ax;
    const dy = y - this.ay;
    const reach = this.ropeLen + this.rod - 2;
    const d = Math.hypot(dx, dy);
    if (d > reach) {
      x = this.ax + (dx * reach) / d;
      y = this.ay + (dy * reach) / d;
    }
    return { x, y };
  }

  setTarget(x: number, y: number) {
    this.target = this.clampTarget(x, y);
  }
  release() {
    this.target = null;
  }

  // Dorongan awal ke samping (px per langkah), makin besar ke arah kartu
  kick(vx: number) {
    for (let i = 1; i < this.pts.length; i++) this.pts[i].px -= (vx * i) / (this.pts.length - 1);
  }
  // Senggolan kecil (mis. kursor lewat di atas kartu)
  nudge(vx: number, vy: number) {
    this.body.px -= vx;
    this.body.py -= vy;
  }

  step() {
    const body = this.body;
    body.im = this.target ? 0 : BODY_INV_MASS;

    for (let i = 1; i < this.pts.length; i++) {
      const p = this.pts[i];
      if (p === body && this.target) continue;
      const vx = (p.x - p.px) * DAMPING;
      const vy = (p.y - p.py) * DAMPING;
      p.px = p.x;
      p.py = p.y;
      p.x += vx;
      p.y += vy + GRAVITY;
    }

    if (this.target) {
      body.px = body.x; // simpan kecepatan terakhir supaya bisa "dilempar" saat dilepas
      body.py = body.y;
      body.x = this.target.x;
      body.y = this.target.y;
    }

    for (let it = 0; it < ITERATIONS; it++) {
      for (let i = 0; i < ROPE_POINTS - 1; i++) {
        constrain(this.pts[i], this.pts[i + 1], this.segLen, false);
      }
      constrain(this.clip, body, this.rod, true);
    }
  }

  energy() {
    let e = 0;
    for (const p of this.pts) e += Math.abs(p.x - p.px) + Math.abs(p.y - p.py);
    return e;
  }
}