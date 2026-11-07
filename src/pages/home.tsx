import { ArrowRight, CalendarDays, BookOpen } from "lucide-react";
import { PageHeading } from "../components/PageHeading";
import { useSiteLink } from "../components/Layout";
import { siteTitle, initiators, seminarUrl, matrixSpaceUrl } from "../site";
import type { Lang } from "../types";
import landingText from "../content/home.json";

export function Landing({ lang }: { lang: Lang }) {
  const link = useSiteLink();
  const de = lang === "de";
  return (
    <>
      <PageHeading
        eyebrow={
          de
            ? "Eine Initiative zu KI und Mathematik"
            : "An initiative on AI and mathematics"
        }
        title={siteTitle[lang]}
        subtitle={<>AI<span className="brand-dot">.</span>MATH</>}
        description={de
          ? "Die AI.MATH-Initiative formuliert Positionen zum Umgang mit KI in der mathematischen Forschung und im Mathematikstudium und bündelt weiterführende Materialien und Veranstaltungen."
          : "The AI.MATH initiative develops positions on the use of AI in mathematical research and mathematics degree programmes and brings together related resources and events."}
      />
      <div className="discussion-paths landing-paths">
        <a href={link(lang, "papers")}>
          <BookOpen size={20} />
          <span>
            <strong>{de ? "Forschung" : "Research"}</strong>
            <small>
              {de
                ? "Positionspapier zur mathematischen Forschung"
                : "Position paper on mathematical research"}
            </small>
          </span>
          <ArrowRight size={17} />
        </a>
        <a href={link(lang, "teaching")}>
          <BookOpen size={20} />
          <span>
            <strong>{de ? "Studium" : "Degree programmes"}</strong>
            <small>
              {de
                ? "Positionspapier zum Mathematikstudium"
                : "Position paper on mathematics degree programmes"}
            </small>
          </span>
          <ArrowRight size={17} />
        </a>
        <a href={link(lang, "resources")}>
          <CalendarDays size={20} />
          <span>
            <strong>{de ? "Materialien & Veranstaltungen" : "Resources & Events"}</strong>
            <small>
              {de
                ? "Vorträge, Diskussionen und weiterführende Materialien"
                : "Talks, discussions and further resources"}
            </small>
          </span>
          <ArrowRight size={17} />
        </a>
      </div>
      <div className="landing-prose prose">
        <p>
          {de
            ? "Die mathematische Gemeinschaft erlebt durch KI einen tiefgreifenden Wandel. Deshalb müssen die in den Positionspapieren formulierten Grundsätze regelmäßig überprüft und anhand neuer Erfahrungen weiterentwickelt werden. Kommentare, Referenzen und Berichte über einschlägige Erfahrungen sind willkommen. Austausch ist im "
            : "AI is bringing profound change to the mathematical community. The principles formulated in the position papers must therefore be reviewed regularly and developed further based on new experiences. We welcome comments, references, and reports of relevant experiences. You can join the discussion in the "}
          <a href={matrixSpaceUrl} target="_blank" rel="noopener noreferrer">
            {de ? "Matrix-Space „Mathematik und KI“" : "“Mathematik und KI” Matrix space"}
          </a>
          {de ? " sowie im Online-Seminar " : " and at the online seminar "}
          <a href={seminarUrl} target="_blank" rel="noopener noreferrer">
            AI and the Future of Mathematics
          </a>
          {de
            ? " möglich, das Vorträge mit anschließenden Diskussionen verbindet."
            : ", which combines talks with follow-up discussions."}
        </p>
      </div>
      <article className="landing-prose landing-background prose" aria-labelledby="initiative-background-title">
        <h2 id="initiative-background-title">{de ? "Warum diese Initiative?" : "Why this initiative?"}</h2>
        {landingText[lang].map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </article>
      <p className="discussion-byline" id="people">
        {de ? "Eine Initiative von " : "An initiative by "}
        {initiators.map((p, i) => (
          <span key={p.name}>
            {i > 0 && " · "}
            <a href={p.homepage} target="_blank" rel="noopener noreferrer">
              {p.name}
            </a>
          </span>
        ))}
      </p>
    </>
  );
}
