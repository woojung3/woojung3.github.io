<!-- Footer.svelte -->
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
  <NavbarBrand></NavbarBrand>
    <Nav class="ml-auto" navbar>
      <NavItem>
        <NavLink href="/rss">
          <img src="/image/rss-feed-symbol.png" alt="drawing" width="10"/> rss | © woojung3
        </NavLink>
      </NavItem>
    </Nav>
</Navbar>