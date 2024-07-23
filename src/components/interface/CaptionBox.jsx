import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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
              paddingBottom: "2.5rem",
              backgroundColor: "rgb(233, 234, 233)",
            }}
          >
            {selectedImage && (
              <>
                <Typography variant="subtitle2" color="inherit">
                  {selectedImage.title && <>{selectedImage.title}</>}
                </Typography>
                <Typography variant="subtitle2" color="inherit">
                  {selectedImage.title && <>{selectedImage.title}</>}
                </Typography>
                <Typography variant="subtitle2" color="inherit">
                  {selectedImage.title && <>{selectedImage.title}</>}
                </Typography>
                <Typography variant="subtitle2" color="inherit">
                  {selectedImage.year && <>{selectedImage.year}</>}
                </Typography>
                <Typography variant="subtitle2" color="inherit">
                  {selectedImage.materials && <>{selectedImage.materials}</>}
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
                      <InfoOutlinedIcon fontSize="medium" color="secondary" />
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
