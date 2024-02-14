import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Placeholder(props) {
  const boxRef = useRef();

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    boxRef.current.rotation.y = angle * 2;
  });

  return (
    <mesh
      {...props}
      ref={boxRef}
      scale={0.35}
      position={[0, 0, 0]}
      rotation-x={-Math.PI * 0.5}
    >
      {/* <boxGeometry args={[10, 15, 10, 4, 4, 4]} /> */}
      <circleGeometry args={[20, 64]} />
      <meshBasicMaterial wireframe color="lightBlue" />
    </mesh>
  );
}
