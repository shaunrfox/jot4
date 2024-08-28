import { modes } from "../../utils/theme";
import Box from "~/components/Box";
import { sxPropHelper, type StyleProps, themeHelper } from "~/utils/styled";

interface RuleProps extends StyleProps {
  orientation?: "horizontal" | "vertical";
}

const baseRuleStyles = (props: RuleProps) => {
  const mode = props.theme?.mode ?? modes.light;

  return themeHelper({
    minWidth: "1px",
    minHeight: "1px",
    flexGrow: 1,
    flexShrink: 0,
    alignSelf: "center",
    justifySelf: "center",
    borderColor: mode === modes.dark ? "gray.60" : "gray.20",
    borderStyle: "solid",
  })(props);
};

export const Rule = ({ orientation = "horizontal", ...props }: RuleProps) => {
  const orientationStyles = {
    width: orientation === "vertical" ? "1px" : "100%",
    height: orientation === "vertical" ? "100%" : "1px",
    borderWidth: orientation === "vertical" ? "0 1px 0 0" : "0 0 1px 0",
  };
  const sxStyles = props.sx ? sxPropHelper(props) : {};

  return (
    <Box
      sx={(theme) => ({
        ...baseRuleStyles(theme),
        ...orientationStyles,
        ...sxStyles,
      })}
    >
      &nbsp;
    </Box>
  );
};

export default Rule;
