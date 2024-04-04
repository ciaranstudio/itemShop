import { useRef, useState, useEffect, Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import BuyButton from "./BuyButton.jsx";
import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
// import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ShuffleIcon from "@mui/icons-material/Shuffle";

// replace this with Splide vertical, allows more customization of height, unless this slick slider can with CSS prop, test TBD
import SimpleSlider from "./SimpleSlider.jsx";

// import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";

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
  randomAllItemsParts,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

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
    // if (showBackground) {
    //   setOpen(!open);
    //   setInfoBoxIcon(!infoBoxIcon);
    // }
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
          aria-label="open order box for item details and options"
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
              top: "0.15rem",
              left: "0.15rem",
              padding: "0.5rem",
            }}
            aria-label="close order box"
          >
            <CloseOutlinedIcon
              fontSize="small"
              sx={{ color: "primary.light" }}
            />
          </IconButton>

          {/* <IconButton
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
              <VisibilityOffIcon sx={{ color: "primary.light" }} />
            ) : (
              <VisibilityIcon sx={{ color: "secondary.light" }} />
            )}
          </IconButton> */}

          {/* <IconButton
            onClick={(e) => randomAllItemsParts(e)}
            color="inherit"
            // disabled={
            //   currentItemSelected.itemTitle === "noSelectTitle" ? true : false
            // }
            sx={{
              position: "absolute",
              pointerEvents: "auto",
              top: "2.25rem",
              right: "0.25rem",
              padding: "0.5rem",
            }}
          >
            <ShuffleIcon sx={{ color: "primary.light" }} />
          </IconButton> */}

          <div id="title">
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
            <IconButton
              sx={{ padding: "0.75rem" }}
              onClick={handleClickOpen}
              aria-label="open photos box to view item images"
            >
              <PhotoLibraryIcon
                sx={{
                  color: "primary.light",
                  // border: "0.75px solid #757575",
                  // borderRadius: Math.PI,
                  fontSize: "inherit",
                  pointerEvents: "auto",
                }}
              />
            </IconButton>
            {/* </Tooltip> */}

            <IconButton
              onClick={(e) => randomAllItemsParts(e)}
              color="inherit"
              // disabled={
              //   currentItemSelected.itemTitle === "noSelectTitle" ? true : false
              // }
              sx={{
                // position: "absolute",
                pointerEvents: "auto",
                // top: "2.25rem",
                // right: "0.25rem",
                padding: "0.75rem",
              }}
              aria-label="shuffle item part colors / finish options"
            >
              <ShuffleIcon sx={{ color: "primary.main" }} />
            </IconButton>

            {/* <Tooltip
              title="View details"
              disableFocusListener
              disableTouchListener
              leaveDelay={0}
              // open={open}
            > */}
            <IconButton
              sx={{
                // mx: 2,
                padding: "0.75rem",
              }}
              onClick={(e) => toggleLongDesc(e)}
              aria-label="show item short or long description"
            >
              {showLongDesc ? (
                <InfoIcon
                  sx={{
                    color: "secondary.light",
                    // border: "0.75px solid #757575",
                    // borderRadius: Math.PI,
                    fontSize: "inherit",
                    pointerEvents: "auto",
                  }}
                />
              ) : (
                <InfoOutlinedIcon
                  sx={{
                    // color: showLongDesc ? "secondary.light" : "primary.light",
                    // border: "0.75px solid #757575",
                    // borderRadius: Math.PI,
                    fontSize: "inherit",
                    pointerEvents: "auto",
                  }}
                />
              )}
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
              sx={{ padding: "0.75rem" }}
              aria-label="animate items parts / toggle exploding view"
            >
              <OpenWithIcon
                sx={{
                  color: animActive ? "primary.light" : "primary.main",
                  // border: "0.75px solid #757575",
                  // borderRadius: Math.PI,
                  fontSize: "inherit",
                  pointerEvents: "auto",
                }}
              />
            </IconButton>
            {/* </Tooltip> */}
            <IconButton
              onClick={(e) => toggleBackground(e)}
              color="inherit"
              // disabled={
              //   currentItemSelected.itemTitle === "noSelectTitle" ? true : false
              // }
              sx={{
                // position: "absolute",
                pointerEvents: "auto",
                // top: "0.25rem",
                // right: "0.25rem",
                padding: "0.75rem",
              }}
              aria-label="hide background to show selected item part options or show background and hide item part options"
            >
              {showBackground ? (
                <VisibilityIcon sx={{ color: "primary.light" }} />
              ) : (
                <VisibilityOffIcon sx={{ color: "secondary.light" }} />
              )}
            </IconButton>
          </span>
          <div id="description">
            {showLongDesc
              ? currentItemSelected.itemLongDescription
              : currentItemSelected.itemDescription}
          </div>
          <div id="size">{currentItemSelected.size}</div>
          <BuyButton
            theme={theme}
            item={currentItemSelected}
            aria-label="add to shopping cart"
          >
            {currentItemSelected.itemTitle}
          </BuyButton>
        </div>
        <div className="footer">Eli Gfell Studio</div>
        <Dialog
          fullScreen
          open={openDialog}
          onClose={handleClose}
          PaperProps={{
            sx: {
              maxWidth: "80vw",
              maxHeight: "85vh",
              opacity: 0.95,
              borderRadius: "1rem",
              color: "primary.main",
              background: "#b8c2c4",
            },
          }}
        >
          <DialogTitle
            sx={{
              textAlign: "center",
              fontFamily: "var(--leva-fonts-mono)",
            }}
          >
            {currentItemSelected.itemTitle}
          </DialogTitle>
          <DialogContent sx={{ overflowX: "hidden !important" }}>
            <SimpleSlider />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="primary"
              sx={{ color: "primary.light" }}
              aria-label="close photos box"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
}
