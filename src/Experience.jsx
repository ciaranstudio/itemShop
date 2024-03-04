import { useFrame } from "@react-three/fiber";
import { OrbitControls, useHelper, useTexture } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useRef, useState, useEffect } from "react";
import controls from "./debugControls";
import { CameraHelper } from "three";
import * as THREE from "three";
import { useProgress, Sky, Stage } from "@react-three/drei";
import gsap from "gsap";
import { Block } from "./Block.jsx";
import { Gramps } from "./Gramps.jsx";
import { Horse } from "./Horse.jsx";
import { ShelfALong } from "./ShelfALong.jsx";
import { ShelfAShort } from "./ShelfAShort.jsx";
import { ShelfBLong } from "./ShelfBLong.jsx";
import { ShelfBShort } from "./ShelfBShort.jsx";
import { Squatter } from "./Squatter.jsx";
import { Floor } from "./Floor.jsx";
import { WallsAndMoulding } from "./WallsAndMoulding.jsx";
import { DirectionalLightHelper } from "three";

export default function Experience({
  open,
  setOpen,
  toggled,
  setToggled,
  animActive,
  setAnimActive,
  shopItems,
  currentItemSelected,
  setCurrentItemSelected,
  currentTexture,
  currentColor,
}) {
  const [
    colorMap,
    // displacementMap,
    normalMap,
    roughnessMap,
    metalnessMap,
    // aoMap,
  ] = useTexture(currentTexture);

  const dirLightA = useRef();
  const dirLightB = useRef();
  const dirLightC = useRef();
  const dirLightD = useRef();

  const grampsRef = useRef();
  const squatterRef = useRef();
  const horseRef = useRef();
  const blockRef = useRef();
  const shelfAShortRef = useRef();
  const shelfALongRef = useRef();
  const shelfBShortRef = useRef();
  const shelfBLongRef = useRef();

  useHelper(dirLightA, DirectionalLightHelper, 1, "red");
  useHelper(dirLightB, DirectionalLightHelper, 1, "blue");
  useHelper(dirLightC, DirectionalLightHelper, 1, "green");
  useHelper(dirLightD, DirectionalLightHelper, 1, "purple");

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
    // console.log(overlayGeometry);
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
        // disabled this to test out new model 02/24/2024
        // orbitRef.current.object.position.lerp(
        //   vec.set(
        //     currentItemSelected.position.x * 4, // * 6
        //     currentItemSelected.position.y + 7 * 4, // * 6
        //     currentItemSelected.position.z * 4, // * 6
        //   ),
        //   0.03,
        // );
        // orbitRef.current.object.updateProjectionMatrix();
        // orbitRef.current.update();
      }
      return null;
    }
  });

  // const stagePositionY = 60;
  return (
    <>
      {debugControls.perfVisible && <Perf position="top-left" />}
      <color args={["#27271a"]} attach="background" />
      <mesh geometry={overlayGeometry} material={overlayMaterial}></mesh>
      <OrbitControls
        makeDefault
        ref={orbitRef}
        enableZoom={true}
        enablePan={false}
        maxDistance={500}
        minDistance={70}
        maxPolarAngle={Math.PI / 2}
        enableDamping={true}
        // target={[
        //   currentItemSelected.position.x,
        //   currentItemSelected.position.y,
        //   currentItemSelected.position.z,
        // ]}
      />

      <group
      // position={[0, stagePositionY, 0]}
      >
        <Stage
          shadows={{ type: "contact", opacity: 0.5, blur: 2 }}
          environment="night"
          preset="soft"
          adjustCamera={false}
          intensity={3}
          controls={orbitRef}
          center={true}
        >
          <ambientLight intensity={0.75} />
          <directionalLight
            ref={dirLightA}
            castShadow
            position={[0, 60, 0]}
            intensity={2}
            shadow-normalBias={0.1}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={50}
            shadow-camera-far={115}
            shadow-camera-left={-10}
            shadow-camera-bottom={-10}
            shadow-camera-right={10}
            shadow-camera-top={150}
            target={grampsRef.current}
            // target-position={[-20, -20, 20]}
          />
          <pointLight position={[0, 14, 70]} intensity={30} />

          <directionalLight
            ref={dirLightB}
            castShadow
            position={[0, 60, 0]}
            intensity={2}
            shadow-normalBias={0.01}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={50}
            shadow-camera-far={115}
            shadow-camera-left={-10}
            shadow-camera-bottom={-10}
            shadow-camera-right={10}
            shadow-camera-top={150}
            target={blockRef.current}
            // target-position={[-20, -20, 20]}
          />

          <directionalLight
            ref={dirLightC}
            castShadow
            position={[0, 60, 0]}
            intensity={2}
            shadow-normalBias={0.01}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={50}
            shadow-camera-far={130}
            shadow-camera-left={-20}
            shadow-camera-bottom={-20}
            shadow-camera-right={20}
            shadow-camera-top={150}
            target={horseRef.current}
            // target-position={[-20, -20, 20]}
          />

          <directionalLight
            ref={dirLightD}
            castShadow
            position={[0, 60, 0]}
            intensity={2}
            shadow-normalBias={0.01}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={50}
            shadow-camera-far={115}
            shadow-camera-left={-10}
            shadow-camera-bottom={-10}
            shadow-camera-right={10}
            shadow-camera-top={150}
            target={squatterRef.current}
            // target-position={[-20, -20, 20]}
          />
          <mesh castShadow ref={grampsRef} position={[0, 0, 70]}>
            <Gramps
              map={colorMap}
              // displacementMap={displacementMap}
              normalMap={normalMap}
              roughnessMap={roughnessMap}
              metalnessMap={metalnessMap}
              // aoMap={aoMap}
              currentColor={currentColor}
              currentTexture={currentTexture}
            />
          </mesh>
          <mesh
            castShadow
            ref={blockRef}
            position={[0, 0, -70]}
            rotation={[0, Math.PI / 4, 0]}
          >
            <Block
              map={colorMap}
              // displacementMap={displacementMap}
              normalMap={normalMap}
              roughnessMap={roughnessMap}
              metalnessMap={metalnessMap}
              // aoMap={aoMap}
              currentColor={currentColor}
              currentTexture={currentTexture}
            />
          </mesh>
          <mesh castShadow ref={horseRef} position={[70, 0, 0]}>
            <Horse
              map={colorMap}
              // displacementMap={displacementMap}
              normalMap={normalMap}
              roughnessMap={roughnessMap}
              metalnessMap={metalnessMap}
              // aoMap={aoMap}
              currentColor={currentColor}
              currentTexture={currentTexture}
            />
          </mesh>
          <mesh
            castShadow
            ref={squatterRef}
            position={[-70, 0, 0]}
            rotation={[0, Math.PI / 4, 0]}
          >
            <Squatter
              map={colorMap}
              // displacementMap={displacementMap}
              normalMap={normalMap}
              roughnessMap={roughnessMap}
              metalnessMap={metalnessMap}
              // aoMap={aoMap}
              currentColor={currentColor}
              currentTexture={currentTexture}
            />
          </mesh>
          <mesh castShadow ref={shelfAShortRef}>
            <ShelfAShort
              map={colorMap}
              // displacementMap={displacementMap}
              normalMap={normalMap}
              roughnessMap={roughnessMap}
              metalnessMap={metalnessMap}
              // aoMap={aoMap}
              currentColor={currentColor}
              currentTexture={currentTexture}
            />
          </mesh>
          <mesh castShadow ref={shelfALongRef}>
            <ShelfALong
              map={colorMap}
              // displacementMap={displacementMap}
              normalMap={normalMap}
              roughnessMap={roughnessMap}
              metalnessMap={metalnessMap}
              // aoMap={aoMap}
              currentColor={currentColor}
              currentTexture={currentTexture}
            />
          </mesh>
          <mesh castShadow ref={shelfBShortRef}>
            <ShelfBShort
              map={colorMap}
              // displacementMap={displacementMap}
              normalMap={normalMap}
              roughnessMap={roughnessMap}
              metalnessMap={metalnessMap}
              // aoMap={aoMap}
              currentColor={currentColor}
              currentTexture={currentTexture}
            />
          </mesh>
          <mesh castShadow ref={shelfBLongRef}>
            <ShelfBLong
              map={colorMap}
              // displacementMap={displacementMap}
              normalMap={normalMap}
              roughnessMap={roughnessMap}
              metalnessMap={metalnessMap}
              // aoMap={aoMap}
              currentColor={currentColor}
              currentTexture={currentTexture}
            />
          </mesh>

          <mesh receiveShadow>
            <Floor
              map={colorMap}
              // displacementMap={displacementMap}
              normalMap={normalMap}
              roughnessMap={roughnessMap}
              metalnessMap={metalnessMap}
              // aoMap={aoMap}
              currentColor={currentColor}
              currentTexture={currentTexture}
            />
          </mesh>
          <mesh receiveShadow>
            <WallsAndMoulding />
          </mesh>
        </Stage>
      </group>
      <Sky
        distance={4000000}
        sunPosition={[1.5, 2, -10]}
        // inclination={1}
        // azimuth={0.85}
      />
    </>
  );
}
