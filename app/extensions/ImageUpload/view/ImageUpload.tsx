import { Editor, NodeViewWrapper } from "@tiptap/react";
import { useCallback } from "react";

import { ImageUploader } from "./ImageUploader";
import Box from "~/components/Box";

export const ImageUpload = ({
  getPos,
  editor,
}: {
  getPos: () => number;
  editor: Editor;
}) => {
  const onUpload = useCallback(
    (url: string) => {
      if (url) {
        editor
          .chain()
          .setImageBlock({ src: url })
          .deleteRange({ from: getPos(), to: getPos() })
          .focus()
          .run();
      }
    },
    [getPos, editor],
  );

  return (
    <NodeViewWrapper>
      <Box sx={{ p: 0, m: 0 }} data-drag-handle>
        <ImageUploader onUpload={onUpload} />
      </Box>
    </NodeViewWrapper>
  );
};

export default ImageUpload;
