import { Dialog, IconButton, Stack } from "@mui/material";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import { RiCloseLine } from "@remixicon/react";

interface IProps {
  open: boolean;
  value: string;
  onClose: () => void;
  fontSize: number;
  wrap?: boolean;
}

const FullscreenViewer = ({ onClose, value, open, fontSize, wrap }: IProps) => {
  return (
    <Dialog
      open={open}
      sx={{
        "& .MuiPaper-root": {
          maxWidth: "none",
          background: "transparent",
        },
      }}
    >
      <Stack sx={{ width: "95vw", height: "95dvh" }} gap="0.5rem">
        <Stack direction="row" alignItems="center" justifyContent="flex-end" gap="1rem">
          <IconButton onClick={onClose}>
            <RiCloseLine size={20} />
          </IconButton>
        </Stack>
        <AceEditor
          mode="javascript"
          theme="one_dark"
          value={value}
          name="input"
          editorProps={{ $blockScrolling: true }}
          showPrintMargin={false}
          setOptions={{ useWorker: false }}
          style={{ width: "100%", height: "100%", minHeight: 400, borderRadius: "10px" }}
          wrapEnabled={wrap}
          fontSize={fontSize}
        />
      </Stack>
    </Dialog>
  );
};

export default FullscreenViewer;
