<!-- +layout.svelte -->
<script>
import Header from '$lib/components/Header.svelte'
import Footer from '$lib/components/Footer.svelte'
import '$lib/styles/style.scss'
import '$lib/styles/prism-vsc-dark-plus.css'

import { onMount } from 'svelte';
import { isMobileStore } from '$lib/utils/stores.js'
onMount(() => {
  const mediaQuery = window.matchMedia('(max-width: 767px)'); // Adjust the breakpoint as needed
  isMobileStore.update(() => mediaQuery.matches);

  const updateIsMobile = (event) => {
    isMobileStore.update(() => event.matches);
  };

  mediaQuery.addListener(updateIsMobile);

  return () => {
    mediaQuery.removeListener(updateIsMobile);
  };
});
</script>

<Header />

<main>
  <slot />
</main>

<Footer />
