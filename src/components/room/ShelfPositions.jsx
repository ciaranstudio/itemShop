import React from "react";
import { useGLTF } from "@react-three/drei";

export const ShelfPositions = () => {
  const { scene } = useGLTF("./models/shelfPositions.gltf");

  return <primitive object={scene} />;
};
