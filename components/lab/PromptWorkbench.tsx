"use client";

import { useState } from "react";
import { Check, Copy, Eraser, RotateCcw, Star } from "lucide-react";
import type { PromptCommand } from "@/data/types";
import { categories, commandsBySlug, getPreviewOutline } from "@/data/commands";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

interface Props {
  command: PromptCommand;
  values: Record<string, string>;
  generated: string;
  prompt: string;
  edited: boolean;
  isFavorite: boolean;
  copied: boolean;
  onChangeValue: (key: string, value: string) => void;
  onChangePrompt: (value: string) => void;
  onRestore: () => void;
  onClear: () => void;
  onCopy: () => void;
  onToggleFavorite: () => void;
  onSelectRelated: (slug: string) => void;
}

const inputBase =
  "w-full rounded-xl border border-ink-900/15 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-slate-400 transition focus:border-mint-600 focus:outline-none focus:ring-2 focus:ring-mint-500/30";

export function PromptWorkbench(p: Props) {
  const { command: c } = p;
  const [tab, setTab] = useState<"example" | "preview">("preview");
  const category = categories.find((x) => x.id === c.category);
  const filled = c.fields.filter((f) => (p.values[f.key] ?? "").trim()).length;
  const progress = Math.round((filled / c.fields.length) * 100);
  const related = c.relatedCommands.map((s) => commandsBySlug[s]).filter(Boolean);
  const topicValue = (p.values[c.fields[0].key] ?? "").trim();

  return (
    <div className="rounded-[1.75rem] bg-paper p-5 text-ink-900 shadow-card ring-1 ring-white/10 sm:p-8">
      {/* Cabeçalho do comando */}
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink-900 text-mint-400 sm:h-14 sm:w-14">
          <Icon name={c.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs font-semibold text-mint-600 sm:text-sm">/{c.slug}</p>
          <h3 className="font-display text-2xl leading-tight sm:text-3xl">{c.title}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{category?.label}</p>
        </div>
        <button
          type="button"
          onClick={p.onToggleFavorite}
          aria-pressed={p.isFavorite}
          aria-label={p.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className={cn(
            "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition focus:outline-none focus:ring-2 focus:ring-mint-500",
            p.isFavorite
              ? "border-mint-500 bg-mint-400 text-ink-950"
              : "border-ink-900/15 text-slate-500 hover:border-mint-500 hover:text-ink-900"
          )}
        >
          <Star size={18} fill={p.isFavorite ? "currentColor" : "none"} aria-hidden="true" />
        </button>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">{c.description}</p>
      <p className="mt-2 text-xs leading-normal text-slate-500 sm:text-sm">
        <strong className="font-semibold text-ink-800">Quando usar:</strong> {c.useCase}.
      </p>

      {/* Passo 1: Formulário Guiado */}
      <div className="mt-8 border-t border-ink-900/10 pt-6">
        <div className="mb-2 flex items-center justify-between gap-4">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-ink-900">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-ink-900 text-xs text-white">1</span>
            Responda às perguntas guiadas
          </h4>
          <span className="text-xs font-medium text-slate-500" aria-live="polite">
            {filled}/{c.fields.length} preenchidos
          </span>
        </div>
        <div className="mb-4 h-1 overflow-hidden rounded-full bg-ink-900/10" aria-hidden="true">
          <div className="h-full rounded-full bg-mint-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          {c.fields.map((f) => {
            const id = `${c.slug}-${f.key}`;
            const v = p.values[f.key] ?? "";
            const wide = f.type === "textarea";
            return (
              <div key={f.key} className={cn(wide && "sm:col-span-2")}>
                <label htmlFor={id} className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  {f.label}
                </label>
                {f.type === "select" ? (
                  <select
                    id={id}
                    value={v}
                    onChange={(e) => p.onChangeValue(f.key, e.target.value)}
                    className={inputBase}
                  >
                    <option value="">Selecione...</option>
                    {f.options?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : f.type === "textarea" ? (
                  <textarea
                    id={id}
                    rows={2}
                    value={v}
                    placeholder={f.placeholder}
                    onChange={(e) => p.onChangeValue(f.key, e.target.value)}
                    className={cn(inputBase, "resize-y")}
                  />
                ) : (
                  <input
                    id={id}
                    type="text"
                    value={v}
                    placeholder={f.placeholder}
                    onChange={(e) => p.onChangeValue(f.key, e.target.value)}
                    className={inputBase}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Passo 2: Prompt Editável em Tempo Real */}
      <div className="mt-8 border-t border-ink-900/10 pt-6">
        <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink-900">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-ink-900 text-xs text-white">2</span>
          Prompt gerado em tempo real (editável)
        </h4>
        <label htmlFor="prompt-output" className="sr-only">
          Prompt gerado editável
        </label>
        <textarea
          id="prompt-output"
          value={p.prompt}
          onChange={(e) => p.onChangePrompt(e.target.value)}
          rows={11}
          spellCheck={false}
          className="w-full resize-y rounded-2xl border border-ink-900/15 bg-white p-4 font-mono text-[13px] leading-relaxed text-ink-900 focus:border-mint-600 focus:outline-none focus:ring-2 focus:ring-mint-500/30"
        />
        <div className="mt-2 flex min-h-[1.25rem] items-center justify-between text-xs text-slate-500">
          <span>{p.edited ? "Editado manualmente." : "Campos vazios aparecem como marcadores entre colchetes."}</span>
          <span>{p.prompt.length} caracteres</span>
        </div>

        {/* Ações do prompt */}
        <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={p.onClear}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/15 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-ink-900/40 focus:outline-none focus:ring-2 focus:ring-ink-900"
          >
            <Eraser size={15} aria-hidden="true" /> Limpar
          </button>
          <button
            type="button"
            onClick={p.onRestore}
            disabled={!p.edited}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/15 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-ink-900/40 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-ink-900"
          >
            <RotateCcw size={15} aria-hidden="true" /> Restaurar original
          </button>
          <button
            type="button"
            onClick={p.onCopy}
            className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-ink-700 focus:outline-none focus:ring-2 focus:ring-mint-500"
          >
            {p.copied ? <Check size={16} className="text-mint-400" aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
            {p.copied ? "Copiado!" : "Copiar prompt"}
          </button>
        </div>

        {/* Anúncio via aria-live para leitores de tela */}
        <p className="sr-only" role="status" aria-live="polite">
          {p.copied ? "Prompt copiado com sucesso para a área de transferência." : ""}
        </p>
      </div>

      {/* Passo 3: Exemplo ou Prévia da Resposta */}
      <div className="mt-8 border-t border-ink-900/10 pt-6">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-900">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-ink-900 text-xs text-white">3</span>
          Veja como usar
        </h4>
        <div role="tablist" aria-label="Exemplo ou prévia" className="mb-3 inline-flex rounded-full bg-ink-900/5 p-1">
          {([["preview", "Prévia da resposta"], ["example", "Exemplo de uso"]] as const).map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold transition focus:outline-none",
                tab === id ? "bg-white text-ink-900 shadow-sm" : "text-slate-500 hover:text-ink-900"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div role="tabpanel" className="rounded-2xl border border-dashed border-ink-900/20 bg-white/70 p-4 text-sm leading-relaxed text-slate-700 sm:p-5">
          {tab === "example" ? (
            <>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-mint-600">{c.example.input}</p>
              <p className="whitespace-pre-line font-sans text-xs leading-relaxed text-slate-700 sm:text-sm">{c.example.output}</p>
            </>
          ) : (
            <>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-mint-600">
                Estrutura esperada da resposta{topicValue ? ` · ${topicValue.slice(0, 60)}${topicValue.length > 60 ? "…" : ""}` : ""}
              </p>
              <ol className="space-y-1.5 text-xs sm:text-sm">
                {getPreviewOutline(c).map((s, i) => (
                  <li key={s} className="flex items-center gap-2.5">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink-900/10 text-[11px] font-semibold text-ink-900">
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-[11px] text-slate-500">
                Prévia ilustrativa da estrutura. O conteúdo real é gerado pela IA que receber o seu prompt.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Comandos Relacionados */}
      {related.length > 0 && (
        <div className="mt-8 border-t border-ink-900/10 pt-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Comandos relacionados</p>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <button
                key={r.slug}
                type="button"
                onClick={() => p.onSelectRelated(r.slug)}
                className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 transition hover:border-mint-600 hover:text-mint-600 focus:outline-none focus:ring-2 focus:ring-mint-500"
              >
                <Icon name={r.icon} className="h-3.5 w-3.5 text-mint-600" />
                <span className="font-mono">/{r.slug}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
