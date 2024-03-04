import React, { useLayoutEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { textures } from "./textures.jsx";

export const Floor = () => {
  const { scene, nodes, materials } = useGLTF("./models/floor.gltf");

  // const [colorMap, normalMap, roughnessMap, metalnessMap] = useTexture(
  //   textures.naturalTexture,
  // );

  // useLayoutEffect(() => {
  //   Object.assign(materials.Material, {
  //     map: colorMap,
  //     normalMap: normalMap,
  //     roughnessMap: roughnessMap,
  //     metalnessMap: metalnessMap,
  //     color: textures.floorStain,
  //   });
  // }, [
  //   scene,
  //   nodes,
  //   materials,
  //   colorMap,
  //   normalMap,
  //   roughnessMap,
  //   metalnessMap,
  // ]);

  useLayoutEffect(
    () => scene.traverse((o) => o.isMesh && (o.receiveShadow = true)),
    [],
  );

  return <primitive object={scene} />;
};
