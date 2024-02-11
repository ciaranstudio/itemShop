import React, { useRef, useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import {
  useGLTF,
  // useHelper,
  SoftShadows,
  Edges,
  // Billboard,
  // Text,
} from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import controls from "./debugControls";
// import { PointLightHelper } from "three";
// import { SpotLightHelper } from "three";
import { forwardRef } from "react";
// import * as THREE from "three";

export default forwardRef(function Stool(props, ref) {
  const { nodes, materials } = useGLTF("/oakStool.glb");
  const debugControls = controls();
  const [
    colorMap,
    displacementMap,
    normalMap,
    metalnessMap,
    roughnessMap,
    aoMap,
  ] = useLoader(TextureLoader, [
    // "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ]);

  const [
    marbleColorMap,
    marbleDisplacementMap,
    marbleNormalMap,
    marbleMetalnessMap,
    marbleRoughnessMap,
    marbleAoMap,
  ] = useLoader(TextureLoader, [
    "./ConcretePoured001/ConcretePoured001_COL_2K_METALNESS.png",
    "./ConcretePoured001/ConcretePoured001_DISP_2K_METALNESS.png",
    "./ConcretePoured001/ConcretePoured001_NRM_2K_METALNESS.png",
    "./ConcretePoured001/ConcretePoured001_METALNESS_2K_METALNESS.png",
    "./ConcretePoured001/ConcretePoured001_ROUGHNESS_2K_METALNESS.png",
    "./ConcretePoured001/ConcretePoured001_AO_2K_METALNESS.png",
  ]);

  const woodMaterial = {
    metalness: debugControls.metalness,
    roughness: debugControls.roughness,
    color: debugControls.stainColor,
    displacementScale: 0,
    map: colorMap,
    displacementMap: displacementMap,
    normalMap: normalMap,
    metalnessMap: metalnessMap,
    roughnessMap: roughnessMap,
    aoMap: aoMap,
    wireframe: debugControls.wireframe,
  };

  const marbleMaterial = {
    displacementScale: 0,
    map: marbleColorMap,
    displacementMap: marbleDisplacementMap,
    normalMap: marbleNormalMap,
    metalnessMap: marbleMetalnessMap,
    roughnessMap: marbleRoughnessMap,
    aoMap: marbleAoMap,
    wireframe: debugControls.wireframe,
  };

  const spotLightTop = useRef();
  // const pointLightBottom = useRef();
  const circleEdgeRef = useRef();
  const positionOffset = { value: 0 };
  const verticalOffset = { value: 0 };
  const [toggled, setToggled] = useState(false);
  const [offset, setOffset] = useState(positionOffset.value);
  const [jumpOffset, setJumpOffset] = useState(verticalOffset.value);
  const [animActive, setAnimActive] = useState(false);

  const handleStoolClick = () => {
    console.log("handleStoolClick()");
    if (animActive) {
      return;
    } else {
      setToggled(!toggled);
    }
  };

  useEffect(() => {
    if (toggled) {
      // console.log("toggled: ", toggled);
      circleEdgeRef.current.visible = true;
    } else {
      circleEdgeRef.current.visible = false;
    }
  }, [toggled]);

  useGSAP(
    () => {
      if (toggled) {
        let tl = gsap.timeline();
        setAnimActive(true);
        tl.to(verticalOffset, {
          value: debugControls.jumpOffset,
          duration: debugControls.jumpUpDuration,
          ease: "expoIn",
          // repeat: -1,
          // yoyo: true,
          // repeatDelay: 5,
          onUpdate: () => {
            setJumpOffset(verticalOffset.value);
          },
        });
        tl.to(positionOffset, {
          value: debugControls.mainOffset,
          duration: debugControls.mainUpDuration,
          ease: "expoIn",
          // repeat: -1,
          // yoyo: true,
          // repeatDelay: 5,
          delay: debugControls.beforeMainUpDelay,
          onUpdate: () => {
            setOffset(positionOffset.value);
          },
          // onComplete: () => {
          //   setOffset(0);
          // },
        });
        tl.to(positionOffset, {
          value: 0,
          duration: debugControls.mainDownDuration,
          ease: "expoOut",
          delay: debugControls.afterMainUpDelay,
          // repeat: -1,
          // yoyo: true,
          // repeatDelay: 5,
          onUpdate: () => {
            setOffset(positionOffset.value);
          },
        });
        tl.to(verticalOffset, {
          value: 0,
          duration: debugControls.jumpDownDuration,
          ease: "expoIn",
          delay: debugControls.afterJumpDownDelay,
          onUpdate: () => {
            setJumpOffset(verticalOffset.value);
          },
          onComplete: () => {
            circleEdgeRef.current.visible = false;
            setAnimActive(false);
            setToggled(false);
          },
        });
      }
    },
    [toggled],
    true,
  );

  return (
    <>
      <group {...props} dispose={null} onClick={handleStoolClick}>
        <pointLight
          ref={ref}
          color="white"
          position={[8.216, 3 + offset * 5 + jumpOffset, -8.216]}
          intensity={2 + offset * 20}
        />
        <spotLight
          castShadow
          ref={spotLightTop}
          color="white"
          position={[14.216, 28 + offset * 4 + jumpOffset, -28.216]}
          intensity={200}
          shadow-normalBias={0.04}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-bottom={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
        />
        {/* 
      
        <pointLight
          // ref={pointLightBottom}
          color="white"
          position={[8.216, 4 + offset + jumpOffset, -8.216]}
          intensity={10 + offset * 50}
        /> */}
        <mesh
          receiveShadow
          position={[8.25, 0 - offset, -8.25]}
          rotation-x={-Math.PI * 0.5}
          scale={1}
          // onClick={handleClick}
        >
          <circleGeometry args={[20, 128]} />
          <meshStandardMaterial {...marbleMaterial} />
          <Edges
            ref={circleEdgeRef}
            scale={1}
            threshold={90} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
            color="brown"
            visible={true}
          />
        </mesh>

        <group
          position={[0, 0 + offset * 2 + jumpOffset, 0]}
          scale={1}
          visible={debugControls.visible}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.blockA.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[0.765, 16.5 + offset * 2 + offset / 1.5, -0.753]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.blockB.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[0.765, 16.5 + offset * 2 + offset / 1.5, -0.753]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.blockC.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[0.765, 16.5 + offset * 2 + offset / 1.5, -0.753]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.blockD.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[0.765, 16.5 + offset * 2 + offset / 1.5, -0.753]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.legA.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[13 + offset, 0, -9.219]}
            rotation={[0, -1.571, 0]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.legB.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[7.75, 0, -12.969 - offset]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.legC.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[4 - offset, 0, -7.719]}
            rotation={[0, 1.571, 0]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.legD.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[9.25, 0, -3.969 + offset]}
            rotation={[-Math.PI, 0, -Math.PI]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.lowBar.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[7.75, 14.5 + offset, -2.969]}
            // ref={ref}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.tableTop.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[0.765, 16.5 + offset * 2 + offset / 1.5, -0.753]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.topBar.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[3, 16.5 + offset * 2, -7.719]}
            rotation={[Math.PI, -1.571, 0]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <SoftShadows size={20} samples={20} focus={1} />
        </group>
      </group>
    </>
  );
});

useGLTF.preload("/oakStool.glb");
