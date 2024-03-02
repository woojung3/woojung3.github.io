import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
        adapter: adapter({
          pages: 'docs',
          assets: 'docs',
          fallback: null
      })
	},

    extensions: ['.svelte', '.md'],

    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: [
        sveltePreprocess(),
        preprocess(),
        mdsvex({
            extensions: ['.md'],
            layout: {
                blog: 'src/routes/(blog)/blog/post.svelte'
            }
        })
    ]
};

export default config;
