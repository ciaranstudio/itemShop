import React, { useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
// import { textures } from "../data/textures.jsx";

export const Floor = ({
  map,
  displacementMap,
  normalMap,
  roughnessMap,
  metalnessMap,
  aoMap,
  currentColor,
  currentTexture,
}) => {
  const { scene, nodes, materials } = useGLTF("./models/floor.gltf");

  // map.minFilter = THREE.LinearFilter;
  // map.magFilter = THREE.NearestFilter;
  // map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(8, 8);

  displacementMap.wrapS = THREE.RepeatWrapping;
  displacementMap.wrapT = THREE.RepeatWrapping;
  displacementMap.repeat.set(8, 8);

  aoMap.wrapS = THREE.RepeatWrapping;
  aoMap.wrapT = THREE.RepeatWrapping;
  aoMap.repeat.set(8, 8);

  // normalMap.minFilter = THREE.LinearFilter;
  // normalMap.magFilter = THREE.NearestFilter;
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(8, 8);

  // roughnessMap.minFilter = THREE.LinearFilter;
  // roughnessMap.magFilter = THREE.NearestFilter;
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(8, 8);

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
  }, [
    scene,
    nodes,
    materials,
    currentColor,
    currentTexture,
    map,
    displacementMap,
    normalMap,
    roughnessMap,
    metalnessMap,
    aoMap,
  ]);

  // useLayoutEffect(
  //   () => scene.traverse((o) => o.isMesh && (o.receiveShadow = true)),
  //   [],
  // );

  useLayoutEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        // o.castShadow = true;
        o.receiveShadow = true;
        o.material.roughness = 1;
        o.material.metalness = 0;
        o.material.dithering = true;
      }
    });
  }, []);

  return <primitive object={scene} />;
};
