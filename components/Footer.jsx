export default function Footer() {
  return (
    <footer className="container py-10 text-sm text-neutral-400">
      <div className="flex items-center justify-between">
        <p>© {new Date().getFullYear()} Nathan Kitching</p>
        <p className="opacity-80">
          Built with Next.js, Tailwind CSS & Framer Motion
        </p>
      </div>
    </footer>
  );
}
