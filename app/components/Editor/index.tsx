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
import { Extension } from "@tiptap/core";
import { StarterKit } from "@tiptap/starter-kit";
import TextControls from "~/components/TextControls";

import { ListItem } from "@tiptap/extension-list-item";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

// const editorEventsExtension = Extension.create({
//   onBeforeCreate({ editor }) {
//     // Before the view is created.
//   },
//   onCreate({ editor }) {
//     // The editor is ready.
//   },
//   onUpdate({ editor }) {
//     // The content has changed.
//     console.log(editor.getJSON());
//     handleEditorChange(editor.getJSON());
//   },
//   onSelectionUpdate({ editor }) {
//     // The selection has changed.
//   },
//   onTransaction({ editor, transaction }) {
//     // The editor state has changed.
//   },
//   onFocus({ editor, event }) {
//     // The editor is focused.
//   },
//   onBlur({ editor, event }) {
//     // The editor isn’t focused anymore.
//   },
//   onDestroy() {
//     // The editor is being destroyed.
//   },
//   onContentError({ editor, error, disableCollaboration }) {
//     // The editor content does not match the schema.
//   },
// });

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  // editorEventsExtension,
];

// const content = `
// <h2>
//   Hi there,
// </h2>
// <p>
//   this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
// </p>
// <ul>
//   <li>
//     That’s a bullet list with one …
//   </li>
//   <li>
//     … or two list items.
//   </li>
// </ul>
// <p>
//   Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
// </p>
// <pre><code class="language-css">body {
//   display: none;
// }</code></pre>
// <p>
//   I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
// </p>
// <blockquote>
//   Wow, that’s amazing. Good work, boy! 👏
//   <br />
//   — Mom
// </blockquote>
// `;

const Editor = (content: Content) => {
  const fetcher = useDebounceFetcher<Content>();

  const saveContent = (content: Content) => {
    fetcher.submit(
      { content: JSON.stringify(content) },
      { method: "post", action: "/app/models/api.save-content.ts" }
    );
  };

  const handleEditorChange = (content: Content) => {
    saveContent(content);
  };

  const editor = useEditor({
    extensions,
    content: content,
    onBeforeCreate({ editor }) {
      // Before the view is created.
    },
    onCreate({ editor }) {
      // The editor is ready.
    },
    onUpdate({ editor }) {
      // The content has changed.
      handleEditorChange(editor.getJSON());
    },
    onSelectionUpdate({ editor }) {
      // The selection has changed.
    },
    onTransaction({ editor, transaction }) {
      // The editor state has changed.
    },
    onFocus({ editor, event }) {
      // The editor is focused.
    },
    onBlur({ editor, event }) {
      // The editor isn’t focused anymore.
    },
    onDestroy() {
      // The editor is being destroyed.
    },
    onContentError({ editor, error, disableCollaboration }) {
      // The editor content does not match the schema.
    },
  });

  const editorJson = editor?.getJSON();
  console.log(editorJson);

  return (
    <>
      {editor && <TextControls editor={editor} />}
      <EditorContent editor={editor} />
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
