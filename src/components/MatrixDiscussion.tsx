import { matrixSpaceUrl } from "../site";
import type { Lang } from "../types";

export function MatrixDiscussion({ lang }: { lang: Lang }) {
  const de = lang === "de";
  return (
    <section className="matrix-discussion" aria-labelledby="comments-title">
      <h2 id="comments-title">{de ? "Kommentare und Hinweise" : "Comments and suggestions"}</h2>
      <p className="matrix-invitation">
        {de
          ? "Dieses Positionspapier ist ein Arbeitsdokument. Kommentare, Referenzen und Berichte über einschlägige Erfahrungen sind willkommen. Austausch ist im "
          : "This position paper is a working document. Comments, references and accounts of relevant experiences are welcome. You can join the conversation in the "}
        <a href={matrixSpaceUrl} target="_blank" rel="noopener noreferrer">
          {de ? "Matrix-Space" : "Matrix space"} ↗
        </a>
        {de ? " möglich." : "."}
      </p>
    </section>
  );
}
