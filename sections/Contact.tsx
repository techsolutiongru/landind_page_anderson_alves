import { siteConfig } from "@/data/site";
import { BrandIcon, type BrandType } from "@/components/BrandIcon";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const c = siteConfig.contact;

interface Channel {
  brand: BrandType;
  label: string;
  href: string;
  hint: string;
  accentColor: string;
  iconBg: string;
}

const channels: Channel[] = [
  {
    brand: "whatsapp",
    label: "WhatsApp",
    href: c.whatsapp,
    hint: "Conversa direta e ágil",
    accentColor: "hover:border-[#25D366] hover:shadow-[0_8px_30px_rgba(37,211,102,0.18)]",
    iconBg: "bg-[#25D366]/15 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white",
  },
  {
    brand: "linkedin",
    label: "LinkedIn",
    href: c.linkedin,
    hint: "Conecte-se profissionalmente",
    accentColor: "hover:border-[#0A66C2] hover:shadow-[0_8px_30px_rgba(10,102,194,0.18)]",
    iconBg: "bg-[#0A66C2]/15 text-[#0A66C2] group-hover:bg-[#0A66C2] group-hover:text-white",
  },
  {
    brand: "github",
    label: "GitHub",
    href: c.github,
    hint: "Projetos, códigos e repositórios",
    accentColor: "hover:border-slate-800 hover:shadow-[0_8px_30px_rgba(15,23,42,0.18)]",
    iconBg: "bg-slate-200 text-slate-800 group-hover:bg-slate-900 group-hover:text-white",
  },
  {
    brand: "instagram",
    label: "Instagram",
    href: c.instagram,
    hint: "Bastidores e conteúdos",
    accentColor: "hover:border-[#E1306C] hover:shadow-[0_8px_30px_rgba(225,48,108,0.18)]",
    iconBg: "bg-[#E1306C]/15 text-[#E1306C] group-hover:bg-[#E1306C] group-hover:text-white",
  },
  {
    brand: "email",
    label: "E-mail",
    href: c.email ? `mailto:${c.email}` : "",
    hint: c.email || "Escreva uma mensagem",
    accentColor: "hover:border-mint-500 hover:shadow-[0_8px_30px_rgba(69,219,165,0.18)]",
    iconBg: "bg-mint-400/15 text-mint-600 group-hover:bg-mint-500 group-hover:text-white",
  },
  {
    brand: "website",
    label: c.networkLabel || "Tech Solution",
    href: c.network,
    hint: "Ecossistema profissional e TI",
    accentColor: "hover:border-sky-500 hover:shadow-[0_8px_30px_rgba(14,165,233,0.18)]",
    iconBg: "bg-sky-400/15 text-sky-600 group-hover:bg-sky-500 group-hover:text-white",
  },
];

function ChannelItem({
  brand,
  label,
  hint,
  iconBg,
  enabled,
}: {
  brand: BrandType;
  label: string;
  hint: string;
  iconBg: string;
  enabled: boolean;
}) {
  return (
    <>
      <span
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-colors duration-300 ${
          enabled ? iconBg : "bg-slate-100 text-slate-400"
        }`}
      >
        <BrandIcon brand={brand} size={22} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-lg text-ink-900">{label}</span>
        <span className="block truncate text-xs text-slate-500">
          {enabled ? hint : "Link em breve"}
        </span>
      </span>
      {enabled && (
        <Icon
          name="ArrowUpRight"
          className="h-5 w-5 text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-900"
        />
      )}
    </>
  );
}

export function Contact() {
  return (
    <section id="contato" className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="Contato & Redes Oficiais"
              title="Vamos conversar sobre **tecnologia com propósito**?"
              lead="Projetos, parcerias, consultoria ou apenas uma boa troca de ideias. Escolha o canal oficial que preferir."
            />
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {channels.map((ch, i) => (
              <li key={ch.brand + ch.label}>
                <Reveal delay={i * 0.05} className="h-full">
                  {ch.href ? (
                    <a
                      href={ch.href}
                      target={ch.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className={`group flex h-full items-center gap-4 rounded-3xl border border-ink-900/10 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-card ${ch.accentColor}`}
                    >
                      <ChannelItem
                        brand={ch.brand}
                        label={ch.label}
                        hint={ch.hint}
                        iconBg={ch.iconBg}
                        enabled
                      />
                    </a>
                  ) : (
                    <div className="flex h-full items-center gap-4 rounded-3xl border border-dashed border-ink-900/20 bg-white/40 p-5 opacity-70">
                      <ChannelItem
                        brand={ch.brand}
                        label={ch.label}
                        hint={ch.hint}
                        iconBg={ch.iconBg}
                        enabled={false}
                      />
                    </div>
                  )}
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
