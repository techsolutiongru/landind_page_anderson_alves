import { vision } from "@/data/site";
import { NetworkBackdrop } from "@/components/NetworkBackdrop";
import { Reveal } from "@/components/Reveal";

export function Vision() {
  return (
    <section id="visao" className="relative isolate overflow-hidden bg-ink-950 py-28 text-white lg:py-40">
      <NetworkBackdrop className="absolute inset-0 -z-10 h-full w-full text-skysoft/25 [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_70%)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-mint-400">
            <span className="h-px w-8 bg-current" aria-hidden="true" />
            Minha visão
          </p>
          <blockquote className="max-w-5xl font-display text-4xl leading-[1.08] sm:text-6xl lg:text-7xl">
            <span className="text-mint-400" aria-hidden="true">“</span>
            {vision.quote}
            <span className="text-mint-400" aria-hidden="true">”</span>
          </blockquote>
          <p className="mt-8 max-w-2xl text-lg text-slate-300">{vision.text}</p>
        </Reveal>

        <ol className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {vision.pillars.map((p, i) => (
            <li key={p.title} className="bg-ink-900 p-7">
              <Reveal delay={i * 0.06}>
                <span className="font-display text-3xl text-mint-400">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
