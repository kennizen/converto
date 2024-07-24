"use client";

import { Stack } from "@mui/material";
import InputViewer from "./InputViewer";
import OutputViewer from "./OutputViewer";

// dynamic imports are needed for language selected

const ConversionViewer = () => {
  return (
    <Stack direction="row" gap="5rem" justifyContent="space-between" flex={1}>
      <InputViewer />
      <OutputViewer />
    </Stack>
  );
};

export default ConversionViewer;
