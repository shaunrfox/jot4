"use client";

import React, { useEffect, useState, useRef } from "react";
import { themeHelper } from "~/utils/styled";
import Box from "~/components/Box";
import { EditorContent } from "@tiptap/react";
import { useBlockEditor } from "~/hooks/tiptap/useBlockEditor";
import EditorParsedContent from "./components/EditorParsedContent";
import { EditorContext } from "~/context/EditorContext";
import { ContentItemMenu, LinkMenu, TextMenu } from "../TiptapEditor/menus";
import { ColumnsMenu } from "~/extensions/MultiColumn/menus/ColumnsMenu";
import { TableRowMenu } from "~/extensions/Table/menus/TableRow";
import { TableColumnMenu } from "~/extensions/Table/menus/TableColumn";
import { ImageBlockMenu } from "~/extensions/ImageBlock/components/ImageBlockMenu";

export const BlockEditor = ({
  initialContent,
  onContentChange,
}: {
  initialContent: Record<string, any>;
  onContentChange: (content: string) => void;
}) => {
  const menuContainerRef = useRef(null);
  const { editor } = useBlockEditor({
    initialContent,
    onContentChange,
  });
  const [error, setError] = useState<Error | null>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  useEffect(() => {
    if (editor) {
      const errorHandler = (err: Error) => {
        console.error("Tiptap error:", err);
        setError(err);
      };
      editor.on("error", errorHandler);
      editor.on("transaction", () => {
        if (!isEditorReady) setIsEditorReady(true);
      });
      return () => {
        editor.off("error", errorHandler);
        editor.off("transaction");
      };
    }
  }, [editor, isEditorReady]);

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  if (!editor || !isEditorReady) {
    return <div>Loading editor...</div>;
  }

  const editorStyles = themeHelper({
    display: "flex",
    height: "100%",
    width: "100%",
    flex: 1,
    overflow: "hidden",

    ".tiptap": {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      gap: "10px",

      "> *": {
        position: "relative",
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        maxWidth: "650px",
        minWidth: "1px",
      },
    },
  });

  return (
    <EditorContext.Provider value={{ editor }}>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
        }}
        ref={menuContainerRef}
      >
        <Box sx={editorStyles}>
          <EditorContent
            editor={editor}
            style={{
              flex: 1,
              height: "100%",
              overflow: "hidden",
            }}
          />
          {isEditorReady && (
            <>
              <ContentItemMenu editor={editor} />
              <LinkMenu editor={editor} appendTo={menuContainerRef} />
              <TextMenu editor={editor} />
              <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
              <TableRowMenu editor={editor} appendTo={menuContainerRef} />
              <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
              <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
            </>
          )}
        </Box>
      </Box>
      {/* {isEditorReady && <EditorParsedContent editor={editor} />} */}
    </EditorContext.Provider>
  );
};

export default BlockEditor;
