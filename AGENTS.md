# Project conventions

Read README.md and handbook/architecture.md before structural changes. For writing, read handbook/writing/README.md and the relevant page guide. For Three.js work, read handbook/desk-assets.md.

- This source tree is the current baseline. Keep migration notes, superseded designs and implementation chronology in Git, not current documentation.
- Preserve the author's wording and facts. Do not infer personal responsibilities from organizational documents. Never add internal documents, credentials or non-public data to this public repository.
- Keep the minimal visual language. The study has quiet English controls; published content retains its own language.
- Prefer native HTML and CSS. Reading pages must not require application JavaScript.
- public/window-study/vendor contains licensed third-party code; preserve attribution and avoid incidental formatting changes there.
- The birthday target is /spaces/juha/index.html, including the filename.
- Do not format Markdown content or third-party standalone assets as part of application cleanup.
- Run npm run format:check, npm run check, npm run build, npm test. Run npm run test:browser with a server on 8081 for UI changes. SITE_URL can target another server.
- Do not commit dist/, node_modules/ or framework caches. Do not deploy or rewrite Git history unless requested.
