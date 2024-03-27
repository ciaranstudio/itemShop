import React, { useState, useEffect, useLayoutEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useOptionStore } from "../store/useOptionStore.tsx";

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
}) => {
  const url = model;
  const { scene } = useGLTF(url);
  // const [cache, setCache] = useState({});
  const [annotations, setAnnotations] = useState([]);
  const thisPartColorName = useOptionStore(
    (state) => state.items[itemName].parts[partName].colorName,
  );
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
                key={o.uuid}
                position={[o.position.x, o.position.y, o.position.z]}
                distanceFactor={0.25}
                style={{ display: !showBackground ? "block" : "none" }}
              >
                <div className="annotation">
                  {itemName} {descPartName} {thisPartColorName}
                  {/* {o.userData.name} */}
                </div>
              </Html>,
            );
          }
        }
      }
    });
    setAnnotations(currentAnnotations);
    console.log("Caching JSX for url " + url);
  }, [scene, thisPartColorName, showBackground]);

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
