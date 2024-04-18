import React, { useLayoutEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export const Floor = ({ currentColor, currentTexture }) => {
  const { scene, nodes, materials } = useGLTF("./models/floor.gltf");

  const [map, displacementMap, normalMap, roughnessMap, metalnessMap, aoMap] =
    useTexture(currentTexture);

  const repeatVal = 3;

  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(repeatVal, repeatVal);

  displacementMap.wrapS = THREE.RepeatWrapping;
  displacementMap.wrapT = THREE.RepeatWrapping;
  displacementMap.repeat.set(repeatVal, repeatVal);

  aoMap.wrapS = THREE.RepeatWrapping;
  aoMap.wrapT = THREE.RepeatWrapping;
  aoMap.repeat.set(repeatVal, repeatVal);

  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(repeatVal, repeatVal);

  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(repeatVal, repeatVal);

  useLayoutEffect(() => {
    Object.assign(materials.Material, {
      map: map,
      displacementMap: displacementMap,
      normalMap: normalMap,
      roughnessMap: roughnessMap,
      metalnessMap: metalnessMap,
      aoMap: aoMap,
      color: currentColor,
    });
  }, [scene, nodes, materials]);

  useLayoutEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        o.receiveShadow = true;
        o.material.roughness = 1;
        o.material.metalness = 0;
        o.material.dithering = true;
      }
    });
  }, []);

  return <primitive object={scene} />;
};
