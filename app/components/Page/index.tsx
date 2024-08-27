import React, { useMemo } from "react";
import Box from "~/components/Box";
import PageTitleArea from "~/components/PageTitleArea";
import BlockEditor from "~/components/BlockEditor";

interface PageProps {
  title: string;
  content: string | Record<string, any>;
  onContentChange: (content: string) => void;
}

const Page: React.FC<PageProps> = ({ title, content, onContentChange }) => {
  const initialContent = useMemo(() => {
    if (typeof content === "string") {
      try {
        return JSON.parse(content);
      } catch (error) {
        console.error("Failed to parse content:", error);
        return {
          type: "doc",
          content: [
            { type: "paragraph", content: [{ type: "text", text: content }] },
          ],
        };
      }
    }
    return content || { type: "doc", content: [{ type: "paragraph" }] };
  }, [content]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <PageTitleArea title={title} />
      <BlockEditor
        initialContent={initialContent}
        onContentChange={onContentChange}
      />
    </Box>
  );
};

export default React.memo(Page);
