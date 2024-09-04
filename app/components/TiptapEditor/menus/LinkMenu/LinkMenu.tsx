import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";
import React, { useCallback, useState, useEffect } from "react";

import { MenuProps } from "../types";
import { LinkPreviewPanel } from "~/components/TiptapEditor/panels/LinkPreviewPanel";
import { LinkEditorPanel } from "~/components/TiptapEditor/panels";

export const LinkMenu = ({ editor, appendTo }: MenuProps): JSX.Element => {
  const [showEdit, setShowEdit] = useState(false);
  const [linkData, setLinkData] = useState({ href: "", target: "" });

  const updateLinkData = useCallback(() => {
    const { href, target } = editor.getAttributes("link");
    setLinkData({ href: href || "", target: target || "" });
  }, [editor]);

  useEffect(() => {
    updateLinkData();
    editor.on("selectionUpdate", updateLinkData);
    return () => {
      editor.off("selectionUpdate", updateLinkData);
    };
  }, [editor, updateLinkData]);

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive("link");
    console.log("Link is active:", isActive);
    console.log("Link attributes in shouldShow:", editor.getAttributes("link"));
    return isActive;
  }, [editor]);

  const handleEdit = useCallback(() => {
    setShowEdit(true);
  }, []);

  const onSetLink = useCallback(
    (url: string, openInNewTab?: boolean) => {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: openInNewTab ? "_blank" : "" })
        .run();
      setShowEdit(false);
      updateLinkData();
    },
    [editor, updateLinkData],
  );

  const onUnsetLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setShowEdit(false);
    updateLinkData();
    return null;
  }, [editor, updateLinkData]);

  console.log("Current link data:", linkData);

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="textMenu"
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        appendTo: () => {
          return appendTo?.current;
        },
        onHidden: () => {
          setShowEdit(false);
        },
      }}
    >
      {showEdit ? (
        <LinkEditorPanel
          initialUrl={linkData.href}
          initialOpenInNewTab={linkData.target === "_blank"}
          onSetLink={onSetLink}
        />
      ) : (
        <LinkPreviewPanel
          url={linkData.href}
          onClear={onUnsetLink}
          onEdit={handleEdit}
          openInNewTab={linkData.target === "_blank"}
        />
      )}
    </BaseBubbleMenu>
  );
};

export default LinkMenu;
