import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguageState, useSiteLink } from "./Layout";
import { boards } from "../site";
import type { Lang } from "../types";
import { MatrixDiscussion } from "./MatrixDiscussion";

export function Board({ kind, lang }: { kind: keyof typeof boards; lang: Lang }) {
  const link = useSiteLink();
  const [enabled, setEnabled] = useState(false);
  const transferred = useLanguageState();
  useEffect(() => {
    if (transferred.boardEnabled) setEnabled(true);
  }, [transferred]);
  const de = lang === "de";
  const config = boards[kind];
  const id = config?.padletId;
  const validId = !!id && /^[a-zA-Z0-9_-]+$/.test(id);
  const name =
    kind === "papers" || kind === "teaching"
      ? de
        ? "Das Positionspapier diskutieren"
        : "Discuss the position paper"
      : kind === "questions"
        ? de
          ? "Fragen gemeinsam weiterdenken"
          : "Take the questions further"
        : de
          ? "Raum für eure Erfahrungen"
          : "A space for your experiences";
  return (
    <section className="board-section" id="board">
      <div className="board-heading">
        <h2>
          {kind === "experiences"
            ? de
              ? "Wie geht es dir damit?"
              : "How are you feeling about it?"
            : de
              ? "Zum Positionspapier diskutieren"
              : "Discuss the position paper"}
        </h2>
      </div>
      <p className="board-intro">
        {kind === "experiences"
          ? de
            ? "Hoffnungen, Unsicherheiten und Erfahrungen dürfen nebeneinander stehen."
            : "Hopes, uncertainties and experiences can sit alongside each other."
          : de
            ? "Ergänzt eine Perspektive, stellt eine Rückfrage oder teilt eine hilfreiche Referenz. Beiträge können auf Deutsch oder Englisch verfasst werden."
            : "Add a perspective, ask a follow-up question or share a useful reference. Contributions can be in German or English."}
      </p>
      {(kind === "papers" || kind === "teaching") && <MatrixDiscussion lang={lang} />}
      {validId && enabled ? (
        <div className="embed-wrap">
          <iframe
            title={
              kind === "experiences" ? (de ? "Mathematik und KI" : "Mathematics and AI") : name
            }
            style={{ width: "100%", height: "80vh", minHeight: 500, border: 0 }}
            allowFullScreen
            src={"https://padlet.com/embed/" + id}
            loading="lazy"
            referrerPolicy="no-referrer"
            allow="clipboard-write"
          />
          <p>
            <a
              href={config?.url || "https://padlet.com/" + id}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              {de ? "Board separat öffnen" : "Open board separately"}
              <ArrowUpRight size={15} />
            </a>
          </p>
        </div>
      ) : (
        <div
          className="padlet-gate"
          style={{ padding: "24px", border: "1px solid #dfe4eb", background: "#faf8f9" }}
        >
          <h3 style={{ fontFamily: "inherit", fontSize: 18, margin: "0 0 12px" }}>
            {de ? "Diskussionsboard auf Padlet" : "Discussion board on Padlet"}
          </h3>
          <p>
            {de
              ? "Beim Laden des Boards wird eine Verbindung zu Padlet hergestellt und es können personenbezogene Daten an Padlet übermittelt werden."
              : "Loading the board establishes a connection to Padlet and may transmit personal data to Padlet."}
            {" "}
            <a href={link(lang, "privacy", "padlet")} className="text-link">
              {de ? "Datenschutzhinweise" : "Privacy information"}
            </a>
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 20,
              marginTop: 18,
            }}
          >
            <Button className="action-button" onClick={() => setEnabled(true)}>
              {de ? "Diskussionsboard öffnen" : "Open discussion board"}
            </Button>
            <a
              href={config?.url || "https://padlet.com/" + id}
              target="_blank"
              rel="noopener noreferrer"
            >
              {de ? "Board direkt auf Padlet öffnen" : "Open board directly on Padlet"} ↗
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

// Static, reviewed copy of the user-supplied seminar page; never visitor-supplied HTML.
