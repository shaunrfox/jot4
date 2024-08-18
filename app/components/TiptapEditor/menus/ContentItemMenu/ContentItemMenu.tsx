import { Toolbar } from "~/components/ui/Toolbar";
import DragHandle from "@tiptap-pro/extension-drag-handle-react";
import { Editor } from "@tiptap/react";

import * as Popover from "@radix-ui/react-popover";
import { Surface } from "~/components/ui/Surface";
import { MenuItem } from "~/components/ui/Dropdown";
import useContentItemActions from "./hooks/useContentItemActions";
import { useData } from "./hooks/useData";
import { useEffect, useState } from "react";
import Box from "~/components/Box";
import Gripper from "~/components/icons/Gripper";
import { StyleProps } from "~/utils/styled";
import Plus from "~/components/icons/Plus";
import Clipboard from "~/components/icons/Clipboard";
import Copy from "~/components/icons/Copy";
import Trash from "~/components/icons/Trash";
import Eraser from "~/components/icons/Eraser";

export type ContentItemMenuProps = {
  editor: Editor;
  sx?: StyleProps;
};

export const ContentItemMenu = ({ editor }: ContentItemMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useData();
  const actions = useContentItemActions(
    editor,
    data.currentNode,
    data.currentNodePos,
  );

  useEffect(() => {
    if (menuOpen) {
      editor.commands.setMeta("lockDragHandle", true);
    } else {
      editor.commands.setMeta("lockDragHandle", false);
    }
  }, [editor, menuOpen]);

  return (
    <DragHandle
      pluginKey="ContentItemMenu"
      editor={editor}
      onNodeChange={data.handleNodeChange}
      tippyOptions={{
        offset: [-2, 16],
        zIndex: 99,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Toolbar.Button onClick={actions.handleAdd}>
          <Plus />
        </Toolbar.Button>
        <Popover.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Popover.Trigger asChild>
            <Toolbar.Button>
              <Gripper />
            </Toolbar.Button>
          </Popover.Trigger>
          <Popover.Content side="bottom" align="start" sideOffset={8}>
            <Surface
              sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: "12rem",
                gap: 2,
              }}
            >
              <Popover.Close asChild>
                <MenuItem
                  itemType="action"
                  onClick={actions.resetTextFormatting}
                >
                  <Eraser />
                  Clear formatting
                </MenuItem>
              </Popover.Close>
              <Popover.Close asChild>
                <MenuItem
                  itemType="action"
                  onClick={actions.copyNodeToClipboard}
                >
                  <Clipboard />
                  Copy to clipboard
                </MenuItem>
              </Popover.Close>
              <Popover.Close asChild>
                <MenuItem itemType="action" onClick={actions.duplicateNode}>
                  <Copy />
                  Duplicate
                </MenuItem>
              </Popover.Close>
              <Toolbar.Divider horizontal />
              <Popover.Close asChild>
                <MenuItem itemType="action" onClick={actions.deleteNode}>
                  <Trash />
                  Delete
                </MenuItem>
              </Popover.Close>
            </Surface>
          </Popover.Content>
        </Popover.Root>
      </Box>
    </DragHandle>
  );
};
