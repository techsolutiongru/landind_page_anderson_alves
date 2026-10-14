"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, X, Info, CheckCircle2, HelpCircle } from "lucide-react";
import { trajectoryGallery, type GalleryPhoto } from "@/data/gallery";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

type FilterCat = "todas" | "evomel" | "terra" | "saude";

const filterLabels: Record<FilterCat, string> = {
  todas: "Todas as Fotos",
  evomel: "Evomel (2015–2018)",
  terra: "Horas Essenciais / Terra (2018)",
  saude: "Secretaria de Saúde (2012–2017)",
};

export function TrajectoryGallery() {
  const [filter, setFilter] = useState<FilterCat>("todas");
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const filteredPhotos = trajectoryGallery.filter((p) => {
    if (filter === "todas") return true;
    return p.category === filter;
  });

  const currentIndex = activePhoto ? filteredPhotos.findIndex((p) => p.id === activePhoto.id) : -1;

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < filteredPhotos.length - 1) {
      setActivePhoto(filteredPhotos[currentIndex + 1]);
    } else {
      setActivePhoto(filteredPhotos[0]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActivePhoto(filteredPhotos[currentIndex - 1]);
    } else {
      setActivePhoto(filteredPhotos[filteredPhotos.length - 1]);
    }
  };

  // Suporte a teclado no Modal (Esc, Setas)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!activePhoto) return;
      if (e.key === "Escape") setActivePhoto(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePhoto, currentIndex, filteredPhotos]);

  return (
    <section id="galeria" className="relative isolate overflow-hidden bg-ink-950 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              dark
              eyebrow="Galeria Fotográfica da Trajetória"
              title="Registros reais de liderança, **negócios e tecnologia**"
              lead="Fotografias originais dos marcos da minha história profissional: da atuação em marketing de rede e liderança corporativa à infraestrutura e saúde pública."
            />
            <div className="flex items-center gap-2 text-xs text-mint-400 font-mono">
              <span className="h-2 w-2 rounded-full bg-mint-400 animate-pulse" />
              {trajectoryGallery.length} fotografias catalogadas
            </div>
          </div>
        </Reveal>

        {/* Filtros da Galeria com Contagem */}
        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filtrar galeria por etapa">
          {(Object.keys(filterLabels) as FilterCat[]).map((cat) => {
            const count =
              cat === "todas"
                ? trajectoryGallery.length
                : trajectoryGallery.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition focus:outline-none focus:ring-2 focus:ring-mint-400",
                  filter === cat
                    ? "border border-mint-400 bg-mint-400 text-ink-950 shadow-glow"
                    : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:text-white"
                )}
              >
                <span>{filterLabels[cat]}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.2 text-[10px]",
                    filter === cat ? "bg-ink-950 text-mint-400" : "bg-white/10 text-slate-400"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grade de Imagens */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPhotos.map((photo, idx) => (
            <Reveal key={photo.id} delay={idx * 0.04}>
              <div
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-3 transition duration-300 hover:-translate-y-1 hover:border-mint-400/50 hover:bg-white/[0.05] hover:shadow-card"
                onClick={() => setActivePhoto(photo)}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink-900">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

                  {photo.period && (
                    <span className="absolute left-3 top-3 rounded-full bg-ink-950/80 px-2.5 py-1 text-[11px] font-semibold text-mint-400 backdrop-blur">
                      {photo.period}
                    </span>
                  )}

                  <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-mint-400 text-ink-950 opacity-0 transition group-hover:opacity-100">
                    <Eye size={16} />
                  </span>
                </div>

                <div className="mt-3 px-2 pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-mint-400">
                      {photo.event}
                    </p>
                    {photo.status === "confirmado" ? (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400" title="Classificação confirmada">
                        <CheckCircle2 size={11} /> Confirmada
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] text-amber-400" title="Registro em catalogação contextual">
                        <HelpCircle size={11} /> Em validação
                      </span>
                    )}
                  </div>
                  <h4 className="mt-1 font-display text-base text-white">{photo.title}</h4>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-400">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Nota de privacidade e conformidade */}
        <div className="mt-12 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs text-slate-400">
          <Info size={18} className="shrink-0 text-mint-400" />
          <span>
            Todas as 24 fotografias pertencem ao acervo pessoal de Anderson Alves, documentando sua evolução prática em liderança, gestão e tecnologia. Em conformidade com as diretrizes de privacidade e sigilo institucional, imagens ligadas à saúde pública preservam a identidade de pacientes e prontuários.
          </span>
        </div>
      </div>

      {/* Lightbox / Modal Acessível */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/90 p-4 backdrop-blur-md"
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-ink-900 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-mint-400">
                    {activePhoto.period ? `${activePhoto.period} · ` : ""}{activePhoto.event}
                  </span>
                  <h3 className="font-display text-xl text-white">{activePhoto.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePhoto(null)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Fechar visualização (Esc)"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Área da Imagem Ampliada */}
              <div className="relative flex min-h-[300px] flex-1 items-center justify-center bg-black/60 p-4 sm:min-h-[460px]">
                <div className="relative h-full max-h-[60vh] w-full">
                  <Image
                    src={activePhoto.src}
                    alt={activePhoto.alt}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Botões de Navegação */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-ink-950/80 text-white backdrop-blur transition hover:bg-mint-400 hover:text-ink-950"
                  aria-label="Foto anterior (Seta esquerda)"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-ink-950/80 text-white backdrop-blur transition hover:bg-mint-400 hover:text-ink-950"
                  aria-label="Próxima foto (Seta direita)"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Legenda e Detalhes */}
              <div className="border-t border-white/10 bg-ink-950/90 px-6 py-4">
                <p className="text-sm leading-relaxed text-slate-300">{activePhoto.caption}</p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                  <span>Foto {currentIndex + 1} de {filteredPhotos.length}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-slate-400">{activePhoto.src}</span>
                    <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-slate-300">
                      Use as setas do teclado para navegar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
