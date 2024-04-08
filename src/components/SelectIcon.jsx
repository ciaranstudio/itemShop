import React, { useState, useLayoutEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

export const SelectIcon = ({
  model,
  itemName,
  partName,
  animation,
  animDist,
  currentItemName,
  currentPartName,
  showBackground,
  showPartOptions,
}) => {
  const url = model;
  const { scene } = useGLTF(url);
  const [annotations, setAnnotations] = useState([]);

  useLayoutEffect(() => {
    const currentAnnotations = [];
    scene.traverse((o) => {
      if (o.isObject3D) {
        if (o.userData.name) {
          if (o.userData.name.startsWith("SelectPoint")) {
            currentAnnotations.push(
              <Html
                key={o.uuid}
                position={[
                  o.position.x,
                  itemName.includes("shelfA") && partName.includes("bottom")
                    ? o.position.y - 0.04
                    : itemName.includes("shelfB") && partName.includes("bottom")
                      ? o.position.y - 0.06
                      : o.position.y + 0.02,
                  o.position.z,
                ]}
                distanceFactor={0.21}
                center
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
                <div>
                  <button className="part-select-icon">
                    <RadioButtonCheckedIcon fontSize="inherit" color="white" />
                  </button>
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
