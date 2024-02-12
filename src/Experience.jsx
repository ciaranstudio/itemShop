import {
  OrbitControls,
  useHelper,
  // Environment,
  // SoftShadows,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  useRef,
  // useState,
  useEffect,
} from "react";
// import Placeholder from "./Placeholder.jsx";
import Stool from "./Stool.jsx";
import controls from "./debugControls";
// import { DirectionalLightHelper } from "three";
// import { PointLight, PointLightHelper } from "three";
// import * as THREE from "three";

export default function Experience() {
  const debugControls = controls();
  // const [loaded, setLoaded] = useState(false);
  const orbitRef = useRef();
  const stoolRef = useRef();
  // const dirLightA = useRef();
  // const dirLightB = useRef();
  // const dirLightC = useRef();
  // const dirLightD = useRef();

  // const pointLightTop = useRef();
  // const pointLightBottom = useRef();
  // const pointLight0 = useRef();

  // useHelper(dirLightA, DirectionalLightHelper, 1, "lightBlue");
  // useHelper(dirLightB, DirectionalLightHelper, 1, "lightGreen");
  // useHelper(dirLightC, DirectionalLightHelper, 1, "yellow");
  // useHelper(dirLightD, DirectionalLightHelper, 1, "orange");

  // useHelper(pointLightTop, PointLightHelper, 1, "red");
  // useHelper(pointLightBottom, PointLightHelper, 1, "red");
  // useHelper(pointLight0, PointLightHelper, 1, "red");

  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.autoRotate = true;
    }
    // if (stoolRef.current) {
    //   // console.log(stoolRef.current);
    // }
  }, []);

  return (
    <>
      {debugControls.perfVisible && <Perf position="top-left" />}
      <color args={["#e8e8e8"]} attach="background" />
      <OrbitControls makeDefault ref={orbitRef} enablePan={false} />
      <directionalLight
        // ref={dirLightA}
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
        shadow-camera-far={55}
        shadow-camera-left={-10}
        shadow-camera-bottom={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        // target-position={[0, 6, 0]}
        target={stoolRef.current}
      />

      {/* <directionalLight
        ref={dirLightB}
        castShadow
        position={[
          debugControls.directionalBposition.x,
          debugControls.directionalBposition.y,
          debugControls.directionalBposition.z,
        ]}
        intensity={debugControls.directionalBintensity}
        shadow-normalBias={0.04}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-bottom={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        // target-position={[0, 6, 0]}
        target={stoolRef.current}
      /> */}
      {/* <directionalLight
        ref={dirLightC}
        castShadow
        position={[
          debugControls.directionalCposition.x,
          debugControls.directionalCposition.y,
          debugControls.directionalCposition.z,
        ]}
        intensity={debugControls.directionalCintensity}
        shadow-normalBias={0.04}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
        shadow-camera-left={-20}
        shadow-camera-bottom={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        // target-position={[0, -8, 0]}
        target={stoolRef.current}
      />
      <directionalLight
        ref={dirLightD}
        castShadow
        position={[
          debugControls.directionalDposition.x,
          debugControls.directionalDposition.y,
          debugControls.directionalDposition.z,
        ]}
        intensity={debugControls.directionalDintensity}
        shadow-normalBias={0.04}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
        shadow-camera-left={-20}
        shadow-camera-bottom={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        // target-position={[0, -8, 0]}
        target={stoolRef.current}
      /> */}
      {/* <pointLight
        ref={pointLightBottom}
        color="white"
        position={[0, -10, 0]}
        intensity={10}
      />
      <pointLight
        ref={pointLightTop}
        color="white"
        position={[0, 8, 0]}
        intensity={4}
      /> */}
      <ambientLight intensity={debugControls.ambientLight} />
      <Stool
        ref={stoolRef}
        scale={debugControls.itemScale}
        position={[0, 6, 0]}
        onPointerMissed={() => (orbitRef.current.autoRotate = false)}
      />
      {/* <SoftShadows size={20} samples={20} focus={1} /> */}
    </>
  );
}
