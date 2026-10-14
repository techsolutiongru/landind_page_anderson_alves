export type FieldType = "text" | "textarea" | "select";

export interface PromptField {
  key: string;
  label: string;
  placeholder?: string;
  type?: FieldType;
  options?: string[];
}

export type CategoryId =
  | "estrategia"
  | "gestao"
  | "tecnologia"
  | "aprendizado"
  | "criatividade"
  | "consultoria"
  | "comparativos"
  | "outros";

export interface PromptCategory {
  id: CategoryId;
  label: string;
  short: string;
  icon: string;
}

export interface PromptCommand {
  slug: string;
  title: string;
  category: CategoryId;
  icon: string;
  description: string;
  useCase: string;
  fields: PromptField[];
  promptTemplate: string;
  example: { input: string; output: string };
  relatedCommands: string[];
  trending?: boolean;
  guided?: boolean;
}
