import { getCollection } from "astro:content";
export async function posts() {
  return (await getCollection("posts", ({ data }) => !data.draft)).sort(
    (a, b) =>
      b.data.date.localeCompare(a.data.date) || b.id.localeCompare(a.id),
  );
}
export const postUrl = (id: string) => `/blog/${id}/`;
export const xml = (value: string) =>
  value.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
