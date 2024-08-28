import React, { useMemo } from "react";
import Box from "~/components/Box";
import PageTitleArea from "~/components/PageTitleArea";
import BlockEditor from "~/components/BlockEditor";
import Rule from "~/components/Rule";

interface PageProps {
  title: string;
  content: string | Record<string, any>;
  date?: Date; // Add this line
  type?: string;
  onContentChange: (content: string) => void;
}

const Page: React.FC<PageProps> = ({
  title,
  content,
  date, // Add this line
  type,
  onContentChange,
}) => {
  console.log("Page props:", { title, content, date, type }); // Add this line

  const initialContent = useMemo(() => {
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
      }}
    >
      <PageTitleArea title={title} date={date} type={type} />
      <BlockEditor
        initialContent={initialContent}
        onContentChange={onContentChange}
      />
    </Box>
  );
};

export default React.memo(Page);
