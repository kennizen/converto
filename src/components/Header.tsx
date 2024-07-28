"use client";

import { useColorModeCtx } from "@/providers/Theme";
import { IconButton, Stack, Typography, useTheme } from "@mui/material";
import { RiComputerFill, RiComputerLine, RiMoonFill, RiMoonLine, RiSunFill, RiSunLine } from "@remixicon/react";

const Header = () => {
  // hooks
  const { mode, handleChangeColorMode } = useColorModeCtx();

  return (
    <Stack direction="row" justifyContent="space-between" gap="1rem">
      <Stack gap="0.2rem" paddingTop="3rem">
        <Typography variant="h3">Welcome to Converto</Typography>
        <Typography variant="body1">By developer for developers, convert or parse <br/> from one format to another.</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" gap="0.3rem">
        <IconButton title="system preference" size="large" onClick={() => handleChangeColorMode("system")}>
          {mode === "system" ? <RiComputerFill size={20} /> : <RiComputerLine size={20} />}
        </IconButton>
        <IconButton title="dark mode" size="large" onClick={() => handleChangeColorMode("dark")}>
          {mode === "dark" ? <RiMoonFill size={20} /> : <RiMoonLine size={20} />}
        </IconButton>
        <IconButton title="light mode" size="large" onClick={() => handleChangeColorMode("light")}>
          {mode === "light" ? <RiSunFill size={20} /> : <RiSunLine size={20} />}
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default Header;
