<!-- Header.svelte -->
<script>
  import { onMount } from 'svelte';
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from '@sveltestrap/sveltestrap';

  let isOpen = false;
  let mounted = false;

  onMount(() => {
    mounted = true;
  });

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

{#if mounted}
  <Navbar class="header" color="light" light expand="md">
    <NavbarBrand href="/">Home</NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
      <Nav class="ms-auto" navbar>
        <NavItem>
          <NavLink href="/blog">Blog</NavLink>
        </NavItem>
        <Dropdown nav inNavbar>
          <DropdownToggle nav caret>Others</DropdownToggle>
          <DropdownMenu end>
            <DropdownItem href="/papers">Papers</DropdownItem>
            <DropdownItem href="/achievements">Achievements</DropdownItem>
            <DropdownItem href="/presentations">Presentations</DropdownItem>
            <DropdownItem divider />
            <DropdownItem href="/tools">Tools</DropdownItem>
            <DropdownItem divider />
            <DropdownItem href="/about">About</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </Collapse>
  </Navbar>
{/if}
