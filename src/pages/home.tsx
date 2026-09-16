import { ArrowRight, MessageSquare, BookOpen, CircleHelp } from "lucide-react";
import { PageHeading } from "../components/PageHeading";
import { useSiteLink } from "../components/Layout";
import { siteTitle, initiators } from "../site";
import type { Lang } from "../types";
import landingText from "../content/home.json";
import { seminarUrl, matrixSpaceUrl } from "../site";

export function Landing({ lang }: { lang: Lang }) {
  const link = useSiteLink();
  const de = lang === "de";
  return (
    <>
      <PageHeading
        eyebrow={
          de
            ? "Eine Initiative für den gemeinsamen Austausch"
            : "An initiative for shared discussion"
        }
        title={siteTitle[lang]}
        subtitle={de ? "Den Wandel gemeinsam gestalten" : "Shaping change together"}
      />
      <article className="landing-prose prose">
        {landingText[lang].map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <p>
          {de
            ? "Welche Grundsätze überzeugen euch, wo widersprecht ihr und was fehlt? Teilt eure Gedanken auf den Diskussionsboards dieser Website. Ihr könnt euch auch im "
            : "Which principles do you find convincing, where do you disagree, and what is missing? Share your thoughts on this website’s discussion boards. You can also exchange ideas in the "}
          <a href={matrixSpaceUrl} target="_blank" rel="noopener noreferrer">
            {de ? "Matrix-Space „Mathematik und KI“" : "“Mathematik und KI” Matrix space"}
          </a>
          {de ? " und im Online-Seminar " : " and at the online seminar "}
          <a href={seminarUrl} target="_blank" rel="noopener noreferrer">
            AI and the Future of Mathematics
          </a>
          {de
            ? " mit Vorträgen und anschließenden Diskussionen austauschen. Wir werten eure Beiträge aus, überarbeiten die Papiere und machen Änderungen sowie offene Streitpunkte sichtbar."
            : ", which features talks and follow-up discussions. We review your contributions, revise the papers, and make changes and unresolved points of disagreement visible."}
        </p>
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
            <strong>{de ? "Lehre" : "Education"}</strong>
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
              {de ? "30 Fragen und mögliche Antworten" : "30 questions and possible answers"}
            </small>
          </span>
          <ArrowRight size={17} />
        </a>
        <a href={link(lang, "experiences")}>
          <MessageSquare size={20} />
          <span>
            <strong>{de ? "Diskussion" : "Discussion"}</strong>
            <small>
              {de
                ? "Erfahrungen, Hoffnungen und Sorgen teilen"
                : "Share experiences, hopes and concerns"}
            </small>
          </span>
          <ArrowRight size={17} />
        </a>
      </div>
    </>
  );
}
