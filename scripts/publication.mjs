export const defaultSiteUrl = "https://thomasnikolaus.github.io/ai.math/";

// This controls metadata only. It never enables indexing or changes DNS.
export function publicationUrl({ siteUrl, cname } = {}) {
  const domain = cname?.trim();
  if (domain && !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(domain)) {
    throw new Error("CNAME must contain a hostname, without a protocol or path.");
  }
  const url = new URL(siteUrl || (domain ? `https://${domain}/` : defaultSiteUrl));
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) {
    throw new Error("SITE_URL must be an HTTPS URL without credentials, a query or a fragment.");
  }
  if (!url.pathname.endsWith("/")) url.pathname += "/";
  return url.href;
}
