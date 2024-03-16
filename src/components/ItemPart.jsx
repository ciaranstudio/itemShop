import React, { useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";

export const ItemPart = ({
  map,
  // displacementMap,
  normalMap,
  roughnessMap,
  metalnessMap,
  // aoMap,
  currentColor,
  currentTexture,
  model,
  animationType,
  animationToggle,
  itemName,
  currentItemSelected,
}) => {
  const { scene, nodes, materials } = useGLTF(model);

  // animation function that receives animationType prop (animation direction: horizontal, vertical, or none)
  // only animate if current item selected === itemName

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
