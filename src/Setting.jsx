import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import controls from "./debugControls";
import * as THREE from "three";
import { Edges } from "@react-three/drei";

export default function Floor(props) {
  const debugControls = controls();
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
    displacementScale: 0,
    map: props.colorMap,
    displacementMap: props.displacementMap,
    normalMap: props.normalMap,
    metalnessMap: props.metalnessMap,
    roughnessMap: props.roughnessMap,
    aoMap: props.aoMap,
    color: props.currentColor,
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

  const settingEdgeRef = useRef();

  return (
    <>
      <mesh
        receiveShadow
        position={[0, 0, 0]}
        rotation-x={-Math.PI * 0.5}
        scale={1}
        visible={props.includeFloor}
      >
        {/* <circleGeometry args={[40, 128]} /> */}
        <planeGeometry args={[80, 60]} />
        <meshStandardMaterial {...marbleMaterial} />
        <Edges
          ref={settingEdgeRef}
          scale={1}
          threshold={90}
          color="brown"
          visible={false}
        />
      </mesh>

      <mesh
        receiveShadow
        position={[0, 22.5, -29.99]}
        rotation-x={-Math.PI}
        rotation-y={Math.PI}
        scale={1}
        visible={props.includeFloor}
      >
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial {...woodMaterial} />
        <Edges
          ref={settingEdgeRef}
          scale={1}
          threshold={90}
          color="brown"
          visible={false}
        />
      </mesh>

      <mesh
        receiveShadow
        position={[0, 20, -30]}
        rotation-x={-Math.PI}
        rotation-y={Math.PI}
        scale={1}
        visible={props.includeFloor}
      >
        <planeGeometry args={[80, 40]} />
        <meshStandardMaterial {...marbleMaterial} />
        <Edges
          ref={settingEdgeRef}
          scale={1}
          threshold={90}
          color="brown"
          visible={false}
        />
      </mesh>
    </>
  );
}
