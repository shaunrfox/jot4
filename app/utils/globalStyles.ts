import type { SystemStyleObject } from "@styled-system/css";
import { modes } from "./theme";

export default (mode: modes): SystemStyleObject => ({
  "*, *::before, *::after": {
    boxSizing: "border-box",
  },
  "html, body, #root": {
    height: "100%",
    fontFamily: "default",
    padding: 0,
    margin: 0,
    color: mode === modes.dark ? "gray.20" : "gray.60",
  },
  body: {
    bg: mode === modes.dark ? "gray.100" : "gray.0",
  },
  "p, h1, h2, h3, h4, h5, h6, span, div": {
    padding: 0,
    margin: 0,
  },
  "h1, h2, h3, h4, h5, h6": {
    color: mode === modes.dark ? "gray.5" : "gray.80",
  },
  hr: {
    border: "none",
    borderTop: "1px solid",
    borderColor: mode === modes.dark ? "gray.2" : "gray.60",
    margin: "2rem 0",
  },
  // Code styles
  "code, pre": {
    backgroundColor: mode === modes.dark ? "gray.80" : "gray.5",
    color: mode === modes.dark ? "gray.5" : "gray.80",
    fontSize: "inherit",
    fontFamily: "mono",
  },
  code: {
    px: 4,
    py: 2,
    borderRadius: 3,
  },
  pre: {
    borderRadius: 4,
    padding: 6,
  },
  "pre code": {
    backgroundColor: "transparent",
    color: "inherit",
    fontSize: "inherit",
  },
  // Tiptap styles
  ".tiptap": {
    py: 9,
    "&:focus": {
      outline: "none",
    },
    "&:first-of-type": {
      marginTop: 0,
    },
    img: {
      display: "block",
      height: "auto",
      margin: "1.5rem 0",
      maxWidth: "100%",

      "&.ProseMirror-selectednode": {
        outline: "3px solid",
        outlineColor: mode === modes.dark ? "mint.60" : "mint.40",
      },
    },
  },
  // Placeholder styles
  ".ProseMirror": {
    ".is-empty::before": {
      color: mode === modes.dark ? "gray.40" : "gray.30",
      width: "100%",
      float: "left",
      height: "0",
      pointerEvents: "none",
    },
    "&.ProseMirror-focused": {
      /* Slashmenu Placeholder */
      "> p.has-focus.is-empty::before": {
        content: '"Type  /  to browse options"',
      },
      "> [data-type='columns'] > [data-type='column'] > p.is-empty.has-focus::before":
        {
          content: '"Type  /  to browse options"',
        },
    },
    /* Default Placeholder */
    "& > .is-editor-empty::before": {
      content: '"Click here to start writing …"',
    },
    // Blockquote styles
    "figure[data-type='blockquoteFigure']": {
      color: mode === modes.dark ? "gray.5" : "gray.60",
      borderLeft: "3px solid",
      borderColor: mode === modes.dark ? "gray.3" : "gray.60",
      margin: "0.5rem auto",
      paddingLeft: "1rem",
      blockquote: {
        margin: 0,
        // blockquote: {
        //   margin: 0,

        //   "& > *": {
        //     margin: 0,
        //   },
        // },
      },
    },
    "blockquote, & > [data-type='blockquoteFigure'] > blockquote": {
      "& > *:first-of-type": { mt: 0 },
      "& > *:last-of-type": { mb: 0 },
    },
    /* Blockquote Placeholder */
    "blockquote .is-empty:not(.is-editor-empty):first-of-type:last-child::before":
      {
        content: '"Enter a quote"',
      },
    "blockquote + figcaption": {
      marginTop: "0.5rem",
      color: mode === modes.dark ? "gray.20" : "gray.50",
      fontSize: "0.875em",
      "&.is-empty:not(.is-editor-empty)::before": {
        content: '"—Author"',
      },
      "&::before": {
        content: '"—"',
        opacity: 0.5,
      },
    },
    "[data-placeholder][data-suggestion]::before, [data-placeholder][data-suggestion] *::before":
      {
        content: '"none !important"',
      },
  },
  // Selection styles
  ".selection": {
    display: "inline",
  },
});
