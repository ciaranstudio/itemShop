import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
// import { CameraHelper } from "three";
import { DirectionalLightHelper } from "three";
import { useFrame } from "@react-three/fiber";

import {
  OrbitControls,
  useHelper,
  useTexture,
  useProgress,
  Sky,
  // SoftShadows,
} from "@react-three/drei";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useCursor, Html } from "@react-three/drei";
import { Perf } from "r3f-perf";

import { Floor } from "./room/Floor.jsx";
import { Walls } from "./room/Walls.jsx";
// import { ShelfPositions } from "./room/ShelfPositions.jsx";

import controls from "../helpers/debugControls";
import { textures } from "../data/textures.jsx";
// import { options } from "../data/options.jsx";
import { objects } from "../data/objects.jsx";
import { shopItems } from "../data/objects.jsx";

import { ItemPart } from "./ItemPart.jsx";
import { Icon } from "./icons/Icon.jsx";
import { Annotation } from "./Annotation.jsx";

// import { useOptionStore } from "../store/useOptionStore.tsx";

export default function Scene({
  currentItemSelected,
  setCurrentItemSelected,
  previousItemSelected,
  setPreviousItemSelected,
}) {
  const [targetVec, setTargetVec] = useState(new THREE.Vector3());

  const [
    colorMapWhiteStain,
    // displacementMap,
    normalMapWhiteStain,
    roughnessWhiteMapStain,
    metalnessWhiteMapStain,
    // aoMap,
  ] = useTexture(textures.whiteTexture);

  const [
    colorMapNaturalStain,
    // displacementMap,
    normalMapNaturalStain,
    roughnessNaturalMapStain,
    metalnessNaturalMapStain,
    // aoMap,
  ] = useTexture(textures.naturalTexture);

  const [
    colorMapBlackStain,
    // displacementMap,
    normalMapBlackStain,
    roughnessBlackMapStain,
    metalnessBlackMapStain,
    // aoMap,
  ] = useTexture(textures.blackTexture);

  const [
    colorMapAllBlackStain,
    // displacementMap,
    normalMapAllBlackStain,
    roughnessAllBlackMapStain,
    metalnessAllBlackMapStain,
    // aoMap,
  ] = useTexture(textures.allBlackTexture);

  const [
    colorMapPainted,
    // displacementMapPainted,
    normalMapPainted,
    roughnessMapPainted,
    metalnessMapPainted,
    // aoMapPainted,
  ] = useTexture(textures.paintedTexture);

  const dirLightA = useRef();

  const grampsRef = useRef();
  const squatterRef = useRef();
  const horseRef = useRef();
  const blockRef = useRef();
  const shelfA16Ref = useRef();
  const shelfA32Ref = useRef();
  const shelfB16Ref = useRef();
  const shelfB32Ref = useRef();

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
  const [showPartOptions, setShowPartOptions] = useState(false);
  const [controlsDragging, setControlsDragging] = useState(false);
  // const [cameraPosition, setCameraPosition] = useState(null);

  const [hovered, hover] = useState(false);
  useCursor(hovered);

  const handleClick = (e) => {
    e.stopPropagation();
    const { eventObject } = e;
    // console.log(eventObject.position);
    let tempObjectPosition = eventObject.position;
    let positionMatch = (element) =>
      element.position.x === tempObjectPosition.x &&
      element.position.y === tempObjectPosition.y &&
      element.position.z === tempObjectPosition.z;

    if (positionMatch) {
      // console.log(
      //   "shopItems.find(positionMatch): ",
      //   shopItems.find(positionMatch),
      // );
      let matchedItem = shopItems.find(positionMatch);
      setPreviousItemSelected(currentItemSelected);
      setCurrentItemSelected(matchedItem);
    }
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setShowBackground(!showBackground);
  };

  const handleOffClick = (e) => {
    e.stopPropagation();
    // setShowPartOptions(false);
    // console.log("onPointerMissed click");
    // setShowBackground(true);
  };

  const orbitRef = useRef();
  // const shadowCameraRef = useRef();
  // useHelper(shadowCameraRef, CameraHelper, 1, "lightBlue");

  useEffect(() => {
    // setInitialLoad(true);
    if (orbitRef.current) {
      // console.log(orbitRef.current.object);
      setTargetVec(currentItemSelected.position);

      orbitRef.current.addEventListener(
        "start",
        () => {
          // console.log("start");
          setControlsDragging(true);
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
          // console.log("end");
          // setCameraPosition(orbitRef.current.object.position);
          setControlsDragging(false);
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
  // const controlsPositionVec = new THREE.Vector3();

  useGSAP(() => {
    controlsTargetVec.set(
      previousItemSelected.position.x,
      previousItemSelected.position.y,
      previousItemSelected.position.z,
    );

    if (currentItemSelected.name !== "noSelect") {
      let tl = gsap.timeline();
      tl.to(controlsTargetVec, {
        delay: 0.15,
        duration: 1.5,
        // x: 10,
        x: currentItemSelected.position.x,
        y: currentItemSelected.position.y,
        z: currentItemSelected.position.z,
        ease: "easeIn",
        // onStart: () => {
        //   console.log("targetVec: ", targetVec);
        // },
        onUpdate: () => {
          // console.log("updating controlsTargetVec: ", controlsTargetVec);
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
  }, [currentItemSelected]);

  // useFrame(() => {
  //   if (
  //     !controlsDragging &&
  //     orbitRef.current &&
  //     currentItemSelected.itemName !== "noSelect" &&
  //     !showBackground
  //   ) {
  //     // if (cameraPosition == null) {
  //     // orbitRef.current.object.position.lerp(
  //     //   controlsPositionVec.set(0, 45, 0),
  //     //   0.01,
  //     // );
  //     if (currentItemSizeSelectIndex === 0) {
  //       orbitRef.current.object.position.lerp(
  //         controlsPositionVec.set(
  //           currentItemSelected.positionA.x * 4, // * 6
  //           currentItemSelected.positionA.y + 7 * 4, // * 6
  //           currentItemSelected.positionA.z * 4, // * 6
  //         ),
  //         0.03,
  //       );
  //     } else if (currentItemSizeSelectIndex === 1) {
  //       orbitRef.current.object.position.lerp(
  //         controlsPositionVec.set(
  //           currentItemSelected.positionB.x * 4, // * 6
  //           currentItemSelected.positionB.y + 7 * 4, // * 6
  //           currentItemSelected.positionB.z * 4, // * 6
  //         ),
  //         0.03,
  //       );
  //     }

  //     orbitRef.current.object.updateProjectionMatrix();
  //     orbitRef.current.update();
  //   }
  // else if (!showBackground) {
  //   orbitRef.current.object.position.lerp(
  //     currentItemSelected.position.x * 4, // * 6
  //     currentItemSelected.position.y + 7 * 4, // * 6
  //     currentItemSelected.position.z * 4, // * 6
  //     0.01,
  //   );
  // }
  // return null;
  // });

  const stagePositionY = 0;

  const animDist = 0.095; // 0.1

  const dirLightXPosition = 2.5;
  const dirLightYPosition = 3.6;
  const dirLightZPosition = -3;

  const dirLightIntensity = 1.5;
  const dirLightNormBias = 0.04;
  const dirLightMapSize = 512;
  const dirLightCamNear = -5;
  const dirLightCamFar = 8;
  const dirLightCamLeft = -5;
  const dirLightCamRight = 5;
  const dirLightCamBottom = -5;
  const dirLightCamTop = 5;

  const ambLightIntensity = 1.5;

  const [currentPartName, setCurrentPartName] = useState("top");
  const [currentItemName, setCurrentItemName] = useState("gramps");

  const animatedPosition = (animation, animDist) => {
    let x = 0;
    let y = 0;
    let z = 0;
    switch (animation) {
      case "negX":
        x = -animDist;
        break;
      case "posX":
        x = animDist;
        break;
      case "negZ":
        z = -animDist;
        break;
      case "posZ":
        z = animDist;
        break;
      case "posY1":
        y = animDist;
        break;
      case "posY2":
        y = animDist + animDist / 2;
        break;
      case "none":
        break;
    }
    let position = [x, y, z];
    return position;
  };

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
        maxDistance={15}
        minDistance={0.2} // 60
        // maxPolarAngle={Math.PI / 2 - Math.PI / 16}
        enableDamping={true}
      />
      <Sky distance={4000000} sunPosition={[1.5, 2, -10]} />

      {/* grampsLight */}
      <directionalLight
        castShadow
        ref={dirLightA}
        position={[dirLightXPosition, dirLightYPosition, dirLightZPosition]} // {[0, 60, 0]}
        intensity={dirLightIntensity}
        shadow-normalBias={dirLightNormBias}
        shadow-mapSize-width={dirLightMapSize} // 5120
        shadow-mapSize-height={dirLightMapSize}
        shadow-camera-near={dirLightCamNear} // 50
        shadow-camera-far={dirLightCamFar} // 115
        shadow-camera-left={dirLightCamLeft} // -10
        shadow-camera-bottom={dirLightCamBottom} // -10
        shadow-camera-right={dirLightCamRight} // 10
        shadow-camera-top={dirLightCamTop} // 150
        target={grampsRef.current}
      />

      <group position={[0, stagePositionY, 0]}>
        <ambientLight intensity={ambLightIntensity} />

        {/* gramps */}
        <group
          ref={grampsRef}
          position={[
            objects.gramps.position.x,
            objects.gramps.position.y,
            objects.gramps.position.z,
          ]}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
        >
          {objects.gramps.parts.map((part, index) => {
            return (
              <group key={part.partName}>
                <mesh
                  position={animatedPosition(part.animation, animDist)}
                  onClick={() => {
                    console.log(part.itemName, part.partName, " clicked");
                    setCurrentItemName(part.itemName);
                    setCurrentPartName(part.partName);
                    setShowPartOptions(true);
                  }}
                >
                  <ItemPart
                    model={part.model}
                    itemName={part.itemName}
                    partName={part.partName}
                  />
                </mesh>
                <Annotation
                  model={part.model}
                  itemName={part.itemName}
                  partName={part.partName}
                  descPartName={part.descPartName}
                  animation={part.animation}
                  animDist={animDist}
                  currentItemName={currentItemName}
                  currentPartName={currentPartName}
                  showBackground={showBackground}
                  showPartOptions={showPartOptions}
                />
              </group>
            );
          })}
        </group>

        {/* block */}
        <group
          ref={blockRef}
          position={[
            objects.block.position.x,
            objects.block.position.y,
            objects.block.position.z,
          ]}
          rotation={[0, Math.PI / 4, 0]}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
        >
          {objects.block.parts.map((part) => {
            return (
              <group key={part.partName}>
                <mesh
                  position={animatedPosition(part.animation, animDist)}
                  onClick={() => {
                    console.log(part.itemName, part.partName, " clicked");
                    setCurrentItemName(part.itemName);
                    setCurrentPartName(part.partName);
                    setShowPartOptions(true);
                  }}
                >
                  <ItemPart
                    model={part.model}
                    itemName={part.itemName}
                    partName={part.partName}
                  />
                </mesh>
                <Annotation
                  model={part.model}
                  itemName={part.itemName}
                  partName={part.partName}
                  descPartName={part.descPartName}
                  animation={part.animation}
                  animDist={animDist}
                  currentItemName={currentItemName}
                  currentPartName={currentPartName}
                  showBackground={showBackground}
                  showPartOptions={showPartOptions}
                />
              </group>
            );
          })}
        </group>

        {/* horse */}
        <group
          ref={horseRef}
          position={[
            objects.horse.position.x,
            objects.horse.position.y,
            objects.horse.position.z,
          ]}
          // rotation={[0, Math.PI / 4, 0]}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
        >
          {objects.horse.parts.map((part) => {
            return (
              <group key={part.partName}>
                <mesh
                  position={animatedPosition(part.animation, animDist)}
                  onClick={() => {
                    console.log(part.itemName, part.partName, " clicked");
                    setCurrentItemName(part.itemName);
                    setCurrentPartName(part.partName);
                    setShowPartOptions(true);
                  }}
                >
                  <ItemPart
                    model={part.model}
                    itemName={part.itemName}
                    partName={part.partName}
                  />
                </mesh>
                <Annotation
                  model={part.model}
                  itemName={part.itemName}
                  partName={part.partName}
                  descPartName={part.descPartName}
                  animation={part.animation}
                  animDist={animDist}
                  currentItemName={currentItemName}
                  currentPartName={currentPartName}
                  showBackground={showBackground}
                  showPartOptions={showPartOptions}
                />
              </group>
            );
          })}
        </group>

        {/* squatter */}
        <group
          ref={squatterRef}
          position={[
            objects.squatter.position.x,
            objects.squatter.position.y,
            objects.squatter.position.z,
          ]}
          rotation={[0, Math.PI / 4, 0]}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
        >
          {objects.squatter.parts.map((part) => {
            return (
              <group key={part.partName}>
                <mesh
                  position={animatedPosition(part.animation, animDist)}
                  onClick={() => {
                    console.log(part.itemName, part.partName, " clicked");
                    setCurrentItemName(part.itemName);
                    setCurrentPartName(part.partName);
                    setShowPartOptions(true);
                  }}
                >
                  <ItemPart
                    model={part.model}
                    itemName={part.itemName}
                    partName={part.partName}
                  />
                </mesh>
                <Annotation
                  model={part.model}
                  itemName={part.itemName}
                  partName={part.partName}
                  descPartName={part.descPartName}
                  animation={part.animation}
                  animDist={animDist}
                  currentItemName={currentItemName}
                  currentPartName={currentPartName}
                  showBackground={showBackground}
                  showPartOptions={showPartOptions}
                />
              </group>
            );
          })}
        </group>

        {/* shelfA16 */}
        <group
          ref={shelfA16Ref}
          position={[
            objects.shelfA16.position.x,
            objects.shelfA16.position.y,
            objects.shelfA16.position.z,
          ]}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
        >
          {objects.shelfA16.parts.map((part) => {
            return (
              <group key={part.partName}>
                <mesh
                  position={animatedPosition(part.animation, animDist)}
                  onClick={() => {
                    console.log(part.itemName, part.partName, " clicked");
                    setCurrentItemName(part.itemName);
                    setCurrentPartName(part.partName);
                    setShowPartOptions(true);
                  }}
                >
                  <ItemPart
                    model={part.model}
                    itemName={part.itemName}
                    partName={part.partName}
                  />
                </mesh>
                <Annotation
                  model={part.model}
                  itemName={part.itemName}
                  partName={part.partName}
                  descPartName={part.descPartName}
                  animation={part.animation}
                  animDist={animDist}
                  currentItemName={currentItemName}
                  currentPartName={currentPartName}
                  showBackground={showBackground}
                  showPartOptions={showPartOptions}
                />
              </group>
            );
          })}
        </group>

        {/* shelfA32 */}
        <group
          ref={shelfA32Ref}
          position={[
            objects.shelfA32.position.x,
            objects.shelfA32.position.y,
            objects.shelfA32.position.z,
          ]}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
        >
          {objects.shelfA32.parts.map((part) => {
            return (
              <group key={part.partName}>
                <mesh
                  position={animatedPosition(part.animation, animDist)}
                  onClick={() => {
                    console.log(part.itemName, part.partName, " clicked");
                    setCurrentItemName(part.itemName);
                    setCurrentPartName(part.partName);
                    setShowPartOptions(true);
                  }}
                >
                  <ItemPart
                    model={part.model}
                    itemName={part.itemName}
                    partName={part.partName}
                  />
                </mesh>
                <Annotation
                  model={part.model}
                  itemName={part.itemName}
                  partName={part.partName}
                  descPartName={part.descPartName}
                  animation={part.animation}
                  animDist={animDist}
                  currentItemName={currentItemName}
                  currentPartName={currentPartName}
                  showBackground={showBackground}
                  showPartOptions={showPartOptions}
                />
              </group>
            );
          })}
        </group>

        {/* shelfB16 */}
        <group
          ref={shelfB16Ref}
          position={[
            objects.shelfB16.position.x,
            objects.shelfB16.position.y,
            objects.shelfB16.position.z,
          ]}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
        >
          {objects.shelfB16.parts.map((part) => {
            return (
              <group key={part.partName}>
                <mesh
                  position={animatedPosition(part.animation, animDist)}
                  onClick={() => {
                    console.log(part.itemName, part.partName, " clicked");
                    setCurrentItemName(part.itemName);
                    setCurrentPartName(part.partName);
                    setShowPartOptions(true);
                  }}
                >
                  <ItemPart
                    model={part.model}
                    itemName={part.itemName}
                    partName={part.partName}
                  />
                </mesh>
                <Annotation
                  model={part.model}
                  itemName={part.itemName}
                  partName={part.partName}
                  descPartName={part.descPartName}
                  animation={part.animation}
                  animDist={animDist}
                  currentItemName={currentItemName}
                  currentPartName={currentPartName}
                  showBackground={showBackground}
                  showPartOptions={showPartOptions}
                />
              </group>
            );
          })}
        </group>

        {/* shelfB32 */}
        <group
          ref={shelfB32Ref}
          position={[
            objects.shelfB32.position.x,
            objects.shelfB32.position.y,
            objects.shelfB32.position.z,
          ]}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
        >
          {objects.shelfB32.parts.map((part) => {
            return (
              <group key={part.partName}>
                <mesh
                  position={animatedPosition(part.animation, animDist)}
                  onClick={() => {
                    console.log(part.itemName, part.partName, " clicked");
                    setCurrentItemName(part.itemName);
                    setCurrentPartName(part.partName);
                    setShowPartOptions(true);
                  }}
                >
                  <ItemPart
                    model={part.model}
                    itemName={part.itemName}
                    partName={part.partName}
                  />
                </mesh>
                <Annotation
                  model={part.model}
                  itemName={part.itemName}
                  partName={part.partName}
                  descPartName={part.descPartName}
                  animation={part.animation}
                  animDist={animDist}
                  currentItemName={currentItemName}
                  currentPartName={currentPartName}
                  showBackground={showBackground}
                  showPartOptions={showPartOptions}
                />
              </group>
            );
          })}
        </group>

        {/* floor */}
        <mesh
          visible={showBackground}
          position={[0, -0.498, 0]}
          // onClick={handleOffClick}
        >
          <Floor
            currentColor={textures.whiteStain}
            currentTexture={textures.woodFloorWornPlanksTexture}
          />
        </mesh>

        {/* wallsAndMoulding */}
        <mesh
          visible={showBackground}
          // onClick={handleOffClick}
        >
          <Walls
            currentColor={textures.whiteStain}
            currentTexture={textures.paintedTexture}
          />
        </mesh>

        {/* Icon (cart bag test) */}
        <mesh visible={showBackground}>
          <Icon
            currentColor={textures.naturalStain}
            currentTexture={textures.naturalTexture}
          />
        </mesh>

        {/* shelfPositions */}
        {/* <mesh>
          <ShelfPositions />
        </mesh> */}
      </group>
      {/* <SoftShadows size={20} samples={5} focus={0} /> */}
    </>
  );
}
