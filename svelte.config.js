import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	onwarn: (warning, handler) => {
		if (warning.code.startsWith('a11y-')) {
			return;
		}
		handler(warning);
	},
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
                blog: path.join(__dirname, './src/routes/(blog)/blog/post.svelte')
            }
        })
    ]
};

export default config;
