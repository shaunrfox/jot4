import styled from "@emotion/styled";
import { themeHelper, sxPropHelper, StyleProps } from "~/utils/styled";
import { modes } from "~/utils/theme";

export type IconProps = StyleProps;

const baseStyles = (props: IconProps) => {
  const mode = props.theme?.mode ?? modes.light;

  return themeHelper({
    width: "1.5rem",
    height: "1.5rem",
    fill: mode === modes.dark ? "gray.5" : "gray.80",
  })(props);
};

const Icon = styled.svg<IconProps>((props) => {
  const baseStylesResult = baseStyles(props);
  const sxStyles = props.sx ? sxPropHelper(props) : {};

  return {
    ...baseStylesResult,
    ...sxStyles,
    "&&": sxStyles,
  };
});

export default Icon;
