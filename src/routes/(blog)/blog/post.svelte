<!-- post.svelte -->
<script>
export let title
export let date
</script>

<article>
  <h1>{title}</h1>

  <p style="color:#828282;font-size:small">Published: {date}</p>

  <slot />

  <br><hr>

  <script src="https://giscus.app/client.js"
        data-repo="woojung3/woojung3.github.io"
        data-repo-id="R_kgDOI3E2IA"
        data-category="Announcements"
        data-category-id="DIC_kwDOI3E2IM4CdtCg"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="en"
        crossorigin="anonymous"
        async>
  </script>
</article>
