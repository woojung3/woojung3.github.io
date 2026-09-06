# Architecture

## Static documents

Astro generates directory routes for Home, Blog, Papers, Work and About. `src/content.config.ts` validates Markdown metadata. `src/lib/posts.ts` is the source of published post ordering and URLs. Draft posts are excluded from page generation, lists, RSS and sitemap.

Blog pages contain ten entries. Page one is `/blog/`; later pages are `/blog/page/<number>/`. Article IDs come from Markdown filenames. Dates are editorial metadata, not inferred from IDs. Reading pages need no client-side application runtime.

`Site.astro` owns global navigation, metadata and footer. `Standalone.astro` provides a separate noindex shell without site CSS for independent apps. The sitemap is an explicit public route list; add public routes there deliberately.

## Homepage scene

`Desk.astro` embeds `window-study` and a keyboard-focusable birthday link. The custom element owns its Shadow DOM, engine, controls and styles. All dependencies live in `public/window-study/`; keep the bundled Three.js MIT license. See [scene maintenance](desk-assets.md).

## Independent pamphlet

The birthday pamphlet entry is `/spaces/juha/index.html`. Use the explicit filename: static directory indexes are not resolved uniformly by development and production servers. Its scripts, styles and images stay within `public/spaces/juha/` and do not load on the main site. Its HTML declares noindex; it is excluded from the public sitemap but remains directly accessible.

## Boundaries

- Content changes belong in Markdown and media directories, not route components.
- Only the homepage loads the scene. Do not import its runtime into the global layout.
- Do not propagate site CSS into standalone applications or Shadow DOM.
- Native HTML links, details/summary and CSS handle navigation, disclosures and responsiveness.
- Source dependencies are locked in package-lock.json; use npm ci in automation.
- Build output belongs in dist/, never in Git. Git history is the change log.

## Verification

Run check, build and static tests for changes. Run browser tests against dev or preview on 8081. Verify external-host access with its Host header when changing allowedHosts. For scene changes, check desktop/mobile controls, night lighting, drag-versus-click behavior, frame navigation and fallback behavior. Do not mistake a changed URL for a successfully rendered destination.
