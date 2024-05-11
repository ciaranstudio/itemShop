import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Box from "@mui/material/Box";
import { useOptionStore } from "../../../store/useOptionStore.tsx";

export default function NavMenu({ openUserEmail }) {
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

  // state from store
  const open = useOptionStore((state) => state.open);
  const showPhotos = useOptionStore((state) => state.showPhotos);
  const allPhotos = useOptionStore((state) => state.allPhotos);
  const aboutInfo = useOptionStore((state) => state.aboutInfo);

  // actions from store
  const setOpen = useOptionStore((state) => state.setOpen);
  const setShowPhotos = useOptionStore((state) => state.setShowPhotos);
  const setAllPhotos = useOptionStore((state) => state.setAllPhotos);
  const setAboutInfo = useOptionStore((state) => state.setAboutInfo);
  const setShowPartOptions = useOptionStore(
    (state) => state.setShowPartOptions,
  );

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
              onClick={(e) => selectHandler(e, "about", popupState)}
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
              selected={aboutInfo}
            >
              About
            </MenuItem>
            <MenuItem
              onClick={(e) => selectHandler(e, "images", popupState)}
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
              selected={allPhotos}
            >
              Images
            </MenuItem>
            <MenuItem
              onClick={(e) => selectHandler(e, "custom", popupState)}
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
            >
              Custom Work
            </MenuItem>
            <MenuItem
              // onClick={(e) => selectHandler(e, "contact", popupState)}
              onClick={(e) => openUserEmail(e)}
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
            >
              Contact
            </MenuItem>
            <MenuItem
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
