import { languagePreferenceKey, resolveLanguage, legacyDestination, paths } from "./routing.mjs";

// This small script runs in the head before the root landing page is painted.
// Explicit page URLs always take precedence over a saved language preference.
const root = document.documentElement;
let stored;
try {
  stored = localStorage.getItem(languagePreferenceKey);
} catch {}
const language = resolveLanguage(undefined, stored, navigator.languages?.[0] || navigator.language);
const legacy = legacyDestination(location.hash, language);
const destination =
  legacy || (root.dataset.entry === "true" ? paths[language].home + location.hash : null);
if (destination) {
  const siteRoot = new URL(root.dataset.root || "./", location.href);
  const target = new URL(destination, siteRoot);
  target.search = location.search;
  location.replace(target.href);
}
