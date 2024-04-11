// import React, { Suspense } from "react";
import { Html } from "@react-three/drei";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import SimpleSlider from "./SimpleSlider.jsx";
import { allImages } from "../data/objects.jsx";

export default function PhotoBox({
  item,
  togglePhotoBox,
  showPhotos,
  theme,
  allPhotos,
}) {
  return (
    <Html
      center
      // position={[
      //   0,
      //   item.itemName.includes("shelf") &&
      //   item.itemName.includes("B") &&
      //   item.itemName.includes("16")
      //     ? 0.35
      //     : item.itemName.includes("shelf") &&
      //         item.itemName.includes("B") &&
      //         item.itemName.includes("32")
      //       ? 0.15
      //       : item.itemName.includes("shelf") &&
      //           item.itemName.includes("A") &&
      //           item.itemName.includes("32")
      //         ? 0.35
      //         : item.itemName.includes("shelf") &&
      //             item.itemName.includes("A") &&
      //             item.itemName.includes("16")
      //           ? 0.15
      //           : item.itemName.includes("horse")
      //             ? -1.1
      //             : -0.85, // -0.65
      //   0,
      // ]}
      position={[0, 54, 0]}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          className="photos"
          style={{
            display: showPhotos ? "block" : "none",
          }}
        >
          <IconButton
            onClick={(e) => togglePhotoBox(e)}
            color="inherit"
            // disabled={
            //   currentItemSelected.itemTitle === "noSelectTitle" ? true : false
            // }
            sx={{
              position: "absolute",
              pointerEvents: "auto",
              top: "0.15rem",
              left: "0.15rem",
              padding: "0.5rem",
            }}
            aria-label="close order box"
          >
            <CloseOutlinedIcon
              // fontSize="medium"
              // sx={{ color: "primary.light" }}
              color="success"
            />
          </IconButton>
          <div id="title">
            <Typography
              variant="h6"
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
              color="primary"
            >
              {allPhotos ? "Images" : item.itemTitle}
            </Typography>
          </div>
          {/* <Suspense> */}
          <SimpleSlider images={allPhotos ? allImages : item.images} />
          {/* </Suspense> */}
        </div>
      </ThemeProvider>
    </Html>
  );
}
