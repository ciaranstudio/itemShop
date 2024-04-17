import React from "react";
// import { ThemeProvider } from "@mui/material";
// import CssBaseline from "@mui/material/CssBaseline";
// import { useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Box from "@mui/material/Box";
import { useOptionStore } from "../store/useOptionStore.tsx";

export default function NavMenu({
  // open,
  // setOpen,
  // showPhotos,
  // setShowPhotos,
  // showPartOptions,
  // setShowPartOptions,
  // aboutInfo,
  // setAboutInfo,
  // allPhotos,
  // setAllPhotos,
  openUserEmail,
}) {
  const selectHandler = (e, menuItem, popupState) => {
    // console.log(popupState);
    if (menuItem === "about") {
      setAboutInfo(true);
      if (!open) {
        setOpen(true);
      }
      setShowPartOptions(false);
      setShowPhotos(false);
      setAllPhotos(false);
      popupState.close();
    } else if (menuItem === "images") {
      setAllPhotos(true);
      if (!showPhotos) {
        setShowPhotos(true);
      }
      setShowPartOptions(false);
      setOpen(false);
      setAboutInfo(false);
      popupState.close();
    } else if (menuItem === "custom") {
      window.open(
        "https://www.eligfellstudio.com/new-page",
        "_blank",
        "noreferrer",
      );
      popupState.close();
    } else if (menuItem === "contact") {
      window.open(
        "https://www.eligfellstudio.com/contact-1",
        "_blank",
        "noreferrer",
      );
      popupState.close();
    } else if (menuItem === "exhibitions") {
      window.open(
        "https://cargocollective.com/eligfell",
        "_blank",
        "noreferrer",
      );
      popupState.close();
    }
  };

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

  const open = useOptionStore((state) => state.open);
  const setOpen = useOptionStore((state) => state.setOpen);

  const showPhotos = useOptionStore((state) => state.showPhotos);
  const setShowPhotos = useOptionStore((state) => state.setShowPhotos);

  const allPhotos = useOptionStore((state) => state.allPhotos);
  const setAllPhotos = useOptionStore((state) => state.setAllPhotos);

  const aboutInfo = useOptionStore((state) => state.aboutInfo);
  const setAboutInfo = useOptionStore((state) => state.setAboutInfo);

  // const optionBoxHeightMin = useOptionStore((state) => state.optionBoxHeightMin);
  // const setOptionBoxHeightMin = useOptionStore((state) => state.setOptionBoxHeightMin);

  // const showBackground = useOptionStore((state) => state.showBackground);
  // const setShowBackground = useOptionStore((state) => state.setShowBackground);

  const showPartOptions = useOptionStore((state) => state.showPartOptions);
  const setShowPartOptions = useOptionStore(
    (state) => state.setShowPartOptions,
  );

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
    <PopupState variant="popover" popupId="popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Box
            {...bindTrigger(popupState)}
            sx={{
              padding: "12rem",
              paddingX: "14rem",
              // border: "0.5rem solid white",
              borderRadius: "2rem",
              cursor: "pointer",
            }}
          ></Box>
          <Menu
            {...bindMenu(popupState)}
            autoFocus={false}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "lightgrey",
                border: "0.05rem solid rgb(155, 155, 155);",
              },
            }}
          >
            <MenuItem
              // onClick={popupState.close}
              onClick={(e) => selectHandler(e, "about", popupState)}
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
              selected={aboutInfo}
            >
              About
            </MenuItem>
            <MenuItem
              // onClick={popupState.close}
              onClick={(e) => selectHandler(e, "images", popupState)}
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
              selected={allPhotos}
            >
              Images
            </MenuItem>
            <MenuItem
              // onClick={popupState.close}
              onClick={(e) => selectHandler(e, "custom", popupState)}
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
            >
              Custom Work
            </MenuItem>
            <MenuItem
              // onClick={popupState.close}
              // onClick={(e) => selectHandler(e, "contact", popupState)}
              onClick={(e) => openUserEmail(e)}
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
            >
              Contact
            </MenuItem>
            <MenuItem
              // onClick={popupState.close}
              onClick={(e) => selectHandler(e, "exhibitions", popupState)}
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
            >
              Exhibitions
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
