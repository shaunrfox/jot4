import { css, type SystemStyleObject } from "@styled-system/css";
import { type CSSObject } from "@emotion/styled";
import { type ElementType } from "react";

import { type Theme } from "../utils/theme";

export interface StyleProps {
  as?: ElementType;
  sx?: SystemStyleObject;
  theme?: Theme;
}

export const sxPropHelper = (props: StyleProps): CSSObject => {
  // console.log("sxPropHelper called with props:", props);
  return themeHelper(props.sx)(props);
};

export const themeHelper =
  (input?: SystemStyleObject | SystemStyleObject[]) =>
  (props?: any): CSSObject => {
    return css(input)(props.theme);
  };
