"use client";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { RiFileCopyLine, RiFileDownloadLine, RiFullscreenLine, RiText } from "@remixicon/react";
import { DARK_MODE_COLORS, LIGHT_MODE_COLORS, useColorModeCtx } from "@/providers/Theme";
import { useSelectedConversionCtx } from "@/app/page";

interface IProps {
  outputValue: string;
}

const OutputViewer = ({ outputValue }: IProps) => {
  // hooks
  const { userColorMode } = useColorModeCtx();
  const { selectedConversion } = useSelectedConversionCtx();

  return (
    <Stack sx={{ flex: 1 }} gap="0.5rem">
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap="1rem">
        <Typography>{selectedConversion?.selected.split("to")[1]}</Typography>
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
          <IconButton title="Download to file">
            <RiFileDownloadLine size={20} />
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
        {selectedConversion === null ? (
          <Stack sx={{ flex: 1, height: "100%" }} alignItems="center" justifyContent="center">
            <Typography variant="h3">OUTPUT</Typography>
          </Stack>
        ) : (
          <AceEditor
            mode="javascript"
            theme="one_dark"
            value={outputValue}
            name="input"
            editorProps={{ $blockScrolling: true }}
            showPrintMargin={false}
            setOptions={{ useWorker: false }}
            style={{ width: "100%", height: "100%", minHeight: 400, borderRadius: "10px" }}
          />
        )}
      </Box>
    </Stack>
  );
};

export default OutputViewer;
