"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Estado persistido em localStorage, seguro para SSR:
 * começa com o valor inicial e hidrata no cliente após a montagem.
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {
      /* armazenamento indisponível: segue em memória */
    }
    setReady(true);
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          /* ignora */
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, update, ready] as const;
}
