import React from "react";
import styled from "@emotion/styled";
import { themeHelper, sxPropHelper, StyleProps } from "~/utils/styled";
import { modes } from "~/utils/theme";

export type IconProps = StyleProps & React.SVGProps<SVGSVGElement>;

const baseStyles = (props: IconProps) => {
  const mode = props.theme?.mode ?? modes.light;

  return themeHelper({
    width: "1.5rem",
    height: "1.5rem",
    fill: mode === modes.dark ? "gray.5" : "gray.80",
  })(props);
};

const svgProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
};

const StyledSvg = styled.svg<IconProps>(
  ({ theme, sx, ...props }: IconProps) => {
    const baseStylesResult = baseStyles({ theme, sx, ...props });
    const sxStyles = sx ? sxPropHelper({ theme, sx, ...props }) : {};

    return {
      ...baseStylesResult,
      ...sxStyles,
      "&&": sxStyles,
    };
  },
);

const Icon: React.FC<IconProps> = ({ children, ...props }) => (
  <StyledSvg {...svgProps} {...props}>
    {children}
  </StyledSvg>
);

export default Icon;
