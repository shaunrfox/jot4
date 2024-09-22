import styled from "@emotion/styled";
import { sxPropHelper, StyleProps } from "~/utils/styled";

export interface BoxProps extends StyleProps {
  as?: React.ElementType;
  [key: string]: any;
}

const Box = styled.div<BoxProps>({ minWidth: 0 }, (props) => {
  const { as, ...restProps } = props;
  return sxPropHelper(restProps);
});

export default Box;
