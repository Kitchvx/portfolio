"use client";
import { motion } from "framer-motion";
import Link from "next/link";
export default function ProjectCard({ title, summary, tags = [], href = "#" }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="card p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-neutral-400">{summary}</p>
          {tags?.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-white/5 px-2 py-1 text-xs text-neutral-300 ring-1 ring-white/10"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link
          href={href}
          className="rounded-lg bg-brand/20 px-3 py-1.5 text-sm ring-1 ring-brand/40 hover:bg-brand/30"
        >
          View
        </Link>
      </div>
    </motion.article>
  );
}
