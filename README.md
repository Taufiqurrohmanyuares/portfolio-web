# Portfolio Jade Horizon (Versi Playful)

Website portfolio pribadi dengan Next.js App Router, Tailwind CSS, dan Framer Motion.
Desain terinspirasi dari layout playful/rounded dengan warna Jade Horizon versi terang.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Gambar yang perlu ditambahkan ke folder public/

- `profile.jpg` - foto profil kamu (dipakai di Hero dan About)
- `project-1.jpg`, `project-2.jpg`, `project-3.jpg` - screenshot/mockup masing-masing project (dipakai di Projects)

Kalau gambar belum ada, area gambar akan tampil kosong/blank, tapi website tetap jalan normal.

## Sebelum deploy

- Ganti "Nama Kamu" di semua komponen (Hero, Navbar, About, Footer) dengan nama asli kamu
- Isi data project asli di `components/Projects.tsx`
- Sesuaikan catatan belajar di `components/LearningJournal.tsx`
- Tambahkan file `cv.pdf` kamu ke folder `public/`
- Sambungkan form contact ke layanan seperti Formspree, EmailJS, atau Resend

## Build

```bash
npm run build
```

## Deploy ke Vercel

1. Push project ini ke GitHub
2. Login ke vercel.com dengan akun GitHub
3. "Add New Project" -> pilih repo ini
4. Klik Deploy
