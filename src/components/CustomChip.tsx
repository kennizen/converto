import { SupportedConversions } from "@/constants/SupportedConversions";
import { DARK_MODE_COLORS, LIGHT_MODE_COLORS, useColorModeCtx } from "@/providers/Theme";
import { Box } from "@mui/material";

interface IProps {
  label: string;
  handleSelectConversion: (conversion: SupportedConversions) => void;
}

const CustomChip = ({ label, handleSelectConversion }: IProps) => {
  // hooks
  const { userColorMode } = useColorModeCtx();

  return (
    <Box
      sx={{
        backgroundColor: userColorMode === "dark" ? DARK_MODE_COLORS.primary : LIGHT_MODE_COLORS.primary,
        padding: "0.2rem 0.6rem",
        whiteSpace: "nowrap",
        borderRadius: "10px",
        color: userColorMode === "dark" ? DARK_MODE_COLORS.accent : LIGHT_MODE_COLORS.accent,
        "&:hover": {
          outline: `1px solid ${userColorMode === "dark" ? DARK_MODE_COLORS.accent : LIGHT_MODE_COLORS.accent}`,
        },
        cursor: "pointer",
      }}
      onClick={() => handleSelectConversion(label)}
    >
      {label}
    </Box>
  );
};

export default CustomChip;
