"use client";

import React, { useRef, useEffect } from "react";
import debounce from "lodash/debounce";
import { useBlockEditor } from "~/hooks/tiptap/useBlockEditor";
import { OptimizedBlockEditor } from "./components/OptimizedBlockEditor";

export const BlockEditor = React.memo(
  ({
    initialContent,
    onContentChange,
  }: {
    initialContent: Record<string, unknown>;
    onContentChange: (content: string) => void;
  }) => {
    const menuContainerRef = useRef<HTMLDivElement | null>(null);
    const debouncedOnContentChangeRef = useRef(
      debounce((content: string) => {
        onContentChange(content);
      }, 1000),
    );

    const { editor } = useBlockEditor({
      initialContent,
      onContentChange: debouncedOnContentChangeRef.current,
    });

    // useEffect(() => {
    //   return () => {
    //     debouncedOnContentChangeRef.current.cancel();
    //   };
    // }, []);

    useEffect(() => {
      if (editor) {
        console.log("Editor initialized with content:", editor.getJSON());
      }
    }, [editor]);

    return (
      <OptimizedBlockEditor
        editor={editor}
        menuContainerRef={menuContainerRef}
      />
    );
  },
);

BlockEditor.displayName = "BlockEditor";

export default BlockEditor;
