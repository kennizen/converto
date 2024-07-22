"use client";

import { SupportedConversions, supportedConversions } from "@/constants/SupportedConversions";
import { DARK_MODE_COLORS, LIGHT_MODE_COLORS, useColorModeCtx } from "@/providers/Theme";
import { Box, ClickAwayListener, Fade, Popper, Stack, Typography } from "@mui/material";
import { RiSearchLine } from "@remixicon/react";
import { useEffect, useMemo, useRef, useState } from "react";
import CustomChip from "./CustomChip";

const INPUT_WIDTH = "600px";

interface IProps {
  handleSelectConversion: (conversion: SupportedConversions) => void;
  selectedConversion: SupportedConversions | null;
}

const ConversionSelector = ({ handleSelectConversion, selectedConversion }: IProps) => {
  // states
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [chips, setChips] = useState<SupportedConversions[]>([]);
  const [searchVal, setSearchVal] = useState<SupportedConversions>("");

  // hooks
  const { userColorMode } = useColorModeCtx();
  const inputRef = useRef<HTMLInputElement | null>(null);

  // consts
  const filteredChips = useMemo(
    () => chips.filter((chip) => chip.toLowerCase().indexOf(searchVal.toLowerCase()) > -1),
    [searchVal, chips]
  );

  // methods
  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setOpenSuggestions(true);
    setAnchorEl(inputRef.current);
  }

  function handleCloseSuggestions() {
    setAnchorEl(null);
    setOpenSuggestions(false);
  }

  // effects
  useEffect(() => {
    setChips(supportedConversions);
  }, []);

  useEffect(() => {
    if (selectedConversion === null) return;
    setSearchVal(selectedConversion);
    handleCloseSuggestions();
  }, [selectedConversion]);

  console.log({ searchVal, filteredChips });

  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <ClickAwayListener onClickAway={handleCloseSuggestions}>
        <Stack
          ref={inputRef}
          direction="row"
          alignItems="center"
          sx={{
            outline: `2px solid ${userColorMode === "dark" ? DARK_MODE_COLORS.secondary : LIGHT_MODE_COLORS.secondary}`,
            maxWidth: INPUT_WIDTH,
            width: "100%",
            borderRadius: "15px",
            padding: "0.4rem 1rem 0.4rem 0.5rem",
            gap: "0.2rem",
          }}
        >
          <RiSearchLine size={20} style={{ flexShrink: 0 }} />
          <input
            onChange={(e) => setSearchVal(e.target.value)}
            value={searchVal}
            style={{
              flex: 1,
              backgroundColor: "transparent",
              outline: "none",
              border: "none",
              fontSize: "16px",
              caretColor: userColorMode === "dark" ? DARK_MODE_COLORS.text : LIGHT_MODE_COLORS.text,
              color: userColorMode === "dark" ? DARK_MODE_COLORS.text : LIGHT_MODE_COLORS.text,
            }}
            placeholder="Search Conversions..."
            onClick={handleClick}
          />
          <Popper
            id="suggestions"
            open={openSuggestions}
            anchorEl={anchorEl}
            transition
            sx={{ top: "15px !important" }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps}>
                <Box
                  sx={{
                    overflow: "hidden",
                    borderRadius: "15px",
                    backgroundColor:
                      userColorMode === "dark" ? DARK_MODE_COLORS.secondary : LIGHT_MODE_COLORS.secondary,
                    width: INPUT_WIDTH,
                    marginX: "3rem",
                  }}
                >
                  <Stack
                    sx={{
                      padding: "0.8rem",
                      maxHeight: "300px",
                      overflow: "auto",
                    }}
                    flexDirection="row"
                    gap="1rem"
                    flexWrap="wrap"
                  >
                    {filteredChips.length <= 0 ? (
                      <Typography>Not available</Typography>
                    ) : (
                      filteredChips.map((item, i) => (
                        <CustomChip key={i + item} label={item} handleSelectConversion={handleSelectConversion} />
                      ))
                    )}
                  </Stack>
                </Box>
              </Fade>
            )}
          </Popper>
        </Stack>
      </ClickAwayListener>
    </Stack>
  );
};

export default ConversionSelector;
