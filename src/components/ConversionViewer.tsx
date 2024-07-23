"use client";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import { Stack } from "@mui/material";

// dynamic imports are needed for language selected

const ConversionViewer = () => {
  return (
    <Stack direction="row" gap="5rem" justifyContent="space-between" flex={1}>
      <AceEditor
        mode="javascript"
        theme="one_dark"
        onChange={() => {}}
        name="input"
        editorProps={{ $blockScrolling: true }}
        showPrintMargin={false}
        setOptions={{ useWorker: false }}
        style={{ flex: 1, height: "100%", minHeight: 400 }}
      />
      <AceEditor
        mode="javascript"
        theme="one_dark"
        onChange={() => {}}
        name="output"
        editorProps={{ $blockScrolling: true }}
        showPrintMargin={false}
        setOptions={{ useWorker: false }}
        style={{ flex: 1, height: "100%", minHeight: 400 }}
      />
    </Stack>
  );
};

export default ConversionViewer;
