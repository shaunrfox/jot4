import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";
import { Theme } from "~/utils/theme";

export const useThemeMode = () => {
  const theme = useTheme() as Theme;
  const [mode, setMode] = useState(theme.mode);

  useEffect(() => {
    setMode(theme.mode);
  }, [theme.mode]);

  return mode;
};

export default useThemeMode;
