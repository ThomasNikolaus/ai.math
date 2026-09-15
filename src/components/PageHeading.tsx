export function PageHeading({
  title,
  subtitle,
  description,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
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
  return (
    <section className="page-heading">
      <h1>{headings[subtitle] || subtitle || title}</h1>
      {description && <p>{description}</p>}
    </section>
  );
}
