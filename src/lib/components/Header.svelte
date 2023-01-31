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

  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<Navbar color="light" light expand="md">
  <NavbarBrand href="/">Home</NavbarBrand>
    <Nav class="ml-auto" navbar>
      <NavItem>
        <NavLink href="/presentations">Presentations</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/papers">Papers</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/blog">Blog</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/about">About</NavLink>
      </NavItem>
    </Nav>
</Navbar>