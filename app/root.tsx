import React, { useState, useEffect } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { ThemeProvider, Global } from "@emotion/react";
import { css } from "@styled-system/css";
import theme, { modes } from "./utils/theme";
import globalStyles from "./utils/globalStyles";
import styled from "@emotion/styled";
import { sxPropHelper } from "~/utils/styled";
import Box from "./components/Box";
import AppHeader from "./components/AppHeader";

export const meta: MetaFunction = () => {
  return [
    { charset: "utf-8" },
    { title: "Jot" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
  ];
};
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
  const [mode, setMode] = useState(() => {
    if (typeof window === "undefined") return modes.light;
    return getPreferredTheme();
  });

  useEffect(() => {
    setMode(getPreferredTheme());
    // console.log("Current theme mode:", mode);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () =>
      setMode(mediaQuery.matches ? modes.dark : modes.light);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const MainContent = styled(Box)(
    {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
      overflow: "auto",
    },
    sxPropHelper,
  );

  return (
    <ThemeProvider theme={{ ...theme, mode }}>
      <Global styles={css(globalStyles(mode))} />
      <html lang="en">
        <head>
          <Meta />
          <Links />
        </head>
        <body>
          <MainContent>
            <AppHeader />
            {children}
          </MainContent>
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
