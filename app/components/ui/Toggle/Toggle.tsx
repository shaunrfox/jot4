import React from "react";
import styled from "@emotion/styled";
import { modes } from "~/utils/theme";
import { StyleProps, themeHelper } from "~/utils/styled";
import Box, { BoxProps } from "~/components/Box";

export type ToggleProps = BoxProps & {
  styleProps?: StyleProps;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
};

const ToggleWrapper = styled(Box.withComponent("label"))<BoxProps>(
  ({ ...props }) =>
    themeHelper({
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 4,
      cursor: "pointer",
      userSelect: "none",
    })(props),
);

const Label = styled(Box.withComponent("span"))<BoxProps>(({ ...props }) =>
  themeHelper({
    color: props.theme?.mode === modes.dark ? "gray.20" : "gray.80",
    fontSize: 3,
  })(props),
);

const HiddenCheckbox = styled(Box.withComponent("input"))<BoxProps>(
  ({ ...props }) =>
    themeHelper({
      opacity: 0,
      width: 0,
      height: 0,
      position: "absolute",
    })(props),
);

const ToggleElement = styled(Box)<BoxProps>(({ ...props }) =>
  themeHelper({
    display: "inline-block",
    position: "relative",
    width: props.theme?.space[9],
    height: props.theme?.space[6],
    backgroundColor: props.theme?.mode === modes.dark ? "gray.80" : "gray.20",
    borderRadius: props.theme?.space[4],
    transition: "background-color 0.2s",

    "&::before": {
      content: '""',
      position: "absolute",
      width: props.theme?.space[5],
      height: props.theme?.space[5],
      left: props.theme?.space[2],
      bottom: props.theme?.space[2],
      backgroundColor: props.theme?.mode === modes.dark ? "gray.0" : "gray.100",
      borderRadius: "50%",
      transition: "transform 0.2s",
    },

    "input:checked + &": {
      backgroundColor: props.theme?.mode === modes.dark ? "gray.0" : "gray.100",
      "&::before": {
        transform: `translateX(${props.theme?.space[6]})`,
        backgroundColor:
          props.theme?.mode === modes.dark ? "gray.80" : "gray.20",
      },
    },
    "input:focus + &": {
      boxShadow: `0 0 0 2px ${
        props.theme?.mode === modes.dark ? "gray.40" : "gray.60"
      }`,
    },
  })(props),
);

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onCheckedChange,
  label,
  ...rest
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange(event.target.checked);
  };

  return (
    <ToggleWrapper {...rest}>
      <HiddenCheckbox
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <ToggleElement />
      {label && <Label>{label}</Label>}
    </ToggleWrapper>
  );
};
