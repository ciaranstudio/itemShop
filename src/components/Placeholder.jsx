import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Placeholder() {
  const boxRefInner = useRef();
  const boxRefMiddle = useRef();
  const boxRefOuter = useRef();

  const innerBoxGeoArgs = [0.75, 0.75, 0.75, 2, 2, 2]; // [0.5, 0.5, 0.5, 3, 3, 3]
  const middleBoxGeoArgs = [1.25, 1.25, 1.25, 3, 3, 3];
  const outerBoxGeoArgs = [2, 2, 2, 1, 1, 1];

  useFrame((state) => {
    const angle = state.clock.elapsedTime;
    boxRefInner.current.rotation.y = angle;
    boxRefMiddle.current.rotation.x = angle / 2;
    boxRefOuter.current.rotation.z = angle / 4;
  });

  return (
    <>
      <group>
        <mesh ref={boxRefInner} position={[0, 0.65, 0]}>
          <boxGeometry args={innerBoxGeoArgs} />
          <meshBasicMaterial wireframe color="white" />
        </mesh>
        <mesh ref={boxRefMiddle} position={[0, 0.65, 0]}>
          <boxGeometry args={middleBoxGeoArgs} />
          <meshBasicMaterial wireframe color="red" />
        </mesh>
        <mesh ref={boxRefOuter} position={[0, 0.65, 0]}>
          <boxGeometry args={outerBoxGeoArgs} />
          <meshBasicMaterial wireframe color="blue" />
        </mesh>
      </group>
    </>
  );
}
