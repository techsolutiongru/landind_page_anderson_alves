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
    <footer className="border-t border-white/10 bg-ink-950 py-10 text-sm text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 sm:flex-row sm:px-8">
        <div>
          <p className="font-display text-base text-white">
            {siteConfig.name} <span className="font-sans text-xs text-mint-400">· TechSolution</span>
          </p>
          <p className="mt-1 text-xs text-slate-500">
            © {new Date().getFullYear()} Anderson Alves. Compartilhar conhecimento. Criar soluções. Evoluir juntos.
          </p>
        </div>

        {socialLinks.length > 0 && (
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:border-mint-400/50 hover:bg-mint-400/10 hover:text-mint-400"
                aria-label={s.label}
              >
                <BrandIcon brand={s.brand} size={16} />
              </a>
            ))}
          </div>
        )}

        <p className="text-xs text-slate-500">Tecnologia, Gestão e Inteligência Artificial.</p>
      </div>
    </footer>
  );
}
