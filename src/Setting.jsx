import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import controls from "./debugControls";
// import * as THREE from "three";
import { Sky } from "@react-three/drei";
import Lights from "./Lights";

export default function Setting(props) {
  const debugControls = controls();

  const [
    concretePouredColorMap,
    concretePouredDisplacementMap,
    concretePouredNormalMap,
    concretePouredMetalnessMap,
    concretePouredRoughnessMap,
    concretePouredAoMap,
  ] = useLoader(TextureLoader, [
    "./ConcretePoured001/ConcretePoured001_COL_2K_METALNESS.png",
    "./ConcretePoured001/ConcretePoured001_DISP_2K_METALNESS.png",
    "./ConcretePoured001/ConcretePoured001_NRM_2K_METALNESS.png",
    "./ConcretePoured001/ConcretePoured001_METALNESS_2K_METALNESS.png",
    "./ConcretePoured001/ConcretePoured001_ROUGHNESS_2K_METALNESS.png",
    "./ConcretePoured001/ConcretePoured001_AO_2K_METALNESS.png",
  ]);

  // const [
  //   concretePlatesColorMap,
  //   concretePlatesDisplacementMap,
  //   concretePlatesNormalMap,
  //   concretePlatesMetalnessMap,
  //   concretePlatesRoughnessMap,
  //   concretePlatesAoMap,
  // ] = useLoader(TextureLoader, [
  //   "./ConcretePrecastPlates004/ConcretePrecastPlates004_COL_2K_METALNESS.png",
  //   "./ConcretePrecastPlates004/ConcretePrecastPlates004_DISP_2K_METALNESS.png",
  //   "./ConcretePrecastPlates004/ConcretePrecastPlates004_NRM_2K_METALNESS.png",
  //   "./ConcretePrecastPlates004/ConcretePrecastPlates004_METALNESS_2K_METALNESS.png",
  //   "./ConcretePrecastPlates004/ConcretePrecastPlates004_ROUGHNESS_2K_METALNESS.png",
  //   "./ConcretePrecastPlates004/ConcretePrecastPlates004_AO_2K_METALNESS.png",
  // ]);

  const [
    bricksWhitewashedColorMap,
    bricksWhitewashedDisplacementMap,
    bricksWhitewashedNormalMap,
    bricksWhitewashedMetalnessMap,
    bricksWhitewashedRoughnessMap,
    bricksWhitewashedAoMap,
  ] = useLoader(TextureLoader, [
    "./BricksReclaimedWhitewashedOffset001/BricksReclaimedWhitewashedOffset001_COL_2K_METALNESS.png",
    "./BricksReclaimedWhitewashedOffset001/BricksReclaimedWhitewashedOffset001_DISP_2K_METALNESS.png",
    "./BricksReclaimedWhitewashedOffset001/BricksReclaimedWhitewashedOffset001_NRM_2K_METALNESS.png",
    "./BricksReclaimedWhitewashedOffset001/BricksReclaimedWhitewashedOffset001_METALNESS_2K_METALNESS.png",
    "./BricksReclaimedWhitewashedOffset001/BricksReclaimedWhitewashedOffset001_ROUGHNESS_2K_METALNESS.png",
    "./BricksReclaimedWhitewashedOffset001/BricksReclaimedWhitewashedOffset001_AO_2K_METALNESS.png",
  ]);

  // const [
  //   tilesTravertineColorMap,
  //   tilesTravertineDisplacementMap,
  //   tilesTravertineNormalMap,
  //   tilesTravertineMetalnessMap,
  //   tilesTravertineRoughnessMap,
  //   tilesTravertineAoMap,
  // ] = useLoader(TextureLoader, [
  //   "./TilesTravertine001/TilesTravertine001_COL_2K.jpg",
  //   "./TilesTravertine001/TilesTravertine001_DISP_2K.jpg",
  //   "./TilesTravertine001/TilesTravertine001_NRM_2K.jpg",
  //   "./TilesTravertine001/TilesTravertine001_REFL_2K.jpg",
  //   "./TilesTravertine001/TilesTravertine001_GLOSS_2K.jpg",
  //   "./TilesTravertine001/TilesTravertine001_AO_2K.jpg",
  // ]);

  // const [
  //   ceramicPlainWhiteColorMap,
  //   ceramicPlainWhiteDisplacementMap,
  //   ceramicPlainWhiteNormalMap,
  //   ceramicPlainWhiteMetalnessMap,
  //   ceramicPlainWhiteRoughnessMap,
  // ] = useLoader(TextureLoader, [
  //   "./CeramicPlainWhite001/CeramicPlainWhite001_COL_2K.jpg",
  //   "./CeramicPlainWhite001/CeramicPlainWhite001_DISP_2K.jpg",
  //   "./CeramicPlainWhite001/CeramicPlainWhite001_NRM_2K.png",
  //   "./CeramicPlainWhite001/CeramicPlainWhite001_REFL_2K.jpg",
  //   "./CeramicPlainWhite001/CeramicPlainWhite001_GLOSS_2K.jpg",
  // ]);

  // const [
  //   wallColorMap,
  //   wallDisplacementMap,
  //   wallNormalMap,
  //   wallMetalnessMap,
  //   wallRoughnessMap,
  //   // wallAoMap,
  // ] = useLoader(TextureLoader, [
  //   "./PlasterPlain001/PlasterPlain001_COL_1K_METALNESS.png",
  //   "./PlasterPlain001/PlasterPlain001_DISP_1K_METALNESS.png",
  //   "./PlasterPlain001/PlasterPlain001_NRM_1K_METALNESS.png",
  //   "./PlasterPlain001/PlasterPlain001_METALNESS_1K_METALNESS.png",
  //   "./PlasterPlain001/PlasterPlain001_ROUGHNESS_1K_METALNESS.png",
  //   // "./PlasterPlain001/PlasterPlain001_BUMP_1K_METALNESS.png",
  // ]);

  // const [
  //   planksColorMap,
  //   planksDisplacementMap,
  //   planksNormalMap,
  //   planksMetalnessMap,
  //   // planksRoughnessMap,
  //   planksAoMap,
  // ] = useLoader(TextureLoader, [
  //   "./WoodPlanksWorn001/WoodPlanksWorn001_COL_2K.jpg",
  //   "./WoodPlanksWorn001/WoodPlanksWorn001_DISP_2K.jpg",
  //   "./WoodPlanksWorn001/WoodPlanksWorn001_NRM_2K.jpg",
  //   "./WoodPlanksWorn001/WoodPlanksWorn001_GLOSS_2K.jpg",
  //   // "./WoodPlanksWorn001/WoodPlanksWorn001_ROUGHNESS_2K_METALNESS.png",
  //   "./WoodPlanksWorn001/WoodPlanksWorn001_AO_2K.jpg",
  // ]);

  // const [
  //   tilesColorMap,
  //   tilesDisplacementMap,
  //   tilesNormalMap,
  //   tilesRoughnessMap,
  // ] = useLoader(TextureLoader, [
  //   "./Tiles036/Tiles036_1K_Color.jpg",
  //   "./Tiles036/Tiles036_1K_Displacement.jpg",
  //   "./Tiles036/Tiles036_1K_Normal.jpg",
  //   "./Tiles036/Tiles036_1K_Roughness.jpg",
  // ]);

  // const [
  //   grassColorMap,
  //   grassDisplacementMap,
  //   grassNormalMap,
  //   grassRoughnessMap,
  //   grassAoMap,
  // ] = useLoader(TextureLoader, [
  //   "./Grass001/Grass001_1K_Color.jpg",
  //   "./Grass001/Grass001_1K_Displacement.jpg",
  //   "./Grass001/Grass001_1K_Normal.jpg",
  //   "./Grass001/Grass001_1K_Roughness.jpg",
  //   "./Grass001/Grass001_1K_AmbientOcclusion.jpg",
  // ]);

  // wood texture for sorting best texture variation in development
  // const [
  //   colorMap,
  //   displacementMap,
  //   normalMap,
  //   metalnessMap,
  //   roughnessMap,
  //   aoMap,
  // ] = useTexture(props.currentItemSelected.itemTexture);

  // const woodMaterial = {
  //   metalness: debugControls.metalness,
  //   roughness: debugControls.roughness,
  //   displacementScale: 0,
  //   map: colorMap,
  //   displacementMap: displacementMap,
  //   normalMap: normalMap,
  //   metalnessMap: metalnessMap,
  //   roughnessMap: roughnessMap,
  //   aoMap: aoMap,
  //   color: props.currentItemSelected.itemColor,
  //   wireframe: debugControls.wireframe,
  // };

  const concretePouredMaterial = {
    // metalness: debugControls.metalness,
    // roughness: debugControls.roughness,
    displacementScale: 0,
    map: concretePouredColorMap,
    displacementMap: concretePouredDisplacementMap,
    normalMap: concretePouredNormalMap,
    metalnessMap: concretePouredMetalnessMap,
    roughnessMap: concretePouredRoughnessMap,
    aoMap: concretePouredAoMap,
    wireframe: debugControls.wireframe,
  };

  // const concretePlatesMaterial = {
  //   // metalness: debugControls.metalness,
  //   // roughness: debugControls.roughness,
  //   displacementScale: 0,
  //   map: concretePlatesColorMap,
  //   displacementMap: concretePlatesDisplacementMap,
  //   normalMap: concretePlatesNormalMap,
  //   metalnessMap: concretePlatesMetalnessMap,
  //   roughnessMap: concretePlatesRoughnessMap,
  //   aoMap: concretePlatesAoMap,
  //   wireframe: debugControls.wireframe,
  // };

  // const ceramicPlainWhiteMaterial = {
  //   displacementScale: 0,
  //   map: ceramicPlainWhiteColorMap,
  //   displacementMap: ceramicPlainWhiteDisplacementMap,
  //   normalMap: ceramicPlainWhiteNormalMap,
  //   metalnessMap: ceramicPlainWhiteMetalnessMap,
  //   roughnessMap: ceramicPlainWhiteRoughnessMap,
  //   wireframe: debugControls.wireframe,
  // };

  const bricksWhitewashedMaterial = {
    displacementScale: 0,
    map: bricksWhitewashedColorMap,
    displacementMap: bricksWhitewashedDisplacementMap,
    normalMap: bricksWhitewashedNormalMap,
    metalnessMap: bricksWhitewashedMetalnessMap,
    roughnessMap: bricksWhitewashedRoughnessMap,
    aoMap: bricksWhitewashedAoMap,
    wireframe: debugControls.wireframe,
  };

  // const tilesTravertineMaterial = {
  //   // metalness: debugControls.metalness,
  //   // roughness: debugControls.roughness,
  //   displacementScale: 0,
  //   map: tilesTravertineColorMap,
  //   displacementMap: tilesTravertineDisplacementMap,
  //   normalMap: tilesTravertineNormalMap,
  //   metalnessMap: tilesTravertineMetalnessMap,
  //   roughnessMap: tilesTravertineRoughnessMap,
  //   aoMap: tilesTravertineAoMap,
  //   wireframe: debugControls.wireframe,
  // };

  // const wallMaterial = {
  //   metalness: debugControls.metalness,
  //   roughness: debugControls.roughness,
  //   displacementScale: 0,
  //   map: wallColorMap,
  //   displacementMap: wallDisplacementMap,
  //   normalMap: wallNormalMap,
  //   metalnessMap: wallMetalnessMap,
  //   roughnessMap: wallRoughnessMap,
  //   // aoMap: wallAoMap,
  //   wireframe: debugControls.wireframe,
  // };

  // const planksMaterial = {
  //   metalness: debugControls.metalness,
  //   roughness: debugControls.roughness,
  //   displacementScale: 0,
  //   map: planksColorMap,
  //   displacementMap: planksDisplacementMap,
  //   normalMap: planksNormalMap,
  //   metalnessMap: planksMetalnessMap,
  //   aoMap: planksAoMap,
  //   // color: props.currentItemSelected.itemColor,
  //   wireframe: debugControls.wireframe,
  // };

  // const tilesMaterial = {
  //   displacementScale: 0,
  //   map: tilesColorMap,
  //   displacementMap: tilesDisplacementMap,
  //   normalMap: tilesNormalMap,
  //   roughnessMap: tilesRoughnessMap,
  //   wireframe: debugControls.wireframe,
  // };

  // const grassMaterial = {
  //   displacementScale: 0,
  //   map: grassColorMap,
  //   displacementMap: grassDisplacementMap,
  //   normalMap: grassNormalMap,
  //   roughnessMap: grassRoughnessMap,
  //   aoMap: grassAoMap,
  //   wireframe: debugControls.wireframe,
  // };

  const settingEdgeRef = useRef();

  return (
    <>
      <Lights />
      <Sky
        distance={1000}
        sunPosition={[-70, 10000, 100]}
        inclination={0}
        azimuth={0.25}
      />
      {/* <SoftShadows size={25} samples={8} focus={0.85} /> */}
      {/* wood texture rectangle on wall for debugging */}
      {/* <mesh
        receiveShadow
        position={[0, 30, -64.9]}
        rotation-x={-Math.PI}
        rotation-y={Math.PI}
        scale={1}
        // visible={props.includeFloor}
        visible={false}
      >
        <planeGeometry args={[35, 20]} />
        <meshStandardMaterial {...woodMaterial} />
      </mesh> */}

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
        <meshStandardMaterial {...bricksWhitewashedMaterial} />
      </mesh>

      {/* wall (front wall, behind the camera on initial load) */}
      <mesh
        receiveShadow
        position={[0, 35, 65]}
        rotation-x={Math.PI * 2}
        rotation-y={Math.PI}
        scale={1}
        visible={props.includeFloor}
      >
        <planeGeometry args={[130, 70]} />
        <meshStandardMaterial {...bricksWhitewashedMaterial} />
      </mesh>

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
        <meshStandardMaterial {...bricksWhitewashedMaterial} />
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
        <meshStandardMaterial {...bricksWhitewashedMaterial} />
      </mesh>

      {/* floor */}
      <mesh
        receiveShadow
        position={[0, 0, 0]}
        rotation-x={-Math.PI * 0.5}
        scale={1}
        visible={props.includeFloor}
      >
        {/* <circleGeometry args={[40, 128]} /> */}
        <planeGeometry args={[130, 130]} />
        <meshStandardMaterial {...concretePouredMaterial} />
        {/* <Edges
          ref={settingEdgeRef}
          scale={1}
          threshold={90}
          color="brown"
          visible={false}
        /> */}
      </mesh>

      {/* ceiling */}
      {/* <mesh
        receiveShadow
        position={[0, 70, 0]}
        rotation-x={Math.PI * 0.5}
        scale={1}
        visible={props.includeFloor}
      >
        <planeGeometry args={[130, 130]} />
        <meshStandardMaterial {...tilesTravertineMaterial} />
        <Edges
          ref={settingEdgeRef}
          scale={1}
          threshold={90}
          color="brown"
          visible={false}
        />
      </mesh> */}
    </>
  );
}
