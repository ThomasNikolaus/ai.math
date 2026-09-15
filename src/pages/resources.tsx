// Reviewed local HTML for the resource list; never visitor-supplied content.
import type { Lang } from "../types";
import resources from "../content/resources.json";
import { seminarUrl } from "../site";

export function Resources({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const html = resources[lang];
  return (
    <>
      <h1 className="screenreader-heading">{de ? "Links & Veranstaltungen" : "Links & Events"}</h1>
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
