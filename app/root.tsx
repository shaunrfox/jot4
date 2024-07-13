import React, { useState, useEffect } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import { ThemeProvider, Global } from "@emotion/react";
import { css } from "@styled-system/css";
import theme, { modes } from "./utils/theme";
import globalStyles from "./utils/globalStyles";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

function getPreferredTheme() {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return modes.dark;
  }
  return modes.light;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState(modes.light);

  useEffect(() => {
    setMode(getPreferredTheme());
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () =>
      setMode(mediaQuery.matches ? modes.dark : modes.light);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeProvider theme={{ ...theme, mode }}>
      <Global styles={css(globalStyles(mode))} />
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </ThemeProvider>
  );
}

export default function App() {
  return <Outlet />;
}
