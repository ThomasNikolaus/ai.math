import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { Lang } from "../types";

export function PaperIndex({
  lang,
  label,
  children,
}: {
  lang: Lang;
  label: string;
  children: ReactNode;
}) {
  const title = lang === "de" ? "Inhaltsverzeichnis" : "Contents";
  return (
    <>
      <aside className="paper-index" aria-label={title}>
        <p className="eyebrow">{label}</p>
        {children}
      </aside>
      <details className="paper-index-mobile">
        <summary>
          {title}
          <ChevronDown size={18} aria-hidden="true" />
        </summary>
        <nav aria-label={title}>{children}</nav>
      </details>
    </>
  );
}
