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
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ms-auto" navbar>
      <NavItem>
        <NavLink href="/blog">Blog</NavLink>
      </NavItem>
      <Dropdown nav inNavbar>
        <DropdownToggle nav caret>Others</DropdownToggle>
        <DropdownMenu end>
          <DropdownItem href="/presentations">Presentations</DropdownItem>
          <DropdownItem href="/papers">Papers</DropdownItem>
          <DropdownItem href="/achievements">Achievements</DropdownItem>
          <DropdownItem divider />
          <DropdownItem href="/tools">Tools</DropdownItem>
          <DropdownItem divider />
          <DropdownItem href="/about">About</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Nav>
  </Collapse>
</Navbar>