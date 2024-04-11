import React, { useState, useLayoutEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import InfoBox from "./InfoBox.jsx";
import PhotoBox from "./PhotoBox.jsx";
import OptionBox from "./OptionBox.jsx";
import { createTheme } from "@mui/material";
// import { useOptionStore } from "../store/useOptionStore.tsx";

export const ArrowIcon = ({
  currentColor,
  currentTexture,
  currentItemSelected,
  toggleInfoBox,
  open,
  togglePhotoBox,
  showPhotos,
  currentItemName,
  currentPartName,
  showBackground,
  setShowBackground,
  showPartOptions,
  setShowPartOptions,
  handlePartOption,
  getRandomInt,
  allPhotos,
  aboutInfo,
  // setAllPhotos,
  // setAboutInfo,
  optionBoxHeightMin,
  setOptionBoxHeightMin,
}) => {
  const { scene, nodes, materials } = useGLTF("./models/arrow.gltf");
  const [annotations, setAnnotations] = useState([]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#212121",
        light: "#bdbdbd",
      },
      secondary: {
        main: "#757575",
        light: "#E0E0E0",
      },
      success: {
        main: "#929d84",
        light: "#c8cec1",
      },
      info: { main: "#ffffff" },
      warning: { main: "#BDBDBD" },
    },
    shadows: Array(25).fill("none"),
    // components: {
    //   MuiDrawer: {
    //     styleOverrides: {
    //       modal: {
    //         ".MuiModal-backdrop": {
    //           background: "none",
    //         },
    //       },
    //     },
    //   },
    // },
  });

  const [
    map,
    // displacementMap,
    normalMap,
    roughnessMap,
    metalnessMap,
    // aoMap,
  ] = useTexture(currentTexture);

  useLayoutEffect(() => {
    Object.assign(materials.Material, {
      map: map,
      // displacementMap: displacementMap,
      normalMap: normalMap,
      roughnessMap: roughnessMap,
      metalnessMap: metalnessMap,
      // aoMap: aoMap,
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
      // console.log("o from scene.traverse in Annotations: ", o);
      if (o.isObject3D) {
        if (o.userData.name) {
          if (o.userData.name.startsWith("AnchorPoint")) {
            // console.log(o.userData.name);
            currentAnnotations.push(
              <group
                key={o.uuid}
                position={[o.position.x, o.position.y, o.position.z]}
              >
                <InfoBox
                  item={currentItemSelected}
                  // currentItemSelected={currentItemSelected}
                  toggleInfoBox={toggleInfoBox}
                  open={open}
                  theme={theme}
                  aboutInfo={aboutInfo}
                />
                <PhotoBox
                  item={currentItemSelected}
                  // currentItemSelected={currentItemSelected}
                  togglePhotoBox={togglePhotoBox}
                  showPhotos={showPhotos}
                  theme={theme}
                  allPhotos={allPhotos}
                />
                <OptionBox
                  item={currentItemSelected}
                  currentItemName={currentItemName}
                  currentPartName={currentPartName}
                  showBackground={showBackground}
                  setShowBackground={setShowBackground}
                  showPartOptions={showPartOptions}
                  setShowPartOptions={setShowPartOptions}
                  handlePartOption={handlePartOption}
                  getRandomInt={getRandomInt}
                  toggleInfoBox={toggleInfoBox}
                  togglePhotoBox={togglePhotoBox}
                  theme={theme}
                  allPhotos={allPhotos}
                  aboutInfo={aboutInfo}
                  optionBoxHeightMin={optionBoxHeightMin}
                  setOptionBoxHeightMin={setOptionBoxHeightMin}
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
  ]);

  useLayoutEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = false;
        o.receiveShadow = true;
        o.material.roughness = 1;
        o.material.metalness = 0;
        // o.material.map.colorSpace = THREE.SRGBColorSpace;
        // console.log(o.material);
      }
    });
  }, []);

  // return <primitive object={scene} />;
  return <primitive object={scene}>{annotations}</primitive>;
};
