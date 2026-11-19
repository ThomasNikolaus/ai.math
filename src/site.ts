import type { Lang, View } from "./types";
import { siteNames } from "./metadata.mjs";

export const siteTitle: Record<Lang, string> = siteNames;
export const navigation: View[] = [
  "home",
  "papers",
  "teaching",
  "horizons",
  "resources",
];
export const titles: Record<Lang, Record<View, string>> = {
  de: {
    home: "Startseite",
    papers: "Forschung",
    teaching: "Lehre",
    resources: "Materialien & Veranstaltungen",
    horizons: "Horizonte für souveräne KI",
    imprint: "Impressum",
    privacy: "Datenschutz",
  },
  en: {
    home: "Home",
    papers: "Research",
    teaching: "Education",
    resources: "Resources & Events",
    horizons: "Horizons for Sovereign AI",
    imprint: "Legal notice",
    privacy: "Privacy",
  },
};
export const navigationLabels: Record<Lang, Record<View, string>> = {
  de: { ...titles.de, horizons: "Infrastruktur" },
  en: { ...titles.en, horizons: "Infrastructure" },
};
export const initiators = [
  { name: "Claudia Alfes", homepage: "https://www.claudia-alfes.de/" },
  { name: "Thomas Nikolaus", homepage: "https://thomasnikolaus.de/" },
  { name: "Andreas Thom", homepage: "https://andreasthom.github.io" },
];
export const seminarUrl = "https://www.uni-muenster.de/MathematicsMuenster/ai-math/";
export const matrixSpaceUrl = "https://matrix.to/#/#mathematik-und-ki:tu-dresden.de";
