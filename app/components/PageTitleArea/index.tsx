import React from "react";
import Box from "~/components/Box";
import Heading from "~/components/Heading";
import Text from "~/components/Text";
import More from "~/components/icons/More";
import { IconButton } from "../Button";
import DateDisplay from "~/components/DateDisplay";
import MyLink from "~/components/MyLink";
import ReactTimeAgo from "react-time-ago";

const PageTitleArea: React.FC<{
  id?: string;
  title: string;
  date?: Date | string;
  updatedAt?: Date | string;
  type?: string;
}> = ({ id, title, date, updatedAt, type }) => {
  // console.log("Page Metadata", title, date, updatedAt, type);

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
            fontSize: 2.5,
          }}
        >
          {updatedAt && (
            <ReactTimeAgo
              date={new Date(updatedAt)}
              locale="en-US"
              timeStyle="round-minute"
            />
          )}
          {/* {type && ` | ${type}`} */}
        </Text>
      </Box>
      <IconButton variant="hollow">
        <More />
      </IconButton>
    </Box>
  );
};

export default PageTitleArea;
