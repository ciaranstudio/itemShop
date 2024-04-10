import React from "react";
// import { ThemeProvider } from "@mui/material";
// import CssBaseline from "@mui/material/CssBaseline";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Box from "@mui/material/Box";

export default function NavMenu({ toggleInfoBox, togglePhotoBox }) {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
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
              },
            }}
          >
            <MenuItem
              onClick={popupState.close}
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
            >
              About
            </MenuItem>
            <MenuItem
              onClick={popupState.close}
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
            >
              Images
            </MenuItem>
            <MenuItem
              onClick={popupState.close}
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
            >
              Custom Work
            </MenuItem>
            <MenuItem
              onClick={popupState.close}
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
            >
              Contact
            </MenuItem>
            <MenuItem
              onClick={popupState.close}
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
