import type { ReactNode } from "react";

export function PageHeading({
  title,
  subtitle,
  description,
}: {
  eyebrow: string;
  title: string;
  subtitle: ReactNode;
  description?: string;
}) {
  const headings: Record<string, string> = {
    "Grundsätze für die Forschung": "KI in der mathematischen Forschung",
    "Principles for Research": "AI in Mathematical Research",
  };
  const heading = typeof subtitle === "string" ? headings[subtitle] || subtitle : subtitle;
  return (
    <section className="page-heading">
      <h1>{heading || title}</h1>
      {description && <p>{description}</p>}
    </section>
  );
}
