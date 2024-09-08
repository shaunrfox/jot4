// TODO Update this to use the new UI components

import * as Popover from "@radix-ui/react-popover";
import { icons } from "lucide-react";
import { forwardRef } from "react";
import { Surface } from "./Surface";
import { Toolbar } from "./Toolbar";
import { MenuItem } from "./Dropdown/MenuItem";
import Rule from "~/components/Rule";

export const Trigger = Popover.Trigger;
export const Portal = Popover.Portal;

export type MenuProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  triggerClassName?: string;
  customTrigger?: boolean;
  isOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
  withPortal?: boolean;
  tooltip?: string;
  isActive?: boolean;
};

export const Menu = ({
  customTrigger,
  trigger,
  triggerClassName,
  children,
  isOpen,
  withPortal,
  tooltip,
  onOpenChange,
}: MenuProps) => {
  return (
    <Popover.Root onOpenChange={onOpenChange}>
      {customTrigger ? (
        <Trigger asChild>{trigger}</Trigger>
      ) : (
        <Trigger asChild>
          <Toolbar.Button
            className={triggerClassName}
            tooltip={!isOpen ? tooltip : ""}
          >
            {trigger}
          </Toolbar.Button>
        </Trigger>
      )}
      {withPortal ? (
        <Popover.Portal>
          <Popover.Content asChild sideOffset={8}>
            <Surface
              data-testid="popover-content"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                minWidth: "15rem",
                maxHeight: "320px",
                p: 4,
                overflow: "auto",
                zIndex: 9999,
              }}
            >
              {children}
            </Surface>
          </Popover.Content>
        </Popover.Portal>
      ) : (
        <Popover.Content asChild sideOffset={8}>
          <Surface
            data-testid="popover-content"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              minWidth: "15rem",
              maxHeight: "320px",
              p: 4,
              overflow: "auto",
              zIndex: 9999,
            }}
          >
            {children}
          </Surface>
        </Popover.Content>
      )}
    </Popover.Root>
  );
};

Menu.displayName = "Menu";

export const Item = ({
  label,
  close = true,
  icon,
  iconComponent,
  disabled,
  onClick,
  isActive,
}: {
  label: string | React.ReactNode;
  icon?: keyof typeof icons;
  iconComponent?: React.ReactNode;
  close?: boolean;
  disabled?: boolean;
  onClick: () => void;
  isActive?: boolean;
}) => {
  const IconComponent = icon ? icon : null;
  const IconCustomComponent = iconComponent || null;

  const ItemComponent = close ? Popover.Close : Toolbar.Button;

  return (
    <ItemComponent
      sx={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}
      onClick={onClick}
      disabled={disabled}
      active={isActive}
    >
      {IconComponent && <IconComponent />}
      {IconCustomComponent}
      {label}
    </ItemComponent>
  );
};

export type CategoryTitle = {
  children: React.ReactNode;
};

export const CategoryTitle = ({ children }: CategoryTitle) => {
  return <MenuItem itemType="subheader">{children}</MenuItem>;
};

export const Divider = forwardRef<HTMLHRElement>((props, ref) => {
  return <Rule {...props} ref={ref} />;
});

Divider.displayName = "Divider";
