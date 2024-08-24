"use client";

import React, { useEffect, useRef } from "react";
import { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface BlockEditorProps {
  initialContent: Record<string, any>;
  onContentChange: (content: string) => void;
}

const BlockEditor2: React.FC<BlockEditorProps> = ({
  initialContent,
  onContentChange,
}) => {
  const editorRef = useRef<Editor | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const editor = new Editor({
      element: elementRef.current,
      extensions: [StarterKit],
      content: initialContent,
      onUpdate: ({ editor }) => {
        const content = JSON.stringify(editor.getJSON());
        onContentChange(content);
      },
    });

    editorRef.current = editor;

    return () => {
      editor.destroy();
    };
  }, []);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor && !editor.isDestroyed) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent]);

  return <div ref={elementRef} />;
};

export default BlockEditor2;
