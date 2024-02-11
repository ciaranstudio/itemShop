import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Placeholder(props) {
  const boxRef = useRef();

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    boxRef.current.rotation.y = angle;
  });

  return (
    <mesh {...props} ref={boxRef}>
      <boxGeometry args={[10, 15, 10, 4, 4, 4]} />
      <meshBasicMaterial wireframe color="lightBlue" />
    </mesh>
  );
}
