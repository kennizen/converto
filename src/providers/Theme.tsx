"use client";

import { createTheme, CssBaseline, PaletteMode, ThemeProvider, useMediaQuery } from "@mui/material";
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

type ColorPalette = {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
};

export const DARK_MODE_COLORS: ColorPalette = {
  primary: "rgb(34, 40, 49)",
  secondary: "rgb(57, 62, 70)",
  accent: "rgb(0, 173, 181)",
  text: "rgb(238, 238, 238)",
} as const;

export const LIGHT_MODE_COLORS: ColorPalette = {
  primary: "rgb(249, 247, 247)",
  secondary: "rgb(219, 226, 239)",
  accent: "rgb(63, 114, 175)",
  text: "rgb(17, 45, 78)",
} as const;

type ColorModeCtxType = {
  handleChangeColorMode: (colorMode: ColorMode) => void;
  mode: ColorMode;
  userColorMode: "dark" | "light";
};

const ColorModeCtx = createContext<ColorModeCtxType | null>(null);

export function useColorModeCtx() {
  const ctx = useContext(ColorModeCtx);
  if (ctx === null) throw new Error("Color mode ctx must be used within color mode ctx provider.");
  return ctx;
}

interface IProps {
  children: ReactNode;
}

type ColorMode = "light" | "dark" | "system";

const Theme = ({ children }: IProps) => {
  //hooks
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // states
  const [mode, setMode] = useState<ColorMode>("system");
  const [userColorMode, setUserColorMode] = useState<"dark" | "light">("dark");

  // handlers
  const handleChangeColorMode = useCallback((colorMode: ColorMode) => {
    setMode(colorMode);
  }, []);

  // const
  const theme = useMemo(() => {
    let userMode: PaletteMode = "dark";

    switch (mode) {
      case "system":
        {
          if (prefersDarkMode) {
            userMode = "dark";
          } else userMode = "light";
        }
        break;
      case "dark":
        userMode = "dark";
        break;
      case "light":
        userMode = "light";
        break;
    }

    setUserColorMode(userMode);

    return createTheme({
      palette: {
        mode: userMode,
        background: {
          default: userMode === "dark" ? DARK_MODE_COLORS.primary : LIGHT_MODE_COLORS.primary,
        },
        text: {
          primary: userMode === "dark" ? DARK_MODE_COLORS.text : LIGHT_MODE_COLORS.text,
        },
      },
      components: {
        MuiIconButton: {
          defaultProps: {
            sx: {
              backgroundColor: userMode === "dark" ? DARK_MODE_COLORS.secondary : LIGHT_MODE_COLORS.secondary,
            },
          },
        },
      },
    });
  }, [mode, prefersDarkMode]);

  return (
    <ColorModeCtx.Provider value={{ handleChangeColorMode, mode, userColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeCtx.Provider>
  );
};

export default Theme;
