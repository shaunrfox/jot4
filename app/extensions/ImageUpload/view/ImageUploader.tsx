import { Spinner } from "~/components/ui/Spinner";
import { useDropZone, useFileUpload, useUploader } from "./hooks";
import Button from "~/components/Button";
import { ChangeEvent, useCallback } from "react";

import Box from "~/components/Box";
import Image from "~/components/icons/Image";
import Text from "~/components/Text";
import Upload from "~/components/icons/Upload";

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
        height: "250px",
        padding: 8,
        border: "2px dashed",
        borderColor: "gray.20",
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
