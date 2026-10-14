import Image from "next/image";
import { impact, fieldProjects } from "@/data/site";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

const layout = [
  "lg:col-span-4 lg:row-span-2 bg-ink-900 text-white",
  "lg:col-span-2 bg-white text-ink-900",
  "lg:col-span-2 bg-paper-2 text-ink-900 border-l-4 border-mint-500", // Evita bloco todo verde para respeitar a regra de 1 destaque por bloco
  "lg:col-span-3 bg-white text-ink-900",
  "lg:col-span-3 bg-paper-2 text-ink-900",
];

export function Impact() {
  return (
    <section id="impacto" className="bg-paper py-24 text-ink-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Projetos e impacto"
            title="Onde a tecnologia **muda a rotina** das pessoas"
            lead="Cinco frentes de atuação que conectam infraestrutura, gestão, inovação e saúde pública."
          />
        </Reveal>

        {/* Bento Grid de Impacto */}
        <div className="mt-14 grid gap-4 lg:grid-cols-6">
          {impact.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.07} className={cn("rounded-3xl", layout[i])}>
              <article
                className={cn(
                  "group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-8 shadow-sm ring-1 ring-ink-900/5 transition hover:-translate-y-1 hover:shadow-card",
                  layout[i]
                )}
              >
                <div>
                  {/* Um destaque verde pontual por cartão (ícone ou fundo) */}
                  <span
                    className={cn(
                      "grid h-12 w-12 place-items-center rounded-2xl",
                      i === 0 ? "bg-mint-400 text-ink-950" : "bg-ink-900 text-mint-400"
                    )}
                  >
                    <Icon name={c.icon} className="h-6 w-6" />
                  </span>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] opacity-60">0{i + 1}</p>
                  <h3 className={cn("mt-2 font-display leading-tight", i === 0 ? "text-3xl sm:text-4xl" : "text-2xl")}>
                    {c.title}
                  </h3>
                </div>
                <p
                  className={cn(
                    "mt-4 leading-relaxed",
                    i === 0 ? "text-lg text-slate-300" : "text-slate-600"
                  )}
                >
                  {c.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Galeria de Projetos em Campo (Melhoria 4: espaços preparados para fotos reais com fallback SVG geométrico) */}
        <div className="mt-24 border-t border-ink-900/10 pt-16 lg:mt-32">
          <Reveal>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint-600">Projetos em campo</p>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl">Registros de atuação prática e implantações</h3>
              </div>
              <p className="max-w-md text-xs text-slate-500">
                Espaços preparados para documentação visual. Em unidades de saúde, as imagens respeitam normas de privacidade e sigilo médico.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fieldProjects.map((p, idx) => (
              <Reveal key={p.id} delay={idx * 0.1}>
                <div className="group overflow-hidden rounded-3xl border border-ink-900/10 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-card">
                  {/* Moldura de imagem ou fallback visual geométrico */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink-900">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      /* Ilustração geométrica vetorial elegante em SVG quando não houver foto enviada */
                      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-ink-900 to-ink-800 p-6 text-slate-400">
                        <svg className="absolute inset-0 h-full w-full opacity-15" viewBox="0 0 200 120" fill="none">
                          <circle cx="100" cy="60" r="50" stroke="#34E3A0" strokeWidth="1" strokeDasharray="4 4" />
                          <circle cx="100" cy="60" r="30" stroke="#BFD6F2" strokeWidth="1" />
                          <line x1="20" y1="20" x2="180" y2="100" stroke="#34E3A0" strokeWidth="0.5" />
                          <line x1="20" y1="100" x2="180" y2="20" stroke="#BFD6F2" strokeWidth="0.5" />
                        </svg>
                        <div className="relative z-10 text-center">
                          <span className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-ink-800 text-mint-400 ring-1 ring-white/10">
                            <Icon name={idx === 0 ? "Building2" : idx === 1 ? "HeartPulse" : "Network"} className="h-5 w-5" />
                          </span>
                          <span className="mt-2 block font-mono text-[10px] uppercase tracking-wider text-slate-400">
                            Registro de Implantação
                          </span>
                        </div>
                      </div>
                    )}
                    <span className="absolute bottom-3 left-3 rounded-full bg-ink-950/80 px-2.5 py-1 text-[11px] font-medium text-slate-200 backdrop-blur">
                      {p.year}
                    </span>
                  </div>

                  <div className="mt-4 px-2 pb-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-mint-600">{p.location}</p>
                    <h4 className="mt-1 font-display text-lg leading-snug text-ink-900">{p.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{p.caption}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
