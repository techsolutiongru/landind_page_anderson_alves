"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background:
          scrolled || open
            ? "rgba(10,14,20,0.92)"
            : "transparent",
        borderBottom: scrolled || open ? "1px solid #243041" : "1px solid transparent",
        backdropFilter: scrolled || open ? "blur(16px)" : "none",
      }}
    >
      {/* Terminal scan line on top */}
      {scrolled && (
        <div
          className="absolute left-0 right-0 top-0 h-[1px] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, #2f9bff 30%, rgba(47,155,255,0.2) 70%, transparent)",
          }}
          aria-hidden="true"
        />
      )}

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo / Mark */}
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label={`${siteConfig.name} — início`}
        >
          <span
            className="grid h-9 w-9 place-items-center font-display text-sm transition-all"
            style={{
              border: "1px solid rgba(47,155,255,0.5)",
              background: "rgba(47,155,255,0.08)",
              color: "#2f9bff",
              borderRadius: "3px",
            }}
          >
            AA
          </span>
          <span
            className="hidden font-display text-lg sm:block"
            style={{ color: "#ecebe6" }}
          >
            {siteConfig.name}
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm transition-colors",
                item.href === "#laboratorio"
                  ? "font-semibold"
                  : "hover:text-white"
              )}
              style={
                item.href === "#laboratorio"
                  ? {
                      border: "1px solid rgba(47,155,255,0.45)",
                      background: "rgba(47,155,255,0.1)",
                      color: "#2f9bff",
                      borderRadius: "3px",
                    }
                  : { color: "#8e8d8a" }
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="grid h-10 w-10 place-items-center transition-colors lg:hidden"
          style={{
            border: "1px solid #243041",
            background: "#0a0e14",
            color: "#8e8d8a",
            borderRadius: "2px",
          }}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Principal (mobile)"
          className="px-5 pb-6 pt-2 lg:hidden"
          style={{ borderTop: "1px solid #243041", background: "#0a0e14" }}
        >
          <ul className="grid gap-[1px]" style={{ background: "#243041" }}>
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-sm transition-colors"
                  style={{
                    background:
                      item.href === "#laboratorio"
                        ? "rgba(47,155,255,0.08)"
                        : "#0a0e14",
                    color:
                      item.href === "#laboratorio"
                        ? "#2f9bff"
                        : "#8e8d8a",
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
