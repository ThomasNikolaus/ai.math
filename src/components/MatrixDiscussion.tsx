import { matrixSpaceUrl } from "../site";
import type { Lang } from "../types";

export function MatrixDiscussion({ lang }: { lang: Lang }) {
  const de = lang === "de";
  return (
    <div className="matrix-discussion">
      <p className="matrix-invitation">
        {de
          ? "Wir laden dazu ein, Erfahrungen, Hoffnungen und Sorgen im offenen Board zu teilen und die Positionspapiere zu Forschung und Lehre in den jeweiligen Boards zu diskutieren. Ihr könnt auch im "
          : "We invite you to share experiences, hopes and concerns on the open board and to discuss the position papers on research and education on their respective boards. You can also join the discussion in the "}
        <a href={matrixSpaceUrl} target="_blank" rel="noopener noreferrer">
          {de ? "Matrix-Space" : "Matrix space"} ↗
        </a>
        {de ? " mitdiskutieren." : "."}
      </p>
    </div>
  );
}
