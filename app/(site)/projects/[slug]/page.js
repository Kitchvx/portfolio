import data from "@/data/projects.json";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return data.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const project = data.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} | Nathan Kitching`,
    description: project.metaDescription || project.summary || "",
  };
}

export const dynamicParams = false;

export default function Project({ params }) {
  const project = data.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  const paragraphs = (project.description || project.summary || "").split(
    /\n\s*\n/
  );

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-semibold">{project.title}</h1>
        <p className="mt-2 text-neutral-400">{project.summary}</p>
        <div className="mt-3 space-y-3 text-neutral-300 text-sm leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i}>
              {p.split("\n").map((line, j) => (
                <span key={j}>
                  {line}
                  {j < p.split("\n").length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/5 px-2 py-1 text-xs ring-1 ring-white/10"
            >
              {t}
            </span>
          ))}
        </div>
        {project.links?.repo && (
          <a
            href={project.links.repo}
            target="_blank"
            className="mt-4 inline-block rounded-xl bg-brand px-4 py-2 text-sm hover:bg-brand-dark"
          >
            Repo
          </a>
        )}
        {project.links?.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            className="ml-2 inline-block rounded-xl ring-1 ring-white/15 px-4 py-2 text-sm hover:bg-white/5"
          >
            Live demo
          </a>
        )}
        {Array.isArray(project.images) && project.images.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {project.images.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                className="rounded-xl ring-1 ring-white/10"
                loading="lazy"
              />
            ))}
          </div>
        )}
      </div>
      <Link
        href="/projects"
        className="text-sm underline-offset-4 hover:underline"
      >
        ← Back to projects
      </Link>
    </div>
  );
}
