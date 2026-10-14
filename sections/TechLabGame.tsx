"use client";

import { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Award,
  Play,
  Globe,
  Network,
  Laptop,
  HardDrive,
  Wifi,
  Radio,
  Zap,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

type DeviceType = "internet" | "router" | "switch" | "pc1" | "pc2" | "server";

interface Slot {
  id: number;
  label: string;
  expectedType: DeviceType;
  installedType: DeviceType | null;
  description: string;
}

const initialSlots: Slot[] = [
  { id: 1, label: "Ponto de Entrada WAN", expectedType: "internet", installedType: null, description: "Link externo de fibra óptica" },
  { id: 2, label: "Borda / Gateway", expectedType: "router", installedType: null, description: "Roteador e firewall de borda" },
  { id: 3, label: "Distribuição LAN", expectedType: "switch", installedType: null, description: "Switch Gigabit de distribuição" },
  { id: 4, label: "Estação Recepção", expectedType: "pc1", installedType: null, description: "Terminal do operador de acolhimento" },
  { id: 5, label: "Estação Triagem", expectedType: "pc2", installedType: null, description: "Terminal clínico de classificação" },
  { id: 6, label: "Servidor Local", expectedType: "server", installedType: null, description: "Banco de dados e prontuários SISS" },
];

const availableItems: { type: DeviceType; name: string; icon: any; category: string }[] = [
  { type: "internet", name: "Link Internet Fibra", icon: Globe, category: "WAN" },
  { type: "router", name: "Roteador Corporativo", icon: Wifi, category: "Borda" },
  { type: "switch", name: "Switch Gigabit 24p", icon: Network, category: "LAN" },
  { type: "pc1", name: "PC Recepção", icon: Laptop, category: "Terminal" },
  { type: "pc2", name: "PC Triagem Clínica", icon: Laptop, category: "Terminal" },
  { type: "server", name: "Servidor Local SISS", icon: HardDrive, category: "Infraestrutura" },
];

export function TechLabGame() {
  const [slots, setSlots] = useState<Slot[]>(initialSlots);
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<DeviceType | null>(null);

  const handlePlace = (slotId: number) => {
    if (!selectedItem) return;

    setSlots((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, installedType: selectedItem } : s))
    );
    setSelectedItem(null);
  };

  const handleRemove = (slotId: number) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, installedType: null } : s))
    );
  };

  const handleValidate = () => {
    setAttempts((a) => a + 1);

    // Validação lógica baseada em regras de topologia de rede
    const allFilled = slots.every((s) => s.installedType !== null);
    if (!allFilled) {
      setStatus("error");
      setFeedback("Topologia incompleta: você precisa posicionar todos os 6 equipamentos para fechar o circuito de dados.");
      return;
    }

    const errors: string[] = [];

    // Regra 1: Internet deve conectar no Ponto de Entrada
    const internetSlot = slots.find((s) => s.id === 1);
    if (internetSlot?.installedType !== "internet") {
      errors.push("O ponto de entrada WAN precisa ser a conexão com a Internet Fibra.");
    }

    // Regra 2: Roteador deve ser a Borda / Gateway
    const routerSlot = slots.find((s) => s.id === 2);
    if (routerSlot?.installedType !== "router") {
      errors.push("O gateway entre a Internet e a rede local precisa ser o Roteador Corporativo.");
    }

    // Regra 3: Switch centraliza a distribuição
    const switchSlot = slots.find((s) => s.id === 3);
    if (switchSlot?.installedType !== "switch") {
      errors.push("Para distribuir pacotes entre múltiplos terminais e o servidor, utilize o Switch Gigabit.");
    }

    // Regra 4: Terminais e servidores
    const pc1 = slots.find((s) => s.id === 4)?.installedType === "pc1";
    const pc2 = slots.find((s) => s.id === 5)?.installedType === "pc2";
    const server = slots.find((s) => s.id === 6)?.installedType === "server";

    if (!pc1 || !pc2 || !server) {
      errors.push("Verifique a posição correta das Estações e do Servidor nos nós finais da rede local.");
    }

    if (errors.length === 0) {
      setStatus("success");
      const calculatedScore = Math.max(50, 150 - (attempts - 1) * 15);
      setScore(calculatedScore);
      setFeedback(
        "Topologia 100% funcional validada com sucesso! O tráfego de dados flui com estabilidade entre a WAN, Roteador de Borda, Switch de Distribuição e todos os terminais e servidores SISS."
      );
    } else {
      setStatus("error");
      setFeedback(
        errors[0] +
          (attempts >= 2
            ? " Dica arquitetural: Siga a hierarquia de camadas: Internet (WAN) -> Roteador (Borda) -> Switch (LAN) -> Terminais / Servidor."
            : "")
      );
    }
  };

  const handleReset = () => {
    setSlots(initialSlots);
    setStatus("idle");
    setFeedback("");
    setSelectedItem(null);
  };

  return (
    <section id="techlab-game" className="relative isolate overflow-hidden bg-ink-900 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              dark
              eyebrow="TechLab 3D — Desafio da Solução"
              title="Missão 01: Monte uma **rede funcional**"
              lead="Entre na bancada virtual, resolva o desafio prático de arquitetura e descubra como a tecnologia conecta equipamentos e dados na vida real."
            />
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 rounded-full border border-mint-400/30 bg-mint-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-mint-400 font-mono">
                <Award size={16} /> Pontuação: {score} pts
              </span>
            </div>
          </div>
        </Reveal>

        {/* Seletor de Missões (Arquitetura Extensível para Desafios Futuros) */}
        <div className="mt-8 flex flex-wrap gap-2 text-xs font-mono">
          <span className="rounded-full bg-mint-400 px-3.5 py-1 font-semibold text-ink-950">
            Missão 01: Topologia de Rede (Ativa)
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-slate-400">
            Missão 02: Diagnóstico de Incidentes (Em breve)
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-slate-400">
            Missão 03: Manutenção de Hardware (Em breve)
          </span>
        </div>

        {/* Cenário Interativo */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-ink-950 p-6 sm:p-8 shadow-2xl">
          {/* Painel de Equipamentos Disponíveis na Bancada */}
          <div className="border-b border-white/10 pb-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Passo 1: Selecione um equipamento da bancada para posicionar:
              </p>
              {selectedItem && (
                <span className="rounded-full bg-mint-400/20 px-2.5 py-0.5 text-[10px] font-mono text-mint-400">
                  Item selecionado: clique em um slot abaixo
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {availableItems.map((item) => {
                const IconComp = item.icon;
                const isSelected = selectedItem === item.type;
                const isAlreadyUsed = slots.some((s) => s.installedType === item.type);

                return (
                  <button
                    key={item.type}
                    type="button"
                    disabled={isAlreadyUsed}
                    onClick={() => setSelectedItem(item.type)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-2xl border px-4 py-2.5 text-xs font-medium transition",
                      isAlreadyUsed
                        ? "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600"
                        : isSelected
                        ? "border-mint-400 bg-mint-400 text-ink-950 font-semibold shadow-glow scale-105"
                        : "border-white/15 bg-white/5 text-slate-200 hover:border-mint-400/60 hover:bg-white/10"
                    )}
                  >
                    <IconComp size={16} />
                    <span>{item.name}</span>
                    <span className="text-[10px] opacity-60">({item.category})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topologia / Rack Virtual de Montagem com Linhas de Conexão */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Passo 2: Clique em um slot da arquitetura para instalar o componente:
              </p>
              {status === "success" && (
                <span className="flex items-center gap-1.5 text-xs text-mint-400 font-mono">
                  <Radio size={14} className="animate-pulse" /> Circuito Conectado & Tráfego Ativo
                </span>
              )}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {slots.map((slot) => {
                const installedItem = availableItems.find((i) => i.type === slot.installedType);
                const IconComp = installedItem?.icon;
                const isCorrect = status !== "idle" && slot.installedType === slot.expectedType;
                const isWrong = status === "error" && slot.installedType !== null && slot.installedType !== slot.expectedType;

                return (
                  <div
                    key={slot.id}
                    onClick={() => handlePlace(slot.id)}
                    className={cn(
                      "group relative flex cursor-pointer flex-col justify-between rounded-2xl border p-5 transition",
                      isCorrect
                        ? "border-mint-400 bg-mint-400/10 ring-1 ring-mint-400/50 shadow-[0_0_20px_rgba(69,219,165,0.15)]"
                        : isWrong
                        ? "border-rose-500/60 bg-rose-500/10 ring-1 ring-rose-500/40"
                        : slot.installedType
                        ? "border-mint-400/40 bg-white/[0.04]"
                        : selectedItem
                        ? "border-dashed border-mint-400/60 bg-mint-400/5 hover:bg-mint-400/10"
                        : "border-dashed border-white/15 bg-white/[0.02]"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase text-slate-500">Slot 0{slot.id}</span>
                        <div className="flex items-center gap-1.5">
                          {isCorrect && (
                            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300 font-semibold">
                              ✓ Correto
                            </span>
                          )}
                          {isWrong && (
                            <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] text-rose-300 font-semibold">
                              ⚠ Incorreto
                            </span>
                          )}
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-slate-300">
                            {slot.label}
                          </span>
                        </div>
                      </div>

                      {/* Display do Item Instalado */}
                      <div className="my-4 flex items-center gap-3">
                        {slot.installedType && IconComp ? (
                          <div className="flex items-center gap-3 text-mint-400">
                            <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink-800 text-mint-400 ring-1 ring-mint-400/30">
                              <IconComp size={20} />
                            </span>
                            <div>
                              <p className="font-display text-sm font-semibold text-white">{installedItem.name}</p>
                              <p className="text-[11px] text-slate-400">{installedItem.category}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 text-slate-500">
                            <span className="grid h-10 w-10 place-items-center rounded-xl border border-dashed border-white/20">
                              +
                            </span>
                            <span className="text-xs italic">
                              {selectedItem ? "Clique para instalar" : "Slot vazio"}
                            </span>
                          </div>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-400">{slot.description}</p>
                    </div>

                    {slot.installedType && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(slot.id);
                        }}
                        className="mt-3 text-left text-[11px] text-rose-400 underline-offset-2 hover:underline"
                      >
                        Desconectar componente
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feedback e Botões de Validação */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
            <div className="flex-1">
              {status === "success" && (
                <div className="flex items-center gap-2 text-sm text-mint-400">
                  <CheckCircle2 size={18} className="shrink-0" />
                  <span>{feedback}</span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-amber-400">
                  <AlertTriangle size={18} className="shrink-0" />
                  <span>{feedback}</span>
                </div>
              )}
              {status === "idle" && (
                <p className="text-xs text-slate-400">
                  Instale os componentes nos slots correspondentes e clique em &ldquo;Testar e Validar Rede&rdquo; para verificar as regras lógicas de arquitetura.
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10"
              >
                <RotateCcw size={14} /> Reiniciar
              </button>
              <button
                type="button"
                onClick={handleValidate}
                className="inline-flex items-center gap-2 rounded-full bg-mint-400 px-6 py-2.5 text-xs font-semibold text-ink-950 transition hover:bg-mint-300 shadow-glow"
              >
                <Play size={14} /> Testar e Validar Rede
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
