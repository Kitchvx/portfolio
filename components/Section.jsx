"use client";
import { motion } from "framer-motion";
export default function Section({ title, subtitle, children }) {
  return (
    <section className="mb-10">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-semibold tracking-tight"
      >
        {title}
      </motion.h2>
      {subtitle && <p className="mt-1 text-neutral-400">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}
