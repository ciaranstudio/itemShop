import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { useOptionStore } from "../store/useOptionStore.tsx";
// import { textures } from "../data/textures.jsx";
import { objects } from "../data/objects.jsx";
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
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
// import HeightIcon from "@mui/icons-material/Height";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BuyButton from "./BuyButton.jsx";
import SplitButton from "./SplitButton.jsx";
import useWindowDimensions from "../helpers/useWindowDimensions";

export default function OptionBox({
  item,
  currentItemName,
  currentPartName,
  showBackground,
  setShowBackground,
  showPartOptions,
  setShowPartOptions,
  handlePartOption,
  getRandomInt,
  toggleInfoBox,
  togglePhotoBox,
  theme,
  allPhotos,
  aboutInfo,
  optionBoxHeightMin,
  setOptionBoxHeightMin,
  animActive,
}) {
  const { height, width } = useWindowDimensions();

  const toggleOptionBoxHeight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOptionBoxHeightMin(!optionBoxHeightMin);
    // if (aboutInfo) {
    //   setAboutInfo(true);
    // } else if (!aboutInfo) {
    //   setAboutInfo(false);
    // }
    // setOpen(!open);
    // setShowPhotos(false);
    // if (showPartOptions) {
    //   setShowPartOptions(false);
    // } else {
    //   setShowPartOptions(true);
    // }
  };

  // const toggleShowbackground = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setOptionBoxHeightMin(!optionBoxHeightMin);
  //   // if (aboutInfo) {
  //   //   setAboutInfo(true);
  //   // } else if (!aboutInfo) {
  //   //   setAboutInfo(false);
  //   // }
  //   // setOpen(!open);
  //   // setShowPhotos(false);
  //   // if (showPartOptions) {
  //   //   setShowPartOptions(false);
  //   // } else {
  //   //   setShowPartOptions(true);
  //   // }
  // };

  const [boxPosY, setBoxPosY] = useState(13);

  useEffect(() => {
    // console.log("optionBoxHeightMin: ", optionBoxHeightMin);
    if (optionBoxHeightMin) {
      if (
        (width < 400 && currentItemName.includes("horse")) ||
        currentItemName.includes("shelf")
      ) {
        setBoxPosY(14);
      } else if (width < 400 && !currentItemName.includes("horse")) {
        setBoxPosY(14);
      } else {
        setBoxPosY(7);
      }
    } else if (!optionBoxHeightMin) {
      if (width < 400 && currentItemName.includes("horse")) {
        setBoxPosY(24);
      } else if (width < 400 && !currentItemName.includes("horse")) {
        setBoxPosY(20);
      } else {
        setBoxPosY(13);
      }
    }
  }, [optionBoxHeightMin]);

  const [stainSingle, setStainSingle] = useState("");
  const [paintSingle, setPaintSingle] = useState("");

  const thisPartColorName = useOptionStore(
    (state) => state.items[currentItemName].parts[currentPartName].colorName,
  );

  const randomCurrentItemParts = (e, currentItemName, type) => {
    e.preventDefault(); //  is this necessary if it is also being called in handlePartOption function ? Remove from one of them or make conditional in handlePartOption like e.stopPropogation ?
    console.log(
      "randomPartsClick() - find item in objects data by part itemName: ",
      objects[currentItemName],
    );
    console.log(
      "then get the parts array for that found item: ",
      objects[currentItemName].parts,
    );
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

  return (
    <Html
      position={[
        0,
        // width < 400 && currentItemName.includes("horse")
        //   ? 24
        //   : width < 400 && !currentItemName.includes("horse")
        //     ? 20
        //     : 13,
        boxPosY,
        0,
      ]} // 20 good for all but horse on SE, 25 good for horse on SE
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
          style={{ paddingTop: optionBoxHeightMin ? "2rem" : "0rem" }}
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
              top: "0.15rem",
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
              top: "0.15rem",
              right: "0.15rem",
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
              top: "0.15rem",
              right: "2.25rem",
              padding: "0.5rem",
            }}
            aria-label="close order box"
          >
            {optionBoxHeightMin ? (
              <UnfoldMoreIcon color="success" fontSize="inherit" />
            ) : (
              <UnfoldLessIcon color="success" fontSize="inherit" />
            )}
          </IconButton>

          <div
            className="color-menu-item-title"
            style={{
              position: optionBoxHeightMin ? "absolute" : "static",
              top: optionBoxHeightMin ? "0.45rem" : "0",
              right: optionBoxHeightMin ? "calc(50% - 1rem)" : "0",
              paddingTop: optionBoxHeightMin ? "0rem" : "0.5rem",
            }}

            // style={{ display: optionBoxHeightMin ? "none" : "block" }}
          >
            <Typography
              variant={optionBoxHeightMin ? "h6" : "h6"}
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
              color="primary"
            >
              {item.itemTitle}
            </Typography>
          </div>
          <div
            className="color-menu-part-title"
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
