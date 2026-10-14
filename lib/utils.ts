export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function lowerFirst(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}
