import React, { useState, useEffect, useLayoutEffect } from "react";
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
  showPartOptions,
}) => {
  const url = model;
  const { scene } = useGLTF(url);
  // const [cache, setCache] = useState({});
  const [annotations, setAnnotations] = useState([]);

  const updatePartColor = useOptionStore((state) => state.updatePartColor);
  const updatePartColorName = useOptionStore(
    (state) => state.updatePartColorName,
  );
  const updatePartTexture = useOptionStore((state) => state.updatePartTexture);

  const thisPartColorName = useOptionStore(
    (state) => state.items[itemName].parts[partName].colorName,
  );

  const handlePartOption = (e, itemName, partName, color) => {
    // console.log("handlePartOption event: ", e);
    e.preventDefault();
    e.stopPropagation();
    console.log("itemName: ", itemName);
    console.log("partName: ", partName);
    console.log("color clicked: ", color);

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
  };
  // useEffect(() => {
  //   console.log(
  //     "thisPartColorName in Annotation component: ",
  //     itemName,
  //     partName,
  //     thisPartColorName,
  //   );
  // }, [thisPartColorName]);

  useLayoutEffect(() => {
    const currentAnnotations = [];
    scene.traverse((o) => {
      console.log("o from scene.traverse in Annotations: ", o);
      if (o.isObject3D) {
        if (o.userData.name) {
          if (o.userData.name.startsWith("AnchorPoint")) {
            console.log(o.userData.name);
            currentAnnotations.push(
              <Html
                // transform
                key={o.uuid}
                position={[o.position.x, o.position.y, o.position.z]}
                distanceFactor={0.25}
                // style={{ display: !showBackground ? "block" : "none" }}
                style={{
                  // transition: "all 0.5s",
                  // opacity:
                  //   currentItemName === itemName && currentPartName === partName
                  //     ? 1
                  //     : 0,
                  display:
                    currentItemName === itemName &&
                    currentPartName === partName &&
                    showPartOptions &&
                    !showBackground
                      ? "block"
                      : "none",
                }}
                // style={{
                //   transition: "all 0.5s",
                //   opacity:
                //     currentItemName === itemName && currentPartName === partName
                //       ? 1
                //       : 0,
                //   display:
                //     currentItemName === itemName &&
                //     currentPartName === partName &&
                //     showPartOptions
                //       ? "grid"
                //       : "none",
                //   transform: `scale(${currentPartName === partName ? 1 : 0.5})`,
                // }}
              >
                <div className="annotation">
                  {itemName} {descPartName} {thisPartColorName}
                  {/* {o.userData.name} */}
                  <div className="grid-container-stain">
                    {options.stains.map((stain) => {
                      return (
                        <button
                          key={stain}
                          onClick={(e) =>
                            handlePartOption(e, itemName, partName, stain)
                          }
                          style={{
                            backgroundColor:
                              thisPartColorName === stain
                                ? "lightGrey"
                                : "white",
                            border:
                              thisPartColorName === stain
                                ? "2px solid #000000"
                                : "none",
                            color:
                              thisPartColorName === stain ? "black" : "black",
                          }}
                        >
                          {stain}
                        </button>
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
                          style={{
                            backgroundColor:
                              thisPartColorName === paint
                                ? "lightGrey"
                                : "white",
                            border:
                              thisPartColorName === paint
                                ? "2px solid #000000"
                                : "none",
                            color:
                              thisPartColorName === paint ? "black" : "black",
                          }}
                        >
                          {paint}
                        </button>
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
    console.log("Caching JSX for url " + url);
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
                    : [0, 0, 0]
      }
    >
      {annotations}
    </mesh>
  );
};
