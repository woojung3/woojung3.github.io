// src/routes/blog/+page.js
export const load = async ({ fetch }) => {
	const response = await fetch(`/api/posts`)
	const posts = await response.json()
	const recentPosts = posts.slice(0,5);

	return {
	  recentPosts
	}
}
