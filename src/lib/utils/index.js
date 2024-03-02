export const fetchMarkdownPosts = async () => {
	const allPostFiles = import.meta.glob(`/src/routes/**/blog/**/+page.md`)
	const iterablePostFiles = Object.entries(allPostFiles)

	const allPosts = await Promise.all(
	  iterablePostFiles.map(async ([path, resolver]) => {
		const { metadata } = await resolver()
		const postPath = path.slice(19, -9);    // magic number

		return {
		  meta: metadata,
		  path: postPath,
		}
	  })
	)

	// return [iterablePostFiles]
	return allPosts
}
