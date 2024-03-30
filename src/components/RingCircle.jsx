import React from "react";
import { Edges } from "@react-three/drei";

export default function RingCircle({ selected, showBackground }) {
  return (
    <mesh
      position={[0, 0.0005, 0]}
      rotation-x={-Math.PI * 0.5}
      visible={selected}
      depthTest={false}
    >
      <circleGeometry args={[0.5, 64]} />
      <meshBasicMaterial transparent opacity={0} />
      <Edges
        threshold={90}
        color="white"
        visible={selected && showBackground ? true : false}
      />
    </mesh>
  );
}
