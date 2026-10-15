"use client";

import { useState } from "react";
import Image from "next/image";
import { projectsList } from "@/data/site";
import { trajectoryGallery, type GalleryPhoto } from "@/data/gallery";
import { LaserText } from "@/components/LaserText";
import { X, ZoomIn, CheckCircle2, Briefcase } from "lucide-react";

export function ProjectsAndGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryPhoto | null>(null);
  const galleryPhotos = trajectoryGallery.slice(0, 8);

  return (
    <section
      id="projetos"
      className="relative py-20 lg:py-28"
      style={{ background: "#0b0b0c", borderTop: "1px solid #243041" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Header */}
        <div className="mb-14">
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.22em] block mb-2"
            style={{
              color: "#2f9bff",
              fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
            }}
          >
            Projetos & Registros
          </span>
          <LaserText
            text="Entregas de impacto e galeria em campo"
            as="h2"
            delay={300}
            interval={40}
            className="block font-display text-2xl sm:text-3xl"
            style={{ color: "#ecebe6" } as React.CSSProperties}
          />
          <p className="mt-3 text-sm max-w-2xl" style={{ color: "#8e8d8a" }}>
            Projetos simplificados com foco no que agregam ao perfil profissional, acompanhados de registros visuais.
          </p>
        </div>

        {/* Projetos Simplificados — silicon cells */}
        <div
          className="grid gap-[1px] md:grid-cols-2"
          style={{ background: "#243041" }}
        >
          {projectsList.map((proj, idx) => (
            <div
              key={proj.id}
              className="group relative flex flex-col justify-between p-6 transition-colors"
              style={{ background: "#0b0b0c" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#0a0e14")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0b0b0c")}
            >
              {/* Top laser accent on hover */}
              <div
                className="absolute left-0 right-0 top-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: "linear-gradient(90deg, #2f9bff, rgba(47,155,255,0.2))",
                }}
                aria-hidden="true"
              />

              <div>
                <div
                  className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] mb-3"
                  style={{
                    color: "#2f9bff",
                    fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                  }}
                >
                  <Briefcase size={12} />
                  <span>Projeto {idx + 1}</span>
                </div>
                <h3
                  className="font-display text-xl font-bold leading-snug mb-2"
                  style={{ color: "#ecebe6" }}
                >
                  {proj.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8e8d8a" }}>
                  {proj.scope}
                </p>
              </div>

              {/* Value added */}
              <div
                className="mt-5 pt-4 flex items-start gap-2"
                style={{ borderTop: "1px solid #243041" }}
              >
                <CheckCircle2
                  size={14}
                  className="mt-0.5 shrink-0"
                  style={{ color: "#2f9bff" }}
                />
                <div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider block mb-0.5"
                    style={{
                      color: "#ecebe6",
                      fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                    }}
                  >
                    O que agrega ao perfil:
                  </span>
                  <p className="text-xs leading-relaxed" style={{ color: "#697c90" }}>
                    {proj.valueAdded}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Galeria */}
        <div className="mt-16">
          <div
            className="flex items-baseline justify-between pb-4 mb-8"
            style={{ borderBottom: "1px solid #243041" }}
          >
            <div>
              <h3 className="font-display text-2xl" style={{ color: "#ecebe6" }}>
                Registros Visuais da Trajetória
              </h3>
              <p
                className="text-xs mt-1 uppercase tracking-wider"
                style={{
                  color: "#697c90",
                  fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                }}
              >
                Clique na foto para visualizar em tela cheia
              </p>
            </div>
            <span
              className="text-xs font-semibold"
              style={{
                color: "#2f9bff",
                fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
              }}
            >
              {galleryPhotos.length} fotos
            </span>
          </div>

          <div className="grid grid-cols-2 gap-[1px] sm:grid-cols-3 lg:grid-cols-4"
            style={{ background: "#243041" }}
          >
            {galleryPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedImage(photo)}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden"
                style={{ background: "#0a0e14" }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(47,155,255,0.12)" }}
                />
                {/* Caption bar */}
                <div
                  className="absolute inset-x-0 bottom-0 p-3"
                  style={{
                    background: "linear-gradient(to top, rgba(10,14,20,0.95) 70%, transparent)",
                  }}
                >
                  <p className="text-xs font-semibold truncate" style={{ color: "#ecebe6" }}>
                    {photo.title}
                  </p>
                  <p className="text-[10px] truncate" style={{ color: "#697c90" }}>
                    {photo.event}
                  </p>
                </div>
                {/* Zoom icon */}
                <span
                  className="absolute right-2 top-2 grid h-7 w-7 place-items-center opacity-0 transition group-hover:opacity-100"
                  style={{
                    background: "rgba(47,155,255,0.8)",
                    borderRadius: "2px",
                  }}
                >
                  <ZoomIn size={13} style={{ color: "#ecebe6" }} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Tela Cheia — silicon overlay */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          style={{ background: "rgba(11,11,12,0.92)" }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full text-white shadow-2xl"
            style={{
              border: "1px solid #243041",
              background: "#0a0e14",
              borderRadius: "4px",
              padding: "1.5rem",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              aria-label="Fechar visualização"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center transition-colors hover:text-white"
              style={{
                border: "1px solid #243041",
                background: "#121722",
                color: "#8e8d8a",
                borderRadius: "2px",
              }}
            >
              <X size={18} />
            </button>

            <div
              className="relative aspect-[16/10] w-full overflow-hidden"
              style={{ background: "#0b0b0c", borderRadius: "2px" }}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between gap-4">
                <h4 className="font-display text-xl font-bold" style={{ color: "#ecebe6" }}>
                  {selectedImage.title}
                </h4>
                {selectedImage.period && (
                  <span
                    className="px-2.5 py-1 text-xs"
                    style={{
                      border: "1px solid rgba(47,155,255,0.35)",
                      background: "rgba(47,155,255,0.08)",
                      color: "#2f9bff",
                      fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                      borderRadius: "2px",
                    }}
                  >
                    {selectedImage.period}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs" style={{ color: "#697c90" }}>
                {selectedImage.event}
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#8e8d8a" }}>
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
