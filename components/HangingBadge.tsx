"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { BadgeSim, CLIP_H, ROPE_POINTS } from "@/components/badgePhysics";

type Props = {
  image: string;
  firstName: string;
  lastName: string;
  role: string;
  handle: string;
  field: string;
  contactHref: string;
};

const STEP = 1 / 60;
const LANYARD_TEXT = "TAUFIQURROHMAN YUARES  •  WEB DEVELOPER  •  DATA / AI  •  ";

export default function HangingBadge({
  image,
  firstName,
  lastName,
  role,
  handle,
  field,
  contactHref,
}: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<SVGPathElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  useEffect(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    const rope = ropeRef.current;
    const sheen = sheenRef.current;
    if (!stage || !card || !rope) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) card.style.cursor = "default";

    let sim: BadgeSim | null = null;
    let W = 0;
    let raf = 0;
    let last = 0;
    let acc = 0;
    let calm = 0;
    let first = true;
    let grab = { ox: 0, oy: 0 };

    // Hitung ukuran kartu & panjang tali dari ukuran area (stage)
    const build = () => {
      const r = stage.getBoundingClientRect();
      if (r.width < 10 || r.height < 10) return false;
      W = Math.min(360, Math.max(240, r.width - 40));
      const H = W * 1.3;
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      const ay = desktop ? -24 : 0; // di desktop tali muncul dari luar tepi atas layar
      const rod = CLIP_H + H / 2;
      const ropeLen = Math.max(90, r.height / 2 - CLIP_H - H / 2 - ay);
      card.style.width = `${W}px`;
      card.style.height = `${H}px`;
      card.style.transformOrigin = `${W / 2}px ${-CLIP_H}px`;
      sim = new BadgeSim(r.width / 2, ay, ropeLen, rod, W / 2 + 4, r.width - W / 2 - 4);
      return true;
    };

    const render = () => {
      if (!sim) return;
      const p = sim.pts;
      let d = `M${p[0].x.toFixed(1)} ${p[0].y.toFixed(1)}`;
      for (let i = 1; i < ROPE_POINTS - 1; i++) {
        const mx = (p[i].x + p[i + 1].x) / 2;
        const my = (p[i].y + p[i + 1].y) / 2;
        d += ` Q${p[i].x.toFixed(1)} ${p[i].y.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
      }
      const c = sim.clip;
      d += ` L${c.x.toFixed(1)} ${c.y.toFixed(1)}`;
      rope.setAttribute("d", d);

      const a = sim.angle;
      card.style.transform = `translate3d(${(c.x - W / 2).toFixed(2)}px, ${(c.y + CLIP_H).toFixed(
        2
      )}px, 0) rotate(${a.toFixed(4)}rad)`;
      if (sheen) sheen.style.backgroundPosition = `${50 + a * 90}% 0`;
    };

    const frame = (t: number) => {
      raf = 0;
      if (!sim) return;
      if (!last) last = t;
      acc += Math.min((t - last) / 1000, 0.05);
      last = t;
      let n = 0;
      while (acc >= STEP && n < 4) {
        sim.step();
        acc -= STEP;
        n++;
      }
      render();
      calm = sim.energy() < 0.15 && !sim.dragging ? calm + 1 : 0;
      if (calm < 45) raf = requestAnimationFrame(frame);
      else {
        last = 0;
        acc = 0;
      }
    };

    // Bangunkan loop animasi (otomatis tidur saat kartu sudah diam)
    const wake = () => {
      calm = 0;
      if (!raf && !reduced) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    const toStage = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onMove = (e: PointerEvent) => {
      if (!sim || !sim.dragging) return;
      const p = toStage(e);
      sim.setTarget(p.x + grab.ox, p.y + grab.oy);
      wake();
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      if (sim) sim.release();
      if (!reduced) card.style.cursor = "";
      wake();
    };

    const onDown = (e: PointerEvent) => {
      if (reduced || !sim) return;
      // Biarkan tombol/tautan (mis. "Contact Me") tetap bisa diklik
      if ((e.target as HTMLElement).closest("a, button")) return;
      const p = toStage(e);
      grab = { ox: sim.body.x - p.x, oy: sim.body.y - p.y };
      sim.setTarget(sim.body.x, sim.body.y);
      card.style.cursor = "grabbing";
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
      wake();
    };

    // Kursor yang lewat di atas kartu menyenggolnya sedikit
    const onHover = (e: PointerEvent) => {
      if (reduced || !sim || sim.dragging || e.pointerType !== "mouse") return;
      const cap = (v: number) => Math.max(-3, Math.min(3, v));
      sim.nudge(cap(e.movementX * 0.08), cap(e.movementY * 0.03));
      wake();
    };

    card.addEventListener("pointerdown", onDown);
    card.addEventListener("pointermove", onHover);

    const ro = new ResizeObserver(() => {
      if (sim) sim.release();
      if (!build() || !sim) return;
      if (first) {
        first = false;
        if (!reduced) sim.kick(5.5); // ayunan pembuka
      }
      render();
      card.style.opacity = "1";
      wake();
    });
    ro.observe(stage);

    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      card.removeEventListener("pointerdown", onDown);
      card.removeEventListener("pointermove", onHover);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="absolute inset-0 select-none max-md:[mask-image:linear-gradient(to_bottom,transparent,black_90px)]"
    >
      {/* Tali lanyard */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <path id={`rope-${uid}`} ref={ropeRef} />
          <linearGradient id={`metal-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e2e8f0" />
            <stop offset="0.5" stopColor="#94a3b8" />
            <stop offset="1" stopColor="#64748b" />
          </linearGradient>
        </defs>
        <use
          href={`#rope-${uid}`}
          fill="none"
          stroke="#1a2250"
          strokeWidth={20}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <use
          href={`#rope-${uid}`}
          fill="none"
          stroke="#2e3a78"
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text fill="#c9d6ff" fontSize={8} fontWeight={700} letterSpacing={2.4} dy={3}>
          <textPath href={`#rope-${uid}`}>{LANYARD_TEXT.repeat(8)}</textPath>
        </text>
      </svg>

      {/* Kartu: posisi & sudut diatur oleh simulasi fisika */}
      <div
        ref={cardRef}
        className="absolute left-0 top-0 cursor-grab opacity-0 transition-opacity duration-700 will-change-transform"
        style={{ touchAction: "pan-y" }}
      >
        {/* Klip logam */}
        <svg
          width="36"
          height="66"
          viewBox="0 0 36 66"
          className="pointer-events-none absolute left-1/2 z-20 -ml-[18px]"
          style={{ top: -(CLIP_H + 9) }}
          aria-hidden="true"
        >
          <circle cx="18" cy="9" r="6.5" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
          <rect x="12" y="16" width="12" height="22" rx="4" fill={`url(#metal-${uid})`} stroke="#475569" />
          <rect x="7" y="42" width="22" height="16" rx="5" fill={`url(#metal-${uid})`} stroke="#475569" />
          <rect x="14" y="47" width="8" height="5" rx="2.5" fill="#0f172a" />
        </svg>

        {/* Badan kartu */}
        <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border border-white/15 bg-[#0C1432] shadow-[0_30px_80px_-20px_rgba(74,117,255,0.4)]">
          <Image
            src={image}
            alt={`Foto ${firstName} ${lastName}`}
            fill
            sizes="360px"
            className="pointer-events-none object-cover object-center"
            draggable={false}
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

          {/* Kilau yang bergeser mengikuti sudut kartu */}
          <div
            ref={sheenRef}
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{
              backgroundImage:
                "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.55) 48%, transparent 60%)",
              backgroundSize: "250% 100%",
              backgroundPosition: "50% 0",
            }}
          />

          <div className="absolute left-7 right-7 top-9">
            <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              {firstName} <span className="text-[#FFC53D]">{lastName}</span>
            </h3>
            <p className="mt-1.5 text-sm font-medium text-white/80">{role}</p>
          </div>

          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur-sm">
            <div>
              <p className="text-sm font-bold leading-tight text-slate-900">{handle}</p>
              <p className="mt-0.5 text-xs font-medium text-slate-500">{field}</p>
            </div>
            <a
              href={contactHref}
              className="rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-indigo-600"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}