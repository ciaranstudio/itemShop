import { OrbitControls, useHelper } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useRef, useEffect } from "react";
import Stool from "./Stool.jsx";
import controls from "./debugControls";
import { CameraHelper } from "three";
// import * as THREE from "three";

export default function Experience() {
  const debugControls = controls();
  const orbitRef = useRef();
  const stoolRef = useRef();
  const shadowCameraRef = useRef();
  useHelper(shadowCameraRef, CameraHelper, 1, "lightBlue");

  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.autoRotate = true;
    }
  }, []);

  return (
    <>
      {debugControls.perfVisible && <Perf position="top-left" />}
      <color args={["#e8e8e8"]} attach="background" />
      <OrbitControls
        makeDefault
        ref={orbitRef}
        enablePan={false}
        maxDistance={80}
        minDistance={40}
      />
      <directionalLight
        castShadow
        position={[
          debugControls.directionalAposition.x,
          debugControls.directionalAposition.y,
          debugControls.directionalAposition.z,
        ]}
        intensity={debugControls.directionalAintensity}
        shadow-normalBias={0.04}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={15}
        shadow-camera-far={48}
        shadow-camera-left={-8}
        shadow-camera-bottom={-20}
        shadow-camera-right={8}
        shadow-camera-top={20}
        target={stoolRef.current}
      >
        {/* <orthographicCamera ref={shadowCameraRef} attach="shadow-camera" /> */}
      </directionalLight>
      <ambientLight intensity={debugControls.ambientLight} />
      <Stool
        ref={stoolRef}
        scale={debugControls.itemScale}
        position={[0, 0, 0]}
        onPointerMissed={() => (orbitRef.current.autoRotate = false)}
      />
    </>
  );
}
