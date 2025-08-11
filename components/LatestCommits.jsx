"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CACHE_TTL_MS = 5 * 60 * 1000;

function getCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { t, data } = JSON.parse(raw);
    if (Date.now() - t > CACHE_TTL_MS) return null;
    return data;
  } catch {
    return null;
  }
}
function setCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ t: Date.now(), data }));
  } catch {}
}

async function fetchEvents(username, limit = 6) {
  const res = await fetch(
    `https://api.github.com/users/${username}/events/public?per_page=30`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error(`Events ${res.status}`);
  const events = await res.json();
  const commits = [];
  for (const ev of events) {
    if (ev.type !== "PushEvent") continue;
    const repo = ev.repo?.name;
    for (const c of ev.payload?.commits ?? []) {
      commits.push({
        id: c.sha,
        message: c.message,
        url: `https://github.com/${repo}/commit/${c.sha}`,
        repo,
        date: ev.created_at,
      });
      if (commits.length >= limit) break;
    }
    if (commits.length >= limit) break;
  }
  return commits;
}

async function fetchLatestFromRepos(repos, perRepo = 2) {
  const all = [];
  for (const full of repos) {
    const [owner, repo] = full.split("/");
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perRepo}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        cache: "no-store",
      }
    );
    if (!res.ok) continue;
    const json = await res.json();
    for (const c of json) {
      all.push({
        id: c.sha,
        message: c.commit?.message || "(no message)",
        url: c.html_url,
        repo: full,
        date: c.commit?.author?.date,
      });
    }
  }
  return all.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);
}

export default function LatestCommits({
  username = "Kitchvx",
  fallbackRepos = ["Kitchvx/portfolio"],
}) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const cacheKey = `lc:${username}`;

  useEffect(() => {
    let dead = false;
    const cached = getCache(cacheKey);
    if (cached) setData(cached);

    (async () => {
      try {
        const events = await fetchEvents(username, 6);
        if (!dead && events.length) {
          setData(events);
          setCache(cacheKey, events);
          return;
        }
        const repoCommits = await fetchLatestFromRepos(fallbackRepos, 2);
        if (!dead) {
          setData(repoCommits);
          setCache(cacheKey, repoCommits);
        }
      } catch (e) {
        try {
          const repoCommits = await fetchLatestFromRepos(fallbackRepos, 2);
          if (!dead) {
            setData(repoCommits);
            setCache(cacheKey, repoCommits);
            setErr(`Fell back to repo commits (${e.message})`);
          }
        } catch (e2) {
          if (!dead)
            setErr(`GitHub error: ${e.message || e} / ${e2.message || e2}`);
        }
      }
    })();
    return () => {
      dead = true;
    };
  }, [username, fallbackRepos, cacheKey]);

  if (err && !data) return <p className="text-sm text-neutral-500">{err}</p>;
  if (!data)
    return <p className="text-sm text-neutral-500">Loading recent commits…</p>;
  if (data.length === 0)
    return (
      <p className="text-sm text-neutral-500">
        No recent commits found… Looks like I am MIA.
      </p>
    );

  return (
    <div className="grid gap-3">
      {err && <p className="text-xs text-amber-400/80">{err}</p>}
      {data.map((c) => (
        <div key={`${c.repo}-${c.id}`} className="card p-4">
          <div className="flex justify-between gap-4">
            <div>
              <p className="text-sm">{c.message}</p>
              <p className="mt-1 text-xs text-neutral-400">{c.repo}</p>
            </div>
            <Link
              href={c.url}
              target="_blank"
              className="text-sm underline underline-offset-4"
            >
              View
            </Link>
          </div>
          <p className="mt-2 text-xs text-neutral-500">
            {new Date(c.date).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
