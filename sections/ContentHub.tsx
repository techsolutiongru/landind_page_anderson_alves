"use client";

import { useMemo, useState } from "react";
import {
  Calendar,
  Copy,
  Check,
  Search,
  Sparkles,
  Filter,
  Share2,
  Clock,
  BookOpen,
  Edit3,
  RotateCcw,
} from "lucide-react";
import {
  thirtyDaysCalendar,
  type EditorialPost,
  type ContentCategory,
} from "@/data/contentCalendar";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { copyText } from "@/lib/prompt";
import { cn } from "@/lib/utils";

const categoryFilters: Array<"Todas" | ContentCategory> = [
  "Todas",
  "IA da semana",
  "Dica prática de TI",
  "Projeto em andamento",
  "Descoberta da semana",
  "Desafio ou debate",
  "Projeto da semana",
  "Reflexão & Visão",
];

export function ContentHub() {
  const [selectedPost, setSelectedPost] = useState<EditorialPost>(thirtyDaysCalendar[0]);
  const [activeCategory, setActiveCategory] = useState<"Todas" | ContentCategory>("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Estados locais para personalização antes de copiar
  const [customBody, setCustomBody] = useState<Record<number, string>>({});
  const [isEditing, setIsEditing] = useState(false);

  const currentBody = customBody[selectedPost.id] ?? selectedPost.body;

  const filteredPosts = useMemo(() => {
    return thirtyDaysCalendar.filter((post) => {
      const matchesCat = activeCategory === "Todas" || post.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.hook.toLowerCase().includes(q) ||
        post.body.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCopy = async () => {
    const fullText = `*${selectedPost.title}*\n\n📌 ${selectedPost.hook}\n\n${currentBody}\n\n👉 ${selectedPost.callToAction}\n\n${
      selectedPost.sourceOrTool ? `💡 _Fonte / Recurso: ${selectedPost.sourceOrTool}_\n\n` : ""
    }*TechSolution TechLab* — _Compartilhar conhecimento. Criar soluções. Evoluir juntos._`;

    const ok = await copyText(fullText);
    if (ok) {
      setCopiedId(selectedPost.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleResetBody = () => {
    setCustomBody((prev) => {
      const next = { ...prev };
      delete next[selectedPost.id];
      return next;
    });
  };

  return (
    <section id="central-conteudo" className="relative isolate overflow-hidden bg-ink-900 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              dark
              eyebrow="TechLab Content"
              title="Central de Produção e **Curadoria de Conteúdo**"
              lead="Calendário editorial completo de 30 dias para distribuição em canais e grupos de WhatsApp. Rotina sustentável de 15 minutos ao dia com revisão humana e zero custo de API."
            />
            <div className="flex items-center gap-2 rounded-full border border-mint-400/30 bg-mint-400/10 px-4 py-2 text-xs font-mono text-mint-400">
              <Calendar size={14} /> 30 Dias Planejados
            </div>
          </div>
        </Reveal>

        {/* Barra de Filtros e Busca */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Categorias */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar calendário">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition",
                  activeCategory === cat
                    ? "border border-mint-400 bg-mint-400 text-ink-950 font-semibold shadow-glow"
                    : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Campo de Busca */}
          <div className="relative min-w-[260px]">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar pauta, tag ou palavra..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/15 bg-white/5 py-2 pl-10 pr-4 text-xs text-white placeholder-slate-400 focus:border-mint-400 focus:outline-none focus:ring-1 focus:ring-mint-400"
            />
          </div>
        </div>

        {/* Grid de Pautas e Painel de Prévia */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* Lista de Pautas (5 colunas) */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span>Pautas ({filteredPosts.length} encontradas):</span>
              <span className="font-mono text-mint-400">Clique para revisar</span>
            </div>

            <div className="mt-3 max-h-[620px] space-y-2.5 overflow-y-auto pr-2 [scrollbar-width:thin] [scrollbar-color:#182843_transparent]">
              {filteredPosts.map((post) => {
                const isActive = selectedPost.id === post.id;
                return (
                  <button
                    key={post.id}
                    type="button"
                    onClick={() => {
                      setSelectedPost(post);
                      setIsEditing(false);
                    }}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition",
                      isActive
                        ? "border-mint-400 bg-mint-400/10 shadow-sm"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                    )}
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink-800 font-mono text-xs font-semibold text-mint-400 ring-1 ring-white/10">
                      D{post.day}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-mint-300">
                          {post.category}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">{post.dayOfWeek}</span>
                      </div>
                      <h4 className="mt-0.5 truncate font-display text-sm font-semibold text-white">
                        {post.title}
                      </h4>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-400">{post.hook}</p>
                    </div>
                  </button>
                );
              })}

              {filteredPosts.length === 0 && (
                <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-xs text-slate-400">
                  Nenhuma pauta encontrada com o filtro atual.
                </div>
              )}
            </div>
          </div>

          {/* Painel de Prévia e Personalização (7 colunas) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-ink-950 p-6 sm:p-8 shadow-2xl">
              {/* Cabeçalho do Card */}
              <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-mint-400/15 px-3 py-0.5 text-[11px] font-semibold text-mint-300">
                      Dia {selectedPost.day} · {selectedPost.dayOfWeek}
                    </span>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] text-slate-300 uppercase">
                      {selectedPost.category}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl text-white">{selectedPost.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs text-slate-300 transition hover:bg-white/10"
                    title="Editar texto antes de copiar"
                  >
                    <Edit3 size={13} /> {isEditing ? "Concluir Edição" : "Personalizar"}
                  </button>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 rounded-full bg-mint-400 px-5 py-2 text-xs font-semibold text-ink-950 transition hover:bg-mint-300 shadow-glow"
                  >
                    {copiedId === selectedPost.id ? <Check size={14} /> : <Copy size={14} />}
                    {copiedId === selectedPost.id ? "Copiado p/ WhatsApp!" : "Copiar p/ WhatsApp"}
                  </button>
                </div>
              </div>

              {/* Corpo da Publicação Formatado */}
              <div className="mt-6 space-y-4 rounded-2xl bg-white/[0.03] p-5 font-mono text-xs leading-relaxed text-slate-300">
                <div className="font-bold text-white border-b border-white/10 pb-3">
                  <p className="text-sm">📌 {selectedPost.hook}</p>
                </div>

                {isEditing ? (
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-mint-400 mb-1">
                      Edite o texto da mensagem:
                    </label>
                    <textarea
                      rows={6}
                      value={currentBody}
                      onChange={(e) =>
                        setCustomBody((prev) => ({
                          ...prev,
                          [selectedPost.id]: e.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-mint-400/50 bg-ink-900 p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-mint-400"
                    />
                    <button
                      type="button"
                      onClick={handleResetBody}
                      className="mt-2 inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                    >
                      <RotateCcw size={12} /> Restaurar texto original
                    </button>
                  </div>
                ) : (
                  <p className="whitespace-pre-line text-slate-200">{currentBody}</p>
                )}

                <div className="border-t border-white/10 pt-3 text-mint-400 font-semibold">
                  👉 {selectedPost.callToAction}
                </div>

                {selectedPost.sourceOrTool && (
                  <div className="text-[11px] text-slate-400">
                    💡 <span className="italic">Fonte / Ferramenta: {selectedPost.sourceOrTool}</span>
                  </div>
                )}

                <div className="border-t border-white/10 pt-3 text-[11px] text-slate-500">
                  TechSolution TechLab — Compartilhar conhecimento. Criar soluções. Evoluir juntos.
                </div>
              </div>

              {/* Tags e Instruções */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <div className="flex flex-wrap gap-1.5">
                  {selectedPost.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-[11px] text-slate-500">
                  Formatação pronta com quebras de linha e negritos para o WhatsApp.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
