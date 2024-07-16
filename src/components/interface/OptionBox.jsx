import React, { useState } from "react";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { objects, shopItems } from "../../data/objects.jsx";
import { options, allOptions } from "../../data/options.jsx";
import toast from "react-hot-toast";
import OptionsOnly from "./OptionsOnly.jsx";

export default function OptionBox({
  handlePartOption,
  toggleInfoBox,
  togglePhotoBox,
  theme,
}) {
  return (
    <group position={[0, 0, 0]}>
      <OptionsOnly
        handlePartOption={handlePartOption}
        toggleInfoBox={toggleInfoBox}
        togglePhotoBox={togglePhotoBox}
        theme={theme}
      />
    </group>
  );
}
