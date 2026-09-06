import { defineConfig } from "astro/config";
export default defineConfig({
  site: "https://woojung3.github.io",
  output: "static",
  devToolbar: { enabled: false },
  trailingSlash: "always",
  markdown: { shikiConfig: { theme: "github-light" } },
  server: { port: 8081, host: true },
  vite: {
    server: { allowedHosts: ["woojung3.iptime.org"] },
  },
});
