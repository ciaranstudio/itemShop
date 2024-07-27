import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import useWindowDimensions from "../../hooks/useWindowDimensions.jsx";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { theme } from "../../data/theme.js";

export default function CaptionBox() {
  const selectedImage = useOptionStore((state) => state.selectedImage);
  const [captionToggle, setCaptionToggle] = useState(false);
  const { height } = useWindowDimensions();
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <span
            style={{
              // display: "none",
              position: "fixed",
              bottom: height < 700 ? "1rem" : 0,
              left: "50%",
              transform: "translate(-50%)",
            }}
          >
            <span>
              <IconButton
                onClick={() => {
                  setCaptionToggle((prev) => !prev);
                }}
                aria-label="toggle artwork caption info"
              >
                <InfoOutlinedIcon fontSize="medium" color="secondary" />
              </IconButton>
            </span>
          </span>
        </Box>

        <Box
          sx={{
            display: captionToggle ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center",
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translate( -50%)",
            width: "80svw",
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              borderRadius: "0.75rem",
              border: "0.085rem solid rgb(155, 155, 155)",
              textAlign: "center",
              padding: "1rem",
              paddingTop: "0.75rem",
              paddingBottom: "2.5rem",
              backgroundColor: "rgb(233, 234, 233)",
              maxWidth: "22rem",
            }}
          >
            {selectedImage && (
              <>
                <Typography variant="subtitle2" color="inherit" sx={{ mb: 1 }}>
                  {selectedImage.title && selectedImage.route === "shop" ? (
                    selectedImage.title.substring(
                      0,
                      selectedImage.title.indexOf("_"),
                    )
                  ) : selectedImage.title && selectedImage.route !== "shop" ? (
                    selectedImage.title
                  ) : (
                    <></>
                  )}
                </Typography>
                <Typography variant="body2" color="inherit" sx={{ mb: 1 }}>
                  {selectedImage.year && <>{selectedImage.year}</>}
                </Typography>
                <Typography variant="body2" color="inherit" sx={{ mb: 1 }}>
                  {selectedImage.materials && <>{selectedImage.materials}</>}
                </Typography>
                <Typography variant="body2" color="inherit">
                  {selectedImage.size && <>{selectedImage.size}</>}
                </Typography>
                <Typography
                  variant="caption"
                  color="inherit"
                  sx={{ mt: selectedImage.description ? 1 : 0 }}
                >
                  {selectedImage.description && (
                    <>{selectedImage.description}</>
                  )}
                </Typography>
                <span
                  style={{
                    position: "fixed",
                    bottom: 0,
                    left: "50%",
                    transform: "translate(-50%)",
                  }}
                >
                  <span>
                    <IconButton
                      onClick={() => {
                        setCaptionToggle((prev) => !prev);
                      }}
                      aria-label="toggle artwork caption info"
                    >
                      <CloseOutlinedIcon fontSize="small" color="warning" />
                    </IconButton>
                  </span>
                </span>
              </>
            )}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
