<!-- post.svelte -->
<script>
import Giscus from '@giscus/svelte';
export let title
export let date
</script>

<article>
  <h1>{title}</h1>

  <p style="color:#828282;font-size:small">Published: {date}</p>

  <slot />

  <br><hr>

  <Giscus
    repo="woojung3/woojung3.github.io" 
    repoId="R_kgDOI3E2IA"
    category="Announcements"
    categoryId="DIC_kwDOI3E2IM4CdtCg"
    mapping="pathname"
    strict="0"
    reactionsEnabled="1"
    emitMetadata="0"
    inputPosition="bottom"
    theme="light"
    lang="en"
    crossorigin="anonymous"
    async />
</article>
