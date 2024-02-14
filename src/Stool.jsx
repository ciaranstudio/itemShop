import React, { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useGLTF, Edges } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import controls from "./debugControls";
import { forwardRef } from "react";
import * as THREE from "three";

export default forwardRef(function Stool(props, ref) {
  const [loaded, setLoaded] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  // const markerRef = useRef();
  const vec = new THREE.Vector3();

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
  const circleEdgeRef = useRef();
  const positionOffset = { value: 0 };
  const verticalOffset = { value: 0 };
  const [toggled, setToggled] = useState(false);
  const [offset, setOffset] = useState(positionOffset.value);
  const [jumpOffset, setJumpOffset] = useState(verticalOffset.value);
  const [animActive, setAnimActive] = useState(false);

  const handleStoolClick = () => {
    console.log("handleStoolClick()");
    if (animActive || !introComplete) {
      return;
    } else {
      setToggled(!toggled);
    }
  };

  useEffect(() => {
    if (toggled) {
      circleEdgeRef.current.visible = true;
    } else {
      circleEdgeRef.current.visible = false;
    }
  }, [toggled]);

  useEffect(() => {
    console.log("loaded = ", loaded);

    setLoaded(true);
    setTimeout(() => {
      setIntroComplete(true);
      setToggled(!toggled);
    }, "6500");

    return () => {};
  }, []);

  useGSAP(
    () => {
      if (toggled && introComplete) {
        setIntroComplete(true);
        let tl = gsap.timeline();
        setAnimActive(true);
        tl.to(verticalOffset, {
          value: debugControls.jumpOffset,
          duration: debugControls.jumpUpDuration,
          ease: "expoIn",

          onUpdate: () => {
            setJumpOffset(verticalOffset.value);
          },
        });
        tl.to(positionOffset, {
          value: debugControls.mainOffset,
          duration: debugControls.mainUpDuration,
          ease: "expoIn",

          delay: debugControls.beforeMainUpDelay,
          onUpdate: () => {
            setOffset(positionOffset.value);
          },
        });
        tl.to(positionOffset, {
          value: 0,
          duration: debugControls.mainDownDuration,
          ease: "expoOut",
          delay: debugControls.afterMainUpDelay,

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

  useFrame((state) => {
    if (loaded && !introComplete) {
      state.controls.autoRotate = false;
      state.camera.position.lerp(vec.set(0, 30, 80), 0.01);
      state.camera.updateProjectionMatrix();
      // setTimeout(() => {
      //   state.camera.position.lerp(vec.set(50, 20, -50), 0.01);
      //   state.camera.updateProjectionMatrix();
      // }, "1000");
      // state.camera.lookAt(markerRef.current.position);
    } else {
      state.controls.autoRotate = true;
    }
    return null;
  });

  return (
    <>
      <group
        {...props}
        dispose={null}
        onClick={handleStoolClick}
        // ref={markerRef}
      >
        <pointLight
          ref={ref}
          color="white"
          position={[0, 8 + offset * 4 + jumpOffset, 0]}
          intensity={4 + offset * 3}
        />

        <mesh
          receiveShadow
          position={[0, 0 - offset, 0]}
          rotation-x={-Math.PI * 0.5}
          scale={1}
        >
          <circleGeometry args={[20, 128]} />
          <meshStandardMaterial {...marbleMaterial} />
          <Edges
            ref={circleEdgeRef}
            scale={1}
            threshold={90}
            color="brown"
            visible={true}
          />
        </mesh>

        <group
          position={[-8.26, 0 + offset * 2 + jumpOffset, 8.26]}
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
        </group>
      </group>
    </>
  );
});

useGLTF.preload("/oakStool.glb");
