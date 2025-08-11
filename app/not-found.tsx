"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-neutral-200">
      <MatrixTerminal>
        <MatrixCanvas />
        <Scanlines />
      </MatrixTerminal>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 p-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          404
        </h1>
        <Quote />
        <p className="max-w-xl text-balance text-sm text-neutral-300/80">
          Looks like you took a wrong exit from the Matrix. The page you’re
          searching for doesn’t exist in this reality.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-medium backdrop-blur transition hover:border-emerald-400/70 hover:bg-emerald-400/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
          >
            ⟵ Back to Home
          </Link>
          <Link
            href="/projects"
            className="rounded-2xl border border-neutral-700 bg-neutral-800/40 px-4 py-2 text-sm font-medium backdrop-blur transition hover:border-neutral-600 hover:bg-neutral-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
          >
            View Projects
          </Link>
        </div>

        <details className="mt-6 text-xs text-neutral-400">
          <summary className="cursor-pointer list-none text-neutral-500 transition hover:text-neutral-300">
            psst… what’s the reference?
          </summary>
          <div className="mt-2 text-neutral-400">
            “There is no spoon.” — <em>The Matrix</em> (1999). Try typing{" "}
            <code>help</code>, <code>spoon</code>, <code>wakeup</code>.
          </div>
        </details>

        <TinyPrompt />
      </section>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </main>
  );
}

function Quote() {
  return (
    <blockquote className="group select-none">
      <p
        className="text-balance text-2xl font-semibold text-emerald-300/90 sm:text-3xl md:text-4xl"
        aria-label="There is no spoon."
      >
        <span className="relative inline-block">
          <span className="[text-shadow:0_0_8px_rgba(16,185,129,.55)]">
            “There is no spoon.”
          </span>
          <span className="pointer-events-none absolute inset-0 translate-x-0 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-60 [filter:blur(0.3px)] [text-shadow:0_0_6px_rgba(16,185,129,.45)]">
            “There is no spoon.”
          </span>
          <span className="pointer-events-none absolute inset-0 -translate-x-0 opacity-0 transition group-hover:-translate-x-0.5 group-hover:opacity-60 [filter:blur(0.3px)] [text-shadow:0_0_6px_rgba(52,211,153,.35)]">
            “There is no spoon.”
          </span>
        </span>
      </p>
    </blockquote>
  );
}

function MatrixTerminal({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-0 grid place-items-center p-2 sm:p-6">
      <div className="w-full max-w-full sm:max-w-[1400px] h-[65vh] sm:h-[70vh] rounded-2xl border border-emerald-500/30 bg-black/70 shadow-[0_0_40px_rgba(16,185,129,0.15)] backdrop-blur overflow-hidden flex flex-col">
        <div className="h-10 shrink-0 flex items-center gap-2 border-b border-emerald-500/20 px-3 sm:px-4 text-[11px] sm:text-xs text-emerald-300/80">
          <span className="inline-flex gap-1 pr-1 sm:pr-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </span>
          NKITCH@matrix: ~ — not-found.tsx
        </div>

        <div className="relative flex-1 min-h-0 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const container = canvas.parentElement as HTMLElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0,
      height = 0,
      dpr = Math.max(1, window.devicePixelRatio || 1);
    const fontSize = 16;
    let columns = 0;
    let rainDrops: number[] = [];
    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const glyphs = (katakana + latin + nums).split("");

    let flashFrames = 0;
    const onReveal = () => {
      flashFrames = 160;
    };
    window.addEventListener("matrix:reveal", onReveal);

    function resizeToContainer() {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));

      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      columns = Math.floor(width / fontSize);
      rainDrops = new Array(columns).fill(1);
      ctx.font = `${fontSize}px monospace`;
    }

    let raf = 0;
    function draw() {
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, width, height);

      if (flashFrames > 0) flashFrames -= 1;
      ctx.fillStyle = flashFrames > 0 ? "#a7f3d0" : "#34d399";

      for (let i = 0; i < columns; i++) {
        const text = glyphs[Math.floor(Math.random() * glyphs.length)];
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;
        ctx.fillText(text, x, y);
        if (y > height && Math.random() > 0.975) rainDrops[i] = 0;
        rainDrops[i]++;
      }
      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resizeToContainer);
    ro.observe(container);
    resizeToContainer();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("matrix:reveal", onReveal);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
    </div>
  );
}

function Scanlines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 mix-blend-screen opacity-20"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 3px)",
      }}
    />
  );
}

function MatrixReveal() {
  const [msg, setMsg] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const onReveal = (e: Event) => {
      // @ts-ignore
      const message = e?.detail?.message || "There is no spoon.";
      setMsg(message);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setMsg(null), 2600);
    };
    window.addEventListener("matrix:reveal", onReveal as EventListener);
    return () =>
      window.removeEventListener("matrix:reveal", onReveal as EventListener);
  }, []);

  if (!msg) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      <div className="rounded-2xl border border-emerald-400/60 bg-black/60 px-6 py-4 text-center text-lg font-semibold text-emerald-200 shadow-2xl backdrop-blur">
        {msg}
      </div>
    </div>
  );
}

function TinyPrompt() {
  useEffect(() => {
    const buffer = { current: "" } as { current: string };

    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      )
        return;

      if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1) {
        buffer.current += e.key.toLowerCase();
        if (buffer.current.length > 24)
          buffer.current = buffer.current.slice(-24);

        if (buffer.current.endsWith("help")) {
          const text = "Commands: help, spoon, wakeup";
          console.info(text);
          window.dispatchEvent(
            new CustomEvent("matrix:reveal", { detail: { message: text } })
          );
        }
        if (buffer.current.endsWith("spoon")) {
          console.info("There is no spoon. Also: try clicking the quote.");
          window.dispatchEvent(
            new CustomEvent("matrix:reveal", {
              detail: { message: "There is no spoon." },
            })
          );
        }
        if (buffer.current.endsWith("wakeup")) {
          console.info("Follow the white rabbit.");
          window.dispatchEvent(
            new CustomEvent("matrix:reveal", {
              detail: { message: "Follow the white rabbit." },
            })
          );
        }
      }
    };

    document.addEventListener("keydown", handler, true);
    return () => document.removeEventListener("keydown", handler, true);
  }, []);

  return null;
}
