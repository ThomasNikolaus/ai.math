import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import { navigation, titles } from "../site";
import { languagePreferenceKey, siteLink } from "../routing.mjs";
import type { Lang, PageRoute, View } from "../types";

type LanguageState = { openQuestions: string[]; boardEnabled: boolean };
const emptyState: LanguageState = { openQuestions: [], boardEnabled: false };
const transferKey = "ai-mathematics-language-transfer";
const RouteContext = createContext<(PageRoute & { languageState: LanguageState }) | null>(null);

export function useLanguageState() {
  return useContext(RouteContext)?.languageState || emptyState;
}

export function useSiteLink() {
  const route = useContext(RouteContext);
  if (!route) throw new Error("Missing page route");
  return (language: Lang, view: View, anchor = "") =>
    siteLink(route.rootPrefix, language, view, anchor);
}

function rememberLanguage(language: Lang) {
  try {
    localStorage.setItem(languagePreferenceKey, language);
  } catch {}
}

export function Layout({ route, children }: { route: PageRoute; children: ReactNode }) {
  const { lang, view, rootPrefix } = route;
  const de = lang === "de";
  const [anchor, setAnchor] = useState("");
  const [languageState, setLanguageState] = useState(emptyState);

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(transferKey) || "null");
      sessionStorage.removeItem(transferKey);
      if (saved?.pathname === location.pathname) setLanguageState(saved.state);
    } catch {}
  }, []);

  function switchLanguage(event: MouseEvent<HTMLAnchorElement>, language: Lang) {
    rememberLanguage(language);
    if (language === lang) {
      event.preventDefault();
      return;
    }
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    try {
      const openQuestions = [
        ...document.querySelectorAll('[data-slot="accordion-trigger"][aria-expanded="true"]'),
      ]
        .map((button) => button.closest('[id^="q-"]')?.id.slice(2))
        .filter(Boolean);
      const boardEnabled = !!document.querySelector(".embed-wrap iframe");
      sessionStorage.setItem(
        transferKey,
        JSON.stringify({
          pathname: new URL(event.currentTarget.href).pathname,
          state: { openQuestions, boardEnabled },
        }),
      );
    } catch {}
  }
  const link = (language: Lang, page: View, fragment = "") =>
    siteLink(rootPrefix, language, page, fragment);

  useEffect(() => {
    const read = () => {
      let fragment = location.hash.slice(1);
      try {
        fragment = decodeURIComponent(fragment);
      } catch {}
      setAnchor(fragment);
      if (fragment)
        requestAnimationFrame(() =>
          document.getElementById(fragment)?.scrollIntoView({ behavior: "instant" }),
        );
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  return (
    <RouteContext.Provider value={{ ...route, languageState }}>
      <div className={"site-shell view-" + view}>
        <a
          className="skip-link"
          href="#main"
          onClick={(event) => {
            event.preventDefault();
            document.getElementById("main")?.focus();
            document.getElementById("main")?.scrollIntoView();
          }}
        >
          {de ? "Zum Inhalt springen" : "Skip to content"}
        </a>
        <nav className="section-nav" aria-label={de ? "Hauptnavigation" : "Main navigation"}>
          {navigation.map((page) => (
            <a href={link(lang, page)} key={page} aria-current={view === page ? "page" : undefined}>
              {titles[lang][page]}
            </a>
          ))}
          <div className="global-language" aria-label={de ? "Sprache wählen" : "Choose language"}>
            {(["en", "de"] as Lang[]).map((language) => (
              <a
                key={language}
                href={link(language, view, anchor)}
                onClick={(event) => switchLanguage(event, language)}
                lang={language}
                hrefLang={language}
                aria-current={lang === language ? "true" : undefined}
              >
                {language === "de" ? "Deutsch" : "English"}
              </a>
            ))}
          </div>
        </nav>
        <main id="main" tabIndex={-1} lang={lang}>
          {children}
        </main>
      </div>
    </RouteContext.Provider>
  );
}
