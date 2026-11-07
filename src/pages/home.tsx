import { ArrowRight, CalendarDays, BookOpen, CircleHelp } from "lucide-react";
import { PageHeading } from "../components/PageHeading";
import { useSiteLink } from "../components/Layout";
import { siteTitle, initiators } from "../site";
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
          ? "Mit der AI.MATH-Initiative stellen wir Positionsentwürfe zur Zukunft mathematischer Forschung und des Mathematikstudiums in Zeiten von KI sowie Fragen, Perspektiven und weiterführende Materialien vor."
          : "With the AI.MATH initiative, we put forward draft positions on the future of mathematical research and mathematics degree programmes in the age of AI, alongside questions, perspectives and further resources."}
      />
      <div
        className="discussion-paths landing-paths"
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,400px),1fr))" }}
      >
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
        <a href={link(lang, "questions")}>
          <CircleHelp size={20} />
          <span>
            <strong>{de ? "Fragen & Perspektiven" : "Questions & Perspectives"}</strong>
            <small>
              {de ? "36 Fragen und mögliche Antworten" : "36 questions and possible answers"}
            </small>
          </span>
          <ArrowRight size={17} />
        </a>
        <a href={link(lang, "resources")}>
          <CalendarDays size={20} />
          <span>
            <strong>{de ? "Seminar & Veranstaltungen" : "Seminar & Events"}</strong>
            <small>
              {de
                ? "Vorträge, Diskussionen und weiterführende Materialien"
                : "Talks, discussions and further resources"}
            </small>
          </span>
          <ArrowRight size={17} />
        </a>
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
