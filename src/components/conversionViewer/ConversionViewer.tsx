"use client";

import { Stack } from "@mui/material";
import InputViewer from "./InputViewer";
import OutputViewer from "./OutputViewer";
import { useEffect, useState } from "react";
import { getConvertedOrParsedData } from "@/utils/conversion.helpers";
import { useSelectedConversionCtx } from "@/app/page";

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

  // hooks
  const { selectedConversion } = useSelectedConversionCtx();

  async function handleConversion() {
    if (value.inputValue.trim() === "") return;
    if (selectedConversion === null) return;

    const data = await getConvertedOrParsedData(value.inputValue, selectedConversion.selected);

    if (!data) {
      console.error("Error parsing or converting data");
      return;
    }

    setValue((prev) => ({ ...prev, outputValue: data }));
  }

  // effect
  useEffect(() => {
    handleConversion();
  }, [value.inputValue]);

  useEffect(() => {
    if (selectedConversion === null) return;
    setValue({ inputValue: "", outputValue: "" });
  }, [selectedConversion]);

  console.log(value);

  return (
    <Stack direction="row" gap="5rem" justifyContent="space-between" flex={1}>
      <InputViewer inputValue={value.inputValue} setValue={setValue} />
      <OutputViewer outputValue={value.outputValue} setValue={setValue} />
    </Stack>
  );
};

export default ConversionViewer;
