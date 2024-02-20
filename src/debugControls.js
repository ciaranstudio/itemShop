import { useControls } from "leva";

export default function debugControls() {
  const { stainColor } = useControls("stain color", {
    stainColor: { value: "#ffffff" },
  });
  const { metalness } = useControls("metalness", {
    metalness: { value: 0.0, step: 0.01, min: 0, max: 1.0 },
  });
  const { roughness } = useControls("roughness", {
    roughness: {
      value: 1.0,
      step: 0.01,
      min: 0,
      max: 1.0,
    },
  });

  const { directionalAposition, directionalAintensity, ambientLight } =
    useControls("lights", {
      directionalAposition: {
        value: { x: -25, y: 50, z: 60 },
        step: 1.0,
      },
      directionalAintensity: {
        value: 1,
        step: 0.01,
        min: 0,
        max: 8,
      },
      ambientLight: {
        value: 0.5,
        step: 0.01,
        min: 0,
        max: 2.0,
      },
    });

  const { positionY } = useControls("stool vertical target", {
    positionY: {
      value: -14.5,
      step: 1.0,
    },
  });

  const { durationUpPositionY } = useControls("stool duration up", {
    durationUpPositionY: {
      value: 1,
      step: 0.01,
      min: 0,
      max: 4,
    },
  });

  const { durationDownPositionY } = useControls("stool duration down", {
    durationDownPositionY: {
      value: 1,
      step: 0.01,
      min: 0,
      max: 4,
    },
  });

  const { stoolSpin } = useControls("stool duration up", {
    stoolSpin: {
      value: Math.PI / 3,
      step: 0.01,
      min: 0,
      max: 4,
    },
  });

  const { stoolSpinDuration } = useControls("stool duration down", {
    stoolSpinDuration: {
      value: 1,
      step: 0.01,
      min: 0,
      max: 4,
    },
  });

  const { mainOffset, jumpOffset } = useControls("animation distance", {
    mainOffset: {
      value: 3.25, // 3.25
      step: 0.01,
      min: 0,
      max: 10,
    },
    jumpOffset: {
      value: 6.0,
      step: 0.01,
      min: 0,
      max: 5,
    },
  });
  const { mainUpDuration, jumpUpDuration, mainDownDuration, jumpDownDuration } =
    useControls("animation duration", {
      mainUpDuration: {
        value: 1.0,
        step: 0.01,
        min: 0,
        max: 4,
      },
      jumpUpDuration: {
        value: 1.0,
        step: 0.01,
        min: 0,
        max: 4,
      },
      mainDownDuration: {
        value: 1.0,
        step: 0.01,
        min: 0,
        max: 4,
      },
      jumpDownDuration: {
        value: 1.0,
        step: 0.01,
        min: 0,
        max: 4,
      },
    });
  const { beforeMainUpDelay, afterMainUpDelay, afterJumpDownDelay } =
    useControls("animation delay", {
      beforeMainUpDelay: {
        value: 0.05,
        step: 0.01,
        min: 0,
        max: 2,
      },
      afterMainUpDelay: {
        value: 0.25,
        step: 0.01,
        min: 0,
        max: 6,
      },
      afterJumpDownDelay: {
        value: 0.05,
        step: 0.01,
        min: 0,
        max: 6,
      },
    });
  const { itemScale } = useControls("scale", {
    itemScale: {
      value: 1.15,
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
    positionY: positionY,
    durationUpPositionY: durationUpPositionY,
    durationDownPositionY: durationDownPositionY,
    stoolSpin: stoolSpin,
    stoolSpinDuration: stoolSpinDuration,
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
