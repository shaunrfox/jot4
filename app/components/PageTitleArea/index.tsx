import React from "react";
import Box from "~/components/Box";
import Heading from "~/components/Heading";
import Text from "~/components/Text";
import More from "~/components/icons/More";
import { IconButton } from "../Button";
import DateDisplay from "~/components/DateDisplay";

const PageTitleArea: React.FC<{ title: string; date?: Date }> = ({
  title,
  date,
}) => {
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
        pb: 5,
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
          {title}
        </Heading>
        <Text sx={{ color: "gray.40", whiteSpace: "nowrap" }}>
          {date ? (
            <DateDisplay utcDate={date.toISOString()} />
          ) : (
            "Date not available"
          )}
        </Text>
      </Box>
      <IconButton variant="hollow">
        <More />
      </IconButton>
    </Box>
  );
};

export default PageTitleArea;
