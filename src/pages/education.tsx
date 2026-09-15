import { Printer } from "lucide-react";
import { Button } from "../components/ui/button";
import { PageHeading } from "../components/PageHeading";
import { Board } from "../components/Board";
import { useSiteLink } from "../components/Layout";
import { siteTitle, initiators } from "../site";
import type { Lang } from "../types";
import teachingPaper from "../content/teaching.json";

export function TeachingPaper({ lang }: { lang: Lang }) {
  const link = useSiteLink();
  const de = lang === "de",
    paper = teachingPaper[lang];
  return (
    <>
      <PageHeading
        eyebrow={
          de
            ? "Positionspapier · Lehre · Diskussionsentwurf"
            : "Position Paper · Education · Discussion Draft"
        }
        title={siteTitle[lang]}
        subtitle={paper.title}
      />
      <div className="paper-byline">
        {de ? "Autoren: " : "Authors: "}
        {initiators.map((p, i) => (
          <span key={p.name}>
            {i > 0 && " · "}
            <a href={p.homepage} target="_blank" rel="noopener noreferrer">
              {p.name}
            </a>
          </span>
        ))}
      </div>
      <p className="version-date">
        {de ? "Stand: " : "Last updated: "}
        <time dateTime="2026-09-14">{de ? "14. September 2026" : "14 September 2026"}</time>
      </p>
      <div className="paper-toolbar">
        <Button variant="ghost" onClick={() => window.print()}>
          <Printer size={15} />
          {de ? "Drucken / PDF" : "Print / PDF"}
        </Button>
      </div>
      <div className="paper-layout">
        <aside className="paper-index">
          <p className="eyebrow">{de ? "Im Papier" : "In this paper"}</p>
          <a href={link(lang, "teaching", "preamble")}>{de ? "Präambel" : "Preamble"}</a>
          {paper.principles.map(([title], i) => (
            <a key={i} href={link(lang, "teaching", "principle-" + (i + 1))}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {title.replace(/\.$/, "")}
            </a>
          ))}
        </aside>
        <article className="paper-body">
          <section id="preamble">
            <h2>{de ? "Präambel" : "Preamble"}</h2>
            {paper.preamble.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </section>
          <p className="principles-label">{de ? "Grundsätze" : "Principles"}</p>
          {paper.principles.map(([title, body], i) => (
            <section className="principle" id={"principle-" + (i + 1)} key={i}>
              <h3>
                <span className="principle-number">{String(i + 1).padStart(2, "0")}</span>
                {title}
              </h3>
              <p>{body}</p>
            </section>
          ))}
        </article>
      </div>
      <Board kind="teaching" lang={lang} />
    </>
  );
}
