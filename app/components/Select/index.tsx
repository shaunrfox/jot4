import React from "react";
import theme, { modes } from "~/utils/theme";
import { useTheme } from "@emotion/react";
import { type StyleProps } from "~/utils/styled";
import Box from "../Box";
import Button from "../Button";
import CaretDown from "../icons/CaretDown";
import Menu from "../Menu";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

export function Select({ value, onChange, options }: SelectProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <Button onClick={() => onChange(value)}>
        Select <CaretDown />
      </Button>
      <Menu options={options} />
    </Box>
  );
}
