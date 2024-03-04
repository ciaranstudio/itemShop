import React from "react";
import { useGLTF } from "@react-three/drei";

export const WallsAndMoulding = () => {
  const { scene, nodes, materials } = useGLTF("./models/wallsAndMoulding.gltf");

  return <primitive object={scene} />;
};
