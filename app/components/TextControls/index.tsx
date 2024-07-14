// import { BubbleMenu } from "@tiptap/extension-bubble-menu";
import { BubbleMenu } from "@tiptap/react";
import React from "react";
import Box from "~/components/Box";
import { IconButton } from "../Button";
import Bold from "../icons/Bold";
import Italic from "../icons/Italic";
import Strike from "../icons/Strike";
import theme from "~/utils/theme";

const TextControls = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          p: 2,
          borderRadius: theme.radii[4],
          // add mode for color changes
          backgroundColor: "gray.5",
          boxShadow: theme.shadows.light_low,
        }}
      >
        <IconButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive("bold") ? "selected" : "hollow"}
          // className={editor.isActive("bold") ? "is-active" : ""}
        >
          <Bold />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive("bold") ? "selected" : "hollow"}
        >
          <Italic />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          variant={editor.isActive("bold") ? "selected" : "hollow"}
        >
          <Strike />
        </IconButton>
      </Box>
    </BubbleMenu>
  );
};

// const TextControls = BubbleMenu.extend({
//   name: "TextControls",
//   content: TextControlsMenu,
// });

export default TextControls;
