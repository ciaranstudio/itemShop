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
import { allImages } from "../../data/objects.jsx";
import OptionBox from "./OptionBox.jsx";

import { objects, shopItems } from "../../data/objects.jsx";
import { options, allOptions } from "../../data/options.jsx";
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

export default function AboutInfo({
  toggleInfoBox,
  theme,
  handlePartOption,
  togglePhotoBox,
}) {
  // infobox Y axis position for drei Html component
  // const htmlPosY = 50;
  const htmlPosY = 0;
  // about text blocks
  const aboutTextArr = [
    {
      id: 0,
      textA: `This shop is meant to be an experimental and collaborative space. My designs are conceptually playful but functional and accessible.`,
      textB: `Each piece is a unique artwork designed with utility and versatility in mind.`,
    },
    {
      id: 1,
      textA: `This deliberately humble furniture line is available in fully interchangeable, customizable paints and finishes.`,
      textB: `Every design is built to last and made by hand at my studio in Cleveland, OH.`,
    },
    {
      id: 2,
      textA: `I use locally sawn white and red oak finished with hardwax oil for stained components. Painted components are made from poplar and MDO coated with vegan milk paint.`,
      textB: `We\’re a small family-run operation and everything is made to order. Customers can expect lead times of 6-8 weeks for most orders.`,
    },
    {
      id: 3,
      textA: `We communicate at each stage of the process from design to production to shipping.`,
      textB: `We work with care and precision, but value character over perfection.`,
    },
    {
      id: 4,
      textA: `Feel free to reach out to me with any questions, inquiries or ideas. I\’m always happy to discuss custom design work.`,
      textB: `My team also provides custom wood working, finish carpentry, cabinetry, painting, art handling and consultation services for the greater Cleveland, OH area.`,
    },
  ];

  // useState
  const [aboutPageToggle, setAboutPageToggle] = useState(false);
  const [aboutIndex, setAboutIndex] = useState(0);

  // state from store
  const currentItemSelected = useOptionStore(
    (state) => state.currentItemSelected,
  );
  const open = useOptionStore((state) => state.open);
  const aboutInfo = useOptionStore((state) => state.aboutInfo);

  // useEffect
  useEffect(() => {
    let nextIndex;
    if (aboutIndex === 4) {
      nextIndex = 0;
    } else {
      nextIndex = aboutIndex + 1;
    }
    setAboutIndex(nextIndex);
  }, [aboutPageToggle]);

  // functions
  const nextPage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setAboutPageToggle(!aboutPageToggle);
  };

  const gridCells = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];

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
    // if animation is active then disable
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
    <Html center position={[0, htmlPosY, 0]}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          className="info"
          style={{
            display: open ? "block" : "none",
            paddingBottom: "1rem",
            overflow: "auto",
            pointerEvents: "auto",
            marginTop: "2rem",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              pointerEvents: "auto",
              width: "100%",
              maxWidth: "60vh",
              left: "50%",
              transform: "translate(-50%)",
              zIndex: 3,
            }}
          >
            <div
              className="annotation-wrapper"
              style={{
                paddingTop: "0rem",
                marginTop: "0rem",
              }}
            >
              <IconButton
                onClick={(e) => closePartOptions(e)}
                color="primary"
                sx={{
                  position: "absolute",
                  pointerEvents: "auto",
                  top: "1",
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
                  top: "1",
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

              <div
                className="annotation"
                style={{ display: optionBoxHeightMin ? "block" : "none" }}
              >
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
                  className="color-menu-item-title"
                  style={{
                    position: "static",
                    top: "0",
                    left: "0",
                    transform: "none",
                    paddingTop: "0.5rem",
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
                <div
                  style={{
                    display: "grid",
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
                  <span className="buy-info-block">
                    <BuyButton theme={theme} item={objects[currentItemName]} />
                  </span>
                </div>
              </span>
            </div>
          </div>
          {/* <div
            id="title"
            style={{
              color: aboutInfo
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "var(--leva-fonts-mono)",
                fontSize: aboutInfo ? "1rem" : "1.125rem",
              }}
            >
              {aboutInfo ? "About" : currentItemSelected.itemTitle}
            </Typography>
          </div> */}
          {/* <div
            id="description"
            style={{ marginTop: aboutInfo ? "0.75rem" : "0.25rem" }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: "var(--leva-fonts-mono)",
                fontSize: aboutInfo ? ".75rem" : "0.82rem",
              }}
              color="prmimary"
            >
              {aboutInfo
                ? aboutTextArr[aboutIndex].textA
                : currentItemSelected.itemLongDescription}
            </Typography>
          </div>
          <div
            id="size"
            style={{
              background: aboutInfo ? "lightGrey" : "transparent",
              borderRadius: aboutInfo ? "1rem" : "2rem",
              border: aboutInfo ? "none" : "2px solid lightGrey",
              padding: aboutInfo ? "0.85rem" : "0.25rem",
              marginTop: aboutInfo ? "0.5rem" : "0.75rem",
            }}
          >
            <Typography
              variant="subtitle2"
              color="primary"
              sx={{
                fontFamily: "var(--leva-fonts-mono)",
                fontSize: aboutInfo ? ".75rem" : "0.82rem",
              }}
            >
              {aboutInfo
                ? aboutTextArr[aboutIndex].textB
                : currentItemSelected.size}
            </Typography>
          </div> */}

          {/* <div className="size">
            <div>
              <IconButton
                onClick={(e) => nextPage(e)}
                color="inherit"
                sx={{
                  display: aboutInfo ? "block" : "none",
                  position: "absolute",
                  pointerEvents: "auto",
                  bottom: 0,
                  // right: "0.5rem",
                  left: "50%",
                  transform: "translate(-50%)",
                }}
                aria-label="contact by email"
              >
                <ReadMoreIcon color="secondary" />
              </IconButton>
            </div>
          </div> */}

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
            {allImages.map((m, index) => {
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
            <Box
              sx={{
                // display: "grid",
                // gridTemplateColumns: {
                //   sm: "auto auto",
                //   md: "auto auto auto",
                //   lg: "auto auto auto auto",
                // },
                // columnGap: "1rem",
                // rowGap: "1rem",
                borderRadius: "0.75rem",
                // border: "0.085rem solid rgb(155, 155, 155)",
                overflow: "auto",
              }}
            >
              <div
                id="title"
                style={{
                  color: aboutInfo
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "var(--leva-fonts-mono)",
                    fontSize: aboutInfo ? "1rem" : "1.125rem",
                  }}
                >
                  {aboutInfo ? "About" : currentItemSelected.itemTitle}
                </Typography>
              </div>
              <div
                id="description"
                style={{ marginTop: aboutInfo ? "0.75rem" : "0.25rem" }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontFamily: "var(--leva-fonts-mono)",
                    fontSize: aboutInfo ? ".75rem" : "0.82rem",
                  }}
                  color="prmimary"
                >
                  {aboutInfo
                    ? aboutTextArr[aboutIndex].textA
                    : currentItemSelected.itemLongDescription}
                </Typography>
              </div>
              <div
                id="size"
                style={{
                  background: aboutInfo ? "lightGrey" : "transparent",
                  borderRadius: aboutInfo ? "1rem" : "2rem",
                  border: aboutInfo ? "none" : "2px solid lightGrey",
                  padding: aboutInfo ? "0.85rem" : "0.25rem",
                  marginTop: aboutInfo ? "0.5rem" : "0.75rem",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="primary"
                  sx={{
                    fontFamily: "var(--leva-fonts-mono)",
                    fontSize: aboutInfo ? ".75rem" : "0.82rem",
                  }}
                >
                  {aboutInfo
                    ? aboutTextArr[aboutIndex].textB
                    : currentItemSelected.size}
                </Typography>
              </div>
              <div className="size">
                <div>
                  <IconButton
                    onClick={(e) => nextPage(e)}
                    color="inherit"
                    sx={{
                      display: aboutInfo ? "block" : "none",
                      position: "sticky",
                      pointerEvents: "auto",
                      bottom: 0,
                      // right: "0.5rem",
                      left: "50%",
                      transform: "translate(-50%)",
                    }}
                    aria-label="go to next about info slide"
                  >
                    <ReadMoreIcon color="secondary" />
                  </IconButton>
                </div>
              </div>
            </Box>
          </Box>
        </div>
      </ThemeProvider>
    </Html>
  );
}
