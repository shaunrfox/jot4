import { useMemo, useState, useCallback } from "react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { Toolbar } from "~/components/ui/Toolbar";
import { Surface } from "~/components/ui/Surface";
import { MenuItem } from "~/components/ui/Dropdown";
import ChevronDown from "~/components/icons/ChevronDown";
import ChevronUp from "~/components/icons/ChevronUp";
import theme from "~/utils/theme";
import Box from "~/components/Box";
import Text from "~/components/Text";
import Check from "~/components/icons/Check";
import CharacterColor from "~/components/icons/CharacterColor";
import Highlight from "~/components/icons/Highlight";
import { useTheme } from "@emotion/react";

export type ColorPickerProps = {
  color?: string;
  onChange?: (color: string) => void;
  type?: "text" | "highlight";
};

export const ColorPicker = ({
  color,
  onChange,
  type = "text",
}: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mode } = useTheme();

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const handleColorChange = useCallback(
    (newColor: string) => {
      if (onChange) {
        onChange(newColor);
      }
      // setIsOpen(false);
    },
    [onChange],
  );

  const colorOptions = useMemo(
    () => [
      { label: "Default", value: null },
      ...Object.entries(
        type === "text"
          ? theme.colors.text[mode as keyof typeof theme.colors.text]
          : theme.colors.highlight[mode as keyof typeof theme.colors.highlight],
      ).map(([colorName, colorValue]) => ({
        label: colorName,
        value: colorValue,
      })),
    ],
    [type],
  );

  const selectedColor = useMemo(() => {
    const selectedOption = colorOptions.find(
      (option) => option.value === color,
    );
    return type === "text"
      ? selectedOption
        ? selectedOption.value
        : mode === "dark"
          ? "gray.0"
          : "gray.80"
      : selectedOption
        ? selectedOption.value
        : "transparent";
  }, [color, colorOptions]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Dropdown.Root open={isOpen} onOpenChange={handleOpenChange}>
        <Dropdown.Trigger asChild>
          <Toolbar.Button
            tooltip={type === "text" ? "Text color" : "Highlight color"}
            active={isOpen}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {type === "text" ? (
              <CharacterColor sx={{ fill: selectedColor }} />
            ) : (
              <Highlight sx={{ bg: selectedColor }} />
            )}
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </Toolbar.Button>
        </Dropdown.Trigger>
        <Dropdown.Content asChild>
          <Surface
            sx={{
              flexDirection: "column",
              gap: 3,
              p: 3,
              minWidth: "14rem",
            }}
          >
            {colorOptions.map((option) => (
              <MenuItem
                key={option.label}
                onClick={() => handleColorChange(option.value ?? "")}
                isActive={
                  option.value === null ? !color : color === option.value
                }
              >
                <Check
                  sx={{
                    mr: 3,
                    opacity:
                      option.value === null
                        ? !color
                          ? 1
                          : 0
                        : color === option.value
                          ? 1
                          : 0,
                  }}
                />
                <Box
                  sx={{
                    flexGrow: 1,
                    textAlign: "left",
                    bg: mode === "dark" ? "gray.80" : "gray.0",
                    px: 4,
                    py: 3,
                    mr: -3,
                    my: -2,
                    borderRadius: 2,
                  }}
                >
                  {type === "text" ? (
                    <Text sx={{ color: option.value }}>
                      {option.label.charAt(0).toUpperCase() +
                        option.label.slice(1)}
                    </Text>
                  ) : (
                    <Text
                      sx={{
                        bg: option.value,
                        width: "fit-content",
                        px: 3,
                        borderRadius: 2,
                      }}
                    >
                      {option.label.charAt(0).toUpperCase() +
                        option.label.slice(1)}
                    </Text>
                  )}
                </Box>
              </MenuItem>
            ))}
          </Surface>
        </Dropdown.Content>
      </Dropdown.Root>
    </Box>
  );
};

ColorPicker.displayName = "ColorPicker";
