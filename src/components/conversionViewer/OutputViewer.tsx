"use client";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import {
  RiFileCopyLine,
  RiFileDownloadLine,
  RiFullscreenLine,
  RiSparklingLine,
  RiText,
  RiTextWrap,
} from "@remixicon/react";
import { DARK_MODE_COLORS, LIGHT_MODE_COLORS, useColorModeCtx } from "@/providers/Theme";
import { useSelectedConversionCtx } from "@/app/page";
import { Dispatch, SetStateAction, useState } from "react";
import FullscreenViewer from "./FullscreenViewer";
import { Value } from "./ConversionViewer";
import { formatJSON } from "@/utils/formatters";

type EditorConfig = {
  fontSize: number;
  wrap: boolean;
};

interface IProps {
  outputValue: string;
  setValue: Dispatch<SetStateAction<Value>>;
}

const FONT_SIZE_UPPER_LIMIT = 46,
  FONT_SIZE_LOWER_LIMIT = 6;

const OutputViewer = ({ outputValue, setValue }: IProps) => {
  // states
  const [editorConfig, setEditorConfig] = useState<EditorConfig>({
    fontSize: 14,
    wrap: true,
  });
  const [fullscreen, setFullscreen] = useState(false);

  // hooks
  const { userColorMode } = useColorModeCtx();
  const { selectedConversion } = useSelectedConversionCtx();

  // methods
  function handleChangeFontSize(size: EditorConfig["fontSize"]) {
    let s = size;
    if (size > FONT_SIZE_UPPER_LIMIT) s = FONT_SIZE_UPPER_LIMIT;
    if (size < FONT_SIZE_LOWER_LIMIT) s = FONT_SIZE_LOWER_LIMIT;
    setEditorConfig((prev) => ({ ...prev, fontSize: s }));
  }

  function handleToggleWrap() {
    setEditorConfig((prev) => ({ ...prev, wrap: !prev.wrap }));
  }

  function handleCopy() {
    navigator.clipboard.writeText(outputValue);
  }

  async function beautify() {
    switch (selectedConversion?.selected) {
      case "base64 to json":
        setValue((prev) => ({ ...prev, outputValue: formatJSON(outputValue!) }));
        break;
      default:
        break;
    }
  }

  return (
    <Stack sx={{ flex: 1 }} gap="0.5rem">
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap="1rem">
        <Typography>{selectedConversion?.selected.split("to")[1]}</Typography>
        <Stack direction="row" alignItems="center" gap="0.5rem">
          <IconButton title="Fullscreen" onClick={() => setFullscreen(true)}>
            <RiFullscreenLine size={20} />
          </IconButton>
          <IconButton title="Increase font size" onClick={() => handleChangeFontSize(editorConfig.fontSize + 2)}>
            <RiText size={20} />
          </IconButton>
          <IconButton
            size="large"
            title="Decrease font size"
            onClick={() => handleChangeFontSize(editorConfig.fontSize - 2)}
          >
            <RiText size={14} />
          </IconButton>
          <IconButton title="wrap text" onClick={() => handleToggleWrap()}>
            <RiTextWrap size={20} />
          </IconButton>
          <IconButton title="beautify" onClick={beautify}>
            <RiSparklingLine size={20} />
          </IconButton>
          <IconButton title="Download to file">
            <RiFileDownloadLine size={20} />
          </IconButton>
          <IconButton title="Copy to clipboard" onClick={handleCopy}>
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
            wrapEnabled={editorConfig.wrap}
            fontSize={editorConfig.fontSize}
          />
        )}
      </Box>
      <FullscreenViewer
        open={fullscreen}
        onClose={() => setFullscreen(false)}
        fontSize={editorConfig.fontSize}
        wrap={editorConfig.wrap}
        value={outputValue}
      />
    </Stack>
  );
};

export default OutputViewer;
