// import { useRef, useState, useEffect, Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import BuyButton from "./BuyButton.jsx";
import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
// import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// import * as React from "react";
// import { useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MobileStepper from "@mui/material/MobileStepper";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// // import SwipeableViews from "react-swipeable-views";
// // import { autoPlay } from "react-swipeable-views-utils";

export default function OrderBox({
  open,
  setOpen,
  infoBoxIcon,
  setInfoBoxIcon,
  showLongDesc,
  setShowLongDesc,
  showBackground,
  setShowBackground,
  animateParts,
  animActive,
  currentItemSelected,
}) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#212121",
        light: "#757575",
      },

      secondary: {
        main: "#bdbdbd",
        light: "#E0E0E0",
      },
    },
    shadows: Array(25).fill("none"),
    components: {
      MuiDrawer: {
        styleOverrides: {
          modal: {
            ".MuiModal-backdrop": {
              background: "none",
            },
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          colorSecondary: {
            color: "#212121",
          },
        },
      },
    },
  });

  const toggleInfoBox = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // setShowPartOptions(false);
    // setShowBackground(true);
    setOpen(!open);
    setInfoBoxIcon(!infoBoxIcon);
  };

  const toggleBackground = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // setShowPartOptions(false);
    setShowBackground(!showBackground);
    // setOpen(!open);
    // setInfoBoxIcon(!infoBoxIcon);
  };

  const toggleLongDesc = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowLongDesc(!showLongDesc);
    // setShowPartOptions(false);
    // setShowBackground(!showBackground);
    // setOpen(!open);
    // setInfoBoxIcon(!infoBoxIcon);
  };

  const images = [
    {
      label: "San Francisco – Oakland Bay Bridge, United States",
      imgPath:
        "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
    },
    {
      label: "Bird",
      imgPath:
        "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
    },
    {
      label: "Bali, Indonesia",
      imgPath:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
    },
    {
      label: "Goč, Serbia",
      imgPath:
        "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
    },
  ];

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <Tooltip
          title="View details"
          // enterDelay={0}
          leaveDelay={0}
          // disableFocusListener
          // disableTouchListener
          // open={infoBoxIcon}
        > */}
        <IconButton
          onClick={(e) => toggleInfoBox(e)}
          color="inherit"
          disabled={
            currentItemSelected.itemTitle === "noSelectTitle" ? true : false
          }
          sx={{
            position: "absolute",
            bottom: "1.5rem",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: !infoBoxIcon ? "none" : "block",
            padding: "1.5rem",
          }}
        >
          <RadioButtonCheckedOutlinedIcon
            sx={{
              color:
                currentItemSelected.itemTitle === "noSelectTitle"
                  ? "secondary.main"
                  : "white",
              fontSize: "inherit",
            }}
          />
        </IconButton>
        {/* </Tooltip> */}

        <div
          className="info"
          style={{
            color: theme.palette.primary.light,
            // display:
            //   currentItemSelected.itemTitle === "noSelectTitle"
            //     ? "none"
            //     : "block",
            display: !open ? "none" : "block",
          }}
        >
          <IconButton
            onClick={(e) => toggleInfoBox(e)}
            color="inherit"
            // disabled={
            //   currentItemSelected.itemTitle === "noSelectTitle" ? true : false
            // }
            sx={{
              position: "absolute",
              pointerEvents: "auto",
              top: "0.25rem",
              left: "0.25rem",
              padding: "0.5rem",
            }}
          >
            <CloseOutlinedIcon sx={{ color: "secondary.main" }} />
          </IconButton>

          <IconButton
            onClick={(e) => toggleBackground(e)}
            color="inherit"
            // disabled={
            //   currentItemSelected.itemTitle === "noSelectTitle" ? true : false
            // }
            sx={{
              position: "absolute",
              pointerEvents: "auto",
              top: "0.25rem",
              right: "0.25rem",
              padding: "0.5rem",
            }}
          >
            {showBackground ? (
              <VisibilityIcon sx={{ color: "secondary.main" }} />
            ) : (
              <VisibilityOffIcon sx={{ color: "secondary.main" }} />
            )}
          </IconButton>

          <div>
            {currentItemSelected.itemTitle === "noSelectTitle"
              ? ""
              : `${currentItemSelected.itemTitle}`}
          </div>
          <span
            style={{
              display:
                currentItemSelected.itemTitle === "noSelectTitle"
                  ? "none"
                  : "block",
            }}
          >
            {/* <Tooltip
              title="View photos"
              // disableFocusListener
              // disableTouchListener
              leaveDelay={0}
              // open={open}
            > */}
            <IconButton sx={{ padding: "1rem" }}>
              <PhotoLibraryIcon
                sx={{
                  color: "secondary.main",
                  // border: "0.75px solid #757575",
                  // borderRadius: Math.PI,
                  fontSize: "inherit",
                  pointerEvents: "auto",
                }}
              />
            </IconButton>
            {/* </Tooltip> */}

            {/* <Tooltip
              title="View details"
              disableFocusListener
              disableTouchListener
              leaveDelay={0}
              // open={open}
            > */}
            <IconButton
              sx={{ mx: 2, padding: "1rem" }}
              onClick={(e) => toggleLongDesc(e)}
            >
              <InfoIcon
                sx={{
                  color: showLongDesc ? "secondary.light" : "secondary.main",
                  // border: "0.75px solid #757575",
                  // borderRadius: Math.PI,
                  fontSize: "inherit",
                  pointerEvents: "auto",
                }}
              />
            </IconButton>
            {/* </Tooltip> */}

            {/* <Tooltip
              title="Exploding view"
              // disableFocusListener
              // disableTouchListener
              leaveDelay={0}
              // open={open}
            > */}
            <IconButton
              onClick={animateParts}
              // onClick={() => {
              //   setToggled(!toggled);
              //   console.log("clicked animate");
              // }}
              // disabled={animActive ? true : false}
              sx={{ padding: "1rem" }}
            >
              <OpenWithIcon
                sx={{
                  color: animActive ? "secondary.light" : "secondary.main",
                  // border: "0.75px solid #757575",
                  // borderRadius: Math.PI,
                  fontSize: "inherit",
                  pointerEvents: "auto",
                }}
              />
            </IconButton>
            {/* </Tooltip> */}
          </span>
          <div id="description">
            {showLongDesc
              ? currentItemSelected.itemLongDescription
              : currentItemSelected.itemDescription}
          </div>
          <div id="size">{currentItemSelected.size}</div>
          <BuyButton theme={theme} item={currentItemSelected}>
            {currentItemSelected.itemTitle}
          </BuyButton>
        </div>
      </ThemeProvider>
    </>
  );
}
