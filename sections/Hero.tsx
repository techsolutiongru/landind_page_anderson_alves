"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { heroStats, indicators, siteConfig } from "@/data/site";
import { Icon } from "@/components/Icon";
import { NetworkBackdrop } from "@/components/NetworkBackdrop";

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink-950 pt-24 text-white sm:pt-28 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-mint-500/15 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-ink-600/60 blur-[120px]" />
        <NetworkBackdrop className="absolute inset-0 h-full w-full text-skysoft/30 [mask-image:radial-gradient(ellipse_at_30%_40%,black,transparent_75%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-24">
        <div className="min-w-0 lg:col-span-7">
          <motion.p
            {...fade(0.05)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-mint-400/30 bg-mint-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-mint-400 sm:px-4 sm:py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-mint-400" aria-hidden="true" />
            {siteConfig.name}
          </motion.p>

          {/* Tipografia fluida com clamp() e quebra natural sem estouro em 375px */}
          <motion.h1
            {...fade(0.15)}
            className="break-words font-display text-[clamp(2rem,6vw,4.25rem)] leading-[1.08] tracking-tight"
          >
            Especialista em <span className="italic text-mint-400">Tecnologia</span>, Gestão de Projetos e{" "}
            <span className="relative inline-block">
              Transformação Digital
              <svg
                className="absolute -bottom-1.5 left-0 w-full text-mint-400 sm:-bottom-2"
                viewBox="0 0 300 12"
                fill="none"
                aria-hidden="true"
              >
                <path d="M2 8c60-6 140-8 296-2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p {...fade(0.3)} className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:mt-8 sm:text-lg">
            “{siteConfig.tagline}”
          </motion.p>

          <motion.div {...fade(0.42)} className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <a
              href="#historia"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-mint-400 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-mint-300 sm:px-7 sm:py-4 focus:outline-none focus:ring-2 focus:ring-mint-400 focus:ring-offset-2 focus:ring-offset-ink-950"
            >
              Conheça minha trajetória
              <ArrowRight size={18} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#laboratorio"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-mint-400 hover:text-mint-400 sm:px-7 sm:py-4 focus:outline-none focus:ring-2 focus:ring-mint-400"
            >
              <Sparkles size={18} aria-hidden="true" />
              Explorar o laboratório de IA
            </a>
          </motion.div>

          <motion.ul {...fade(0.55)} className="mt-10 flex flex-wrap gap-2 sm:mt-12 sm:gap-2.5" aria-label="Áreas de atuação">
            {indicators.map((i) => (
              <li
                key={i.label}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-slate-200 backdrop-blur sm:px-4 sm:py-2 sm:text-sm"
              >
                <Icon name={i.icon} className="h-4 w-4 text-mint-400" />
                {i.label}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div {...fade(0.25)} className="relative mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none">
          <div className="absolute -right-3 -top-3 h-full w-full rounded-[2rem] border border-mint-400/40" aria-hidden="true" />
          <div className="absolute -bottom-6 -left-6 h-40 w-40 rounded-full bg-mint-400/20 blur-3xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2rem] shadow-card ring-1 ring-white/15">
            <Image
              src="/anderson-alves.jpg"
              alt="Retrato profissional de Anderson Alves, sorrindo, de blazer azul-marinho e óculos"
              width={1000}
              height={1335}
              priority
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 90vw"
              className="h-auto w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/95 via-ink-950/70 to-transparent p-5 pt-16 sm:p-6 sm:pt-20">
              <p className="font-display text-xl">{siteConfig.name}</p>
              <p className="text-xs text-slate-300 sm:text-sm">CEO Tech Solution · Tech Lead · Gestão de Projetos</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Faixa inferior de números */}
      <div className="border-t border-white/10 bg-ink-900/60 backdrop-blur">
        <dl className="mx-auto grid max-w-7xl grid-cols-3 gap-2 px-4 py-6 sm:gap-4 sm:px-8 sm:py-8">
          {heroStats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-2xl text-mint-400 sm:text-4xl lg:text-5xl">{s.value}</span>
                <span className="mt-1 block text-[11px] leading-tight text-slate-400 sm:text-sm">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
