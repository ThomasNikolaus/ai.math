import { PageHeading } from "../components/PageHeading";
import type { Lang } from "../types";

const githubPrivacy = "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement";
const githubPages = "https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection";
const padletPrivacy = "https://legal.padlet.com/privacy";

export function Privacy({ lang }: { lang: Lang }) {
  const de = lang === "de";
  return (
    <>
      <PageHeading
        eyebrow={de ? "Rechtliche Angaben" : "Legal information"}
        title={de ? "Datenschutz" : "Privacy"}
        subtitle={de ? "Datenschutzhinweise" : "Privacy information"}
      />
      <div className="imprint-content">
        <p className="version-date">
          {de ? "Stand: " : "Last updated: "}
          <time dateTime="2026-09-15">{de ? "15. September 2026" : "15 September 2026"}</time>
        </p>
        <section aria-labelledby="controller-title">
          <h2 id="controller-title">{de ? "Verantwortlicher und Kontakt" : "Controller and contact"}</h2>
          <address>
            Prof. Dr. Thomas Nikolaus<br />
            c/o Universität Münster, Mathematisches Institut<br />
            Einsteinstraße 62, 48149 Münster, {de ? "Deutschland" : "Germany"}<br />
            <a href="mailto:nikolaus@uni-muenster.de">nikolaus@uni-muenster.de</a><br />
            <a href="tel:+492518333744">+49 251 83-33744</a>
          </address>
          <p>{de
            ? "Diese Hinweise beschreiben die Verarbeitung personenbezogener Daten beim Besuch dieser Website und bei der Nutzung ihrer Diskussionsangebote."
            : "This notice explains how personal data is processed when you visit this website and use its discussion features."}</p>
        </section>
        <section aria-labelledby="hosting-title">
          <h2 id="hosting-title">{de ? "Bereitstellung der Website" : "Website hosting"}</h2>
          <p>{de
            ? "Die Website wird über GitHub Pages bereitgestellt. Beim Abruf erhält GitHub technische Verbindungsdaten, insbesondere eure IP-Adresse. GitHub speichert IP-Adressen von Besucher:innen zu Sicherheitszwecken, auch ohne GitHub-Konto."
            : "The website is hosted on GitHub Pages. Requests transmit technical connection data to GitHub, including your IP address. GitHub logs visitors’ IP addresses for security purposes, including visits without a GitHub account."}{" "}
            <a href={githubPages}>{de ? "Informationen von GitHub Pages" : "GitHub Pages information"}</a>.
          </p>
          <p>{de
            ? "Unsere Rechtsgrundlage ist Art. 6 Abs. 1 Buchst. f DSGVO: unser berechtigtes Interesse an einer zuverlässigen und sicheren Bereitstellung dieses Informations- und Diskussionsangebots. Ohne die Übermittlung der Verbindungsdaten kann die Website nicht ausgeliefert werden. Wir führen keine eigene personenbezogene Besuchsstatistik."
            : "Our legal basis is Article 6(1)(f) GDPR: our legitimate interest in reliably and securely providing this information and discussion website. Delivering the website requires transmission of connection data. We do not maintain our own visitor statistics containing personal data."}</p>
          <p>{de
            ? "GitHub nennt für die Besucherprotokolle von GitHub Pages keine feste Löschfrist. Nach seiner Datenschutzerklärung richtet sich die Speicherdauer nach Verarbeitungszwecken und rechtlichen Anforderungen. Anbieter sind GitHub, Inc. (USA) und GitHub B.V. (Niederlande)."
            : "GitHub does not specify a fixed deletion period for GitHub Pages visitor logs. Its privacy statement relates retention to processing purposes and legal requirements. The providers are GitHub, Inc. (USA) and GitHub B.V. (Netherlands)."}{" "}
            <a href={githubPrivacy}>{de ? "Datenschutzerklärung von GitHub" : "GitHub privacy statement"}</a>.
          </p>
        </section>
        <section aria-labelledby="preferences-title">
          <h2 id="preferences-title">{de ? "Einstellungen im Browser" : "Browser preferences"}</h2>
          <p>{de
            ? "Wenn ihr Deutsch oder Englisch auswählt, speichern wir diese Wahl lokal in eurem Browser, damit die Startseite künftig in dieser Sprache erscheint. Die Einstellung bleibt bis zum Löschen der Websitedaten im Browser erhalten. Beim Sprachwechsel werden außerdem kurzzeitig die geöffneten Fragen und die Aktivierung eines Diskussionsboards gespeichert und auf die andere Sprachfassung übertragen. Diese Übergabedaten werden nach dem Auslesen gelöscht, andernfalls mit dem Ende der Browsersitzung."
            : "When you select German or English, we save that preference locally in your browser so that future visits to the home page use your chosen language. It remains until you delete the website’s browser data. When switching languages, open questions and the activation of a discussion board are also saved temporarily and transferred to the other language version. These transfer data are deleted when read, or otherwise when the browser session ends."}</p>
          <p>{de
            ? "Diese Einstellungen werden von unserem Seitencode nicht an einen Server übermittelt. Die Speicherung dient den von euch gewählten Funktionen (§ 25 Abs. 2 Nr. 2 TDDDG); soweit personenbezogene Daten betroffen sind, beruht sie auf Art. 6 Abs. 1 Buchst. f DSGVO und unserem Interesse an einer nutzerfreundlichen Sprachwahl. Ihr könnt die gespeicherten Einstellungen über die Websitedaten eures Browsers löschen. Auf unseren Seiten sind keine Analyse- oder Werbeskripte eingebaut."
            : "Our page code does not transmit these preferences to a server. Storage supports the functions you select (section 25(2), no. 2 TDDDG). To the extent personal data is involved, it relies on Article 6(1)(f) GDPR and our interest in providing a convenient language choice. You can remove the preferences by clearing this website’s browser data. We do not include analytics or advertising scripts in our pages."}</p>
        </section>
        <section id="padlet" aria-labelledby="padlet-title">
          <h2 id="padlet-title">{de ? "Diskussionen auf Padlet" : "Discussions on Padlet"}</h2>
          <p>{de
            ? "Diskussionsboards werden erst eingebettet, wenn ihr „Diskussionsboard öffnen“ auswählt. Mit diesem Klick willigt ihr in die Verbindung zu Padlet ein (Art. 6 Abs. 1 Buchst. a DSGVO; für erforderliche Einwilligungen in Zugriffe auf euer Endgerät zusätzlich § 25 Abs. 1 TDDDG). Die Website selbst lässt sich ohne Padlet nutzen. Ein aktiviertes Board bleibt beim Sprachwechsel aktiviert. Durch erneutes Laden der Seite wird die Einbettung wieder deaktiviert; damit könnt ihr eure Einwilligung für weitere Verbindungen widerrufen. Die Rechtmäßigkeit vorheriger Verarbeitung bleibt unberührt."
            : "Discussion boards are embedded only after you select “Open discussion board”. This click gives consent to connecting to Padlet (Article 6(1)(a) GDPR; section 25(1) TDDDG also applies where consent to access your device is required). You can use this website without Padlet. An activated board stays active when you switch languages. Reloading the page deactivates the embed, allowing you to withdraw consent to further connections. Withdrawal does not affect the lawfulness of earlier processing."}</p>
          <p>{de
            ? "Padlet (Wallwisher, Inc., USA) erhält unter anderem IP-Adresse und Geräteinformationen und kann Cookies verwenden. Laut Padlet werden IP-Adressen höchstens 30 Tage gespeichert. Weitere Daten bleiben nach den in seiner Datenschutzerklärung beschriebenen Zwecken und gesetzlichen Anforderungen gespeichert."
            : "Padlet (Wallwisher, Inc., USA) receives data including IP addresses and device information and may use cookies. Padlet states that it retains IP addresses for no more than 30 days. Other data is retained according to the purposes and legal requirements described in its privacy policy."}{" "}
            <a href={padletPrivacy}>{de ? "Datenschutzerklärung von Padlet" : "Padlet privacy policy"}</a>.
          </p>
          <p>{de
            ? "Freiwillige Beiträge dienen dem fachlichen Austausch und der Weiterentwicklung der Papiere. Sie können von anderen Personen mit Zugang zum Board und dessen Administrator:innen gelesen werden. Bitte veröffentlicht keine vertraulichen Angaben. Für die Bearbeitung oder Löschung eines eigenen Beitrags könnt ihr die Funktionen von Padlet nutzen oder euch an den oben genannten Kontakt wenden. Wir bewahren Beiträge für die laufende Diskussion auf; Löschanfragen prüfen wir unter Berücksichtigung der Rechte anderer Beteiligter und gesetzlicher Pflichten. Rechtsgrundlage für die Moderation und Auswertung ist unser berechtigtes Interesse an dieser fachlichen Diskussion (Art. 6 Abs. 1 Buchst. f DSGVO)."
            : "Voluntary contributions support the discussion and development of the papers. Other people with access to the board and its administrators may read them. Please do not publish confidential information. You can use Padlet’s controls to edit or delete your contribution, or contact us at the address above. We retain contributions for the ongoing discussion and assess deletion requests taking account of other participants’ rights and legal obligations. Moderation and evaluation rely on our legitimate interest in this academic discussion (Article 6(1)(f) GDPR)."}</p>
          <p>{de
            ? "Der Link „Board direkt auf Padlet öffnen“ führt zu einem externen Angebot. Auch dort gelten die Datenschutzhinweise von Padlet."
            : "The “Open board directly on Padlet” link opens an external service, where Padlet’s privacy policy also applies."}</p>
        </section>
        <section aria-labelledby="email-title">
          <h2 id="email-title">{de ? "Kontakt per E-Mail" : "Contact by email"}</h2>
          <p>{de
            ? "Wenn ihr uns schreibt, verarbeiten wir eure E-Mail-Adresse, den Inhalt und gegebenenfalls euren Namen zur Bearbeitung eurer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 Buchst. f DSGVO und unser berechtigtes Interesse, eure Anfrage zu beantworten. Die Korrespondenz wird gelöscht, wenn sie für diesen Zweck nicht mehr benötigt wird und keine gesetzlichen Aufbewahrungspflichten oder berechtigten Gründe für eine weitere Speicherung bestehen."
            : "If you email us, we process your email address, message and, where supplied, your name to handle your enquiry. This relies on Article 6(1)(f) GDPR and our legitimate interest in responding to you. Correspondence is deleted when it is no longer needed for that purpose, unless legal retention duties or legitimate reasons require further retention."}</p>
        </section>
        <section aria-labelledby="transfers-title">
          <h2 id="transfers-title">{de ? "Verarbeitung außerhalb der EU" : "Processing outside the EU"}</h2>
          <p>{de
            ? "Bei GitHub und Padlet kann eine Verarbeitung in den USA stattfinden. Beide Anbieter erklären ihre Teilnahme am EU–US Data Privacy Framework. Angaben zu internationalen Übermittlungen und den dafür eingesetzten Garantien findet ihr in den oben verlinkten Datenschutzerklärungen."
            : "GitHub and Padlet may process data in the USA. Both providers state that they participate in the EU–US Data Privacy Framework. Their privacy statements linked above describe international transfers and the safeguards they use."}</p>
        </section>
        <section aria-labelledby="rights-title">
          <h2 id="rights-title">{de ? "Eure Rechte" : "Your rights"}</h2>
          <p>{de
            ? "Unter den gesetzlichen Voraussetzungen habt ihr Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit (Art. 15–20 DSGVO). Beruht eine Verarbeitung auf eurer Einwilligung, könnt ihr diese jederzeit für die Zukunft widerrufen. Einer Verarbeitung auf Grundlage berechtigter Interessen könnt ihr aus Gründen widersprechen, die sich aus eurer besonderen Situation ergeben (Art. 21 DSGVO). Wendet euch dafür an den oben genannten Kontakt."
            : "Subject to the statutory conditions, you have rights of access, rectification, erasure, restriction and data portability (Articles 15–20 GDPR). You may withdraw consent at any time with effect for the future. You may object to processing based on legitimate interests on grounds relating to your particular situation (Article 21 GDPR). Please use the contact details above to exercise these rights."}</p>
          <p>{de
            ? "Außerdem könnt ihr euch bei einer Datenschutzaufsichtsbehörde beschweren, insbesondere an eurem Aufenthaltsort, Arbeitsplatz oder dem Ort eines vermuteten Verstoßes. In Nordrhein-Westfalen ist dies die "
            : "You may also complain to a data protection supervisory authority, particularly where you live or work or where you suspect an infringement. In North Rhine-Westphalia this is the "}
            <a href="https://www.ldi.nrw.de/">{de ? "Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen" : "State Commissioner for Data Protection and Freedom of Information North Rhine-Westphalia"}</a>.
          </p>
          <p>{de
            ? "Wir treffen auf dieser Website keine automatisierten Entscheidungen mit rechtlicher oder vergleichbar erheblicher Wirkung und erstellen keine entsprechenden Profile."
            : "We do not make automated decisions with legal or similarly significant effects on this website or create profiles for such decisions."}</p>
        </section>
      </div>
    </>
  );
}
