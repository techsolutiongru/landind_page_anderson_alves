"use client";

import { siteConfig } from "@/data/site";
import { BrandIcon, type BrandType } from "@/components/BrandIcon";

interface FloatingButton {
  brand: BrandType;
  label: string;
  href: string;
  bg: string;
  glow: string;
  tooltip: string;
}

export function FloatingActions() {
  const c = siteConfig.contact;

  const buttons: FloatingButton[] = [
    {
      brand: "whatsapp" as BrandType,
      label: "Conversar no WhatsApp",
      href: c.whatsapp,
      bg: "#25D366",
      glow: "rgba(37,211,102,0.5)",
      tooltip: "WhatsApp",
    },
    {
      brand: "linkedin" as BrandType,
      label: "Perfil no LinkedIn",
      href: c.linkedin,
      bg: "#0A66C2",
      glow: "rgba(10,102,194,0.5)",
      tooltip: "LinkedIn",
    },
    {
      brand: "email" as BrandType,
      label: "Enviar E-mail",
      href: c.email ? `mailto:${c.email}` : "",
      bg: "#2f9bff",
      glow: "rgba(47,155,255,0.5)",
      tooltip: "E-mail",
    },
  ].filter((b) => Boolean(b.href));

  return (
    <aside
      aria-label="Canais de contato direto"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3"
    >
      {buttons.map((btn) => (
        <a
          key={btn.brand}
          href={btn.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={btn.label}
          title={btn.label}
          className="group relative grid h-12 w-12 place-items-center transition-all duration-300 focus:outline-none"
          style={{
            background: btn.bg,
            borderRadius: "3px",
            boxShadow: `0 4px 14px rgba(0,0,0,0.4)`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px rgba(0,0,0,0.3), 0 0 14px ${btn.glow}, 0 0 28px ${btn.glow}`;
            (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 14px rgba(0,0,0,0.4)`;
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          }}
        >
          <span className="h-5 w-5" style={{ color: "#fff" }}>
            <BrandIcon brand={btn.brand} />
          </span>
          {/* Tooltip */}
          <span
            className="pointer-events-none absolute right-14 whitespace-nowrap px-3 py-1.5 text-xs font-medium opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 hidden sm:inline-block"
            style={{
              background: "#0a0e14",
              border: "1px solid #243041",
              color: "#ecebe6",
              borderRadius: "2px",
              fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
            }}
          >
            {btn.tooltip}
          </span>
        </a>
      ))}
    </aside>
  );
}
