import styled from "@emotion/styled";
import Box, { BoxProps } from "~/components/Box";
import Text from "~/components/Text";
import { themeHelper, sxPropHelper, StyleProps } from "~/utils/styled";
import { modes } from "~/utils/theme";
import React from "react";

export interface InputProps extends BoxProps {
  styleProps?: StyleProps;
  withLabel?: boolean;
  label?: string | React.ReactNode;
}

const StyledLabel = styled(Box.withComponent("label"))<BoxProps>(
  ({ ...props }) =>
    themeHelper({
      display: "flex",
      flexShrink: 0,
      alignItems: "center",
      px: 4,
      gap: 2,
      bg: props.theme?.mode === modes.dark ? "gray.90" : "gray.5",
      border: "1px solid",
      borderColor: props.theme?.mode === modes.dark ? "gray.70" : "gray.5",
      borderRadius: 3,
      width: "min-content",
      color: "gray.80",
      fontSize: "2.5",
      fontFamily: "default",
      "&:focus-within": {
        borderColor: props.theme?.mode === modes.dark ? "gray.60" : "blue.40",
      },
    })(props),
);

const StyledInput = styled(Box.withComponent("input"))<InputProps>(
  ({ ...props }) =>
    themeHelper({
      flex: 1,
      bg: props.theme?.mode === modes.dark ? "gray.90" : "gray.5",
      border: "1px solid",
      borderColor: props.theme?.mode === modes.dark ? "gray.70" : "gray.5",
      borderRadius: 3,
      px: 4,
      py: 3,
      minHeight: props.theme?.space[9],
      outline: "none",
      minWidth: "12rem",
      color: "gray.80",
      fontSize: "2.5",
      lineHeight: 4,
    })(props),
  sxPropHelper,
);

export const Input: React.FC<InputProps> = ({ withLabel, label, ...props }) => {
  const inputElement = <StyledInput {...props} />;

  if (withLabel && label) {
    return (
      <StyledLabel>
        {typeof label === "string" ? <Text>{label}</Text> : label}
        {inputElement}
      </StyledLabel>
    );
  }

  return inputElement;
};

Input.displayName = "Input";
