import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
const read = (path) => readFileSync(`dist/${path}`, "utf8");
const published = readdirSync("src/content/posts").filter((file) => {
  const source = readFileSync(`src/content/posts/${file}`, "utf8");
  return !/^draft:\s*true\s*$/m.test(source.split("---")[1]);
});
test("published posts are generated with ten entries per list page", () => {
  for (const file of published)
    assert.ok(existsSync(`dist/blog/${file.replace(".md", "")}/index.html`));
  for (let page = 1; page <= Math.ceil(published.length / 10); page++) {
    const path =
      page === 1 ? "blog/index.html" : `blog/page/${page}/index.html`;
    assert.equal(
      (read(path).match(/<time /g) || []).length,
      Math.min(10, published.length - (page - 1) * 10),
    );
  }
});
test("reading pages do not load client scripts", () => {
  for (const path of [
    "blog/index.html",
    "about/index.html",
    "papers/index.html",
    "work/index.html",
    "blog/20251109/index.html",
    "personal-assistant/index.html",
    "personal-assistant-privacy/index.html",
  ]) {
    assert.doesNotMatch(read(path), /<script/);
  }
});
test("app introduction and privacy policy are public and linked", () => {
  for (const path of ["personal-assistant", "personal-assistant-privacy"]) {
    const url = `https://woojung3.github.io/${path}/`;
    assert.match(read("index.html"), new RegExp(`href="/${path}/"`));
    assert.ok(read("sitemap.xml").includes(`<loc>${url}</loc>`));
    assert.ok(
      read(`${path}/index.html`).includes(`rel="canonical" href="${url}"`),
    );
    assert.doesNotMatch(read(`${path}/index.html`), /noindex/);
  }
  const privacy = read("personal-assistant-privacy/index.html");
  assert.match(privacy, /Google API/);
  assert.match(privacy, /mailto:sostlsz@gmail\.com/);
  assert.match(privacy, /https:\/\/myaccount\.google\.com\/connections/);
});
test("RSS and sitemap include only public content", () => {
  assert.equal(
    (read("feed.xml").match(/<item>/g) || []).length,
    Math.min(20, published.length),
  );
  assert.doesNotMatch(read("sitemap.xml"), /spaces|juha/);
  assert.match(read("spaces/juha/index.html"), /noindex/);
});
test("local root assets and links in public pages resolve", () => {
  const pages = [
    "index.html",
    "about/index.html",
    "papers/index.html",
    "work/index.html",
    "personal-assistant/index.html",
    "personal-assistant-privacy/index.html",
    ...published.map((f) => `blog/${f.replace(".md", "")}/index.html`),
  ];
  const missing = [];
  for (const page of pages)
    for (const match of read(page).matchAll(
      /(?:href|src)="(\/(?!\/)[^"#?]*)/g,
    )) {
      const path = decodeURIComponent(match[1]);
      if (!existsSync(`dist${path}`) && !existsSync(`dist${path}/index.html`))
        missing.push(`${page}: ${path}`);
    }
  assert.deepEqual(missing, []);
});
