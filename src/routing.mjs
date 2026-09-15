// Paths are relative to the website's root, not to the domain's root.
// The same generated files therefore work at /ai.math/ and on a custom domain.
export const paths = {
  de: {
    home: "de/",
    papers: "de/forschung/",
    teaching: "de/lehre/",
    questions: "de/fragen/",
    experiences: "de/diskussion/",
    resources: "de/links/",
  },
  en: {
    home: "en/",
    papers: "en/research/",
    teaching: "en/education/",
    questions: "en/questions/",
    experiences: "en/discussion/",
    resources: "en/resources/",
  },
};
export const languagePreferenceKey = "ai-mathematics-language";

export function resolveLanguage(explicit, stored, browserLanguage) {
  if (explicit === "de" || explicit === "en") return explicit;
  if (stored === "de" || stored === "en") return stored;
  return /^de(?:-|$)/i.test(browserLanguage || "") ? "de" : "en";
}

export function rootPrefixFor(path) {
  return "../".repeat(path.split("/").filter(Boolean).length) || "./";
}

export function siteLink(rootPrefix, language, view, anchor = "") {
  return rootPrefix + paths[language][view] + (anchor ? "#" + encodeURIComponent(anchor) : "");
}

// Preserve links shared before the move from #/de/papers to real HTML pages.
export function legacyDestination(hash, fallbackLanguage) {
  if (!/^#\//.test(hash)) return null;
  const [rawLanguage, rawView, rawAnchor] = hash.replace(/^#\//, "").split("/");
  const language = resolveLanguage(rawLanguage, fallbackLanguage, "en");
  let view = rawView;
  if (view === "research") view = "papers";
  if (view === "overview") view = rawAnchor === "people" ? "experiences" : "home";
  if (!Object.hasOwn(paths[language], view)) view = "home";
  return paths[language][view] + (rawAnchor ? "#" + rawAnchor : "");
}
