import React, { useMemo, useEffect, useState } from "react";
import Box from "~/components/Box";
import PageTitleArea from "~/components/PageTitleArea";
import BlockEditor from "~/components/BlockEditor";
import Rule from "~/components/Rule";
import { StyleProps } from "~/utils/styled";

interface PageProps {
  id?: string;
  title?: string;
  content?: string | Record<string, any>;
  date?: Date;
  type?: string;
  onContentChange: (content: string) => void;
  sx?: StyleProps["sx"];
}

const Page: React.FC<PageProps> = ({
  id,
  title: initialTitle,
  content: initialContent,
  date: initialDate,
  type: initialType,
  onContentChange,
  sx,
}) => {
  const [pageData, setPageData] = useState({
    title: initialTitle,
    content: initialContent,
    date: initialDate,
    type: initialType,
  });

  useEffect(() => {
    async function fetchPage() {
      if (id) {
        try {
          const response = await fetch(`/api/pages/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch page");
          }
          const data = await response.json();
          setPageData(data);
        } catch (error) {
          console.error("Error fetching page:", error);
        }
      }
    }
    fetchPage();
  }, [id]);

  const { title, content, date, type } = pageData;

  console.log("Page props:", { id, title, content, date, type });

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
      <PageTitleArea id={id} title={title} date={date} type={type} />
      <BlockEditor
        initialContent={parsedContent}
        onContentChange={onContentChange}
      />
    </Box>
  );
};

export default React.memo(Page);
