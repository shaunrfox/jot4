import { Node } from "@tiptap/core";
import React from "react";

export const Quote = Node.create({
  name: "quote",

  content: "paragraph+",

  defining: true,

  marks: "",

  parseHTML() {
    return [
      {
        tag: "blockquote",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["blockquote", HTMLAttributes, 0];
  },

  addNodeView() {
    return ({ HTMLAttributes, children }) => (
      <blockquote
        sx={{
          color: "blue.70",
        }}
      >
        {children}
      </blockquote>
    );
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () => false,
    };
  },
});

export default Quote;
