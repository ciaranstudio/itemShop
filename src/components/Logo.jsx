import React, { useState, useLayoutEffect } from "react";
import { useGLTF, useTexture, Html } from "@react-three/drei";
import { useOptionStore } from "../store/useOptionStore.tsx";
import NavMenu from "./NavMenu";

export const Logo = ({
  currentColor,
  currentTexture,
  // open,
  // setOpen,
  // showPhotos,
  // setShowPhotos,
  // showPartOptions,
  // setShowPartOptions,
  // aboutInfo,
  // setAboutInfo,
  // allPhotos,
  // setAllPhotos,
  openUserEmail,
}) => {
  const { scene, nodes, materials } = useGLTF("./models/logoAnnotated.gltf");
  const [annotations, setAnnotations] = useState([]);

  // const currentItemSelected = useOptionStore(
  //   (state) => state.currentItemSelected,
  // );
  // const setCurrentItemSelected = useOptionStore((state) => state.setCurrentItemSelected);

  // const previousItemSelected = useOptionStore(
  //   (state) => state.previousItemSelected,
  // );
  // const setPreviousItemSelected = useOptionStore((state) => state.setPreviousItemSelected);

  // const currentPartName = useOptionStore(
  //   (state) => state.currentPartName,
  // );
  // const setCurrentPartName = useOptionStore((state) => state.setCurrentPartName);

  // const currentItemName = useOptionStore(
  //   (state) => state.currentItemName,
  // );
  // const setCurrentItemName = useOptionStore((state) => state.setCurrentItemName);

  // const mobileView = useOptionStore((state) => state.mobileView);
  // const setMobileView = useOptionStore((state) => state.setMobileView);

  const open = useOptionStore((state) => state.open);
  const setOpen = useOptionStore((state) => state.setOpen);

  const showPhotos = useOptionStore((state) => state.showPhotos);
  const setShowPhotos = useOptionStore((state) => state.setShowPhotos);

  const allPhotos = useOptionStore((state) => state.allPhotos);
  const setAllPhotos = useOptionStore((state) => state.setAllPhotos);

  const aboutInfo = useOptionStore((state) => state.aboutInfo);
  const setAboutInfo = useOptionStore((state) => state.setAboutInfo);

  // const optionBoxHeightMin = useOptionStore((state) => state.optionBoxHeightMin);
  // const setOptionBoxHeightMin = useOptionStore((state) => state.setOptionBoxHeightMin);

  // const showBackground = useOptionStore((state) => state.showBackground);
  // const setShowBackground = useOptionStore((state) => state.setShowBackground);

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

  const [
    map,
    // displacementMap,
    normalMap,
    roughnessMap,
    metalnessMap,
    // aoMap,
  ] = useTexture(currentTexture);

  useLayoutEffect(() => {
    Object.assign(materials._0103_Blue, {
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
              <Html
                // transform
                center
                key={o.uuid}
                position={[o.position.x, o.position.y + 7.5, o.position.z]}
                distanceFactor={0.25}
              >
                <NavMenu
                  open={open}
                  setOpen={setOpen}
                  showPhotos={showPhotos}
                  setShowPhotos={setShowPhotos}
                  // showPartOptions={showPartOptions}
                  setShowPartOptions={setShowPartOptions}
                  aboutInfo={aboutInfo}
                  setAboutInfo={setAboutInfo}
                  allPhotos={allPhotos}
                  setAllPhotos={setAllPhotos}
                  openUserEmail={openUserEmail}
                />
              </Html>,
            );
          }
        }
      }
    });
    setAnnotations(currentAnnotations);
  }, [scene, open, showPhotos, aboutInfo, allPhotos]);

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

  return <primitive object={scene}>{annotations}</primitive>;
};
