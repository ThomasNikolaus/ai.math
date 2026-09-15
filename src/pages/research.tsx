import { MessageSquare, Printer } from "lucide-react";
import { Button } from "../components/ui/button";
import { PageHeading } from "../components/PageHeading";
import { Board } from "../components/Board";
import { useSiteLink } from "../components/Layout";
import { siteTitle, initiators } from "../site";
import type { Lang } from "../types";
import research from "../content/research.json";

export function PositionPaper({ lang }: { lang: Lang }) {
  const link = useSiteLink();
  const de = lang === "de",
    paper = research[lang];
  return (
    <>
      <PageHeading
        eyebrow={de ? "Positionspapier · Forschung" : "Position Paper · Research"}
        title={siteTitle[lang]}
        subtitle={de ? "Grundsätze für die Forschung" : "Principles for Research"}
      />
      <div className="paper-byline">
        <span>
          {de ? "Autoren: " : "Authors: "}
          {initiators.map((person, i) => (
            <span key={person.name}>
              {i > 0 && " · "}
              <a href={person.homepage} target="_blank" rel="noopener noreferrer">
                {person.name}
              </a>
            </span>
          ))}
        </span>
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
          <a href={link(lang, "papers", "preamble")}>{de ? "Präambel" : "Preamble"}</a>
          {paper.principles.map((p, i) => (
            <a key={p.title} href={link(lang, "papers", "principle-" + (i + 1))}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {p.title.replace(/\.$/, "")}
            </a>
          ))}
          <a className="index-discuss" href={link(lang, "papers", "board")}>
            <MessageSquare size={15} />
            {de ? "Papier diskutieren" : "Discuss this paper"}
          </a>
        </aside>
        <article className="paper-body">
          <section id="preamble">
            <h2>{de ? "Präambel" : "Preamble"}</h2>
            {paper.preamble.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
          <p className="principles-label">{de ? "Grundsätze" : "Principles"}</p>
          <p>
            {de
              ? "Auf Basis dieser Ausgangspunkte schlagen wir die folgenden Grundsätze für den Umgang mit KI in der mathematischen Forschung vor:"
              : "On the basis of these starting points, we propose the following principles for the use of AI in mathematical research:"}
          </p>
          {paper.principles.map((p, i) => (
            <section id={"principle-" + (i + 1)} className="principle" key={p.title}>
              <h3>
                <span className="principle-number">{String(i + 1).padStart(2, "0")}</span>
                {p.title}
              </h3>
              <p>{p.body}</p>
            </section>
          ))}
          <section
            className="acknowledgements"
            id="acknowledgements"
            aria-labelledby="acknowledgements-title"
          >
            <h2 id="acknowledgements-title">{de ? "Danksagung" : "Acknowledgements"}</h2>
            <p>
              {de
                ? "Wir danken Vadim Alekseev, Anne Schindler, Mario Ohlberger und Robin Sroka für hilfreiche Diskussionen und Kommentare zu einem Entwurf dieses Positionspapiers. Die vertretenen Positionen sind die der Autoren."
                : "We thank Vadim Alekseev, Anne Schindler, Mario Ohlberger and Robin Sroka for helpful discussions and comments on a draft of this position paper. The views expressed are those of the authors."}
            </p>
          </section>
        </article>
      </div>
      <Board kind="papers" lang={lang} />
    </>
  );
}
