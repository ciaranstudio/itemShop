import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { CameraHelper } from "three";
import { DirectionalLightHelper } from "three";
import { useFrame } from "@react-three/fiber";

import {
  OrbitControls,
  useHelper,
  useTexture,
  useProgress,
  Sky,
  Stage,
} from "@react-three/drei";

import gsap from "gsap";
import { Perf } from "r3f-perf";

import { BlockShelves } from "./block/BlockShelves.jsx";
import { BlockSide1 } from "./block/BlockSide1.jsx";
import { BlockSide2 } from "./block/BlockSide2.jsx";

import { GrampsBarBottom } from "./gramps/GrampsBarBottom.jsx";
import { GrampsBarTop } from "./gramps/GrampsBarTop.jsx";
import { GrampsLeg1 } from "./gramps/GrampsLeg1.jsx";
import { GrampsLeg2 } from "./gramps/GrampsLeg2.jsx";
import { GrampsLeg3 } from "./gramps/GrampsLeg3.jsx";
import { GrampsLeg4 } from "./gramps/GrampsLeg4.jsx";
import { GrampsTop } from "./gramps/GrampsTop.jsx";

import { HorseBarInner } from "./horse/HorseBarInner.jsx";
import { HorseBarTop } from "./horse/HorseBarTop.jsx";
import { HorseLeg1 } from "./horse/HorseLeg1.jsx";
import { HorseLeg2 } from "./horse/HorseLeg2.jsx";
import { HorseLeg3 } from "./horse/HorseLeg3.jsx";
import { HorseLeg4 } from "./horse/HorseLeg4.jsx";

import { SquatterCenterPanel } from "./squatter/SquatterCenterPanel.jsx";
import { SquatterSide1 } from "./squatter/SquatterSide1.jsx";
import { SquatterSide2 } from "./squatter/SquatterSide2.jsx";
import { SquatterTop } from "./squatter/SquatterTop.jsx";

import { ShelfAShortCleat } from "./shelfAShort/ShelfAShortCleat.jsx";
import { ShelfAShortShelf } from "./shelfAShort/ShelfAShortShelf.jsx";

import { ShelfALongCleat } from "./shelfALong/ShelfALongCleat.jsx";
import { ShelfALongShelf } from "./shelfALong/ShelfALongShelf.jsx";

import { ShelfBShortCleat } from "./shelfBShort/ShelfBShortCleat.jsx";
import { ShelfBShortShelf } from "./shelfBShort/ShelfBShortShelf.jsx";

import { ShelfBLongCleat } from "./shelfBLong/ShelfBLongCleat.jsx";
import { ShelfBLongShelf } from "./shelfBLong/ShelfBLongShelf.jsx";

import { Floor } from "./room/Floor.jsx";
import { WallsAndMoulding } from "./room/WallsAndMoulding.jsx";

import controls from "../helpers/debugControls";

export default function Scene({
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

  const [gramps, squatter, block, horse, shelfA, shelfB] = shopItems;

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
          setCameraPosition(orbitRef.current.object.position);
          setControlsDragging(false);
          // setOpen(true);
        },
        true,
      );
    }
    // // get shelf posiitions
    // if (shelfAShortRef.current) {
    //   console.log(shelfAShortRef.current);
    // }
    // if (shelfALongRef.current) {
    //   console.log(shelfALongRef.current);
    // }
    // if (shelfBShortRef.current) {
    //   console.log(shelfBShortRef.current);
    // }
    // if (shelfBLongRef.current) {
    //   console.log(shelfBLongRef.current);
    // }
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

  // useFrame(() => {
  //   if (initialLoad && !controlsDragging && orbitRef.current) {
  //     if (cameraPosition == null) {
  //       orbitRef.current.object.position.lerp(vec.set(-35, 40, 60), 0.01);
  //       orbitRef.current.object.updateProjectionMatrix();
  //       orbitRef.current.update();
  //     } else {
  //       orbitRef.current.object.position.lerp(
  //         vec.set(
  //           currentItemSelected.position.x * 4, // * 6
  //           currentItemSelected.position.y + 7 * 4, // * 6
  //           currentItemSelected.position.z * 4, // * 6
  //         ),
  //         0.03,
  //       );
  //       orbitRef.current.object.updateProjectionMatrix();
  //       orbitRef.current.update();
  //     }
  //     return null;
  //   }
  // });

  const stagePositionY = 60;

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
        target={[
          currentItemSelected.position.x,
          currentItemSelected.position.y,
          currentItemSelected.position.z,
        ]}
      />
      <Sky
        distance={4000000}
        sunPosition={[1.5, 2, -10]}
        // inclination={1}
        // azimuth={0.85}
      />
      <group position={[0, stagePositionY, 0]}>
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
          {/* grampsLight */}
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
          {/* blockLight */}
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
          {/* horseLight */}
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
          {/* squatterLight */}
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
          {/* gramps */}
          <group
            ref={grampsRef}
            position={[gramps.position.x, gramps.position.y, gramps.position.z]}
          >
            <mesh castShadow>
              <GrampsBarBottom
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
            <mesh castShadow>
              <GrampsBarTop
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
            <mesh castShadow>
              <GrampsLeg1
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
            <mesh castShadow>
              <GrampsLeg2
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
            <mesh castShadow>
              <GrampsLeg3
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
            <mesh castShadow>
              <GrampsLeg4
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
            <mesh castShadow>
              <GrampsTop
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
          </group>
          {/* block */}
          <group
            ref={blockRef}
            position={[block.position.x, block.position.y, block.position.z]}
            rotation={[0, Math.PI / 4, 0]}
          >
            <mesh castShadow>
              <BlockSide1
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
            <mesh castShadow>
              <BlockShelves
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
            <mesh castShadow>
              <BlockSide2
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
          </group>
          {/* horse */}
          <group
            ref={horseRef}
            position={[horse.position.x, horse.position.y, horse.position.z]}
          >
            <mesh castShadow>
              <HorseBarInner
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
            <mesh castShadow>
              <HorseBarTop
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
            <mesh castShadow>
              <HorseLeg1
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
            <mesh castShadow>
              <HorseLeg2
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
            <mesh castShadow>
              <HorseLeg3
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
            <mesh castShadow>
              <HorseLeg4
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
          </group>
          {/* squatter */}
          <group
            ref={squatterRef}
            position={[
              squatter.position.x,
              squatter.position.y,
              squatter.position.z,
            ]}
            rotation={[0, Math.PI / 4, 0]}
          >
            <mesh castShadow>
              <SquatterCenterPanel
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
            <mesh castShadow>
              <SquatterSide1
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
            <mesh castShadow>
              <SquatterSide2
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
            <mesh castShadow>
              <SquatterTop
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
          </group>
          {/* shelfAShort */}
          <group
            ref={shelfAShortRef}
            position={[shelfA.position.x, shelfA.position.y, shelfA.position.z]}
          >
            <mesh castShadow>
              <ShelfAShortCleat
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
            <mesh castShadow>
              <ShelfAShortShelf
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
          </group>
          {/* shelfALong */}
          <group
            ref={shelfALongRef}
            position={[shelfB.position.x, shelfB.position.y, shelfB.position.z]}
          >
            <mesh castShadow>
              <ShelfALongCleat
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
            <mesh castShadow>
              <ShelfALongShelf
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
          </group>
          {/* shelfBShort */}
          <group ref={shelfBShortRef}>
            <mesh castShadow>
              <ShelfBShortCleat
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
            <mesh castShadow>
              <ShelfBShortShelf
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
          </group>
          {/* shelfBLong */}
          <group ref={shelfBLongRef}>
            <mesh castShadow>
              <ShelfBLongCleat
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
            <mesh castShadow>
              <ShelfBLongShelf
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
          </group>
          {/* floor */}
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
          {/* wallsAndMoulding */}
          <mesh receiveShadow>
            <WallsAndMoulding />
          </mesh>
        </Stage>
      </group>
    </>
  );
}
