"use client";

import { useState } from "react";
import { LaserText } from "@/components/LaserText";
import { Sparkles, Copy, Check, Terminal, Lightbulb } from "lucide-react";
import { copyText } from "@/lib/prompt";

interface PromptPhase {
  id: number;
  title: string;
  question: string;
  field: "role" | "context" | "task" | "format";
  options: { label: string; value: string; desc: string }[];
}

const phases: PromptPhase[] = [
  {
    id: 1,
    title: "Fase 1 · Papel da IA",
    question: "Como você deseja que a inteligência artificial se posicione?",
    field: "role",
    options: [
      {
        label: "Arquiteto de Soluções & Tech Lead",
        value: "Atue como um Arquiteto de Soluções e Tech Lead sênior com vasta experiência em sistemas corporativos de alta demanda e infraestrutura resiliente.",
        desc: "Ideal para arquitetura, desenho de sistemas e decisões técnicas críticas.",
      },
      {
        label: "Gestor Estratégico de Projetos",
        value: "Atue como um Gestor de Projetos e Consultor Estratégico especialista em metodologias ágeis, gestão de riscos e alinhamento com stakeholders.",
        desc: "Ideal para cronogramas, métricas de valor e governança de entregas.",
      },
      {
        label: "Especialista em Liderança de Pessoas",
        value: "Atue como um Mentor Executivo e Líder de Pessoas focado em mediação de conflitos, engajamento de equipes e comunicação transparente.",
        desc: "Ideal para feedback, gestão humanizada e dinâmicas de equipe.",
      },
    ],
  },
  {
    id: 2,
    title: "Fase 2 · Cenário & Contexto",
    question: "Qual é o ambiente ou desafio que você está enfrentando?",
    field: "context",
    options: [
      {
        label: "Modernização & Migração de Sistemas",
        value: "O contexto envolve a substituição ou modernização de sistemas legados de missão crítica, exigindo estabilidade de dados e transição sem interrupção operacional.",
        desc: "Ambientes hospitalares, corporativos ou redes públicas.",
      },
      {
        label: "Estruturação de Equipes & Processos",
        value: "O contexto envolve estruturar do zero os fluxos de trabalho de uma equipe técnica, alinhando priorização, papéis e acompanhamento ágil de metas.",
        desc: "Crescimento de times, criação de novas áreas ou consultoria.",
      },
      {
        label: "Inovação & Automação Inteligente",
        value: "O contexto envolve introduzir ferramentas modernas, inteligência artificial aplicada e otimização de fluxos repetitivos no dia a dia.",
        desc: "Eficiência de tempo, redução de retrabalho e ganho de escala.",
      },
    ],
  },
  {
    id: 3,
    title: "Fase 3 · Objetivo Principal",
    question: "Qual é a entrega prática que a IA deve gerar para você?",
    field: "task",
    options: [
      {
        label: "Plano de Ação Passo a Passo",
        value: "Crie um plano de ação tático detalhado em etapas lógicas, com checklist de riscos, prioridades e estimativa de impactos.",
        desc: "Roteiro executivo direto e prático para implementação.",
      },
      {
        label: "Análise Crítica & Matriz de Decisão",
        value: "Realize um diagnóstico analítico profundo, comparando prós e contras das alternativas e fornecendo uma matriz de tomada de decisão fundamentada.",
        desc: "Comparações técnicas, trade-offs e embasamento sólido.",
      },
      {
        label: "Guia de Comunicação & Alinhamento",
        value: "Elabore um roteiro completo de comunicação para lideranças e equipes, contendo argumentos claros, mitigação de resistências e alinhamento de expectativas.",
        desc: "Apresentação para diretoria ou engajamento de colaboradores.",
      },
    ],
  },
  {
    id: 4,
    title: "Fase 4 · Formato de Saída",
    question: "Como você prefere visualizar a resposta gerada?",
    field: "format",
    options: [
      {
        label: "Estruturado em Markdown com Tabelas",
        value: "Apresente o resultado formatado em Markdown com títulos limpos, tópicos acionáveis, tabelas comparativas e destaques em negrito.",
        desc: "Ótimo para documentação, Notion ou compartilhamento.",
      },
      {
        label: "Sumário Executivo Direto",
        value: "Apresente o resultado em formato de sumário executivo conciso, direto ao ponto, com recomendações imediatas em tópicos numerados.",
        desc: "Leitura rápida para tomada de decisão ágil.",
      },
      {
        label: "Framework Didático em Fases",
        value: "Apresente o resultado estruturado em um framework progressivo dividido em: Diagnóstico, Estratégia, Execução e Monitoramento contínuo.",
        desc: "Visão 360 graus do projeto.",
      },
    ],
  },
];

export function AILab() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({
    role: phases[0].options[0].value,
    context: phases[1].options[0].value,
    task: phases[2].options[0].value,
    format: phases[3].options[0].value,
  });
  const [copied, setCopied] = useState(false);

  const currentPhase = phases[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / phases.length) * 100);

  const generatedPrompt = `[INSTRUÇÃO DE ENGENHARIA DE PROMPT]
Você é um consultor sênior de altíssimo nível.
Recomendação: Cole este prompt preferencialmente no Claude (ou na IA de sua escolha) para máxima profundidade analítica.

---
1. PAPEL E PERSONA:
${selections.role}

2. CONTEXTO DO DESAFIO:
${selections.context}

3. TAREFA PRINCIPAL:
${selections.task}

4. FORMATO E DIRETRIZES DE SAÍDA:
${selections.format}

5. PADRÃO DE QUALIDADE:
Forneça exemplos práticos, justifique as escolhas e priorize soluções viáveis, realistas e que respeitem a integração entre tecnologia, processos e pessoas.
---`;

  const handleSelect = (value: string) => {
    setSelections((prev) => ({ ...prev, [currentPhase.field]: value }));
  };

  const handleCopy = async () => {
    const ok = await copyText(generatedPrompt);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <section
      id="laboratorio"
      className="relative py-24 text-white lg:py-32"
      style={{ background: "#0b0b0c", borderTop: "1px solid #243041" }}
    >
      {/* Electric glow bleed */}
      <div
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full blur-[160px]"
        style={{ background: "rgba(47,155,255,0.06)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full blur-[140px]"
        style={{ background: "rgba(47,155,255,0.04)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Header centrado */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{
              border: "1px solid rgba(47,155,255,0.35)",
              background: "rgba(47,155,255,0.08)",
              color: "#2f9bff",
              borderRadius: "3px",
              fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
            }}
          >
            <Sparkles size={13} />
            Diferencial Exclusivo
          </span>
          <LaserText
            text="Laboratório de Inteligência Artificial"
            as="h2"
            delay={400}
            interval={35}
            className="block font-display text-3xl sm:text-4xl lg:text-5xl"
            style={{ color: "#ecebe6" } as React.CSSProperties}
          />
          <p className="mt-4 text-base leading-relaxed sm:text-lg" style={{ color: "#8e8d8a" }}>
            Gerador de prompts guiados de alta precisão. Responda às perguntas em 4 fases, gere seu prompt profissional e cole diretamente no{" "}
            <strong style={{ color: "#ecebe6" }}>Claude</strong> ou na sua IA de preferência.
          </p>
        </div>

        {/* Progress bar — silicon style */}
        <div className="max-w-4xl mx-auto mb-8">
          <div
            className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: "#697c90", fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)" }}
          >
            <span>Progresso da Estruturação</span>
            <span style={{ color: "#2f9bff" }}>{progressPercent}% Concluído</span>
          </div>
          <div
            className="h-[3px] w-full overflow-hidden"
            style={{ background: "#243041" }}
          >
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${progressPercent}%`,
                background: "linear-gradient(90deg, #2f9bff, #3aa3ff)",
                boxShadow: "0 0 10px rgba(47,155,255,0.6)",
              }}
            />
          </div>

          {/* Phase tabs */}
          <div
            className="mt-[1px] grid grid-cols-4 gap-[1px]"
            style={{ background: "#243041" }}
          >
            {phases.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setCurrentStep(idx)}
                className="py-2 px-1 text-xs font-medium transition-colors"
                style={{
                  background: idx === currentStep ? "rgba(47,155,255,0.12)" : "#0b0b0c",
                  color:
                    idx === currentStep
                      ? "#2f9bff"
                      : idx < currentStep
                      ? "#8e8d8a"
                      : "#697c90",
                  borderBottom: idx === currentStep ? "2px solid #2f9bff" : "2px solid transparent",
                  fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                }}
              >
                <span className="hidden sm:inline">Fase </span>0{p.id}
              </button>
            ))}
          </div>
        </div>

        {/* Main area — side by side */}
        <div className="grid gap-[1px] lg:grid-cols-12 max-w-6xl mx-auto"
          style={{ background: "#243041" }}
        >
          {/* Col 1: choices */}
          <div
            className="lg:col-span-7 p-6 sm:p-8"
            style={{ background: "#0a0e14" }}
          >
            <div
              className="flex items-center justify-between pb-4 mb-4"
              style={{ borderBottom: "1px solid #243041" }}
            >
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{
                  color: "#2f9bff",
                  fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                }}
              >
                {currentPhase.title}
              </span>
              <span
                className="text-xs"
                style={{ color: "#697c90", fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)" }}
              >
                Passo {currentStep + 1} de {phases.length}
              </span>
            </div>

            <h3 className="font-display text-xl font-bold sm:text-2xl mb-6" style={{ color: "#ecebe6" }}>
              {currentPhase.question}
            </h3>

            <div className="space-y-[1px]" style={{ background: "#243041" }}>
              {currentPhase.options.map((opt) => {
                const isSelected = selections[currentPhase.field] === opt.value;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className="w-full p-4 text-left transition-colors"
                    style={{
                      background: isSelected ? "rgba(47,155,255,0.1)" : "#0b0b0c",
                      borderLeft: isSelected ? "2px solid #2f9bff" : "2px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.background = "#0d1520";
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.background = "#0b0b0c";
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm font-bold"
                        style={{ color: isSelected ? "#2f9bff" : "#ecebe6" }}
                      >
                        {opt.label}
                      </span>
                      {isSelected && <Check size={16} style={{ color: "#2f9bff" }} />}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed" style={{ color: "#697c90" }}>
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div
              className="mt-8 flex items-center justify-between pt-5"
              style={{ borderTop: "1px solid #243041" }}
            >
              <button
                type="button"
                disabled={currentStep === 0}
                onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                className="text-xs font-semibold uppercase tracking-wider transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ color: "#697c90", fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)" }}
              >
                ← Fase Anterior
              </button>

              {currentStep < phases.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => Math.min(phases.length - 1, s + 1))}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-90"
                  style={{ background: "#2f9bff", color: "#0b0b0c", borderRadius: "2px" }}
                >
                  Próxima Fase →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-90"
                  style={{
                    background: "#2f9bff",
                    color: "#0b0b0c",
                    boxShadow: "0 0 14px rgba(47,155,255,0.4)",
                    borderRadius: "2px",
                  }}
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? "Copiado!" : "Copiar Prompt Final"}
                </button>
              )}
            </div>
          </div>

          {/* Col 2: prompt preview */}
          <div
            className="lg:col-span-5 flex flex-col p-6 sm:p-8"
            style={{ background: "#0b0b0c" }}
          >
            {/* Preview header */}
            <div
              className="flex items-center justify-between pb-4 mb-4"
              style={{ borderBottom: "1px solid #243041" }}
            >
              <div className="flex items-center gap-2">
                <Terminal size={14} style={{ color: "#2f9bff" }} />
                <span
                  className="text-xs uppercase tracking-wider"
                  style={{
                    color: "#8e8d8a",
                    fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                  }}
                >
                  Pré-Visualização do Prompt
                </span>
              </div>
              <span
                className="px-2 py-0.5 text-[10px] font-bold uppercase"
                style={{
                  background: "rgba(47,155,255,0.12)",
                  color: "#2f9bff",
                  border: "1px solid rgba(47,155,255,0.3)",
                  borderRadius: "2px",
                  fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                }}
              >
                Pronto para Claude
              </span>
            </div>

            {/* Prompt text */}
            <div
              className="flex-1 max-h-[360px] overflow-y-auto p-4 font-mono text-xs leading-relaxed [scrollbar-width:thin]"
              style={{
                border: "1px solid #243041",
                background: "#0a0e14",
                color: "#8e8d8a",
              }}
            >
              <pre className="whitespace-pre-wrap font-sans text-xs">
                {generatedPrompt}
              </pre>
            </div>

            {/* Copy actions */}
            <div
              className="mt-4 pt-4"
              style={{ borderTop: "1px solid #243041" }}
            >
              <div className="flex items-center gap-2 text-xs mb-3" style={{ color: "#697c90" }}>
                <Lightbulb size={13} style={{ color: "#2f9bff", flexShrink: 0 }} />
                <span>
                  Copie e cole no{" "}
                  <strong style={{ color: "#ecebe6" }}>Claude</strong> para obter a resposta mais aprofundada.
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 text-sm font-bold uppercase tracking-wider transition-opacity hover:opacity-90"
                style={{
                  background: "#2f9bff",
                  color: "#0b0b0c",
                  boxShadow: "0 0 20px rgba(47,155,255,0.35)",
                  borderRadius: "2px",
                }}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Prompt Copiado com Sucesso!" : "Copiar Prompt para a Área de Transferência"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
