import { Editor } from "@tiptap/core";
import { ComponentType } from "react";

export interface Group {
  name: string;
  title: string;
  commands: Command[];
}

export interface Command {
  name: string;
  label: string;
  description: string;
  aliases?: string[];
  action: (editor: Editor) => void;
  shouldBeHidden?: (editor: Editor) => boolean;
  icon?: ComponentType;
  hotkeys?: string[];
}

export interface MenuListProps {
  editor: Editor;
  items: Group[];
  command: (command: Command) => void;
}
