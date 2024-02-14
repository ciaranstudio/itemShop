import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useRef, useEffect } from "react";
import Stool from "./Stool.jsx";
import controls from "./debugControls";

export default function Experience() {
  const debugControls = controls();
  const orbitRef = useRef();
  const stoolRef = useRef();

  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.autoRotate = true;
    }
  }, []);

  return (
    <>
      {debugControls.perfVisible && <Perf position="top-left" />}
      <color args={["#e8e8e8"]} attach="background" />
      <OrbitControls makeDefault ref={orbitRef} enablePan={false} />
      <directionalLight
        castShadow
        position={[
          debugControls.directionalAposition.x,
          debugControls.directionalAposition.y,
          debugControls.directionalAposition.z,
        ]}
        intensity={debugControls.directionalAintensity}
        shadow-normalBias={0.04}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
        shadow-camera-left={-20}
        shadow-camera-bottom={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        target={stoolRef.current}
      />
      <ambientLight intensity={debugControls.ambientLight} />
      <Stool
        ref={stoolRef}
        scale={debugControls.itemScale}
        position={[0, -16, 0]}
        onPointerMissed={() => (orbitRef.current.autoRotate = false)}
      />
    </>
  );
}
