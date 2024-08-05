import React from "react";
import { Html } from "@react-three/drei";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import useWindowDimensions from "../../hooks/useWindowDimensions.jsx";
import OptionsOnly from "./OptionsOnly.jsx";
import { OPTION_BOX } from "../../data/constants.js";

export default function OptionBox() {
  const { width, height } = useWindowDimensions();

  // state from store
  const mobileView = useOptionStore((state) => state.mobileView);

  return (
    <group
      position={[
        0,
        mobileView && height < 700 && height >= 450
          ? OPTION_BOX.verticalPositionMobileSmall
          : mobileView && height >= 700
            ? OPTION_BOX.verticalPositionMobileReg
            : mobileView && height < 450
              ? OPTION_BOX.landscapePositionAll
              : OPTION_BOX.verticalPositionDesktop,
        0,
      ]}
    >
      <Html center position={[0, 0, 0]}>
        <OptionsOnly admin={false} />
      </Html>
    </group>
  );
}
