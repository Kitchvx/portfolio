"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import dynamic from "next/dynamic";
import ProjectCard from "@/components/ProjectCard";
import data from "@/data/projects.json";
import Link from "next/link";

const LatestCommits = dynamic(() => import("@/components/LatestCommits"), {
  ssr: false, // don't render on the server or other routes
});

export default function Home() {
  const featured = data.slice(0, 4);

  return (
    <div className="space-y-10">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-8"
      >
        <h1 className="text-3xl font-bold tracking-tight">Nathan Kitching</h1>
        <p className="mt-2 text-neutral-300">
          Homelabber • IT Technician • Rookie Web Dev
        </p>
        <p className="mt-4 text-neutral-400 text-sm leading-relaxed max-w-2xl">
          Welcome to my corner of the internet. I break and build things in
          equal measure, tinker with homelab stacks, and ship small web apps
          when the caffeine hits. This is by no means a professional "hire me"
          portfolio, just something to use as bragging rights on how I complete
          and publish a grand total of 1 project every couple of years. With
          that being said, hire me!
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/projects"
            className="rounded-xl bg-brand px-4 py-2 text-sm font-medium hover:bg-brand-dark"
          >
            See projects
          </Link>
          <Link
            href="/contact"
            className="rounded-xl ring-1 ring-white/15 px-4 py-2 text-sm hover:bg-white/5"
          >
            Contact
          </Link>
        </div>
      </motion.section>
      <Section
        title="Featured projects"
        subtitle="A few things I’ve lost my mind over creating."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard
              key={p.slug}
              title={p.title}
              summary={p.summary}
              tags={p.tags}
              href={`/projects/${p.slug}`}
            />
          ))}
        </div>
        <div className="mt-4">
          <Link
            href="/projects"
            className="text-sm text-neutral-300 underline-offset-4 hover:underline"
          >
            View all projects →
          </Link>
        </div>
      </Section>
      <div className="space-y-10">
        <Section title="Latest commits" subtitle="Fresh from GitHub">
          <LatestCommits
            username="Kitchvx"
            fallbackRepos={["Kitchvx/nkitch-portfolio"]}
          />
        </Section>
      </div>

      <Section title="About" subtitle="Quick snapshot">
        <div className="card p-6 text-sm text-neutral-300">
          <ul className="grid gap-2 sm:grid-cols-2">
            <li>• Based in the UK</li>
            <li>• Tech Stack: Next.js, Tailwind, Framer Motion</li>
            <li>• Interests: Security, DX, homelabbing</li>
          </ul>
        </div>
      </Section>
    </div>
  );
}
