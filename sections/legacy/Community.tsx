"use client";

import { Sparkles, BookOpen, Users, ArrowUpRight, ShieldCheck, HeartHandshake, FileCode2, Ban, Lock, Lightbulb } from "lucide-react";
import { BrandIcon } from "@/components/BrandIcon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

// Link editável da comunidade do WhatsApp (preencher com o link oficial)
export const COMMUNITY_CONFIG = {
  name: "TechSolution TechLab — TI, IA & Projetos",
  slogan: "Compartilhar conhecimento. Criar soluções. Evoluir juntos.",
  whatsappGroupUrl: "", // Insira o link de convite oficial do grupo (ex: https://chat.whatsapp.com/...)
  description:
    "Comunidade para compartilhar conhecimento, descobrir ferramentas e desenvolver projetos nas áreas de Tecnologia da Informação, Inteligência Artificial, automação e inovação.",
  purpose:
    "Nosso propósito: aprender juntos, compartilhar experiências práticas e transformar conhecimento em projetos reais.",
  pillars: [
    {
      icon: Sparkles,
      title: "Inteligência Artificial & Prompts",
      desc: "Ferramentas práticas de IA, engenharia de prompts avançada e fluxos de automação para produtividade no dia a dia.",
    },
    {
      icon: BookOpen,
      title: "TI, Infraestrutura & Redes",
      desc: "Suporte corporativo, rotinas em Windows & PowerShell, infraestrutura de redes e sustentação de sistemas críticos.",
    },
    {
      icon: Users,
      title: "Projetos, Cursos & Networking",
      desc: "Desenvolvimento de aplicações, troca de experiências entre profissionais e descobertas de cursos e aprendizado contínuo.",
    },
  ],
  rules: [
    {
      icon: HeartHandshake,
      title: "Respeito e empatia mútua",
      desc: "Acolhemos desde iniciantes até especialistas. Toda dúvida é legítima e tratada com consideração.",
    },
    {
      icon: FileCode2,
      title: "Foco temático em TI, IA & Inovação",
      desc: "Conteúdos direcionados a tecnologia, inteligência artificial, suporte, infraestrutura, desenvolvimento e gestão.",
    },
    {
      icon: Ban,
      title: "Zero spam e correntes",
      desc: "Proibido autopromoção excessiva, correntes, pirâmides ou qualquer propaganda não alinhada ao propósito educativo.",
    },
    {
      icon: Lightbulb,
      title: "Ferramentas com utilidade e fonte",
      desc: "Ao compartilhar uma tecnologia ou tutorial, explique brevemente sua aplicação real e indique a fonte original.",
    },
    {
      icon: Lock,
      title: "Sigilo absoluto e ética",
      desc: "Jamais divulgue senhas, chaves de API, credenciais, dados de clientes ou informações institucionais confidenciais.",
    },
    {
      icon: ShieldCheck,
      title: "Segurança digital",
      desc: "Não compartilhe links encurtados suspeitos ou arquivos executáveis que possam comprometer dispositivos dos colegas.",
    },
  ],
};

export function Community() {
  const hasLink = Boolean(COMMUNITY_CONFIG.whatsappGroupUrl);

  return (
    <section id="comunidade" className="relative isolate overflow-hidden bg-ink-950 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-mint-400/30 bg-mint-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-mint-400">
              <Users size={14} /> Comunidade Oficial
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl">
              TechSolution TechLab <span className="italic text-mint-400">— TI, IA & Projetos</span>
            </h2>
            <p className="mt-4 font-display text-xl text-slate-300">
              &ldquo;{COMMUNITY_CONFIG.slogan}&rdquo;
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              {COMMUNITY_CONFIG.description}
            </p>
            <p className="mt-2 text-xs font-mono text-mint-400">
              {COMMUNITY_CONFIG.purpose}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3">
              {hasLink ? (
                <a
                  href={COMMUNITY_CONFIG.whatsappGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#20ba59] shadow-[0_8px_30px_rgba(37,211,102,0.3)]"
                >
                  <BrandIcon brand="whatsapp" size={20} /> Entrar na Comunidade no WhatsApp
                  <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : (
                <div className="inline-flex items-center gap-2.5 rounded-full border border-dashed border-[#25D366]/40 bg-[#25D366]/10 px-8 py-3.5 text-sm text-slate-300">
                  <BrandIcon brand="whatsapp" size={18} className="text-[#25D366]" />
                  <span>Convite do WhatsApp configurável (link em preparação)</span>
                </div>
              )}
              <p className="text-[11px] text-slate-400">
                A entrada na comunidade está sujeita à aprovação dos administradores no WhatsApp para garantir a segurança de todos.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Pilares da Comunidade */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {COMMUNITY_CONFIG.pillars.map((pillar, i) => {
            const IconComp = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition hover:border-mint-400/40 hover:bg-white/[0.04]">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink-900 text-mint-400">
                    <IconComp size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-lg text-white">{pillar.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{pillar.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Regras e Diretrizes de Convivência */}
        <div className="mt-20 border-t border-white/10 pt-16">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mint-400">
                Diretrizes de Convivência
              </span>
              <h3 className="mt-2 font-display text-2xl text-white sm:text-3xl">
                Regras para uma comunidade ativa e segura
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                Princípios fundamentais acordados por todos os participantes do TechSolution TechLab.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMMUNITY_CONFIG.rules.map((rule, idx) => {
              const RuleIcon = rule.icon;
              return (
                <Reveal key={rule.title} delay={idx * 0.05}>
                  <div className="flex h-full gap-4 rounded-2xl border border-white/5 bg-ink-900/60 p-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-mint-400">
                      <RuleIcon size={18} />
                    </span>
                    <div>
                      <h4 className="font-display text-sm font-semibold text-white">{rule.title}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-slate-400">{rule.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
