import type { Lang, View } from "./types";
import { siteNames } from "./metadata.mjs";

export const siteTitle: Record<Lang, string> = siteNames;
export const navigation: View[] = [
  "home",
  "papers",
  "teaching",
  "questions",
  "resources",
];
export const titles: Record<Lang, Record<View, string>> = {
  de: {
    home: "Startseite",
    papers: "Forschung",
    teaching: "Lehre",
    questions: "Fragen & Perspektiven",
    resources: "Materialien & Veranstaltungen",
    imprint: "Impressum",
    privacy: "Datenschutz",
  },
  en: {
    home: "Home",
    papers: "Research",
    teaching: "Education",
    questions: "Questions & Perspectives",
    resources: "Resources & Events",
    imprint: "Legal notice",
    privacy: "Privacy",
  },
};
export const initiators = [
  { name: "Claudia Alfes", homepage: "https://www.claudia-alfes.de/" },
  { name: "Thomas Nikolaus", homepage: "https://thomasnikolaus.de/" },
  { name: "Andreas Thom", homepage: "https://andreasthom.github.io" },
];
export const seminarUrl = "https://www.uni-muenster.de/MathematicsMuenster/ai-math/";
export const matrixSpaceUrl = "https://matrix.to/#/#mathematik-und-ki:tu-dresden.de";
