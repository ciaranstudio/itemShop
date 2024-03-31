import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Placeholder() {
  const boxRef = useRef();

  useFrame((state) => {
    const angle = state.clock.elapsedTime;
    boxRef.current.rotation.y = angle / 2;
  });

  return (
    <>
      <mesh ref={boxRef} position={[0, 0.65, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5, 3, 3, 3]} />
        <meshBasicMaterial wireframe />
      </mesh>
    </>
  );
}
