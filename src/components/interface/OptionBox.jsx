import React from "react";
import OptionsOnly from "./OptionsOnly.jsx";
import { OPTION_BOX } from "../../data/constants.js";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import useWindowDimensions from "../../hooks/useWindowDimensions.jsx";

export default function OptionBox({ handlePartOption }) {
  const mobileView = useOptionStore((state) => state.mobileView);
  const { width, height } = useWindowDimensions();
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
      <OptionsOnly handlePartOption={handlePartOption} />
    </group>
  );
}
