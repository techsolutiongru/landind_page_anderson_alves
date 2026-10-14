"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { timeline } from "@/data/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function Timeline() {
  const [active, setActive] = useState(timeline.length - 1);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const item = timeline[active];

  const scrollTrack = (direction: "left" | "right") => {
    if (trackRef.current) {
      const scrollAmount = 300;
      trackRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="trajetoria" className="relative overflow-hidden bg-ink-900 py-24 text-white lg:py-32">
      {/* Sutil textura de gradiente para diferenciar da cor chapada do Lab */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(#182843_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="Linha do tempo"
              title="Marcos de uma trajetória em **evolução constante**"
              lead="Navegue pela régua cronológica contínua e veja como cada etapa construiu a seguinte."
            />
          </Reveal>

          {/* Controles de rolagem horizontal da régua */}
          <div className="hidden items-center gap-2 sm:flex" aria-hidden="true">
            <button
              type="button"
              onClick={() => scrollTrack("left")}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition hover:border-mint-400 hover:text-white"
              aria-label="Rolar marcos para trás"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollTrack("right")}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition hover:border-mint-400 hover:text-white"
              aria-label="Rolar marcos para frente"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Linha horizontal contínua com pontos */}
        <div className="relative mt-12 pb-4">
          <div
            ref={trackRef}
            role="tablist"
            aria-label="Anos da trajetória"
            className="flex items-center gap-4 overflow-x-auto pb-4 pt-8 [scrollbar-width:thin] [scrollbar-color:#182843_transparent]"
          >
            {/* Linha guia contínua conectando os nós */}
            <div className="absolute left-0 top-[49px] -z-0 h-0.5 w-full min-w-[900px] bg-white/10" aria-hidden="true" />

            {timeline.map((t, i) => {
              const isSelected = i === active;
              return (
                <button
                  key={t.year}
                  role="tab"
                  id={`tl-tab-${i}`}
                  aria-selected={isSelected}
                  aria-controls="tl-panel"
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                      e.preventDefault();
                      setActive((a) => Math.min(a + 1, timeline.length - 1));
                    }
                    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                      e.preventDefault();
                      setActive((a) => Math.max(a - 1, 0));
                    }
                  }}
                  className={cn(
                    "group relative z-10 flex shrink-0 flex-col items-center px-4 py-2 text-center transition focus:outline-none focus:ring-2 focus:ring-mint-400 rounded-xl",
                    isSelected ? "text-mint-400" : "text-slate-400 hover:text-slate-200"
                  )}
                >
                  {/* Ponto / nó na régua */}
                  <span
                    className={cn(
                      "relative mb-3 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-300",
                      isSelected
                        ? "border-mint-400 bg-ink-950 scale-125 shadow-glow"
                        : "border-white/30 bg-ink-900 group-hover:border-white/60"
                    )}
                    aria-hidden="true"
                  >
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full transition-all",
                        isSelected ? "bg-mint-400" : "bg-transparent group-hover:bg-white/40"
                      )}
                    />
                  </span>

                  <span className="font-display text-base font-semibold sm:text-lg whitespace-nowrap">{t.year}</span>
                  <span className="mt-0.5 max-w-[120px] truncate text-[11px] text-slate-400">{t.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Painel do marco selecionado com ano em marca d'água */}
        <div className="mt-8" role="tabpanel" id="tl-panel" aria-labelledby={`tl-tab-${active}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={item.year}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/90 to-ink-900/95 p-8 backdrop-blur-md sm:p-12"
            >
              {/* Marca d'água grande do ano */}
              <span
                className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[9rem] leading-none text-white/[0.03] sm:text-[14rem]"
                aria-hidden="true"
              >
                {item.year.slice(0, 4)}
              </span>

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-mint-400">{item.year}</p>
              <h3 className="mt-3 font-display text-2xl sm:text-4xl">{item.title}</h3>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {item.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-5 py-4 text-slate-200 transition hover:border-white/10"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint-400" aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
