"use client";
import Section from "@/components/Section";
export default function ContactPage() {
  return (
    <div className="space-y-6">
      <input
        type="text"
        name="_honey"
        tabIndex="-1"
        autoComplete="off"
        className="hidden"
      />
      <Section
        title="Contact"
        subtitle="Drop a message — it emails me, if I have set it up correctly."
      >
        <form
          className="card p-6 grid gap-4"
          data-netlify="false"
          action="https://formspree.io/f/DONT_USE_MINE!"
          method="POST"
        >
          <div className="grid gap-1">
            <label htmlFor="name" className="text-sm text-neutral-300">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="rounded-xl bg-neutral-900 px-3 py-2 ring-1 ring-white/10 focus:outline-none focus:ring-brand/60"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="email" className="text-sm text-neutral-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="rounded-xl bg-neutral-900 px-3 py-2 ring-1 ring-white/10 focus:outline-none focus:ring-brand/60"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="message" className="text-sm text-neutral-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="rounded-xl bg-neutral-900 px-3 py-2 ring-1 ring-white/10 focus:outline-none focus:ring-brand/60"
            />
          </div>
          <button className="rounded-xl bg-brand px-4 py-2 text-sm font-medium hover:bg-brand-dark">
            Send
          </button>
        </form>
        <p className="text-xs text-neutral-500">
          All fields are required to be filled out. Anything that seems to be a
          waste of time, I won't respond to.
        </p>
      </Section>
    </div>
  );
}
