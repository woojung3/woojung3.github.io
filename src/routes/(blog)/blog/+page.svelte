<!-- src/routes/blog/+page.svelte -->
<script>
  import { paginate, LightPaginationNav } from 'svelte-paginate'
  export let data
  let items = data.posts

  let currentPage = 1
  let pageSize = 10
  $: paginatedItems = paginate({ items, pageSize, currentPage })

  import { isMobileStore } from '$lib/utils/stores.js'
  let isMobile
  isMobileStore.subscribe((value) => {
    isMobile = value;
  });
</script>

<ul class="items">
  {#each paginatedItems as post}
    <li class="item">
      {#if isMobile}
        <a href={post.path}> {post.meta.title} </a><br>
        <span style="color:#828282;font-size:small">
          Published {post.meta.date}
        </span>
      {:else}
        <p style="text-align:left;margin:7px 0">
          <a href={post.path}> {post.meta.title} </a>
          <span style="float:right;color:#828282;font-size:small">
            Published {post.meta.date}
          </span>
        </p>
      {/if}
    </li>
  {/each}
</ul>

<LightPaginationNav
  totalItems="{items.length}"
  pageSize="{pageSize}"
  currentPage="{currentPage}"
  limit="{1}"
  showStepOptions="{true}"
  on:setPage="{(e) => currentPage = e.detail.page}"
/>

<style>
  hr {
    padding: 0px;
    margin: 0px;    
  }
</style>
