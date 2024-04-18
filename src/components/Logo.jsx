import React, { useState, useLayoutEffect } from "react";
import { useGLTF, useTexture, Html } from "@react-three/drei";
import { useOptionStore } from "../store/useOptionStore.tsx";
import NavMenu from "./NavMenu";

export const Logo = ({ currentColor, currentTexture, openUserEmail }) => {
  const { scene, nodes, materials } = useGLTF("./models/logoAnnotated.gltf");
  const [annotations, setAnnotations] = useState([]);

  // state from store
  const open = useOptionStore((state) => state.open);
  const showPhotos = useOptionStore((state) => state.showPhotos);
  const allPhotos = useOptionStore((state) => state.allPhotos);
  const aboutInfo = useOptionStore((state) => state.aboutInfo);

  // actions from store
  const setOpen = useOptionStore((state) => state.setOpen);
  const setShowPhotos = useOptionStore((state) => state.setShowPhotos);
  const setAllPhotos = useOptionStore((state) => state.setAllPhotos);
  const setAboutInfo = useOptionStore((state) => state.setAboutInfo);
  const setShowPartOptions = useOptionStore(
    (state) => state.setShowPartOptions,
  );

  // texture
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
      if (o.isObject3D) {
        if (o.userData.name) {
          if (o.userData.name.startsWith("AnchorPoint")) {
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
      }
    });
  }, []);

  return <primitive object={scene}>{annotations}</primitive>;
};
