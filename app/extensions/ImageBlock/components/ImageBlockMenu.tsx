import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";
import { useCallback, useRef } from "react";
import { Instance, sticky } from "tippy.js";
import { v4 as uuid } from "uuid";

import { Toolbar } from "~/components/ui/Toolbar";
import { ImageBlockWidth } from "./ImageBlockWidth";
import { MenuProps } from "~/components/TiptapEditor/menus/types";
import { getRenderContainer } from "~/utils/tiptap/getRenderContainer";
import AlignLeft from "~/components/icons/AlignLeft";
import AlignCenter from "~/components/icons/AlignCenter";
import AlignRight from "~/components/icons/AlignRight";
import Rule from "~/components/Rule";
import Box from "~/components/Box";

export const ImageBlockMenu = ({
  editor,
  appendTo,
}: MenuProps): JSX.Element => {
  const menuRef = useRef<HTMLDivElement>(null);
  const tippyInstance = useRef<Instance | null>(null);

  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, "node-imageBlock");
    const rect =
      renderContainer?.getBoundingClientRect() ||
      new DOMRect(-1000, -1000, 0, 0);

    // console.log("renderContainer", renderContainer);
    // console.log("rect", rect);
    return rect;
  }, [editor]);

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive("imageBlock");
    // console.log("isActive", isActive);

    return isActive;
  }, [editor]);

  const onAlignImageLeft = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockAlign("left")
      .run();
  }, [editor]);

  const onAlignImageCenter = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockAlign("center")
      .run();
  }, [editor]);

  const onAlignImageRight = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockAlign("right")
      .run();
  }, [editor]);

  const onWidthChange = useCallback(
    (value: number) => {
      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        .setImageBlockWidth(value)
        .run();
    },
    [editor],
  );

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`imageBlockMenu-${uuid()}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 2],
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        getReferenceClientRect,
        onCreate: (instance: Instance) => {
          tippyInstance.current = instance;
        },
        appendTo: () => {
          return appendTo?.current;
        },
        plugins: [sticky],
        sticky: "popper",
      }}
    >
      <Toolbar.Wrapper
        // shouldShowContent={shouldShow()}
        ref={menuRef}
        data-testid="image-block-menu"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Toolbar.Button
            tooltip="Align image left"
            active={editor.isActive("imageBlock", { align: "left" })}
            onClick={onAlignImageLeft}
          >
            <AlignLeft />
          </Toolbar.Button>
          <Toolbar.Button
            tooltip="Align image center"
            active={editor.isActive("imageBlock", { align: "center" })}
            onClick={onAlignImageCenter}
          >
            <AlignCenter />
          </Toolbar.Button>
          <Toolbar.Button
            tooltip="Align image right"
            active={editor.isActive("imageBlock", { align: "right" })}
            onClick={onAlignImageRight}
          >
            <AlignRight />
          </Toolbar.Button>
          <Rule orientation="vertical" />
          <ImageBlockWidth
            onChange={onWidthChange}
            value={parseInt(editor.getAttributes("imageBlock").width)}
          />
        </Box>
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  );
};

export default ImageBlockMenu;
