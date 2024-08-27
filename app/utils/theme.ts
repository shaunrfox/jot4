import { type Theme as StyledSystemTheme } from "@styled-system/css";
import { useTheme } from "@emotion/react";

const colors = {
  blue: {
    5: "#E8F5FF",
    10: "#CFE8FF",
    20: "#A1D3FF",
    30: "#58B4FF",
    40: "#2491FF",
    50: "#0076DA",
    60: "#005EA2",
    70: "#0B4778",
    80: "#112F4E",
  },
  gray: {
    0: "#FFFFFF",
    1: "#FBFCFD",
    2: "#F7F9FA",
    3: "#F5F6F7",
    4: "#F1F3F6",
    5: "#EDEFF0",
    10: "#DFE1E2",
    20: "#C6CACE",
    30: "#A9AEB1",
    40: "#8D9297",
    50: "#71767A",
    60: "#565C65",
    70: "#3D4551",
    80: "#2D2E2F",
    90: "#1C1D1F",
    100: "#000000",
  },
  mint: {
    5: "#D5FBF3",
    10: "#7EFBE1",
    20: "#29E1CB",
    30: "#1DC2AE",
    40: "#00A398",
    50: "#008480",
    60: "#0F6460",
    70: "#0B4B3F",
    80: "#123131",
  },
  red: {
    5: "#FFF3F2",
    10: "#FDE0DB",
    20: "#FDB8AE",
    30: "#FF8D7B",
    40: "#FB5A47",
    50: "#E52207",
    60: "#B50909",
    70: "#8B0A03",
    80: "#5C1111",
  },
  highlight: {
    light: {
      gray: "#F0F0F0",
      orange: "#FFF5EE",
      red: "#FFF2F5",
      yellow: "#FFF5C2",
      green: "#DDF9C7",
      mint: "#C9FBEB",
      cyan: "#E5FAFF",
      blue: "#E8F5FF",
      indigo: "#F5F2FF",
      violet: "#FEF2FF",
    },
    dark: {
      gray: "#454545",
      orange: "#63340F",
      red: "#822133",
      yellow: "#5C4809",
      green: "#2F4A0B",
      mint: "#0C4E29",
      cyan: "#0E4F5C",
      blue: "#0B4778",
      indigo: "#3D2C9D",
      violet: "#711E6C",
    },
  },
  text: {
    light: {
      gray: "#919191",
      orange: "#EF5E25",
      red: "#F45D79",
      yellow: "#B38C00",
      green: "#719F2A",
      mint: "#00A871",
      cyan: "#009EC1",
      blue: "#2491FF",
      indigo: "#967EFB",
      violet: "#D85BEF",
    },
    dark: {
      gray: "#ADADAD",
      orange: "#F39268",
      red: "#FD8BA0",
      yellow: "#DDAA01",
      green: "#7FB135",
      mint: "#04C585",
      cyan: "#00BDE3",
      blue: "#58B4FF",
      indigo: "#B69FFF",
      violet: "#EE83FF",
    },
  },
};

const makeTheme = <T extends StyledSystemTheme>(t: T) => t;
const theme = makeTheme({
  colors,
  fonts: {
    default:
      '"Source Sans 3", "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
    mono: '"Source Code Pro", "Roboto Mono", Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace',
    "@import":
      "url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap')",
  },
  fontSizes: {
    1: "0.625rem", // 10px
    2: "0.75rem", // 12px
    2.5: "0.875rem", // 14px
    3: "1rem", // 16px
    4: "1.25rem", // 20px
    5: "1.5rem", // 24px
    6: "2rem", // 32px
    7: "2.5rem", // 40px
    8: "3rem", // 48px
  },
  fontWeights: {
    normal: 400,
    bold: 700,
  },
  lineHeights: {
    1: "112.5%",
    2: "125%",
    3: "133.4%",
    4: "140%",
    5: "150%",
    6: "166.7%",
  },
  space: {
    1: "0.0625rem", // 1px
    2: "0.125rem", // 2px
    3: "0.25rem", // 4px
    4: "0.5rem", // 8px
    5: "0.75rem", // 12px
    6: "1rem", // 16px
    7: "1.25rem", // 20px
    8: "1.5rem", // 24px
    9: "2rem", // 32px
    10: "2.5rem", // 40px
    11: "3rem", // 48px
    12: "4rem", // 64px
    13: "4.5rem", // 72px
    14: "5rem", // 80px
  },
  radii: {
    1: "0rem",
    2: "0.125rem", // 2px
    3: "0.25rem", // 4px
    4: "0.5rem", // 8px
    5: "1rem", // 16px
    full: "100%",
  },
  shadows: {
    low_light: `0 1px 3px 0 ${colors.gray[20]}`,
    low_dark: `0 1px 3px 0 ${colors.gray[100]}`,
    high_light: `0 3px 6px 0 ${colors.gray[20]}`,
    high_dark: `0 3px 6px 0 ${colors.gray[100]}`,
  },
  breakpoints: ["640px", "768px", "1024px", "1280px", "1536px"],
  styles: {
    root: {
      fontFamily: "default",
      fontWeight: "regular",
    },
  },
});

export enum modes {
  light = "light",
  dark = "dark",
}

export type Theme = typeof theme & {
  mode: modes;
};

export type ThemeColor = {
  [key: string]: string;
};

export const RGBA = (colorPath: string, alpha: number) => {
  const theme = useTheme() as Theme;
  const [colorGroup, colorKey] = colorPath.split(".");
  const colorObject = theme.colors[
    colorGroup as keyof typeof theme.colors
  ] as ThemeColor;
  const hex = colorObject[colorKey as keyof ThemeColor];
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const HEX8 = (colorPath: string, alpha: number) => {
  const theme = useTheme() as Theme;
  const [colorGroup, colorKey] = colorPath.split(".");
  const colorObject = theme.colors[
    colorGroup as keyof typeof theme.colors
  ] as ThemeColor;
  const hex = colorObject[colorKey as keyof ThemeColor];
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  const a = Math.round(alpha * 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}${a.toString(16).padStart(2, "0")}`;
};

export default theme;
