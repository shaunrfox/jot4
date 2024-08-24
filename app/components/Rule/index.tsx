import styled from "@emotion/styled";
import { sxPropHelper, type StyleProps, themeHelper } from "../../utils/styled";
import { modes, type Theme } from "../../utils/theme";
import Box from "~/components/Box";

interface RuleProps extends StyleProps {
  orientation?: "horizontal" | "vertical";
}

const baseRuleStyles = themeHelper({
  minWidth: "1px",
  minHeight: "1px",
  flexGrow: 1,
  flexShrink: 0,
  alignSelf: "center",
  justifySelf: "center",
  borderColor: ({ mode }: Theme) =>
    mode === modes.dark ? "gray.60" : "gray.20",
  borderStyle: "solid",
});

export const Rule = ({ orientation = "horizontal", ...props }: RuleProps) => {
  const orientationStyles = {
    width: orientation === "vertical" ? "1px" : "100%",
    height: orientation === "vertical" ? "100%" : "1px",
    borderWidth: orientation === "vertical" ? "0 1px 0 0" : "0 0 1px 0",
  };

  return (
    <Box
      sx={(theme) => ({
        ...baseRuleStyles(theme),
        ...orientationStyles,
      })}
      {...props}
    >
      &nbsp;
    </Box>
  );
};

export default Rule;
