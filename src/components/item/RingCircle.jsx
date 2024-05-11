import React from "react";
import { Edges } from "@react-three/drei";
import * as THREE from "three";
import { useOptionStore } from "../../store/useOptionStore.tsx";

export default function RingCircle({ selected, isShelf, itemName, forArrow }) {
  // state from store
  const showBackground = useOptionStore((state) => state.showBackground);

  return (
    <mesh
      position={
        !forArrow
          ? [
              0,
              isShelf && itemName.includes("B16")
                ? 1.15
                : isShelf && itemName.includes("B32")
                  ? 1.45
                  : isShelf && itemName.includes("A32")
                    ? 1.15
                    : isShelf && itemName.includes("A16")
                      ? 1.45
                      : 0.0005,
              0,
            ]
          : [0, 0, 0]
      }
      rotation-x={isShelf ? 0 : forArrow ? 0 : -Math.PI / 2}
      rotation-y={
        isShelf && itemName.includes("B")
          ? Math.PI
          : isShelf && itemName.includes("A")
            ? Math.PI * 0.5
            : 0
      }
      visible={selected}
      depthTest={false}
    >
      <circleGeometry args={[forArrow ? 0.075 : 0.5, 64]} />
      <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} />
      <Edges
        threshold={90}
        color="white"
        visible={forArrow ? false : selected && showBackground ? true : false}
      />
    </mesh>
  );
}
