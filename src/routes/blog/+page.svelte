<!-- src/routes/blog/+page.svelte -->
<script>
  import { paginate, LightPaginationNav } from 'svelte-paginate'
  export let data
  console.log(data)

  let items = data.posts

  console.log(items)

  let currentPage = 1
  let pageSize = 10
  $: paginatedItems = paginate({ items, pageSize, currentPage })
</script>

<ul class="items">
  {#each paginatedItems as item}
    <li class="item">
      <h4>
        <a href={item.path}>
          {item.meta.title}
        </a>
      </h4>
      Published {item.meta.date}
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