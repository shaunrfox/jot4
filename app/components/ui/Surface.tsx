import { forwardRef } from "react";
import Box, { BoxProps } from "~/components/Box";
import { modes } from "~/utils/theme";
import { useTheme } from "@emotion/react";

export type SurfaceProps = BoxProps & {
  withShadow?: boolean;
  withBorder?: boolean;
};

interface SurfaceWithChildrenProps extends SurfaceProps {
  children?: React.ReactNode;
}

export const Surface = forwardRef<HTMLDivElement, SurfaceWithChildrenProps>(
  (
    {
      children,
      withShadow = true,
      withBorder = true,
      sx,
      ...props
    }: SurfaceWithChildrenProps & { children?: React.ReactNode },
    ref,
  ) => {
    const { mode } = useTheme();
    return (
      <Box
        ref={ref}
        sx={{
          display: "flex",
          backgroundColor: ({ mode }) =>
            mode === modes.dark ? "gray.80" : "gray.0",
          borderRadius: 4,
          boxShadow: withShadow
            ? mode === modes.dark
              ? "high_dark"
              : "high_light"
            : "none",
          border: withBorder ? "1px solid" : "none",
          borderColor: ({ mode }) =>
            mode === modes.dark ? "gray.70" : "gray.10",
          p: 3,
          gap: 3,
          ...sx,
        }}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

Surface.displayName = "Surface";
