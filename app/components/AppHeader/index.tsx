import { modes, HEX8 } from "~/utils/theme";
import Box from "~/components/Box";
import Button, { IconButton } from "~/components/Button";
import Hamburger from "~/components/icons/Hamburger";
import MyLink from "~/components/MyLink";
import Plus from "../icons/Plus";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useEffect } from "react";

interface FetcherData {
  newPageId?: string;
}

const AppHeader = () => {
  const fetcher = useFetcher<FetcherData>();
  const navigate = useNavigate();

  const handleNewPage = () => {
    fetcher.submit(
      { intent: "createPage", title: "Untitled", content: "" },
      { method: "post", action: "/?index" },
    );
  };

  useEffect(() => {
    if (fetcher.data && fetcher.data.newPageId) {
      navigate(`/page/${fetcher.data.newPageId}`);
    }
  }, [fetcher.data, navigate]);

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
          mode === modes.dark ? HEX8("gray.90", 0.8) : HEX8("gray.0", 0.8),
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
        <MyLink
          to="/"
          style={{ marginRight: 8, fontWeight: "bold", textDecoration: "none" }}
        >
          Jot Home
        </MyLink>
        <MyLink to="pages">Pages</MyLink>
        <Button
          sx={{ ml: "auto" }}
          size="small"
          variant="hollow"
          onClick={handleNewPage}
        >
          New Page <Plus />
        </Button>
      </Box>
    </Box>
  );
};

export default AppHeader;
