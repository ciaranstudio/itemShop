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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FilterOutlinedIcon from "@mui/icons-material/FilterOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import BuyButton from "./BuyButton.jsx";
import SplitButton from "./SplitButton.jsx";
import useWindowDimensions from "../helpers/useWindowDimensions";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import ShuffleOnIcon from "@mui/icons-material/ShuffleOn";
// import InfoIcon from "@mui/icons-material/Info";
// import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
// import CropOriginalOutlinedIcon from "@mui/icons-material/CropOriginalOutlined";
// import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import HeightIcon from "@mui/icons-material/Height";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

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
  // activeCamPosAnim,
  // activeCamTargAnim,
  activeCamAnim,
  mobileView,
  // optionBoxItemChanged,
  setOptionBoxItemChanged,
  optionBoxItemToggle,
  setOptionBoxItemToggle,
  animateParts,
  animIconToggle,
  setAnimIconToggle,
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

  const toggleAnimateParts = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimIconToggle(true);
    animateParts();
    // setOptionBoxHeightMin(!optionBoxHeightMin);
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
    if (!activeCamAnim) {
      setOptionBoxItemChanged(true);
      setOptionBoxItemToggle(!optionBoxItemToggle);
      setCurrentItemName(shopItems[itemNo].itemName);
      setCurrentPartName(shopItems[itemNo].parts[0].partName);
      setPreviousItemSelected(item);
      setCurrentItemSelected(shopItems[itemNo]);
    }
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
              left: "0.25rem",
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
            <KeyboardReturnIcon
              color={!animActive ? "info" : "warning"}
              fontSize="inherit"
            />
          </IconButton>

          <div
            className="color-menu-item-title"
            style={{
              // position: optionBoxHeightMin ? "absolute" : "static",
              position: optionBoxHeightMin ? "absolute" : "static",
              top: optionBoxHeightMin ? "1.6rem" : "0",
              left: optionBoxHeightMin ? "50%" : "0",
              transform: optionBoxHeightMin ? "translate(-50%)" : "none",
              paddingTop: optionBoxHeightMin ? "0rem" : "0.5rem",
              marginBottom: "0.1rem",
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
                      backgroundColor: "rgb(233, 234, 233)",
                    }}
                    size="large"
                    // color={activeCamAnim ? "info" : "primary"}
                    disabled={activeCamAnim ? true : false}
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
          {/* <div
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
          </div> */}
          {/* <div className="color-menu-part-title">{item.size}</div> */}
          <span
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto auto",
              textAlign: "center",
              marginTop: "0.5rem",
              marginRight: "2rem",
              marginLeft: "2rem",
              border: "0.1rem solid rgb(155, 155, 155)",
              // border: optionBoxHeightMin
              //   ? "none"
              //   : "0.1rem solid rgb(155, 155, 155)",
              borderRadius: "2rem",
              backgroundColor: "rgb(233, 234, 233)",
            }}
          >
            <span>
              <IconButton
                onClick={toggleAnimateParts}
                disabled={animActive ? true : false}
                sx={{
                  padding: "0.5rem",
                }}
                aria-label="close order box"
              >
                {optionBoxHeightMin ? (
                  <OpenInFullIcon
                    color={animActive ? "warning" : "success"}
                    fontSize="inherit"
                  />
                ) : (
                  <OpenInFullIcon
                    color={animActive ? "warning" : "success"}
                    fontSize="inherit"
                  />
                )}
              </IconButton>
            </span>
            <span>
              <IconButton
                onClick={togglePhotoBox}
                color="info"
                // aria-label="close order box"
                sx={{
                  padding: "0.5rem",
                }}
              >
                <FilterOutlinedIcon fontSize="inherit" color="secondary" />
              </IconButton>
            </span>
            <span>
              <IconButton
                onClick={toggleInfoBox}
                color="info"
                // aria-label="close order box"
                sx={{
                  padding: "0.5rem",
                }}
              >
                <InfoOutlinedIcon fontSize="inherit" color="secondary" />
              </IconButton>
            </span>
            <span>
              <IconButton
                onClick={toggleOptionBoxHeight}
                color="white"
                // disabled={
                //   currentItemSelected.itemTitle === "noSelectTitle" ? true : false
                // }
                sx={{
                  padding: "0.5rem",
                }}
                aria-label="close order box"
              >
                {optionBoxHeightMin ? (
                  <UnfoldMoreIcon color="secondary" fontSize="inherit" />
                ) : (
                  <UnfoldLessIcon color="secondary" fontSize="inherit" />
                )}
              </IconButton>
            </span>
          </span>

          <div className="annotation">
            <div className="annotation-options">
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
            <div
              style={{
                display: optionBoxHeightMin ? "none" : "grid",
                gridTemplateColumns: "auto auto auto auto",
                columnGap: "1rem",
                alignItems: "center",
                paddingTop: "0.25rem",
              }}
            >
              <span></span>
              <div>
                <SplitButton
                  theme={theme}
                  images={item.images}
                  currentItemName={currentItemName}
                  randomCurrentItemParts={randomCurrentItemParts}
                />
              </div>
              <span
                className="buy-info-block"
                style={{
                  display: optionBoxHeightMin ? "none" : "block",
                  // paddingBottom: ".25rem",
                }}
              >
                <BuyButton
                  theme={theme}
                  item={objects[currentItemName]}
                  aria-label="add to shopping cart"
                />
              </span>
            </div>
          </span>
        </div>
      </ThemeProvider>
    </Html>
  );
}
