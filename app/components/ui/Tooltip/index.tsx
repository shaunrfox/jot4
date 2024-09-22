"use client";

import Tippy from "@tippyjs/react/headless";
import React, { useCallback } from "react";
import Box from "~/components/Box";
import Text from "~/components/Text";
import { useTheme } from "@emotion/react";
import { Hotkeys } from "~/components/Hotkeys";

import { TippyProps, TooltipProps } from "./types";

const isMac =
  typeof window !== "undefined"
    ? navigator.platform.toUpperCase().indexOf("MAC") >= 0
    : false;

export const Tooltip = ({
  children,
  enabled = true,
  title,
  shortcut,
  tippyOptions = {},
}: TooltipProps): JSX.Element => {
  const { mode } = useTheme();
  const renderTooltip = useCallback(
    (attrs: TippyProps) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          px: 4,
          py: 3,
          bg: mode === "dark" ? "gray.0" : "gray.80",
          color: mode === "dark" ? "gray.80" : "gray.0",
          borderRadius: 3,
          boxShadow: mode === "dark" ? "low_dark" : "low_light",
          zIndex: 999,
        }}
        tabIndex={-1}
        data-placement={attrs["data-placement"]}
        data-reference-hidden={attrs["data-reference-hidden"]}
        data-escaped={attrs["data-escaped"]}
      >
        {title && (
          <Text
            sx={{
              fontSize: 2,
              fontWeight: "normal",
              color: mode === "dark" ? "gray.80" : "gray.0",
            }}
          >
            {title}
          </Text>
        )}
        {shortcut && <Hotkeys hotkeys={shortcut} />}
      </Box>
    ),
    [shortcut, title, mode],
  );

  if (enabled) {
    return (
      <Tippy
        delay={100}
        offset={[0, 8]}
        touch={false}
        zIndex={99999}
        appendTo={document.body}
        {...tippyOptions}
        render={renderTooltip}
      >
        <Box as="span">{children}</Box>
      </Tippy>
    );
  }

  return <>{children}</>;
};

export default Tooltip;
