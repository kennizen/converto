import { DARK_MODE_COLORS, LIGHT_MODE_COLORS, useColorModeCtx } from "@/providers/Theme";
import { Box } from "@mui/material";

interface IProps {
  label: string;
}

const CustomChip = ({ label }: IProps) => {
  // hooks
  const { userColorMode } = useColorModeCtx();

  return (
    <Box
      sx={{
        backgroundColor: userColorMode === "dark" ? DARK_MODE_COLORS.primary : LIGHT_MODE_COLORS.primary,
        padding: "0.2rem 0.6rem",
        // outline: `1px solid ${userColorMode === "dark" ? DARK_MODE_COLORS.accent : LIGHT_MODE_COLORS.accent}`,
        whiteSpace: "nowrap",
        borderRadius: "10px",
        color: userColorMode === "dark" ? DARK_MODE_COLORS.accent : LIGHT_MODE_COLORS.accent,
      }}
    >
      {label}
    </Box>
  );
};

export default CustomChip;
