import React, { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { useDebounceFetcher } from "remix-utils/use-debounce-fetcher";

import { useTheme } from "@emotion/react";

import theme, { modes } from "~/utils/theme";

import {
  useEditor,
  useCurrentEditor,
  EditorProvider,
  EditorContent,
  Content,
  BubbleMenu,
} from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TextControls from "~/components/TextControls";

import { ListItem } from "@tiptap/extension-list-item";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const Editor = (content: Content) => {
  const fetcher = useDebounceFetcher<Content>();

  const saveContent = (content: Content) => {
    fetcher.submit(
      { content: JSON.stringify(content) },
      { method: "post", action: "/api/save-content" }
    );
  };

  const handleEditorChange = (content: Content) => {
    saveContent(content);
  };

  const editor = useEditor({
    extensions,
    content: content,
    autofocus: true,
    onUpdate({ editor }) {
      handleEditorChange(editor.getJSON());
    },
    onBlur({ editor, event }) {
      // handleEditorChange(editor.getJSON());
    },
  });

  const editorJson = editor?.getJSON();

  return (
    <>
      <EditorContent editor={editor} />
      {editor && <TextControls editor={editor} />}
      {/* format JSON to be easier to read */}
      {editorJson && (
        <pre
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            width: "400px",
            fontSize: ".8rem",
            zIndex: 1,
            overflow: "scroll",
          }}
        >
          <code>{JSON.stringify(editorJson, null, 2)}</code>
        </pre>
      )}
    </>
  );
};

export default Editor;
