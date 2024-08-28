import { ReactNodeViewRenderer } from "@tiptap/react";
import TiptapHorizontalRule from "@tiptap/extension-horizontal-rule";
import Rule from "~/components/Rule";

const StyledRule = () => (
  <Rule
    sx={{
      my: 3,
    }}
  />
);

export const HorizontalRule = TiptapHorizontalRule.extend({
  addNodeView() {
    return ReactNodeViewRenderer(StyledRule);
  },
});

export default HorizontalRule;
