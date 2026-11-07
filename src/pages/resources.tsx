// Reviewed local HTML for the resource list; never visitor-supplied content.
import type { Lang } from "../types";
import resources from "../content/resources.json";
import { seminarUrl } from "../site";

export function Resources({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const summitReports = `
      <article class="resource">
        <h3><a href="https://cmsa.fas.harvard.edu/media/2026/10/Summit-on-Math-Research-in-the-Age-of-AI.pdf" target="_blank" rel="noopener">Report of Summit on Math Research in the Age of AI</a></h3>
        <p>${de
          ? "Empfehlungen zu Forschungsbewertung, Publikationsformen, offenen Werkzeugen, Formalisierung sowie zur Zusammenarbeit zwischen Wissenschaft und KI-Laboren."
          : "Recommendations on research evaluation, publication formats, open-source tools, formalisation and collaboration between academia and AI labs."}</p>
      </article>
      <article class="resource">
        <h3><a href="https://cmsa.fas.harvard.edu/media/2026/09/Summit-on-PhD-Math-Education-in-the-Age-of-AI.pdf" target="_blank" rel="noopener">Report of Summit on PhD Math Education in the Age of AI</a></h3>
        <p>${de
          ? "Empfehlungen zur Weiterentwicklung mathematischer Promotionsprogramme, darunter Kommunikation, Betreuung, Leistungsbewertung und ein reflektierter Umgang mit KI-Werkzeugen."
          : "Recommendations for adapting mathematics PhD programmes, including communication, advising, assessment and the considered use of AI tools."}</p>
      </article>`;
  const declarationsHeading = de
    ? /(<h2>Erklärungen &amp; Positionen<\/h2>\s*<div class="resources">)/
    : /(<h2>Declarations &amp; positions<\/h2>\s*<div class="resources">)/;
  const html = resources[lang]
    .replace(
      /<section>\s*<h2>(?:Past events|Vergangene Veranstaltungen)<\/h2>[\s\S]*?<\/section>\s*/,
      "",
    )
    .replace(declarationsHeading, `$1${summitReports}`);
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
      <div className="original-seminar links-original" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
