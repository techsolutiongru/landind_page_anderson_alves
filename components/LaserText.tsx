"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface LaserTextProps {
  text: string;
  /** Tailwind / inline className for the container */
  className?: string;
  /** Inline style for the container tag */
  style?: React.CSSProperties;
  /** Delay in ms before the animation starts */
  delay?: number;
  /** Character reveal interval in ms */
  interval?: number;
  /** Tag to render as */
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

/**
 * LaserText — implementação fiel ao kn-burn do Kerf Silicon Design System.
 *
 * Cada letra é escondida (.laser-char) e revelada progressivamente com
 * a animação @keyframes kn-burn (flash branco → glow azul → cooling).
 * Uma linha de laser sutil percorre a largura do container enquanto
 * as letras são queimadas.
 */
export function LaserText({
  text,
  className = "",
  style,
  delay = 0,
  interval = 55,
  as: Tag = "span",
}: LaserTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const inView = useInView(containerRef as React.RefObject<HTMLElement>, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  // Index of the last burned char (-1 = none yet)
  const [burnedUpTo, setBurnedUpTo] = useState(-1);
  // Show the scan line beam?
  const [scanning, setScanning] = useState(false);

  const chars = text.split("");

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      // Reveal all chars immediately without animation
      setBurnedUpTo(chars.length - 1);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    let charTimer: ReturnType<typeof setInterval>;

    timer = setTimeout(() => {
      setScanning(true);
      let idx = 0;

      charTimer = setInterval(() => {
        setBurnedUpTo(idx);
        idx++;
        if (idx >= chars.length) {
          clearInterval(charTimer);
          // Hide scan line 200ms after last char
          setTimeout(() => setScanning(false), 200);
        }
      }, interval);
    }, delay);

    return () => {
      clearTimeout(timer);
      clearInterval(charTimer!);
    };
  }, [inView, delay, interval, chars.length, reduceMotion]);

  return (
    // @ts-expect-error — polymorphic ref
    <Tag ref={containerRef} style={style} className={`relative inline-block ${className}`}>
      {/* Scan-line laser beam */}
      {scanning && (
        <span
          aria-hidden="true"
          className="kn-scan-line pointer-events-none absolute -left-1 top-0 bottom-0 w-[2px] z-10"
          style={{
            background: "#fff",
            boxShadow:
              "0 0 4px 1px #fff, 0 0 14px 4px rgba(47,155,255,.85), 0 0 30px 8px rgba(47,155,255,.35)",
            left: burnedUpTo >= 0
              ? `calc(${((burnedUpTo + 1) / chars.length) * 100}% - 1px)`
              : "0px",
            top: "-4px",
            bottom: "-4px",
            width: "2px",
            position: "absolute",
            opacity: 1,
            transition: `left ${interval * 0.8}ms linear`,
          }}
        />
      )}

      {chars.map((char, i) => (
        <span
          key={i}
          aria-hidden={char === " " ? "true" : undefined}
          className={`laser-char${i <= burnedUpTo ? " burned" : ""}${char === " " ? " inline" : ""}`}
          style={char === " " ? { opacity: i <= burnedUpTo ? 1 : 0 } : undefined}
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}

      {/* Screen-reader version — always visible but visually hidden */}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
