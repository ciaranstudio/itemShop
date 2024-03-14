import React, { useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";

export const BlockSide1 = ({
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
    "./models/blockModels/blockSide1.gltf",
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

  // useLayoutEffect(
  //   () =>
  //     scene.traverse(
  //       (o) => o.isMesh && (o.castShadow = o.receiveShadow = true),
  //     ),
  //   [],
  // );

  // useLayoutEffect(
  //   () => scene.traverse((o) => o.isMesh && (o.material.metalness = 0)),
  //   [],
  // );

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
