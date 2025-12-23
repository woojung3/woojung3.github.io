<!-- Header.svelte -->
<script>
  import { onMount } from 'svelte';

  let isOpen = false;
  let isDropdownOpen = false;
  let mounted = false;
  let dropdownElement;

  onMount(() => {
    mounted = true;
    
    // Close dropdown when clicking outside
    const handleWindowClick = (e) => {
      if (dropdownElement && !dropdownElement.contains(e.target)) {
        isDropdownOpen = false;
      }
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  });

  function toggleNav() {
    isOpen = !isOpen;
  }

  function toggleDropdown(e) {
    e.preventDefault();
    isDropdownOpen = !isDropdownOpen;
  }
</script>

{#if mounted}
<nav class="navbar navbar-expand-md navbar-light bg-light header">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Home</a>
    <button class="navbar-toggler" type="button" on:click={toggleNav}>
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" class:show={isOpen} id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" href="/blog">Blog</a>
        </li>
        <li class="nav-item dropdown" bind:this={dropdownElement}>
          <a class="nav-link dropdown-toggle" href="#" role="button" on:click={toggleDropdown} aria-expanded={isDropdownOpen}>
            Others
          </a>
          <ul class="dropdown-menu dropdown-menu-end" class:show={isDropdownOpen}>
            <li><a class="dropdown-item" href="/papers">Papers</a></li>
            <li><a class="dropdown-item" href="/achievements">Achievements</a></li>
            <li><a class="dropdown-item" href="/presentations">Presentations</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="/tools">Tools</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="/about">About</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
{/if}
