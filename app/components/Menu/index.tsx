import React from "react";
import styled from "@emotion/styled";
import { themeHelper, sxPropHelper, StyleProps } from "~/utils/styled";
import { useTheme } from "@emotion/react";
import { modes } from "~/utils/theme";
import Box from "../Box";

const Menu = ({ options }: { options: { value: string; label: string }[] }) => {
  const { mode } = useTheme();

  // Menu item types
  // Icon left
  // Icon right
  // hotkeys
  // selectable
  // divider
  // subheader

  const MenuWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          width: "fit-content",
          zIndex: "100",
          backgroundColor: mode === modes.dark ? "gray.80" : "gray.0",
          border: "1px solid",
          borderColor: mode === modes.dark ? "gray.70" : "gray.10",
          borderRadius: 4,
          boxShadow: mode === modes.dark ? "high_dark" : "high_light",
        }}
      >
        {children}
      </Box>
    );
  };

  const MenuOption = ({
    option,
  }: {
    option: { value: string; label: string };
  }) => {
    return (
      <Box
        key={option.value}
        sx={{
          px: 3,
          py: 2,
          fontSize: 1,
          cursor: "pointer",
          ":hover": {
            bg: mode === modes.dark ? "gray.70" : "gray.10",
          },
        }}
      >
        {option.label}
      </Box>
    );
  };

  return (
    <MenuWrapper>
      Menu
      {options.map((option) => (
        <MenuOption key={option.value} option={option} />
      ))}
    </MenuWrapper>
  );
};

export default Menu;
