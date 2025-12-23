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
  } from '@sveltestrap/sveltestrap';

  let isOpen = false;

  function toggle() {
    isOpen = !isOpen;
  }
</script>

<Navbar class="header" color="light" light expand="md">
  <NavbarBrand href="/">Home</NavbarBrand>
  <NavbarToggler on:click={toggle} />
  <Collapse {isOpen} navbar>
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
