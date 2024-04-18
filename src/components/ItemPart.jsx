import React, { useLayoutEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useOptionStore } from "../store/useOptionStore.tsx";

export const ItemPart = ({ model, itemName, partName }) => {
  const { scene, nodes, materials } = useGLTF(model);

  // state from store
  const currentPartColor = useOptionStore(
    (state) => state.items[itemName].parts[partName].color,
  );
  const currentPartTexture = useOptionStore(
    (state) => state.items[itemName].parts[partName].texture,
  );

  // texture
  const [
    map,
    // displacementMap,
    normalMap,
    roughnessMap,
    metalnessMap,
    // aoMap,
  ] = useTexture(currentPartTexture);

  useLayoutEffect(() => {
    Object.assign(materials.Material, {
      map: map,
      // displacementMap: displacementMap,
      normalMap: normalMap,
      roughnessMap: roughnessMap,
      metalnessMap: metalnessMap,
      // aoMap: aoMap,
      color: currentPartColor,
    });
  }, [
    scene,
    nodes,
    materials,
    currentPartColor,
    currentPartTexture,
    map,
    normalMap,
    roughnessMap,
    metalnessMap,
  ]);

  useLayoutEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        o.material.roughness = 1;
        o.material.metalness = 0;
      }
    });
  }, []);

  return <primitive object={scene} />;
};
