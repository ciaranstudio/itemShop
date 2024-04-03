import React, { useState, useLayoutEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useOptionStore } from "../store/useOptionStore.tsx";
import { textures } from "../data/textures.jsx";
import { options } from "../data/options.jsx";

export const Annotation = ({
  model,
  itemName,
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
}) => {
  const url = model;
  const { scene } = useGLTF(url);
  const [annotations, setAnnotations] = useState([]);

  const updatePartColor = useOptionStore((state) => state.updatePartColor);
  const updatePartColorName = useOptionStore(
    (state) => state.updatePartColorName,
  );
  const updatePartTexture = useOptionStore((state) => state.updatePartTexture);
  const calculateItemPrice = useOptionStore(
    (state) => state.calculateItemPrice,
  );

  const thisPartColorName = useOptionStore(
    (state) => state.items[itemName].parts[partName].colorName,
  );

  const handlePartOption = (e, itemName, partName, color) => {
    e.preventDefault();
    e.stopPropagation();

    if (color === "white") {
      updatePartTexture(itemName, partName, textures.whiteTexture);
      updatePartColor(itemName, partName, textures.whiteStain);
      updatePartColorName(itemName, partName, "white");
    } else if (color === "natural") {
      updatePartTexture(itemName, partName, textures.naturalTexture);
      updatePartColor(itemName, partName, textures.naturalStain);
      updatePartColorName(itemName, partName, "natural");
    } else if (color === "black") {
      updatePartTexture(itemName, partName, textures.blackTexture);
      updatePartColor(itemName, partName, textures.blackStain);
      updatePartColorName(itemName, partName, "black");
    } else if (color === "allBlack") {
      updatePartTexture(itemName, partName, textures.allBlackTexture);
      updatePartColor(itemName, partName, textures.allBlackStain);
      updatePartColorName(itemName, partName, "allBlack");
    } else if (color === "alabaster") {
      updatePartTexture(itemName, partName, textures.paintedTexture);
      updatePartColor(itemName, partName, textures.alabasterPaint);
      updatePartColorName(itemName, partName, "alabaster");
    } else if (color === "pink") {
      updatePartTexture(itemName, partName, textures.paintedTexture);
      updatePartColor(itemName, partName, textures.pinkPaint);
      updatePartColorName(itemName, partName, "pink");
    } else if (color === "basil") {
      updatePartTexture(itemName, partName, textures.paintedTexture);
      updatePartColor(itemName, partName, textures.basilPaint);
      updatePartColorName(itemName, partName, "basil");
    } else if (color === "yellow") {
      updatePartTexture(itemName, partName, textures.paintedTexture);
      updatePartColor(itemName, partName, textures.yellowPaint);
      updatePartColorName(itemName, partName, "yellow");
    } else if (color === "blue") {
      updatePartTexture(itemName, partName, textures.paintedTexture);
      updatePartColor(itemName, partName, textures.bluePaint);
      updatePartColorName(itemName, partName, "blue");
    } else if (color === "gray") {
      updatePartTexture(itemName, partName, textures.paintedTexture);
      updatePartColor(itemName, partName, textures.grayPaint);
      updatePartColorName(itemName, partName, "gray");
    }
    calculateItemPrice(itemName);
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

  useLayoutEffect(() => {
    const currentAnnotations = [];
    scene.traverse((o) => {
      if (o.isObject3D) {
        if (o.userData.name) {
          if (o.userData.name.startsWith("AnchorPoint")) {
            currentAnnotations.push(
              <Html
                key={o.uuid}
                position={[o.position.x, o.position.y, o.position.z]}
                distanceFactor={0.25}
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
                ></button>
                <button
                  className="colorBgrdBtn"
                  onClick={(e) => partShowBackground(e)}
                ></button>
                <div className="annotation">
                  <div
                  // style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    {descPartName}
                  </div>
                  {/* {o.userData.name} */}
                  <div className="grid-container-stain">
                    {options.stains.map((stain) => {
                      return (
                        <button
                          className="colorBtn"
                          key={stain}
                          onClick={(e) =>
                            handlePartOption(e, itemName, partName, stain)
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
                                ? "0.25rem solid #eeeeee"
                                : "none",
                            transform:
                              thisPartColorName === stain
                                ? "scale(1)"
                                : "scale(0.90)",
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
                            handlePartOption(e, itemName, partName, paint)
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
                                ? "0.25rem solid #eeeeee"
                                : "none",
                            transform:
                              thisPartColorName === paint
                                ? "scale(1)"
                                : "scale(0.90)",
                            // transition: "transform 0.1s ease-in-out 0.1s",
                            // color:
                            //   thisPartColorName === paint ? "white" : "black",
                          }}
                        ></button>
                      );
                    })}
                  </div>
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
          ? [-animDist, 0, 0]
          : animation === "posX"
            ? [animDist, 0, 0]
            : animation === "negZ"
              ? [0, 0, -animDist]
              : animation === "posZ"
                ? [0, 0, animDist]
                : animation === "posY1"
                  ? [0, animDist, 0]
                  : animation === "posY2"
                    ? [0, animDist + animDist / 2, 0]
                    : animation === "negZposY1"
                      ? [0, animDist, -animDist]
                      : animation === "posXposY1"
                        ? [animDist, animDist, 0]
                        : [0, 0, 0]
      }
    >
      {annotations}
    </mesh>
  );
};
