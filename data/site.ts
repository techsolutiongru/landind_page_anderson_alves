export const siteConfig = {
  name: "Anderson Alves",
  role: "Especialista em Tecnologia, Gestão de Projetos e Transformação Digital",
  tagline:
    "Uma trajetória construída através da tecnologia, inovação e desafios que transformam vidas.",
  description:
    "Anderson Alves — especialista em tecnologia, gestão de projetos e transformação digital. Trajetória em saúde digital, redes, implantação de sistemas e liderança técnica, com um Laboratório de Inteligência Artificial para gerar prompts guiados.",
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
  { href: "#historia", label: "História" },
  { href: "#trajetoria", label: "Trajetória" },
  { href: "#impacto", label: "Impacto" },
  { href: "#visao", label: "Visão" },
  { href: "#galeria", label: "Galeria" },
  { href: "#techlab-game", label: "Missão 3D" },
  { href: "#comunidade", label: "Comunidade" },
  { href: "#laboratorio", label: "Laboratório de IA" },
  { href: "#contato", label: "Contato" },
];

export const indicators = [
  { icon: "Server", label: "Implantação de sistemas" },
  { icon: "Users", label: "Liderança técnica" },
  { icon: "Compass", label: "Projetos estratégicos" },
  { icon: "HeartPulse", label: "Saúde digital" },
  { icon: "Network", label: "Redes e infraestrutura" },
];

export const heroStats = [
  { value: "2006", label: "início na tecnologia" },
  { value: "69", label: "UBS com SISS Saúde implantado" },
  { value: "4", label: "andares de hospital implantados" },
];

/* ------------------------------ História ---------------------------------- */

export interface Chapter {
  id: string;
  period: string;
  title: string;
  paragraphs: string[];
}

export const storyIntro = {
  title: "Minha jornada: da curiosidade pela tecnologia à liderança em grandes projetos",
};

export const chapters: Chapter[] = [
  {
    id: "curiosidade",
    period: "2006 – 2011",
    title: "A curiosidade vira ofício",
    paragraphs: [
      "Minha trajetória na tecnologia começou em 2006, quando iniciei um curso avançado de informática. Esse primeiro contato despertou minha curiosidade e paixão pela área, levando-me a buscar novos conhecimentos em hardware, manutenção de computadores e redes.",
      "Durante esse período, percebi como a tecnologia poderia transformar processos e facilitar a rotina das pessoas. Minha primeira experiência profissional aconteceu como jovem aprendiz em uma clínica veterinária, onde apliquei meus conhecimentos realizando melhorias nos computadores, manutenção preventiva e organização dos equipamentos.",
      "Com o avanço da minha formação, iniciei a faculdade de Redes de Computadores e, em 2011, comecei minha carreira técnica em uma assistência técnica autorizada da Positivo DAF.",
    ],
  },
  {
    id: "oportunidade",
    period: "2011 – 2012",
    title: "Um currículo e um amigo que acreditou",
    paragraphs: [
      "Minha trajetória nessa empresa começou como estagiário e durou apenas dois meses, mesmo com excelente desempenho. Na ocasião, o proprietário informou que não conseguiria arcar com os custos do estágio e, por isso, precisei seguir em busca de uma nova oportunidade.",
      "Foi então que, em sala de aula, compartilhei minha situação com alguns colegas e mostrei meu currículo. Nesse momento, um grande amigo, Eduardo Nucci, acreditou no meu potencial e levou meu currículo ao seu trabalho. Na época, ele já era concursado e atuava como supervisor de suporte da Secretaria da Saúde. Graças a esse gesto, fui chamado para uma entrevista e iniciei uma nova etapa da minha trajetória profissional.",
    ],
  },
  {
    id: "saude",
    period: "2012 – 2017",
    title: "Secretaria da Saúde: do suporte às redes",
    paragraphs: [
      "Em 2012, comecei minha atuação na Secretaria da Saúde, onde permaneci até 2017. Nesse período, evoluí tecnicamente e profissionalmente, passando da área de suporte para a equipe de redes. Ao longo dessa jornada, assumi responsabilidades relacionadas à liderança técnica, designação de chamados, análise e aprovação de plantas, vistoria de projetos e acompanhamento de infraestrutura.",
      "Tive o privilégio de participar de projetos importantes, como a Infovia municipal, responsável pela interligação de fibra óptica em todo o município, além de iniciativas ligadas à telefonia VoIP, telefonia digital e telefonia analógica.",
    ],
  },
  {
    id: "mmn-evomel",
    period: "2015 – 2018",
    title: "Empreendedorismo e liderança: A Jornada **Evomel**",
    paragraphs: [
      "Entre 2015 e 2018, vivenciei uma marcante etapa empreendedora no marketing de relacionamento através da Evomel, empresa de produtos naturais, alcançando a graduação Diamante.",
      "Essa vivência foi fundamental para o meu desenvolvimento em liderança e relações humanas: atuei na formação e condução de equipes em Jacareí, participei ativamente da abertura e expansão regional em Colatina (Espírito Santo) e liderei equipes em Guarulhos.",
      "Aprendi na prática sobre liderança de pessoas, comunicação pública, negociação, organização de eventos e resiliência — competências de gestão que se tornaram diferenciais essenciais na condução de grandes projetos e equipes de tecnologia.",
    ],
  },
  {
    id: "mmn-terra",
    period: "2018",
    title: "Expansão comercial: **Horas Essenciais / Terra**",
    paragraphs: [
      "Em 2018, participei do projeto comercial associado à iniciativa Horas Essenciais / Terra, alcançando a posição de Executivo.",
      "O modelo estava fundamentado no consumo inteligente de produtos com desconto e na construção de renda residual, proporcionando uma compreensão aprofundada de alavancagem comercial, treinamento de parceiros, oratória e expansão estratégica de redes.",
    ],
  },
  {
    id: "techsolution",
    period: "2017 – 2021",
    title: "Nasce a **Tech Solution**",
    paragraphs: [
      "Em 2017, com o encerramento do contrato após mudança de gestão, recebi alguns colegas em casa e idealizamos a criação de uma empresa de tecnologia. Foi ali que nasceu o nome **Tech Solution**, com sua identidade e proposta de valor inicial.",
      "Em 2021, decidi dar vida definitiva à iniciativa. Assumi a liderança da **Tech Solution** como **CEO**, consolidando-a como uma empresa de TI voltada ao atendimento de pequenas, médias e grandes empresas em suporte técnico, manutenção corporativa, restauração de computadores, consultoria em redes e soluções em tecnologia.",
    ],
  },
  {
    id: "sissaude",
    period: "2020 – hoje",
    title: "**SISS Saúde**: tecnologia aplicada à saúde pública",
    paragraphs: [
      "A partir de 2020, ingressei em um dos maiores desafios da minha carreira: a sustentação e implantação do sistema **SISS Saúde** na rede pública de saúde.",
      "Atuei diretamente na substituição do sistema legado e na implantação do **SISS Saúde** em 69 Unidades Básicas de Saúde, estruturando processos de recepção, prontuário e fluxo de atendimento.",
      "Nas unidades de urgência e emergência, a partir da UPA Cumbica, liderei em 2021 a implantação da triagem invertida — inovação operacional onde o paciente é classificado clinicamente antes do cadastro administrativo, garantindo prioridade absoluta aos casos graves.",
      "Em 2023 assumi a posição de **Tech Lead**, coordenando equipes técnicas, e em 2024 conduzi a implantação completa do sistema no **Hospital Municipal Pimentas Bonsucesso**, integrando quatro andares, clínicas cirúrgicas, neonatologia, psiquiatria e a migração de prontuários antigos.",
    ],
  },
  {
    id: "ia-evolucao",
    period: "2024 – Atualidade",
    title: "Inteligência Artificial & Evolução Contínua",
    paragraphs: [
      "Com a evolução exponencial da tecnologia, dedico meus estudos atuais à Inteligência Artificial aplicada, engenharia de prompts, ferramentas digitais, automações e arquitetura de software.",
      "O foco dessa fase é a experimentação prática: desenvolver prompts guiados de alta precisão, criar soluções de suporte inteligente e conectar IA aos fluxos reais de trabalho de empresas e profissionais.",
      "Essa postura reflete meu compromisso com o aprendizado contínuo: unir sólida experiência de campo e gestão de projetos com as tecnologias que estão redefinindo o futuro.",
    ],
  },
  {
    id: "hoje",
    period: "Atualidade",
    title: "Gestão estratégica e o desafio do **SAMU**",
    paragraphs: [
      "Com pós-graduação em Gestão de Projetos, atuo na linha de frente estratégica, apoiando a tomada de decisões, governança de TI e otimização contínua de processos.",
      "Atualmente, conduzo a implantação e customização do **SISS Saúde** no **SAMU**, visando substituir o sistema legado SIAGRU por uma plataforma ágil, moderna e integrada à realidade do atendimento móvel de urgência.",
    ],
  },
];

export const storyClosing =
  "Essa história continua sendo escrita por meio da tecnologia, da inovação e do compromisso com a transformação.";

/* ------------------------------ Timeline ---------------------------------- */

export interface TimelineItem {
  year: string;
  title: string;
  points: string[];
}

export const timeline: TimelineItem[] = [
  { year: "2006", title: "O primeiro contato", points: ["Curso avançado de informática", "Descoberta da paixão por tecnologia"] },
  { year: "2007–2010", title: "Base técnica", points: ["Hardware e manutenção", "Redes locais", "Primeiras experiências práticas"] },
  { year: "2011", title: "Formação técnica", points: ["Faculdade de Redes de Computadores", "Assistência autorizada Positivo DAF"] },
  { year: "2012–2017", title: "Secretaria da Saúde", points: ["Suporte técnico e redes", "Liderança técnica", "Infovia municipal em fibra", "Telefonia VoIP e digital"] },
  { year: "2015–2018", title: "Liderança e Expansão (Evomel)", points: ["Graduação Diamante", "Expansão regional (Jacareí, Colatina/ES, Guarulhos)", "Gestão e desenvolvimento de pessoas"] },
  { year: "2017", title: "Conceito Tech Solution", points: ["Nascimento da ideia e identidade da Tech Solution"] },
  { year: "2018", title: "Projeto Horas Essenciais (Terra)", points: ["Graduação Executivo", "Estratégia comercial e vendas", "Treinamento de equipes"] },
  { year: "2020", title: "Urgência & Emergência", points: ["Início da atuação no SISS Saúde", "Apoio e sustentação na UPA Cumbica"] },
  { year: "2021", title: "Triagem Invertida & Tech Solution", points: ["Implantação pioneira da triagem invertida", "Lançamento oficial da Tech Solution como CEO"] },
  { year: "2023", title: "Tech Lead", points: ["Liderança técnica", "Gestão de projetos e equipes de sustentação"] },
  { year: "2024", title: "Hospital Pimentas Bonsucesso", points: ["Implantação hospitalar em 4 andares", "Migração de prontuários antigos", "Integração clínica completa"] },
  { year: "Atualidade", title: "Gestão Estratégica, IA & SAMU", points: ["Estudos contínuos em Inteligência Artificial e Prompts", "Implantação do SISS Saúde no SAMU", "Comunidade TechSolution TechLab"] },
];

/* ------------------------------ Impacto ----------------------------------- */

export const impact = [
  { icon: "HeartPulse", title: "Saúde Digital", text: "Implantação de sistemas em UBS, UPA, hospital e SAMU, apoiando a modernização do atendimento e a melhoria da operação." },
  { icon: "Cable", title: "Infraestrutura e Redes", text: "Atuação em redes, fibra óptica, conectividade, telefonia e infraestrutura tecnológica." },
  { icon: "Users", title: "Gestão e Liderança", text: "Liderança técnica, organização de equipes, priorização de demandas, gestão de chamados e apoio à decisão." },
  { icon: "Zap", title: "Transformação Digital", text: "Projetos que transformam processos, aceleram fluxos e ampliam a eficiência organizacional." },
  { icon: "Building2", title: "Tech Solution", text: "Empreendedorismo, consultoria e soluções em TI para pequenas, médias e grandes empresas." },
];

/* ------------------------------ Visão ------------------------------------- */

export const vision = {
  quote: "Minha missão é conectar tecnologia, pessoas e processos para criar soluções que realmente gerem impacto.",
  text: "Acredito em tecnologia com propósito: ferramentas só valem quando melhoram a vida de quem atende e de quem é atendido.",
  pillars: [
    { title: "Tecnologia com propósito", text: "Cada sistema implantado existe para resolver um problema real de pessoas reais." },
    { title: "Eficiência operacional", text: "Processos mais simples, fluxos mais rápidos e menos retrabalho no dia a dia." },
    { title: "Inovação aplicada", text: "Ideias que saem do papel e mudam a forma como a operação funciona." },
    { title: "Gestão orientada a resultados", text: "Decisões apoiadas em dados, prioridades claras e entregas acompanhadas." },
    { title: "Melhoria contínua", text: "Cada entrega é ponto de partida para a próxima evolução." },
  ],
};

/* ------------------------------ Galeria de Projetos em Campo ----------------------------------- */

export interface FieldProject {
  id: string;
  title: string;
  location: string;
  year: string;
  caption: string;
  /** Caminho relativo da imagem ou undefined para renderizar fallback geométrico SVG */
  image?: string;
}

export const fieldProjects: FieldProject[] = [
  {
    id: "hospital-pimentas",
    title: "Hospital Municipal Pimentas Bonsucesso",
    location: "Guarulhos, SP",
    year: "2024",
    caption: "Estrutura hospitalar com 4 andares e múltiplas clínicas especializadas integrada ao SISS Saúde.",
  },
  {
    id: "upa-cumbica",
    title: "UPA Cumbica — Urgência e Emergência",
    location: "Guarulhos, SP",
    year: "2020 – 2021",
    caption: "Implantação pioneira do modelo de triagem invertida para agilidade clínica no atendimento de urgência.",
  },
  {
    id: "infovia-redes",
    title: "Infovia Municipal & Infraestrutura de Rede",
    location: "Secretaria de Saúde",
    year: "2012 – 2017",
    caption: "Interligação em fibra óptica, telefonia VoIP e convergência de redes para mais de 69 UBSs.",
  },
];