// import { useEffect, useState } from "react";
import Box from "~/components/Box";
import Heading from "~/components/Heading";
import Text from "~/components/Text";
import More from "~/components/icons/More";
import { IconButton } from "../Button";
import { themeHelper } from "~/utils/styled";
import theme from "~/utils/theme";

const DateString = () => {
  const date = new Date();
  const dateString = date.toISOString().split("T")[0];

  return (
    <Text sx={{ color: "gray.40", whiteSpace: "nowrap" }}>{dateString}</Text>
  );
};

// const pageTitleStyles = themeHelper({

// });

const PageTitleArea = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        borderBottom: "1px solid",
        borderColor: "gray.20",
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        maxWidth: "650px",
        minWidth: "1px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: 6,
          flexGrow: 1,
          width: "100%",
        }}
      >
        <Heading level={5} sx={{ width: "100%" }}>
          Page title
        </Heading>
        <DateString />
      </Box>
      <IconButton variant="hollow">
        <More />
      </IconButton>
    </Box>
  );
};

export default PageTitleArea;
