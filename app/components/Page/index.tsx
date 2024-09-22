import React, { useMemo } from "react";
import Box from "~/components/Box";
import PageTitleArea from "~/components/PageTitleArea";
import BlockEditor from "~/components/BlockEditor";
import { StyleProps } from "~/utils/styled";

interface PageProps {
  id?: string;
  title: string; // Changed from optional to required
  content?: string | Record<string, unknown>;
  date?: Date;
  type?: string;
  updatedAt?: Date;
  onContentChange: (content: string) => void;
  onTitleChange?: (title: string) => void;
  isViewingPage?: boolean;
  sx?: StyleProps["sx"];
}

const Page: React.FC<PageProps> = ({
  id,
  title,
  content,
  date,
  updatedAt,
  type,
  onContentChange,
  onTitleChange,
  isViewingPage,
  sx,
}) => {
  const parsedContent = useMemo(() => {
    if (typeof content === "string") {
      try {
        return JSON.parse(content);
      } catch (error) {
        console.error("Failed to parse content:", error);
        return {
          type: type || "DOC",
          content: [
            { type: "paragraph", content: [{ type: "text", text: content }] },
          ],
        };
      }
    }
    return content || { type: type || "DOC", content: [{ type: "paragraph" }] };
  }, [content, type]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        ...sx,
      }}
    >
      <PageTitleArea
        id={id}
        title={title}
        date={date}
        updatedAt={updatedAt}
        type={type}
        onTitleChange={onTitleChange}
        isViewingPage={isViewingPage}
      />
      <BlockEditor
        initialContent={parsedContent}
        onContentChange={onContentChange}
      />
    </Box>
  );
};

export default Page;
