"use client";

import Tippy from "@tippyjs/react/headless";
import React, { useCallback } from "react";
import Box from "~/components/Box";
import Text from "~/components/Text";

import { TippyProps, TooltipProps } from "./types";

const isMac =
  typeof window !== "undefined"
    ? navigator.platform.toUpperCase().indexOf("MAC") >= 0
    : false;

const ShortcutKey = ({ children }: { children: string }): JSX.Element => {
  return (
    <Box
      as="kbd"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "1.25rem",
        height: "1.25rem",
        p: 1,
        fontSize: 1,
        fontWeight: "bold",
        lineHeight: "1",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "gray.20",
        borderBottomWidth: "2px",
        color: "gray.50",
      }}
    >
      {children === "Mod"
        ? isMac
          ? "⌘"
          : "Ctrl"
        : children === "Shift"
          ? "⇧"
          : children === "Alt"
            ? isMac
              ? "⌥"
              : "Alt"
            : children}
    </Box>
  );
};

export const Tooltip = ({
  children,
  enabled = true,
  title,
  shortcut,
  tippyOptions = {},
}: TooltipProps): JSX.Element => {
  console.log("Tooltip component rendered", { enabled, title, shortcut });

  const renderTooltip = useCallback(
    (attrs: TippyProps) => {
      console.log("Rendering tooltip with sx:", {
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: 4,
        py: 2,
        bg: "gray.90",
        border: "1px solid",
        borderColor: "gray.80",
        borderRadius: 4,
        boxShadow: "low_light",
        zIndex: 999,
        outline: "10px solid red",
      });

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            px: 4,
            py: 2,
            bg: "gray.90",
            border: "1px solid",
            borderColor: "gray.80",
            borderRadius: 4,
            boxShadow: "low_light",
            zIndex: 999,
          }}
          tabIndex={-1}
          data-placement={attrs["data-placement"]}
          data-reference-hidden={attrs["data-reference-hidden"]}
          data-escaped={attrs["data-escaped"]}
        >
          {title && (
            <Text sx={{ fontSize: 2, fontWeight: "normal", color: "gray.50" }}>
              {title}
            </Text>
          )}
          {shortcut && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {shortcut.map((shortcutKey) => (
                <ShortcutKey key={shortcutKey}>{shortcutKey}</ShortcutKey>
              ))}
            </Box>
          )}
        </Box>
      );
    },
    [shortcut, title],
  );

  if (enabled) {
    console.log("Tooltip is enabled, rendering Tippy");
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

  console.log("Tooltip is disabled, rendering children only");
  return <>{children}</>;
};

export default Tooltip;
