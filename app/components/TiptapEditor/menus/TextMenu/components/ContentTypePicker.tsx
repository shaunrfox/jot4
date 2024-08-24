import { useMemo, useState, useCallback } from "react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { Toolbar } from "~/components/ui/Toolbar";
import { Surface } from "~/components/ui/Surface";
import { MenuItem } from "~/components/ui/Dropdown";
import ChevronDown from "~/components/icons/ChevronDown";
import ChevronUp from "~/components/icons/ChevronUp";
import ParagraphSmall from "~/components/icons/ParagraphSmall";
import { Hotkeys } from "~/components/Hotkeys";
import Box from "~/components/Box";

export type ContentTypePickerOption = {
  label: string;
  id: string;
  type: "option";
  disabled: () => boolean;
  isActive: () => boolean;
  onClick: () => void;
  icon: React.ComponentType<any>;
  hotkeys: string[];
};

export type ContentTypePickerCategory = {
  label: string;
  id: string;
  type: "category";
};

export type ContentPickerOptions = Array<
  ContentTypePickerOption | ContentTypePickerCategory
>;

export type ContentTypePickerProps = {
  options: ContentPickerOptions;
};

const isOption = (
  option: ContentTypePickerOption | ContentTypePickerCategory,
): option is ContentTypePickerOption => option.type === "option";
const isCategory = (
  option: ContentTypePickerOption | ContentTypePickerCategory,
): option is ContentTypePickerCategory => option.type === "category";

export const ContentTypePicker = ({ options }: ContentTypePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const activeItem = useMemo(
    () =>
      options.find((option) => option.type === "option" && option.isActive()),
    [options],
  );

  const ActiveIcon =
    activeItem?.type === "option" ? activeItem.icon : ParagraphSmall;

  return (
    <Dropdown.Root onOpenChange={handleOpenChange}>
      <Dropdown.Trigger asChild>
        <Toolbar.Button
          tooltip="Content type"
          active={isOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}
        >
          <ActiveIcon />
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </Toolbar.Button>
      </Dropdown.Trigger>
      <Dropdown.Content asChild>
        <Surface
          sx={{
            flexDirection: "column",
            gap: 3,
            p: 4,
            minWidth: "14rem",
          }}
        >
          {options.map((option) => {
            if (isOption(option)) {
              const OptionIcon = option.icon;
              return (
                <MenuItem
                  key={option.id}
                  onClick={option.onClick}
                  isActive={option.isActive()}
                >
                  <OptionIcon />
                  <Box sx={{ flexGrow: 1, textAlign: "left" }}>
                    {option.label}
                  </Box>
                  {option.hotkeys && option.hotkeys.length > 0 && (
                    <Hotkeys hotkeys={option.hotkeys} />
                  )}
                </MenuItem>
              );
            } else if (isCategory(option)) {
              return (
                <MenuItem itemType="subheader" key={option.id}>
                  {option.label}
                </MenuItem>
              );
            }
          })}
        </Surface>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
