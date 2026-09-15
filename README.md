# KI und Mathematik / AI and Mathematics

Die Website besteht aus sechs Inhaltsseiten, einem Impressum und Datenschutzhinweisen pro Sprache. Die HTML-Dateien enthalten den Seiteninhalt bereits beim Ausliefern; JavaScript ergänzt die aufklappbaren Antworten und die Padlet-Boards.

## Aufbau

| Bereich                   | Deutsch                    | English                    |
| ------------------------- | -------------------------- | -------------------------- |
| Startseite                | `de/index.html`            | `en/index.html`            |
| Forschung                 | `de/forschung/index.html`  | `en/research/index.html`   |
| Lehre                     | `de/lehre/index.html`      | `en/education/index.html`  |
| Fragen und Perspektiven   | `de/fragen/index.html`     | `en/questions/index.html`  |
| Diskussion                | `de/diskussion/index.html` | `en/discussion/index.html` |
| Links und Veranstaltungen | `de/links/index.html`      | `en/resources/index.html`  |
| Impressum                 | `de/impressum/index.html`  | `en/legal-notice/index.html` |
| Datenschutz               | `de/datenschutz/index.html` | `en/privacy/index.html` |

Die Startdatei `index.html` führt anhand der gespeicherten Sprachwahl bzw. Browsersprache zur Startseite. Alte Links wie `#/de/papers/principle-1` führen weiterhin zum passenden Abschnitt. Die relativen Pfade funktionieren sowohl unter `thomasnikolaus.github.io/ai.math/` als auch mit einer eigenen Domain.

Impressum und Datenschutz sind im Fußbereich jeder Seite verlinkt. `404.html` enthält eine zweisprachige Fehlerseite, die auch bei beliebig tiefen ungültigen URLs ohne JavaScript funktioniert.

## Änderungen vornehmen

- `src/content/`: Texte der Startseite, Positionspapiere, Fragen, Perspektiven und Linkliste, jeweils in beiden Sprachen.
- `src/pages/`: Vorlage jeder Seite, einschließlich ihrer weiteren Texte. Die Impressumsangaben stehen in `src/pages/imprint.tsx`.
- `src/components/`: gemeinsame Navigation, Überschriften, Diskussionsboards und Bedienelemente.
- `src/styles.css`: die bisherige Formatierung einschließlich Druckansicht.
- `src/site.ts`: Seitentitel, Autor:innen, Seminaradresse und Padlet-Adressen.
- `src/metadata.mjs`: individuelle Seitenbeschreibungen für beide Sprachen.
- `src/pages/privacy.tsx`: Datenschutzhinweise zum tatsächlichen Betrieb der Seite.
- `src/favicon.svg`, `src/favicon.png`, `src/apple-touch-icon.png`: Website-Symbole; SVG ist die bearbeitbare Vorlage.
- `src/social-preview-*.svg` und `.png`: zweisprachige Vorschaugrafiken; nach Änderungen an SVG auch die PNG-Dateien neu exportieren (1200 × 630 Pixel).
- `src/routing.mjs`: Seitenadressen und Kompatibilität mit alten Links.

Die erzeugten HTML-Dateien und Dateien in `assets/` werden beim Bauen überschrieben. Dauerhafte Änderungen deshalb in `src/` vornehmen.

Voraussetzungen: Node.js ab Version 22 und pnpm 11.

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm test
pnpm preview
```

Die Vorschau steht dann unter `http://127.0.0.1:4173/`. `PREVIEW_BASE=/ai.math/ pnpm preview` bildet den GitHub-Projektpfad nach.

## GitHub Pages

Die bisherige Einstellung bleibt passend: **Settings → Pages → Deploy from a branch → main → / (root)**. Die fertigen Dateien liegen bereits im Repository-Hauptverzeichnis; GitHub muss keinen eigenen Build ausführen.

Die öffentliche Domain ist `https://ai.math.ms/`. Die Datei `CNAME` im Repository ordnet sie diesem GitHub-Pages-Projekt zu; der DNS-Eintrag `ai.math.ms → thomasnikolaus.github.io` wird außerhalb von GitHub verwaltet. In den Pages-Einstellungen sollte nach Bereitstellung des Zertifikats **Enforce HTTPS** aktiviert sein.

Nach einer Änderung zuerst `pnpm build` und `pnpm test` ausführen. Anschließend Quelldateien **und** erzeugte Dateien gemeinsam committen und pushen:

```sh
git add -A
git commit -m "Update website"
git push
```

`generated-files.json` verzeichnet die erzeugten Dateien. Ein neuer Build entfernt ausschließlich veraltete Dateien aus dieser Liste. Eine später angelegte `CNAME` für eine eigene Domain bleibt erhalten. `.nojekyll` sorgt für die direkte Auslieferung der statischen Dateien.

Die bestehende Angabe `noindex,nofollow` wurde unverändert übernommen. Padlet wird weiterhin erst nach Klick auf „Diskussionsboard öffnen“ geladen. Beim Wechsel der Sprache bleiben geöffnete Antworten und ein bereits geöffnetes Board erhalten.

## Seiteninformationen und Domain

Der Build erzeugt Beschreibungen, Canonical- und vollständige hreflang-Adressen, Open-Graph- und Twitter-Vorschauen, Website-Strukturdaten auf der Einstiegsseite, Icons, `sitemap.xml` und `robots.txt`. Das schaltet die Website **nicht** für Suchmaschinen frei: Alle HTML-Seiten tragen weiterhin `noindex,nofollow`. `robots.txt` erlaubt das Abrufen, damit Suchmaschinen diese Sperre lesen können. Die Sitemap wird nicht automatisch bei Suchmaschinen eingereicht; Search Console ist nicht eingerichtet.

Die öffentliche Basisadresse wird beim Bauen in dieser Reihenfolge bestimmt:

1. Eine ausdrücklich gesetzte Umgebungsvariable `SITE_URL` (HTTPS, mit optionalem Projektpfad).
2. Die Domain aus einer vorhandenen `CNAME`-Datei.
3. `https://thomasnikolaus.github.io/ai.math/`.

`CNAME` enthält bereits `ai.math.ms`. Ein normaler Build verwendet diese Adresse für Canonical-Angaben, Sprachverknüpfungen, Vorschaugrafiken, Sitemap und Fehlerseite. Die Suchmaschinen-Sperre bleibt dabei erhalten. Wird die Domain später über die GitHub-Pages-Einstellungen geändert, den dort erzeugten Commit zuerst mit `git pull --ff-only` übernehmen, anschließend neu bauen, prüfen und die erzeugten Dateien mit veröffentlichen. Der Build selbst ändert weder die DNS-Einstellungen noch die Pages-Einstellungen.

Unter der bisherigen GitHub-Projektadresse gilt eine `robots.txt` nur am Host-Stamm, nicht im Unterverzeichnis `/ai.math/`. Auf `ai.math.ms` liegt die mitgelieferte Datei an der richtigen Stelle. Die Sperre durch HTML-Metatags bleibt bestehen.

Die Datenschutzhinweise beruhen auf der aktuellen Einbindung und den verlinkten Angaben von GitHub und Padlet (Stand 15. September 2026). Änderungen an Hosting, Boards, Analysefunktionen oder Speicherverfahren erfordern eine erneute Prüfung des Textes.
