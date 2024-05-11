import React, { useState, useLayoutEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import InfoBox from "./InfoBox.jsx";
import PhotoBox from "./PhotoBox.jsx";
import OptionBox from "./OptionBox.jsx";
import { createTheme } from "@mui/material";
import { useOptionStore } from "../../store/useOptionStore.tsx";

export const ArrowIcon = ({
  currentColor,
  currentTexture,
  toggleInfoBox,
  togglePhotoBox,
  handlePartOption,
  openUserEmail,
}) => {
  const { scene, nodes, materials } = useGLTF("./models/arrow.gltf");
  const [annotations, setAnnotations] = useState([]);

  // mui theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#17385b", // "#373737"
        light: "#bdbdbd",
      },
      secondary: {
        main: "#636363",
        light: "#E0E0E0",
      },
      success: {
        main: "#929d84",
        light: "#c8cec1",
      },
      info: { main: "#ffffff" },
      warning: { main: "#BDBDBD" },
      error: { main: "#d3d3d3" },
    },
    shadows: Array(25).fill("none"),
  });

  // texture
  const [map, normalMap, roughnessMap, metalnessMap] =
    useTexture(currentTexture);

  // state from store
  const currentItemSelected = useOptionStore(
    (state) => state.currentItemSelected,
  );
  const currentPartName = useOptionStore((state) => state.currentPartName);
  const currentItemName = useOptionStore((state) => state.currentItemName);
  const mobileView = useOptionStore((state) => state.mobileView);
  const open = useOptionStore((state) => state.open);
  const showPhotos = useOptionStore((state) => state.showPhotos);
  const allPhotos = useOptionStore((state) => state.allPhotos);
  const aboutInfo = useOptionStore((state) => state.aboutInfo);
  const optionBoxHeightMin = useOptionStore(
    (state) => state.optionBoxHeightMin,
  );
  const showBackground = useOptionStore((state) => state.showBackground);
  const showPartOptions = useOptionStore((state) => state.showPartOptions);
  const animActive = useOptionStore((state) => state.animActive);
  const activeCamAnim = useOptionStore((state) => state.activeCamAnim);

  useLayoutEffect(() => {
    Object.assign(materials.Material, {
      map: map,
      normalMap: normalMap,
      roughnessMap: roughnessMap,
      metalnessMap: metalnessMap,
      color: currentColor,
    });
  }, [
    scene,
    nodes,
    materials,
    currentColor,
    currentTexture,
    map,
    normalMap,
    roughnessMap,
    metalnessMap,
  ]);

  useLayoutEffect(() => {
    const currentAnnotations = [];
    scene.traverse((o) => {
      if (o.isObject3D) {
        if (o.userData.name) {
          if (o.userData.name.startsWith("AnchorPoint")) {
            currentAnnotations.push(
              <group
                key={o.uuid}
                position={[o.position.x, o.position.y, o.position.z]}
              >
                <InfoBox
                  toggleInfoBox={toggleInfoBox}
                  theme={theme}
                  openUserEmail={openUserEmail}
                />
                <PhotoBox togglePhotoBox={togglePhotoBox} theme={theme} />
                <OptionBox
                  handlePartOption={handlePartOption}
                  toggleInfoBox={toggleInfoBox}
                  togglePhotoBox={togglePhotoBox}
                  theme={theme}
                />
              </group>,
            );
          }
        }
      }
    });
    setAnnotations(currentAnnotations);
  }, [
    scene,
    open,
    showPhotos,
    currentItemSelected,
    currentItemName,
    currentPartName,
    showBackground,
    showPartOptions,
    optionBoxHeightMin,
    animActive,
    activeCamAnim,
    allPhotos,
    aboutInfo,
    mobileView,
  ]);

  useLayoutEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = false;
        o.receiveShadow = true;
        o.material.roughness = 1;
        o.material.metalness = 0;
      }
    });
  }, []);

  return <primitive object={scene}>{annotations}</primitive>;
};
