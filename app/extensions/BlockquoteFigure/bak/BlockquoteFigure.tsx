import { Node, mergeAttributes } from "@tiptap/core";
import { Figure } from "../Figure";
import React from "react";
import { useTheme } from "@emotion/react";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blockquoteFigure: {
      setBlockquote: () => ReturnType;
    };
  }
}

const Blockquote = Node.create({
  name: "blockquote",
  content: "paragraph+",
  group: "block",
  defining: true,
  parseHTML() {
    return [{ tag: "blockquote" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["blockquote", mergeAttributes(HTMLAttributes), 0];
  },
  addNodeView() {
    return ({ HTMLAttributes, children }) => (
      <blockquote {...HTMLAttributes}>{children}</blockquote>
    );
  },
});

const Figcaption = Node.create({
  name: "figcaption",
  content: "inline*",
  group: "block",
  defining: true,
  parseHTML() {
    return [{ tag: "figcaption" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["figcaption", mergeAttributes(HTMLAttributes), 0];
  },
  addNodeView() {
    return ({ HTMLAttributes, children }) => (
      <figcaption {...HTMLAttributes}>{children}</figcaption>
    );
  },
});

export const BlockquoteFigure = Figure.extend({
  name: "blockquoteFigure",
  group: "block",
  content: "blockquote figcaption",
  isolating: true,

  addExtensions() {
    return [Blockquote, Figcaption];
  },

  addAttributes() {
    return {
      ...this.parent?.(),
    };
  },

  parseHTML() {
    return [{ tag: "figure[data-type='blockquoteFigure']" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "figure",
      mergeAttributes(HTMLAttributes, { "data-type": this.name }),
      0,
    ];
  },

  addNodeView() {
    // const { mode } = useTheme();
    return ({ HTMLAttributes, children }) => {
      return (
        <figure
          {...HTMLAttributes}
          data-type={this.name}
          sx={{
            my: 14,
            // color: mode === "dark" ? "gray.5" : "gray.60",
            "& > blockquote, & > [data-type='blockquoteFigure'] > blockquote": {
              m: 0,
              "& > *:first-of-type": { mt: 0 },
              "& > *:last-of-type": { mb: 0 },
            },
          }}
        >
          {children}
        </figure>
      );
    };
  },

  addCommands() {
    return {
      setBlockquote:
        () =>
        ({ state, chain }) => {
          const position = state.selection.$from.start();
          const selectionContent = state.selection.content();

          return chain()
            .focus()
            .insertContent({
              type: this.name,
              content: [
                {
                  type: "blockquote",
                  content: selectionContent.content.toJSON() || [
                    { type: "paragraph" },
                  ],
                },
                {
                  type: "figcaption",
                  content: [{ type: "text", text: "Caption" }],
                },
              ],
            })
            .focus(position + 1)
            .run();
        },
    };
  },
});

export default BlockquoteFigure;
