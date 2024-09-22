"use client";

import { HocuspocusProvider } from "@hocuspocus/provider";

import { API } from "~/utils/tiptap";

import {
  BlockquoteFigure,
  CharacterCount,
  Color,
  Document,
  Dropcursor,
  Emoji,
  Figcaption,
  FileHandler,
  Focus,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalRule,
  ImageBlock,
  Link,
  Placeholder,
  Selection,
  SlashCommand,
  StarterKit,
  Subscript,
  Superscript,
  Table,
  TableOfContents,
  TableCell,
  TableHeader,
  TableRow,
  TextAlign,
  TextStyle,
  TrailingNode,
  Typography,
  Underline,
  emojiSuggestion,
  Columns,
  Column,
  TaskItem,
  TaskList,
} from ".";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { ImageUpload } from "./ImageUpload";
import { TableOfContentsNode } from "./TableOfContentsNode";
import { common, createLowlight } from "lowlight";
import { Extension } from "@tiptap/core";

const lowlight = createLowlight(common);

const TAB_CHAR = "\u0009";

const IndentHandler = Extension.create({
  name: "indentHandler",
  addKeyboardShortcuts() {
    return {
      Tab: ({ editor }) => {
        const { selection } = editor.state;
        const { $from } = selection;

        // Check if we're at the start of a list item
        if (editor.isActive("listItem") && $from.parentOffset === 0) {
          // Attempt to sink the list item
          const sinkResult = editor.chain().sinkListItem("listItem").run();

          // If sinking was successful, return true
          if (sinkResult) {
            return true;
          }
          // If sinking failed, we'll fall through to inserting a tab
        }

        // Insert a tab character
        editor
          .chain()
          .command(({ tr }) => {
            tr.insertText(TAB_CHAR);
            return true;
          })
          .run();

        // Prevent default behavior (losing focus)
        return true;
      },
      "Shift-Tab": ({ editor }) => {
        const { selection, doc } = editor.state;
        const { $from } = selection;
        const pos = $from.pos;

        // Check if we're at the start of a list item
        if (editor.isActive("listItem") && $from.parentOffset === 0) {
          // If so, lift the list item
          return editor.chain().liftListItem("listItem").run();
        }

        // Check if the previous character is a tab
        if (doc.textBetween(pos - 1, pos) === TAB_CHAR) {
          // If so, delete it
          editor
            .chain()
            .command(({ tr }) => {
              tr.delete(pos - 1, pos);
              return true;
            })
            .run();
          return true;
        }

        // Prevent default behavior (losing focus)
        return true;
      },
    };
  },
});

interface ExtensionKitProps {
  provider?: HocuspocusProvider | null;
  userId?: string;
  userName?: string;
  userColor?: string;
}

// copied from ~/lib/api in test app
// export class API {
//   public static uploadImage = async () => {
//     await new Promise(r => setTimeout(r, 500))
//     return '/placeholder-image.jpg'
//   }
// }

export const ExtensionKit = ({ provider }: ExtensionKitProps) => [
  Document,
  Columns,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Column,
  Selection,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  HorizontalRule,
  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    // history: false,
    gapcursor: true,
    codeBlock: false,
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: null,
  }),
  IndentHandler,
  TextStyle,
  FontSize,
  FontFamily,
  Color,
  TrailingNode,
  Link.configure({
    openOnClick: false,
  }),
  Highlight.configure({ multicolor: true }),
  Underline,
  CharacterCount.configure({ limit: 50000 }),
  TableOfContents,
  TableOfContentsNode,
  ImageUpload.configure({
    clientId: provider?.document?.clientID,
  }),
  ImageBlock,
  FileHandler.configure({
    allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
    onDrop: (currentEditor, files, pos) => {
      files.forEach(async () => {
        const url = await API.uploadImage();

        currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run();
      });
    },
    onPaste: (currentEditor, files) => {
      files.forEach(async () => {
        const url = await API.uploadImage();

        return currentEditor
          .chain()
          .setImageBlockAt({
            pos: currentEditor.state.selection.anchor,
            src: url,
          })
          .focus()
          .run();
      });
    },
  }),
  Emoji.configure({
    enableEmoticons: true,
    suggestion: emojiSuggestion,
  }),
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {};
    },
  }).configure({
    types: ["heading", "paragraph"],
  }),
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Typography,
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => "",
  }),
  SlashCommand,
  Focus,
  Figcaption,
  BlockquoteFigure,
  Dropcursor.configure({
    width: 2,
    class: "ProseMirror-dropcursor border-black",
  }),
];

export default ExtensionKit;
