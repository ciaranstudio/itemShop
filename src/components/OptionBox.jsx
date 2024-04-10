import React, { useState } from "react";
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
}) {
  const { height, width } = useWindowDimensions();

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
    setShowPartOptions(false);
    setShowBackground(true);
  };
  return (
    <Html
      position={[0, width < 400 ? 14.5 : 13, 0]}
      center={true}
      style={{
        display: showPartOptions && !showBackground ? "block" : "none",
        // transition: "display 0s ease-out 0.25s",
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="annotation-wrapper">
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
            <CloseOutlinedIcon color="secondary" fontSize="inherit" />
          </IconButton>
          {/* <button className="color-exit-btn" onClick={(e) => closePartOptions(e)}>
          <CloseOutlinedIcon fontSize="inherit" />
        </button> */}

          <IconButton
            onClick={(e) => partShowBackground(e)}
            color="white"
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
          >
            <VisibilityIcon color="info" fontSize="inherit" />
          </IconButton>
          {/* <button
          className="color-bgrd-btn"
          onClick={(e) => partShowBackground(e)}
        ></button> */}

          <div className="color-menu-item-title">
            <Typography
              variant="h6"
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
            >
              {item.itemTitle}
            </Typography>
          </div>
          <div className="color-menu-part-title">
            <Typography
              variant="subtitle2"
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
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
            <SplitButton theme={theme} images={item.images} />
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
          <div className="buy-info-block">
            <span>
              <IconButton
                onClick={(e) => togglePhotoBox(e, false)}
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
                onClick={(e) => toggleInfoBox(e, false)}
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
