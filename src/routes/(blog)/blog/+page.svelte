<!-- src/routes/blog/+page.svelte -->
<script>
  import { paginate, LightPaginationNav } from 'svelte-paginate'
  export let data
  let items = data.posts

  let currentPage = 1
  let pageSize = 10
  $: paginatedItems = paginate({ items, pageSize, currentPage })
</script>

<ul class="items">
  {#each paginatedItems as item}
  <li class="item">
    <p style="text-align:left;">
      <a href={item.path}> {item.meta.title} </a>
      <span style="float:right;color:#828282;font-size:small">
        Published {item.meta.date}
      </span>
    </p>
    <hr>
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
