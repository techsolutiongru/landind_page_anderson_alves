import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { Hero } from "@/sections/Hero";
import { ImpactNumbers } from "@/sections/ImpactNumbers";
import { AboutProfile } from "@/sections/AboutProfile";
import { CareerTimeline } from "@/sections/CareerTimeline";
import { ProjectsAndGallery } from "@/sections/ProjectsAndGallery";
import { TechLab } from "@/sections/TechLab";
import { AILab } from "@/sections/AILab";
import { Contact } from "@/sections/Contact";
import { siteConfig } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: "Analista de TI · CEO da Tech Solution · Tech Lead",
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}/anderson-alves.jpg`,
  worksFor: { "@type": "Organization", name: "Tech Solution" },
  knowsAbout: [
    "Liderança Técnica",
    "Gestão de Projetos e Pessoas",
    "Implantação de Sistemas",
    "Redes de Computadores",
    "Inteligência Artificial Aplicada",
    "Engenharia de Prompts",
    "Infraestrutura de TI",
  ],
};

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-mint-400 focus:px-5 focus:py-3 focus:text-ink-950 font-semibold"
      >
        Pular para o conteúdo
      </a>

      {/* Cabeçalho Fixo Superior */}
      <Header />

      {/* Botões Flutuantes Fixos de Contato (WhatsApp, LinkedIn, Email) */}
      <FloatingActions />

      {/* Ordem estrita das 8 seções */}
      <main id="conteudo">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Números e Impacto */}
        <ImpactNumbers />

        {/* 3. Sobre e Atuação (Liderança, Gestão de Pessoas, Tech Solution, SAMU) */}
        <AboutProfile />

        {/* 4. Linha do Tempo (Carreira com dōTERRA e marcos sucintos) */}
        <CareerTimeline />

        {/* 5. Projetos e Galeria com Tela Cheia */}
        <ProjectsAndGallery />

        {/* 6. Tech Lab (Jogos interativos de lógica, raciocínio e memória) */}
        <TechLab />

        {/* 7. Laboratório de Inteligência Artificial (Destaque Principal) */}
        <AILab />

        {/* 8. Contato */}
        <Contact />
      </main>

      {/* Rodapé */}
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
