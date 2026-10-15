"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/site";
import { LaserText } from "@/components/LaserText";

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-28 text-white sm:pt-32 lg:pt-36"
      style={{ background: "#0b0b0c" }}
    >
      {/* Silicon dark radial glow de fundo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Electric-blue bleed top-left */}
        <div
          className="absolute -left-48 -top-24 h-[36rem] w-[36rem] rounded-full blur-[160px]"
          style={{ background: "rgba(47,155,255,0.07)" }}
        />
        {/* Secondary glow right */}
        <div
          className="absolute -right-48 top-32 h-[28rem] w-[28rem] rounded-full blur-[140px]"
          style={{ background: "rgba(47,155,255,0.05)" }}
        />
        {/* Precision dot-grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(207,230,255,0.06) 0 1.2px, transparent 1.6px)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-40"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #0b0b0c)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:pb-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">

          {/* ── Texto Principal ── */}
          <div className="min-w-0 lg:col-span-7">

            {/* Terminal eyebrow badge */}
            <motion.div
              {...fade(0.05)}
              className="mb-5 inline-flex items-center gap-2.5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]"
              style={{
                border: "1px solid rgba(47,155,255,0.35)",
                background: "rgba(47,155,255,0.08)",
                color: "#2f9bff",
                borderRadius: "3px",
              }}
            >
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{
                  background: "#2f9bff",
                  boxShadow: "0 0 6px rgba(47,155,255,0.9)",
                  animation: "sp-breathe 3.4s ease-in-out infinite",
                }}
                aria-hidden="true"
              />
              {siteConfig.name}
            </motion.div>

            {/* Nome com LaserText — queima letra por letra */}
            <motion.div {...fade(0.1)}>
              <LaserText
                text={siteConfig.name}
                as="h1"
                delay={600}
                interval={60}
                className="block font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight"
                style={{ color: "#ecebe6" } as React.CSSProperties}
              />
            </motion.div>

            {/* Slogan original — accent blue laser */}
            <motion.blockquote
              {...fade(0.22)}
              className="mt-4 font-display"
              style={{
                fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
                fontStyle: "italic",
                color: "#2f9bff",
                textShadow: "0 0 14px rgba(47,155,255,0.4)",
                borderLeft: "2px solid #2f9bff",
                paddingLeft: "1rem",
              }}
            >
              "{siteConfig.tagline}"
            </motion.blockquote>

            {/* Subtítulo: Analista de TI, CEO e Tech Lead */}
            <motion.p
              {...fade(0.3)}
              className="mt-5 inline-block text-sm font-medium tracking-wide sm:text-base"
              style={{
                color: "#8e8d8a",
                border: "1px solid #243041",
                background: "rgba(18,23,34,0.7)",
                padding: "0.4rem 1rem",
                borderRadius: "3px",
                fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)",
              }}
            >
              Analista de TI · CEO da Tech Solution · Tech Lead
            </motion.p>

            {/* Botões de Ação */}
            <motion.div
              {...fade(0.38)}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              {/* CTA Primário — Laboratório de IA com laser plate */}
              <a
                href="#laboratorio"
                className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] transition-all focus:outline-none focus:ring-2 focus:ring-[#2f9bff] focus:ring-offset-2 focus:ring-offset-[#0b0b0c]"
                style={{
                  background:
                    "repeating-linear-gradient(90deg,rgba(255,255,255,.07) 0 1px,rgba(0,0,0,.035) 1px 2px,rgba(255,255,255,.03) 2px 4px), linear-gradient(180deg,#1e8fff 0%,#1471d4 42%,#0e5aba 58%,#1978df 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,.2),inset 0 -1px 0 rgba(0,0,0,.3),0 4px 14px rgba(47,155,255,0.4)",
                  color: "#ecebe6",
                  borderRadius: "3px",
                  border: "1px solid rgba(47,155,255,0.6)",
                }}
              >
                {/* Laser sweep on hover */}
                <span
                  className="pointer-events-none absolute inset-y-[-8px] w-[2px] opacity-0 group-hover:opacity-100 transition-none"
                  style={{
                    background: "#fff",
                    boxShadow: "0 0 4px 1px #fff,0 0 14px 4px rgba(47,155,255,.85),0 0 30px 8px rgba(47,155,255,.35)",
                    left: 0,
                    animation: "none",
                  }}
                  aria-hidden="true"
                />
                <Sparkles size={16} aria-hidden="true" />
                Acessar Laboratório de IA
                <ArrowRight size={15} className="transition group-hover:translate-x-1" aria-hidden="true" />
              </a>

              {/* CTA Secundário */}
              <a
                href="#sobre"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium uppercase tracking-[0.1em] transition-all hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2f9bff] focus:ring-offset-2 focus:ring-offset-[#0b0b0c]"
                style={{
                  border: "1px solid #243041",
                  background: "rgba(18,23,34,0.5)",
                  color: "#8e8d8a",
                  borderRadius: "3px",
                }}
              >
                Ver Perfil e Atuação
              </a>
            </motion.div>

            {/* Tags de competência */}
            <motion.ul
              {...fade(0.46)}
              className="mt-8 flex flex-wrap gap-2 text-xs"
              aria-label="Focos de atuação"
            >
              {[
                "Liderança Técnica",
                "Gestão de Projetos",
                "Implantação de Sistemas",
                "Redes & Infraestrutura",
                "IA Aplicada",
              ].map((tag) => (
                <li
                  key={tag}
                  className="px-3 py-1.5"
                  style={{
                    border: "1px solid #243041",
                    background: "rgba(10,14,20,0.6)",
                    color: "#697c90",
                    borderRadius: "2px",
                    fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {tag}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ── Foto ── */}
          <motion.div
            {...fade(0.2)}
            className="relative mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none"
          >
            <div className="relative mx-auto max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]">
              {/* Silicon glow ring */}
              <div
                className="absolute -inset-3 rounded-[1.5rem] blur-2xl"
                style={{ background: "rgba(47,155,255,0.12)" }}
                aria-hidden="true"
              />
              {/* Foto frame — silicon plate */}
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: "1.5rem",
                  border: "1px solid #243041",
                  background: "#0a0e14",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                <Image
                  src="/anderson-alves.jpg"
                  alt="Anderson Alves — Analista de TI, CEO da Tech Solution e Tech Lead"
                  width={900}
                  height={1200}
                  priority
                  sizes="(min-width: 1024px) 38vw, (min-width: 640px) 50vw, 85vw"
                  className="h-auto w-full object-cover"
                />

                {/* Badge inferior — terminal strip */}
                <div
                  className="absolute inset-x-0 bottom-0 p-4 pt-12"
                  style={{
                    background:
                      "linear-gradient(to top, #0a0e14 60%, rgba(10,14,20,0) 100%)",
                    borderTop: "1px solid #243041",
                  }}
                >
                  {/* Indicator dot */}
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: "#2f9bff",
                        boxShadow: "0 0 6px rgba(47,155,255,0.9)",
                      }}
                    />
                    <span
                      className="text-[10px] uppercase tracking-[0.18em]"
                      style={{
                        color: "#2f9bff",
                        fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                      }}
                    >
                      Perfil Profissional
                    </span>
                  </div>
                  <p
                    className="font-display text-lg"
                    style={{ color: "#ecebe6" }}
                  >
                    Anderson Alves
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      color: "#8e8d8a",
                      fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                    }}
                  >
                    Liderança em TI · Projetos · Sistemas
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Missão ── */}
        <motion.div
          {...fade(0.54)}
          className="mt-14 p-6 sm:p-8"
          style={{
            border: "1px solid #243041",
            background:
              "linear-gradient(135deg, rgba(47,155,255,0.06) 0%, rgba(10,14,20,0.9) 50%, rgba(10,14,20,0.9) 100%)",
            borderRadius: "4px",
          }}
        >
          <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{
                  color: "#2f9bff",
                  fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                }}
              >
                Missão e Propósito
              </span>
              <p
                className="mt-2 text-base font-medium leading-relaxed sm:text-lg"
                style={{ color: "#ecebe6" }}
              >
                "{siteConfig.mission}"
              </p>
            </div>
            <a
              href="#contato"
              className="inline-flex shrink-0 items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2f9bff]"
              style={{
                border: "1px solid rgba(47,155,255,0.4)",
                background: "rgba(47,155,255,0.08)",
                color: "#2f9bff",
                borderRadius: "3px",
              }}
            >
              Vamos Conversar
              <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
