import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import IconButton from "@mui/material/IconButton";
import { useOptionStore } from "../../store/useOptionStore.tsx";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { goTo } from "../../utils/goTo.js";
// import { useNavigate } from "react-router-dom";
import CaptionBox from "./CaptionBox.jsx";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function PhotoSingle({ theme }) {
  // state from store
  const open = useOptionStore((state) => state.open);
  const selectedImage = useOptionStore((state) => state.selectedImage);
  const selectedImageIndex = useOptionStore(
    (state) => state.selectedImageIndex,
  );

  useEffect(() => {
    if (selectedImage === null) {
      goTo("/");
    }
  }, [selectedImage]);

  // go to 3d shop page
  // const returnTo3dView = () => {
  //   goTo("/");
  // };

  // const navigate = useNavigate();

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
          {/* <span
            style={{
              position: "absolute",
              bottom: 0,
              pointerEvents: "auto",
              zIndex: "1",
            }}
          >
            <span>
              <IconButton
                onClick={() => {
                  navigate(-1);
                }}
                aria-label="close single image view"
              >
                <ArrowBackIcon fontSize="small" color="secondary" />
              </IconButton>
            </span>
          </span>
          <span
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              pointerEvents: "auto",
              zIndex: "1",
            }}
          >
            <span>
              <IconButton onClick={returnTo3dView} aria-label="close info box">
                <CloseOutlinedIcon fontSize="small" color="secondary" />
              </IconButton>
            </span>
          </span> */}

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
        <CaptionBox />
        {/* caption text box showing title, year, materials (for shop items, year field holds short item description) */}
        {/* <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "auto, auto, auto",
            borderRadius: "0.75rem",
            // border: "0.085rem solid rgb(155, 155, 155)",
            textAlign: "center",
            mt: 1.5,
          }}
        >
          {selectedImage && (
            <>
              <Typography variant="subtitle2" color="inherit">
                {selectedImage.title && <>{selectedImage.title}</>}
              </Typography>
              <Typography variant="subtitle2" color="inherit">
                {selectedImage.year && <>{selectedImage.year}</>}
              </Typography>
              <Typography variant="subtitle2" color="inherit">
                {selectedImage.materials && <>{selectedImage.materials}</>}
              </Typography>
            </>
          )}
        </Box> */}
      </div>
    </ThemeProvider>
  );
}
