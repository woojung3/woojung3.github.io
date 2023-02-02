<!-- Header.svelte -->
<script>
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
  } from 'sveltestrap';

  let currentWidth = 0;
</script>

<svelte:window bind:outerWidth={currentWidth}/>

<p>size: {currentWidth}px</p>

<Navbar color="light" light expand="md">
  <NavbarBrand href="/">Home</NavbarBrand>
    {#if currentWidth >= 800}
      <Nav class="ml-auto" navbar>
        <NavItem>
          <NavLink href="/blog">Blog</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/presentations">Presentations</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/papers">Papers</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem>
      </Nav>
    {:else}
      <Dropdown nav inNavbar style="list-style-type: none">
        <DropdownToggle nav caret>Menu</DropdownToggle>
        <DropdownMenu right>
          <DropdownItem href="/blog">Blog</DropdownItem>
          <DropdownItem href="/presentations">Presentations</DropdownItem>
          <DropdownItem href="/papers">Papers</DropdownItem>
          <DropdownItem href="/about">About</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    {/if}
</Navbar>