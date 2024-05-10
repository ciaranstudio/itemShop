import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export default function Placeholder() {
  // useRef
  const boxRefInner = useRef();
  const boxRefMiddle = useRef();
  const boxRefOuter = useRef();
  const boxGroupRef = useRef();

  // constants
  const innerBoxGeoArgs = [0.95, 0.95, 0.95, 2, 2, 2];
  const middleBoxGeoArgs = [1.25, 1.25, 1.25, 1, 1, 1];
  const outerBoxGeoArgs = [1.65, 1.65, 1.65, 1, 1, 1];

  // useEffect
  useEffect(() => {
    window.document.body.style.cursor = "wait";
  }, []);

  // useFrame
  useFrame((state) => {
    const angle = state.clock.elapsedTime;
    boxRefInner.current.rotation.y = angle / 3;
    boxRefOuter.current.rotation.x = -angle / 6;
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
