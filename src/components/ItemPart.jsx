import React, { useLayoutEffect } from "react";
import { useGLTF, useTexture, Html } from "@react-three/drei";
import { useOptionStore } from "../store/useOptionStore.tsx";

export const ItemPart = ({
  // map,
  // // displacementMap,
  // normalMap,
  // roughnessMap,
  // metalnessMap,
  // // aoMap,
  // currentColor,
  // currentTexture,
  model,
  // animationType,
  itemName,
  partName,
}) => {
  const { scene, nodes, materials } = useGLTF(model);

  const currentPartColor = useOptionStore(
    (state) => state.items[itemName].parts[partName].color,
  );
  const currentPartTexture = useOptionStore(
    (state) => state.items[itemName].parts[partName].texture,
  );

  const [
    map,
    // displacementMap,
    normalMap,
    roughnessMap,
    metalnessMap,
    // aoMap,
  ] = useTexture(currentPartTexture);

  useLayoutEffect(() => {
    Object.assign(materials.Material, {
      map: map,
      // displacementMap: displacementMap,
      normalMap: normalMap,
      roughnessMap: roughnessMap,
      metalnessMap: metalnessMap,
      // aoMap: aoMap,
      color: currentPartColor,
    });
  }, [
    scene,
    nodes,
    materials,
    currentPartColor,
    currentPartTexture,
    map,
    normalMap,
    roughnessMap,
    metalnessMap,
  ]);

  // useLayoutEffect(
  //   () =>
  //     scene.traverse(
  //       (o) => o.isMesh && (o.castShadow = o.receiveShadow = true),
  //     ),
  //   [],
  // );

  // useLayoutEffect(
  //   () => scene.traverse((o) => o.isMesh && (o.material.metalness = 0)),
  //   [],
  // );

  const annotations = [];

  useLayoutEffect(() => {
    scene.traverse((o) => {
      if (o.userData.prop) {
        console.log("o.userData: ", o.userData);
        annotations.push(
          <Html
            key={o.uuid}
            position={[o.position.x, o.position.y, o.position.z]}
            distanceFactor={0.5}
          >
            <div className="annotation">{o.userData.prop}</div>
          </Html>,
        );
      }
    });
  }, []);

  useLayoutEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        o.material.roughness = 1;
        o.material.metalness = 0;
      }
    });
  }, []);

  return <primitive object={scene} />;
};
