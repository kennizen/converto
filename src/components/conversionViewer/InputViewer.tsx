"use client";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { RiFileCopyLine, RiFileUploadLine, RiFullscreenLine, RiLink, RiText } from "@remixicon/react";
import { DARK_MODE_COLORS, LIGHT_MODE_COLORS, useColorModeCtx } from "@/providers/Theme";

const InputViewer = () => {
  // hooks
  const { userColorMode } = useColorModeCtx();

  return (
    <Stack sx={{ flex: 1 }} gap="0.5rem">
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap="1rem">
        <Typography>name</Typography>
        <Stack direction="row" alignItems="center" gap="0.5rem">
          <IconButton title="Fullscreen">
            <RiFullscreenLine size={20} />
          </IconButton>
          <IconButton title="Increase font size">
            <RiText size={20} />
          </IconButton>
          <IconButton size="large" title="Decrease font size">
            <RiText size={14} />
          </IconButton>
          <IconButton title="Get from url">
            <RiLink size={20} />
          </IconButton>
          <IconButton title="Upload from file">
            <RiFileUploadLine size={20} />
          </IconButton>

          <IconButton title="Copy to clipboard">
            <RiFileCopyLine size={20} />
          </IconButton>
        </Stack>
      </Stack>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          outline: `2px solid ${userColorMode === "dark" ? DARK_MODE_COLORS.secondary : LIGHT_MODE_COLORS.secondary}`,
          borderRadius: "10px",
        }}
      >
        <AceEditor
          mode="javascript"
          theme="one_dark"
          onChange={() => {}}
          name="input"
          editorProps={{ $blockScrolling: true }}
          showPrintMargin={false}
          setOptions={{ useWorker: false }}
          style={{ width: "100%", height: "100%", minHeight: 400, borderRadius: "10px" }}
        />
      </Box>
    </Stack>
  );
};

export default InputViewer;
