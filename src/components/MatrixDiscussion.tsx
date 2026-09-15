import { matrixSpaceUrl } from "../site";
import type { Lang } from "../types";
import { useSiteLink } from "./Layout";

export function MatrixDiscussion({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const link = useSiteLink();
  return (
    <div className="matrix-discussion">
      <a href={matrixSpaceUrl} target="_blank" rel="noopener noreferrer">
        {de ? "Im Matrix-Space diskutieren" : "Discuss in the Matrix space"} ↗
      </a>
      <details className="matrix-help">
        <summary>{de ? "Hilfe zum Beitritt" : "Help with joining"}</summary>
        <div className="matrix-help-content">
          <ol>
            <li>
              {de ? "Öffne den Space " : "Open the "}
              <a href={matrixSpaceUrl} target="_blank" rel="noopener noreferrer">
                {de ? "„Mathematik und KI“" : "“Mathematik und KI” space"}
              </a>.
            </li>
            <li>
              {de ? "Wähle eine Matrix-App, zum Beispiel " : "Choose a Matrix app, such as "}
              <strong>Element</strong>
              {de
                ? ", und melde dich mit deinem Matrix-Konto an. Falls du noch kein Konto hast, musst du zunächst eines erstellen."
                : ", and sign in with your Matrix account. If you do not have an account yet, you will need to create one first."}
            </li>
            <li>
              {de ? "Klicke auf " : "Click "}
              <strong>{de ? "„Beitreten“" : "“Join”"}</strong>
              {de
                ? ". Anschließend kannst du die einzelnen Diskussionsräume im Space auswählen und ihnen beitreten."
                : ". You can then select and join the individual discussion rooms within the space."}
            </li>
          </ol>
          <p>
            {de
              ? "Falls eine Einladung verlangt wird, wende dich bitte an die "
              : "If an invitation is required, please contact the "}
            <a href={link(lang, "home", "people")}>
              {de ? "Organisatoren" : "organisers"}
            </a>.
          </p>
        </div>
      </details>
    </div>
  );
}
