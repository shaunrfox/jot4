"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
// import { useFetcher } from "@remix-run/react";
// import { useDebounceFetcher } from "remix-utils/use-debounce-fetcher";

// import { useTheme } from "@emotion/react";
// import theme, { modes } from "~/utils/theme";
import { themeHelper } from "~/utils/styled";
import Box from "~/components/Box";

import { EditorContent, PureEditorContent } from "@tiptap/react";

// import { StarterKit } from "@tiptap/starter-kit";
// import { ListItem } from "@tiptap/extension-list-item";
// import { TextStyle } from "@tiptap/extension-text-style";
// import { Color } from "@tiptap/extension-color";
// import UniqueID from "@tiptap-pro/extension-unique-id";

import { TiptapProps } from "./types";

import { useBlockEditor } from "~/hooks/tiptap/useBlockEditor";
import EditorParsedContent from "./components/EditorParsedContent";
import { EditorContext } from "~/context/EditorContext";
import { ContentItemMenu } from "../TiptapEditor/menus";
import { LinkMenu } from "../TiptapEditor/menus";
import { TextMenu } from "../TiptapEditor/menus";
import { ColumnsMenu } from "~/extensions/MultiColumn/menus/ColumnsMenu";
import { TableRowMenu } from "~/extensions/Table/menus/TableRow";
import { TableColumnMenu } from "~/extensions/Table/menus/TableColumn";
import { ImageBlockMenu } from "~/extensions/ImageBlock/components/ImageBlockMenu";

// import "~/styles/index.css";

export const BlockEditor = ({ provider }: TiptapProps) => {
  const menuContainerRef = useRef(null);
  const editorRef = useRef<PureEditorContent | null>(null);

  const { editor, characterCount } = useBlockEditor({
    provider,
  });

  // const displayedUsers = users.slice(0, 3);

  const providerValue = useMemo(() => {
    return {};
  }, []);

  if (!editor) {
    return null;
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
      // ".ProseMirror-gapcursor": {
      //   position: "relative",
      //   marginLeft: "auto",
      //   marginRight: "auto",
      //   width: "100%",
      //   maxWidth: "650px",
      //   minWidth: "1px",
      // },
    },
  });

  // console.log("editor.state", editor.state);

  return (
    <EditorContext.Provider value={providerValue}>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
        }}
        ref={menuContainerRef}
      >
        <Box sx={editorStyles}>
          {/* <EditorHeader
            characters={characterCount.characters()}
            collabState={collabState}
            users={displayedUsers}
            words={characterCount.words()}
          /> */}
          <EditorContent
            editor={editor}
            ref={editorRef as React.RefObject<HTMLDivElement>}
            style={{
              flex: 1,
              height: "100%",
              overflow: "hidden",
            }}
          />
          {/* {editor && <TextControls editor={editor} />} */}
          <ContentItemMenu editor={editor} />
          <LinkMenu editor={editor} appendTo={menuContainerRef} />
          <TextMenu editor={editor} />
          <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
          <TableRowMenu editor={editor} appendTo={menuContainerRef} />
          <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
          <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
        </Box>
      </Box>
      <EditorParsedContent editor={editor} />
      {/* <div
        style={{
          position: "fixed",
          top: "60px",
          bottom: "10px",
          left: "10px",
          width: "400px",
          zIndex: 10000,
          display: "flex",
          flexDirection: "column",
          fontSize: "12px",
          borderLeft: "1px solid #ccc",
          padding: "0 10px 10px",
          backgroundColor: "#404040",
          color: "#fff",
          borderRadius: "5px",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <h2
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            position: "sticky",
            top: 0,
            backgroundColor: "#404040",
            padding: "10px",
          }}
        >
          Editor full JSON
        </h2>
        <pre
          style={{
            fontSize: "10px",
            color: "#fff",
            padding: "10px",
            backgroundColor: "#404040",
            borderRadius: "5px",
            maxWidth: "100%",
          }}
        >
          <code>{JSON.stringify(editor.state, null, 2)}</code>
        </pre>
      </div> */}
    </EditorContext.Provider>
  );
};

export default BlockEditor;
