import React, { useMemo } from "react";
import Box from "~/components/Box";
import PageTitleArea from "~/components/PageTitleArea";
import BlockEditor from "~/components/BlockEditor";

interface PageProps {
  title: string;
  content: string | Record<string, any>;
  type?: string;
  onContentChange: (content: string) => void;
}

const Page: React.FC<PageProps> = ({
  title,
  content,
  type,
  onContentChange,
}) => {
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
      <PageTitleArea title={title} type={type} />
      <BlockEditor
        initialContent={initialContent}
        onContentChange={onContentChange}
      />
    </Box>
  );
};

export default React.memo(Page);
