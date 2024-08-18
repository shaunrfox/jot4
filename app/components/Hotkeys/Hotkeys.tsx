import { useTheme } from "@emotion/react";
import Box from "~/components/Box";
import Text from "~/components/Text";

export const Hotkeys = ({ hotkeys }: { hotkeys?: string[] }) => {
  const { mode } = useTheme();

  const hotkeysStyles = {
    display: "inline-flex",
    alignItems: "center",
    height: "fit-content",
    lineHeight: "1em",
    flexShrink: 0,
    fontSize: 2,
    fontFamily: "mono",
    color: "currentColor",
    bg: "rgba(192, 196, 204, 0.4)",
    borderRadius: 2,
    px: 3,
    py: 2,
  };

  if (!hotkeys || hotkeys.length === 0) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      {hotkeys.map((hotkey, index) => (
        <Text key={index} sx={hotkeysStyles}>
          {hotkey}
        </Text>
      ))}
    </Box>
  );
};

export default Hotkeys;
