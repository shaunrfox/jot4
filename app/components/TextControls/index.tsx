import { BubbleMenu } from "@tiptap/react";
import React from "react";
import theme, { modes } from "~/utils/theme";
import { useTheme } from "@emotion/react";
import Box from "~/components/Box";
import { IconButton } from "../Button";
import Bold from "../icons/Bold";
import Italic from "../icons/Italic";
import Strike from "../icons/Strike";
import Underline from "../icons/Underline";
import Code from "../icons/Code";
import Rule from "~/components/Rule";

const TextControls = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const { mode } = useTheme();

  // console.log("Editor object:", editor);
  // console.log("Is bold active:", editor?.isActive("bold"));

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          p: 2,
          borderRadius: theme.radii[4],
          backgroundColor: mode === modes.dark ? "gray.80" : "gray.5",
          boxShadow: mode === modes.dark ? "low_dark" : "low_light",
        }}
      >
        <IconButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive("bold") ? "selected" : "hollow"}
        >
          <Bold />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive("italic") ? "selected" : "hollow"}
        >
          <Italic />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          variant={editor.isActive("strike") ? "selected" : "hollow"}
        >
          <Strike />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          variant={editor.isActive("underline") ? "selected" : "hollow"}
        >
          <Underline />
        </IconButton>
        <Rule variant="vertical" />
        <IconButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          variant={editor.isActive("code") ? "selected" : "hollow"}
        >
          <Code />
        </IconButton>
      </Box>
    </BubbleMenu>
  );
};

export default TextControls;
