import { useEditor, Editor } from "@tiptap/react";
import { ExtensionKit } from "~/extensions/extension-kit";
import { UniqueID } from "@tiptap-pro/extension-unique-id";
import { useRef, useCallback } from "react";

export const useBlockEditor = ({
  initialContent,
  onContentChange,
}: {
  initialContent: Record<string, unknown>;
  onContentChange: (content: string) => void;
}) => {
  const editorRef = useRef<Editor | null>(null);
  const contentRef = useRef(JSON.stringify(initialContent));

  const handleUpdate = useCallback(() => {
    if (editorRef.current) {
      const content = JSON.stringify(editorRef.current.getJSON());
      if (content !== contentRef.current) {
        contentRef.current = content;
        onContentChange(content);
      }
    }
  }, [onContentChange]);

  const editor = useEditor({
    content: initialContent,
    autofocus: true,
    editorProps: {
      attributes: {
        class: "tiptap",
      },
    },
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
    onCreate: ({ editor }) => {
      editorRef.current = editor;
    },
    onUpdate: handleUpdate,
  });

  return { editor };
};
