"use client";

import ConversionSelector from "@/components/ConversionSelector";
import ConversionViewer from "@/components/conversionViewer/ConversionViewer";
import Header from "@/components/Header";
import { SupportedConversions } from "@/constants/SupportedConversions";
import { Stack } from "@mui/material";
import { createContext, useCallback, useContext, useState } from "react";

type SelectedConversionCtx = {
  selectedConversion: { selected: SupportedConversions } | null;
  handleSelectConversion: (conversion: SupportedConversions) => void;
};

const selectedConversionCtx = createContext<SelectedConversionCtx | null>(null);

export function useSelectedConversionCtx() {
  const ctx = useContext(selectedConversionCtx);
  if (ctx === null) throw new Error("Selected conversion context must be used within its provider");
  return ctx;
}

export default function Home() {
  // states
  const [selectedConversion, setSelectedConversion] = useState<{ selected: SupportedConversions } | null>(null);

  // methods
  const handleSelectConversion = useCallback((conversion: SupportedConversions) => {
    setSelectedConversion({ selected: conversion });
  }, []);

  return (
    <Stack
      sx={{
        height: "100dvh",
      }}
      alignItems="center"
    >
      <Stack flex={1} sx={{ width: "80%", paddingBottom: "1.5rem" }} gap="2.5rem">
        <Header />
        <selectedConversionCtx.Provider value={{ selectedConversion, handleSelectConversion }}>
          <ConversionSelector />
          <ConversionViewer />
        </selectedConversionCtx.Provider>
      </Stack>
    </Stack>
  );
}
