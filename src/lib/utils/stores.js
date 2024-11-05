import { writable } from 'svelte/store';
import { dev } from '$app/environment';

export let isMobileStore = writable(false);

let domain;
if (dev) {
    domain = "http://localhost:5173";
} else {
    domain = "https://woojung3.github.io";
}

export const siteDomain = domain;
