// TODO Update this to use the new UI components

import { Spinner } from "~/components/ui/Spinner";
import { useDropZone, useFileUpload, useUploader } from "./hooks";
import Button from "~/components/Button";
import { Icon } from "~/components/ui/Icon";
import { cn } from "~/utils/tiptap";
import { ChangeEvent, useCallback } from "react";

import styled from "@emotion/styled";
import { modes } from "~/utils/theme";
import { StyleProps, themeHelper } from "~/utils/styled";
import Box, { BoxProps } from "~/components/Box";
import Image from "~/components/icons/Image";
import Text from "~/components/Text";
import Upload from "~/components/icons/Upload";
import { HEX8 } from "~/utils/theme";

export const ImageUploader = ({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) => {
  const { loading, uploadFile } = useUploader({ onUpload });
  const { handleUploadClick, ref } = useFileUpload();
  const { draggedInside, onDrop, onDragEnter, onDragLeave } = useDropZone({
    uploader: uploadFile,
  });

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      e.target.files ? uploadFile(e.target.files[0]) : null,
    [uploadFile],
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          minHeight: "10rem",
          backgroundColor: "gray.10",
        }}
      >
        <Spinner size={1.5} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        maxWidth: "100%",
        // maxHeight: "300px",
        height: "250px",
        padding: 8,
        border: "2px dashed",
        borderColor: "gray.20",
        // backgroundColor: HEX8("mint.10", 0.125),
        borderRadius: "1rem",
        ...(draggedInside && {
          backgroundColor: "blue.5",
          borderColor: "blue.40",
        }),
      }}
      onDrop={onDrop}
      onDragOver={onDragEnter}
      onDragLeave={onDragLeave}
      contentEditable={false}
    >
      <Image sx={{ width: "4rem", height: "4rem", opacity: 0.3 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Text
          sx={{
            fontSize: 3,
            fontWeight: "medium",
            textAlign: "center",
            color: "gray.40",
          }}
        >
          {draggedInside ? "Drop image here" : "Drag and drop or"}
        </Text>
        <Button
          disabled={draggedInside}
          onClick={handleUploadClick}
          variant="primary"
        >
          <Upload />
          Upload an image
        </Button>
      </Box>
      <Box
        as="input"
        sx={{
          width: 0,
          height: 0,
          overflow: "hidden",
          opacity: 0,
        }}
        ref={ref}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.gif"
        onChange={onFileChange}
      />
    </Box>
  );
};

export default ImageUploader;
