import styled from "@emotion/styled";
import { themeHelper, sxPropHelper, StyleProps } from "~/utils/styled";
import { Link } from "@remix-run/react";
import { modes } from "~/utils/theme";

export interface MyLinkProps extends StyleProps {
  to?: string;
  target?: string;
  rel?: string;
  blue?: boolean | string;
}

const MyLink = styled(Link)<MyLinkProps>(
  ({ blue, ...props }) =>
    themeHelper({
      textDecoration: "none",
      backgroundSize: "100% 1px",
      backgroundRepeat: "no-repeat",
      backgroundPositionY: "100%",
      cursor: "pointer",
      svg: {
        fill: "currentColor",
      },
      ...(blue === true || blue === "true"
        ? {
            color: props.theme?.mode === modes.dark ? "blue.50" : "blue.50",
            backgroundImage: `linear-gradient(90deg, ${
              props.theme?.mode === modes.dark ? "blue.20" : "blue.50"
            } 0%, ${props.theme?.mode === modes.dark ? "blue.20" : "blue.50"} 100%)`,
            "&:hover, &:visited:hover": {
              color: props.theme?.mode === modes.dark ? "blue.10" : "blue.40",
              backgroundImage: `linear-gradient(90deg, ${
                props.theme?.mode === modes.dark ? "blue.10" : "blue.40"
              } 0%, ${props.theme?.mode === modes.dark ? "blue.10" : "blue.40"} 100%)`,
            },
            "&:visited": {
              color: props.theme?.mode === modes.dark ? "blue.20" : "blue.50",
              backgroundImage: `linear-gradient(90deg, ${
                props.theme?.mode === modes.dark ? "blue.20" : "blue.50"
              } 0%, ${props.theme?.mode === modes.dark ? "blue.20" : "blue.50"} 100%)`,
            },
          }
        : {
            color: props.theme?.mode === modes.dark ? "gray.5" : "gray.80",
            backgroundImage: `linear-gradient(90deg, transparent 0%, transparent 100%)`,
            "&:hover, &:visited:hover": {
              color: props.theme?.mode === modes.dark ? "blue.20" : "blue.50",
              backgroundImage: `linear-gradient(90deg, ${
                props.theme?.mode === modes.dark ? "blue.20" : "blue.50"
              } 0%, ${
                props.theme?.mode === modes.dark ? "blue.20" : "blue.50"
              } 100%)`,
            },
            "&:visited": {
              color: props.theme?.mode === modes.dark ? "gray.5" : "gray.80",
            },
          }),
    })(props),
  sxPropHelper,
);

export default MyLink;
