"use client";

import ConversionSelector from "@/components/ConversionSelector";
import Header from "@/components/Header";
import { SupportedConversions } from "@/constants/SupportedConversions";
import { Stack } from "@mui/material";
import { useCallback, useState } from "react";

export default function Home() {
  // states
  const [selectedConversion, setSelectedConversion] = useState<SupportedConversions | null>(null);

  // methods
  const handleSelectConversion = useCallback((conversion: SupportedConversions) => {
    setSelectedConversion(conversion);
  }, []);

  return (
    <Stack
      sx={{
        height: "100dvh",
      }}
      alignItems="center"
    >
      <Stack flex={1} sx={{ width: "80%" }} gap="3rem">
        <Header />
        <ConversionSelector selectedConversion={selectedConversion} handleSelectConversion={handleSelectConversion} />
      </Stack>
    </Stack>
  );
}
