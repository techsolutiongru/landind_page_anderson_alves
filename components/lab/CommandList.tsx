"use client";

import { Search, Star } from "lucide-react";
import type { CategoryId, PromptCommand } from "@/data/types";
import { categories } from "@/data/commands";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

export type Filter = "all" | "favorites" | CategoryId;

interface Props {
  commands: PromptCommand[];
  total: number;
  query: string;
  filter: Filter;
  selected: string;
  favorites: string[];
  onQuery: (q: string) => void;
  onFilter: (f: Filter) => void;
  onSelect: (slug: string) => void;
}

export function CommandList({
  commands,
  total,
  query,
  filter,
  selected,
  favorites,
  onQuery,
  onFilter,
  onSelect,
}: Props) {
  const chips: Array<{ id: Filter; label: string }> = [
    { id: "all", label: "Todos" },
    { id: "favorites", label: `Favoritos (${favorites.length})` },
    ...categories.map((c) => ({ id: c.id as Filter, label: c.short })),
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 backdrop-blur-sm">
      <div className="relative">
        <label htmlFor="lab-search" className="sr-only">
          Buscar comando
        </label>
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          id="lab-search"
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Buscar por nome, função ou slug (ex: swot, roadmap)..."
          className="w-full rounded-full border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-400 focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-400/30"
        />
      </div>

      <div
        className="-mx-2 mt-4 flex gap-1.5 overflow-x-auto px-2 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        role="group"
        aria-label="Filtrar por categoria"
      >
        {chips.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={filter === c.id}
            onClick={() => onFilter(c.id)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-mint-400",
              filter === c.id
                ? "border-mint-400 bg-mint-400 text-ink-950"
                : "border-white/15 bg-white/[0.03] text-slate-300 hover:border-white/40"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <p className="mt-3 text-xs text-slate-400" aria-live="polite">
        Exibindo {commands.length} de {total} comandos
      </p>

      <ul className="mt-3 max-h-[520px] space-y-1.5 overflow-y-auto pr-1 [scrollbar-color:#182843_transparent] [scrollbar-width:thin]">
        {commands.length === 0 && (
          <li className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-slate-400">
            Nenhum comando encontrado para &ldquo;{query}&rdquo;. Tente buscar por outros termos ou limpe o filtro de categoria.
          </li>
        )}
        {commands.map((c) => {
          const active = c.slug === selected;
          return (
            <li key={c.slug}>
              <button
                type="button"
                onClick={() => onSelect(c.slug)}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition focus:outline-none focus:ring-2 focus:ring-mint-400",
                  active
                    ? "border-mint-400/60 bg-mint-400/10 text-white"
                    : "border-transparent bg-white/[0.02] text-slate-300 hover:border-white/15 hover:bg-white/[0.05]"
                )}
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg transition",
                    active ? "bg-mint-400 text-ink-950" : "bg-ink-800 text-mint-400 group-hover:bg-ink-700"
                  )}
                >
                  <Icon name={c.icon} className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold">{c.title}</span>
                    {c.trending && (
                      <span className="rounded-full bg-mint-400/15 px-1.5 py-0.2 text-[9px] font-semibold uppercase tracking-wider text-mint-300">
                        Em alta
                      </span>
                    )}
                  </span>
                  <span className="block truncate font-mono text-[11px] text-slate-400">/{c.slug}</span>
                </span>
                {favorites.includes(c.slug) && (
                  <Star size={14} className="shrink-0 text-mint-400" fill="currentColor" aria-label="Favorito" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
