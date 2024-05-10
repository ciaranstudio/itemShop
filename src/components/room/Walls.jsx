import React, { useLayoutEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export const Walls = ({ currentColor, currentTexture }) => {
  const { scene, nodes, materials } = useGLTF("./models/walls.gltf");

  const [map, normalMap, roughnessMap, metalnessMap] =
    useTexture(currentTexture);

  const repeatVal = 8;

  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(repeatVal, repeatVal);

  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(repeatVal, repeatVal);

  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(repeatVal, repeatVal);

  useLayoutEffect(() => {
    Object.assign(materials.Material, {
      map: map,
      normalMap: normalMap,
      roughnessMap: roughnessMap,
      metalnessMap: metalnessMap,
      color: currentColor,
    });
  }, [scene, nodes, materials]);

  useLayoutEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        o.receiveShadow = true;
        o.material.roughness = 1;
        o.material.metalness = 0;
      }
    });
  }, []);

  return <primitive object={scene} />;
};
