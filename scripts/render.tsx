import { renderToString } from "react-dom/server";
import { Layout } from "../src/components/Layout";
import { Landing } from "../src/pages/home";
import { PositionPaper } from "../src/pages/research";
import { TeachingPaper } from "../src/pages/education";
import { Questions } from "../src/pages/questions";
import { Experiences } from "../src/pages/discussion";
import { Imprint } from "../src/pages/imprint";
import { Privacy } from "../src/pages/privacy";
import { Resources } from "../src/pages/resources";
import { titles, siteTitle } from "../src/site";
import { homeTitles } from "../src/metadata.mjs";
import type { PageRoute } from "../src/types";

const pages = {
  home: Landing,
  papers: PositionPaper,
  teaching: TeachingPaper,
  questions: Questions,
  experiences: Experiences,
  resources: Resources,
  imprint: Imprint,
  privacy: Privacy,
};

export function renderPage(route: PageRoute) {
  const Page = pages[route.view];
  return {
    title: route.view === "home" ? homeTitles[route.lang] : titles[route.lang][route.view] + " | " + siteTitle[route.lang],
    html: renderToString(
      <Layout route={route}>
        <Page lang={route.lang} />
      </Layout>,
    ),
  };
}
