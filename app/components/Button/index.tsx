import styled from "@emotion/styled";
import { themeHelper, sxPropHelper, type StyleProps } from "~/utils/styled";
import { modes } from "~/utils/theme";

export interface ButtonProps extends StyleProps {
  variant?: keyof typeof variants;
  to?: string;
  active?: boolean;
  iconButton?: boolean;
  size?: "small" | "medium" | "default";
}

const variants = {
  standard: (mode: modes) =>
    mode === modes.dark
      ? {
          backgroundColor: "gray.70",
          color: "gray.5",
          ":hover": {
            backgroundColor: "gray.60",
          },
          ":active": {
            backgroundColor: "gray.100",
            borderColor: "transparent",
          },
          ":focus-visible": {
            borderColor: "blue.20",
          },
          ":disabled": {
            cursor: "not-allowed",
            ":hover": {
              backgroundColor: "gray.70",
            },
          },
        }
      : {
          backgroundColor: "gray.5",
          color: "gray.80",
          ":hover": {
            backgroundColor: "gray.2",
          },
          ":active": {
            backgroundColor: "gray.20",
            borderColor: "transparent",
          },
          ":focus-visible": {
            borderColor: "blue.50",
          },
          ":disabled": {
            cursor: "not-allowed",
            ":hover": {
              backgroundColor: "gray.5",
            },
          },
        },
  primary: (mode: modes) =>
    mode === modes.dark
      ? {
          backgroundColor: "blue.50",
          color: "gray.5",
          ":hover": {
            backgroundColor: "blue.40",
          },
          ":active": {
            backgroundColor: "blue.60",
            borderColor: "transparent",
          },
          ":focus-visible": {
            borderColor: "blue.20",
          },
          ":disabled": {
            cursor: "not-allowed",
            ":hover": {
              backgroundColor: "blue.50",
            },
          },
        }
      : {
          backgroundColor: "blue.50",
          color: "gray.0",
          ":hover": {
            backgroundColor: "blue.40",
          },
          ":active": {
            backgroundColor: "blue.60",
            borderColor: "transparent",
          },
          ":focus-visible": {
            borderColor: "blue.70",
          },
          ":disabled": {
            cursor: "not-allowed",
            ":hover": {
              backgroundColor: "blue.50",
            },
          },
        },
  accent: (mode: modes) =>
    mode === modes.dark
      ? {
          backgroundColor: "mint.50",
          color: "gray.5",
          ":hover": {
            backgroundColor: "mint.40",
          },
          ":active": {
            backgroundColor: "mint.60",
            borderColor: "transparent",
          },
          ":focus-visible": {
            borderColor: "blue.20",
          },
          ":disabled": {
            cursor: "not-allowed",
            ":hover": {
              backgroundColor: "mint.50",
            },
          },
        }
      : {
          backgroundColor: "mint.50",
          color: "gray.0",
          ":hover": {
            backgroundColor: "mint.40",
          },
          ":active": {
            backgroundColor: "mint.60",
            borderColor: "transparent",
          },
          ":focus-visible": {
            borderColor: "mint.70",
          },
          ":disabled": {
            cursor: "not-allowed",
            ":hover": {
              backgroundColor: "mint.50",
            },
          },
        },
  danger: (mode: modes) =>
    mode === modes.dark
      ? {
          backgroundColor: "red.50",
          color: "gray.5",
          ":hover": {
            backgroundColor: "red.40",
          },
          ":active": {
            backgroundColor: "red.60",
            borderColor: "transparent",
          },
          ":focus-visible": {
            borderColor: "blue.20",
          },
          ":disabled": {
            cursor: "not-allowed",
            ":hover": {
              backgroundColor: "red.50",
            },
          },
        }
      : {
          backgroundColor: "red.50",
          color: "gray.0",
          ":hover": {
            backgroundColor: "red.40",
          },
          ":active": {
            backgroundColor: "red.60",
            borderColor: "transparent",
          },
          ":focus-visible": {
            borderColor: "red.70",
          },
          ":disabled": {
            cursor: "not-allowed",
            ":hover": {
              backgroundColor: "red.50",
            },
          },
        },
  hollow: (mode: modes) =>
    mode === modes.dark
      ? {
          backgroundColor: "transparent",
          color: "gray.5",
          ":hover": {
            backgroundColor: "gray.60",
          },
          ":active": {
            backgroundColor: "gray.100",
            borderColor: "transparent",
          },
          ":focus-visible": {
            borderColor: "blue.20",
            backgroundColor: "gray.70",
            ":active": {
              backgroundColor: "gray.100",
            },
          },
          ":disabled": {
            cursor: "not-allowed",
            ":hover": {
              backgroundColor: "transparent",
            },
          },
        }
      : {
          backgroundColor: "transparent",
          color: "gray.80",
          ":hover": {
            backgroundColor: "gray.2",
          },
          ":active": {
            backgroundColor: "gray.20",
            borderColor: "transparent",
          },
          ":focus-visible": {
            borderColor: "blue.50",
            backgroundColor: "gray.5",
            ":active": {
              backgroundColor: "gray.20",
            },
          },
          ":disabled": {
            cursor: "not-allowed",
            ":hover": {
              backgroundColor: "transparent",
            },
          },
        },
  utility: (mode: modes) =>
    mode === modes.dark
      ? {
          backgroundColor: "gray.5",
          color: "gray.80",
          svg: {
            fill: "gray.80",
          },
          ":hover": {
            backgroundColor: "gray.2",
          },
          ":active": {
            backgroundColor: "gray.20",
            borderColor: "transparent",
          },
          ":focus-visible": {
            borderColor: "blue.50",
            backgroundColor: "gray.5",
            ":active": {
              backgroundColor: "gray.20",
            },
          },
          ":disabled": {
            cursor: "not-allowed",
            ":hover": {
              backgroundColor: "transparent",
            },
          },
        }
      : {
          backgroundColor: "gray.80",
          color: "gray.5",
          svg: {
            fill: "gray.5",
          },
          ":hover": {
            backgroundColor: "gray.60",
          },
          ":active": {
            backgroundColor: "gray.100",
            borderColor: "transparent",
          },
          ":focus-visible": {
            borderColor: "blue.20",
            backgroundColor: "gray.70",
            ":active": {
              backgroundColor: "gray.100",
            },
          },
          ":disabled": {
            cursor: "not-allowed",
            ":hover": {
              backgroundColor: "transparent",
            },
          },
        },
};

const activeStyles = (mode: modes) =>
  mode === modes.dark
    ? {
        backgroundColor: "gray.80",
        color: "gray.5",
        svg: {
          fill: "gray.5",
        },
        ":hover": {
          backgroundColor: "gray.60",
        },
        ":active": {
          backgroundColor: "gray.100",
          borderColor: "transparent",
        },
        ":focus-visible": {
          borderColor: "blue.20",
          backgroundColor: "gray.70",
          ":active": {
            backgroundColor: "gray.100",
          },
        },
        ":disabled": {
          cursor: "not-allowed",
          ":hover": {
            backgroundColor: "transparent",
          },
        },
      }
    : {
        backgroundColor: "gray.5",
        color: "gray.80",
        svg: {
          fill: "gray.80",
        },
        ":hover": {
          backgroundColor: "gray.2",
        },
        ":active": {
          backgroundColor: "gray.20",
          borderColor: "transparent",
        },
        ":focus-visible": {
          borderColor: "blue.50",
          backgroundColor: "gray.5",
          ":active": {
            backgroundColor: "gray.20",
          },
        },
        ":disabled": {
          cursor: "not-allowed",
          ":hover": {
            backgroundColor: "transparent",
          },
        },
      };

const sizeStyles = (
  size: "small" | "medium" | "default" | undefined,
  iconButton: boolean = false,
) => {
  // console.log("Size in sizeStyles:", size);
  return themeHelper({
    ...(() => {
      switch (size) {
        case "small":
          return {
            fontSize: 2.5,
            py: 2,
            px: iconButton ? 2 : 4,
          };
        case "medium":
          return {
            fontSize: 3,
            py: 2,
            px: iconButton ? 2 : 4,
          };
        default:
          return {
            fontSize: 3,
            py: 3,
            px: iconButton ? 3 : 5,
          };
      }
    })(),
  });
};

const baseStyles = themeHelper({
  display: "flex",
  alignItems: "center",
  gap: 3,
  fontWeight: "normal",
  fontFamily: "default",
  lineHeight: 2,
  borderRadius: 3,
  borderColor: "transparent",
  borderWidth: "0.125rem",
  borderStyle: "solid",
  outline: "none",
  textDecoration: "none",
  ":disabled": {
    opacity: 0.4,
  },
  cursor: "pointer",
  "& svg": {
    fill: "currentColor",
  },
});

const iconButtonBaseStyles = themeHelper({
  lineHeight: 1,
  display: "block",
  fontSize: "0rem",
  svg: {
    width: "1.375rem",
    height: "1.375rem",
  },
});

const variantStyles = ({ variant = "standard", ...props }: ButtonProps) => {
  const mode = props.theme?.mode ?? modes.light;
  const variantStyleObject = variants[variant](mode);

  return themeHelper({ ...variantStyleObject })(props);
};

const Button = styled.button<ButtonProps>(
  baseStyles,
  ({ iconButton }) => iconButton && iconButtonBaseStyles,
  ({ size, iconButton }) => {
    // console.log("Button size:", size);
    // console.log("Button iconButton:", iconButton);
    return sizeStyles(size || "default", iconButton);
  },
  variantStyles,
  ({ active, theme }) => {
    if (active) {
      const mode = theme?.mode ?? modes.light;
      return themeHelper(activeStyles(mode));
    }
    return {};
  },
  sxPropHelper,
);

export const IconButton = styled.button<ButtonProps>(
  baseStyles,
  iconButtonBaseStyles,
  ({ size = "default" }) => sizeStyles(size, true),
  variantStyles,
  ({ active, theme }) => {
    if (active) {
      const mode = theme?.mode ?? modes.light;
      return themeHelper(activeStyles(mode));
    }
    return {};
  },
  sxPropHelper,
);

export default Button;
