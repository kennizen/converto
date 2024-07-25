"use client";

import { Stack } from "@mui/material";
import InputViewer from "./InputViewer";
import OutputViewer from "./OutputViewer";
import { useEffect, useState } from "react";

export type Value = {
  inputValue: string;
  outputValue: string;
};

const ConversionViewer = () => {
  // states
  const [value, setValue] = useState<Value>({
    inputValue: "",
    outputValue: "",
  });

  function handleConversion() {
    if (value.inputValue.trim() === "") return;
  }

  // effect
  useEffect(() => {
    handleConversion();
  }, [value.inputValue]);

  console.log(value);

  return (
    <Stack direction="row" gap="5rem" justifyContent="space-between" flex={1}>
      <InputViewer inputValue={value.inputValue} setValue={setValue} />
      <OutputViewer outputValue={value.outputValue} />
    </Stack>
  );
};

export default ConversionViewer;
