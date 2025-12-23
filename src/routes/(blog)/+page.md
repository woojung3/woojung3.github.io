<script>
  import Box from '$lib/components/Box.svelte'

  import { isMobileStore } from '$lib/utils/stores.js'
  let isMobile
  isMobileStore.subscribe((value) => {
    isMobile = value;
  });

  export let data
  let posts = data.recentPosts
</script>

<a href="/html/juha-first-birthday/index.html"><img src="/image/main.png" alt="juha" width="100%"/></a>
<br><br>

# <p style="text-align: center;">Jinwoo's Blog</p>

<p style="text-align: center;font-style:italic">보안 프로그래밍 & 가정의 행복 & 주님의 은혜</p>

<br>

## 주요 페이지:

<div class="row" class:row-cols-1={isMobile} class:row-cols-3={!isMobile}>
  <div class="col"><Box><h6><a href="/about">About</a></h6></Box></div>
  <div class="col"><Box><h6><a href="/papers">Papers</a></h6></Box></div>
  <div class="col"><Box><h6><a href="/achievements">Achievements</a></h6></Box></div>
</div>

<br>

## 최근 게시물:
<ul>
  {#each posts as post}
    <!-- Replace post.id with a unique identifier for each item -->
    <li>
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
