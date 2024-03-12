import React, { useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";

export const GrampsLeg1 = ({
  map,
  normalMap,
  roughnessMap,
  metalnessMap,
  currentColor,
  currentTexture,
}) => {
  const { scene, nodes, materials } = useGLTF(
    "./models/grampsModels/grampsLeg1.gltf",
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
