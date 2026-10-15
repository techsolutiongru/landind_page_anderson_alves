"use client";

import { siteConfig } from "@/data/site";
import { BrandIcon, type BrandType } from "@/components/BrandIcon";

export function Footer() {
  const c = siteConfig.contact;

  const rawSocialLinks: { brand: BrandType; href: string; label: string }[] = [
    { brand: "whatsapp", href: c.whatsapp, label: "WhatsApp" },
    { brand: "linkedin", href: c.linkedin, label: "LinkedIn" },
    { brand: "github", href: c.github, label: "GitHub" },
    { brand: "instagram", href: c.instagram, label: "Instagram" },
    { brand: "email", href: c.email ? `mailto:${c.email}` : "", label: "E-mail" },
  ];

  const socialLinks = rawSocialLinks.filter((s) => Boolean(s.href));

  return (
    <footer
      className="py-10 text-sm"
      style={{
        borderTop: "1px solid #243041",
        background: "#0a0e14",
        color: "#697c90",
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 sm:flex-row sm:px-8">
        <div>
          <p className="font-display text-base" style={{ color: "#ecebe6" }}>
            {siteConfig.name}{" "}
            <span
              className="text-xs"
              style={{
                color: "#2f9bff",
                fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
              }}
            >
              · Tech Solution
            </span>
          </p>
          <p className="mt-1 text-xs" style={{ color: "#697c90" }}>
            © {new Date().getFullYear()} Anderson Alves. Compartilhar conhecimento. Criar soluções. Evoluir juntos.
          </p>
        </div>

        {socialLinks.length > 0 && (
          <div className="flex items-center gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="grid h-9 w-9 place-items-center transition-colors"
                style={{
                  border: "1px solid #243041",
                  background: "#0b0b0c",
                  color: "#697c90",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(47,155,255,0.5)";
                  e.currentTarget.style.color = "#2f9bff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#243041";
                  e.currentTarget.style.color = "#697c90";
                }}
                aria-label={s.label}
              >
                <BrandIcon brand={s.brand} size={16} />
              </a>
            ))}
          </div>
        )}

        <p
          className="text-xs"
          style={{
            color: "#697c90",
            fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
          }}
        >
          Tecnologia · Gestão · IA
        </p>
      </div>
    </footer>
  );
}
