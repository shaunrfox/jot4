import Box from "~/components/Box";
import { Node } from "@tiptap/pm/model";
import { Editor, NodeViewWrapper } from "@tiptap/react";
import { useCallback, useRef } from "react";

interface ImageBlockViewProps {
  editor: Editor;
  getPos: () => number;
  node: Node & {
    attrs: {
      src: string;
    };
  };
  updateAttributes: (attrs: Record<string, string>) => void;
}

export const ImageBlockView = (props: ImageBlockViewProps) => {
  const { editor, getPos, node } = props;
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const { src } = node.attrs;

  const onClick = useCallback(() => {
    editor.commands.setNodeSelection(getPos());
  }, [getPos, editor.commands]);

  return (
    <NodeViewWrapper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: node.attrs.width,
          ...(node.attrs.align === "left" ? { ml: "0" } : { ml: "auto" }),
          ...(node.attrs.align === "right" ? { mr: "0" } : { mr: "auto" }),
          ...(node.attrs.align === "center"
            ? {
                ml: "auto",
                mr: "auto",
              }
            : {}),
        }}
      >
        <div contentEditable={false} ref={imageWrapperRef}>
          <Box
            as="img"
            sx={{ display: "block" }}
            src={src}
            alt=""
            onClick={onClick}
          />
        </div>
      </Box>
    </NodeViewWrapper>
  );
};

export default ImageBlockView;
