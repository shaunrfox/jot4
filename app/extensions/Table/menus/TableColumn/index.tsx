import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";
import React, { useCallback } from "react";
import * as PopoverMenu from "~/components/ui/PopoverMenu";

import { isColumnGripSelected } from "./utils";
import {
  MenuProps,
  ShouldShowProps,
} from "~/components/TiptapEditor/menus/types";
import ArrowLineLeft from "~/components/icons/ArrowLineLeft";
import ArrowLineRight from "~/components/icons/ArrowLineRight";
import Trash from "~/components/icons/Trash";
import { Surface } from "~/components/ui/Surface";

export const TableColumnMenu = React.memo(
  ({ editor, appendTo }: MenuProps): JSX.Element => {
    const shouldShow = useCallback(
      ({ view, state, from }: ShouldShowProps) => {
        if (!state) {
          return false;
        }

        return isColumnGripSelected({ editor, view, state, from: from || 0 });
      },
      [editor],
    );

    const onAddColumnBefore = useCallback(() => {
      editor.chain().focus().addColumnBefore().run();
    }, [editor]);

    const onAddColumnAfter = useCallback(() => {
      editor.chain().focus().addColumnAfter().run();
    }, [editor]);

    const onDeleteColumn = useCallback(() => {
      editor.chain().focus().deleteColumn().run();
    }, [editor]);

    return (
      <BaseBubbleMenu
        editor={editor}
        pluginKey="tableColumnMenu"
        updateDelay={0}
        tippyOptions={{
          appendTo: () => {
            return appendTo?.current;
          },
          offset: [0, 15],
          popperOptions: {
            modifiers: [{ name: "flip", enabled: false }],
          },
        }}
        shouldShow={shouldShow}
      >
        <Surface sx={{ flexDirection: "column", minWidth: "10rem" }}>
          <PopoverMenu.Item
            iconComponent={<ArrowLineLeft />}
            close={false}
            label="Add column before"
            onClick={onAddColumnBefore}
          />
          <PopoverMenu.Item
            iconComponent={<ArrowLineRight />}
            close={false}
            label="Add column after"
            onClick={onAddColumnAfter}
          />
          <PopoverMenu.Item
            iconComponent={<Trash />}
            close={false}
            label="Delete column"
            onClick={onDeleteColumn}
          />
        </Surface>
      </BaseBubbleMenu>
    );
  },
);

TableColumnMenu.displayName = "TableColumnMenu";

export default TableColumnMenu;
