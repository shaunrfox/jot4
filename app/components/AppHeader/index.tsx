import Box from "../Box";
import Button, { IconButton } from "../Button";
import Hamburger from "../icons/Hamburger";
import { modes } from "../../utils/theme";
import { Link } from "@remix-run/react";
import { styled } from "styled-components";

const NavList = styled("ul")`
  display: flex;
  gap: 2rem;
`;

const NavItem = styled("li")`
  display: block;
`;

export function Navbar() {
  return (
    <nav>
      <NavList>
        {/* <NavItem>
          <Link to="/">Home</Link>
        </NavItem> */}
        <NavItem>
          <Link to="documents">Documents</Link>
        </NavItem>
      </NavList>
    </nav>
  );
}

const AppHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 1,
        backgroundColor: ({ mode }) =>
          mode === modes.dark ? "gray.80" : "gray.0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          flexBasis: "100%",
          flexShrink: 0,
          gap: 4,
          px: 4,
          py: 4,
        }}
      >
        <IconButton variant="hollow">
          <Hamburger />
        </IconButton>
        <Button
          variant="hollow"
          to="/"
          sx={{ marginRight: 8, fontWeight: "bold" }}
        >
          Jot Home
        </Button>
        <Link to="documents">Documents</Link>
        {/* <Navbar /> */}
      </Box>
    </Box>
  );
};

export default AppHeader;
