"use client";

import { createTheme, CssBaseline, PaletteMode, ThemeProvider, useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

type ColorModeCtxType = {
  handleChangeColorMode: (colorMode: ColorMode) => void;
  mode: ColorMode;
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

    return createTheme({
      palette: {
        mode: userMode,
      },
      components: {
        MuiIconButton: {
          defaultProps: {
            sx: {
              backgroundColor: userMode === "dark" ? grey[900] : grey[100],
            },
          },
        },
      },
    });
  }, [mode, prefersDarkMode]);

  return (
    <ColorModeCtx.Provider value={{ handleChangeColorMode, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeCtx.Provider>
  );
};

export default Theme;
