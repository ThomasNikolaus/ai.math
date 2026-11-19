// Reviewed local HTML for the resource list; never visitor-supplied content.
import type { Lang } from "../types";
import resources from "../content/resources.json";
import { useSiteLink } from "../components/Layout";
import { seminarUrl } from "../site";

export function Resources({ lang }: { lang: Lang }) {
  const link = useSiteLink();
  const de = lang === "de";
  const summitReports = `
      <article class="resource">
        <h3><a href="https://cmsa.fas.harvard.edu/media/2026/10/Summit-on-Math-Research-in-the-Age-of-AI.pdf" target="_blank" rel="noopener">Math Research in the Age of AI</a></h3>
        <p><small>Harvard CMSA summit report · 2026</small><br>${de
          ? "Empfehlungen zu Forschungsbewertung, Publikationsformen, offenen Werkzeugen, Formalisierung sowie zur Zusammenarbeit zwischen Wissenschaft und KI-Laboren."
          : "Recommendations on research evaluation, publication formats, open-source tools, formalisation and collaboration between academia and AI labs."}</p>
      </article>
      <article class="resource">
        <h3><a href="https://cmsa.fas.harvard.edu/media/2026/09/Summit-on-PhD-Math-Education-in-the-Age-of-AI.pdf" target="_blank" rel="noopener">PhD Math Education in the Age of AI</a></h3>
        <p><small>Harvard CMSA summit report · 2026</small><br>${de
          ? "Empfehlungen zur Weiterentwicklung mathematischer Promotionsprogramme, darunter Kommunikation, Betreuung, Leistungsbewertung und ein reflektierter Umgang mit KI-Werkzeugen."
          : "Recommendations for adapting mathematics PhD programmes, including communication, advising, assessment and the considered use of AI tools."}</p>
      </article>`;
  const declarationsHeading = de
    ? /<h2>Erklärungen &amp; Positionen<\/h2>\s*<div class="resources">/
    : /<h2>Declarations &amp; positions<\/h2>\s*<div class="resources">/;
  const declarationsTitle = de
    ? "Berichte, Erklärungen &amp; Positionen"
    : "Reports, declarations &amp; positions";
  const html = resources[lang]
    .replace(
      /<section>\s*<h2>(?:Past events|Vergangene Veranstaltungen)<\/h2>[\s\S]*?<\/section>\s*/,
      "",
    )
    .replace(
      declarationsHeading,
      `<h2>${declarationsTitle}</h2><div class="resources">${summitReports}`,
    );
  return (
    <>
      <h1 className="screenreader-heading">
        {de ? "Materialien & Veranstaltungen" : "Resources & Events"}
      </h1>
      <section className="external-seminar prose" aria-labelledby="external-seminar-title">
        <p className="seminar-label">{de ? "Online-Seminar" : "Online Seminar"}</p>
        <h2 id="external-seminar-title">
          <a href={seminarUrl} target="_blank" rel="noopener noreferrer">
            AI and the Future of Mathematics
          </a>
        </h2>
        <p>
          {de
            ? "Vorträge und anschließende Diskussionen zu KI und Mathematik."
            : "Talks and follow-up discussions on AI and mathematics."}
        </p>
        <a
          className="seminar-programme"
          href={seminarUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {de ? "Zum Seminarprogramm" : "View the seminar programme"}{" "}
          <span aria-hidden="true">↗</span>
        </a>
      </section>
      <article className="horizons-feature horizons-resource-feature" aria-labelledby="horizons-resource-title">
        <div>
          <p className="horizons-feature-meta">Thomas Kahle · {de ? "17. November 2026" : "17 November 2026"}</p>
          <h2 id="horizons-resource-title"><a href={link(lang, "horizons")}>{de ? "Horizonte für souveräne KI" : "Horizons for Sovereign AI"}</a></h2>
          <p>{de
            ? "Eine Einordnung universitärer KI-Infrastruktur: Möglichkeiten, Kosten, Personal und Unabhängigkeit – mit Hintergrund, Glossar und Quellen."
            : "An assessment of AI infrastructure at universities: capabilities, costs, staffing and independence, with background, a glossary and sources."}</p>
        </div>
        <a className="horizons-feature-link" href={link(lang, "horizons")}>
          {de ? "Artikel lesen" : "Read article"}<span aria-hidden="true">↗</span>
        </a>
      </article>
      <div className="original-seminar links-original" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
