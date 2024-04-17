import React, { useState, useLayoutEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
// import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
// import CircleIcon from "@mui/icons-material/Circle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useOptionStore } from "../store/useOptionStore.tsx";

export const SelectIcon = ({
  model,
  itemName,
  partName,
  animation,
  animDist,
  // currentItemName,
  // currentPartName,
  // showBackground,
  // showPartOptions,
}) => {
  const url = model;
  const { scene } = useGLTF(url);
  const [annotations, setAnnotations] = useState([]);

  // const currentItemSelected = useOptionStore(
  //   (state) => state.currentItemSelected,
  // );
  // const setCurrentItemSelected = useOptionStore((state) => state.setCurrentItemSelected);

  // const previousItemSelected = useOptionStore(
  //   (state) => state.previousItemSelected,
  // );
  // const setPreviousItemSelected = useOptionStore((state) => state.setPreviousItemSelected);

  const currentPartName = useOptionStore((state) => state.currentPartName);
  const setCurrentPartName = useOptionStore(
    (state) => state.setCurrentPartName,
  );

  const currentItemName = useOptionStore((state) => state.currentItemName);
  const setCurrentItemName = useOptionStore(
    (state) => state.setCurrentItemName,
  );

  // const mobileView = useOptionStore((state) => state.mobileView);
  // const setMobileView = useOptionStore((state) => state.setMobileView);

  // const open = useOptionStore((state) => state.open);
  // const setOpen = useOptionStore((state) => state.setOpen);

  // const showPhotos = useOptionStore((state) => state.showPhotos);
  // const setShowPhotos = useOptionStore((state) => state.setShowPhotos);

  // const allPhotos = useOptionStore((state) => state.allPhotos);
  // const setAllPhotos = useOptionStore((state) => state.setAllPhotos);

  // const aboutInfo = useOptionStore((state) => state.aboutInfo);
  // const setAboutInfo = useOptionStore((state) => state.setAboutInfo);

  // const optionBoxHeightMin = useOptionStore((state) => state.optionBoxHeightMin);
  // const setOptionBoxHeightMin = useOptionStore((state) => state.setOptionBoxHeightMin);

  const showBackground = useOptionStore((state) => state.showBackground);
  const setShowBackground = useOptionStore((state) => state.setShowBackground);

  const showPartOptions = useOptionStore((state) => state.showPartOptions);
  const setShowPartOptions = useOptionStore(
    (state) => state.setShowPartOptions,
  );

  // const optionBoxItemChanged = useOptionStore(
  //   (state) => state.optionBoxItemChanged,
  // );
  // const setOptionBoxItemChanged = useOptionStore((state) => state.setOptionBoxItemChanged);

  // const optionBoxItemToggle = useOptionStore(
  //   (state) => state.optionBoxItemToggle,
  // );
  // const setOptionBoxItemToggle = useOptionStore((state) => state.setOptionBoxItemToggle);

  // const animToggled = useOptionStore((state) => state.animToggled);
  // const setAnimToggled = useOptionStore((state) => state.setAnimToggled);

  // const animActive = useOptionStore((state) => state.animActive);
  // const setAnimActive = useOptionStore((state) => state.setAnimActive);

  // const activeCamPosAnim = useOptionStore((state) => state.activeCamPosAnim);
  // const setActiveCamPosAnim = useOptionStore((state) => state.setActiveCamPosAnim);

  // const activeCamTargAnim = useOptionStore((state) => state.activeCamTargAnim);
  // const setActiveCamTargAnim = useOptionStore((state) => state.setActiveCamTargAnim);

  // const activeCamAnim = useOptionStore((state) => state.activeCamAnim);
  // const setActiveCamAnim = useOptionStore((state) => state.setActiveCamAnim);

  // const partsOpen = useOptionStore((state) => state.partsOpen);
  // const setPartsOpen = useOptionStore((state) => state.setPartsOpen);

  // const animIconToggle = useOptionStore((state) => state.animIconToggle);
  // const setAnimIconToggle = useOptionStore((state) => state.setAnimIconToggle);

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
                    ? o.position.y - 0.03 // 0.04
                    : itemName.includes("shelfB") && partName.includes("bottom")
                      ? o.position.y - 0.03 // 0.06
                      : itemName.includes("shelfB") &&
                          partName.includes("middle")
                        ? o.position.y
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
                <div style={{ pointerEvents: "none", userSelect: "none" }}>
                  <button className="part-select-icon">
                    {partName.includes("bottom") &&
                    itemName.includes("shelf") ? (
                      <KeyboardArrowUpIcon fontSize="inherit" />
                    ) : partName.includes("middle") &&
                      itemName.includes("shelf") ? (
                      <KeyboardArrowLeftIcon fontSize="inherit" />
                    ) : (
                      <KeyboardArrowDownIcon fontSize="inherit" />
                    )}
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
