import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	ssr: {
        noExternal: ['@popperjs/core', 'bootstrap']
    }
};

export default config;
