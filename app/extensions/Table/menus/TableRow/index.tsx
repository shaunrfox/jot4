import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";
import React, { useCallback } from "react";
import * as PopoverMenu from "~/components/ui/PopoverMenu";

import { Toolbar } from "~/components/ui/Toolbar";
import { isRowGripSelected } from "./utils";
import { Icon } from "~/components/ui/Icon";
import {
  MenuProps,
  ShouldShowProps,
} from "~/components/TiptapEditor/menus/types";
import ArrowLineDown from "~/components/icons/ArrowLineDown";
import ArrowLineUp from "~/components/icons/ArrowLineUp";
import Trash from "~/components/icons/Trash";
import { Surface } from "~/components/ui/Surface";

export const TableRowMenu = React.memo(
  ({ editor, appendTo }: MenuProps): JSX.Element => {
    const shouldShow = useCallback(
      ({ view, state, from }: ShouldShowProps) => {
        if (!state || !from) {
          return false;
        }

        return isRowGripSelected({ editor, view, state, from });
      },
      [editor],
    );

    const onAddRowBefore = useCallback(() => {
      editor.chain().focus().addRowBefore().run();
    }, [editor]);

    const onAddRowAfter = useCallback(() => {
      editor.chain().focus().addRowAfter().run();
    }, [editor]);

    const onDeleteRow = useCallback(() => {
      editor.chain().focus().deleteRow().run();
    }, [editor]);

    return (
      <BaseBubbleMenu
        editor={editor}
        pluginKey="tableRowMenu"
        updateDelay={0}
        tippyOptions={{
          appendTo: () => {
            return appendTo?.current;
          },
          placement: "left",
          offset: [0, 15],
          popperOptions: {
            modifiers: [{ name: "flip", enabled: false }],
          },
        }}
        shouldShow={shouldShow}
      >
        <Surface sx={{ flexDirection: "column", minWidth: "10rem" }}>
          <PopoverMenu.Item
            iconComponent={<ArrowLineUp />}
            close={false}
            label="Add row before"
            onClick={onAddRowBefore}
          />
          <PopoverMenu.Item
            iconComponent={<ArrowLineDown />}
            close={false}
            label="Add row after"
            onClick={onAddRowAfter}
          />
          <PopoverMenu.Item
            iconComponent={<Trash />}
            close={false}
            label="Delete row"
            onClick={onDeleteRow}
          />
        </Surface>
      </BaseBubbleMenu>
    );
  },
);

TableRowMenu.displayName = "TableRowMenu";

export default TableRowMenu;
