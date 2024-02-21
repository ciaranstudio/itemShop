import React from "react";
// import { Geometry, Base, Subtraction } from "@react-three/csg";
// tried ring with Subtraction but it was slowing down the frame rate, code commented
export default function RingCircle({ selected, stoolY }) {
  return (
    <mesh
      position={[0.25, stoolY + 0.01, -0.25]}
      rotation-x={-Math.PI * 0.5}
      visible={selected}
      depthTest={false}
    >
      <circleGeometry args={[8.5, 64]} />
      {/* <Geometry>
        <Base>
          <circleGeometry args={[10, 64]} />
        </Base>
        <Subtraction>
          <circleGeometry args={[9.75, 64]} />
        </Subtraction>
      </Geometry> */}
      <meshStandardMaterial transparent opacity={0.35} />
    </mesh>
  );
}
