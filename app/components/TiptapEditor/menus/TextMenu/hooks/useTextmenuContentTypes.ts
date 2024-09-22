import { Editor } from "@tiptap/react";
import { useMemo } from "react";
import { ContentPickerOptions } from "../components/ContentTypePicker";
import Paragraph from "~/components/icons/Paragraph";
import Heading1 from "~/components/icons/Heading1";
import Heading2 from "~/components/icons/Heading2";
import Heading3 from "~/components/icons/Heading3";
import ListBulleted from "~/components/icons/ListBulleted";
import ListNumbered from "~/components/icons/ListNumbered";
import ToDo from "~/components/icons/ToDo";

export const useTextmenuContentTypes = (editor: Editor) => {
  const options = useMemo<ContentPickerOptions>(() => {
    return [
      {
        type: "category",
        label: "Hierarchy",
        id: "hierarchy",
      },
      {
        icon: Paragraph,
        onClick: () =>
          editor
            .chain()
            .focus()
            .lift("taskItem")
            .liftListItem("listItem")
            .setParagraph()
            .run(),
        id: "paragraph",
        disabled: () => !editor.can().setParagraph(),
        isActive: () =>
          editor.isActive("paragraph") &&
          !editor.isActive("orderedList") &&
          !editor.isActive("bulletList") &&
          !editor.isActive("taskList"),
        label: "Paragraph",
        type: "option",
        hotkeys: ["⌘", "⌥", "0"],
      },
      {
        icon: Heading1,
        onClick: () =>
          editor
            .chain()
            .focus()
            .lift("taskItem")
            .liftListItem("listItem")
            .setHeading({ level: 1 })
            .run(),
        id: "heading1",
        disabled: () => !editor.can().setHeading({ level: 1 }),
        isActive: () => editor.isActive("heading", { level: 1 }),
        label: "Heading 1",
        type: "option",
        hotkeys: ["#"],
      },
      {
        icon: Heading2,
        onClick: () =>
          editor
            .chain()
            .focus()
            .lift("taskItem")
            .liftListItem("listItem")
            .setHeading({ level: 2 })
            .run(),
        id: "heading2",
        disabled: () => !editor.can().setHeading({ level: 2 }),
        isActive: () => editor.isActive("heading", { level: 2 }),
        label: "Heading 2",
        type: "option",
        hotkeys: ["##"],
      },
      {
        icon: Heading3,
        onClick: () =>
          editor
            .chain()
            .focus()
            .lift("taskItem")
            .liftListItem("listItem")
            .setHeading({ level: 3 })
            .run(),
        id: "heading3",
        disabled: () => !editor.can().setHeading({ level: 3 }),
        isActive: () => editor.isActive("heading", { level: 3 }),
        label: "Heading 3",
        type: "option",
        hotkeys: ["###"],
      },
      {
        type: "category",
        label: "Lists",
        id: "lists",
      },
      {
        icon: ListBulleted,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        id: "bulletList",
        disabled: () => !editor.can().toggleBulletList(),
        isActive: () => editor.isActive("bulletList"),
        label: "Bullet list",
        type: "option",
        hotkeys: ["*"],
      },
      {
        icon: ListNumbered,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        id: "orderedList",
        disabled: () => !editor.can().toggleOrderedList(),
        isActive: () => editor.isActive("orderedList"),
        label: "Numbered list",
        type: "option",
        hotkeys: ["1."],
      },
      {
        icon: ToDo,
        onClick: () => editor.chain().focus().toggleTaskList().run(),
        id: "taskList",
        disabled: () => !editor.can().toggleTaskList(),
        isActive: () => editor.isActive("taskList"),
        label: "Task List",
        type: "option",
        hotkeys: ["[", "]"],
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, editor.state]);

  return options;
};
