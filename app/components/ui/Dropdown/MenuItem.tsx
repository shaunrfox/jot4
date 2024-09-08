import Button from "~/components/Button";
import { useTheme } from "@emotion/react";
import Text from "~/components/Text";
import { StyleProps } from "~/utils/styled";
import Rule from "~/components/Rule";

export const MenuItem = ({
  children,
  isActive,
  onClick,
  disabled,
  itemType,
  sx,
}: {
  children?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  itemType?: "singleSelect" | "action" | "subheader" | "divider";
  sx?: StyleProps["sx"];
}) => {
  const { mode } = useTheme();

  if (itemType === "divider") {
    return <Rule />;
  }

  if (itemType === "subheader") {
    return (
      <Text
        level={2}
        sx={{
          color: mode === "dark" ? "gray.30" : "gray.40",
          fontSize: 2,
          gridColumn: "1 / -1",
          px: 4,
          pb: 3,
          pt: 5,
          "&:first-of-type": { pt: 3 },
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          userSelect: "none",
        }}
      >
        {children}
      </Text>
    );
  }

  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      itemType={itemType}
      sx={{
        display: "flex",
        alignItems: "center",
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 3,
        paddingRight: 3,
        fontSize: 3,
        fontWeight: "normal",
        color: mode === "dark" ? "gray.0" : "gray.60",
        bg: mode === "dark" ? "gray.80" : "gray.0",
        width: "100%",
        gap: 1,
        borderRadius: 3,
        "&:hover": {
          bg: mode === "dark" ? "gray.60" : "gray.10",
        },
        "&:active": {
          bg: mode === "dark" ? "gray.100" : "gray.20",
        },
        "&:focus-visible": {
          bg: mode === "dark" ? "blue.40" : "gray.40",
        },
        ...(isActive &&
          !disabled && {
            bg: mode === "dark" ? "gray.70" : "gray.5",
          }),
        ...(disabled && {
          opacity: 0.4,
          cursor: "not-allowed",
        }),
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};
