import React from "react";
import styled from "@emotion/styled";
import { themeHelper, sxPropHelper, StyleProps } from "~/utils/styled";
import { useTheme } from "@emotion/react";
import { modes } from "~/utils/theme";
import Box from "../Box";
import Divider from "../icons/Divider";
import Text from "../Text";
import Check from "../icons/Check";

// Menu item types
// Icon left
// Icon right
// hotkeys
// selectable
// divider
// subheader

const { mode } = useTheme();

type SelectProps = {
  label: string;
  value: string;
  labelDetails: string;
  iconLeft?: React.ReactNode;
  hotKeys?: string[];
  divider?: boolean;
  subHeader?: boolean;
  sx?: StyleProps;
};

const MenuItem = ({
  label,
  labelDetails,
  iconLeft,
  hotKeys,
  divider,
  subHeader,
}: SelectProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        borderRadius: "4px",
        cursor: "pointer",
        backgroundColor: mode === modes.dark ? "gray.80" : "gray.0",
        "&:hover": {
          backgroundColor: mode === modes.dark ? "gray.70" : "gray.10",
        },
      }}
    >
      {subHeader && (
        <Text sx={{ color: mode === modes.dark ? "gray.40" : "gray.60" }}>
          {subHeader}
        </Text>
      )}
      {divider && <Divider />}
      {!divider && !subHeader && (
        <>
          {iconLeft && iconLeft}
          {Check && <Check />}
          <Text level={3}>
            {label}
            {labelDetails && (
              <Text sx={{ color: mode === modes.dark ? "gray.40" : "gray.60" }}>
                {labelDetails}
              </Text>
            )}
          </Text>

          {hotKeys && (
            <Box sx={{ display: "flex", gap: 1 }}>
              {hotKeys.map((hotKey) => (
                <Box
                  sx={{
                    backgroundColor:
                      mode === modes.dark ? "gray.40" : "gray.60",
                    color: mode === modes.dark ? "gray.80" : "gray.20",
                  }}
                  key={hotKey}
                >
                  {hotKey}
                </Box>
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

// MenuItem props

const Menu = ({ options }: { options: { value: string; label: string }[] }) => {
  // const { mode } = useTheme();

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
      {options.map((option) => (
        <MenuOption key={option.value} option={option} />
      ))}
    </MenuWrapper>
  );
};

export default Menu;
