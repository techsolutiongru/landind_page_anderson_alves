import { cn } from "@/lib/utils";
import { RichText } from "./RichText";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  dark,
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className={cn("mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em]", dark ? "text-mint-400" : "text-mint-600")}>
        <span className="h-px w-8 bg-current" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className={cn("font-display text-3xl leading-[1.1] sm:text-4xl lg:text-5xl", dark ? "text-white" : "text-ink-900")}>
        <RichText text={title} boldClass="italic font-normal text-mint-500" />
      </h2>
      {lead && (
        <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", dark ? "text-slate-300" : "text-slate-600")}>{lead}</p>
      )}
    </div>
  );
}
