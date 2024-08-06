import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { goTo } from "../../utils/goTo.js";
import CaptionBox from "./CaptionBox.jsx";
import { theme } from "../../data/theme.js";

export default function PhotoSingle() {
  // state from store
  const open = useOptionStore((state) => state.open);
  // const locationPathname = useOptionStore((state) => state.locationPathname);
  const selectedImage = useOptionStore((state) => state.selectedImage);
  const selectedImageIndex = useOptionStore(
    (state) => state.selectedImageIndex,
  );

  useEffect(() => {
    if (selectedImage === null) {
      goTo("/");
    }
  }, [selectedImage]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className="single-view"
        style={{
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              sm: "auto",
            },
            borderRadius: "0.75rem",
            justifyContent: "center",
          }}
        >
          {selectedImage && (
            <img
              style={{
                maxWidth: "90svw",
                height: "75svh",
              }}
              src={selectedImage.imgPath[selectedImageIndex]}
            ></img>
          )}
        </Box>
        {selectedImage && selectedImage.route !== "custom" && <CaptionBox />}
      </div>
    </ThemeProvider>
  );
}
