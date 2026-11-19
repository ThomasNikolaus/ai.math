import { Printer } from "lucide-react";
import { PageHeading } from "../components/PageHeading";
import { Button } from "../components/ui/button";
import type { Lang } from "../types";
import germanArticle from "../content/ki-horizonte.json";
import englishArticle from "../content/ki-horizonte.en.json";

export function AIHorizons({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const article = de ? germanArticle : englishArticle;

  return (
    <>
      <PageHeading
        eyebrow=""
        title={article.title}
        subtitle={article.title}
      />
      <div className="paper-byline">
        <span>
          {de ? "Von " : "By "}
          <a href="https://thomas-kahle.de/" target="_blank" rel="noopener noreferrer">Thomas Kahle</a>
        </span>
      </div>
      <p className="version-date">
        {de ? "Stand: " : "Last updated: "}
        <time dateTime="2026-11-17">{de ? "17. November 2026" : "17 November 2026"}</time>
      </p>
      <div className="paper-toolbar">
        <Button variant="ghost" onClick={() => window.print()}>
          <Printer size={15} aria-hidden="true" />
          {de ? "Drucken / PDF" : "Print / PDF"}
        </Button>
      </div>

      <div className="paper-layout">
        <aside className="paper-index" aria-label={de ? "Inhaltsverzeichnis des Artikels" : "Article contents"}>
          <p className="eyebrow">{de ? "In diesem Artikel" : "In this article"}</p>
          {article.sections.map((section) => (
            <a key={section.id} href={"#" + section.id}>
              <span>{String(section.number).padStart(2, "0")}</span>
              {section.title}
            </a>
          ))}
          {article.footnotesHtml && <a href="#article-footnotes">{de ? "Fußnoten" : "Footnotes"}</a>}
        </aside>

        <article className="paper-body horizons-body" lang={lang} aria-label={de ? "Horizonte für souveräne KI von Thomas Kahle" : "Horizons for Sovereign AI by Thomas Kahle"}>
          {article.sections.map((section) => (
            <section className="horizons-section" key={section.id} dangerouslySetInnerHTML={{ __html: section.html }} />
          ))}
          {article.footnotesHtml && (
            <section className="horizons-footnotes" id="article-footnotes" aria-labelledby="article-footnotes-title">
              <h2 id="article-footnotes-title">{de ? "Fußnoten" : "Footnotes"}</h2>
              <div dangerouslySetInnerHTML={{ __html: article.footnotesHtml }} />
            </section>
          )}
          <p className="horizons-end-link"><a href="#main">{de ? "Zurück zum Anfang" : "Back to top"} <span aria-hidden="true">↑</span></a></p>
        </article>
      </div>
    </>
  );
}
