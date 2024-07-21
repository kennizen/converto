import ConversionSelector from "@/components/ConversionSelector";
import Header from "@/components/Header";
import { Stack } from "@mui/material";

export default function Home() {
  return (
    <Stack
      sx={{
        height: "100dvh",
      }}
      alignItems="center"
    >
      <Stack flex={1} sx={{ width: "80%" }} gap="3rem">
        <Header />
        <ConversionSelector />
      </Stack>
    </Stack>
  );
}
