import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { Story } from "@/sections/Story";
import { Timeline } from "@/sections/Timeline";
import { TrajectoryGallery } from "@/sections/TrajectoryGallery";
import { Impact } from "@/sections/Impact";
import { Vision } from "@/sections/Vision";
import { TechLabGame } from "@/sections/TechLabGame";
import { Lab } from "@/sections/Lab";
import { Community } from "@/sections/Community";
import { ContentHub } from "@/sections/ContentHub";
import { Contact } from "@/sections/Contact";
import { siteConfig } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: "CEO da Tech Solution · Tech Lead · Gestão de Projetos",
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}/anderson-alves.jpg`,
  worksFor: { "@type": "Organization", name: "Tech Solution" },
  knowsAbout: [
    "Gestão de projetos",
    "Transformação digital",
    "Saúde digital",
    "Redes de computadores",
    "Implantação de sistemas",
    "Inteligência Artificial",
    "Engenharia de Prompts",
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
      <Header />
      <main id="conteudo">
        <Hero />
        <Story />
        <Timeline />
        <TrajectoryGallery />
        <Impact />
        <Vision />
        <TechLabGame />
        <Lab />
        <Community />
        <ContentHub />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
