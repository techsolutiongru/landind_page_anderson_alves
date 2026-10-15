"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { impactStats } from "@/data/site";
import { Building2, Layers, HeartPulse, Award } from "lucide-react";

const iconMap = { Building2, Layers, HeartPulse, Award };

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLSpanElement>, { once: true, margin: "-50px" });
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    if (!inView) return;
    setCounting(true);
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();

    const update = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(eased * target);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(target);
        setCounting(false);
      }
    };
    requestAnimationFrame(update);
  }, [inView, target]);

  return (
    <span ref={ref} style={counting ? { color: "#2f9bff", textShadow: "0 0 14px rgba(47,155,255,0.5)" } : {}}>
      {count}
      {/* Cursor piscante durante a contagem */}
      {counting && (
        <span
          className="inline-block w-[0.55em] h-[0.85em] ml-[2px] align-[-0.1em]"
          style={{ background: "#2f9bff", boxShadow: "0 0 6px rgba(47,155,255,0.7)" }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}

export function ImpactNumbers() {
  return (
    <section
      id="numeros"
      className="relative py-16 text-white lg:py-20"
      style={{
        background: "#0a0e14",
        borderTop: "1px solid #243041",
        borderBottom: "1px solid #243041",
      }}
    >
      {/* Horizontal scan rule */}
      <div
        className="absolute left-0 right-0 top-0 h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #2f9bff 20%, rgba(47,155,255,0.3) 80%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Label terminal */}
        <div className="mb-10 text-center">
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.22em]"
            style={{
              color: "#2f9bff",
              fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
            }}
          >
            Métricas · Resultados · Impacto
          </span>
          <h2
            className="mt-2 font-display text-2xl sm:text-3xl"
            style={{ color: "#ecebe6" }}
          >
            Impacto comprovado em escala e operações críticas
          </h2>
        </div>

        {/* Grade dos 4 indicadores */}
        <div className="grid grid-cols-1 gap-[1px] sm:grid-cols-2 lg:grid-cols-4"
          style={{ background: "#243041" }}
        >
          {impactStats.map((item, idx) => {
            const IconComponent =
              iconMap[item.icon as keyof typeof iconMap] || Building2;

            return (
              <div
                key={item.label}
                className="group relative flex flex-col justify-between p-6 transition-colors"
                style={{ background: "#0a0e14" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#0d1520")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#0a0e14")
                }
              >
                {/* Left rule glow — aparece no hover */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[1px] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: "#bfe0ff",
                    boxShadow: "0 0 6px rgba(120,190,255,0.9), 0 0 14px rgba(47,155,255,0.6)",
                    transformOrigin: "50% 0",
                  }}
                  aria-hidden="true"
                />

                {/* Icon + index */}
                <div className="flex items-center justify-between">
                  <span
                    className="grid h-11 w-11 place-items-center transition-colors"
                    style={{
                      border: "1px solid #243041",
                      background: "rgba(47,155,255,0.08)",
                      color: "#2f9bff",
                      borderRadius: "3px",
                    }}
                  >
                    <IconComponent size={22} />
                  </span>

                  {/* Blue square marker */}
                  <span
                    className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em]"
                    style={{
                      color: "rgba(236,235,230,0.36)",
                      fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                    }}
                  >
                    <span
                      className="inline-block h-[5px] w-[5px]"
                      style={{
                        background: "#2f9bff",
                        boxShadow: "0 0 6px rgba(47,155,255,0.55)",
                      }}
                    />
                    0{idx + 1}
                  </span>
                </div>

                {/* Counter number */}
                <div className="mt-6">
                  <div
                    className="font-display text-4xl lg:text-5xl leading-none tracking-tight transition-colors"
                    style={{ color: "#ecebe6" }}
                  >
                    {item.prefix}
                    <Counter target={item.target} />
                    <span style={{ color: "#2f9bff" }}>{item.suffix}</span>
                  </div>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "#8e8d8a" }}
                  >
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
