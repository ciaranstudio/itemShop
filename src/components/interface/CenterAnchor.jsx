import React, { useState, useLayoutEffect, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import HtmlOutlet from "./HtmlOutlet.jsx";
import { useDashContext } from "../../context/ViewContext";

export const CenterAnchor = ({
  theme,
  currentColor,
  currentTexture,
  toggleInfoBox,
  togglePhotoBox,
}) => {
  const { location, setLocation } = useDashContext();
  const { scene, nodes, materials } = useGLTF("./models/logoAnnotated.gltf");
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    // setLocation(location);
    console.log("dash context location: ", location);
  }, [location]);

  // texture
  const [map, normalMap, roughnessMap, metalnessMap] =
    useTexture(currentTexture);

  // state from store
  const mobileView = useOptionStore((state) => state.mobileView);
  const open = useOptionStore((state) => state.open);
  const showPhotos = useOptionStore((state) => state.showPhotos);
  const allPhotos = useOptionStore((state) => state.allPhotos);
  const aboutInfo = useOptionStore((state) => state.aboutInfo);

  useLayoutEffect(() => {
    Object.assign(materials._0103_Blue, {
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
                // position={[o.position.x, o.position.y, o.position.z]}
                position={[0, 0, 0]}
              >
                <HtmlOutlet
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
  }, [scene, open, showPhotos, allPhotos, aboutInfo, mobileView, location]);

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
