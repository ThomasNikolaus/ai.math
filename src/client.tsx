import { hydrateRoot } from "react-dom/client";
import type { ComponentType } from "react";
import { Layout } from "./components/Layout";
import type { Lang, PageRoute } from "./types";

export function hydratePage(Page: ComponentType<{ lang: Lang }>) {
  const route = JSON.parse(document.getElementById("page-route")!.textContent!) as PageRoute;
  hydrateRoot(
    document.getElementById("root")!,
    <Layout route={route}>
      <Page lang={route.lang} />
    </Layout>,
  );
}
