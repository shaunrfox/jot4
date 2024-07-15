import styled from "@emotion/styled";
import { sxPropHelper, type StyleProps, themeHelper } from "../../utils/styled";
import { modes, type Theme } from "../../utils/theme";

interface RuleProps extends StyleProps {
  variant?: "horizontal" | "vertical";
}

// TODO: this isn't working yet...
const variants = {
  horizontal: {
    minWidth: 0,
    height: "1px",
    width: "100%",
    backgroundColor: ({ mode }: Theme) =>
      mode === modes.dark ? "gray.60" : "gray.20",
  },
  vertical: {
    minHeight: 0,
    height: "100%",
    width: "1px",
    backgroundColor: ({ mode }: Theme) =>
      mode === modes.dark ? "gray.60" : "gray.20",
  },
};

export const Rule = styled.div<RuleProps>(
  themeHelper(variants.horizontal),
  sxPropHelper
);

// const Rule = styled.div<RuleProps>(
//   themeHelper({
//     minWidth: 0,
//     height: "1px",
//     width: "100%",
//     backgroundColor: ({ mode }: Theme) =>
//       mode === modes.dark ? "gray.60" : "gray.20",
//   }),
//   sxPropHelper
// );

export default Rule;
