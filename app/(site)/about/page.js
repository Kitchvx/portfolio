"use client";
import Section from "@/components/Section";
export default function AboutPage() {
  return (
    <div className="space-y-6">
      <Section
        title="About Nathan"
        subtitle="End User Support Technician • aspiring InfoSec engineer"
      >
        <div className="card p-6 text-sm leading-relaxed text-neutral-300">
          <p>
            I’m Nathan. I like building clean UIs (and trying to make it work),
            automating mundane and boring tasks, learning by creating small
            projects. When I’m not at work, I’m usually tinkering with my
            homelab or struggling to make projects work.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            <li>• Location: UK</li>
            <li>• Stack: Next.js, Tailwind, Framer Motion</li>
            <li>• Interests: Security, SRE-ish reliability, DX</li>
          </ul>
        </div>
      </Section>
    </div>
  );
}
