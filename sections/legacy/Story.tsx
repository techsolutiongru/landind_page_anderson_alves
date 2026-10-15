import { chapters, storyClosing, storyIntro } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { RichText } from "@/components/RichText";
import { SectionHeading } from "@/components/SectionHeading";

export function Story() {
  return (
    <section id="historia" className="relative bg-paper py-24 text-ink-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Minha história" title={storyIntro.title} />
        </Reveal>

        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
          {chapters.map((c, idx) => (
            <article key={c.id} className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <header className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <p className="font-display text-5xl text-mint-600/30 sm:text-6xl" aria-hidden="true">
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-mint-600">{c.period}</p>
                  <h3 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">
                    <RichText text={c.title} boldClass="italic font-normal text-mint-600" />
                  </h3>
                </div>
              </header>

              <div className="space-y-6 text-lg leading-[1.75] text-slate-700 lg:col-span-8">
                {c.paragraphs.map((p, i) => (
                  <Reveal key={i} y={16}>
                    <p className={i === 0 && idx === 0 ? "text-xl text-ink-800 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-mint-600" : ""}>
                      <RichText text={p} boldClass="font-semibold text-ink-900" />
                    </p>
                  </Reveal>
                ))}
              </div>
            </article>
          ))}
        </div>

        <Reveal>
          <p className="mx-auto mt-24 max-w-3xl border-t border-ink-900/10 pt-10 text-center font-display text-2xl italic leading-snug text-ink-800 sm:text-3xl">
            {storyClosing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
