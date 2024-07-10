import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import IconButton from "@mui/material/IconButton";
import { useOptionStore } from "../../store/useOptionStore.tsx";

// import OptionBox from "./OptionBox.jsx";
// import { objects, shopItems } from "../../data/objects.jsx";
// import { options, allOptions } from "../../data/options.jsx";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import FilterOutlinedIcon from "@mui/icons-material/FilterOutlined";
// import CircleIcon from "@mui/icons-material/Circle";
// import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
// import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
// import OpenInFullIcon from "@mui/icons-material/OpenInFull";
// import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
// import BuyButton from "./BuyButton.jsx";
// import SplitButton from "./SplitButton.jsx";
// import useWindowDimensions from "../../hooks/useWindowDimensions.jsx";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
// import toast from "react-hot-toast";
// import { OPTION_BOX_POS_Y } from "../../data/constants.tsx";

import { Link, useLocation } from "react-router-dom";
import { useDashContext } from "../../context/ViewContext";

export default function PhotoGrid({
  toggleInfoBox,
  theme,
  // handlePartOption,
  // togglePhotoBox,
  images,
  flag,
}) {
  // infobox Y axis position for drei Html component
  // const htmlPosY = 50;
  const htmlPosY = 0;

  const routerLocation = useLocation();
  const { location, setLocation } = useDashContext();

  // state from store
  const currentItemSelected = useOptionStore(
    (state) => state.currentItemSelected,
  );
  const open = useOptionStore((state) => state.open);

  // useEffect
  useEffect(() => {
    console.log("routerLocation: ", routerLocation);
    setLocation(routerLocation);
  }, [routerLocation]);

  useEffect(() => {
    console.log("dash location: ", location);
    // setLocation(routerLocation);
  }, [location]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className="info"
        style={{
          display: open ? "block" : "none",
          paddingBottom: "1rem",
          overflow: "auto",
          pointerEvents: open ? "auto" : "none",
          marginTop: "0.5rem",
        }}
      >
        <>
          {flag ? (
            <h2>{routerLocation.pathname === "/" ? "home" : "not home"}</h2>
          ) : (
            <h2>false</h2>
          )}
          {/* photos grid */}
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              pointerEvents: "auto",
              zIndex: "1",
            }}
          >
            <span>
              <IconButton
                onClick={(e) => toggleInfoBox(e)}
                color="inherit"
                sx={{
                  padding: "0.5rem",
                }}
                aria-label="close info box"
              >
                <CloseOutlinedIcon fontSize="small" color="success" />
              </IconButton>
            </span>
          </span>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                sm: "auto auto",
                md: "auto auto auto",
                lg: "auto auto auto auto",
              },
              columnGap: "1rem",
              rowGap: "1rem",
              borderRadius: "0.75rem",
              // border: "0.085rem solid rgb(155, 155, 155)",
              overflow: "auto",
            }}
          >
            {images.map((m, index) => {
              return (
                <img
                  key={index}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                  }}
                  src={m.imgPath}
                ></img>
              );
            })}
            <span>
              <Link to="/about">about</Link>
            </span>
            <br></br>
            <span>
              <Link to="/images">images</Link>
            </span>
            <br></br>
            <span>
              <Link to="/">home</Link>
            </span>
          </Box>
        </>
      </div>
    </ThemeProvider>
  );
}
