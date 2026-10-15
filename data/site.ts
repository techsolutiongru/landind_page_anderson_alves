export const siteConfig = {
  name: "Anderson Alves",
  role: "Analista de TI · CEO da Tech Solution · Tech Lead",
  // Slogan original mantido exatamente como está:
  tagline:
    "Uma trajetória construída através da tecnologia, inovação e desafios que transformam vidas.",
  // Missão personalizada e objetiva:
  mission:
    "Conectar tecnologia, pessoas e processos para criar soluções que geram valor real, eficiência operacional e transformação sustentável.",
  description:
    "Anderson Alves — Analista de TI, CEO da Tech Solution e Tech Lead. Especialista em condução de equipes, planejamento de projetos, infraestrutura e implantação de sistemas de alta complexidade.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.techsolutiongru.com.br",

  contact: {
    linkedin: "https://www.linkedin.com/in/andersonalves-gti/",
    whatsapp: "https://wa.me/5511952485466",
    github: "https://github.com/techsolutiongru",
    instagram: "https://www.instagram.com/_andersonalvesg/",
    email: "som_alves_silva@hotmail.com",
    network: "https://www.techsolutiongru.com.br/",
    networkLabel: "Tech Solution",
  },
};

export const nav = [
  { href: "#top", label: "Início" },
  { href: "#numeros", label: "Impacto" },
  { href: "#sobre", label: "Sobre" },
  { href: "#trajetoria", label: "Carreira" },
  { href: "#projetos", label: "Projetos & Fotos" },
  { href: "#techlab-game", label: "Tech Lab" },
  { href: "#laboratorio", label: "Laboratório de IA" },
  { href: "#contato", label: "Contato" },
];

export const indicators = [
  { icon: "Server", label: "Implantação de Sistemas" },
  { icon: "Users", label: "Liderança Técnica & Gestão" },
  { icon: "Compass", label: "Planejamento Estratégico" },
  { icon: "Network", label: "Redes & Infraestrutura" },
  { icon: "Sparkles", label: "Inteligência Artificial Aplicada" },
];

// FASE 2: Máximo 4 indicadores diretos de impacto, sem ano de início
export const impactStats = [
  {
    target: 69,
    suffix: " UBS",
    label: "Unidades Básicas de Saúde com sistema informatizado implantado",
    icon: "Building2",
  },
  {
    target: 4,
    suffix: " Andares",
    label: "Estrutura hospitalar de alta complexidade integrada do zero",
    icon: "Layers",
  },
  {
    target: 100,
    prefix: "+",
    suffix: "%",
    label: "Continuidade operacional com triagem ágil e fluxos integrados",
    icon: "HeartPulse",
  },
  {
    target: 15,
    prefix: "+",
    suffix: " Anos",
    label: "Trajetória sólida em tecnologia, liderança técnica e negócios",
    icon: "Award",
  },
];

// FASE 3: SOBRE E ATUAÇÃO (Liderança, gestão e empreendedorismo)
export const aboutProfile = {
  eyebrow: "Sobre e Atuação",
  title: "Liderança técnica, gestão de pessoas e **planejamento de soluções**",
  lead:
    "Com visão estratégica e perfil analítico, conduzo equipes multidisciplinares e projetos de tecnologia focando no alinhamento entre processos e resultados.",
  cards: [
    {
      icon: "Users",
      title: "Liderança e Gestão de Pessoas",
      description:
        "Condução humanizada de times técnicos, mentoria de profissionais, delegação estratégica e alinhamento de metas com comunicação transparente e empática.",
    },
    {
      icon: "Compass",
      title: "Planejamento e Implantação de Sistemas",
      description:
        "Visão end-to-end em implantações de grande porte: mapeamento de requisitos, arquitetura de processos, treinamento de usuários e mitigação de riscos.",
    },
    {
      icon: "Building2",
      title: "Empreendedor em TI & CEO",
      description:
        "CEO da Tech Solution desde 2021, desenvolvendo consultoria corporativa, sustentação de ambientes e soluções inteligentes de TI para empresas.",
    },
    {
      icon: "HeartPulse",
      title: "Gestão Estratégica em Urgência",
      description:
        "Passagem relevante pelo SAMU, coordenando a modernização e transição estratégica de plataformas críticas de atendimento móvel com alta disponibilidade.",
    },
  ],
};

// FASE 4: LINHA DO TEMPO (Marco sucinto de no máximo 2 linhas cada)
export interface CareerMilestone {
  year: string;
  badge: string;
  title: string;
  company: string;
  summary: string;
}

export const careerTimeline: CareerMilestone[] = [
  {
    year: "2011",
    badge: "Formação",
    title: "Redes de Computadores",
    company: "Graduação Técnica & Positivo DAF",
    summary: "Início da base sólida em arquitetura de redes locais, manutenção de hardware e suporte corporativo.",
  },
  {
    year: "2012 – 2017",
    badge: "Infraestrutura",
    title: "Infovia e Conectividade Pública",
    company: "Secretaria de Saúde",
    summary: "Atuação em suporte avançado, interligação de fibra óptica municipal, telefonia digital e liderança técnica.",
  },
  {
    year: "2015 – 2018",
    badge: "Liderança",
    title: "Desenvolvimento de Equipes",
    company: "Evomel (Nível Diamante)",
    summary: "Condução de grandes equipes regionais, oratória executiva, negociação e formação de lideranças de alta performance.",
  },
  {
    year: "2018",
    badge: "Comercial",
    title: "Expansão Comercial e Estratégia",
    company: "dōTERRA (Nível Executivo)",
    summary: "Gestão de expansão estratégica de parceiros, treinamentos comerciais e desenvolvimento de mercado de bem-estar.",
  },
  {
    year: "2021 – hoje",
    badge: "Empreendedorismo",
    title: "CEO & Fundador",
    company: "Tech Solution",
    summary: "Liderança da Tech Solution, provendo consultoria em TI, infraestrutura de redes e suporte corporativo especializado.",
  },
  {
    year: "2023 – hoje",
    badge: "Liderança Técnica",
    title: "Tech Lead & Gestão de Projetos",
    company: "Implantação de Sistemas",
    summary: "Liderança técnica em sistemas de grande porte, integrando 69 UBSs, 4 andares hospitalares e inovação de processos.",
  },
];

// FASE 5: PROJETOS COM VALOR AGREGADO AO PERFIL
export interface ProjectSpec {
  id: string;
  title: string;
  scope: string;
  valueAdded: string;
  metrics: string;
}

export const projectsList: ProjectSpec[] = [
  {
    id: "hospital-pimentas",
    title: "Hospital Municipal Pimentas Bonsucesso",
    scope: "Implantação hospitalar vertical em 4 andares completos e clínicas cirúrgicas.",
    valueAdded: "Demonstra capacidade comprovada de gerenciar infraestrutura e sistemas em ambientes críticos de alta pressão.",
    metrics: "4 andares integrados · Milhares de prontuários migrados",
  },
  {
    id: "ubs-redes",
    title: "Rede Básica de 69 Unidades de Saúde",
    scope: "Digitalização e implantação padronizada de prontuário eletrônico e recepção unificada.",
    valueAdded: "Evidencia domínio em projetos de larga escala geográfica, padronização de processos e capacitação de equipes.",
    metrics: "69 UBSs operacionais · Treinamento de centenas de profissionais",
  },
  {
    id: "triagem-invertida",
    title: "Triagem Invertida na UPA Cumbica",
    scope: "Reformulação do fluxo de acolhimento para priorizar a classificação clínica imediata.",
    valueAdded: "Comprova visão de inovação operacional e foco na experiência humana, reduzindo tempo de resposta a casos graves.",
    metrics: "Tempo de resposta clínico otimizado em atendimento de urgência",
  },
  {
    id: "samu-modernizacao",
    title: "Modernização Estratégica do SAMU",
    scope: "Planejamento e transição de sistemas legados para plataformas integradas de resposta rápida.",
    valueAdded: "Reflete maturidade em governança de TI, planejamento de contingência e modernização de serviços essenciais.",
    metrics: "Agilidade no despacho e integração com a rede de saúde",
  },
];