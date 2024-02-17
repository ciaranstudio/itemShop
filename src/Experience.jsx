import { useFrame } from "@react-three/fiber";
import { OrbitControls, useHelper, useTexture } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useRef, useState, useEffect } from "react";
import Stool from "./Stool.jsx";
import controls from "./debugControls";
import { CameraHelper } from "three";
import * as THREE from "three";

export default function Experience({
  open,
  setOpen,
  currentColor,
  currentTexture,
  toggled,
  setToggled,
  animActive,
  setAnimActive,
}) {
  const debugControls = controls();
  const [initialLoad, setInitialLoad] = useState(false);
  const [controlsDragging, setControlsDragging] = useState(false);
  const [cameraPosition, setCameraPosition] = useState(null);
  const orbitRef = useRef();
  const stoolRef = useRef();
  const shadowCameraRef = useRef();
  useHelper(shadowCameraRef, CameraHelper, 1, "lightBlue");
  const vec = new THREE.Vector3();
  console.log(
    "current texture from Experience (prop from App): ",
    currentTexture,
  );

  const [
    colorMap,
    displacementMap,
    normalMap,
    metalnessMap,
    roughnessMap,
    aoMap,
  ] = useTexture(currentTexture);

  const handleOffClick = () => {
    if (orbitRef.current) setCameraPosition(orbitRef.current.object.position);
  };

  useEffect(() => {
    if (open) {
      setCameraPosition(orbitRef.current.object.position);
      console.log("open value from Experience useEffect: ", open);
      if (orbitRef.current) {
        orbitRef.current.autoRotateSpeed = 0.95;
        orbitRef.current.autoRotate = true;

        console.log(
          "orbitRef.current.autoRotate: ",
          orbitRef.current.autoRotate,
        );
      }
    } else if (!open) {
      console.log("open value from Experience useEffect: ", open);
      if (orbitRef.current) {
        orbitRef.current.autoRotateSpeed = 1.5;
        orbitRef.current.autoRotate = true;
        console.log(
          "orbitRef.current.autoRotate: ",
          orbitRef.current.autoRotate,
        );
      }
    }
  }, [open]);

  useEffect(() => {
    setInitialLoad(true);

    if (orbitRef.current) {
      orbitRef.current.addEventListener("start", () => {
        console.log("started dragging!");
        setControlsDragging(true);
        setOpen(false);
      }),
        true;
      // orbitRef.current.addEventListener("change", () =>
      //   console.log("dragged!"),
      // );
      orbitRef.current.addEventListener(
        "end",
        () => {
          console.log("stopped dragging!");
          // setCameraPosition(orbitRef.current.object.position);
          setControlsDragging(false);
          setOpen(true);
        },
        true,
      );
    }
    return () => {
      if (orbitRef.current) {
        orbitRef.current.addEventListener(
          "start",
          () => console.log("removed event listener, 'start'"),
          true,
        );
        orbitRef.current.removeEventListener(
          "end",
          () => console.log("removed event listener, 'end'"),
          true,
        );
        setControlsDragging(false);
      }
    };
  }, []);

  useFrame(() => {
    if (initialLoad && !controlsDragging && orbitRef.current && !open) {
      if (cameraPosition == null) {
        orbitRef.current.object.position.lerp(vec.set(35, 48, 85), 0.01);
        orbitRef.current.object.updateProjectionMatrix();
        orbitRef.current.update();
      }
    }
    return null;
  });

  return (
    <>
      {debugControls.perfVisible && <Perf position="top-left" />}
      <color args={["#e8e8e8"]} attach="background" />
      <OrbitControls
        makeDefault
        ref={orbitRef}
        enableZoom={false}
        enablePan={false}
        maxDistance={100}
        minDistance={70}
        maxPolarAngle={Math.PI / 2}
        enableDamping={true}
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
        shadow-camera-near={65}
        shadow-camera-far={115}
        shadow-camera-left={-10}
        shadow-camera-bottom={-25}
        shadow-camera-right={20}
        shadow-camera-top={20}
        target={stoolRef.current}
      >
        {/* <orthographicCamera ref={shadowCameraRef} attach="shadow-camera" /> */}
      </directionalLight>
      <ambientLight intensity={debugControls.ambientLight} />
      <Stool
        ref={stoolRef}
        scale={debugControls.itemScale}
        open={open}
        setOpen={setOpen}
        toggled={toggled}
        setToggled={setToggled}
        onPointerMissed={handleOffClick}
        colorMap={colorMap}
        displacementMap={displacementMap}
        normalMap={normalMap}
        metalnessMap={metalnessMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
        currentColor={currentColor}
        currentTexture={currentTexture}
        animActive={animActive}
        setAnimActive={setAnimActive}
      />
    </>
  );
}
