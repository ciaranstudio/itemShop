import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import controls from "./debugControls";
// import * as THREE from "three";
import { Sky, Edges, useTexture } from "@react-three/drei";
import Lights from "./Lights";

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

  const [
    wallColorMap,
    wallDisplacementMap,
    wallNormalMap,
    wallMetalnessMap,
    wallRoughnessMap,
    // wallAoMap,
  ] = useLoader(TextureLoader, [
    "./PlasterPlain001/PlasterPlain001_COL_1K_METALNESS.png",
    "./PlasterPlain001/PlasterPlain001_DISP_1K_METALNESS.png",
    "./PlasterPlain001/PlasterPlain001_NRM_1K_METALNESS.png",
    "./PlasterPlain001/PlasterPlain001_METALNESS_1K_METALNESS.png",
    "./PlasterPlain001/PlasterPlain001_ROUGHNESS_1K_METALNESS.png",
    // "./PlasterPlain001/PlasterPlain001_BUMP_1K_METALNESS.png",
  ]);

  const [
    colorMap,
    displacementMap,
    normalMap,
    metalnessMap,
    roughnessMap,
    aoMap,
  ] = useTexture(props.currentItemSelected.itemTexture);
  const woodMaterial = {
    metalness: debugControls.metalness,
    roughness: debugControls.roughness,
    displacementScale: 0,
    map: colorMap,
    displacementMap: displacementMap,
    normalMap: normalMap,
    metalnessMap: metalnessMap,
    roughnessMap: roughnessMap,
    aoMap: aoMap,
    color: props.currentItemSelected.itemColor,
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

  const wallMaterial = {
    displacementScale: 0,
    map: wallColorMap,
    displacementMap: wallDisplacementMap,
    normalMap: wallNormalMap,
    metalnessMap: wallMetalnessMap,
    roughnessMap: wallRoughnessMap,
    // aoMap: wallAoMap,
    wireframe: debugControls.wireframe,
  };

  const settingEdgeRef = useRef();

  return (
    <>
      <Lights />
      <Sky />
      {/* wood texture rectangle on wall for debugging */}
      <mesh
        receiveShadow
        position={[0, 30, -64.9]}
        rotation-x={-Math.PI}
        rotation-y={Math.PI}
        scale={1}
        visible={props.includeFloor}
      >
        <planeGeometry args={[35, 20]} />
        <meshStandardMaterial {...woodMaterial} />
        <Edges
          ref={settingEdgeRef}
          scale={1}
          threshold={90}
          color="brown"
          visible={false}
        />
      </mesh>

      {/* wall (back wall with wood texture, facing the camera on initial load) */}
      <mesh
        receiveShadow
        position={[0, 35, -65]}
        rotation-x={-Math.PI}
        rotation-y={Math.PI}
        scale={1}
        visible={props.includeFloor}
      >
        <planeGeometry args={[130, 70]} />
        <meshStandardMaterial {...wallMaterial} />
        <Edges
          ref={settingEdgeRef}
          scale={1}
          threshold={90}
          color="brown"
          visible={false}
        />
      </mesh>

      {/* wall (front wall, behind the camera on initial load) */}
      {/* <mesh
        receiveShadow
        position={[0, 35, 65]}
        rotation-x={Math.PI * 2}
        rotation-y={Math.PI}
        scale={1}
        visible={props.includeFloor}
      >
        <planeGeometry args={[130, 70]} />
        <meshStandardMaterial {...wallMaterial} />
        <Edges
          ref={settingEdgeRef}
          scale={1}
          threshold={90}
          color="brown"
          visible={false}
        />
      </mesh> */}

      {/* wall (left side wall) */}
      <mesh
        receiveShadow
        position={[-65, 35, 0]}
        rotation-x={-Math.PI}
        rotation-y={Math.PI * 0.5}
        scale={1}
        visible={props.includeFloor}
      >
        <planeGeometry args={[130, 70]} />
        <meshStandardMaterial {...wallMaterial} />
        <Edges
          ref={settingEdgeRef}
          scale={1}
          threshold={90}
          color="brown"
          visible={false}
        />
      </mesh>

      {/* wall (right side wall) */}
      <mesh
        receiveShadow
        position={[65, 35, 0]}
        rotation-x={-Math.PI}
        rotation-y={-Math.PI * 0.5}
        scale={1}
        visible={props.includeFloor}
      >
        <planeGeometry args={[130, 70]} />
        <meshStandardMaterial {...wallMaterial} />
        <Edges
          ref={settingEdgeRef}
          scale={1}
          threshold={90}
          color="brown"
          visible={false}
        />
      </mesh>

      {/* concrete floor */}
      <mesh
        receiveShadow
        position={[0, 0, 0]}
        rotation-x={-Math.PI * 0.5}
        scale={1}
        visible={props.includeFloor}
      >
        {/* <circleGeometry args={[40, 128]} /> */}
        <planeGeometry args={[130, 130]} />
        <meshStandardMaterial {...marbleMaterial} />
        <Edges
          ref={settingEdgeRef}
          scale={1}
          threshold={90}
          color="brown"
          visible={false}
        />
      </mesh>

      {/* ceiling */}
      <mesh
        receiveShadow
        position={[0, 70, 0]}
        rotation-x={Math.PI * 0.5}
        scale={1}
        visible={props.includeFloor}
      >
        {/* <circleGeometry args={[40, 128]} /> */}
        <planeGeometry args={[130, 130]} />
        <meshStandardMaterial {...wallMaterial} />
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
