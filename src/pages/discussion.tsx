import { PageHeading } from "../components/PageHeading";
import { Board } from "../components/Board";
import { siteTitle } from "../site";
import type { Lang } from "../types";
import { seminarUrl } from "../site";

export function Experiences({ lang }: { lang: Lang }) {
  const de = lang === "de";
  return (
    <>
      <PageHeading
        eyebrow={de ? "Die Menschen hinter der Mathematik" : "The people behind the mathematics"}
        title={siteTitle[lang]}
        subtitle={de ? "Diskussionen in der Community" : "Community Discussions"}
      />

      <div className="discussion-introduction prose">
        <p>
          {de
            ? "In den letzten Wochen hat sich die Welt so schnell gedreht wie noch nie. Wir alle sind von den rasanten Entwicklungen überholt worden, und es ist nicht abzusehen, wie lange sie in diesem Tempo weitergehen werden. Gleichzeitig findet unser Forschungsalltag noch fast in unserer alten, normalerweise langsamen Realität statt: In vielen Bereichen werden die meisten Fachzeitschriften noch nicht von KI-generierten Resultaten überschwemmt, und eine Promotion läuft noch weitgehend so ab wie vor 30 Jahren. Klar ist aber auch, dass sich dies sehr bald ändern wird. Wann und wie genau, wissen wir nicht."
            : "Over the last weeks, the world has been turning faster than ever. We have all been overtaken by the rapid developments, and there is no telling how long they will continue at this pace. At the same time, our research lives are still almost in our old, normally slow reality: in many areas, most journals are not yet being flooded with AI-generated results, and doing a doctorate is still much as it was 30 years ago. But it is also clear that this will change very soon. When and how exactly, we do not know."}
        </p>
        <p>
          {de
            ? "Wir alle sind voller Fragen zur Zukunft der Mathematik als Wissenschaft, aber insbesondere auch zu unserer eigenen Zukunft als Menschen, die Mathematik machen. Ein Bachelorstudent stellt andere Fragen als eine Doktorandin kurz vor dem Abschluss. Eine Professorin mit fester Stelle argumentiert aus einer privilegierteren Position heraus als ein Juniorprofessor ohne Tenure Track."
            : "We are all full of questions about the future of mathematics as a science, but especially about our own future as people who do mathematics. An undergraduate student asks different questions from a doctoral researcher close to finishing. A professor with a permanent position argues from a more privileged position than an assistant professor without a tenure track."}
        </p>
        <p>
          {de
            ? "Wir setzen auf eine Diskussion auf Augenhöhe. Lasst uns reflektiert und mit Empathie diskutieren! Ein Postdoc in der Bewerbungsphase verspürt mehr Druck, KI einzusetzen, um schneller zu arbeiten, als ein Professor mit einer gesicherten Dauerstelle. Menschen reagieren unterschiedlich auf neue Entwicklungen: Einige sind skeptisch und vorsichtig, andere neugierig und gespannt. Geprägt durch unsere Persönlichkeiten und Erfahrungen gehen wir unterschiedlich mit Unsicherheit um. Gerade wenn wir über den generellen Einsatz von KI oder unsere Erwartungen an das Verständnis von Resultaten diskutieren, sollten wir daher viel Verständnis für die Lebensumstände unserer Diskussionspartner:innen aufbringen."
            : "We seek a discussion on equal terms. Let us discuss thoughtfully and with empathy! A postdoc applying for jobs feels more pressure to use AI to work faster than a professor with a secure permanent position. People react differently to new developments: some are sceptical and cautious, others curious and excited. Different people deal with uncertainty differently, shaped by our personalities and experiences. Especially when discussing whether to use AI in general or what understanding of results we expect, we should therefore show considerable understanding for our discussion partners’ circumstances."}
        </p>
        <p>
          {de
            ? "Wir laden dazu ein, Erfahrungen, Hoffnungen und Sorgen im offenen Board zu teilen und die Positionspapiere zu Forschung und Lehre in den jeweiligen Boards zu diskutieren."
            : "We invite you to share experiences, hopes and concerns on the open board and to discuss the position papers on research and education on their respective boards."}
        </p>
        <p>
          {de
            ? "Der Austausch kann ebenso in Fachbereichen, Arbeitsgruppen und informellen Gesprächen stattfinden. Das Online-Seminar "
            : "These exchanges can also take place within departments, research groups and informal conversations. The online seminar "}
          <a href={seminarUrl} target="_blank" rel="noopener noreferrer">
            AI and the Future of Mathematics
          </a>
          {de
            ? " bietet mit Vorträgen und anschließenden Diskussionen weitere Anlässe dafür. Lokale Treffen können diese Gespräche aufgreifen und fortsetzen. Wir laden dazu ein, solche Treffpunkte zu organisieren!"
            : " offers further opportunities through talks and follow-up discussions. Local meetings can build on and continue these conversations. We invite you to organise such meeting points!"}
        </p>
      </div>

      <div className="discussion-board-links prose">
        <p>
          <a
            href="https://padlet.com/andreasbthom/mathe-und-ki-forschung-s023jvaws0orn8tvtidh"
            target="_blank"
            rel="noopener noreferrer"
          >
            {de ? "Forschung diskutieren" : "Discuss research"} ↗
          </a>
        </p>
        <p>
          <a
            href="https://padlet.com/andreasbthom/mathe-und-ki-lehre-s023jvbpjr1n139eny8v"
            target="_blank"
            rel="noopener noreferrer"
          >
            {de ? "Lehre diskutieren" : "Discuss education"} ↗
          </a>
        </p>
      </div>
      <Board kind="experiences" lang={lang} />
    </>
  );
}
