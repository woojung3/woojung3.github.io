import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
export const collections = {
  posts: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
    schema: z.object({
      title: z.string(),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      draft: z.boolean().default(false),
    }),
  }),
  pages: defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/content/pages" }),
    schema: z.object({ title: z.string() }),
  }),
};
