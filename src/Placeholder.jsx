import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Placeholder(props) {
  const boxRef = useRef();

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    boxRef.current.rotation.y = angle * 2;
  });

  return (
    <>
      <mesh position={[0, 0, 0]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[130, 130, 16, 16]} />
        <meshBasicMaterial color="#bdbdbd" wireframe />
      </mesh>
      <mesh ref={boxRef} position={[0, 7, 0]}>
        <boxGeometry args={[32, 13, 32, 8, 8, 8]} />
        <meshBasicMaterial color="grey" wireframe />
      </mesh>
    </>
  );
}
