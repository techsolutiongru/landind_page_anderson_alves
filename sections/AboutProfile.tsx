"use client";

import { aboutProfile } from "@/data/site";
import { LaserText } from "@/components/LaserText";
import { Users, Compass, Building2, HeartPulse } from "lucide-react";

const icons = { Users, Compass, Building2, HeartPulse };

export function AboutProfile() {
  return (
    <section
      id="sobre"
      className="relative py-20 lg:py-28"
      style={{ background: "#0b0b0c" }}
    >
      {/* Horizontal rule */}
      <div
        className="absolute left-0 right-0 top-0 h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #243041 20%, #243041 80%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Section header */}
        <div className="mb-14">
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.22em] block mb-2"
            style={{
              color: "#2f9bff",
              fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
            }}
          >
            {aboutProfile.eyebrow}
          </span>
          <LaserText
            text={aboutProfile.title.replace(/\*\*/g, "")}
            as="h2"
            delay={300}
            interval={40}
            className="block font-display text-2xl sm:text-3xl lg:text-4xl"
            style={{ color: "#ecebe6" } as React.CSSProperties}
          />
          {aboutProfile.lead && (
            <p
              className="mt-4 max-w-2xl text-base leading-relaxed"
              style={{ color: "#8e8d8a" }}
            >
              {aboutProfile.lead}
            </p>
          )}
        </div>

        {/* Grade de cartões — silicon cells */}
        <div
          className="grid grid-cols-1 gap-[1px] sm:grid-cols-2 lg:grid-cols-4"
          style={{ background: "#243041" }}
        >
          {aboutProfile.cards.map((card) => {
            const IconComp = icons[card.icon as keyof typeof icons] || Users;

            return (
              <div
                key={card.title}
                className="group relative flex flex-col p-6 transition-colors"
                style={{ background: "#0b0b0c" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#0a0e14")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#0b0b0c")
                }
              >
                {/* Laser accent on top */}
                <div
                  className="absolute left-0 right-0 top-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background:
                      "linear-gradient(90deg, #2f9bff, rgba(47,155,255,0.2))",
                  }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <span
                  className="grid h-11 w-11 place-items-center mb-5 transition-colors group-hover:bg-[#2f9bff] group-hover:text-[#0b0b0c]"
                  style={{
                    border: "1px solid #243041",
                    background: "rgba(47,155,255,0.08)",
                    color: "#2f9bff",
                    borderRadius: "2px",
                  }}
                >
                  <IconComp size={20} />
                </span>

                <h3
                  className="font-display text-lg font-bold leading-snug mb-3"
                  style={{ color: "#ecebe6" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "#8e8d8a" }}
                >
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Diferencial profissional — silicon panel */}
        <div
          className="mt-[1px] p-6 sm:p-8"
          style={{
            border: "1px solid #243041",
            background: "#0a0e14",
            borderTop: "none",
          }}
        >
          <div className="grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <span
                className="text-[10px] font-semibold uppercase tracking-wider block mb-2"
                style={{
                  color: "#2f9bff",
                  fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                }}
              >
                Diferencial Profissional
              </span>
              <p
                className="text-base leading-relaxed sm:text-lg"
                style={{ color: "#ecebe6" }}
              >
                Atuo como elo entre as necessidades estratégicas do negócio e a execução técnica em campo, traduzindo complexidade em processos claros, liderando equipes engajadas e garantindo estabilidade em sistemas de alta demanda.
              </p>
            </div>
            <div className="flex md:col-span-4 md:justify-end">
              <a
                href="#trajetoria"
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#2f9bff]"
                style={{
                  border: "1px solid #243041",
                  background: "rgba(47,155,255,0.1)",
                  color: "#2f9bff",
                  borderRadius: "3px",
                }}
              >
                Ver Trajetória de Carreira
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
