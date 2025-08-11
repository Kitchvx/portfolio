"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="backdrop-blur supports-[backdrop-filter]:bg-neutral-900/60 sticky top-0 z-50 border-b border-white/10">
      <nav className="container flex h-14 items-center gap-4">
        <Link href="/" className="font-semibold tracking-tight">
          nkitch<span className="text-brand">.com</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className="relative rounded-xl px-3 py-1.5 text-sm hover:bg-white/5"
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 -z-10 rounded-xl bg-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
