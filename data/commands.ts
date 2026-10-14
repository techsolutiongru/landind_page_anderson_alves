import type {
  CategoryId,
  PromptCategory,
  PromptCommand,
  PromptField,
} from "./types";
import { lowerFirst } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Categorias                                                                */
/* -------------------------------------------------------------------------- */

export const categories: PromptCategory[] = [
  { id: "estrategia", label: "Estratégia e Negócios", short: "Estratégia", icon: "Target" },
  { id: "gestao", label: "Gestão, Planejamento e Operação", short: "Gestão", icon: "Workflow" },
  { id: "tecnologia", label: "Tecnologia, Produto e Arquitetura", short: "Tecnologia", icon: "Cpu" },
  { id: "aprendizado", label: "Aprendizado, Pesquisa e Análise", short: "Aprendizado", icon: "GraduationCap" },
  { id: "criatividade", label: "Criatividade, Conteúdo e Visual", short: "Criatividade", icon: "Palette" },
  { id: "consultoria", label: "Consultoria, Simulação e IA", short: "Consultoria", icon: "Brain" },
  { id: "comparativos", label: "Casos Especiais e Comparativos", short: "Comparativos", icon: "Scale" },
  { id: "outros", label: "Outros comandos do acervo", short: "Outros", icon: "Sparkles" },
];

/* -------------------------------------------------------------------------- */
/*  Campos padrão (usados pelos comandos genéricos)                           */
/* -------------------------------------------------------------------------- */

const depthOptions = ["Resumo executivo", "Intermediário", "Aprofundado e detalhado"];

const standardFields: PromptField[] = [
  { key: "topic", label: "Tema ou conteúdo", placeholder: "Ex.: implantação de um novo sistema em uma unidade de saúde", type: "textarea" },
  { key: "context", label: "Contexto e público", placeholder: "Ex.: diretoria da empresa, sem conhecimento técnico" },
  { key: "goal", label: "Objetivo", placeholder: "Ex.: apoiar uma decisão na reunião de sexta-feira" },
  { key: "depth", label: "Nível de profundidade", type: "select", options: depthOptions },
];

const visualFields: PromptField[] = [
  { key: "topic", label: "Assunto da peça", placeholder: "Ex.: o fluxo de triagem de um hospital", type: "textarea" },
  { key: "context", label: "Contexto e público", placeholder: "Ex.: post para LinkedIn, público executivo" },
  { key: "style", label: "Estilo visual", placeholder: "Ex.: minimalista, azul-marinho e verde-menta" },
  { key: "format", label: "Formato", type: "select", options: ["Quadrado 1:1", "Retrato 4:5", "Paisagem 16:9", "Vertical 9:16"] },
];

type Kind = "analysis" | "plan" | "learning" | "visual";

const kindByCategory: Record<CategoryId, Kind> = {
  estrategia: "analysis",
  gestao: "plan",
  tecnologia: "plan",
  aprendizado: "learning",
  criatividade: "visual",
  consultoria: "analysis",
  comparativos: "analysis",
  outros: "analysis",
};

const closings: Record<Kind, string> = {
  analysis:
    "Entregue o resultado com clareza e estrutura, destacando as conclusões principais, os pontos de atenção e as informações que precisam de verificação.",
  plan:
    "Entregue o resultado de forma organizada e acionável, com etapas claras, responsáveis sugeridos, riscos e próximos passos.",
  learning:
    "Entregue o resultado de forma didática, com linguagem adequada ao público, exemplos práticos e indicação do que vale aprofundar depois.",
  visual:
    "Entregue a peça com direção visual completa: composição, hierarquia, paleta, tipografia e textos prontos para uso. Se eu pedir uma imagem, descreva o prompt de geração.",
};

const previewOutlines: Record<Kind, string[]> = {
  analysis: ["Resumo executivo", "Pontos-chave", "Análise detalhada", "Riscos e pontos de atenção", "Recomendações e próximos passos"],
  plan: ["Visão geral", "Etapas e responsáveis", "Prazos e dependências", "Riscos e mitigação", "Próximos passos"],
  learning: ["Ideia central em uma frase", "Explicação passo a passo", "Exemplo prático", "Erros comuns", "Para aprofundar"],
  visual: ["Conceito da peça", "Composição e hierarquia", "Paleta e tipografia", "Textos sugeridos", "Variações para testar"],
};

export function getPreviewOutline(cmd: PromptCommand): string[] {
  return previewOutlines[kindByCategory[cmd.category]];
}

/* -------------------------------------------------------------------------- */
/*  Comandos genéricos: [slug, nome, descrição, "ideal para", ícone, em alta?] */
/* -------------------------------------------------------------------------- */

type Row = [slug: string, title: string, description: string, ideal: string, icon: string];

const generic: Record<CategoryId, Row[]> = {
  estrategia: [
    ["fiveforces", "5 Forças de Porter", "Aplica as 5 forças de Porter no seu mercado.", "avaliar a atratividade e a concorrência de um mercado", "Swords"],
    ["businessmodel", "Modelo de Negócio", "Desenha o modelo de negócio numa estrutura clara.", "estruturar como uma ideia gera valor e receita", "Briefcase"],
    ["investor", "Visão do Investidor", "Prepara os argumentos que um investidor ia querer ouvir.", "preparar uma conversa com investidores", "TrendingUp"],
    ["executivebrief", "Resumo Executivo", "Resume um assunto complexo em formato executivo.", "informar decisores com pouco tempo", "FileText"],
    ["scenario", "Cenário Hipotético", "Projeta um cenário hipotético pro seu negócio.", "testar o “e se…” antes de decidir", "Telescope"],
    ["decisionmatrix", "Matriz de Decisão", "Monta uma matriz pra comparar opções com critérios.", "escolher entre alternativas com critérios claros", "Scale"],
    ["proscons", "Prós e Contras", "Lista vantagens e desvantagens de uma decisão.", "enxergar os dois lados de uma decisão", "Scale"],
    ["recommendations", "Recomendações", "Sugere recomendações práticas com base no que você descrever.", "transformar uma situação em ações práticas", "ListChecks"],
    ["benchmark", "Benchmark de Mercado", "Compara seu negócio com referências do mercado.", "medir onde você está frente às melhores práticas", "Gauge"],
    ["pestle", "Análise PESTLE", "Analisa fatores políticos, econômicos, sociais, tecnológicos, legais e ambientais.", "entender o ambiente externo de um projeto", "Globe"],
    ["premortem", "Pré-mortem", "Imagina que o projeto já falhou e investiga por quê.", "antecipar riscos antes de começar", "ShieldAlert"],
    ["prioritize", "Priorização", "Organiza uma lista de itens por prioridade.", "decidir o que fazer primeiro", "ListChecks"],
    ["presentation", "Roteiro de Apresentação", "Estrutura o roteiro de uma apresentação.", "montar uma apresentação com narrativa clara", "Presentation"],
    ["marketmap", "Mapa de Mercado", "Mapeia os principais players do seu mercado.", "visualizar concorrentes e posicionamentos", "Map"],
  ],
  gestao: [
    ["actionplan", "Plano de Ação", "Transforma uma conclusão num plano de ação com prazos.", "sair da análise e partir para a execução", "ListChecks"],
    ["process", "Mapa de Processo", "Visualiza um processo inteiro, etapa por etapa.", "documentar e melhorar processos", "Workflow"],
    ["journey", "Jornada Completa", "Ilustra a jornada completa, do início ao fim.", "mapear a experiência de clientes ou usuários", "Route"],
    ["flowchart", "Fluxograma", "Fluxograma com o passo a passo de um processo.", "explicar decisões e etapas de um fluxo", "GitBranch"],
    ["stickynotes", "Post-its de Ideias", "Separa as ideias em post-its, uma por bloco.", "organizar um brainstorm", "StickyNote"],
    ["cycle", "Ciclo", "Mostra um ciclo que se repete.", "representar rotinas e melhoria contínua", "Repeat"],
    ["heatmap", "Mapa de Calor", "Visualiza intensidade num mapa de calor.", "mostrar onde está a concentração ou o risco", "Flame"],
    ["dashboard", "Painel de Indicadores", "Painel com os principais indicadores.", "acompanhar KPIs de um projeto ou operação", "Gauge"],
    ["dashboardanalysis", "Análise de Painel", "Analisa os números de um painel e aponta o que importa.", "interpretar dados e extrair decisões", "BarChart3"],
    ["rootcause", "Causa Raiz", "Investiga a causa raiz de um problema.", "resolver problemas recorrentes", "Crosshair"],
  ],
  tecnologia: [
    ["blueprint", "Blueprint Técnico", "Planta técnica de um sistema ou espaço.", "documentar a estrutura de um sistema", "PencilRuler"],
    ["layers", "Arquitetura em Camadas", "Arquitetura em camadas, de baixo pra cima.", "explicar a pilha de uma solução", "Layers"],
    ["network", "Mapa de Rede", "Desenha a rede de conexões entre elementos.", "representar redes, integrações e dependências", "Network"],
    ["schematic", "Esquema Técnico", "Esquema técnico simplificado.", "simplificar um sistema complexo", "Cpu"],
    ["wireframe", "Wireframe", "Estrutura simples de um site ou app.", "esboçar telas antes de desenhar", "LayoutTemplate"],
    ["prototype", "Protótipo", "Esboço inicial de um conceito de produto.", "validar ideias de produto rapidamente", "Rocket"],
    ["diagram", "Diagrama", "Desenha um diagrama simples do conceito.", "explicar um conceito visualmente", "GitBranch"],
    ["ecosystem", "Ecossistema", "Mostra todos os players conectados num mesmo cenário.", "entender atores e relações de um cenário", "Network"],
    ["mockup", "Mockup", "Prévia realista de como o produto fica pronto.", "apresentar o produto antes de construí-lo", "Box"],
  ],
  aprendizado: [
    ["eli5", "Explique como se eu tivesse 5 anos", "Explica de um jeito bem simples, como se fosse pra uma criança.", "entender um assunto difícil do zero", "Baby"],
    ["flashcards", "Flashcards", "Cartões de pergunta e resposta pra memorizar.", "estudar e fixar conteúdo", "Layers"],
    ["quiz", "Quiz", "Gera um teste com perguntas sobre o tema.", "testar o que você aprendeu", "HelpCircle"],
    ["teachme", "Me Ensine", "Monta uma aula estruturada sobre o assunto.", "aprender um tema com método", "GraduationCap"],
    ["deepdive", "Mergulho Profundo", "Se aprofunda no tema com todo o contexto.", "estudar um tema a fundo", "Telescope"],
    ["sources", "Fontes e Referências", "Lista fontes e referências pra se aprofundar depois.", "continuar a pesquisa com boas fontes", "BookOpen"],
    ["extract", "Extração de Dados", "Extrai os dados relevantes de um conteúdo maior.", "tirar o essencial de documentos longos", "Search"],
    ["insights", "Insights", "Extrai os principais insights de um conjunto de dados.", "descobrir padrões em dados", "Lightbulb"],
    ["comparison", "Comparação", "Compara duas opções lado a lado.", "avaliar alternativas", "Scale"],
    ["mythvsfact", "Mito ou Fato", "Separa o que é mito do que é fato.", "desfazer crenças populares", "Eye"],
    ["fivewhys", "5 Porquês", "Pergunta “por quê” cinco vezes até chegar na causa real.", "chegar à origem de um problema", "HelpCircle"],
    ["firstprinciples", "Primeiros Princípios", "Volta ao princípio básico e reconstrói o raciocínio.", "repensar um problema do zero", "Brain"],
    ["socratic", "Método Socrático", "Ensina fazendo perguntas, em vez de só responder.", "aprender pensando por conta própria", "MessagesSquare"],
    ["viva", "Arguição (Viva)", "Prepara você pra uma arguição ou prova oral.", "treinar para bancas e provas orais", "Mic"],
    ["cheatsheet", "Cheat Sheet", "Resumo rápido pra consultar na hora.", "ter um guia de consulta rápida", "ClipboardCheck"],
    ["simplify", "Simplificar", "Simplifica um conteúdo que está complicado demais.", "tornar textos técnicos acessíveis", "Wand2"],
    ["research", "Pesquisa", "Pesquisa e organiza informação sobre um tema.", "iniciar uma pesquisa estruturada", "Search"],
    ["mindmap", "Mapa Mental", "Organiza um tema em mapa mental, com ramificações.", "organizar ideias de forma visual", "Network"],
    ["analogy", "Analogia", "Explica usando uma comparação do dia a dia.", "explicar conceitos abstratos", "Lightbulb"],
  ],
  criatividade: [
    ["socialvisual", "Visual para Redes Sociais", "Arte pronta pra postar na rede social.", "criar posts com identidade", "Megaphone"],
    ["storyboard", "Storyboard", "Quadro a quadro de uma cena ou narrativa.", "planejar vídeos e narrativas", "Presentation"],
    ["poster", "Pôster", "Peça de pôster pronta pra usar.", "comunicar uma ideia em uma única peça", "ImageIcon"],
    ["carousel", "Carrossel", "Estrutura de carrossel pronta pra rede social.", "ensinar ou contar histórias em slides", "Layers"],
    ["quotevisual", "Frase Visual", "Transforma uma frase numa peça visual pra compartilhar.", "dar destaque a uma mensagem", "Quote"],
    ["infographic", "Infográfico", "Monta um infográfico com os dados que você passar.", "comunicar dados de forma clara", "BarChart3"],
    ["visualize", "Visualizar Ideia", "Transforma uma ideia abstrata numa explicação visual.", "tornar um conceito tangível", "Eye"],
    ["comic", "Quadrinho", "Explica em formato de quadrinho.", "explicar com leveza e narrativa", "MessagesSquare"],
    ["beforeafter", "Antes e Depois", "Mostra a transformação de um estado pro outro.", "evidenciar resultados e mudanças", "Shuffle"],
    ["xray", "Raio-X", "Mostra o que tem por dentro, camada por camada.", "revelar a estrutura interna de algo", "Layers"],
    ["isometric", "Isométrico 3D", "Ilustração em perspectiva isométrica, em 3D.", "ilustrar sistemas e ambientes", "Box"],
    ["explodedview", "Vista Explodida", "Separa um objeto em todas as peças que o compõem.", "mostrar como as partes se encaixam", "Box"],
    ["cutaway", "Corte Ilustrado", "Ilustração em corte, revelando o interior.", "mostrar o interior de um produto ou espaço", "Layers"],
    ["anatomy", "Anatomia", "Detalha todas as partes de algo, uma a uma.", "explicar cada componente de um todo", "Microscope"],
    ["crosssection", "Seção Transversal", "Ilustração em seção transversal.", "mostrar camadas internas", "Layers"],
    ["360view", "Visão 360°", "Mostra o objeto de todos os ângulos.", "apresentar um produto completo", "Globe"],
    ["birdseye", "Visão Aérea", "Visão de cima, panorâmica.", "mostrar a organização de um espaço", "Map"],
    ["macroscopic", "Macroscópico", "Afasta o olhar pro nível do sistema inteiro.", "ver o todo e as conexões", "Telescope"],
    ["microscopic", "Microscópico", "Aproxima o olhar num detalhe bem específico.", "estudar um detalhe a fundo", "Microscope"],
    ["adcreative", "Criativo de Anúncio", "Conceito criativo pra um anúncio.", "criar campanhas e anúncios", "Megaphone"],
    ["inside", "Por Dentro", "Revela o funcionamento interno de algo.", "mostrar como algo funciona por dentro", "Eye"],
    ["cover", "Capa", "Capa pra um livro, relatório ou apresentação.", "dar identidade a um material", "ImageIcon"],
    ["handwritten", "Estilo Caderno", "Anotação em estilo de caderno, como se fosse escrita à mão.", "criar anotações com toque humano", "StickyNote"],
  ],
  consultoria: [
    ["promptengineer", "Engenheiro de Prompt", "Reescreve seu pedido num prompt mais claro e eficaz.", "melhorar qualquer pedido feito a uma IA", "Wand2"],
    ["expert", "Especialista", "Explica em nível avançado, direto ao ponto técnico.", "obter respostas técnicas e objetivas", "GraduationCap"],
    ["roleplay", "Roleplay", "Simula uma conversa difícil antes de acontecer.", "ensaiar negociações e feedbacks", "MessagesSquare"],
    ["reverseengineer", "Engenharia Reversa", "Parte do resultado final e reconstrói o caminho até ele.", "entender como algo foi construído", "RotateCcw"],
    ["simulate", "Simulação", "Simula uma situação antes de você viver ela de verdade.", "treinar cenários antes da prática", "FlaskConical"],
    ["devilsadvocate", "Advogado do Diabo", "Questiona as suposições por trás da sua ideia.", "testar a solidez de uma ideia", "Swords"],
    ["redteam", "Red Team", "Ataca sua própria ideia pra achar os pontos fracos antes de alguém achar.", "encontrar falhas antes do mercado", "ShieldAlert"],
    ["future", "Futuro", "Projeta um cenário futuro pro tema.", "enxergar tendências e possibilidades", "Telescope"],
    ["interview", "Entrevista", "Simula uma entrevista sobre o assunto.", "treinar para entrevistas e conversas", "Mic"],
  ],
  comparativos: [
    ["versus", "Versus", "Formato de confronto direto entre duas alternativas.", "comparar opções de forma direta", "Swords"],
    ["evolution", "Evolução", "Mostra como algo evoluiu ao longo do tempo.", "contar a evolução de um tema", "Hourglass"],
  ],
  outros: [
    ["table", "Tabela", "Organiza uma informação em formato de tabela.", "estruturar informações em linhas e colunas", "Table2"],
  ],
};

const trendingSlugs = new Set(["swot", "pitch", "promptengineer", "roadmap", "consultant", "strategy", "summarize"]);

/* -------------------------------------------------------------------------- */
/*  Comandos com formulários guiados completos (casos de uso)                 */
/* -------------------------------------------------------------------------- */

type Detailed = Omit<PromptCommand, "guided" | "trending">;

const detailed: Detailed[] = [
  {
    slug: "thenvsnow",
    title: "Antes vs Agora",
    category: "comparativos",
    icon: "Hourglass",
    description: "Compare como algo era antes com como está agora.",
    useCase: "mostrar evolução, mudanças e o que realmente melhorou ao longo do tempo",
    fields: [
      { key: "topic", label: "Tema ou conteúdo", placeholder: "Ex.: atendimento de urgência na rede municipal de saúde", type: "textarea" },
      { key: "context", label: "Contexto e público", placeholder: "Ex.: apresentação para gestores públicos" },
      { key: "criteria", label: "Critério de comparação", placeholder: "Ex.: tempo de atendimento, segurança e uso de tecnologia" },
      { key: "goal", label: "Objetivo da análise", placeholder: "Ex.: demonstrar o ganho com a nova abordagem" },
      { key: "depth", label: "Nível de profundidade", type: "select", options: depthOptions },
    ],
    promptTemplate: `/thenvsnow

Intenção: comparar como algo era antes com como está agora.

Aplique essa intenção ao seguinte tema ou conteúdo: {{topic}}.
Contexto e público: {{context}}.
Critério de comparação: {{criteria}}.
Objetivo: {{goal}}.
Nível de profundidade: {{depth}}.

Entregue o resultado com clareza, destacando diferenças, evolução, pontos fortes, limitações e informações que precisam de verificação.`,
    example: {
      input: "Tema: fluxo de atendimento em urgência · Critério: segurança e tempo de espera",
      output: "ANTES — a ficha era aberta primeiro e a classificação de risco vinha depois, com fila por ordem de chegada.\nAGORA — o paciente é classificado por prioridade clínica e só então a ficha é aberta.\nEVOLUÇÃO — atendimento mais seguro e rápido para quem precisa de atenção imediata.\nA VERIFICAR — dados de tempo médio de espera antes e depois da mudança.",
    },
    relatedCommands: ["evolution", "comparison", "timeline"],
  },
  {
    slug: "swot",
    title: "Análise SWOT",
    category: "estrategia",
    icon: "Target",
    description: "Monta uma análise SWOT completa do negócio.",
    useCase: "avaliar forças, fraquezas, oportunidades e ameaças antes de decidir",
    fields: [
      { key: "subject", label: "Empresa, projeto ou tema", placeholder: "Ex.: Tech Solution — suporte e consultoria de TI" },
      { key: "context", label: "Contexto atual", placeholder: "Ex.: empresa em crescimento, equipe enxuta", type: "textarea" },
      { key: "market", label: "Mercado ou cenário", placeholder: "Ex.: serviços de TI para pequenas e médias empresas" },
      { key: "goal", label: "Objetivo da análise", placeholder: "Ex.: definir prioridades para os próximos 12 meses" },
      { key: "audience", label: "Público da resposta", placeholder: "Ex.: sócios e gestores" },
    ],
    promptTemplate: `/swot

Intenção: montar uma análise SWOT completa.

Empresa, projeto ou tema: {{subject}}.
Contexto atual: {{context}}.
Mercado ou cenário: {{market}}.
Objetivo da análise: {{goal}}.
Público da resposta: {{audience}}.

Organize forças, fraquezas, oportunidades e ameaças em uma tabela, cruze os quadrantes para sugerir ações (FO, FA, DO, DA) e finalize com as três prioridades mais importantes.`,
    example: {
      input: "Empresa: consultoria de TI · Objetivo: prioridades para 12 meses",
      output: "FORÇAS — experiência em implantação de sistemas e liderança técnica.\nFRAQUEZAS — dependência de poucas pessoas-chave.\nOPORTUNIDADES — digitalização de PMEs e demanda por suporte contínuo.\nAMEAÇAS — concorrência de grandes provedores.\nPRIORIDADES — 1) padronizar serviços; 2) criar contratos recorrentes; 3) documentar processos.",
    },
    relatedCommands: ["strategy", "pestle", "fiveforces"],
  },
  {
    slug: "pitch",
    title: "Pitch Estratégico",
    category: "estrategia",
    icon: "Rocket",
    description: "Monta um pitch curto e direto pra apresentar uma ideia.",
    useCase: "apresentar uma ideia, produto ou serviço de forma persuasiva",
    fields: [
      { key: "product", label: "Produto, serviço ou ideia", placeholder: "Ex.: plataforma de suporte de TI por assinatura", type: "textarea" },
      { key: "problem", label: "Problema que resolve", placeholder: "Ex.: empresas pequenas sem equipe de TI própria" },
      { key: "audience", label: "Público-alvo", placeholder: "Ex.: donos de pequenas e médias empresas" },
      { key: "differentials", label: "Diferenciais", placeholder: "Ex.: atendimento rápido e experiência em ambientes críticos" },
      { key: "goal", label: "Objetivo do pitch", placeholder: "Ex.: conseguir uma reunião de proposta comercial" },
      { key: "tone", label: "Tom desejado", type: "select", options: ["Executivo e direto", "Inspirador", "Técnico e objetivo", "Próximo e conversacional"] },
    ],
    promptTemplate: `/pitch

Intenção: montar um pitch curto e direto para apresentar uma ideia.

Produto, serviço ou ideia: {{product}}.
Problema que resolve: {{problem}}.
Público-alvo: {{audience}}.
Diferenciais: {{differentials}}.
Objetivo do pitch: {{goal}}.
Tom desejado: {{tone}}.

Entregue duas versões: uma de 30 segundos e outra de 2 minutos, com abertura marcante, prova de credibilidade e chamada para ação clara.`,
    example: {
      input: "Ideia: suporte de TI por assinatura · Tom: executivo e direto",
      output: "30s — “Sua empresa não precisa de um departamento de TI para ter a segurança de um. Nós cuidamos da sua tecnologia para você cuidar do seu negócio.”\n2min — problema → solução → diferenciais → prova → próximo passo (reunião de diagnóstico gratuito).",
    },
    relatedCommands: ["investor", "businessmodel", "presentation"],
  },
  {
    slug: "roadmap",
    title: "Roadmap de Execução",
    category: "gestao",
    icon: "Route",
    description: "Roadmap visual de um plano ou aprendizado.",
    useCase: "organizar um projeto em fases, marcos e entregas",
    fields: [
      { key: "project", label: "Projeto", placeholder: "Ex.: implantação de sistema em uma unidade de urgência", type: "textarea" },
      { key: "goal", label: "Objetivo", placeholder: "Ex.: entrar em operação sem interromper o atendimento" },
      { key: "horizon", label: "Horizonte de tempo", placeholder: "Ex.: 6 meses" },
      { key: "milestones", label: "Marcos principais", placeholder: "Ex.: diagnóstico, treinamento, piloto, go-live" },
      { key: "risks", label: "Riscos ou restrições", placeholder: "Ex.: equipe reduzida, janela de implantação curta" },
      { key: "audience", label: "Público", placeholder: "Ex.: gestão e equipe técnica" },
    ],
    promptTemplate: `/roadmap

Intenção: criar um roadmap visual de um plano de execução.

Projeto: {{project}}.
Objetivo: {{goal}}.
Horizonte de tempo: {{horizon}}.
Marcos principais: {{milestones}}.
Riscos ou restrições: {{risks}}.
Público: {{audience}}.

Entregue o roadmap em fases, com entregas, responsáveis sugeridos, dependências, riscos por fase e critérios de sucesso para cada marco.`,
    example: {
      input: "Projeto: implantação em unidade de urgência · Horizonte: 6 meses",
      output: "FASE 1 (mês 1) — diagnóstico e mapeamento de processos.\nFASE 2 (meses 2–3) — treinamento e ambiente de testes.\nFASE 3 (mês 4) — piloto controlado.\nFASE 4 (mês 5) — go-live acompanhado.\nFASE 5 (mês 6) — otimização e indicadores.",
    },
    relatedCommands: ["actionplan", "timeline", "prioritize"],
  },
  {
    slug: "timeline",
    title: "Linha do Tempo",
    category: "gestao",
    icon: "Clock",
    description: "Linha do tempo com os principais marcos.",
    useCase: "contar uma história ou projeto em ordem cronológica",
    fields: [
      { key: "topic", label: "Tema", placeholder: "Ex.: trajetória de um projeto de transformação digital", type: "textarea" },
      { key: "period", label: "Período", placeholder: "Ex.: de 2012 até hoje" },
      { key: "milestones", label: "Marcos relevantes", placeholder: "Ex.: início, primeira entrega, expansão, resultados", type: "textarea" },
      { key: "context", label: "Contexto", placeholder: "Ex.: material de apresentação institucional" },
      { key: "goal", label: "Objetivo do material", placeholder: "Ex.: reforçar credibilidade e evolução" },
    ],
    promptTemplate: `/timeline

Intenção: criar uma linha do tempo com os principais marcos.

Tema: {{topic}}.
Período: {{period}}.
Marcos relevantes: {{milestones}}.
Contexto: {{context}}.
Objetivo do material: {{goal}}.

Entregue a linha do tempo em ordem cronológica, com uma frase de destaque por marco, o impacto de cada etapa e sugestões de como apresentá-la visualmente.`,
    example: {
      input: "Tema: projeto de transformação digital · Período: 2012 até hoje",
      output: "2012 — início da atuação e primeiros processos mapeados.\n2017 — consolidação da equipe e da infraestrutura.\n2021 — novo fluxo de atendimento em produção.\n2024 — expansão para estrutura de maior complexidade.\nHOJE — melhoria contínua com indicadores.",
    },
    relatedCommands: ["roadmap", "evolution", "thenvsnow"],
  },
  {
    slug: "consultant",
    title: "Consultor Estratégico",
    category: "consultoria",
    icon: "Briefcase",
    description: "Responde como um consultor especialista analisaria.",
    useCase: "obter um diagnóstico e um caminho prático para um desafio real",
    fields: [
      { key: "context", label: "Contexto", placeholder: "Ex.: empresa de 15 pessoas com crescimento acelerado", type: "textarea" },
      { key: "challenge", label: "Desafio principal", placeholder: "Ex.: processos informais gerando retrabalho" },
      { key: "goal", label: "Objetivo", placeholder: "Ex.: reduzir retrabalho em 30% em 90 dias" },
      { key: "constraints", label: "Restrições", placeholder: "Ex.: orçamento limitado e equipe sem tempo livre" },
      { key: "audience", label: "Público", placeholder: "Ex.: diretoria" },
      { key: "format", label: "Formato esperado", type: "select", options: ["Diagnóstico + plano de ação", "Relatório executivo", "Lista de recomendações priorizadas", "Perguntas de aprofundamento"] },
    ],
    promptTemplate: `/consultant

Intenção: responder como um consultor especialista analisaria.

Contexto: {{context}}.
Desafio principal: {{challenge}}.
Objetivo: {{goal}}.
Restrições: {{constraints}}.
Público: {{audience}}.
Formato esperado: {{format}}.

Antes de recomendar, liste as suposições que você está fazendo. Depois entregue diagnóstico, alternativas com prós e contras, recomendação principal e primeiros passos para os próximos 30 dias.`,
    example: {
      input: "Desafio: processos informais · Formato: diagnóstico + plano de ação",
      output: "SUPOSIÇÕES — equipe sem documentação formal; demandas chegam por vários canais.\nDIAGNÓSTICO — retrabalho nasce na entrada das demandas.\nRECOMENDAÇÃO — centralizar a entrada e padronizar 3 processos críticos.\n30 DIAS — mapear, padronizar, treinar, medir.",
    },
    relatedCommands: ["strategy", "devilsadvocate", "promptengineer"],
  },
  {
    slug: "architecture",
    title: "Arquitetura de Solução",
    category: "tecnologia",
    icon: "Layers",
    description: "Arquitetura de um sistema ou software.",
    useCase: "desenhar ou revisar a arquitetura de um sistema antes de construí-lo",
    fields: [
      { key: "system", label: "Sistema ou solução", placeholder: "Ex.: sistema de controle patrimonial e manutenção", type: "textarea" },
      { key: "context", label: "Contexto", placeholder: "Ex.: uso interno, equipe pequena, hospedagem em nuvem" },
      { key: "functional", label: "Requisitos funcionais", placeholder: "Ex.: cadastro de bens, ordens de serviço, relatórios", type: "textarea" },
      { key: "nonfunctional", label: "Requisitos não funcionais", placeholder: "Ex.: segurança, disponibilidade, baixo custo" },
      { key: "integrations", label: "Integrações", placeholder: "Ex.: e-mail, autenticação, planilhas" },
      { key: "goal", label: "Objetivo da arquitetura", placeholder: "Ex.: simples de manter e fácil de evoluir" },
    ],
    promptTemplate: `/architecture

Intenção: desenhar a arquitetura de um sistema ou software.

Sistema ou solução: {{system}}.
Contexto: {{context}}.
Requisitos funcionais: {{functional}}.
Requisitos não funcionais: {{nonfunctional}}.
Integrações: {{integrations}}.
Objetivo da arquitetura: {{goal}}.

Entregue visão geral em camadas, componentes e responsabilidades, fluxo de dados, decisões técnicas com justificativa, riscos e uma sugestão de evolução em fases.`,
    example: {
      input: "Sistema: controle patrimonial · Objetivo: simples de manter",
      output: "CAMADAS — interface web, API, regras de negócio, banco de dados.\nDECISÕES — framework full stack único para reduzir complexidade; autenticação gerenciada.\nFLUXO — usuário → interface → API → banco → relatórios.\nEVOLUÇÃO — v1 cadastros; v2 manutenção preventiva; v3 indicadores.",
    },
    relatedCommands: ["layers", "blueprint", "diagram"],
  },
  {
    slug: "summarize",
    title: "Resumo Inteligente",
    category: "aprendizado",
    icon: "FileText",
    description: "Resume um texto longo nos pontos principais.",
    useCase: "condensar documentos, reuniões ou artigos sem perder o essencial",
    fields: [
      { key: "content", label: "Conteúdo ou material", placeholder: "Cole o texto aqui ou descreva o material", type: "textarea" },
      { key: "context", label: "Contexto", placeholder: "Ex.: ata de reunião de projeto" },
      { key: "audience", label: "Público", placeholder: "Ex.: diretoria que não participou" },
      { key: "detail", label: "Nível de detalhe", type: "select", options: ["Muito curto (3 linhas)", "Curto (1 parágrafo)", "Médio (tópicos)", "Detalhado (por seção)"] },
      { key: "output", label: "Formato de saída", type: "select", options: ["Tópicos", "Parágrafos", "Tabela", "Resumo executivo + decisões pendentes"] },
    ],
    promptTemplate: `/summarize

Intenção: resumir um conteúdo longo nos pontos principais.

Conteúdo ou material: {{content}}.
Contexto: {{context}}.
Público: {{audience}}.
Nível de detalhe: {{detail}}.
Formato de saída: {{output}}.

Preserve números, datas e nomes importantes. Separe fatos de interpretações e sinalize o que ficou ambíguo ou precisa de confirmação.`,
    example: {
      input: "Material: ata de reunião · Formato: resumo executivo + pendências",
      output: "RESUMO — o projeto está no prazo; a fase de testes terminou.\nDECISÕES — go-live aprovado para a próxima semana.\nPENDÊNCIAS — treinamento de duas equipes; validação de relatórios.\nAMBÍGUO — responsável pelo suporte pós-implantação.",
    },
    relatedCommands: ["executivebrief", "cheatsheet", "extract"],
  },
  {
    slug: "factcheck",
    title: "Checagem de Fatos",
    category: "aprendizado",
    icon: "ClipboardCheck",
    description: "Confere se uma afirmação realmente procede.",
    useCase: "verificar uma informação antes de usá-la ou compartilhá-la",
    fields: [
      { key: "claim", label: "Afirmação", placeholder: "Ex.: “Esse método reduz em 50% o tempo de atendimento”", type: "textarea" },
      { key: "context", label: "Contexto", placeholder: "Ex.: apareceu em um relatório interno" },
      { key: "source", label: "Fonte disponível", placeholder: "Ex.: link, documento ou “nenhuma”" },
      { key: "rigor", label: "Nível de rigor", type: "select", options: ["Rápido (visão geral)", "Moderado (fontes confiáveis)", "Rigoroso (evidências e limitações)"] },
      { key: "format", label: "Formato de resposta", type: "select", options: ["Veredito + justificativa", "Tabela de evidências", "Parecer detalhado"] },
    ],
    promptTemplate: `/factcheck

Intenção: conferir se uma afirmação realmente procede.

Afirmação: {{claim}}.
Contexto: {{context}}.
Fonte disponível: {{source}}.
Nível de rigor: {{rigor}}.
Formato de resposta: {{format}}.

Classifique a afirmação (verdadeira, parcialmente verdadeira, enganosa, falsa ou não verificável), explique o raciocínio, aponte o que depende de fonte externa e indique como eu posso confirmar cada ponto.`,
    example: {
      input: "Afirmação: “reduz 50% do tempo” · Rigor: moderado",
      output: "VEREDITO — não verificável com o que foi informado.\nPOR QUÊ — não há base de comparação nem período definido.\nCOMO CONFIRMAR — medir tempo médio antes e depois, com a mesma metodologia.",
    },
    relatedCommands: ["sources", "mythvsfact", "research"],
  },
  {
    slug: "strategy",
    title: "Estratégia",
    category: "estrategia",
    icon: "Compass",
    description: "Estrutura uma estratégia pro seu objetivo.",
    useCase: "transformar um objetivo em direção, escolhas e prioridades",
    fields: [
      { key: "business", label: "Negócio, área ou projeto", placeholder: "Ex.: área de tecnologia de uma organização de saúde", type: "textarea" },
      { key: "objective", label: "Objetivo estratégico", placeholder: "Ex.: ampliar o uso do sistema e reduzir retrabalho" },
      { key: "scenario", label: "Cenário atual", placeholder: "Ex.: múltiplas unidades, sistemas legados convivendo", type: "textarea" },
      { key: "constraints", label: "Restrições", placeholder: "Ex.: orçamento fixo, equipes com alta demanda" },
      { key: "horizon", label: "Horizonte de execução", placeholder: "Ex.: 12 meses" },
      { key: "audience", label: "Público", placeholder: "Ex.: gestores e liderança técnica" },
    ],
    promptTemplate: `/strategy

Intenção: estruturar uma estratégia para o objetivo descrito.

Negócio, área ou projeto: {{business}}.
Objetivo estratégico: {{objective}}.
Cenário atual: {{scenario}}.
Restrições: {{constraints}}.
Horizonte de execução: {{horizon}}.
Público: {{audience}}.

Entregue diagnóstico, escolhas estratégicas (o que fazer e o que NÃO fazer), iniciativas priorizadas, indicadores de sucesso, riscos e um plano de execução por trimestre.`,
    example: {
      input: "Objetivo: ampliar uso do sistema · Horizonte: 12 meses",
      output: "DIAGNÓSTICO — adoção desigual entre unidades.\nESCOLHAS — priorizar unidades de maior volume; não customizar antes de padronizar.\nINICIATIVAS — treinamento por perfil, indicadores de uso, suporte dedicado.\nINDICADORES — taxa de adoção, tempo de atendimento, chamados por usuário.",
    },
    relatedCommands: ["swot", "scenario", "actionplan"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Montagem final                                                            */
/* -------------------------------------------------------------------------- */

function buildGeneric(category: CategoryId, row: Row, siblings: string[]): PromptCommand {
  const [slug, title, description, ideal, icon] = row;
  const kind = kindByCategory[category];
  const isVisual = kind === "visual";
  const fields = isVisual ? visualFields : standardFields;
  const intent = lowerFirst(description).replace(/\.?$/, ".");
  const body = isVisual
    ? `Aplique essa intenção ao seguinte assunto: {{topic}}.\nContexto e público: {{context}}.\nEstilo visual: {{style}}.\nFormato: {{format}}.`
    : `Aplique essa intenção ao seguinte tema ou conteúdo: {{topic}}.\nContexto e público: {{context}}.\nObjetivo: {{goal}}.\nNível de profundidade: {{depth}}.`;

  const idx = siblings.indexOf(slug);
  const related = [1, 2, 3]
    .map((n) => siblings[(idx + n) % siblings.length])
    .filter((s) => s !== slug);

  return {
    slug,
    title,
    category,
    icon,
    description,
    useCase: ideal,
    fields,
    promptTemplate: `/${slug}\n\nIntenção: ${intent}\n\n${body}\n\n${closings[kind]}`,
    example: {
      input: `Comando /${slug} · tema à sua escolha`,
      output: `Estrutura típica da resposta:\n${previewOutlines[kind].map((s, i) => `${i + 1}. ${s}`).join("\n")}`,
    },
    relatedCommands: Array.from(new Set(related)),
    trending: trendingSlugs.has(slug),
  };
}

function build(): PromptCommand[] {
  const out: PromptCommand[] = [];
  const order: CategoryId[] = ["estrategia", "gestao", "tecnologia", "aprendizado", "criatividade", "consultoria", "comparativos", "outros"];

  for (const cat of order) {
    const det = detailed.filter((d) => d.category === cat);
    const rows = generic[cat];
    const siblings = [...det.map((d) => d.slug), ...rows.map((r) => r[0])];

    for (const d of det) {
      out.push({ ...d, guided: true, trending: trendingSlugs.has(d.slug) });
    }
    for (const r of rows) out.push(buildGeneric(cat, r, siblings));
  }
  return out;
}

export const commands: PromptCommand[] = build();

export const commandsBySlug: Record<string, PromptCommand> = Object.fromEntries(
  commands.map((c) => [c.slug, c])
);

export const guidedCases = commands.filter((c) => c.guided);
export const trendingCommands = commands.filter((c) => c.trending);

