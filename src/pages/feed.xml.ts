import type { APIRoute } from "astro";
import { posts, postUrl, xml } from "../lib/posts";
export const GET: APIRoute = async ({ site }) => {
  const items = (await posts()).slice(0, 20).map((post) => {
    const url = new URL(postUrl(post.id), site).href;
    return `<item><title>${xml(post.data.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(post.data.date + "T00:00:00Z").toUTCString()}</pubDate></item>`;
  });
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Jinwoo's Blog</title><link>${site}</link><description>보안 프로그래밍 &amp; 가정의 행복 &amp; 주님의 은혜</description>${items.join("")}</channel></rss>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
