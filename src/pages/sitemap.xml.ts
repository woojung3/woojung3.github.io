import type { APIRoute } from "astro";
import { posts, postUrl, xml } from "../lib/posts";
export const GET: APIRoute = async ({ site }) => {
  const all = await posts();
  const paths = [
    "/",
    "/blog/",
    "/papers/",
    "/work/",
    "/about/",
    ...all.map((p) => postUrl(p.id)),
    ...Array.from(
      { length: Math.max(0, Math.ceil(all.length / 10) - 1) },
      (_, i) => `/blog/page/${i + 2}/`,
    ),
  ];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${xml(new URL(path, site).href)}</loc></url>`).join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
