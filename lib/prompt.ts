import type { PromptCommand } from "@/data/types";

/** Remove pontuação final para evitar ".." quando o template já termina com ponto. */
function clean(value: string) {
  return value.trim().replace(/[.\s]+$/, "");
}

/** Monta o prompt final substituindo {{campos}} pelas respostas (ou por [rótulo] quando vazio). */
export function buildPrompt(cmd: PromptCommand, values: Record<string, string> = {}) {
  return cmd.promptTemplate.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const field = cmd.fields.find((f) => f.key === key);
    const v = values[key] ? clean(values[key]) : "";
    return v || `[${(field?.label ?? key).toLowerCase()}]`;
  });
}

/** Quantos campos já foram preenchidos (para indicador de progresso). */
export function filledCount(cmd: PromptCommand, values: Record<string, string> = {}) {
  return cmd.fields.filter((f) => (values[f.key] ?? "").trim().length > 0).length;
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}
