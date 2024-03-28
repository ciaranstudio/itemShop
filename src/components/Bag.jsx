import React, { useState, useLayoutEffect } from "react";
import { useGLTF, useTexture, Html } from "@react-three/drei";
// import { useOptionStore } from "../store/useOptionStore.tsx";

export const Bag = ({
  currentColor,
  currentTexture,
  cartCount,
  handleCartClick,
}) => {
  const { scene, nodes, materials } = useGLTF("./models/bag.gltf");
  const [annotations, setAnnotations] = useState([]);

  const [
    map,
    // displacementMap,
    normalMap,
    roughnessMap,
    metalnessMap,
    // aoMap,
  ] = useTexture(currentTexture);

  useLayoutEffect(() => {
    Object.assign(materials._0043_SaddleBrown, {
      map: map,
      // displacementMap: displacementMap,
      normalMap: normalMap,
      roughnessMap: roughnessMap,
      metalnessMap: metalnessMap,
      // aoMap: aoMap,
      color: currentColor,
    });
  }, [
    scene,
    nodes,
    materials,
    currentColor,
    currentTexture,
    map,
    normalMap,
    roughnessMap,
    metalnessMap,
  ]);

  useLayoutEffect(() => {
    const currentAnnotations = [];
    scene.traverse((o) => {
      console.log("o from scene.traverse in Annotations: ", o);
      if (o.isObject3D) {
        if (o.userData.name) {
          if (o.userData.name.startsWith("AnchorPoint")) {
            console.log(o.userData.name);
            currentAnnotations.push(
              <Html
                // transform
                key={o.uuid}
                position={[o.position.x, o.position.y, o.position.z]}
                distanceFactor={0.25}
              >
                <div
                  className="cart"
                  onClick={handleCartClick}
                  style={{ display: cartCount > 0 ? "block" : "none" }}
                >
                  {cartCount > 0 ? cartCount : ""}
                </div>
              </Html>,
            );
          }
        }
      }
    });
    setAnnotations(currentAnnotations);
  }, [scene, cartCount]);

  useLayoutEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        o.material.roughness = 1;
        o.material.metalness = 0;
        // o.material.map.colorSpace = THREE.SRGBColorSpace;
        console.log(o.material);
      }
    });
  }, []);

  return <primitive object={scene}>{annotations}</primitive>;
};
