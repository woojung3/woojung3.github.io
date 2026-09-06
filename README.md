# Jinwoo's Blog

A personal site built with Astro, TypeScript and Markdown, published on GitHub Pages. The homepage includes a self-hosted Three.js study. Content, layouts and standalone applications are maintained separately.

## Commands

Use Node 22.12 or newer (Node 22 in CI).

```sh
npm ci
npm run dev              # http://localhost:8081
npm run check
npm run build            # dist/
npm test                 # built-site checks; run build first
npm run test:browser     # requires Chromium and a running server on 8081
```

Install the browser once with `npx playwright install chromium`. `npm run preview` serves the production build on 8081; stop the development server before using it. Browser tests also accept `SITE_URL` for another server.

The development server accepts `woojung3.iptime.org`. Host configuration is in `astro.config.mjs`; production canonical URLs use `https://woojung3.github.io`.

## Structure

| Path                                 | Responsibility                                               |
| ------------------------------------ | ------------------------------------------------------------ |
| `src/content/posts/`                 | Blog posts; title, date and draft metadata                   |
| `src/content/pages/`                 | About, Papers and Work                                       |
| `src/pages/`                         | Static routes, RSS, sitemap and 404                          |
| `src/components/`                    | Blog lists, pagination and study integration                 |
| `src/layouts/`                       | Public site and independent page layouts                     |
| `src/styles/`                        | Public site typography and responsive layout                 |
| `public/window-study/`               | Study scene, controls, illustration and vendored Three.js    |
| `public/spaces/juha/`                | Birthday pamphlet and its independent assets                 |
| `public/image/`, `public/documents/` | Content media and attachments                                |
| `handbook/`                          | Current architecture, authoring and scene maintenance guides |
| `tests/`                             | Static output and browser checks                             |

## Maintenance

- [Architecture](handbook/architecture.md)
- [Writing guides](handbook/writing/README.md)
- [Study scene](handbook/desk-assets.md)

Treat the current source as the baseline. Git records changes; documentation describes the current behavior rather than migration history. Published writing is content, not implementation history to rewrite.

## Deployment

Set repository **Settings > Pages > Source** to **GitHub Actions**. Pushes to `main` run `.github/workflows/pages.yml`: install, type check, build, test, upload `dist/`, deploy. Generated files are ignored by Git. No server-side runtime is required.

Hidden pages are not private. Do not commit credentials, private documents or non-public personal information. The explicit sitemap includes public pages only.

## Verification boundaries

Browser checks exercise responsive layouts, static navigation, study controls and the frame entrance. Real-device/Safari testing and external maps/video availability require separate checks. The birthday pamphlet has its own third-party dependencies. Site fonts use Google Fonts with local fallbacks; the Three.js scene uses only same-origin assets.
