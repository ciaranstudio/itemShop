import React, { useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";

export const ShelfBLongShelf = ({
  map,
  // displacementMap,
  normalMap,
  roughnessMap,
  metalnessMap,
  // aoMap,
  currentColor,
  currentTexture,
}) => {
  const { scene, nodes, materials } = useGLTF(
    "./models/shelfBLongModels/shelfBLongShelf.gltf",
  );

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

  useLayoutEffect(
    () =>
      scene.traverse(
        (o) => o.isMesh && (o.castShadow = o.receiveShadow = true),
      ),
    [],
  );

  return <primitive object={scene} />;
};
