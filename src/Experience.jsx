import { useFrame } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useRef, useState, useEffect } from "react";
import Stool from "./Stool.jsx";
import controls from "./debugControls";
import { CameraHelper } from "three";
import * as THREE from "three";
import Floor from "./Setting.jsx";

export default function Experience({
  open,
  setOpen,
  toggled,
  setToggled,
  animActive,
  setAnimActive,
  stoolDataA,
  stoolDataB,
  stoolDataC,
  stoolDataD,
  currentItemSelected,
  setCurrentItemSelected,
  setCurrentOptionSelected,
}) {
  const debugControls = controls();
  const [initialLoad, setInitialLoad] = useState(false);
  const [controlsDragging, setControlsDragging] = useState(false);
  const [cameraPosition, setCameraPosition] = useState(null);

  // const [stoolAPosition, setStoolAPosition] = useState([-10, 0, 10]);
  // const [stoolBPosition, setStoolBPosition] = useState([-10, 0, -10]);
  // const [stoolCPosition, setStoolCPosition] = useState([10, 0, 10]);
  // const [stoolDPosition, setStoolDPosition] = useState([10, 0, -10]);

  const orbitRef = useRef();
  const stoolRef = useRef();
  const shadowCameraRef = useRef();
  useHelper(shadowCameraRef, CameraHelper, 1, "lightBlue");
  const vec = new THREE.Vector3();

  const handleOffClick = () => {
    if (orbitRef.current) setCameraPosition(orbitRef.current.object.position);
  };

  useEffect(() => {
    if (open) {
      setCameraPosition(orbitRef.current.object.position);
      // console.log("open value from Experience useEffect: ", open);
      if (orbitRef.current) {
        // orbitRef.current.autoRotateSpeed = 0.95;
        // orbitRef.current.autoRotate = true;
        // console.log(
        //   "orbitRef.current.autoRotate: ",
        //   orbitRef.current.autoRotate,
        // );
      }
    } else if (!open) {
      // console.log("open value from Experience useEffect: ", open);
      if (orbitRef.current) {
        // orbitRef.current.autoRotateSpeed = 1.5;
        // orbitRef.current.autoRotate = true;
        // console.log(
        //   "orbitRef.current.autoRotate: ",
        //   orbitRef.current.autoRotate,
        // );
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
          // setOpen(true);
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
        orbitRef.current.object.position.lerp(vec.set(-75, 50, 140), 0.01);
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
        enableZoom={true}
        enablePan={false}
        maxDistance={200}
        minDistance={100}
        maxPolarAngle={Math.PI / 2}
        enableDamping={true}
      />
      <group position={[0, -15, 0]}>
        <Stool
          data={stoolDataA}
          currentItemSelected={currentItemSelected}
          setCurrentItemSelected={setCurrentItemSelected}
          setCurrentOptionSelected={setCurrentOptionSelected}
          ref={stoolRef}
          scale={0.72}
          open={open}
          setOpen={setOpen}
          toggled={toggled}
          setToggled={setToggled}
          onPointerMissed={handleOffClick}
          animActive={animActive}
          setAnimActive={setAnimActive}
          includeFloor={false}
        />
        <Stool
          data={stoolDataB}
          currentItemSelected={currentItemSelected}
          setCurrentItemSelected={setCurrentItemSelected}
          setCurrentOptionSelected={setCurrentOptionSelected}
          ref={stoolRef}
          scale={0.72}
          open={open}
          setOpen={setOpen}
          toggled={toggled}
          setToggled={setToggled}
          onPointerMissed={handleOffClick}
          animActive={animActive}
          setAnimActive={setAnimActive}
          includeFloor={false}
        />
        <Stool
          data={stoolDataC}
          currentItemSelected={currentItemSelected}
          setCurrentItemSelected={setCurrentItemSelected}
          setCurrentOptionSelected={setCurrentOptionSelected}
          ref={stoolRef}
          scale={0.72}
          open={open}
          setOpen={setOpen}
          toggled={toggled}
          setToggled={setToggled}
          onPointerMissed={handleOffClick}
          animActive={animActive}
          setAnimActive={setAnimActive}
          includeFloor={false}
        />
        <Stool
          data={stoolDataD}
          currentItemSelected={currentItemSelected}
          setCurrentItemSelected={setCurrentItemSelected}
          setCurrentOptionSelected={setCurrentOptionSelected}
          ref={stoolRef}
          scale={0.72}
          open={open}
          setOpen={setOpen}
          toggled={toggled}
          setToggled={setToggled}
          onPointerMissed={handleOffClick}
          animActive={animActive}
          setAnimActive={setAnimActive}
          includeFloor={false}
        />
        <Floor
          scale={0.72}
          currentItemSelected={currentItemSelected}
          includeFloor={true}
        />
      </group>
    </>
  );
}
