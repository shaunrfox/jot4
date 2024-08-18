import styled from "@emotion/styled";
import { sxPropHelper, StyleProps } from "~/utils/styled";

export type BoxProps = StyleProps;

export const Box = styled.div<BoxProps>({ minWidth: 0 }, (props) => {
  // console.log("Box received props:", props);
  return sxPropHelper(props);
});

export default Box;
