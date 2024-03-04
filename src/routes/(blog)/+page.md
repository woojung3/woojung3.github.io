<script>
  export let data
  let posts = data.recentPosts
</script>

<img src="/image/juha_main.jpeg" alt="juha" width="100%"/><br><br>

# <p style="text-align: center;">Jinwoo's Blog</p>

*<p style="text-align: center;">보안 프로그래밍 & 가정의 행복</p>*
<br>

## 주요 페이지:
- [점심 선택기](/tools)

<br>

## 최근 게시물:
<ul>
  {#each posts as post}
    <!-- Replace post.id with a unique identifier for each item -->
    <li>
      <p style="text-align:left;margin:7px 0">
        <a href={post.path}> {post.meta.title} </a>
        <span style="float:right;color:#828282;font-size:small">
          Published {post.meta.date}
        </span>
      </p>
    </li>
  {/each}
</ul>
