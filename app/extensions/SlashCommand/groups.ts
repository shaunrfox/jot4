import { Group } from "./types";
import Heading1 from "~/components/icons/Heading1/index";
import Heading2 from "~/components/icons/Heading2/index";
import Heading3 from "~/components/icons/Heading3/index";
import ListBulleted from "~/components/icons/ListBulleted/index";
import ListNumbered from "~/components/icons/ListNumbered/index";
import ToDo from "~/components/icons/ToDo/index";
import Blockquote from "~/components/icons/Blockquote/index";
import Code from "~/components/icons/Code/index";
import Table from "~/components/icons/Table/index";
import Image from "~/components/icons/Image/index";
import Columns from "~/components/icons/Columns/index";
import Divider from "~/components/icons/Divider/index";
import Placeholder from "~/components/icons/Placeholder";
import Paragraph from "~/components/icons/Paragraph";
console.log("Heading1 icon:", Heading1);

export const GROUPS: Group[] = [
  {
    name: "format",
    title: "Format",
    commands: [
      {
        name: "paragraph",
        label: "Paragraph",
        icon: Paragraph,
        description: "Default paragraph text",
        aliases: ["p"],
        action: (editor) => {
          editor.chain().focus().setParagraph().run();
        },
        hotkeys: ["⌘", "⌥", "0"],
      },
      {
        name: "heading1",
        label: "Heading 1",
        icon: Heading1,
        description: "High priority section title",
        aliases: ["h1"],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 1 }).run();
        },
        hotkeys: ["#"],
      },
      {
        name: "heading2",
        label: "Heading 2",
        icon: Heading2,
        description: "Medium priority section title",
        aliases: ["h2"],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 2 }).run();
        },
        hotkeys: ["##"],
      },
      {
        name: "heading3",
        label: "Heading 3",
        icon: Heading3,
        description: "Low priority section title",
        aliases: ["h3"],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 3 }).run();
        },
        hotkeys: ["###"],
      },
      {
        name: "bulletList",
        label: "Bullet List",
        icon: ListBulleted,
        description: "Unordered list of items",
        aliases: ["ul"],
        action: (editor) => {
          editor.chain().focus().toggleBulletList().run();
        },
        hotkeys: ["*"],
      },
      {
        name: "numberedList",
        label: "Numbered List",
        icon: ListNumbered,
        description: "Ordered list of items",
        aliases: ["ol"],
        action: (editor) => {
          editor.chain().focus().toggleOrderedList().run();
        },
        hotkeys: ["1."],
      },
      {
        name: "taskList",
        label: "Task List",
        icon: ToDo,
        description: "Task list with todo items",
        aliases: ["todo"],
        action: (editor) => {
          editor.chain().focus().toggleTaskList().run();
        },
        hotkeys: ["[", "]"],
      },
      {
        name: "blockquote",
        label: "Blockquote",
        icon: Blockquote,
        description: "Element for quoting",
        action: (editor) => {
          editor.chain().focus().setBlockquote().run();
        },
        hotkeys: ["⌘", ">"],
      },
      {
        name: "codeBlock",
        label: "Code Block",
        icon: Code,
        description: "Code block with syntax highlighting",
        shouldBeHidden: (editor) => editor.isActive("columns"),
        action: (editor) => {
          editor.chain().focus().setCodeBlock().run();
        },
        hotkeys: ["```", "```"],
      },
    ],
  },
  {
    name: "insert",
    title: "Insert",
    commands: [
      {
        name: "table",
        label: "Table",
        icon: Table,
        description: "Insert a table",
        shouldBeHidden: (editor) => editor.isActive("columns"),
        action: (editor) => {
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: false })
            .run();
        },
      },
      {
        name: "image",
        label: "Image",
        icon: Image,
        description: "Insert an image",
        aliases: ["img"],
        action: (editor) => {
          editor.chain().focus().setImageUpload().run();
        },
      },
      {
        name: "columns",
        label: "Columns",
        icon: Columns,
        description: "Add two column content",
        aliases: ["cols"],
        shouldBeHidden: (editor) => editor.isActive("columns"),
        action: (editor) => {
          editor
            .chain()
            .focus()
            .setColumns()
            .focus(editor.state.selection.head - 1)
            .run();
        },
      },
      {
        name: "horizontalRule",
        label: "Horizontal Rule",
        icon: Divider,
        description: "Insert a horizontal divider",
        aliases: ["hr"],
        action: (editor) => {
          editor.chain().focus().setHorizontalRule().run();
        },
      },
      {
        name: "toc",
        label: "Table of Contents",
        icon: Placeholder,
        aliases: ["outline"],
        description: "Insert a table of contents",
        shouldBeHidden: (editor) => editor.isActive("columns"),
        action: (editor) => {
          editor.chain().focus().insertTableOfContents().run();
        },
      },
    ],
  },
];

export default GROUPS;
