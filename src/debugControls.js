import { useControls, button } from "leva";

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

  const {
    directionalAposition,
    directionalAintensity,
    // directionalBposition,
    // directionalBintensity,
    // directionalCposition,
    // directionalCintensity,
    // directionalDposition,
    // directionalDintensity,
    // sunPosition,
    // sunDistance,
    ambientLight,
  } = useControls("lights", {
    directionalAposition: {
      value: { x: 0, y: 20, z: 15 },
      step: 1.0,
    },
    directionalAintensity: {
      value: 1,
      step: 0.01,
      min: 0,
      max: 8,
    },
    // directionalBposition: {
    //   value: { x: 0, y: 0, z: 0 },
    //   step: 1.0,
    // },
    // directionalBintensity: {
    //   value: 0,
    //   step: 0.01,
    //   min: 0,
    //   max: 8,
    // },
    // directionalCposition: {
    //   value: { x: 20, y: 25, z: 20 },
    //   step: 1.0,
    // },
    // directionalCintensity: {
    //   value: 0,
    //   step: 0.01,
    //   min: 0,
    //   max: 3,
    // },
    // directionalDposition: {
    //   value: { x: -20, y: 25, z: 20 },
    //   step: 1.0,
    // },
    // directionalDintensity: {
    //   value: 0.0,
    //   step: 0.01,
    //   min: 0,
    //   max: 3,
    // },
    ambientLight: {
      value: 0.75,
      step: 0.01,
      min: 0,
      max: 2.0,
    },
    // sunPosition: {
    //   value: { x: 0, y: -2, z: -80 },
    //   step: 1.0,
    // },
    // sunDistance: {
    //   value: 1430.0,
    //   step: 10,
    //   min: 0,
    //   max: 2000.0,
    // },
  });

  const { mainOffset, jumpOffset } = useControls("animation distance", {
    mainOffset: {
      value: 3.25,
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
      value: 0.7,
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
    // directionalBposition: directionalBposition,
    // directionalBintensity: directionalBintensity,
    // directionalCposition: directionalCposition,
    // directionalCintensity: directionalCintensity,
    // directionalDposition: directionalDposition,
    // directionalDintensity: directionalDintensity,
    // sunPosition: sunPosition,
    // sunDistance: sunDistance,
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
