// TODO Update this to use the new UI components

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Surface } from "../Surface";

import styled from "@emotion/styled";
import { modes } from "~/utils/theme";
import { StyleProps, themeHelper } from "~/utils/styled";
import Box, { BoxProps } from "~/components/Box";
import Rule from "~/components/Rule";

export type PanelProps = BoxProps & {
  styleProps?: StyleProps;
  spacing?: "medium" | "small";
  noShadow?: boolean;
  asChild?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ asChild, children, spacing, noShadow, ...rest }, ref) => {
    const panelStyle = themeHelper({
      p: 2,
      outline: "10px solid red",
      ...(spacing === "small" && { p: 0.2 }),
    });

    const Comp = asChild ? Slot : Box;

    return (
      <Comp ref={ref} {...rest}>
        <Surface {...panelStyle} withShadow={!noShadow}>
          {children}
        </Surface>
      </Comp>
    );
  },
);

Panel.displayName = "Panel";

export const PanelDivider = ({
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <Rule {...rest} />;
};

PanelDivider.displayName = "PanelDivider";

export const PanelHeader = forwardRef<
  HTMLDivElement,
  { asChild?: boolean } & React.HTMLAttributes<HTMLDivElement>
>(({ asChild, children, ...rest }, ref) => {
  const headerStyles = themeHelper({
    borderBottom: "1px solid",
    borderColor: "gray.10",
    fontSize: 3,
    mb: 2,
    pb: 2,
  });

  const Comp = asChild ? Slot : Box;

  return (
    <Comp {...rest} {...headerStyles} ref={ref}>
      {children}
    </Comp>
  );
});

PanelHeader.displayName = "PanelHeader";

export const PanelSection = forwardRef<
  HTMLDivElement,
  { asChild?: boolean } & React.HTMLAttributes<HTMLDivElement>
>(({ asChild, children, ...rest }, ref) => {
  const sectionStyles = themeHelper({
    mt: 4,
    first: { mt: 1 },
  });

  const Comp = asChild ? Slot : Box;

  return (
    <Comp {...rest} {...sectionStyles} ref={ref}>
      {children}
    </Comp>
  );
});

PanelSection.displayName = "PanelSection";

export const PanelHeadline = forwardRef<
  HTMLDivElement,
  { asChild?: boolean } & React.HTMLAttributes<HTMLDivElement>
>(({ asChild, children, ...rest }, ref) => {
  const headlineStyles = themeHelper({
    color: "gray.80", // Default to light mode color
    fontSize: 0,
    mb: 2,
    ml: 1.5,
  });
  const Comp = asChild ? Slot : Box;

  return (
    <Comp {...rest} {...headlineStyles} ref={ref}>
      {children}
    </Comp>
  );
});

PanelHeadline.displayName = "PanelHeadline";

export const PanelFooter = forwardRef<
  HTMLDivElement,
  { asChild?: boolean } & React.HTMLAttributes<HTMLDivElement>
>(({ asChild, children, ...rest }, ref) => {
  const footerStyles = themeHelper({
    borderTop: "1px solid",
    borderColor: "black.10",
    fontSize: 3,
    mt: 2,
    pt: 2,
  });

  const Comp = asChild ? Slot : Box;

  return (
    <Comp {...rest} {...footerStyles} ref={ref}>
      {children}
    </Comp>
  );
});

PanelFooter.displayName = "PanelFooter";
