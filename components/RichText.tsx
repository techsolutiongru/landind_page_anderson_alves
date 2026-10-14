import { Fragment } from "react";

/** Renderiza **negrito** simples sem dangerouslySetInnerHTML. */
export function RichText({ text, boldClass = "font-semibold" }: { text: string; boldClass?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") ? (
          <strong key={i} className={boldClass}>
            {p.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        )
      )}
    </>
  );
}
