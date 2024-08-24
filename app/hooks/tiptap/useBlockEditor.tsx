import { useEditor } from "@tiptap/react";
import { ExtensionKit } from "~/extensions/extension-kit";
import { UniqueID } from "@tiptap-pro/extension-unique-id";
import { useEffect, useCallback } from "react";

export const useBlockEditor = ({
  initialContent,
  onContentChange,
}: {
  initialContent: Record<string, any>;
  onContentChange: (content: string) => void;
}) => {
  const editor = useEditor({
    autofocus: true,
    extensions: [
      ...ExtensionKit({}),
      UniqueID.configure({
        types: [
          "doc",
          "heading",
          "paragraph",
          "codeBlock",
          "image",
          "bulletList",
          "orderedList",
          "taskList",
          "taskItem",
          "table",
          "blockquote",
          "blockquoteFigure",
          "horizontalRule",
          "imageBlock",
          "columns",
        ],
      }),
    ],
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
      },
    },
    content: initialContent,
    onCreate: ({ editor }) => {
      if (editor.isEmpty) {
        editor.commands.setContent(initialContent);
      }
    },
    onUpdate: ({ editor }) => {
      const content = JSON.stringify(editor.getJSON());
      onContentChange(content);
    },
    immediatelyRender: false, // Add this line to address SSR issue
  });

  const handleUpdate = useCallback(() => {
    if (editor) {
      const content = JSON.stringify(editor.getJSON());
      onContentChange(content);
    }
  }, [editor, onContentChange]);

  useEffect(() => {
    if (editor) {
      editor.on("update", handleUpdate);
      return () => {
        editor.off("update", handleUpdate);
      };
    }
  }, [editor, handleUpdate]);

  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  return { editor };
};
