// import { useRef, useState, useEffect } from "react";
// import * as THREE from "three";
import { objects } from "../data/objects.jsx";
import { ItemPart } from "./ItemPart.jsx";

import { BlockShelves } from "./block/BlockShelves.jsx";
import { BlockSide1 } from "./block/BlockSide1.jsx";
import { BlockSide2 } from "./block/BlockSide2.jsx";

export default function Block({
  colorMapBlock,
  normalMapBlock,
  roughnessMapBlock,
  metalnessMapBlock,
  currentColorBlock,
  currentTextureBlock,
  //   handlePartClick,
  toggled,
  currentItemSelected,
}) {
  return (
    <>
      <group>
        <mesh castShadow>
          <BlockSide1
            // displacementMap={displacementMapBlock}
            // aoMap={aoMapBlock}
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
            // displacementMap={displacementMapBlock}
            // aoMap={aoMapBlock}
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
            // displacementMap={displacementMapBlock}
            // aoMap={aoMapBlock}
            map={colorMapBlock}
            normalMap={normalMapBlock}
            roughnessMap={roughnessMapBlock}
            metalnessMap={metalnessMapBlock}
            currentColor={currentColorBlock}
            currentTexture={currentTextureBlock}
          />
        </mesh>
      </group>
      <group>
        {objects.block.parts.map((part) => {
          <ItemPart
            map={colorMapBlock}
            normalMap={normalMapBlock}
            roughnessMap={roughnessMapBlock}
            metalnessMap={metalnessMapBlock}
            currentColor={currentColorBlock}
            currentTexture={currentTextureBlock}
            model={part.model}
            animationType={part.animation}
            animationToggle={toggled}
            itemName={objects.block.itemName}
            partName={partName}
            currentItemSelected={currentItemSelected}
            // onClick={handlePartClick}
          />;
        })}
      </group>
    </>
  );
}
