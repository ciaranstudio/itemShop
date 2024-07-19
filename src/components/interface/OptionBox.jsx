import React from "react";
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
