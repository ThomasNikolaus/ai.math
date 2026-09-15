# KI und Mathematik / AI and Mathematics

Die Website besteht aus sechs Seiten pro Sprache. Texte, Gestaltung und Funktionen entsprechen der bisherigen Ein-Datei-Version. Die HTML-Dateien enthalten den Seiteninhalt bereits beim Ausliefern; JavaScript ergänzt die aufklappbaren Antworten und die Padlet-Boards.

## Aufbau

| Bereich                   | Deutsch                    | English                    |
| ------------------------- | -------------------------- | -------------------------- |
| Startseite                | `de/index.html`            | `en/index.html`            |
| Forschung                 | `de/forschung/index.html`  | `en/research/index.html`   |
| Lehre                     | `de/lehre/index.html`      | `en/education/index.html`  |
| Fragen und Perspektiven   | `de/fragen/index.html`     | `en/questions/index.html`  |
| Diskussion                | `de/diskussion/index.html` | `en/discussion/index.html` |
| Links und Veranstaltungen | `de/links/index.html`      | `en/resources/index.html`  |

Die Startdatei `index.html` führt anhand der gespeicherten Sprachwahl bzw. Browsersprache zur Startseite. Alte Links wie `#/de/papers/principle-1` führen weiterhin zum passenden Abschnitt. Die relativen Pfade funktionieren sowohl unter `thomasnikolaus.github.io/ai.math/` als auch mit einer eigenen Domain.

## Änderungen vornehmen

- `src/content/`: Texte der Startseite, Positionspapiere, Fragen, Perspektiven und Linkliste, jeweils in beiden Sprachen.
- `src/pages/`: Vorlage jeder Seite, einschließlich ihrer weiteren Texte.
- `src/components/`: gemeinsame Navigation, Überschriften, Diskussionsboards und Bedienelemente.
- `src/styles.css`: die bisherige Formatierung einschließlich Druckansicht.
- `src/site.ts`: Seitentitel, Autor:innen, Seminaradresse und Padlet-Adressen.
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

Nach einer Änderung zuerst `pnpm build` und `pnpm test` ausführen. Anschließend Quelldateien **und** erzeugte Dateien gemeinsam committen und pushen:

```sh
git add .
git commit -m "Update website"
git push
```

`generated-files.json` verzeichnet die erzeugten Dateien. Ein neuer Build entfernt ausschließlich veraltete Dateien aus dieser Liste. Eine später angelegte `CNAME` für eine eigene Domain bleibt erhalten. `.nojekyll` sorgt für die direkte Auslieferung der statischen Dateien.

Die bestehende Angabe `noindex,nofollow` wurde unverändert übernommen. Padlet wird weiterhin erst nach Klick auf „Diskussionsboard öffnen“ geladen. Beim Wechsel der Sprache bleiben geöffnete Antworten und ein bereits geöffnetes Board erhalten.
