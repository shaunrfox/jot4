import React, { useState, useEffect } from "react";
import Box from "~/components/Box";
import Heading from "~/components/Heading";
import Text from "~/components/Text";
import More from "~/components/icons/More";
import { IconButton } from "../Button";
import MyLink from "~/components/MyLink";
import TimeSince from "~/components/TimeSince";
import Edit from "~/components/icons/Edit";

const PageTitleArea: React.FC<{
  id?: string;
  title: string;
  date?: Date | string;
  updatedAt?: Date | string;
  type?: string;
  onTitleChange?: (newTitle: string) => void;
  isViewingPage?: boolean;
}> = ({ id, title, updatedAt, type, onTitleChange, isViewingPage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  useEffect(() => {
    setEditedTitle(title);
  }, [title]);

  const handleEditClick = () => {
    if (type !== "DAILY") {
      setIsEditing(true);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleTitleSubmit = () => {
    if (onTitleChange && editedTitle !== title) {
      onTitleChange(editedTitle);
    }
    setIsEditing(false);
  };

  const HeadingWrapper = ({ children }: { children: React.ReactNode }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: "0.25rem",
        "&:hover": {
          button: {
            opacity: 1,
          },
        },
      }}
    >
      {children}
    </Box>
  );

  const expandableInput = (
    <Box
      as="label"
      htmlFor="page-title"
      data-value={editedTitle}
      sx={{
        display: "inline-grid",
        verticalAlign: "top",
        alignItems: "center",
        position: "relative",
        padding: 0,
        fontSize: 5,
        fontWeight: "bold",
        fontFamily: "default",
        "&::after, input, textarea": {
          width: "auto",
          minWidth: "1em",
          maxWidth: "100%",
          gridArea: "1 / 2",
          font: "inherit",
          padding: "0 4px",
          margin: 0,
          resize: "none",
          background: "none",
          appearance: "none",
          border: "none",
        },
        "&::after": {
          content: "attr(data-value) ' '",
          visibility: "hidden",
          whiteSpace: "pre-wrap",
        },
        "&:focus-within": {
          outline: "solid 2px",
          outlineColor: "blue.50",
          outlineOffset: "2px",
          borderRadius: 2,
          ml: "-4px",
        },
      }}
    >
      <Box
        as="input"
        type="text"
        id="page-title"
        onInput={(e: React.FormEvent<HTMLInputElement>) => {
          const target = e.currentTarget;
          const parent = target.parentNode as HTMLElement;
          parent.dataset.value = target.value || "";
        }}
        value={editedTitle}
        onChange={handleTitleChange}
        onBlur={handleTitleSubmit}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          e.key === "Enter" && handleTitleSubmit()
        }
        autoFocus
        sx={{
          font: "inherit",
          mt: "-1px",
          ml: "-1px",
          "&:focus-visible": {
            border: "none",
            outline: "none",
          },
        }}
        size="4"
      />
    </Box>
  );

  const renderTitle = () => {
    if (isEditing) {
      return <HeadingWrapper>{expandableInput}</HeadingWrapper>;
    }

    const headingContent = <Heading level={5}>{title}</Heading>;
    const editButton = (
      <IconButton
        variant="hollow"
        onClick={handleEditClick}
        sx={{ opacity: 0 }}
      >
        <Edit />
      </IconButton>
    );

    if (isViewingPage || !id) {
      return (
        <HeadingWrapper>
          {headingContent}
          {type !== "DAILY" && editButton}
        </HeadingWrapper>
      );
    }

    return (
      <HeadingWrapper>
        <MyLink to={`/page/${id}`}>{headingContent}</MyLink>
      </HeadingWrapper>
    );
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: 6,
        flexGrow: 1,
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
          alignItems: "center",
          justifyContent: "start",
          gap: "0.25rem",
          "&:hover": {
            button: {
              opacity: 1,
            },
          },
        }}
      >
        {renderTitle()}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "0.25rem",
        }}
      >
        <Text
          sx={{
            opacity: 0.5,
            whiteSpace: "nowrap",
            fontSize: 2.5,
          }}
        >
          {updatedAt && <TimeSince date={new Date(updatedAt)} />}
        </Text>
        <IconButton variant="hollow">
          <More />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PageTitleArea;
