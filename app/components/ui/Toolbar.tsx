import React, { HTMLProps, ReactNode, forwardRef } from "react";
import { SystemStyleObject } from "@styled-system/css";
import { themeHelper } from "~/utils/styled";

import { Surface } from "./Surface";
import Button, { ButtonProps } from "~/components/Button";
import Tooltip from "./Tooltip";
import Rule from "~/components/Rule";

export type ToolbarWrapperProps = {
  shouldShowContent?: boolean;
  isVertical?: boolean;
  sx?: SystemStyleObject;
} & HTMLProps<HTMLDivElement>;

const ToolbarWrapper = forwardRef<HTMLDivElement, ToolbarWrapperProps>(
  (
    { shouldShowContent = true, children, isVertical = false, sx, ...rest },
    ref,
  ) => {
    console.log(
      "ToolbarWrapper rendering, shouldShowContent:",
      shouldShowContent,
    );
    return (
      shouldShowContent && (
        <Surface
          sx={themeHelper([
            {
              display: "flex",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              lineHeight: "none",
              gap: 0.5,
              color: "gray.80",
              ...(isVertical
                ? { flexDirection: "column", p: 2 }
                : { flexDirection: "row", p: 1 }),
            },
            sx,
          ])}
          {...rest}
          ref={ref}
        >
          {console.log("ToolbarWrapper Surface rendering")}
          {children}
        </Surface>
      )
    );
  },
);

ToolbarWrapper.displayName = "Toolbar";

export type ToolbarDividerProps = {
  horizontal?: boolean;
} & HTMLProps<HTMLDivElement>;

const ToolbarDivider = forwardRef<HTMLDivElement, ToolbarDividerProps>(
  ({ horizontal = true, ...rest }, ref) => {
    return (
      <Rule
        orientation={horizontal ? "horizontal" : "vertical"}
        ref={ref}
        {...rest}
      />
    );
  },
);

ToolbarDivider.displayName = "Toolbar.Divider";

interface ToolbarButtonProps extends ButtonProps {
  children: ReactNode;
  variant?: ButtonProps["variant"];
  iconButton?: boolean;
  active?: boolean;
  size?: ButtonProps["size"];
  tooltip?: string;
  tooltipShortcut?: string[];
}

const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  (
    {
      children,
      variant = "hollow",
      iconButton = true,
      size = "small",
      tooltip,
      tooltipShortcut,
      active,
      ...rest
    },
    ref,
  ) => {
    const content = (
      <Button
        variant={variant}
        iconButton={iconButton}
        active={active}
        size={size}
        ref={ref}
        {...rest}
      >
        {children}
      </Button>
    );

    if (tooltip) {
      return (
        <Tooltip title={tooltip} shortcut={tooltipShortcut} enabled={true}>
          {content}
        </Tooltip>
      );
    }

    return content;
  },
);

ToolbarButton.displayName = "ToolbarButton";

export const Toolbar = {
  Wrapper: ToolbarWrapper,
  Divider: ToolbarDivider,
  Button: ToolbarButton,
};
