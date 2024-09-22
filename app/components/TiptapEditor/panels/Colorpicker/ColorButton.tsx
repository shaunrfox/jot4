import { memo, useCallback, useState } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import theme from "~/utils/theme";
import Tooltip from "~/components/ui/Tooltip";
import Box from "~/components/Box";
import Text from "~/components/Text";

export type ColorButtonProps = {
  color?: string;
  active?: boolean;
  onColorChange?: (color: string) => void; // eslint-disable-line no-unused-vars
};

export const ColorButton = memo(
  ({ color, active, onColorChange }: ColorButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleColorChange = useCallback(
      (newColor: string) => {
        if (onColorChange) {
          onColorChange(newColor);
        }
        setIsOpen(false);
      },
      [onColorChange],
    );

    return (
      <Menu as={Box} sx={{ position: "relative", display: "inline-block" }}>
        <Tooltip title="Text color">
          <Menu.Button
            as={Box}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 3,
              py: 2,
              borderRadius: 3,
              bg: active ? "gray.5" : "transparent",
              "&:hover": { bg: "gray.5" },
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Box
              sx={{
                width: "1rem",
                height: "1rem",
                borderRadius: 2,
                bg: color || "gray.5",
                boxShadow: "low_light",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "gray.20",
              }}
            />
            <ChevronDownIcon
              style={{ width: "1rem", height: "1rem", marginLeft: "0.25rem" }}
            />
          </Menu.Button>
        </Tooltip>

        {isOpen && (
          <Menu.Items
            as={Box}
            sx={{
              position: "absolute",
              zIndex: 10,
              mt: 2,
              width: "14rem",
              origin: "top-right",
              borderRadius: 3,
              bg: "gray.0",
              boxShadow: "high_light",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "gray.10",
              outline: "none",
            }}
          >
            <Box sx={{ py: 1 }}>
              {Object.entries(theme.colors.text.light).map(
                ([colorName, colorValue]) => (
                  <Menu.Item key={colorName}>
                    {({ active }) => (
                      <Box
                        as="button"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          px: 4,
                          py: 2,
                          bg: active ? "gray.5" : "transparent",
                          "&:hover": { bg: "gray.5" },
                        }}
                        onClick={() => handleColorChange(colorValue)}
                      >
                        <Box
                          sx={{
                            width: "1rem",
                            height: "1rem",
                            borderRadius: 2,
                            mr: 2,
                            bg: colorValue,
                          }}
                        />
                        <Text sx={{ fontSize: 2, color: "gray.70" }}>
                          {colorName}
                        </Text>
                      </Box>
                    )}
                  </Menu.Item>
                ),
              )}
            </Box>
          </Menu.Items>
        )}
      </Menu>
    );
  },
);

ColorButton.displayName = "ColorButton";
