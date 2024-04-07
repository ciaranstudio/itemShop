import React, { useState, useLayoutEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useOptionStore } from "../store/useOptionStore.tsx";
// import { textures } from "../data/textures.jsx";
import { objects } from "../data/objects.jsx";
import { options, allOptions } from "../data/options.jsx";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShuffleOnIcon from "@mui/icons-material/ShuffleOn";
import BuyButton from "./BuyButton.jsx";

export const Annotation = ({
  model,
  itemName,
  itemTitle,
  partName,
  descPartName,
  animation,
  animDist,
  currentItemName,
  currentPartName,
  showBackground,
  setShowBackground,
  showPartOptions,
  setShowPartOptions,
  handlePartOption,
  getRandomInt,
  positionBottom,
  animateParts,
}) => {
  const url = model;
  const { scene } = useGLTF(url);
  const [annotations, setAnnotations] = useState([]);

  const [stainSingle, setStainSingle] = useState("");
  const [paintSingle, setPaintSingle] = useState("");

  // function getRandomInt(max) {
  //   return Math.floor(Math.random() * max);
  // }

  // const updatePartColor = useOptionStore((state) => state.updatePartColor);
  // const updatePartColorName = useOptionStore(
  //   (state) => state.updatePartColorName,
  // );
  // const updatePartTexture = useOptionStore((state) => state.updatePartTexture);
  // const calculateItemPrice = useOptionStore(
  //   (state) => state.calculateItemPrice,
  // );

  const thisPartColorName = useOptionStore(
    (state) => state.items[itemName].parts[partName].colorName,
  );

  // const handlePartOption = (e, itemName, partName, color, stopPropogation) => {
  //   e.preventDefault();
  //   if (stopPropogation) {
  //     e.stopPropagation();
  //   }
  //   if (color === "white") {
  //     updatePartTexture(itemName, partName, textures.whiteTexture);
  //     updatePartColor(itemName, partName, textures.whiteStain);
  //     updatePartColorName(itemName, partName, "white");
  //   } else if (color === "natural") {
  //     updatePartTexture(itemName, partName, textures.naturalTexture);
  //     updatePartColor(itemName, partName, textures.naturalStain);
  //     updatePartColorName(itemName, partName, "natural");
  //   } else if (color === "black") {
  //     updatePartTexture(itemName, partName, textures.blackTexture);
  //     updatePartColor(itemName, partName, textures.blackStain);
  //     updatePartColorName(itemName, partName, "black");
  //   } else if (color === "allBlack") {
  //     updatePartTexture(itemName, partName, textures.allBlackTexture);
  //     updatePartColor(itemName, partName, textures.allBlackStain);
  //     updatePartColorName(itemName, partName, "allBlack");
  //   } else if (color === "alabaster") {
  //     updatePartTexture(itemName, partName, textures.paintedTexture);
  //     updatePartColor(itemName, partName, textures.alabasterPaint);
  //     updatePartColorName(itemName, partName, "alabaster");
  //   } else if (color === "pink") {
  //     updatePartTexture(itemName, partName, textures.paintedTexture);
  //     updatePartColor(itemName, partName, textures.pinkPaint);
  //     updatePartColorName(itemName, partName, "pink");
  //   } else if (color === "basil") {
  //     updatePartTexture(itemName, partName, textures.paintedTexture);
  //     updatePartColor(itemName, partName, textures.basilPaint);
  //     updatePartColorName(itemName, partName, "basil");
  //   } else if (color === "yellow") {
  //     updatePartTexture(itemName, partName, textures.paintedTexture);
  //     updatePartColor(itemName, partName, textures.yellowPaint);
  //     updatePartColorName(itemName, partName, "yellow");
  //   } else if (color === "blue") {
  //     updatePartTexture(itemName, partName, textures.paintedTexture);
  //     updatePartColor(itemName, partName, textures.bluePaint);
  //     updatePartColorName(itemName, partName, "blue");
  //   } else if (color === "gray") {
  //     updatePartTexture(itemName, partName, textures.paintedTexture);
  //     updatePartColor(itemName, partName, textures.grayPaint);
  //     updatePartColorName(itemName, partName, "gray");
  //   }
  //   calculateItemPrice(itemName);
  // };

  const randomCurrentItemParts = (e, itemName, type) => {
    e.preventDefault(); //  is this necessary if it is also being called in handlePartOption function ? Remove from one of them or make conditional in handlePartOption like e.stopPropogation ?
    console.log(
      "randomPartsClick() - find item in objects data by part itemName: ",
      objects[itemName],
    );
    console.log(
      "then get the parts array for that found item: ",
      objects[itemName].parts,
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
    let randomThisItemColors = objects[itemName].parts.map((part) => {
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
      handlePartOption(e, itemName, part.partName, color, false);
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

  // const partAnimateClick = (e) => {
  //   // e.preventDefault();
  //   // e.stopPropagation();
  //   // setShowPartOptions(false);
  //   // setShowBackground(true);
  //   animateParts();
  // };

  useLayoutEffect(() => {
    const currentAnnotations = [];
    scene.traverse((o) => {
      if (o.isObject3D) {
        if (o.userData.name) {
          if (o.userData.name.startsWith("AnchorPoint")) {
            currentAnnotations.push(
              <Html
                key={o.uuid}
                position={
                  positionBottom
                    ? [
                        0,
                        itemName.includes("shelf") &&
                        itemName.includes("B") &&
                        itemName.includes("16")
                          ? 0.9
                          : itemName.includes("shelf") &&
                              itemName.includes("B") &&
                              itemName.includes("32")
                            ? 1.2
                            : itemName.includes("shelf") &&
                                itemName.includes("A") &&
                                itemName.includes("32")
                              ? 0.9
                              : itemName.includes("shelf") &&
                                  itemName.includes("A") &&
                                  itemName.includes("16")
                                ? 1.2
                                : itemName.includes("horse")
                                  ? 0
                                  : -0.25,
                        itemName.includes("horse") ? -0.3 : 0,
                      ]
                    : [o.position.x, o.position.y, o.position.z]
                }
                distanceFactor={0.21} // 0.1875 decent on xr and se // 0.18 good for iphone se //  0.2 looked good on same iphone xr too // 0.235 good for iphone xr portrait
                center={positionBottom ? true : false}
                style={{
                  display:
                    currentItemName === itemName &&
                    currentPartName === partName &&
                    showPartOptions &&
                    !showBackground
                      ? "block"
                      : "none",
                }}
              >
                <button
                  className="colorExitBtn"
                  onClick={(e) => closePartOptions(e)}
                >
                  <CloseOutlinedIcon fontSize="inherit" />
                </button>
                <button
                  className="colorBgrdBtn"
                  onClick={(e) => partShowBackground(e)}
                >
                  <VisibilityIcon fontSize="inherit" />
                </button>
                <div className="annotation-wrapper">
                  <div className="color-menu-item-title">{itemTitle}</div>
                  <div className="color-menu-part-title">{descPartName}</div>
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
                            <button
                              className="colorBtn"
                              key={stain}
                              onClick={(e) =>
                                handlePartOption(
                                  e,
                                  itemName,
                                  partName,
                                  stain,
                                  true,
                                )
                              }
                              style={{
                                backgroundColor:
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
                                    ? "0.75rem solid #5580b0"
                                    : "0.75rem solid #ffffff",
                                // transform:
                                //   thisPartColorName === stain
                                //     ? "scale(0.975)"
                                //     : "scale(0.95)",
                                // transition: "transform 0.1s ease-in-out 0.1s",
                                // color:
                                //   thisPartColorName === stain ? "white" : "black",
                              }}
                            ></button>
                          );
                        })}
                      </div>

                      <div className="grid-container-paint">
                        {options.paints.map((paint) => {
                          return (
                            <button
                              key={paint}
                              onClick={(e) =>
                                handlePartOption(
                                  e,
                                  itemName,
                                  partName,
                                  paint,
                                  true,
                                )
                              }
                              className="colorBtn"
                              style={{
                                backgroundColor:
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
                                    ? "0.75rem solid #5580b0"
                                    : "0.75rem solid #ffffff",
                                // transform:
                                //   thisPartColorName === paint
                                //     ? "scale(0.975)"
                                //     : "scale(0.95)",
                                // transition: "transform 0.1s ease-in-out 0.1s",
                                // color:
                                //   thisPartColorName === paint ? "white" : "black",
                              }}
                            ></button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="shuffle-color-block">
                    <button
                      className="colorShuffleBtn "
                      onClick={(e) =>
                        randomCurrentItemParts(e, itemName, "stainSingle")
                      }
                    >
                      <ShuffleOnIcon fontSize="inherit" color="primary" />
                    </button>
                    <button
                      className="colorShuffleBtn "
                      onClick={(e) =>
                        randomCurrentItemParts(e, itemName, "stainMixed")
                      }
                    >
                      <ShuffleOnIcon fontSize="inherit" color="secondary" />
                    </button>
                    <button
                      className="colorShuffleBtn "
                      onClick={(e) =>
                        randomCurrentItemParts(e, itemName, "allMixed")
                      }
                    >
                      <ShuffleOnIcon fontSize="inherit" color="success" />
                    </button>
                    <button
                      className="colorShuffleBtn "
                      onClick={(e) =>
                        randomCurrentItemParts(e, itemName, "paintMixed")
                      }
                    >
                      <ShuffleOnIcon fontSize="inherit" color="warning" />
                    </button>
                    <button
                      className="colorShuffleBtn "
                      onClick={(e) =>
                        randomCurrentItemParts(e, itemName, "paintSingle")
                      }
                    >
                      <ShuffleOnIcon fontSize="inherit" color="error" />
                    </button>
                  </div>
                  <BuyButton
                    // theme={theme}
                    item={objects[itemName]}
                    aria-label="add to shopping cart"
                  />
                </div>
              </Html>,
            );
          }
        }
      }
    });
    setAnnotations(currentAnnotations);
  }, [
    scene,
    thisPartColorName,
    currentItemName,
    currentPartName,
    showPartOptions,
    showBackground,
  ]);

  return (
    <mesh
      position={
        animation === "negX"
          ? [positionBottom ? 0 : -animDist, 0, 0]
          : animation === "posX"
            ? [positionBottom ? 0 : animDist, 0, 0]
            : animation === "negZ"
              ? [0, 0, positionBottom ? 0 : -animDist]
              : animation === "posZ"
                ? [0, 0, positionBottom ? 0 : animDist]
                : animation === "posY1"
                  ? [0, positionBottom ? 0 : animDist, 0]
                  : animation === "posY2"
                    ? [0, positionBottom ? 0 : animDist + animDist / 2, 0]
                    : animation === "negZposY1"
                      ? [
                          0,
                          positionBottom ? 0 : animDist,
                          positionBottom ? 0 : -animDist,
                        ]
                      : animation === "posXposY1"
                        ? [
                            positionBottom ? 0 : animDist,
                            positionBottom ? 0 : animDist,
                            0,
                          ]
                        : [0, 0, 0]
      }
    >
      {annotations}
    </mesh>
  );
};
