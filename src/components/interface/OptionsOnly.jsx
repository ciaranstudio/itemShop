import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { objects, shopItems } from "../../data/objects.js";
import { options, allOptions } from "../../data/options.js";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import BuyButton from "./BuyButton.jsx";
import SplitButton from "./SplitButton.jsx";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ExpandIcon from "@mui/icons-material/Expand";
import PaletteIcon from "@mui/icons-material/Palette";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import { unselectedItem } from "../../data/objects.js";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { goTo } from "../../utils/goTo.js";
import { theme } from "../../data/theme.js";
import { handlePartOption } from "../../utils/handlePartOption.js";

export default function OptionsOnly() {
  // useState
  const [stainSingle, setStainSingle] = useState("");
  const [paintSingle, setPaintSingle] = useState("");

  // state from store
  const currentItemSelected = useOptionStore(
    (state) => state.currentItemSelected,
  );
  const locationPathname = useOptionStore((state) => state.locationPathname);
  const currentPartName = useOptionStore((state) => state.currentPartName);
  const currentItemName = useOptionStore((state) => state.currentItemName);
  const showPaintOptions = useOptionStore((state) => state.showPaintOptions);
  const showBackground = useOptionStore((state) => state.showBackground);
  const optionBoxItemToggle = useOptionStore(
    (state) => state.optionBoxItemToggle,
  );
  const animActive = useOptionStore((state) => state.animActive);
  const activeCamAnim = useOptionStore((state) => state.activeCamAnim);
  const thisPartColorName = useOptionStore(
    (state) => state.items[currentItemName].parts[currentPartName].colorName,
  );
  const animateButton = useOptionStore((state) => state.animateButton);
  const adminFlag = useOptionStore((state) => state.adminFlag);

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
  const setShowPaintOptions = useOptionStore(
    (state) => state.setShowPaintOptions,
  );
  const setShowBackground = useOptionStore((state) => state.setShowBackground);
  // const setShowPartOptions = useOptionStore(
  //   (state) => state.setShowPartOptions,
  // );
  const setOptionBoxItemChanged = useOptionStore(
    (state) => state.setOptionBoxItemChanged,
  );
  const setOptionBoxItemToggle = useOptionStore(
    (state) => state.setOptionBoxItemToggle,
  );
  const setAnimIconToggle = useOptionStore((state) => state.setAnimIconToggle);
  const getRandomInt = useOptionStore((state) => state.getRandomInt);
  // actions from store
  const updatePartColor = useOptionStore((state) => state.updatePartColor);
  const updatePartColorName = useOptionStore(
    (state) => state.updatePartColorName,
  );
  const updatePartTexture = useOptionStore((state) => state.updatePartTexture);
  const calculateItemPrice = useOptionStore(
    (state) => state.calculateItemPrice,
  );
  const setAnimateButton = useOptionStore((state) => state.setAnimateButton);

  // functions
  const toggleShowPaintOptions = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPaintOptions(!showPaintOptions);
  };
  const toggleAnimateParts = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimIconToggle(true);
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
      handlePartOption(
        e,
        currentItemName,
        part.partName,
        color,
        false,
        updatePartColor,
        updatePartColorName,
        updatePartTexture,
        calculateItemPrice,
      );
      return color;
    });
    console.log("random colors generated list: ", randomThisItemColors);
  };
  // const closePartOptions = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   // setShowPartOptions(false);
  // };
  const partToggleBackground = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // if animation is active then disable
    if (!animActive && !showBackground) {
      // setShowPartOptions(false);
      setShowBackground(true);
      // toast.dismiss();
    } else if (!animActive && showBackground) {
      setShowBackground(false);
      // toast.dismiss();
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

  const getIconColor = (anim) => {
    let color = "primary";
    const showBackgroundColor = "info";
    const showBackgroundColorAnim = "secondary";
    const hideBackgroundColor = "primary";
    const hideBackgroundColorAnim = "secondary";

    if (showBackground) {
      if (anim) {
        color = !animActive ? showBackgroundColor : showBackgroundColorAnim;
      } else {
        color = showBackgroundColor;
      }
    } else {
      if (anim) {
        color = !animActive ? hideBackgroundColor : hideBackgroundColorAnim;
      } else {
        color = hideBackgroundColor;
      }
    }
    return color;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className={adminFlag ? "admin-options" : "options"}
        style={{
          display:
            locationPathname === "/" &&
            currentItemSelected !== unselectedItem &&
            !showBackground
              ? "block"
              : adminFlag
                ? "block"
                : "none",
        }}
      >
        <div className={adminFlag ? "admin-options-box" : "options-box"}>
          <div className="annotation-wrapper">
            <span
              className="annotation-wrapper-span"
              style={{ display: adminFlag ? "none" : "grid" }}
            >
              <span>
                <IconButton
                  onClick={(e) => partToggleBackground(e)}
                  sx={{
                    padding: "0.5rem",
                  }}
                  aria-label="show background"
                  disabled={animActive}
                >
                  {showBackground ? (
                    <VisibilityOutlinedIcon
                      color={getIconColor(true)}
                      fontSize="inherit"
                    />
                  ) : (
                    <VisibilityOffOutlinedIcon
                      color={getIconColor(true)}
                      fontSize="inherit"
                    />
                  )}
                </IconButton>
              </span>
              <span>
                <IconButton
                  onClick={toggleAnimateParts}
                  disabled={animActive ? true : false}
                  sx={{
                    padding: "0.5rem",
                  }}
                  aria-label="animate item parts to explode apart"
                >
                  <ExpandIcon color={getIconColor(true)} fontSize="inherit" />
                </IconButton>
              </span>
              <span>
                <IconButton
                  onClick={() => goTo("/info")}
                  aria-label="toggle info box"
                  sx={{
                    padding: "0.5rem",
                  }}
                >
                  <InfoOutlinedIcon
                    color={getIconColor(false)}
                    fontSize="inherit"
                  />
                </IconButton>
              </span>
              <span>
                <IconButton
                  onClick={toggleShowPaintOptions}
                  sx={{
                    padding: "0.5rem",
                  }}
                  aria-label="toggle minimize/maximize option box height"
                >
                  {showPaintOptions ? (
                    <PaletteIcon
                      color={getIconColor(false)}
                      fontSize="inherit"
                    />
                  ) : (
                    <PaletteOutlinedIcon
                      color={getIconColor(false)}
                      fontSize="inherit"
                    />
                  )}
                </IconButton>
              </span>
            </span>
            <div
              className="colors-box"
              style={{ display: showPaintOptions ? "block" : "none" }}
            >
              <div className="colors-box-buttons">
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
                              updatePartColor,
                              updatePartColorName,
                              updatePartTexture,
                              calculateItemPrice,
                            )
                          }
                          color="info"
                          aria-label="select stain color"
                        >
                          <CircleIcon
                            fontSize="medium"
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
                                  ? "0.125rem solid brown" // #5580b0
                                  : "none",
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
                              updatePartColor,
                              updatePartColorName,
                              updatePartTexture,
                              calculateItemPrice,
                            )
                          }
                          color="info"
                          aria-label="select paint color"
                        >
                          <CircleIcon
                            fontSize="medium"
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
                                  ? "0.125rem solid grey" // #5580b0
                                  : "none",
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
            <span
              className={
                adminFlag ? "admin-shuffle-block" : "split-shuffle-block"
              }
            >
              <div className="menu-item-title">
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <Button
                        variant="outlined"
                        {...bindTrigger(popupState)}
                        sx={{
                          fontFamily: "var(--leva-fonts-mono)",
                          fontSize: "1.1rem",
                          backgroundColor: "rgb(233, 234, 233)",
                        }}
                        size="small"
                        disabled={activeCamAnim ? true : false}
                        aria-label="open item select list"
                      >
                        {currentItemSelected.itemTitle}
                      </Button>
                      <Menu
                        {...bindMenu(popupState)}
                        sx={{
                          "& .MuiPaper-root": {
                            backgroundColor: "white",
                            border: "0.075rem solid rgb(33, 33, 33);",
                          },
                        }}
                        aria-label="item select menu"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                      >
                        {shopItems.map((shopItem) => {
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
              <div>
                <SplitButton
                  currentItemName={currentItemName}
                  randomCurrentItemParts={randomCurrentItemParts}
                />
              </div>
              <BuyButton item={objects[currentItemName]} />
            </span>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
