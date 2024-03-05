import React from "react";
import { useGLTF } from "@react-three/drei";

export const Walls = () => {
  const { scene, nodes, materials } = useGLTF("./models/walls.gltf");

  return <primitive object={scene} />;
};
