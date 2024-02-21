import React from "react";
import { Edges } from "@react-three/drei";

// import { Geometry, Base, Subtraction } from "@react-three/csg";
// started with goal of ring with Subtraction but it was slowing down the frame rate, code commented for now
export default function RingCircle({
  selected,
  stoolY,
  // woodMaterial
}) {
  return (
    <mesh
      position={[0.25, stoolY + 0.01, -0.25]}
      rotation-x={-Math.PI * 0.5}
      visible={selected}
      depthTest={false}
    >
      <circleGeometry args={[9.25, 64]} />
      {/* <Geometry>
        <Base>
          <circleGeometry args={[10, 64]} />
        </Base>
        <Subtraction>
          <circleGeometry args={[9.75, 64]} />
        </Subtraction>
      </Geometry> */}
      <meshBasicMaterial transparent opacity={0.35} />
      {/* <meshStandardMaterial {...woodMaterial} /> */}
      <Edges
        scale={1 + stoolY / 12}
        threshold={90}
        color="white"
        visible={selected}
      />
      <Edges
        scale={stoolY / 2}
        threshold={90}
        color="white"
        visible={selected}
      />
    </mesh>
  );
}
