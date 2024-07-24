"use client";

import ConversionSelector from "@/components/ConversionSelector";
import ConversionViewer from "@/components/conversionViewer/ConversionViewer";
import Header from "@/components/Header";
import { SupportedConversions } from "@/constants/SupportedConversions";
import { Stack } from "@mui/material";
import { useCallback, useState } from "react";

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
      <Stack flex={1} sx={{ width: "80%", paddingBottom: "1rem" }} gap="3rem">
        <Header />
        <ConversionSelector selectedConversion={selectedConversion} handleSelectConversion={handleSelectConversion} />
        <ConversionViewer />
      </Stack>
    </Stack>
  );
}
