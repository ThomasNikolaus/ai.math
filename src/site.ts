import type { Lang, View } from "./types";

export const siteTitle: Record<Lang, string> = {
  de: "KI und Mathematik",
  en: "AI and Mathematics",
};
export const navigation: View[] = [
  "home",
  "papers",
  "teaching",
  "questions",
  "experiences",
  "resources",
];
export const titles: Record<Lang, Record<View, string>> = {
  de: {
    home: "Startseite",
    papers: "Forschung",
    teaching: "Lehre",
    questions: "Fragen & Perspektiven",
    experiences: "Diskussion",
    resources: "Links & Veranstaltungen",
    imprint: "Impressum",
    privacy: "Datenschutz",
  },
  en: {
    home: "Home",
    papers: "Research",
    teaching: "Education",
    questions: "Questions & Perspectives",
    experiences: "Discussion",
    resources: "Links & Events",
    imprint: "Legal notice",
    privacy: "Privacy",
  },
};
export const initiators = [
  { name: "Claudia Alfes", homepage: "https://www.claudia-alfes.de/" },
  { name: "Thomas Nikolaus", homepage: "https://www.uni-muenster.de/FB10/u/nikolaus" },
  { name: "Andreas Thom", homepage: "https://andreasthom.github.io" },
];
export const seminarUrl = "https://www.uni-muenster.de/MathematicsMuenster/ai-math/";
export const matrixSpaceUrl = "https://matrix.to/#/#mathematik-und-ki:tu-dresden.de";
export const boards: Record<string, { padletId: string; url: string }> = {
  experiences: {
    padletId: "s023jth93wq743uuwaje",
    url: "https://padlet.com/andreasbthom/mathe-und-ki-diskussion-s023jth93wq743uuwaje",
  },
  papers: {
    padletId: "s023jvaws0orn8tvtidh",
    url: "https://padlet.com/andreasbthom/mathe-und-ki-forschung-s023jvaws0orn8tvtidh",
  },
  teaching: {
    padletId: "s023jvbpjr1n139eny8v",
    url: "https://padlet.com/andreasbthom/mathe-und-ki-lehre-s023jvbpjr1n139eny8v",
  },
};
