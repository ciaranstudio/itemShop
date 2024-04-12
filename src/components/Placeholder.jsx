import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Placeholder() {
  const boxRefInner = useRef();
  const boxRefMiddle = useRef();
  const boxRefOuter = useRef();
  const boxGroupRef = useRef();

  const innerBoxGeoArgs = [0.95, 0.95, 0.95, 2, 2, 2]; // [0.5, 0.5, 0.5, 3, 3, 3]
  const middleBoxGeoArgs = [1.25, 1.25, 1.25, 1, 1, 1];
  const outerBoxGeoArgs = [1.65, 1.65, 1.65, 1, 1, 1];

  useFrame((state) => {
    const angle = state.clock.elapsedTime;
    // boxRefInner.current.rotation.x = angle / 3;
    boxRefInner.current.rotation.y = angle / 3;
    // boxRefMiddle.current.rotation.z = -angle / 4;
    // boxRefOuter.current.rotation.x = angle / 6;
    boxRefOuter.current.rotation.x = -angle / 6;
    // boxGroupRef.current.rotation.x = angle / 2;
    boxGroupRef.current.rotation.y = angle / 3;
  });

  return (
    <>
      <group ref={boxGroupRef}>
        <mesh ref={boxRefInner} position={[0, 0.65, 0]}>
          <boxGeometry args={innerBoxGeoArgs} />
          <meshBasicMaterial wireframe color="red" />
        </mesh>
        <mesh ref={boxRefMiddle} position={[0, 0.65, 0]}>
          <boxGeometry args={middleBoxGeoArgs} />
          <meshBasicMaterial wireframe color="white" />
        </mesh>
        <mesh ref={boxRefOuter} position={[0, 0.65, 0]}>
          <boxGeometry args={outerBoxGeoArgs} />
          <meshBasicMaterial wireframe color="blue" />
        </mesh>
      </group>
    </>
  );
}
