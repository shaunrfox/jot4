import React, { useEffect, useState, RefObject } from "react";
import { Editor, EditorContent } from "@tiptap/react";
import Box from "~/components/Box";
import { EditorContext } from "~/context/EditorContext";
import { ContentItemMenu, LinkMenu, TextMenu } from "../../TiptapEditor/menus";
import { ColumnsMenu } from "~/extensions/MultiColumn/menus/ColumnsMenu";
import { TableRowMenu } from "~/extensions/Table/menus/TableRow";
import { TableColumnMenu } from "~/extensions/Table/menus/TableColumn";
import { ImageBlockMenu } from "~/extensions/ImageBlock/components/ImageBlockMenu";
import { themeHelper } from "~/utils/styled";
import SkeletonLoader from "./SkeletonLoader";

export const OptimizedBlockEditor = React.memo(
  ({
    editor,
    menuContainerRef,
  }: {
    editor: Editor | null;
    menuContainerRef: RefObject<HTMLDivElement>;
  }) => {
    const [error, setError] = useState<Error | null>(null);
    const [isEditorReady, setIsEditorReady] = useState(false);

    useEffect(() => {
      if (editor) {
        // console.log("Editor instance changed or initialized");
        const errorHandler = (err: Error) => {
          console.error("Tiptap error:", err);
          setError(err);
        };
        editor.on("error", errorHandler);
        editor.on("transaction", () => {
          if (!isEditorReady) {
            // console.log("Editor is ready");
            setIsEditorReady(true);
          }
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
      return <SkeletonLoader />;
    }

    const editorStyles = themeHelper({
      display: "flex",
      width: "100%",
      height: "100%",
      minHeight: "40vh",
      flex: 1,
      overflow: "hidden",

      ".tiptap": {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        gap: "0.75rem",

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
            <>
              <ContentItemMenu editor={editor} />
              <LinkMenu editor={editor} appendTo={menuContainerRef} />
              <TextMenu editor={editor} />
              <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
              <TableRowMenu editor={editor} appendTo={menuContainerRef} />
              <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
              <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
            </>
          </Box>
        </Box>
      </EditorContext.Provider>
    );
  },
);

OptimizedBlockEditor.displayName = "OptimizedBlockEditor";

export default OptimizedBlockEditor;
