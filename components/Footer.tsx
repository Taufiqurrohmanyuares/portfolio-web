export default function Footer() {
  return (
    <footer className="py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-jade-inkMuted text-xs">
      <p>© {new Date().getFullYear()} Nama Kamu. All rights reserved.</p>
      <p>Built with Next.js &amp; Tailwind CSS</p>
    </footer>
  );
}
