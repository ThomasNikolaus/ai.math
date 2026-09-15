import { PageHeading } from "../components/PageHeading";
import { initiators } from "../site";
import type { Lang } from "../types";

// Provider and editorial responsibility confirmed by Thomas Nikolaus.
// Public professional contact details:
// https://www.uni-muenster.de/FB10/Service/show_perspage.shtml?id=1304
export function Imprint({ lang }: { lang: Lang }) {
  const de = lang === "de";
  return (
    <>
      <PageHeading
        eyebrow={de ? "Rechtliche Angaben" : "Legal information"}
        title={de ? "Impressum" : "Legal notice"}
        subtitle={de ? "Impressum" : "Legal notice"}
      />
      <div className="imprint-content">
        <section aria-labelledby="initiative-title">
          <h2 id="initiative-title">{de ? "Gemeinsame Initiative" : "Joint initiative"}</h2>
          <p>
            {initiators.map((person, index) => (
              <span key={person.name}>
                {index > 0 && (index === initiators.length - 1 ? (de ? " und " : " and ") : ", ")}
                <a href={person.homepage} target="_blank" rel="noopener noreferrer">
                  {person.name}
                </a>
              </span>
            ))}
          </p>
        </section>
        <section aria-labelledby="provider-title">
          <h2 id="provider-title">{de ? "Anbieter dieser Website" : "Website provider"}</h2>
          <address>
            Prof. Dr. Thomas Nikolaus<br />
            c/o Universität Münster<br />
            Mathematisches Institut<br />
            Einsteinstraße 62<br />
            48149 Münster<br />
            {de ? "Deutschland" : "Germany"}
          </address>
        </section>
        <section aria-labelledby="contact-title">
          <h2 id="contact-title">{de ? "Kontakt" : "Contact"}</h2>
          <p>
            {de ? "E-Mail: " : "Email: "}
            <a href="mailto:nikolaus@uni-muenster.de">nikolaus@uni-muenster.de</a><br />
            {de ? "Telefon: " : "Telephone: "}
            <a href="tel:+492518333744">+49 251 83-33744</a>
          </p>
        </section>
        <section aria-labelledby="editorial-title">
          <h2 id="editorial-title">
            {de ? "Verantwortlich für den Inhalt" : "Editorial responsibility"}
          </h2>
          <p>
            {de
              ? "Verantwortlich gemäß § 18 Abs. 2 Medienstaatsvertrag (MStV): Prof. Dr. Thomas Nikolaus, Anschrift wie oben."
              : "Responsible for editorial content under section 18(2) of the German Interstate Media Treaty (MStV): Prof. Dr. Thomas Nikolaus, at the address above."}
          </p>
        </section>
      </div>
    </>
  );
}
