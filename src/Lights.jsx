import controls from "./debugControls";
// import { useHelper } from "@react-three/drei";
// import { useRef } from "react";
// import * as THREE from "three";

export default function Lights() {
  const debugControls = controls();
  // const dLightRef = useRef();
  // const shadowCameraRef = useRef();
  // useHelper(dLightRef, THREE.SpotLightHelper);
  // useHelper(shadowCameraRef, THREE.CameraHelper);

  return (
    <>
      <directionalLight
        // ref={dLightRef}
        castShadow
        position={[
          debugControls.directionalAposition.x,
          debugControls.directionalAposition.y,
          debugControls.directionalAposition.z,
        ]}
        intensity={debugControls.directionalAintensity}
        shadow-normalBias={0.001}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={215}
        shadow-camera-far={470}
        shadow-camera-left={-140}
        shadow-camera-bottom={-85}
        shadow-camera-right={145}
        shadow-camera-top={85}
        // target={stoolRef.current}
        // target-position={[0, 0, 0]}
      >
        {/* <perspectiveCamera ref={shadowCameraRef} attach="shadow-camera" /> */}
      </directionalLight>
      {/* <ambientLight intensity={debugControls.ambientLight} /> */}
    </>
  );
}
