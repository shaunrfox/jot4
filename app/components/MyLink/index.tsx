import styled from "@emotion/styled";
import { themeHelper, sxPropHelper, StyleProps } from "~/utils/styled";
import { Link } from "@remix-run/react";
import { modes } from "~/utils/theme";

const MyLink = styled(Link)<StyleProps>(
  ({ ...props }) =>
    themeHelper({
      color: props.theme?.mode === modes.dark ? "gray.5" : "gray.80",
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderColor: "transparent",
      textDecoration: "none",
      "&:hover": {
        color: props.theme?.mode === modes.dark ? "blue.20" : "blue.60",
        borderColor: props.theme?.mode === modes.dark ? "blue.20" : "blue.60",
      },
    })(props),
  sxPropHelper
);

export default MyLink;
