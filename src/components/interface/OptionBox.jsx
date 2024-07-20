import React from "react";
import OptionsOnly from "./OptionsOnly.jsx";
import { OPTION_BOX } from "../../data/constants.js";
import { useOptionStore } from "../../store/useOptionStore.tsx";

export default function OptionBox({
  handlePartOption,
  // toggleInfoBox,
  // togglePhotoBox,
  theme,
}) {
  const mobileView = useOptionStore((state) => state.mobileView);
  return (
    <group
      position={[
        0,
        mobileView
          ? OPTION_BOX.verticalPositionMobile
          : OPTION_BOX.verticalPositionDesktop,
        0,
      ]}
    >
      <OptionsOnly
        handlePartOption={handlePartOption}
        // toggleInfoBox={toggleInfoBox}
        // togglePhotoBox={togglePhotoBox}
        theme={theme}
      />
    </group>
  );
}
