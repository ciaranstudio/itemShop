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
  mobileView,
  showSlider,
  setShowSlider,
}) {
  // const currentItemSelected = useOptionStore(
  //   (state) => state.currentItemSelected,
  // );
  // const setCurrentItemSelected = useOptionStore((state) => state.setCurrentItemSelected);

  // const previousItemSelected = useOptionStore(
  //   (state) => state.previousItemSelected,
  // );
  // const setPreviousItemSelected = useOptionStore((state) => state.setPreviousItemSelected);

  // const currentPartName = useOptionStore(
  //   (state) => state.currentPartName,
  // );
  // const setCurrentPartName = useOptionStore((state) => state.setCurrentPartName);

  // const currentItemName = useOptionStore(
  //   (state) => state.currentItemName,
  // );
  // const setCurrentItemName = useOptionStore((state) => state.setCurrentItemName);

  // const mobileView = useOptionStore((state) => state.mobileView);
  // const setMobileView = useOptionStore((state) => state.setMobileView);

  // const open = useOptionStore((state) => state.mobileView);
  // const setOpen = useOptionStore((state) => state.setOpen);

  // const showPhotos = useOptionStore((state) => state.showPhotos);
  // const setShowPhotos = useOptionStore((state) => state.setShowPhotos);

  // const allPhotos = useOptionStore((state) => state.allPhotos);
  // const setAllPhotos = useOptionStore((state) => state.setAllPhotos);

  // const aboutInfo = useOptionStore((state) => state.aboutInfo);
  // const setAboutInfo = useOptionStore((state) => state.setAboutInfo);

  // const optionBoxHeightMin = useOptionStore((state) => state.optionBoxHeightMin);
  // const setOptionBoxHeightMin = useOptionStore((state) => state.setOptionBoxHeightMin);

  // const showBackground = useOptionStore((state) => state.showBackground);
  // const setShowBackground = useOptionStore((state) => state.setShowBackground);

  // const showPartOptions = useOptionStore((state) => state.showPartOptions);
  // const setShowPartOptions = useOptionStore((state) => state.setShowPartOptions);

  // const optionBoxItemChanged = useOptionStore(
  //   (state) => state.optionBoxItemChanged,
  // );
  // const setOptionBoxItemChanged = useOptionStore((state) => state.setOptionBoxItemChanged);

  // const optionBoxItemToggle = useOptionStore(
  //   (state) => state.optionBoxItemToggle,
  // );
  // const setOptionBoxItemToggle = useOptionStore((state) => state.setOptionBoxItemToggle);

  // const animToggled = useOptionStore((state) => state.animToggled);
  // const setAnimToggled = useOptionStore((state) => state.setAnimToggled);

  // const animActive = useOptionStore((state) => state.animActive);
  // const setAnimActive = useOptionStore((state) => state.setAnimActive);

  // const activeCamPosAnim = useOptionStore((state) => state.activeCamPosAnim);
  // const setActiveCamPosAnim = useOptionStore((state) => state.setActiveCamPosAnim);

  // const activeCamTargAnim = useOptionStore((state) => state.activeCamTargAnim);
  // const setActiveCamTargAnim = useOptionStore((state) => state.setActiveCamTargAnim);

  // const activeCamAnim = useOptionStore((state) => state.activeCamAnim);
  // const setActiveCamAnim = useOptionStore((state) => state.setActiveCamAnim);

  // const partsOpen = useOptionStore((state) => state.partsOpen);
  // const setPartsOpen = useOptionStore((state) => state.setPartsOpen);

  // const animIconToggle = useOptionStore((state) => state.animIconToggle);
  // const setAnimIconToggle = useOptionStore((state) => state.setAnimIconToggle);

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
      position={[0, 44, 0]} // 40 looked okay on simulator but small cut off at bottom on desktop/iPad //  when ArrowIcon position Y was -0.3: [0, 54, 0]
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
          <SimpleSlider
            images={allPhotos ? allImages : item.images}
            showSlider={showSlider}
            setShowSlider={setShowSlider}
          />
        </div>
      </ThemeProvider>
    </Html>
  );
}
