import { useFrame } from "@react-three/fiber";
import { OrbitControls, useHelper, useTexture } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useRef, useState, useEffect } from "react";
import Stool from "./Stool.jsx";
import controls from "./debugControls";
import { CameraHelper } from "three";
import * as THREE from "three";
import Lights from "./Lights.jsx";
import Floor from "./Setting.jsx";

export default function Experience({
  open,
  setOpen,
  currentColor,
  currentTexture,
  toggled,
  setToggled,
  animActive,
  setAnimActive,
  selectedItem,
  setSelectedItem,
}) {
  const debugControls = controls();
  const [initialLoad, setInitialLoad] = useState(false);
  const [controlsDragging, setControlsDragging] = useState(false);
  const [cameraPosition, setCameraPosition] = useState(null);

  const [stoolAPosition, setStoolAPosition] = useState([-24, 0, 0]);
  const [stoolBPosition, setStoolBPosition] = useState([-8, 0, -15]);
  const [stoolCPosition, setStoolCPosition] = useState([8, 0, 0]);
  const [stoolDPosition, setStoolDPosition] = useState([24, 0, -15]);
  const [stoolEPosition, setStoolEPosition] = useState([-8, 0, 15]);
  const [stoolFPosition, setStoolDFosition] = useState([24, 0, 15]);

  const orbitRef = useRef();
  const stoolRef = useRef();
  const shadowCameraRef = useRef();
  useHelper(shadowCameraRef, CameraHelper, 1, "lightBlue");
  const vec = new THREE.Vector3();
  // console.log(
  //   "current texture from Experience (prop from App): ",
  //   currentTexture,
  // );

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
        orbitRef.current.object.position.lerp(vec.set(35, 40, 85), 0.01);
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
      <group position={[0, -15, 0]}>
        <Stool
          ref={stoolRef}
          position={stoolAPosition}
          scale={0.72}
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
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          includeFloor={false}
        />
        <Stool
          ref={stoolRef}
          position={stoolBPosition}
          scale={0.72}
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
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          includeFloor={false}
        />
        <Stool
          ref={stoolRef}
          position={stoolCPosition}
          scale={0.72}
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
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          includeFloor={false}
        />
        <Stool
          ref={stoolRef}
          position={stoolDPosition}
          scale={0.72}
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
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          includeFloor={false}
        />
        <Stool
          ref={stoolRef}
          position={stoolEPosition}
          scale={0.72}
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
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          includeFloor={false}
        />

        <Stool
          ref={stoolRef}
          position={stoolFPosition}
          scale={0.72}
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
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          includeFloor={false}
        />
        <Floor
          scale={0.72}
          colorMap={colorMap}
          displacementMap={displacementMap}
          normalMap={normalMap}
          metalnessMap={metalnessMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
          currentColor={currentColor}
          currentTexture={currentTexture}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          includeFloor={true}
        />
      </group>
    </>
  );
}
