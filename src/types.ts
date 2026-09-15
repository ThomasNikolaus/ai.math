export type Lang = "de" | "en";
export type View = "home" | "papers" | "teaching" | "questions" | "experiences" | "resources" | "imprint" | "privacy";
export type PageRoute = { lang: Lang; view: View; rootPrefix: string };
