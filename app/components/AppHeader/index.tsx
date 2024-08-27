import { modes, HEX8 } from "../../utils/theme";

import { Link } from "@remix-run/react";
import Box from "../Box";
import Button, { IconButton } from "../Button";
import Hamburger from "../icons/Hamburger";

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
          mode === modes.dark ? HEX8("gray.80", 0.8) : HEX8("gray.0", 0.8),
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
      </Box>
    </Box>
  );
};

export default AppHeader;
