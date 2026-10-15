"use client";

import { siteConfig } from "@/data/site";
import { BrandIcon, type BrandType } from "@/components/BrandIcon";
import { Icon } from "@/components/Icon";
import { LaserText } from "@/components/LaserText";

const c = siteConfig.contact;

interface Channel {
  brand: BrandType;
  label: string;
  href: string;
  hint: string;
  accentHover: string;
}

const channels: Channel[] = [
  {
    brand: "whatsapp" as BrandType,
    label: "WhatsApp",
    href: c.whatsapp,
    hint: "Conversa direta e ágil",
    accentHover: "#25D366",
  },
  {
    brand: "linkedin" as BrandType,
    label: "LinkedIn",
    href: c.linkedin,
    hint: "Conecte-se profissionalmente",
    accentHover: "#0A66C2",
  },
  {
    brand: "github" as BrandType,
    label: "GitHub",
    href: c.github,
    hint: "Projetos, códigos e repositórios",
    accentHover: "#e5e7eb",
  },
  {
    brand: "instagram" as BrandType,
    label: "Instagram",
    href: c.instagram,
    hint: "Bastidores e conteúdos",
    accentHover: "#E1306C",
  },
  {
    brand: "email" as BrandType,
    label: "E-mail",
    href: c.email ? `mailto:${c.email}` : "",
    hint: c.email || "Escreva uma mensagem",
    accentHover: "#2f9bff",
  },
  {
    brand: "website" as BrandType,
    label: c.networkLabel || "Tech Solution",
    href: c.network,
    hint: "Ecossistema profissional e TI",
    accentHover: "#38bdf8",
  },
].filter((ch) => Boolean(ch.href));

export function Contact() {
  return (
    <section
      id="contato"
      className="relative py-24 lg:py-32"
      style={{ background: "#0a0e14", borderTop: "1px solid #243041" }}
    >
      {/* Scan line */}
      <div
        className="absolute left-0 right-0 top-0 h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #2f9bff 20%, rgba(47,155,255,0.3) 80%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">

          {/* Left: heading */}
          <div className="lg:col-span-5">
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.22em] block mb-2"
              style={{
                color: "#2f9bff",
                fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
              }}
            >
              Contato & Redes Oficiais
            </span>
            <LaserText
              text="Vamos conversar sobre tecnologia com propósito?"
              as="h2"
              delay={300}
              interval={30}
              className="block font-display text-2xl sm:text-3xl"
              style={{ color: "#ecebe6" } as React.CSSProperties}
            />
            <p className="mt-4 text-base leading-relaxed" style={{ color: "#8e8d8a" }}>
              Projetos, parcerias, consultoria ou apenas uma boa troca de ideias. Escolha o canal oficial que preferir.
            </p>
          </div>

          {/* Right: channel grid */}
          <ul className="grid gap-[1px] sm:grid-cols-2 lg:col-span-7"
            style={{ background: "#243041", alignContent: "start" }}
          >
            {channels.map((ch) => (
              <li key={ch.brand + ch.label}>
                {ch.href ? (
                  <a
                    href={ch.href}
                    target={ch.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group flex h-full items-center gap-4 p-5 transition-colors"
                    style={{ background: "#0a0e14" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#0d1520";
                      const dot = e.currentTarget.querySelector("[data-dot]") as HTMLElement;
                      if (dot) dot.style.boxShadow = `0 0 8px ${ch.accentHover}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#0a0e14";
                      const dot = e.currentTarget.querySelector("[data-dot]") as HTMLElement;
                      if (dot) dot.style.boxShadow = "none";
                    }}
                  >
                    <span
                      data-dot
                      className="grid h-12 w-12 shrink-0 place-items-center transition-all duration-300"
                      style={{
                        border: "1px solid #243041",
                        background: "rgba(47,155,255,0.06)",
                        color: "#8e8d8a",
                        borderRadius: "3px",
                      }}
                    >
                      <BrandIcon brand={ch.brand} size={22} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className="block font-display text-base"
                        style={{ color: "#ecebe6" }}
                      >
                        {ch.label}
                      </span>
                      <span
                        className="block truncate text-xs"
                        style={{ color: "#697c90", fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)" }}
                      >
                        {ch.hint}
                      </span>
                    </span>
                    <Icon
                      name="ArrowUpRight"
                      className="h-4 w-4 text-slate-600 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-electric-blue"
                    />
                  </a>
                ) : (
                  <div
                    className="flex h-full items-center gap-4 p-5 opacity-50"
                    style={{
                      background: "#0a0e14",
                      border: "1px dashed #243041",
                    }}
                  >
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center"
                      style={{
                        border: "1px solid #243041",
                        background: "#0a0e14",
                        color: "#697c90",
                        borderRadius: "3px",
                      }}
                    >
                      <BrandIcon brand={ch.brand} size={22} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-base" style={{ color: "#8e8d8a" }}>
                        {ch.label}
                      </span>
                      <span className="block text-xs" style={{ color: "#697c90" }}>
                        Link em breve
                      </span>
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
