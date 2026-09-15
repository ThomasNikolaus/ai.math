import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";
import { PageHeading } from "../components/PageHeading";
import { useSiteLink, useLanguageState } from "../components/Layout";
import { siteTitle, initiators } from "../site";
import type { Lang } from "../types";
import questionGroups from "../content/questions.json";
import perspectiveData from "../content/perspectives.json";
type PerspectiveReference = { id: number; location: string };
type Perspective = {
  label: Record<Lang, string>;
  body: Record<Lang, string>;
  references: PerspectiveReference[];
};
type PerspectiveSource = {
  id: number;
  citation: Record<Lang, string>;
  urls: string[];
  kind: string;
};
const perspectivesByQuestion = perspectiveData.questions as Record<
  string,
  { title: string; perspectives: Perspective[] }
>;
const perspectiveSources = perspectiveData.sources as Record<string, PerspectiveSource>;
const themeLetter = (id: string) =>
  String.fromCharCode(65 + questionGroups.findIndex((g) => g.id === id));
const questionLabel = (id: number) => {
  const group = questionGroups.find((g) => g.questions.some((q) => q.id === id));
  return group
    ? themeLetter(group.id) + (group.questions.findIndex((q) => q.id === id) + 1)
    : String(id);
};

function SourceReference({ reference, lang }: { reference: PerspectiveReference; lang: Lang }) {
  const link = useSiteLink();
  const source = perspectiveSources[String(reference.id)];
  const de = lang === "de";
  const href =
    source.kind === "internal"
      ? link(lang, "papers", "principle-" + (reference.location.includes("G4") ? "6" : "5"))
      : source.urls[0];
  return (
    <li className="perspective-reference">
      {href ? (
        <a
          href={href}
          target={source.kind === "public" ? "_blank" : undefined}
          rel={source.kind === "public" ? "noopener noreferrer" : undefined}
        >
          [{source.id}] {source.citation[lang]}
          {source.kind === "public" && <ArrowUpRight size={12} />}
        </a>
      ) : (
        <span>
          [{source.id}] {source.citation[lang]}
        </span>
      )}
      <span className="reference-location">
        {de ? "Fundstelle" : "Locator as given in the German collection"}: {reference.location}
      </span>
      {source.kind === "provided" && (
        <span className="source-availability">
          {de
            ? "Bereitgestellter Beitrag · kein öffentlicher Link in der Sammlung"
            : "Provided contribution · no public link in the collection"}
        </span>
      )}
    </li>
  );
}

export function Questions({ lang }: { lang: Lang }) {
  const transferred = useLanguageState();
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);
  useEffect(() => setOpenQuestions(transferred.openQuestions), [transferred]);
  const link = useSiteLink();
  const de = lang === "de";
  return (
    <>
      <PageHeading
        eyebrow={
          de
            ? "Offene Fragen · verschiedene Perspektiven"
            : "Open questions · different perspectives"
        }
        title={siteTitle[lang]}
        subtitle={de ? "30 Fragen und mögliche Antworten" : "30 Questions and Possible Answers"}
        description={
          de
            ? "Hier sammeln wir wichtige Fragen und unterschiedliche Perspektiven für die mathematische Gemeinschaft."
            : "Here we collect important questions and different perspectives for the mathematical community."
        }
      />
      <div className="paper-byline question-authorship">
        <span>
          {de ? "Autoren der Fragen: " : "Authors of the questions: "}
          {initiators.map((person, i) => (
            <span key={person.name}>
              {i > 0 && " · "}
              <a href={person.homepage} target="_blank" rel="noopener noreferrer">
                {person.name}
              </a>
            </span>
          ))}
        </span>
        <p>
          {de
            ? "Die möglichen Antworten wurden von Astra (KI) auf Basis der von den Autoren der Fragen ausgewählten Quellen zusammengetragen und zusammengefasst. Die dargestellten Perspektiven geben nicht notwendigerweise die Positionen der Autoren dieser Seite wieder. Die Zusammenfassungen können Positionen verkürzt darstellen; die genauen Positionen sind in den verlinkten Originalquellen nachzulesen."
            : "The possible answers were compiled and summarised by Astra (AI), using sources selected by the authors of the questions. The perspectives presented do not necessarily reflect the views of the authors of this site. The summaries may omit nuances; please consult the linked original sources for the precise positions."}
        </p>
      </div>
      <p className="version-date">
        {de ? "Stand: " : "Last updated: "}
        <time dateTime="2026-09-14">{de ? "14. September 2026" : "14 September 2026"}</time>
      </p>
      <div className="question-reading-hint">
        <span>{de ? "30 Fragen · 133 Antwortansätze" : "30 questions · 133 perspectives"}</span>
        <span>
          {de
            ? "Eine Frage öffnen, um die Perspektiven zu lesen."
            : "Open a question to read its perspectives."}
        </span>
      </div>
      <div className="questions-layout">
        <aside className="theme-index">
          <p className="eyebrow">{de ? "Themen" : "Themes"}</p>
          {questionGroups.map((g) => (
            <a key={g.id} href={link(lang, "questions", g.id)}>
              {themeLetter(g.id)}
              {": "}
              {g.title[lang]}
              <span>{g.questions.length}</span>
            </a>
          ))}
        </aside>
        <div>
          {questionGroups.map((g) => (
            <section className="question-group" id={g.id} key={g.id}>
              <h2>
                {themeLetter(g.id)}
                {": "}
                {g.title[lang]}
              </h2>
              <Accordion
                multiple
                className="question-accordion"
                value={openQuestions.filter((id) => g.questions.some((q) => String(q.id) === id))}
                onValueChange={(values) =>
                  setOpenQuestions((previous) => [
                    ...previous.filter((id) => !g.questions.some((q) => String(q.id) === id)),
                    ...values,
                  ])
                }
              >
                {g.questions.map((q) => {
                  const entries = perspectivesByQuestion[String(q.id)].perspectives;
                  return (
                    <AccordionItem key={q.id} value={String(q.id)} id={"q-" + q.id}>
                      <AccordionTrigger className="question-trigger">
                        <span className="question-number">{questionLabel(q.id)}</span>
                        <span className="question-title">
                          {q.text[lang]}
                          <span className="perspective-count">
                            {entries.length} {de ? "Antwortansätze" : "perspectives"}
                          </span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="question-answer-content">
                        <div className="perspectives-list">
                          {entries.map((entry, i) => (
                            <article className="perspective" key={q.id + "-" + i}>
                              <h4>{entry.label[lang]}</h4>
                              <p>{entry.body[lang]}</p>
                              <ol
                                className="perspective-references"
                                aria-label={de ? "Quellen" : "Sources"}
                              >
                                {entry.references.map((reference, j) => (
                                  <SourceReference
                                    key={reference.id + "-" + j}
                                    reference={reference}
                                    lang={lang}
                                  />
                                ))}
                              </ol>
                            </article>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
