import { useControls } from "leva";

export default function debugControls() {
  const { stainColor } = useControls("stain color", {
    stainColor: { value: "#ffffff" },
  });
  const { metalness } = useControls("metalness", {
    metalness: { value: 0.5, step: 0.01, min: 0, max: 1.0 },
  });
  const { roughness } = useControls("roughness", {
    roughness: {
      value: 0.75,
      step: 0.01,
      min: 0,
      max: 1.0,
    },
  });
  const { directionalAposition, directionalAintensity, ambientLight } =
    useControls("lights", {
      directionalAposition: {
        value: { x: 5, y: 28, z: 30 },
        step: 1.0,
      },
      directionalAintensity: {
        value: 1.25,
        step: 0.01,
        min: 0,
        max: 8,
      },
      ambientLight: {
        value: 0.75,
        step: 0.01,
        min: 0,
        max: 2.0,
      },
    });
  const { mainOffset, jumpOffset } = useControls("animation distance", {
    mainOffset: {
      value: 3, // 3.25
      step: 0.01,
      min: 0,
      max: 10,
    },
    jumpOffset: {
      value: 2.0,
      step: 0.01,
      min: 0,
      max: 5,
    },
  });
  const { mainUpDuration, jumpUpDuration, mainDownDuration, jumpDownDuration } =
    useControls("animation duration", {
      mainUpDuration: {
        value: 0.75,
        step: 0.01,
        min: 0,
        max: 4,
      },
      jumpUpDuration: {
        value: 0.3,
        step: 0.01,
        min: 0,
        max: 4,
      },
      mainDownDuration: {
        value: 0.8,
        step: 0.01,
        min: 0,
        max: 4,
      },
      jumpDownDuration: {
        value: 0.15,
        step: 0.01,
        min: 0,
        max: 4,
      },
    });
  const { beforeMainUpDelay, afterMainUpDelay, afterJumpDownDelay } =
    useControls("animation delay", {
      beforeMainUpDelay: {
        value: 0.25,
        step: 0.01,
        min: 0,
        max: 2,
      },
      afterMainUpDelay: {
        value: 3.0,
        step: 0.01,
        min: 0,
        max: 6,
      },
      afterJumpDownDelay: {
        value: 0.25,
        step: 0.01,
        min: 0,
        max: 6,
      },
    });
  const { itemScale } = useControls("scale", {
    itemScale: {
      value: 0.9,
      step: 0.01,
      min: 0,
      max: 1.5,
    },
  });
  const { wireframe } = useControls("wireframe", {
    wireframe: false,
  });
  const { visible } = useControls("visible", {
    visible: true,
  });
  const { perfVisible } = useControls("performance", {
    perfVisible: false,
  });
  const controls = {
    metalness: metalness,
    roughness: roughness,
    stainColor: stainColor,
    directionalAposition: directionalAposition,
    directionalAintensity: directionalAintensity,
    ambientLight: ambientLight,
    mainOffset: mainOffset,
    jumpOffset: jumpOffset,
    mainUpDuration: mainUpDuration,
    jumpUpDuration: jumpUpDuration,
    mainDownDuration: mainDownDuration,
    jumpDownDuration: jumpDownDuration,
    beforeMainUpDelay: beforeMainUpDelay,
    afterMainUpDelay: afterMainUpDelay,
    afterJumpDownDelay: afterJumpDownDelay,
    itemScale: itemScale,
    wireframe: wireframe,
    visible: visible,
    perfVisible: perfVisible,
  };
  return controls;
}
