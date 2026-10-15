"use client";

import { useState } from "react";
import { LaserText } from "@/components/LaserText";
import { Brain, CheckCircle2, RotateCcw, Trophy, Shuffle } from "lucide-react";

type GameTab = "logica" | "memoria";

interface QuizQuestion {
  question: string;
  category: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    category: "Lógica & Padrões",
    question: "Complete a sequência lógica: 2, 6, 12, 20, 30, ___?",
    options: ["38", "40", "42", "44"],
    correct: 2,
    explanation: "Diferenças crescentes: +4, +6, +8, +10, logo o próximo termo soma +12: 30 + 12 = 42.",
  },
  {
    category: "Matemática Rápida",
    question: "Se 5 máquinas levam 5 minutos para produzir 5 peças, quanto tempo 100 máquinas levam para produzir 100 peças?",
    options: ["5 minutos", "20 minutos", "50 minutos", "100 minutos"],
    correct: 0,
    explanation: "Cada máquina produz 1 peça a cada 5 minutos. 100 máquinas farão 100 peças nos mesmos 5 minutos.",
  },
  {
    category: "Cultura Geral & Tecnologia",
    question: "Qual foi o nome do primeiro algoritmo computacional escrito na história pela matemática Ada Lovelace?",
    options: ["Números de Bernoulli", "Cálculo do Pi", "Cifra de César", "Máquina de Turing"],
    correct: 0,
    explanation: "Ada Lovelace escreveu em 1843 o primeiro algoritmo para calcular os Números de Bernoulli na Máquina Analítica.",
  },
  {
    category: "Enigma de Decisão",
    question: "Em gestão de projetos ágeis, qual é a principal métrica para avaliar o ritmo de entrega real de um time por ciclo?",
    options: ["Horas de trabalho diárias", "Velocidade (Story Points entregues)", "Quantidade de reuniões", "Linhas de código geradas"],
    correct: 1,
    explanation: "A velocidade (Velocity) mede o volume de valor concluído com qualidade e pronto para entrega a cada ciclo.",
  },
];

const memoryItems = [
  { id: "cpu", symbol: "⚡", label: "Processador" },
  { id: "ram", symbol: "💾", label: "Memória" },
  { id: "net", symbol: "🌐", label: "Redes" },
  { id: "ia", symbol: "✨", label: "Inteligência" },
];

export function TechLab() {
  const [activeTab, setActiveTab] = useState<GameTab>("logica");

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Memory state
  const [memoryCards, setMemoryCards] = useState(() =>
    [...memoryItems, ...memoryItems]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ ...item, uniqueId: index, isFlipped: false, isMatched: false }))
  );
  const [flipped, setFlipped] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryMatches, setMemoryMatches] = useState(0);

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (idx === quizQuestions[currentQuestion].correct) {
      setQuizScore((s) => s + 25);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((q) => q + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const handleCardClick = (uniqueId: number) => {
    if (flipped.length === 2) return;
    const card = memoryCards.find((c) => c.uniqueId === uniqueId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = memoryCards.map((c) =>
      c.uniqueId === uniqueId ? { ...c, isFlipped: true } : c
    );
    setMemoryCards(newCards);

    const newFlipped = [...flipped, uniqueId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves((m) => m + 1);
      const [firstId, secondId] = newFlipped;
      const card1 = memoryCards.find((c) => c.uniqueId === firstId);
      const card2 = memoryCards.find((c) => c.uniqueId === secondId);

      if (card1 && card2 && card1.id === card2.id) {
        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c) => (c.id === card1.id ? { ...c, isMatched: true } : c))
          );
          setMemoryMatches((m) => m + 1);
          setFlipped([]);
        }, 500);
      } else {
        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c) =>
              c.uniqueId === firstId || c.uniqueId === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlipped([]);
        }, 900);
      }
    }
  };

  const resetMemory = () => {
    setMemoryCards(
      [...memoryItems, ...memoryItems]
        .sort(() => Math.random() - 0.5)
        .map((item, index) => ({ ...item, uniqueId: index, isFlipped: false, isMatched: false }))
    );
    setFlipped([]);
    setMemoryMoves(0);
    setMemoryMatches(0);
  };

  const tabs = [
    { id: "logica" as GameTab, label: "Quiz de Lógica & Cultura", Icon: Brain },
    { id: "memoria" as GameTab, label: "Desafio de Padrões & Memória", Icon: Shuffle },
  ];

  return (
    <section
      id="techlab-game"
      className="relative py-20 text-white lg:py-28"
      style={{ background: "#0a0e14", borderTop: "1px solid #243041" }}
    >
      {/* Scan line */}
      <div
        className="absolute left-0 right-0 top-0 h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #2f9bff 20%, rgba(47,155,255,0.3) 80%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Header */}
        <div className="mb-8">
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.22em] block mb-2"
            style={{
              color: "#2f9bff",
              fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
            }}
          >
            Tech Lab Interativo
          </span>
          <LaserText
            text="Espaço de desafios, lógica e raciocínio"
            as="h2"
            delay={300}
            interval={38}
            className="block font-display text-2xl sm:text-3xl"
            style={{ color: "#ecebe6" } as React.CSSProperties}
          />
          <p className="mt-3 text-sm max-w-2xl" style={{ color: "#8e8d8a" }}>
            Teste suas habilidades em desafios interativos com feedback instantâneo e pontuação em tempo real.
          </p>
        </div>

        {/* Tab strip */}
        <div
          className="flex gap-[1px] mb-8"
          style={{ borderBottom: "1px solid #243041", background: "#243041" }}
        >
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors flex-1 justify-center"
              style={{
                background: activeTab === id ? "#0a0e14" : "#0b0b0c",
                color: activeTab === id ? "#2f9bff" : "#697c90",
                borderBottom: activeTab === id ? "2px solid #2f9bff" : "2px solid transparent",
                fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
              }}
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* ── QUIZ ── */}
        {activeTab === "logica" && (
          <div
            className="p-6 sm:p-8"
            style={{
              border: "1px solid #243041",
              background: "#0b0b0c",
            }}
          >
            {!quizFinished ? (
              <div>
                {/* Quiz header */}
                <div
                  className="flex items-center justify-between pb-4 mb-6 text-xs"
                  style={{ borderBottom: "1px solid #243041" }}
                >
                  <span
                    className="uppercase tracking-wider"
                    style={{
                      color: "#2f9bff",
                      fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                    }}
                  >
                    {quizQuestions[currentQuestion].category}
                  </span>
                  <div className="flex items-center gap-4">
                    <span style={{ color: "#697c90", fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)" }}>
                      {currentQuestion + 1}/{quizQuestions.length}
                    </span>
                    <span
                      className="px-3 py-1 font-mono font-bold"
                      style={{
                        background: "rgba(47,155,255,0.1)",
                        color: "#2f9bff",
                        border: "1px solid rgba(47,155,255,0.3)",
                        borderRadius: "2px",
                      }}
                    >
                      {quizScore} pts
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold leading-snug sm:text-2xl mb-6" style={{ color: "#ecebe6" }}>
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="grid gap-[1px] sm:grid-cols-2" style={{ background: "#243041" }}>
                  {quizQuestions[currentQuestion].options.map((option, idx) => {
                    const isChosen = selectedOption === idx;
                    const isCorrect = idx === quizQuestions[currentQuestion].correct;
                    const hasAnswered = selectedOption !== null;

                    let bg = "#0b0b0c";
                    let color = "#8e8d8a";
                    if (hasAnswered) {
                      if (isCorrect) { bg = "rgba(47,155,255,0.12)"; color = "#2f9bff"; }
                      else if (isChosen) { bg = "rgba(220,38,38,0.12)"; color = "#f87171"; }
                    }

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelectOption(idx)}
                        className="flex items-center justify-between p-4 text-left text-sm transition-colors"
                        style={{ background: bg, color }}
                        onMouseEnter={(e) => {
                          if (!hasAnswered) e.currentTarget.style.background = "#0d1520";
                        }}
                        onMouseLeave={(e) => {
                          if (!hasAnswered) e.currentTarget.style.background = bg;
                        }}
                      >
                        <span>{option}</span>
                        {hasAnswered && isCorrect && <CheckCircle2 size={16} style={{ color: "#2f9bff" }} />}
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <div
                    className="mt-5 p-4 text-xs leading-relaxed"
                    style={{
                      border: "1px solid #243041",
                      background: "#0a0e14",
                      color: "#8e8d8a",
                    }}
                  >
                    <strong style={{ color: "#2f9bff" }}>Explicação: </strong>
                    {quizQuestions[currentQuestion].explanation}
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    disabled={selectedOption === null}
                    onClick={nextQuestion}
                    className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: "#2f9bff",
                      color: "#0b0b0c",
                      borderRadius: "2px",
                    }}
                  >
                    {currentQuestion < quizQuestions.length - 1 ? "Próxima Questão" : "Ver Resultado"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-10 text-center">
                <Trophy size={48} className="mx-auto" style={{ color: "#2f9bff" }} />
                <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl" style={{ color: "#ecebe6" }}>
                  Desafio Concluído!
                </h3>
                <p className="mt-2 text-base" style={{ color: "#8e8d8a" }}>
                  Pontuação final:{" "}
                  <span className="font-bold" style={{ color: "#2f9bff" }}>
                    {quizScore} de 100 pontos
                  </span>
                </p>
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-90"
                  style={{ background: "#2f9bff", color: "#0b0b0c", borderRadius: "2px" }}
                >
                  <RotateCcw size={15} />
                  Jogar Novamente
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── MEMÓRIA ── */}
        {activeTab === "memoria" && (
          <div
            className="p-6 sm:p-8"
            style={{ border: "1px solid #243041", background: "#0b0b0c" }}
          >
            <div
              className="flex items-center justify-between pb-4 mb-6 text-xs"
              style={{ borderBottom: "1px solid #243041" }}
            >
              <span
                className="uppercase tracking-wider"
                style={{
                  color: "#2f9bff",
                  fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                }}
              >
                Encontre todos os pares
              </span>
              <div className="flex items-center gap-4">
                <span style={{ color: "#8e8d8a" }}>
                  Tentativas:{" "}
                  <strong style={{ color: "#ecebe6" }}>{memoryMoves}</strong>
                </span>
                <span style={{ color: "#8e8d8a" }}>
                  Pares:{" "}
                  <strong style={{ color: "#2f9bff" }}>
                    {memoryMatches}/{memoryItems.length}
                  </strong>
                </span>
                <button
                  type="button"
                  onClick={resetMemory}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] transition-colors hover:text-white"
                  style={{
                    border: "1px solid #243041",
                    background: "#0a0e14",
                    color: "#697c90",
                    borderRadius: "2px",
                    fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                  }}
                >
                  <RotateCcw size={11} />
                  Reiniciar
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-3 max-w-xl mx-auto">
              {memoryCards.map((card) => {
                const isOpen = card.isFlipped || card.isMatched;
                return (
                  <button
                    key={card.uniqueId}
                    type="button"
                    onClick={() => handleCardClick(card.uniqueId)}
                    className="aspect-square flex flex-col items-center justify-center text-2xl transition-all duration-300"
                    style={{
                      border: isOpen ? "1px solid #2f9bff" : "1px solid #243041",
                      background: isOpen ? "rgba(47,155,255,0.12)" : "#0a0e14",
                      boxShadow: isOpen ? "0 0 14px rgba(47,155,255,0.25)" : "none",
                      borderRadius: "3px",
                    }}
                  >
                    {isOpen ? (
                      <>
                        <span>{card.symbol}</span>
                        <span
                          className="mt-1 text-[9px] font-semibold uppercase tracking-wider"
                          style={{
                            color: "#8e8d8a",
                            fontFamily: "var(--font-mono,'IBM Plex Mono',monospace)",
                          }}
                        >
                          {card.label}
                        </span>
                      </>
                    ) : (
                      <span
                        className="text-base font-mono"
                        style={{ color: "#243041" }}
                      >
                        ?
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {memoryMatches === memoryItems.length && (
              <div
                className="mt-8 p-4 text-center"
                style={{
                  border: "1px solid rgba(47,155,255,0.4)",
                  background: "rgba(47,155,255,0.08)",
                }}
              >
                <p className="font-display text-lg font-bold" style={{ color: "#2f9bff" }}>
                  🎉 Parabéns! Você encontrou todos os pares em {memoryMoves} tentativas!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
