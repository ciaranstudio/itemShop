import React, { useState, useLayoutEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import HtmlOutlet from "./HtmlOutlet.jsx";

export const CenterAnchor = ({ currentColor, currentTexture }) => {
  const { scene, nodes, materials } = useGLTF("./models/logoAnnotated.gltf");
  const [annotations, setAnnotations] = useState([]);

  // texture
  const [map, normalMap, roughnessMap, metalnessMap] =
    useTexture(currentTexture);

  // state from store
  const mobileView = useOptionStore((state) => state.mobileView);
  const open = useOptionStore((state) => state.open);
  const selectedImage = useOptionStore((state) => state.selectedImage);
  const locationPathname = useOptionStore((state) => state.locationPathname);

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
              <group key={o.uuid} position={[0, 0, 0]}>
                <HtmlOutlet />
              </group>,
            );
          }
        }
      }
    });
    setAnnotations(currentAnnotations);
  }, [scene, open, mobileView, locationPathname, selectedImage]);

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
