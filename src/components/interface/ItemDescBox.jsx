import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { goTo } from "../../utils/goTo.js";

export default function ItemDescBox({ theme }) {
  // state from store
  const currentItemSelected = useOptionStore(
    (state) => state.currentItemSelected,
  );
  const open = useOptionStore((state) => state.open);

  return (
    // <Html center position={[0, 50, 0]}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className="shop-item-description"
        style={{
          // display: open ? "block" : "none",
          paddingBottom: "1rem",
        }}
      >
        <div
          id="title"
          style={{
            color: theme.palette.info.main,
          }}
        >
          <IconButton
            onClick={(e) => goTo("/")}
            color="inherit"
            sx={{
              position: "absolute",
              pointerEvents: "auto",
              top: -3,
              left: 0,
              padding: "0.5rem",
            }}
            aria-label="close info box"
          >
            <CloseOutlinedIcon color="info" fontSize={"small"} />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "var(--leva-fonts-mono)",
              fontSize: "1.125rem",
            }}
          >
            {currentItemSelected.itemTitle}
          </Typography>
        </div>
        <div id="description" style={{ marginTop: 0 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: "var(--leva-fonts-mono)",
              fontSize: "0.82rem",
            }}
            color="prmimary"
          >
            {currentItemSelected.itemLongDescription}
          </Typography>
        </div>
        <div
          id="size"
          style={{
            background: "transparent",
            borderRadius: "2rem",
            border: "2px solid lightGrey",
            padding: "0.25rem",
            marginTop: "0.75rem",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: "var(--leva-fonts-mono)",
              fontSize: "0.82rem",
              color: theme.palette.info.main,
            }}
          >
            {currentItemSelected.size}
          </Typography>
        </div>
      </div>
    </ThemeProvider>
    // </Html>
  );
}
