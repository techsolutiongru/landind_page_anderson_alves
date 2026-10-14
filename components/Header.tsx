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
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "border-b border-white/10 bg-ink-950/80 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label={`${siteConfig.name} — início`}>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-mint-400/50 font-display text-sm text-mint-400 transition group-hover:bg-mint-400 group-hover:text-ink-950">
            AA
          </span>
          <span className="hidden font-display text-lg text-white sm:block">{siteConfig.name}</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm text-slate-300 transition hover:text-white",
                item.href === "#laboratorio" && "border border-mint-400/40 text-mint-300 hover:bg-mint-400 hover:text-ink-950"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Principal (mobile)" className="border-t border-white/10 px-5 pb-6 pt-3 lg:hidden">
          <ul className="grid gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-slate-200 hover:bg-white/5"
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
