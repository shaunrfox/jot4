import Box from "~/components/Box";

import { memo, useCallback, useState } from "react";
import { Input } from "~/components/Input";

export type ImageBlockWidthProps = {
  onChange: (value: number) => void;
  value: number;
};

export const ImageBlockWidth = memo(
  ({ onChange, value }: ImageBlockWidthProps) => {
    const [currentValue, setCurrentValue] = useState(value);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10);
        setCurrentValue(newValue);
        onChange(newValue);
      },
      [onChange],
    );

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          px: 4,
        }}
      >
        <Input
          sx={{
            height: "0.625rem",
            minHeight: "0.625rem",
            p: 0,
            backgroundColor: "gray.20",
            border: 0,
            borderRadius: 3,
            appearance: "none",
            fill: "gray.30",
            maxWidth: "150px",
            minWidth: "100px",
          }}
          type="range"
          min="25"
          max="100"
          step="25"
          onChange={handleChange}
          value={currentValue}
        />
        <Box
          as="span"
          sx={{
            fontSize: "2.5",
            color: "gray.50",
            userSelect: "none",
          }}
        >
          {currentValue}%
        </Box>
      </Box>
    );
  },
);

ImageBlockWidth.displayName = "ImageBlockWidth";
