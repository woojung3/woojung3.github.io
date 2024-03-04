<!-- post.svelte -->
<script>
export let title
export let date
</script>

<svelte:head>
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
</svelte:head>

<article>
  <h1>{title}</h1>

  <p style="color:#828282;font-size:small">Published: {date}</p>

  <slot />

  <br><hr>

  <div id="giscus" class="giscus">
    <p style="text-align: center;"><h2>Comments!</h2></p>
    <p>
      There should be a comment section here. If there isn't, refresh the page (and consider telling me :).
    </p>
  </div>
</article>
