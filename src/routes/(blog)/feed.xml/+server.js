import { fetchMarkdownPosts } from '$lib/utils/fetch.js'

const siteURL = 'https://woojung3.github.io'
const siteTitle = 'Jinwoo\'s personal space'
const siteDescription = '주로 보안 프로그래밍에 대해 다룹니다'

export const prerender = true

export const GET = async () => {
  const allPosts = await fetchMarkdownPosts()
  const sortedPosts = allPosts.sort((a, b) => {
	return new Date(b.meta.date) - new Date(a.meta.date)
  })

  const body = render(sortedPosts.slice(0, 20))
  const options = {
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=3600',
      'Content-Type': 'application/xml;',
    }
  };

  return new Response(
    body,
    options
  )
}

const render = (posts) =>
(`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${siteTitle}</title>
<description>${siteDescription}</description>
<link>${siteURL}</link>
<atom:link href="${siteURL}/feed.xml" rel="self" type="application/rss+xml"/>
${posts
  .map(
    (post) => `<item>
<guid isPermaLink="true">${siteURL}/${post.path}</guid>
<title>${post.meta.title}</title>
<link>${siteURL}/${post.path}</link>
<description>${post.meta.title}</description>
<pubDate>${new Date(post.meta.date).toUTCString()}</pubDate>
</item>`
  )
  .join('')}
</channel>
</rss>
`)
