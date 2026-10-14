"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp, History, Sparkles } from "lucide-react";
import { categories, commands, commandsBySlug, guidedCases } from "@/data/commands";
import { buildPrompt, copyText } from "@/lib/prompt";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CommandList, type Filter } from "@/components/lab/CommandList";
import { PromptWorkbench } from "@/components/lab/PromptWorkbench";
import { NetworkBackdrop } from "@/components/NetworkBackdrop";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

interface HistoryItem {
  slug: string;
  prompt: string;
  at: number;
}

const normalize = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function Lab() {
  // Pré-selecionado por padrão
  const [selected, setSelected] = useState("thenvsnow");
  const [valuesBySlug, setValuesBySlug] = useState<Record<string, Record<string, string>>>({});
  const [editedBySlug, setEditedBySlug] = useState<Record<string, string | undefined>>({});
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useLocalStorage<string[]>("lab:favorites", []);
  const [history, setHistory] = useLocalStorage<HistoryItem[]>("lab:history", []);
  const [showAllCommands, setShowAllCommands] = useState(false);

  const workbenchRef = useRef<HTMLDivElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();

  const command = commandsBySlug[selected] ?? commands[0];
  const values = valuesBySlug[selected] ?? {};
  const generated = useMemo(() => buildPrompt(command, values), [command, values]);
  const edited = editedBySlug[selected];
  const prompt = edited ?? generated;

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    return commands.filter((c) => {
      if (filter === "favorites" && !favorites.includes(c.slug)) return false;
      if (filter !== "all" && filter !== "favorites" && c.category !== filter) return false;
      if (!q) return true;
      const cat = categories.find((x) => x.id === c.category)?.label ?? "";
      return normalize(`${c.slug} ${c.title} ${c.description} ${cat}`).includes(q);
    });
  }, [query, filter, favorites]);

  const select = useCallback((slug: string) => {
    setSelected(slug);
    setCopied(false);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      requestAnimationFrame(() => workbenchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, []);

  const changeValue = (key: string, value: string) => {
    setValuesBySlug((prev) => ({ ...prev, [selected]: { ...prev[selected], [key]: value } }));
    setEditedBySlug((prev) => ({ ...prev, [selected]: undefined }));
  };

  const copy = async () => {
    const ok = await copyText(prompt);
    if (!ok) return;
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2200);
    setHistory((prev) => [
      { slug: selected, prompt, at: Date.now() },
      ...prev.filter((h) => !(h.slug === selected && h.prompt === prompt)),
    ].slice(0, 8));
  };

  const toggleFavorite = () =>
    setFavorites((prev) => (prev.includes(selected) ? prev.filter((s) => s !== selected) : [...prev, selected]));

  const loadHistory = (h: HistoryItem) => {
    if (!commandsBySlug[h.slug]) return;
    setEditedBySlug((prev) => ({ ...prev, [h.slug]: h.prompt }));
    select(h.slug);
  };

  return (
    <section id="laboratorio" className="relative isolate overflow-hidden bg-ink-950 py-24 text-white lg:py-32">
      <NetworkBackdrop className="absolute inset-0 -z-10 h-full w-full text-skysoft/20 [mask-image:radial-gradient(ellipse_at_80%_10%,black,transparent_60%)]" />
      <div className="absolute -left-40 top-40 -z-10 h-96 w-96 rounded-full bg-mint-500/10 blur-[120px]" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            dark
            eyebrow="Laboratório de Inteligência Artificial"
            title="Escolha um comando e monte seu prompt com **orientação guiada**"
            lead="Use este laboratório para estruturar ideias, análises, estratégias e conteúdos. Responda às perguntas, edite o prompt e copie para a IA de sua preferência."
          />
        </Reveal>

        {/* MELHORIA 2: Casos Guiados em Cards Grandes e Amigáveis (Menos Denso ao Abrir) */}
        <Reveal delay={0.1}>
          <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-7 backdrop-blur-md">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-mint-400">
                  <Sparkles size={14} aria-hidden="true" /> 10 Casos Guiados com Formulário Próprio
                </p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  Selecione um caso guiado para abrir seu formulário dedicado no bancada de trabalho abaixo.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {guidedCases.map((g) => {
                const isActive = selected === g.slug;
                return (
                  <button
                    key={g.slug}
                    type="button"
                    onClick={() => select(g.slug)}
                    className={cn(
                      "group flex flex-col justify-between rounded-2xl border p-4 text-left transition duration-200 focus:outline-none focus:ring-2 focus:ring-mint-400",
                      isActive
                        ? "border-mint-400 bg-mint-400/15 shadow-glow"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            "grid h-10 w-10 place-items-center rounded-xl transition",
                            isActive ? "bg-mint-400 text-ink-950" : "bg-ink-800 text-mint-400 group-hover:bg-ink-700"
                          )}
                        >
                          <Icon name={g.icon} className="h-5 w-5" />
                        </span>
                        <span className="font-mono text-[11px] text-slate-400">/{g.slug}</span>
                      </div>
                      <h4 className="mt-3 font-display text-base font-semibold text-white">{g.title}</h4>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-300">{g.description}</p>
                    </div>
                    <span
                      className={cn(
                        "mt-3 text-[11px] font-semibold transition",
                        isActive ? "text-mint-300" : "text-slate-400 group-hover:text-white"
                      )}
                    >
                      {isActive ? "Selecionado ✓" : "Preencher formulário →"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Botão expansor dos 97 comandos */}
            <div className="mt-6 border-t border-white/10 pt-4 text-center">
              <button
                type="button"
                onClick={() => setShowAllCommands((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:border-mint-400 hover:text-mint-300 focus:outline-none focus:ring-2 focus:ring-mint-400"
                aria-expanded={showAllCommands}
              >
                {showAllCommands ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {showAllCommands ? "Ocultar catálogo completo" : "Ver todos os 97 comandos do acervo"}
              </button>
            </div>
          </div>
        </Reveal>

        {/* Workbench + Lista Completa (condicional/expansível) */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {showAllCommands && (
            <div className="lg:col-span-5">
              <CommandList
                commands={visible}
                total={commands.length}
                query={query}
                filter={filter}
                selected={selected}
                favorites={favorites}
                onQuery={setQuery}
                onFilter={setFilter}
                onSelect={select}
              />

              {history.length > 0 && (
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      <History size={14} aria-hidden="true" /> Histórico recente
                    </p>
                    <button
                      type="button"
                      onClick={() => setHistory([])}
                      className="text-xs text-slate-400 underline-offset-2 hover:text-white hover:underline focus:outline-none"
                    >
                      Limpar
                    </button>
                  </div>
                  <ul className="space-y-1.5">
                    {history.map((h) => (
                      <li key={`${h.slug}-${h.at}`}>
                        <button
                          type="button"
                          onClick={() => loadHistory(h)}
                          className="w-full rounded-xl bg-white/[0.04] px-3 py-2 text-left transition hover:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-mint-400"
                        >
                          <span className="font-mono text-xs text-mint-300">/{h.slug}</span>
                          <span className="mt-0.5 block truncate text-xs text-slate-400">
                            {h.prompt.replace(/\s+/g, " ").slice(0, 80)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div
            ref={workbenchRef}
            className={cn("scroll-mt-24", showAllCommands ? "lg:col-span-7" : "lg:col-span-12")}
          >
            <PromptWorkbench
              key={selected}
              command={command}
              values={values}
              generated={generated}
              prompt={prompt}
              edited={edited !== undefined && edited !== generated}
              isFavorite={favorites.includes(selected)}
              copied={copied}
              onChangeValue={changeValue}
              onChangePrompt={(v) => setEditedBySlug((prev) => ({ ...prev, [selected]: v }))}
              onRestore={() => setEditedBySlug((prev) => ({ ...prev, [selected]: undefined }))}
              onClear={() => {
                setValuesBySlug((prev) => ({ ...prev, [selected]: {} }));
                setEditedBySlug((prev) => ({ ...prev, [selected]: undefined }));
              }}
              onCopy={copy}
              onToggleFavorite={toggleFavorite}
              onSelectRelated={select}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
