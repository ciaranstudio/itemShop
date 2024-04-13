import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { useOptionStore } from "../store/useOptionStore.tsx";
// import { textures } from "../data/textures.jsx";
import { objects, shopItems } from "../data/objects.jsx";
import { options, allOptions } from "../data/options.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import ShuffleOnIcon from "@mui/icons-material/ShuffleOn";
// import InfoIcon from "@mui/icons-material/Info";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
// import CropOriginalOutlinedIcon from "@mui/icons-material/CropOriginalOutlined";
import FilterOutlinedIcon from "@mui/icons-material/FilterOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
// import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
// import HeightIcon from "@mui/icons-material/Height";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BuyButton from "./BuyButton.jsx";
import SplitButton from "./SplitButton.jsx";
import useWindowDimensions from "../helpers/useWindowDimensions";

// import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

export default function OptionBox({
  item,
  setCurrentItemSelected,
  setPreviousItemSelected,
  currentItemName,
  setCurrentItemName,
  currentPartName,
  setCurrentPartName,
  showBackground,
  setShowBackground,
  showPartOptions,
  setShowPartOptions,
  handlePartOption,
  getRandomInt,
  toggleInfoBox,
  togglePhotoBox,
  theme,
  // allPhotos,
  // aboutInfo,
  optionBoxHeightMin,
  setOptionBoxHeightMin,
  animActive,
  mobileView,
  // changeItemNoBackground,
  setChangeItemNoBackground,
}) {
  const { height, width } = useWindowDimensions();

  const boxPosYMobileMax = 15; // 15 looks good on chrome simulator 04/11/2024
  const boxPosYMobileMin = 5; // 5 looks good on chrome simulator 04/11/2024

  const boxPosYDesktopMax = 3; // 3 looks good on chrome simulator 04/11/2024
  const boxPosYDesktopMin = -4; // -4 looks good on chrome simulator 04/11/2024

  const notTinyScreenOffsetMinimized = -3; // -6 looks good on chrome simulator 04/11/2024
  const notTinyScreenOffsetNotMinimized = -4; // 0 looks good on chrome simulator 04/11/2024

  const breakpointWidthSmallest = 380;

  const [mobilePosYMax, setMobilePosYMax] = useState(boxPosYMobileMax);
  const [mobilePosYMin, setMobilePosYMin] = useState(boxPosYMobileMin);

  const [desktopPosYMax, setDesktopPosYMax] = useState(boxPosYDesktopMax);
  const [desktopPosYMin, setDesktopPosYMin] = useState(boxPosYDesktopMin);

  const toggleOptionBoxHeight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOptionBoxHeightMin(!optionBoxHeightMin);
  };

  useEffect(() => {
    if (mobileView && !optionBoxHeightMin) {
      if (item.itemName === "horse" || item.itemName.includes("shelf")) {
        setMobilePosYMax(boxPosYMobileMax + 2.5);
      } else {
        setMobilePosYMax(boxPosYMobileMax);
      }
    }
  }, [item, mobileView, optionBoxHeightMin]);

  const [stainSingle, setStainSingle] = useState("");
  const [paintSingle, setPaintSingle] = useState("");

  const thisPartColorName = useOptionStore(
    (state) => state.items[currentItemName].parts[currentPartName].colorName,
  );

  const randomCurrentItemParts = (e, currentItemName, type) => {
    e.preventDefault(); //  is this necessary if it is also being called in handlePartOption function ? Remove from one of them or make conditional in handlePartOption like e.stopPropogation ?
    let color = "";
    let tempStainSingle = options.stains[getRandomInt(options.stains.length)];
    let tempPaintSingle = options.paints[getRandomInt(options.paints.length)];
    while (tempStainSingle === stainSingle) {
      tempStainSingle = options.stains[getRandomInt(options.stains.length)];
    }
    setStainSingle(tempStainSingle);
    while (tempPaintSingle === paintSingle) {
      tempPaintSingle = options.paints[getRandomInt(options.paints.length)];
    }
    setPaintSingle(tempPaintSingle);
    let randomThisItemColors = objects[currentItemName].parts.map((part) => {
      if (type === "stainMixed") {
        color = options.stains[getRandomInt(options.stains.length)];
      } else if (type === "stainSingle") {
        color = tempStainSingle;
      } else if (type === "allMixed") {
        color = allOptions[getRandomInt(allOptions.length)];
      } else if (type === "paintMixed") {
        color = options.paints[getRandomInt(options.paints.length)];
      } else if (type === "paintSingle") {
        color = tempPaintSingle;
      }
      handlePartOption(e, currentItemName, part.partName, color, false);
      return color;
    });
    console.log("random colors generated list: ", randomThisItemColors);
  };

  const closePartOptions = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPartOptions(false);
  };

  const partShowBackground = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // if animation is active disable
    if (!animActive && !showBackground) {
      setShowPartOptions(false);
      setShowBackground(true);
    }
  };

  const itemMenuSelectHandler = (e, itemNo, popupState) => {
    // console.log(popupState);
    setChangeItemNoBackground(true);
    setCurrentItemName(shopItems[itemNo].itemName);
    setCurrentPartName(shopItems[itemNo].parts[0].partName);
    setPreviousItemSelected(item);
    setCurrentItemSelected(shopItems[itemNo]);
    popupState.close();
  };

  // mobilePosYMax
  // mobilePosYMin
  // desktopPosYMax
  // desktopPosYMin
  return (
    <Html
      position={[
        0,
        mobileView && !optionBoxHeightMin && width < breakpointWidthSmallest
          ? mobilePosYMax
          : mobileView && optionBoxHeightMin && width > breakpointWidthSmallest
            ? mobilePosYMin + notTinyScreenOffsetMinimized
            : !mobileView && !optionBoxHeightMin
              ? desktopPosYMax
              : mobileView &&
                  optionBoxHeightMin &&
                  width < breakpointWidthSmallest
                ? mobilePosYMin
                : mobileView &&
                    !optionBoxHeightMin &&
                    width > breakpointWidthSmallest
                  ? mobilePosYMax + notTinyScreenOffsetNotMinimized
                  : !mobileView && optionBoxHeightMin
                    ? desktopPosYMin
                    : 0,
        0,
      ]}
      center={true}
      style={{
        display: showPartOptions && !showBackground ? "block" : "none",
        // transition: "display 0s ease-out 0.25s",
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          className="annotation-wrapper"
          style={{
            paddingTop: optionBoxHeightMin ? "2.75rem" : "0rem",
            marginTop: optionBoxHeightMin ? "1.25rem" : "0rem",
          }}
        >
          <IconButton
            onClick={(e) => closePartOptions(e)}
            color="primary"
            // disabled={
            //   currentItemSelected.itemTitle === "noSelectTitle" ? true : false
            // }
            sx={{
              position: "absolute",
              pointerEvents: "auto",
              top: optionBoxHeightMin ? "1.5rem" : "1",
              left: "0.15rem",
              padding: "0.5rem",
            }}
            aria-label="close order box"
          >
            <CloseOutlinedIcon color="success" fontSize="inherit" />
          </IconButton>

          <IconButton
            onClick={(e) => partShowBackground(e)}
            // disabled={
            //   currentItemSelected.itemTitle === "noSelectTitle" ? true : false
            // }
            sx={{
              position: "absolute",
              pointerEvents: "auto",
              top: optionBoxHeightMin ? "1.5rem" : "1",
              right: "0.25rem",
              padding: "0.5rem",
            }}
            aria-label="close order box"
            disabled={animActive}
          >
            <VisibilityIcon
              color={!animActive ? "info" : "warning"}
              fontSize="inherit"
            />
          </IconButton>

          <IconButton
            onClick={toggleOptionBoxHeight}
            color="white"
            // disabled={
            //   currentItemSelected.itemTitle === "noSelectTitle" ? true : false
            // }
            sx={{
              position: "absolute",
              pointerEvents: "auto",
              top: optionBoxHeightMin ? "1.5rem" : "2rem",
              // right: "2.45rem",
              right: optionBoxHeightMin ? "2.5rem" : "0.25rem",
              padding: "0.5rem",
            }}
            aria-label="close order box"
          >
            {optionBoxHeightMin ? (
              <ExpandCircleDownIcon color="secondary" fontSize="inherit" />
            ) : (
              <UnfoldLessIcon color="secondary" fontSize="inherit" />
            )}
          </IconButton>

          <div
            className="color-menu-item-title"
            style={{
              position: optionBoxHeightMin ? "absolute" : "static",
              top: optionBoxHeightMin ? "1.4rem" : "0",
              right: optionBoxHeightMin ? "calc(50% - 1.2rem)" : "0",
              paddingTop: optionBoxHeightMin ? "0rem" : "0.5rem",
            }}

            // style={{ display: optionBoxHeightMin ? "none" : "block" }}
          >
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button
                    variant="outlined"
                    {...bindTrigger(popupState)}
                    sx={{
                      fontFamily: "var(--leva-fonts-mono)",
                      fontSize: optionBoxHeightMin ? "0.65rem" : "1.1rem",
                    }}
                    size="large"
                  >
                    {item.itemTitle}
                  </Button>
                  <Menu
                    {...bindMenu(popupState)}
                    sx={{
                      "& .MuiPaper-root": {
                        backgroundColor: "lightgrey",
                        border: "0.075rem solid rgb(255, 255, 255);",
                      },
                    }}
                  >
                    {shopItems.map((shopItem, index) => {
                      return (
                        <MenuItem
                          key={shopItem.itemNo}
                          onClick={(e) =>
                            itemMenuSelectHandler(
                              e,
                              shopItem.itemNo,
                              popupState,
                            )
                          }
                          sx={{ fontFamily: "var(--leva-fonts-mono)" }}
                        >
                          {shopItem.itemTitle}
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
            {/* <Typography
              variant={optionBoxHeightMin ? "h6" : "h6"}
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
              color="primary"
            >
              {item.itemTitle}
            </Typography> */}
          </div>
          <div
            className="color-menu-item-description"
            style={{ display: optionBoxHeightMin ? "none" : "block" }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
              color="secondary"
            >
              {item.itemDescription}
            </Typography>
          </div>
          {/* <div className="color-menu-part-title">{item.size}</div> */}
          <div className="annotation">
            <div
              className="annotation-options"
              // style={{
              //   // pointerEvents: "none",
              //   // userSelect: "none",
              //   display: "grid",
              // }}
            >
              {/* {o.userData.name} */}
              <div className="grid-container-stain">
                {options.stains.map((stain) => {
                  return (
                    <span key={stain}>
                      <IconButton
                        onClick={(e) =>
                          handlePartOption(
                            e,
                            currentItemName,
                            currentPartName,
                            stain,
                            true,
                          )
                        }
                        color="info"
                        aria-label="close order box"
                      >
                        <CircleIcon
                          fontSize="large"
                          sx={{
                            color:
                              stain === "white"
                                ? "#a89d93"
                                : stain === "natural"
                                  ? "#908073"
                                  : stain === "black"
                                    ? "#635245"
                                    : stain === "allBlack"
                                      ? "#0b0502"
                                      : "#ffffff",
                            border:
                              thisPartColorName === stain
                                ? "0.15rem solid grey" // #5580b0
                                : "0.15rem solid lightGrey",
                            borderRadius: "50%",
                          }}
                        />
                      </IconButton>
                    </span>
                  );
                })}
              </div>

              <div className="grid-container-paint">
                {options.paints.map((paint) => {
                  return (
                    <span key={paint}>
                      <IconButton
                        onClick={(e) =>
                          handlePartOption(
                            e,
                            currentItemName,
                            currentPartName,
                            paint,
                            true,
                          )
                        }
                        color="info"
                        aria-label="close order box"
                      >
                        <CircleIcon
                          fontSize="large"
                          sx={{
                            color:
                              paint === "alabaster"
                                ? "#fffdf0"
                                : paint === "pink"
                                  ? "#f2d1c6"
                                  : paint === "basil"
                                    ? "#929d84"
                                    : paint === "yellow"
                                      ? "#f2d684"
                                      : paint === "blue"
                                        ? "#96b0aa"
                                        : paint === "gray"
                                          ? "#8c8b81"
                                          : "#ffffff",
                            border:
                              thisPartColorName === paint
                                ? "0.15rem solid grey" // #5580b0
                                : "0.15rem solid lightGrey",
                            borderRadius: "50%",
                          }}
                        />
                      </IconButton>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <span className="split-shuffle-block">
            <SplitButton
              theme={theme}
              images={item.images}
              currentItemName={currentItemName}
              randomCurrentItemParts={randomCurrentItemParts}
            />
          </span>
          {/* <div className="shuffle-color-block">
          <span>
            <IconButton
              onClick={(e) =>
                randomCurrentItemParts(e, currentItemName, "stainSingle")
              }
              color="info"
              aria-label="close order box"
            >
              <ShuffleOnIcon fontSize="inherit" color="white" />
            </IconButton>
          </span>
          <span>
            <IconButton
              onClick={(e) =>
                randomCurrentItemParts(e, currentItemName, "stainMixed")
              }
              color="info"
              aria-label="close order box"
            >
              <ShuffleOnIcon fontSize="inherit" color="secondary" />
            </IconButton>
          </span>
          <span>
            <IconButton
              onClick={(e) =>
                randomCurrentItemParts(e, currentItemName, "allMixed")
              }
              color="info"
              aria-label="close order box"
            >
              <ShuffleOnIcon fontSize="inherit" color="success" />
            </IconButton>
          </span>
          <span>
            <IconButton
              onClick={(e) =>
                randomCurrentItemParts(e, currentItemName, "paintMixed")
              }
              color="info"
              aria-label="close order box"
            >
              <ShuffleOnIcon fontSize="inherit" color="warning" />
            </IconButton>
          </span>
          <span>
            <IconButton
              onClick={(e) =>
                randomCurrentItemParts(e, currentItemName, "paintSingle")
              }
              color="info"
              aria-label="close order box"
            >
              <ShuffleOnIcon fontSize="inherit" color="error" />
            </IconButton>
          </span>
        </div> */}
          <div
            className="buy-info-block"
            style={{ display: optionBoxHeightMin ? "none" : "grid" }}
          >
            <span>
              <IconButton
                onClick={(e) => togglePhotoBox(e)}
                color="info"
                aria-label="close order box"
              >
                <FilterOutlinedIcon fontSize="inherit" color="secondary" />
              </IconButton>
            </span>
            {/* <button className="color-shuffle-btn " onClick={togglePhotoBox}>
            <PhotoLibraryIcon fontSize="inherit" color="primary" />
          </button> */}
            <BuyButton
              theme={theme}
              item={objects[currentItemName]}
              aria-label="add to shopping cart"
            />
            <span>
              <IconButton
                onClick={(e) => toggleInfoBox(e)}
                color="info"
                aria-label="close order box"
              >
                <InfoOutlinedIcon fontSize="inherit" color="secondary" />
              </IconButton>
            </span>
            {/* <button className="color-shuffle-btn " onClick={toggleInfoBox}>
            <InfoIcon fontSize="inherit" color="info" />
          </button> */}
          </div>
        </div>
      </ThemeProvider>
    </Html>
  );
}
