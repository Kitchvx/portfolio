"use client";
import { useMemo, useState, useEffect, useRef } from "react";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import data from "@/data/projects.json";
export default function ProjectsPage() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("All");
  const inputRef = useRef(null);
  useEffect(() => {
    function onKey(e) {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const tags = useMemo(
    () =>
      ["All", ...Array.from(new Set(data.flatMap((p) => p.tags)))].sort(
        (a, b) => a.localeCompare(b)
      ),
    []
  );
  const list = useMemo(
    () =>
      data.filter(
        (p) =>
          (p.title + " " + p.description)
            .toLowerCase()
            .includes(q.toLowerCase()) &&
          (tag === "All" || p.tags.includes(tag))
      ),
    [q, tag]
  );
  return (
    <div className="space-y-6">
      <Section
        title="Projects"
        subtitle="Bane of my life - I’ve built, broken, and rebuilt. All on GitHub."
      >
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Press / to search projects…"
            className="rounded-xl bg-neutral-900 px-3 py-2 text-sm ring-1 ring-white/10 focus:outline-none focus:ring-brand/60"
          />
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="rounded-xl bg-neutral-900 px-3 py-2 text-sm ring-1 ring-white/10 focus:outline-none focus:ring-brand/60"
          >
            {tags.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {list.map((p) => (
            <ProjectCard
              key={p.slug}
              title={p.title}
              summary={p.summary || p.description}
              description={p.description}
              tags={p.tags}
              href={`/projects/${p.slug}`}
            />
          ))}
          {list.length === 0 && (
            <p className="text-sm text-neutral-500">
              Uh oh! No matches. Try another search or tag, if you want.
            </p>
          )}
        </div>
      </Section>
    </div>
  );
}
