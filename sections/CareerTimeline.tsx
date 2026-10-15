"use client";

import { useState } from "react";
import { careerTimeline } from "@/data/site";
import { LaserText } from "@/components/LaserText";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export function CareerTimeline() {
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () => setActiveIdx((curr) => (curr > 0 ? curr - 1 : careerTimeline.length - 1));
  const next = () => setActiveIdx((curr) => (curr < careerTimeline.length - 1 ? curr + 1 : 0));

  const current = careerTimeline[activeIdx];

  return (
    <section
      id="trajetoria"
      className="relative py-20 text-white lg:py-28"
      style={{ background: "#0a0e14", borderTop: "1px solid #243041" }}
    >
      {/* Scan line at top */}
      <div
        className="absolute left-0 right-0 top-0 h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #2f9bff 20%, rgba(47,155,255,0.3) 80%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Header */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end mb-10">
          <div>
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.22em] block mb-2"
              style={{
                color: "#2f9bff",
                fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
              }}
            >
              Linha do Tempo Profissional
            </span>
            <LaserText
              text="Marcos consolidados de uma carreira em evolução"
              as="h2"
              delay={300}
              interval={35}
              className="block font-display text-2xl sm:text-3xl"
              style={{ color: "#ecebe6" } as React.CSSProperties}
            />
            <p className="mt-3 text-sm" style={{ color: "#8e8d8a" }}>
              Navegue de forma interativa pelos momentos centrais da trajetória profissional e empresarial.
            </p>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={prev}
              aria-label="Marco anterior"
              className="grid h-10 w-10 place-items-center transition-colors hover:text-white"
              style={{
                border: "1px solid #243041",
                background: "#0b0b0c",
                color: "#697c90",
                borderRadius: "2px",
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <span
              className="px-2 text-xs"
              style={{
                color: "#2f9bff",
                fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
              }}
            >
              {activeIdx + 1} / {careerTimeline.length}
            </span>
            <button
              type="button"
              onClick={next}
              aria-label="Próximo marco"
              className="grid h-10 w-10 place-items-center transition-colors hover:text-white"
              style={{
                border: "1px solid #243041",
                background: "#0b0b0c",
                color: "#697c90",
                borderRadius: "2px",
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Year tabs — terminal press style */}
        <div className="flex gap-[1px] overflow-x-auto pb-3 [scrollbar-width:none]"
          style={{ background: "#243041" }}
        >
          {careerTimeline.map((item, i) => (
            <button
              key={item.year}
              type="button"
              onClick={() => setActiveIdx(i)}
              className="whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors flex-1 min-w-fit"
              style={{
                background: i === activeIdx ? "rgba(47,155,255,0.15)" : "#0a0e14",
                color: i === activeIdx ? "#2f9bff" : "#697c90",
                borderBottom: i === activeIdx ? "2px solid #2f9bff" : "2px solid transparent",
                fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
              }}
            >
              {item.year}
            </button>
          ))}
        </div>

        {/* Card destaque selecionado */}
        <div
          key={current.year}
          className="mt-[1px] p-6 sm:p-8"
          style={{
            border: "1px solid #243041",
            background: "#0b0b0c",
            borderTop: "none",
          }}
        >
          {/* Header do card */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6"
            style={{ borderBottom: "1px solid #243041" }}
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold"
                style={{
                  border: "1px solid rgba(47,155,255,0.35)",
                  background: "rgba(47,155,255,0.08)",
                  color: "#2f9bff",
                  fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                  borderRadius: "2px",
                }}
              >
                <Calendar size={12} />
                {current.year}
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.18em]"
                style={{ color: "#697c90", fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)" }}
              >
                {current.badge}
              </span>
            </div>
            <span className="text-xs font-medium" style={{ color: "#8e8d8a" }}>
              {current.company}
            </span>
          </div>

          <h3
            className="font-display text-2xl font-bold sm:text-3xl"
            style={{ color: "#ecebe6" }}
          >
            {current.title}
          </h3>
          <p
            className="mt-3 max-w-3xl text-base leading-relaxed"
            style={{ color: "#8e8d8a" }}
          >
            {current.summary}
          </p>
        </div>

        {/* Grade de cards menores para navegação rápida */}
        <div
          className="mt-[1px] grid gap-[1px] sm:grid-cols-2 lg:grid-cols-3"
          style={{ background: "#243041" }}
        >
          {careerTimeline.map((item, idx) => (
            <button
              key={item.year}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "group relative flex flex-col text-left p-5 transition-colors",
              )}
              style={{
                background: idx === activeIdx ? "#0d1520" : "#0a0e14",
              }}
              onMouseEnter={(e) => {
                if (idx !== activeIdx) e.currentTarget.style.background = "#0d1520";
              }}
              onMouseLeave={(e) => {
                if (idx !== activeIdx) e.currentTarget.style.background = "#0a0e14";
              }}
            >
              {/* Top accent on active */}
              {idx === activeIdx && (
                <div
                  className="absolute left-0 right-0 top-0 h-[1px]"
                  style={{
                    background:
                      "linear-gradient(90deg, #2f9bff, rgba(47,155,255,0.2))",
                  }}
                  aria-hidden="true"
                />
              )}
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-xs font-bold"
                  style={{
                    color: idx === activeIdx ? "#2f9bff" : "#697c90",
                    fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                  }}
                >
                  {item.year}
                </span>
                <span
                  className="text-[10px] uppercase tracking-wider"
                  style={{ color: "#697c90", fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)" }}
                >
                  {item.badge}
                </span>
              </div>
              <h4
                className="text-sm font-semibold leading-snug mb-1"
                style={{ color: idx === activeIdx ? "#ecebe6" : "#8e8d8a" }}
              >
                {item.title}
              </h4>
              <p
                className="text-xs leading-relaxed line-clamp-2"
                style={{ color: "#697c90" }}
              >
                {item.summary}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
