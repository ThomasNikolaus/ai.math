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
    "Den Wandel gemeinsam gestalten": "KI und Mathematik",
    "Shaping change together": "AI and Mathematics",
    "Grundsätze für die Forschung": "KI in der mathematischen Forschung",
    "Principles for Research": "AI in Mathematical Research",
    "Diskussionen in der Community": "Diskussion",
    "Community Discussions": "Discussion",
  };
  const heading = typeof subtitle === "string" ? headings[subtitle] || subtitle : subtitle;
  return (
    <section className="page-heading">
      <h1>{heading || title}</h1>
      {description && <p>{description}</p>}
    </section>
  );
}
