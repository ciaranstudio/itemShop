import { useFrame } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useRef, useState, useEffect } from "react";
import Stool from "./Stool.jsx";
import controls from "./debugControls";
import { CameraHelper } from "three";
import * as THREE from "three";
import Setting from "./Setting.jsx";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";

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
  const loadingBarElement = document.querySelector(".loading-bar");
  const { active, progress, errors, item, loaded, total } = useProgress();
  const overlayOpacity = { value: 1 };
  const [overlayAlpha, setOverlayAlpha] = useState(1);
  const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
  const overlayMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      uAlpha: { value: overlayAlpha },
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.153, 0.153, 0.102, uAlpha);
        }
    `,
  });

  useEffect(() => {
    loadingBarElement.style.transform = `scaleX(${progress / 100})`;
    if (progress == 100) {
      window.setTimeout(() => {
        // animate overlay
        gsap.to(overlayOpacity, {
          duration: 3,
          value: 0,
          delay: 1,
          onUpdate: () => {
            setOverlayAlpha(overlayOpacity.value);
          },
          // onComplete: () => {
          //   setOverlayAlpha(overlayOpacity.value);
          // },
        });
        // update loadingBarElement
        loadingBarElement.classList.add("ended");
        loadingBarElement.style.transform = "";
      }, 500);
    }
    console.log(overlayGeometry);
  }, [progress]);

  const debugControls = controls();
  const [initialLoad, setInitialLoad] = useState(false);
  const [controlsDragging, setControlsDragging] = useState(false);
  const [cameraPosition, setCameraPosition] = useState(null);

  const orbitRef = useRef();
  const stoolRef = useRef();
  const shadowCameraRef = useRef();
  useHelper(shadowCameraRef, CameraHelper, 1, "lightBlue");
  const vec = new THREE.Vector3();

  const handleOffClick = () => {
    // if (orbitRef.current) setCameraPosition(orbitRef.current.object.position);
  };

  // useEffect(() => {
  //   if (open) {
  //     // setCameraPosition(orbitRef.current.object.position);
  //     // console.log("open value from Experience useEffect: ", open);
  //     if (orbitRef.current) {
  //       // orbitRef.current.autoRotateSpeed = 0.95;
  //       // orbitRef.current.autoRotate = true;
  //       // console.log(
  //       //   "orbitRef.current.autoRotate: ",
  //       //   orbitRef.current.autoRotate,
  //       // );
  //     }
  //   } else if (!open) {
  //     // console.log("open value from Experience useEffect: ", open);
  //     if (orbitRef.current) {
  //       // orbitRef.current.autoRotateSpeed = 1.5;
  //       // orbitRef.current.autoRotate = true;
  //       // console.log(
  //       //   "orbitRef.current.autoRotate: ",
  //       //   orbitRef.current.autoRotate,
  //       // );
  //     }
  //   }
  // }, [open]);
  /**
   * Overlay
   */

  useEffect(() => {
    setInitialLoad(true);

    if (orbitRef.current) {
      orbitRef.current.addEventListener("start", () => {
        console.log("started dragging!");
        setControlsDragging(true);
        // setOpen(false);
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
        orbitRef.current.removeEventListener(
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
    if (initialLoad && !controlsDragging && orbitRef.current) {
      if (cameraPosition == null) {
        //   orbitRef.current.object.position.lerp(vec.set(-35, 40, 60), 0.01);
        //   orbitRef.current.object.updateProjectionMatrix();
        //   orbitRef.current.update();
        // } else {
        orbitRef.current.object.position.lerp(
          vec.set(
            currentItemSelected.position.x * 12, // * 6
            currentItemSelected.position.y + 5 * 12, // * 6
            currentItemSelected.position.z * 16, // * 6
          ),
          0.03,
        );
        orbitRef.current.object.updateProjectionMatrix();
        orbitRef.current.update();
      }
      return null;
    }
  });

  return (
    <>
      {debugControls.perfVisible && <Perf position="top-left" />}
      <color args={["#27271a"]} attach="background" />
      <mesh geometry={overlayGeometry} material={overlayMaterial}></mesh>
      {/* <mesh position={[0, 0, 0]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[130, 130, 16, 16]} />
        <meshBasicMaterial color="#bdbdbd" wireframe />
      </mesh>
      <mesh position={[0, 7, 0]}>
        <boxGeometry args={[32, 13, 32, 8, 8, 8]} />
        <meshBasicMaterial color="#757575" wireframe />
      </mesh> */}
      <OrbitControls
        makeDefault
        ref={orbitRef}
        enableZoom={true}
        enablePan={false}
        maxDistance={300}
        minDistance={70}
        maxPolarAngle={Math.PI / 2}
        enableDamping={true}
        // target={[
        //   currentItemSelected.position.x,
        //   currentItemSelected.position.y,
        //   currentItemSelected.position.z,
        // ]}
      />
      <group position={[0, 0, 0]}>
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
        <Setting
          scale={0.72}
          currentItemSelected={currentItemSelected}
          includeFloor={true}
        />
      </group>
    </>
  );
}
