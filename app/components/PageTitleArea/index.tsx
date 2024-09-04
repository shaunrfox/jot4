import React from "react";
import Box from "~/components/Box";
import Heading from "~/components/Heading";
import Text from "~/components/Text";
import More from "~/components/icons/More";
import { IconButton } from "../Button";
import DateDisplay from "~/components/DateDisplay";
import MyLink from "~/components/MyLink";

const PageTitleArea: React.FC<{
  id?: string;
  title: string;
  date?: Date | string;
  type?: string;
}> = ({ id, title, date, type }) => {
  // console.log("Page Metadata", title, date, type);

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: 6,
        // borderBottom: "1px solid",
        // borderColor: "gray.20",
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        maxWidth: "650px",
        minWidth: "1px",
        pt: 5,
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
          {id ? <MyLink to={`/page/${id}`}>{title}</MyLink> : title}
        </Heading>
        <Text
          sx={{
            opacity: 0.5,
            whiteSpace: "nowrap",
          }}
        >
          {date ? (
            <DateDisplay
              utcDate={typeof date === "string" ? date : date.toISOString()}
            />
          ) : (
            "Date not available"
          )}
          {type && ` | ${type}`}
        </Text>
      </Box>
      <IconButton variant="hollow">
        <More />
      </IconButton>
    </Box>
  );
};

export default PageTitleArea;
