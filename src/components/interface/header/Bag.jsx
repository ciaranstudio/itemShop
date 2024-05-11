import React, { useState, useLayoutEffect } from "react";
import { useGLTF, useTexture, Html } from "@react-three/drei";

export const Bag = ({
  currentColor,
  currentTexture,
  cartCount,
  handleCartClick,
}) => {
  const { scene, nodes, materials } = useGLTF("./models/bag.gltf");
  const [annotations, setAnnotations] = useState([]);

  // texture
  const [map, normalMap, roughnessMap, metalnessMap] =
    useTexture(currentTexture);

  useLayoutEffect(() => {
    Object.assign(materials._0043_SaddleBrown, {
      map: map,
      normalMap: normalMap,
      roughnessMap: roughnessMap,
      metalnessMap: metalnessMap,
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
      if (o.isObject3D) {
        if (o.userData.name) {
          if (o.userData.name.startsWith("AnchorPoint")) {
            currentAnnotations.push(
              <Html
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
        o.castShadow = false;
        o.receiveShadow = true;
        o.material.roughness = 1;
        o.material.metalness = 0;
      }
    });
  }, []);

  return <primitive object={scene}>{annotations}</primitive>;
};
