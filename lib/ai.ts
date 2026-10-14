/**
 * Base para futura integração com uma API real de IA.
 *
 * Hoje o laboratório gera apenas o PROMPT (localmente). Quando quiser executar
 * o prompt dentro do site, implemente app/api/generate/route.ts com o provedor
 * escolhido e ative `AI_EXECUTION_ENABLED`.
 */
export const AI_EXECUTION_ENABLED = false;

export async function runPrompt(prompt: string): Promise<{ output: string }> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error("Execução de IA ainda não configurada.");
  return res.json();
}
