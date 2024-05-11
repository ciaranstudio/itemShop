import React, { useState } from "react";
import { Html } from "@react-three/drei";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { objects, shopItems } from "../../data/objects.jsx";
import { options, allOptions } from "../../data/options.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
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
import useWindowDimensions from "../../hooks/useWindowDimensions.jsx";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import toast from "react-hot-toast";
import { OPTION_BOX_POS_Y } from "../../data/constants.tsx";

export default function OptionBox({
  handlePartOption,
  toggleInfoBox,
  togglePhotoBox,
  theme,
}) {
  // helper hook
  const { height, width } = useWindowDimensions();

  // useState
  const [mobilePosYMax, setMobilePosYMax] = useState(
    OPTION_BOX_POS_Y.boxPosYMobileMax,
  );
  const [mobilePosYMin, setMobilePosYMin] = useState(
    OPTION_BOX_POS_Y.boxPosYMobileMin,
  );
  const [desktopPosYMax, setDesktopPosYMax] = useState(
    OPTION_BOX_POS_Y.boxPosYDesktopMax,
  );
  const [desktopPosYMin, setDesktopPosYMin] = useState(
    OPTION_BOX_POS_Y.boxPosYDesktopMin,
  );
  const [stainSingle, setStainSingle] = useState("");
  const [paintSingle, setPaintSingle] = useState("");

  // state from store
  const currentItemSelected = useOptionStore(
    (state) => state.currentItemSelected,
  );
  const currentPartName = useOptionStore((state) => state.currentPartName);
  const currentItemName = useOptionStore((state) => state.currentItemName);
  const mobileView = useOptionStore((state) => state.mobileView);
  const optionBoxHeightMin = useOptionStore(
    (state) => state.optionBoxHeightMin,
  );
  const showBackground = useOptionStore((state) => state.showBackground);
  const showPartOptions = useOptionStore((state) => state.showPartOptions);
  const optionBoxItemToggle = useOptionStore(
    (state) => state.optionBoxItemToggle,
  );
  const animActive = useOptionStore((state) => state.animActive);
  const activeCamAnim = useOptionStore((state) => state.activeCamAnim);
  const thisPartColorName = useOptionStore(
    (state) => state.items[currentItemName].parts[currentPartName].colorName,
  );
  const animateButton = useOptionStore((state) => state.animateButton);
  const setAnimateButton = useOptionStore((state) => state.setAnimateButton);

  // actions from store
  const setCurrentItemSelected = useOptionStore(
    (state) => state.setCurrentItemSelected,
  );
  const setPreviousItemSelected = useOptionStore(
    (state) => state.setPreviousItemSelected,
  );
  const setCurrentPartName = useOptionStore(
    (state) => state.setCurrentPartName,
  );
  const setCurrentItemName = useOptionStore(
    (state) => state.setCurrentItemName,
  );
  const setOptionBoxHeightMin = useOptionStore(
    (state) => state.setOptionBoxHeightMin,
  );
  const setShowBackground = useOptionStore((state) => state.setShowBackground);
  const setShowPartOptions = useOptionStore(
    (state) => state.setShowPartOptions,
  );
  const setOptionBoxItemChanged = useOptionStore(
    (state) => state.setOptionBoxItemChanged,
  );
  const setOptionBoxItemToggle = useOptionStore(
    (state) => state.setOptionBoxItemToggle,
  );
  const setAnimIconToggle = useOptionStore((state) => state.setAnimIconToggle);
  const getRandomInt = useOptionStore((state) => state.getRandomInt);

  // functions
  const toggleOptionBoxHeight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOptionBoxHeightMin(!optionBoxHeightMin);
  };
  const toggleAnimateParts = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimIconToggle(true);
    // animateParts();
    setAnimateButton(!animateButton);
  };
  const randomCurrentItemParts = (e, currentItemName, type) => {
    e.preventDefault();
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
      toast.dismiss();
    }
  };
  const itemMenuSelectHandler = (e, itemNo, popupState) => {
    if (!activeCamAnim) {
      setOptionBoxItemChanged(true);
      setOptionBoxItemToggle(!optionBoxItemToggle);
      setCurrentItemName(shopItems[itemNo].itemName);
      setCurrentPartName(shopItems[itemNo].parts[0].partName);
      setPreviousItemSelected(currentItemSelected);
      setCurrentItemSelected(shopItems[itemNo]);
    }
    popupState.close();
  };

  return (
    <Html
      position={[
        0,
        mobileView &&
        !optionBoxHeightMin &&
        width < OPTION_BOX_POS_Y.breakpointWidthSmallest
          ? mobilePosYMax + OPTION_BOX_POS_Y.tinyScreenOffsetNotMinimized
          : mobileView &&
              optionBoxHeightMin &&
              width > OPTION_BOX_POS_Y.breakpointWidthSmallest
            ? mobilePosYMin
            : !mobileView && !optionBoxHeightMin
              ? desktopPosYMax
              : mobileView &&
                  optionBoxHeightMin &&
                  width < OPTION_BOX_POS_Y.breakpointWidthSmallest
                ? mobilePosYMin + OPTION_BOX_POS_Y.tinyScreenOffsetMinimized
                : mobileView &&
                    !optionBoxHeightMin &&
                    width > OPTION_BOX_POS_Y.breakpointWidthSmallest
                  ? mobilePosYMax
                  : !mobileView && optionBoxHeightMin
                    ? desktopPosYMin
                    : 0,
        0,
      ]}
      center={true}
      style={{
        display: showPartOptions && !showBackground ? "block" : "none",
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          className="annotation-wrapper"
          style={{
            paddingTop: optionBoxHeightMin ? "3rem" : "0rem",
            marginTop: optionBoxHeightMin ? "1.25rem" : "0rem",
          }}
        >
          <IconButton
            onClick={(e) => closePartOptions(e)}
            color="primary"
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
            sx={{
              position: "absolute",
              pointerEvents: "auto",
              top: optionBoxHeightMin ? "1.5rem" : "1",
              right: "0.25rem",
              padding: "0.5rem",
            }}
            aria-label="show background"
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
              position: optionBoxHeightMin ? "absolute" : "static",
              top: optionBoxHeightMin ? "1.6rem" : "0",
              left: optionBoxHeightMin ? "50%" : "0",
              transform: optionBoxHeightMin ? "translate(-50%)" : "none",
              paddingTop: optionBoxHeightMin ? "0rem" : "0.5rem",
            }}
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
                    disabled={activeCamAnim ? true : false}
                    aria-label="open item select list"
                  >
                    {currentItemSelected.itemTitle}
                  </Button>
                  <Menu
                    {...bindMenu(popupState)}
                    sx={{
                      "& .MuiPaper-root": {
                        backgroundColor: "lightgrey",
                        border: "0.075rem solid rgb(33, 33, 33);",
                      },
                    }}
                    aria-label="item select menu"
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
          </div>
          <span
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto auto",
              textAlign: "center",
              marginTop: "0.45rem",
              marginRight: "2rem",
              marginLeft: "2rem",
              border: "0.1rem solid rgb(155, 155, 155)",
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
                aria-label="animate item parts to explode apart"
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
                aria-label="toggle photo box"
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
                aria-label="toggle info box"
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
                sx={{
                  padding: "0.5rem",
                }}
                aria-label="toggle minimize/maximize option box height"
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
                        aria-label="select stain color"
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
                        aria-label="select paint color"
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
                  // theme={theme}
                  currentItemName={currentItemName}
                  randomCurrentItemParts={randomCurrentItemParts}
                />
              </div>
              <span
                className="buy-info-block"
                style={{
                  display: optionBoxHeightMin ? "none" : "block",
                }}
              >
                <BuyButton theme={theme} item={objects[currentItemName]} />
              </span>
            </div>
          </span>
        </div>
      </ThemeProvider>
    </Html>
  );
}
