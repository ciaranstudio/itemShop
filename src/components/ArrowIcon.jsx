import React, { useState, useLayoutEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import InfoBox from "./InfoBox.jsx";
import PhotoBox from "./PhotoBox.jsx";
import OptionBox from "./OptionBox.jsx";
import { createTheme } from "@mui/material";
import { useOptionStore } from "../store/useOptionStore.tsx";

export const ArrowIcon = ({
  currentColor,
  currentTexture,
  // currentItemSelected,
  // setCurrentItemSelected,
  // setPreviousItemSelected,
  toggleInfoBox,
  togglePhotoBox,
  // open,
  // showPhotos,
  // currentItemName,
  // setCurrentItemName,
  // currentPartName,
  // setCurrentPartName,
  // showBackground,
  // setShowBackground,
  // showPartOptions,
  // setShowPartOptions,
  handlePartOption,
  // getRandomInt,
  // allPhotos,
  // aboutInfo,
  // setAllPhotos,
  // setAboutInfo,
  // optionBoxHeightMin,
  // setOptionBoxHeightMin,
  // animActive,
  // activeCamPosAnim,
  // activeCamTargAnim,
  // activeCamAnim,
  // mobileView,
  // optionBoxItemChanged,
  // setOptionBoxItemChanged,
  // optionBoxItemToggle,
  // setOptionBoxItemToggle,
  openUserEmail,
  // animateParts,
  // animIconToggle,
  // setAnimIconToggle,
}) => {
  const { scene, nodes, materials } = useGLTF("./models/arrow.gltf");
  const [annotations, setAnnotations] = useState([]);

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

  // const animToggled = useOptionStore((state) => state.animToggled);

  const currentItemSelected = useOptionStore(
    (state) => state.currentItemSelected,
  );
  const setCurrentItemSelected = useOptionStore(
    (state) => state.setCurrentItemSelected,
  );

  const previousItemSelected = useOptionStore(
    (state) => state.previousItemSelected,
  );
  const setPreviousItemSelected = useOptionStore(
    (state) => state.setPreviousItemSelected,
  );

  const currentPartName = useOptionStore((state) => state.currentPartName);
  const setCurrentPartName = useOptionStore(
    (state) => state.setCurrentPartName,
  );

  const currentItemName = useOptionStore((state) => state.currentItemName);
  const setCurrentItemName = useOptionStore(
    (state) => state.setCurrentItemName,
  );

  const mobileView = useOptionStore((state) => state.mobileView);
  const setMobileView = useOptionStore((state) => state.setMobileView);

  const open = useOptionStore((state) => state.open);
  const setOpen = useOptionStore((state) => state.setOpen);

  const showPhotos = useOptionStore((state) => state.showPhotos);
  const setShowPhotos = useOptionStore((state) => state.setShowPhotos);

  const allPhotos = useOptionStore((state) => state.allPhotos);
  const setAllPhotos = useOptionStore((state) => state.setAllPhotos);

  const aboutInfo = useOptionStore((state) => state.aboutInfo);
  const setAboutInfo = useOptionStore((state) => state.setAboutInfo);

  const optionBoxHeightMin = useOptionStore(
    (state) => state.optionBoxHeightMin,
  );
  const setOptionBoxHeightMin = useOptionStore(
    (state) => state.setOptionBoxHeightMin,
  );

  const showBackground = useOptionStore((state) => state.showBackground);
  const setShowBackground = useOptionStore((state) => state.setShowBackground);

  const showPartOptions = useOptionStore((state) => state.showPartOptions);
  const setShowPartOptions = useOptionStore(
    (state) => state.setShowPartOptions,
  );

  const optionBoxItemChanged = useOptionStore(
    (state) => state.optionBoxItemChanged,
  );
  const setOptionBoxItemChanged = useOptionStore(
    (state) => state.setOptionBoxItemChanged,
  );

  const optionBoxItemToggle = useOptionStore(
    (state) => state.optionBoxItemToggle,
  );
  const setOptionBoxItemToggle = useOptionStore(
    (state) => state.setOptionBoxItemToggle,
  );

  // const animToggled = useOptionStore((state) => state.animToggled);
  // const setAnimToggled = useOptionStore((state) => state.setAnimToggled);

  const animActive = useOptionStore((state) => state.animActive);
  const setAnimActive = useOptionStore((state) => state.setAnimActive);

  // const activeCamPosAnim = useOptionStore((state) => state.activeCamPosAnim);
  // const setActiveCamPosAnim = useOptionStore((state) => state.setActiveCamPosAnim);

  // const activeCamTargAnim = useOptionStore((state) => state.activeCamTargAnim);
  // const setActiveCamTargAnim = useOptionStore((state) => state.setActiveCamTargAnim);

  const activeCamAnim = useOptionStore((state) => state.activeCamAnim);
  const setActiveCamAnim = useOptionStore((state) => state.setActiveCamAnim);

  // const partsOpen = useOptionStore((state) => state.partsOpen);
  // const setPartsOpen = useOptionStore((state) => state.setPartsOpen);

  const animIconToggle = useOptionStore((state) => state.animIconToggle);
  const setAnimIconToggle = useOptionStore((state) => state.setAnimIconToggle);

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
                  // item={currentItemSelected}
                  // currentItemSelected={currentItemSelected}
                  toggleInfoBox={toggleInfoBox}
                  // open={open}
                  theme={theme}
                  // aboutInfo={aboutInfo}
                  // mobileView={mobileView}
                  openUserEmail={openUserEmail}
                />
                <PhotoBox
                  // item={currentItemSelected}
                  // currentItemSelected={currentItemSelected}
                  togglePhotoBox={togglePhotoBox}
                  // showPhotos={showPhotos}
                  theme={theme}
                  // allPhotos={allPhotos}
                  // mobileView={mobileView}
                />

                <OptionBox
                  // item={currentItemSelected}
                  // setCurrentItemSelected={setCurrentItemSelected}
                  // setPreviousItemSelected={setPreviousItemSelected}
                  // currentItemName={currentItemName}
                  // setCurrentItemName={setCurrentItemName}
                  // currentPartName={currentPartName}
                  // setCurrentPartName={setCurrentPartName}
                  // showBackground={showBackground}
                  // setShowBackground={setShowBackground}
                  // showPartOptions={showPartOptions}
                  // setShowPartOptions={setShowPartOptions}
                  // getRandomInt={getRandomInt}
                  handlePartOption={handlePartOption}
                  toggleInfoBox={toggleInfoBox}
                  togglePhotoBox={togglePhotoBox}
                  theme={theme}
                  // allPhotos={allPhotos}
                  // aboutInfo={aboutInfo}
                  // optionBoxHeightMin={optionBoxHeightMin}
                  // setOptionBoxHeightMin={setOptionBoxHeightMin}
                  // animActive={animActive}
                  // activeCamPosAnim={activeCamPosAnim}
                  // activeCamTargAnim={activeCamTargAnim}
                  // activeCamAnim={activeCamAnim}
                  // mobileView={mobileView}
                  // optionBoxItemChanged={optionBoxItemChanged}
                  // setOptionBoxItemChanged={setOptionBoxItemChanged}
                  // optionBoxItemToggle={optionBoxItemToggle}
                  // setOptionBoxItemToggle={setOptionBoxItemToggle}
                  // animateParts={animateParts}
                  // animIconToggle={animIconToggle}
                  // setAnimIconToggle={setAnimIconToggle}
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
        // o.material.map.colorSpace = THREE.SRGBColorSpace;
        // console.log(o.material);
      }
    });
  }, []);

  // return <primitive object={scene} />;
  return <primitive object={scene}>{annotations}</primitive>;
};
