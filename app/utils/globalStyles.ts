import type { SystemStyleObject } from "@styled-system/css";
import theme, { modes } from "./theme";

export default (mode: modes): SystemStyleObject => ({
  "*, *::before, *::after": {
    boxSizing: "border-box",
  },
  "html, body": {
    boxSizing: "border-box",
    width: "100vw",
    height: "100vh",
    fontFamily: "default",
    padding: 0,
    margin: 0,
    color: mode === modes.dark ? "gray.20" : "gray.60",
    overflow: "hidden",
  },
  html: {
    bg: "red",
  },
  body: {
    bg: mode === modes.dark ? "gray.100" : "gray.0",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "min-content 1fr",
    alignItems: "center",
  },
  "p, h1, h2, h3, h4, h5, h6, span, div": {
    padding: 0,
    margin: 0,
  },
  "h1, h2, h3, h4, h5, h6": {
    color: mode === modes.dark ? "gray.5" : "gray.80",
  },
  a: {
    color: mode === modes.dark ? theme.colors.gray[5] : theme.colors.gray[80],
    textDecoration: "none",
    backgroundSize: "100% 1px",
    backgroundRepeat: "no-repeat",
    backgroundPositionY: "100%",
    backgroundImage: `linear-gradient(90deg, ${
      mode === modes.dark ? theme.colors.gray[60] : theme.colors.gray[20]
    } 0%, ${
      mode === modes.dark ? theme.colors.gray[60] : theme.colors.gray[20]
    } 100%)`,
    svg: {
      fill: "currentColor",
    },
    "&:hover, &:visited:hover": {
      color:
        mode === modes.dark ? theme.colors.blue[40] : theme.colors.blue[50],
      backgroundImage: `linear-gradient(90deg, ${
        mode === modes.dark ? theme.colors.blue[40] : theme.colors.blue[50]
      } 0%, ${
        mode === modes.dark ? theme.colors.blue[40] : theme.colors.blue[50]
      } 100%)`,
    },
    "&:visited": {
      color: mode === modes.dark ? theme.colors.gray[5] : theme.colors.gray[80],
    },
  },
  hr: {
    border: "none",
    borderTop: "1px solid",
    borderColor: mode === modes.dark ? "gray.2" : "gray.60",
    margin: "2rem 0",
  },
  "ul, ol": {
    display: "flex",
    flexDirection: "column",
    margin: "0.5rem auto",
    paddingLeft: 8,
    gap: 1,
    li: {
      "ul, ol": {
        margin: 0,
      },
    },
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
      margin: "1rem 0",
      maxWidth: "100%",

      "&.ProseMirror-selectednode": {
        outline: "3px solid",
        outlineColor: mode === modes.dark ? "mint.60" : "mint.40",
      },
    },
  },
  ".ProseMirror": {
    // Image block styles
    ".node-imageBlock": {
      img: {
        overflow: "hidden",
        borderRadius: "0.75rem",
        border: "4px solid",
        borderColor: "transparent",
      },
      "&:hover img": {
        borderColor: mode === modes.dark ? "blue.30" : "gray.40",
      },
      "&:has(.is-active) img, &.has-focus img": {
        borderColor: mode === modes.dark ? "blue.40" : "blue.50",
      },
    },
    // Columns styles
    "[data-type='columns']": {
      display: "grid",
      gap: 4,
      my: "1rem",

      "&.layout-sidebar-left": {
        gridTemplateColumns: "40fr 60fr",
      },

      "&.layout-sidebar-right": {
        gridTemplateColumns: "60fr 40fr",
      },

      "&.layout-two-column": {
        gridTemplateColumns: "1fr 1fr",
      },

      "[data-type='column']": {
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        overflow: "auto",
        outline: "2px dotted",
        outlineColor: "transparent",
        outlineOffset: "3px",
        borderRadius: 2,
        p: 0,
        transition: "outline 160ms cubic-bezier(0.45, 0.05, 0.55, 0.95)",
        "&[data-position='left']": {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
        "&[data-position='right']": {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
        "&:hover, &:has(.is-active), &.has-focus": {
          outlineColor: mode === modes.dark ? "gray.70" : "gray.20",
        },
        img: {
          my: 0,
        },
        "* + .node-imageBlock img, .node-imageBlock + *": {
          mt: "0.75rem",
        },
      },

      "&.has-focus [data-type='column'], &:hover [data-type='column']": {
        outline: "2px dotted",
        outlineColor: mode === modes.dark ? "gray.70" : "gray.20",
      },
      "[data-type='column'].has-focus": {
        outlineColor: mode === modes.dark ? "gray.60" : "gray.30",
      },
    },
    // Placeholder styles
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
  // Task List styles
  "[data-type='taskList']": {
    listStyle: "none",
    paddingLeft: 0,
    gap: 4,

    ul: {
      mt: 4,
    },

    "input[type='checkbox']": {
      position: "absolute",
      opacity: 0,
      cursor: "pointer",
      height: 0,
      width: 0,
    },

    li: {
      display: "flex",

      "& > label": {
        position: "relative",
        display: "block",
        width: "1.125rem",
        height: "1.125rem",
        flexGrow: 0,
        flexShrink: 0,
        mt: 2,
        mr: 5,
        userSelect: "none",
        cursor: "pointer",

        span: {
          position: "absolute",
          verticalAlign: "text-top",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          bg: mode === modes.dark ? "gray.80" : "gray.0",
          borderRadius: 3,
          border: "1px solid",
          borderColor: mode === modes.dark ? "gray.60" : "gray.30",
          userSelect: "none",

          "&::before": {
            display: "none",
            content: '""',
            width: "6px",
            height: "10px",
            border: "2px solid",
            borderColor: mode === modes.dark ? "gray.90" : "gray.0",
            borderTop: "none",
            borderLeft: "none",
            transform: "rotate(45deg)",
            transformOrigin: "center",
            mt: "-3px",
            userSelect: "none",
          },

          "&:hover": {
            bg: mode === modes.dark ? "gray.90" : "gray.10",
          },
        },
      },

      "> div": {
        flex: 1,
      },

      "&[data-checked=true]": {
        "> label > span": {
          bg: mode === modes.dark ? "blue.40" : "blue.50",
          borderColor: mode === modes.dark ? "blue.40" : "blue.50",
          "&::before": {
            display: "block",
          },

          "&:hover": {
            bg: mode === modes.dark ? "blue.30" : "blue.40",
            borderColor: mode === modes.dark ? "blue.30" : "blue.40",
          },
        },
        "> * > p": {
          textDecoration: "line-through",
          opacity: 0.5,
        },
      },
    },
  },
  // Selection styles
  ".selection": {
    display: "inline",
  },
  // Table styles
  ".resize-cursor": {
    cursor: "col-resize",
  },
  ".tableWrapper": {
    my: "2rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid",
    borderColor: mode === modes.dark ? "gray.80" : "gray.10",
    borderRadius: 3,
    textIndent: 0,
    "td, th": {
      position: "relative",
      border: "1px solid",
      borderColor: mode === modes.dark ? "gray.80" : "gray.10",
      p: "0.5rem",
      minWidth: "100px",
      textAlign: "left",
      verticalAlign: "top",
      "&:first-of-type:not(a)": {
        mt: 0,
      },
      "& > p": {
        m: 0,

        "& + p": {
          mt: "0.25rem",
        },
      },
    },
    th: {
      fontWeight: "bold",
    },
    ".selectedCell": {
      backgroundColor: mode === modes.dark ? "gray.5" : "blue.5",
      borderColor: mode === modes.dark ? "gray.5" : "blue.20",
    },
    ".column-resize-handle": {
      position: "absolute",
      right: "-0.25rem",
      top: 0,
      bottom: "-2px",
      width: "0.5rem",
      display: "flex",
      pointerEvents: "none",
      "&::before": {
        content: '""',
        display: "block",
        height: "100%",
        width: "1px",
        ml: "0.5rem",
        bg: mode === modes.dark ? "gray.60" : "gray.30",
      },
    },
    ".grip-column, .grip-row": {
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      bg: mode === modes.dark ? "gray.80" : "gray.5",
      zIndex: 10,
      cursor: "pointer",
      "&::before": {
        content: '""',
        borderColor: "transparent",
      },
      "&:hover": {
        bg: mode === modes.dark ? "gray.70" : "gray.10",
        "&::before": {
          borderColor: mode === modes.dark ? "gray.30" : "gray.70",
        },
      },
      "&.selected": {
        bg: mode === modes.dark ? "blue.70" : "blue.30",
        "&::before": {
          borderColor: mode === modes.dark ? "gray.80" : "gray.5",
        },
      },
      "&.first": {
        borderColor: "transparent",
      },
    },
    ".grip-column": {
      top: "-0.75rem",
      left: 0,
      width: "calc(100% + 1px)",
      height: "0.75rem",
      ml: "-1px",
      borderLeft: "1px solid",
      borderColor: mode === modes.dark ? "gray.80" : "gray.10",
      "&:hover": {
        backgroundImage: `linear-gradient(90deg, ${
          mode === modes.dark ? theme.colors.gray[60] : theme.colors.gray[20]
        } 0%, ${
          mode === modes.dark ? theme.colors.gray[60] : theme.colors.gray[20]
        } 100%)`,
        "&::before": {
          width: "1rem",
          borderBottom: "3px dotted",
          borderColor: mode === modes.dark ? "gray.30" : "gray.70",
        },
      },
      "&.selected": {
        backgroundImage: `linear-gradient(90deg, ${
          mode === modes.dark ? theme.colors.blue[30] : theme.colors.blue[50]
        } 0%, ${
          mode === modes.dark ? theme.colors.blue[30] : theme.colors.blue[50]
        } 100%)`,
        "&::before": {
          width: "1rem",
          borderBottom: "3px dotted",
          borderColor: mode === modes.dark ? "gray.100" : "gray.0",
        },
        "&:hover": {
          backgroundImage: `linear-gradient(90deg, ${
            mode === modes.dark ? theme.colors.blue[30] : theme.colors.blue[50]
          } 0%, ${
            mode === modes.dark ? theme.colors.blue[30] : theme.colors.blue[50]
          } 100%)`,
        },
      },
      "&.first": {
        borderTopLeftRadius: "0.125rem",
      },
      "&.last": {
        borderTopRightRadius: "0.125rem",
      },
    },
    ".grip-row": {
      width: "0.75rem",
      height: "calc(100% + 1px)",
      left: "-0.75rem",
      top: 0,
      mt: "-1px",
      borderTop: "1px solid",
      borderColor: mode === modes.dark ? "gray.80" : "gray.10",
      backgroundImage:
        "linear-gradient(90deg, transparent 0%, transparent 100%)",
      "&:hover": {
        "&::before": {
          height: "1rem",
          borderLeft: "3px dotted",
          borderColor: mode === modes.dark ? "gray.30" : "gray.70",
        },
      },
      "&.selected": {
        "&::before": {
          height: "1rem",
          borderLeft: "3px dotted",
          borderColor: mode === modes.dark ? "gray.100" : "gray.0",
        },
      },
      "&.first": {
        borderTopLeftRadius: "0.125rem",
      },
      "&.last": {
        borderBottomLeftRadius: "0.125rem",
      },
    },
  },
});
