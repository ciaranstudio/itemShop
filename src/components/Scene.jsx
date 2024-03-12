import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
// import { CameraHelper } from "three";
// import { DirectionalLightHelper } from "three";
import { useFrame } from "@react-three/fiber";

import {
  OrbitControls,
  // useHelper,
  useTexture,
  useProgress,
  Sky,
  Stage,
} from "@react-three/drei";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useCursor } from "@react-three/drei";
import { Perf, setCustomData } from "r3f-perf";

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
import { Walls } from "./room/Walls.jsx";

// import { ShelfPositions } from "./room/ShelfPositions.jsx";

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
  previousItemSelected,
  setPreviousItemSelected,
  previousItemSizeSelectIndex,
  setPreviousItemSizeSelectIndex,
  currentItemSizeSelectIndex,
  setCurrentItemSizeSelectIndex,
  // currentTexture,
  // currentColor,
  currentTextureGramps,
  currentColorGramps,
  currentTextureSquatter,
  currentColorSquatter,
  currentTextureBlock,
  currentColorBlock,
  currentTextureHorse,
  currentColorHorse,
  currentTextureShelfA,
  currentColorShelfA,
  currentTextureShelfB,
  currentColorShelfB,
  sizeChangeToggle,
}) {
  // const [
  //   colorMap,
  //   // displacementMap,
  //   normalMap,
  //   roughnessMap,
  //   metalnessMap,
  //   // aoMap,
  // ] = useTexture(currentTexture);

  const [
    colorMapGramps,
    // displacementMap,
    normalMapGramps,
    roughnessMapGramps,
    metalnessMapGramps,
    // aoMap,
  ] = useTexture(currentTextureGramps);

  const [
    colorMapSquatter,
    // displacementMap,
    normalMapSquatter,
    roughnessMapSquatter,
    metalnessMapSquatter,
    // aoMap,
  ] = useTexture(currentTextureSquatter);

  const [
    colorMapBlock,
    // displacementMap,
    normalMapBlock,
    roughnessMapBlock,
    metalnessMapBlock,
    // aoMap,
  ] = useTexture(currentTextureBlock);

  const [
    colorMapHorse,
    // displacementMap,
    normalMapHorse,
    roughnessMapHorse,
    metalnessMapHorse,
    // aoMap,
  ] = useTexture(currentTextureHorse);

  const [
    colorMapShelfA,
    // displacementMap,
    normalMapShelfA,
    roughnessMapShelfA,
    metalnessMapShelfA,
    // aoMap,
  ] = useTexture(currentTextureShelfA);

  const [
    colorMapShelfB,
    // displacementMap,
    normalMapShelfB,
    roughnessMapShelfB,
    metalnessMapShelfB,
    // aoMap,
  ] = useTexture(currentTextureShelfB);

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

  // useHelper(dirLightA, DirectionalLightHelper, 1, "red");
  // useHelper(dirLightB, DirectionalLightHelper, 1, "blue");
  // useHelper(dirLightC, DirectionalLightHelper, 1, "green");
  // useHelper(dirLightD, DirectionalLightHelper, 1, "purple");

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
          onComplete: () => {
            // setInitialLoad(true);
          },
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
  const [showBackground, setShowBackground] = useState(true);
  const [controlsDragging, setControlsDragging] = useState(false);
  // const [cameraPosition, setCameraPosition] = useState(null);

  const [hovered, hover] = useState(false);
  useCursor(hovered);

  // const handleItemChange = (event) => {
  //   console.log("selected value: ", event.target.value);
  //   let tempNo = event.target.value;
  //   setItemNo(tempNo);
  //   let itemMatch = (element) => element.itemNo === tempNo;
  //   if (itemMatch) {
  //     let itemMatchIndex = shopItems.findIndex(itemMatch);
  //     setPreviousItemSelected(currentItemSelected);
  //     setCurrentItemSelected(shopItems[itemMatchIndex]);
  //   }
  // };

  const handleClick = (e) => {
    // setOpen(true);
    e.stopPropagation();
    const { eventObject } = e;
    // console.log(eventObject.position);
    let tempObjectPosition = eventObject.position;
    let positionMatch = (element) =>
      (element.positionA.x === tempObjectPosition.x &&
        element.positionA.y === tempObjectPosition.y &&
        element.positionA.z === tempObjectPosition.z) ||
      (element.positionB.x === tempObjectPosition.x &&
        element.positionB.y === tempObjectPosition.y &&
        element.positionB.z === tempObjectPosition.z);

    if (positionMatch) {
      // console.log(
      //   "shopItems.find(positionMatch): ",
      //   shopItems.find(positionMatch),
      // );
      let matchedItem = shopItems.find(positionMatch);
      // console.log("matchedItem.positionA: ", matchedItem.positionA);
      if (
        matchedItem.positionA.x === tempObjectPosition.x &&
        matchedItem.positionA.y === tempObjectPosition.y &&
        matchedItem.positionA.z === tempObjectPosition.z
      ) {
        setPreviousItemSizeSelectIndex(currentItemSizeSelectIndex);
        setCurrentItemSizeSelectIndex(0);
        // console.log("matched positionA");
        setPreviousItemSelected(currentItemSelected);
        setCurrentItemSelected(matchedItem);
      } else if (
        matchedItem.positionB.x === tempObjectPosition.x &&
        matchedItem.positionB.y === tempObjectPosition.y &&
        matchedItem.positionB.z === tempObjectPosition.z
      ) {
        setPreviousItemSizeSelectIndex(currentItemSizeSelectIndex);
        setCurrentItemSizeSelectIndex(1);
        // console.log("matched positionB");
        setPreviousItemSelected(currentItemSelected);
        setCurrentItemSelected(matchedItem);
      }
    }
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();

    setOpen(true);
    setShowBackground(!showBackground);

    const { eventObject } = e;
    let tempObjectPosition = eventObject.position;
    let positionMatch = (element) =>
      (element.positionA.x === tempObjectPosition.x &&
        element.positionA.y === tempObjectPosition.y &&
        element.positionA.z === tempObjectPosition.z) ||
      (element.positionB.x === tempObjectPosition.x &&
        element.positionB.y === tempObjectPosition.y &&
        element.positionB.z === tempObjectPosition.z);
    if (positionMatch) {
      // console.log(
      //   "shopItems.find(positionMatch): ",
      //   shopItems.find(positionMatch),
      // );
      let matchedItem = shopItems.find(positionMatch);
      // setPreviousItemSelected(currentItemSelected);
      // setCurrentItemSelected(matchedItem);
    }
  };

  const handleOffClick = (e) => {
    e.stopPropagation();

    // console.log("onPointerMissed click");
    setShowBackground(true);
  };

  const orbitRef = useRef();
  // const shadowCameraRef = useRef();
  // useHelper(shadowCameraRef, CameraHelper, 1, "lightBlue");

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

  useEffect(() => {
    // setInitialLoad(true);
    if (orbitRef.current) {
      // console.log(orbitRef.current.object);
      setTargetVec(currentItemSelected.positionA);

      orbitRef.current.addEventListener(
        "start",
        () => {
          // console.log("start");
          setControlsDragging(true);
          // setOpen(false);
        },
        true,
      );
      // orbitRef.current.addEventListener(
      //   "change",
      //   () => {
      //     console.log("change");
      //     setControlsDragging(true);
      //   },
      //   true,
      // );
      orbitRef.current.addEventListener(
        "end",
        () => {
          console.log("end");
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
        // orbitRef.current.removeEventListener(
        //   "change",
        //   () => console.log("removed event listener, 'change'"),
        //   true,
        // );
        orbitRef.current.removeEventListener(
          "end",
          () => console.log("removed event listener, 'end'"),
          true,
        );
        setControlsDragging(false);
      }
    };
  }, []);

  const controlsTargetVec = new THREE.Vector3();
  const [targetVec, setTargetVec] = useState(new THREE.Vector3());

  useGSAP(() => {
    if (previousItemSizeSelectIndex === 0) {
      controlsTargetVec.set(
        previousItemSelected.positionA.x,
        previousItemSelected.positionA.y,
        previousItemSelected.positionA.z,
      );
    } else if (previousItemSizeSelectIndex === 1) {
      controlsTargetVec.set(
        previousItemSelected.positionB.x,
        previousItemSelected.positionB.y,
        previousItemSelected.positionB.z,
      );
    }
    if (currentItemSelected.name !== "noSelect") {
      if (currentItemSizeSelectIndex === 0) {
        let tl = gsap.timeline();
        tl.to(controlsTargetVec, {
          duration: 1,
          // x: 10,
          x: currentItemSelected.positionA.x,
          y: currentItemSelected.positionA.y,
          z: currentItemSelected.positionA.z,
          ease: "easeIn",
          // onStart: () => {
          //   console.log("targetVec: ", targetVec);
          // },
          onUpdate: () => {
            // console.log("updating controlsTargetVec: ", controlsTargetVec);
            orbitRef.current.object.updateProjectionMatrix();
            orbitRef.current.update();
            setTargetVec(controlsTargetVec);
            orbitRef.current.target.set(
              controlsTargetVec.x,
              controlsTargetVec.y,
              controlsTargetVec.z,
            );
            orbitRef.current.object.updateProjectionMatrix();
            orbitRef.current.update();
          },
        });
      } else if (
        currentItemSizeSelectIndex === 1 &&
        currentItemSelected.sizes.length > 1
      ) {
        let tl = gsap.timeline();
        tl.to(controlsTargetVec, {
          duration: 1,
          // x: 10,
          x: currentItemSelected.positionB.x,
          y: currentItemSelected.positionB.y,
          z: currentItemSelected.positionB.z,
          ease: "easeIn",
          // onStart: () => {
          //   console.log("targetVec: ", targetVec);
          // },
          onUpdate: () => {
            // console.log("updating controlsTargetVec: ", controlsTargetVec);
            orbitRef.current.object.updateProjectionMatrix();
            orbitRef.current.update();
            setTargetVec(controlsTargetVec);
            orbitRef.current.target.set(
              controlsTargetVec.x,
              controlsTargetVec.y,
              controlsTargetVec.z,
            );
            orbitRef.current.object.updateProjectionMatrix();
            orbitRef.current.update();
          },
        });
      }
    }
  }, [currentItemSelected, sizeChangeToggle]);

  // useEffect(() => {
  //   if (orbitRef.current) {
  //     vec.set(
  //       currentItemSelected.positionA.x,
  //       currentItemSelected.positionA.y,
  //       currentItemSelected.positionA.z,
  //     );
  //     console.log("vec: ", vec);
  //     orbitRef.current.target.copy(vec);
  //     console.log(orbitRef.current.target);
  //     // orbitRef.current.object.updateProjectionMatrix();
  //     // orbitRef.current.update();
  //   }
  // }, [currentItemSelected]);

  const controlsPositionVec = new THREE.Vector3();

  useFrame(() => {
    if (
      !controlsDragging &&
      orbitRef.current &&
      currentItemSelected.itemName !== "noSelect" &&
      !showBackground
    ) {
      // if (cameraPosition == null) {
      // orbitRef.current.object.position.lerp(
      //   controlsPositionVec.set(0, 45, 0),
      //   0.01,
      // );
      if (currentItemSizeSelectIndex === 0) {
        orbitRef.current.object.position.lerp(
          controlsPositionVec.set(
            currentItemSelected.positionA.x * 4, // * 6
            currentItemSelected.positionA.y + 7 * 4, // * 6
            currentItemSelected.positionA.z * 4, // * 6
          ),
          0.03,
        );
      } else if (currentItemSizeSelectIndex === 1) {
        orbitRef.current.object.position.lerp(
          controlsPositionVec.set(
            currentItemSelected.positionB.x * 4, // * 6
            currentItemSelected.positionB.y + 7 * 4, // * 6
            currentItemSelected.positionB.z * 4, // * 6
          ),
          0.03,
        );
      }

      orbitRef.current.object.updateProjectionMatrix();
      orbitRef.current.update();
    }
    // else if (!showBackground) {
    //   orbitRef.current.object.position.lerp(
    //     currentItemSelected.position.x * 4, // * 6
    //     currentItemSelected.position.y + 7 * 4, // * 6
    //     currentItemSelected.position.z * 4, // * 6
    //     0.01,
    //   );
    // }
    // return null;
  });

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
        enablePan={true}
        maxDistance={600}
        minDistance={20}
        maxPolarAngle={Math.PI / 2 - Math.PI / 16}
        enableDamping={true}
        // target={[
        //   currentItemSizeSelectIndex === 0
        //     ? currentItemSelected.positionA.x
        //     : currentItemSelected.positionB.x,
        //   currentItemSizeSelectIndex === 0
        //     ? currentItemSelected.positionA.y
        //     : currentItemSelected.positionB.y,
        //   currentItemSizeSelectIndex === 0
        //     ? currentItemSelected.positionA.z
        //     : currentItemSelected.positionB.z,
        // ]}
      />
      <Sky distance={4000000} sunPosition={[1.5, 2, -10]} />
      <group position={[0, stagePositionY, 0]}>
        <Stage
          shadows={{ type: "contact", opacity: 0.5, blur: 2 }}
          environment="night"
          preset="soft"
          adjustCamera={false}
          intensity={1}
          controls={orbitRef}
          center={true}
        >
          <ambientLight intensity={0.15} />
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
          />
          <pointLight position={[0, 14, 70]} intensity={30} />
          {/* blockLight */}
          <directionalLight
            ref={dirLightB}
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
            target={blockRef.current}
          />
          {/* horseLight */}
          <directionalLight
            ref={dirLightC}
            castShadow
            position={[0, 60, 0]}
            intensity={2}
            shadow-normalBias={0.1}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={50}
            shadow-camera-far={130}
            shadow-camera-left={-20}
            shadow-camera-bottom={-20}
            shadow-camera-right={20}
            shadow-camera-top={150}
            target={horseRef.current}
          />
          {/* squatterLight */}
          <directionalLight
            ref={dirLightD}
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
            target={squatterRef.current}
          />
          {/* gramps */}
          <group
            ref={grampsRef}
            position={[
              gramps.positionA.x,
              gramps.positionA.y,
              gramps.positionA.z,
            ]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onPointerMissed={handleOffClick}
          >
            <mesh castShadow>
              <GrampsBarBottom
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapGramps}
                normalMap={normalMapGramps}
                roughnessMap={roughnessMapGramps}
                metalnessMap={metalnessMapGramps}
                currentColor={currentColorGramps}
                currentTexture={currentTextureGramps}
              />
            </mesh>
            <mesh castShadow>
              <GrampsBarTop
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapGramps}
                normalMap={normalMapGramps}
                roughnessMap={roughnessMapGramps}
                metalnessMap={metalnessMapGramps}
                currentColor={currentColorGramps}
                currentTexture={currentTextureGramps}
              />
            </mesh>
            <mesh castShadow>
              <GrampsLeg1
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapGramps}
                normalMap={normalMapGramps}
                roughnessMap={roughnessMapGramps}
                metalnessMap={metalnessMapGramps}
                currentColor={currentColorGramps}
                currentTexture={currentTextureGramps}
              />
            </mesh>
            <mesh castShadow>
              <GrampsLeg2
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapGramps}
                normalMap={normalMapGramps}
                roughnessMap={roughnessMapGramps}
                metalnessMap={metalnessMapGramps}
                currentColor={currentColorGramps}
                currentTexture={currentTextureGramps}
              />
            </mesh>
            <mesh castShadow>
              <GrampsLeg3
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapGramps}
                normalMap={normalMapGramps}
                roughnessMap={roughnessMapGramps}
                metalnessMap={metalnessMapGramps}
                currentColor={currentColorGramps}
                currentTexture={currentTextureGramps}
              />
            </mesh>
            <mesh castShadow>
              <GrampsLeg4
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapGramps}
                normalMap={normalMapGramps}
                roughnessMap={roughnessMapGramps}
                metalnessMap={metalnessMapGramps}
                currentColor={currentColorGramps}
                currentTexture={currentTextureGramps}
              />
            </mesh>
            <mesh castShadow>
              <GrampsTop
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapGramps}
                normalMap={normalMapGramps}
                roughnessMap={roughnessMapGramps}
                metalnessMap={metalnessMapGramps}
                currentColor={currentColorGramps}
                currentTexture={currentTextureGramps}
              />
            </mesh>
          </group>
          {/* block */}
          <group
            ref={blockRef}
            position={[block.positionA.x, block.positionA.y, block.positionA.z]}
            rotation={[0, Math.PI / 4, 0]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onPointerMissed={handleOffClick}
          >
            <mesh castShadow>
              <BlockSide1
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapBlock}
                normalMap={normalMapBlock}
                roughnessMap={roughnessMapBlock}
                metalnessMap={metalnessMapBlock}
                currentColor={currentColorBlock}
                currentTexture={currentTextureBlock}
              />
            </mesh>
            <mesh castShadow>
              <BlockShelves
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapBlock}
                normalMap={normalMapBlock}
                roughnessMap={roughnessMapBlock}
                metalnessMap={metalnessMapBlock}
                currentColor={currentColorBlock}
                currentTexture={currentTextureBlock}
              />
            </mesh>
            <mesh castShadow>
              <BlockSide2
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapBlock}
                normalMap={normalMapBlock}
                roughnessMap={roughnessMapBlock}
                metalnessMap={metalnessMapBlock}
                currentColor={currentColorBlock}
                currentTexture={currentTextureBlock}
              />
            </mesh>
          </group>
          {/* horse */}
          <group
            ref={horseRef}
            position={[horse.positionA.x, horse.positionA.y, horse.positionA.z]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onPointerMissed={handleOffClick}
          >
            <mesh castShadow>
              <HorseBarInner
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapHorse}
                normalMap={normalMapHorse}
                roughnessMap={roughnessMapHorse}
                metalnessMap={metalnessMapHorse}
                currentColor={currentColorHorse}
                currentTexture={currentTextureHorse}
              />
            </mesh>
            <mesh castShadow>
              <HorseBarTop
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapHorse}
                normalMap={normalMapHorse}
                roughnessMap={roughnessMapHorse}
                metalnessMap={metalnessMapHorse}
                currentColor={currentColorHorse}
                currentTexture={currentTextureHorse}
              />
            </mesh>
            <mesh castShadow>
              <HorseLeg1
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapHorse}
                normalMap={normalMapHorse}
                roughnessMap={roughnessMapHorse}
                metalnessMap={metalnessMapHorse}
                currentColor={currentColorHorse}
                currentTexture={currentTextureHorse}
              />
            </mesh>
            <mesh castShadow>
              <HorseLeg2
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapHorse}
                normalMap={normalMapHorse}
                roughnessMap={roughnessMapHorse}
                metalnessMap={metalnessMapHorse}
                currentColor={currentColorHorse}
                currentTexture={currentTextureHorse}
              />
            </mesh>
            <mesh castShadow>
              <HorseLeg3
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapHorse}
                normalMap={normalMapHorse}
                roughnessMap={roughnessMapHorse}
                metalnessMap={metalnessMapHorse}
                currentColor={currentColorHorse}
                currentTexture={currentTextureHorse}
              />
            </mesh>
            <mesh castShadow>
              <HorseLeg4
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapHorse}
                normalMap={normalMapHorse}
                roughnessMap={roughnessMapHorse}
                metalnessMap={metalnessMapHorse}
                currentColor={currentColorHorse}
                currentTexture={currentTextureHorse}
              />
            </mesh>
          </group>
          {/* squatter */}
          <group
            ref={squatterRef}
            position={[
              squatter.positionA.x,
              squatter.positionA.y,
              squatter.positionA.z,
            ]}
            rotation={[0, Math.PI / 4, 0]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onPointerMissed={handleOffClick}
          >
            <mesh castShadow>
              <SquatterCenterPanel
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapSquatter}
                normalMap={normalMapSquatter}
                roughnessMap={roughnessMapSquatter}
                metalnessMap={metalnessMapSquatter}
                currentColor={currentColorSquatter}
                currentTexture={currentTextureSquatter}
              />
            </mesh>
            <mesh castShadow>
              <SquatterSide1
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapSquatter}
                normalMap={normalMapSquatter}
                roughnessMap={roughnessMapSquatter}
                metalnessMap={metalnessMapSquatter}
                currentColor={currentColorSquatter}
                currentTexture={currentTextureSquatter}
              />
            </mesh>
            <mesh castShadow>
              <SquatterSide2
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapSquatter}
                normalMap={normalMapSquatter}
                roughnessMap={roughnessMapSquatter}
                metalnessMap={metalnessMapSquatter}
                currentColor={currentColorSquatter}
                currentTexture={currentTextureSquatter}
              />
            </mesh>
            <mesh castShadow>
              <SquatterTop
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapSquatter}
                normalMap={normalMapSquatter}
                roughnessMap={roughnessMapSquatter}
                metalnessMap={metalnessMapSquatter}
                currentColor={currentColorSquatter}
                currentTexture={currentTextureSquatter}
              />
            </mesh>
          </group>
          {/* shelfAShort */}
          <group
            ref={shelfAShortRef}
            position={[
              shelfA.positionA.x,
              shelfA.positionA.y,
              shelfA.positionA.z,
            ]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onPointerMissed={handleOffClick}
          >
            <mesh castShadow>
              <ShelfAShortCleat
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapShelfA}
                normalMap={normalMapShelfA}
                roughnessMap={roughnessMapShelfA}
                metalnessMap={metalnessMapShelfA}
                currentColor={currentColorShelfA}
                currentTexture={currentTextureShelfA}
              />
            </mesh>
            <mesh castShadow>
              <ShelfAShortShelf
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapShelfA}
                normalMap={normalMapShelfA}
                roughnessMap={roughnessMapShelfA}
                metalnessMap={metalnessMapShelfA}
                currentColor={currentColorShelfA}
                currentTexture={currentTextureShelfA}
              />
            </mesh>
          </group>
          {/* shelfALong */}
          <group
            ref={shelfALongRef}
            position={[
              shelfA.positionB.x,
              shelfA.positionB.y,
              shelfA.positionB.z,
            ]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onPointerMissed={handleOffClick}
          >
            <mesh castShadow>
              <ShelfALongCleat
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapShelfA}
                normalMap={normalMapShelfA}
                roughnessMap={roughnessMapShelfA}
                metalnessMap={metalnessMapShelfA}
                currentColor={currentColorShelfA}
                currentTexture={currentTextureShelfA}
              />
            </mesh>
            <mesh castShadow>
              <ShelfALongShelf
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapShelfA}
                normalMap={normalMapShelfA}
                roughnessMap={roughnessMapShelfA}
                metalnessMap={metalnessMapShelfA}
                currentColor={currentColorShelfA}
                currentTexture={currentTextureShelfA}
              />
            </mesh>
          </group>
          {/* shelfBShort */}
          <group
            ref={shelfBShortRef}
            position={[
              shelfB.positionA.x,
              shelfB.positionA.y,
              shelfB.positionA.z,
            ]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onPointerMissed={handleOffClick}
          >
            <mesh castShadow>
              <ShelfBShortCleat
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapShelfB}
                normalMap={normalMapShelfB}
                roughnessMap={roughnessMapShelfB}
                metalnessMap={metalnessMapShelfB}
                currentColor={currentColorShelfB}
                currentTexture={currentTextureShelfB}
              />
            </mesh>
            <mesh castShadow>
              <ShelfBShortShelf
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapShelfB}
                normalMap={normalMapShelfB}
                roughnessMap={roughnessMapShelfB}
                metalnessMap={metalnessMapShelfB}
                currentColor={currentColorShelfB}
                currentTexture={currentTextureShelfB}
              />
            </mesh>
          </group>
          {/* shelfBLong */}
          <group
            ref={shelfBLongRef}
            position={[
              shelfB.positionB.x,
              shelfB.positionB.y,
              shelfB.positionB.z,
            ]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onPointerMissed={handleOffClick}
          >
            <mesh castShadow>
              <ShelfBLongCleat
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapShelfB}
                normalMap={normalMapShelfB}
                roughnessMap={roughnessMapShelfB}
                metalnessMap={metalnessMapShelfB}
                currentColor={currentColorShelfB}
                currentTexture={currentTextureShelfB}
              />
            </mesh>
            <mesh castShadow>
              <ShelfBLongShelf
                // displacementMap={displacementMap}
                // aoMap={aoMap}
                map={colorMapShelfB}
                normalMap={normalMapShelfB}
                roughnessMap={roughnessMapShelfB}
                metalnessMap={metalnessMapShelfB}
                currentColor={currentColorShelfB}
                currentTexture={currentTextureShelfB}
              />
            </mesh>
          </group>
          {/* floor */}
          <mesh receiveShadow visible={showBackground}>
            <Floor
            // map={colorMap}
            // // displacementMap={displacementMap}
            // normalMap={normalMap}
            // roughnessMap={roughnessMap}
            // metalnessMap={metalnessMap}
            // // aoMap={aoMap}
            // currentColor={currentColor}
            // currentTexture={currentTexture}
            />
          </mesh>
          {/* wallsAndMoulding */}
          <mesh receiveShadow visible={showBackground}>
            <Walls />
          </mesh>
          {/* shelfPositions */}
          {/* <mesh receiveShadow>
            <ShelfPositions />
          </mesh> */}
        </Stage>
      </group>
    </>
  );
}
