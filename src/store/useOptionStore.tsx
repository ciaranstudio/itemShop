import { create } from "zustand";
import { produce } from "immer";
import * as THREE from "three";
import { textures } from "../data/textures.jsx";

type State = {
  items: {
    gramps: {
      parts: {
        top: { color: THREE.Color; texture: string[] };
        barBottom: { color: THREE.Color; texture: string[] };
        barTop: { color: THREE.Color; texture: string[] };
        leg1: { color: THREE.Color; texture: string[] };
        leg2: { color: THREE.Color; texture: string[] };
        leg3: { color: THREE.Color; texture: string[] };
        leg4: { color: THREE.Color; texture: string[] };
      };
    };
    squatter: {
      parts: {
        top: { color: THREE.Color; texture: string[] };
        centerPanel: { color: THREE.Color; texture: string[] };
        side1: { color: THREE.Color; texture: string[] };
        side2: { color: THREE.Color; texture: string[] };
      };
    };
    block: {
      parts: {
        shelfTop: { color: THREE.Color; texture: string[] };
        shelfMiddle: { color: THREE.Color; texture: string[] };
        shelfBottom: { color: THREE.Color; texture: string[] };
        side1: { color: THREE.Color; texture: string[] };
        side2: { color: THREE.Color; texture: string[] };
      };
    };
    horse: {
      parts: {
        top: { color: THREE.Color; texture: string[] };
        barInner: { color: THREE.Color; texture: string[] };
        shelfBottom: { color: THREE.Color; texture: string[] };
        leg1: { color: THREE.Color; texture: string[] };
        leg2: { color: THREE.Color; texture: string[] };
        leg3: { color: THREE.Color; texture: string[] };
        leg4: { color: THREE.Color; texture: string[] };
      };
    };
    shelfA16: {
      parts: {
        top: { color: THREE.Color; texture: string[] };
        bottom: { color: THREE.Color; texture: string[] };
        cleat: { color: THREE.Color; texture: string[] };
      };
    };
    shelfA32: {
      parts: {
        top: { color: THREE.Color; texture: string[] };
        bottom: { color: THREE.Color; texture: string[] };
        cleat: { color: THREE.Color; texture: string[] };
      };
    };
    shelfB16: {
      parts: {
        top: { color: THREE.Color; texture: string[] };
        middle: { color: THREE.Color; texture: string[] };
        bottom: { color: THREE.Color; texture: string[] };
        cleat: { color: THREE.Color; texture: string[] };
      };
    };
    shelfB32: {
      parts: {
        top: { color: THREE.Color; texture: string[] };
        middle: { color: THREE.Color; texture: string[] };
        bottom: { color: THREE.Color; texture: string[] };
        cleat: { color: THREE.Color; texture: string[] };
      };
    };
  };
};

type Action = {
  updatePartColor: (
    itemName: string,
    partName: string,
    color: THREE.Color,
  ) => void;
  updatePartTexture: (
    itemName: string,
    partName: string,
    texture: string[],
  ) => void;

  updateGrampsTopColor: (color: THREE.Color) => void;
  updateGrampsTopTexture: (texture: string[]) => void;
  updateGrampsBarBottomColor: (color: THREE.Color) => void;
  updateGrampsBarBottomTexture: (texture: string[]) => void;
  updateGrampsBarTopColor: (color: THREE.Color) => void;
  updateGrampsBarTopTexture: (texture: string[]) => void;
  updateGrampsLeg1Color: (color: THREE.Color) => void;
  updateGrampsLeg1Texture: (texture: string[]) => void;
  updateGrampsLeg2Color: (color: THREE.Color) => void;
  updateGrampsLeg2Texture: (texture: string[]) => void;
  updateGrampsLeg3Color: (color: THREE.Color) => void;
  updateGrampsLeg3Texture: (texture: string[]) => void;
  updateGrampsLeg4Color: (color: THREE.Color) => void;
  updateGrampsLeg4Texture: (texture: string[]) => void;

  updateSquatterTopColor: (color: THREE.Color) => void;
  updateSquatterTopTexture: (texture: string[]) => void;
  updateSquatterCenterPanelColor: (color: THREE.Color) => void;
  updateSquatterCenterPanelTexture: (texture: string[]) => void;
  updateSquatterSide1Color: (color: THREE.Color) => void;
  updateSquatterSide1Texture: (texture: string[]) => void;
  updateSquatterSide2Color: (color: THREE.Color) => void;
  updateSquatterSide2Texture: (texture: string[]) => void;

  updateBlockShelfTopColor: (color: THREE.Color) => void;
  updateBlockShelfTopTexture: (texture: string[]) => void;
  updateBlockShelfMiddleColor: (color: THREE.Color) => void;
  updateBlockShelfMiddleTexture: (texture: string[]) => void;
  updateBlockSide1Color: (color: THREE.Color) => void;
  updateBlockSide1Texture: (texture: string[]) => void;
  updateBlockSide2Color: (color: THREE.Color) => void;
  updateBlockSide2Texture: (texture: string[]) => void;

  updateHorseTopColor: (color: THREE.Color) => void;
  updateHorseTopTexture: (texture: string[]) => void;
  updateHorseBarInnerColor: (color: THREE.Color) => void;
  updateHorseBarInnerTexture: (texture: string[]) => void;
  updateHorseLeg1Color: (color: THREE.Color) => void;
  updateHorseLeg1Texture: (texture: string[]) => void;
  updateHorseLeg2Color: (color: THREE.Color) => void;
  updateHorseLeg2Texture: (texture: string[]) => void;
  updateHorseLeg3Color: (color: THREE.Color) => void;
  updateHorseLeg3Texture: (texture: string[]) => void;
  updateHorseLeg4Color: (color: THREE.Color) => void;
  updateHorseLeg4Texture: (texture: string[]) => void;

  updateShelfA16TopColor: (color: THREE.Color) => void;
  updateShelfA16TopTexture: (texture: string[]) => void;
  updateShelfA16BottomColor: (color: THREE.Color) => void;
  updateShelfA16BottomTexture: (texture: string[]) => void;
  updateShelfA16CleatColor: (color: THREE.Color) => void;
  updateShelfA16CleatTexture: (texture: string[]) => void;

  updateShelfA32TopColor: (color: THREE.Color) => void;
  updateShelfA32TopTexture: (texture: string[]) => void;
  updateShelfA32BottomColor: (color: THREE.Color) => void;
  updateShelfA32BottomTexture: (texture: string[]) => void;
  updateShelfA32CleatColor: (color: THREE.Color) => void;
  updateShelfA32CleatTexture: (texture: string[]) => void;

  updateShelfB16TopColor: (color: THREE.Color) => void;
  updateShelfB16TopTexture: (texture: string[]) => void;
  updateShelfB16MiddleColor: (color: THREE.Color) => void;
  updateShelfB16MiddleTexture: (texture: string[]) => void;
  updateShelfB16BottomColor: (color: THREE.Color) => void;
  updateShelfB16BottomTexture: (texture: string[]) => void;
  updateShelfB16CleatColor: (color: THREE.Color) => void;
  updateShelfB16CleatTexture: (texture: string[]) => void;

  updateShelfB32TopColor: (color: THREE.Color) => void;
  updateShelfB32TopTexture: (texture: string[]) => void;
  updateShelfB32MiddleColor: (color: THREE.Color) => void;
  updateShelfB32MiddleTexture: (texture: string[]) => void;
  updateShelfB32BottomColor: (color: THREE.Color) => void;
  updateShelfB32BottomTexture: (texture: string[]) => void;
  updateShelfB32CleatColor: (color: THREE.Color) => void;
  updateShelfB32CleatTexture: (texture: string[]) => void;
};

export const useOptionStore = create<State & Action>((set) => ({
  items: {
    gramps: {
      parts: {
        top: { color: textures.whiteStain, texture: textures.paintedTexture },
        barBottom: {
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        barTop: {
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        leg1: { color: textures.whiteStain, texture: textures.paintedTexture },
        leg2: { color: textures.whiteStain, texture: textures.paintedTexture },
        leg3: { color: textures.whiteStain, texture: textures.paintedTexture },
        leg4: { color: textures.whiteStain, texture: textures.paintedTexture },
      },
    },
    squatter: {
      parts: {
        top: { color: textures.whiteStain, texture: textures.paintedTexture },
        centerPanel: {
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        side1: { color: textures.whiteStain, texture: textures.paintedTexture },
        side2: { color: textures.whiteStain, texture: textures.paintedTexture },
      },
    },
    block: {
      parts: {
        shelfTop: {
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        shelfMiddle: {
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        shelfBottom: {
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        side1: { color: textures.whiteStain, texture: textures.paintedTexture },
        side2: { color: textures.whiteStain, texture: textures.paintedTexture },
      },
    },
    horse: {
      parts: {
        top: { color: textures.whiteStain, texture: textures.paintedTexture },
        barInner: {
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        shelfBottom: {
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        leg1: { color: textures.whiteStain, texture: textures.paintedTexture },
        leg2: { color: textures.whiteStain, texture: textures.paintedTexture },
        leg3: { color: textures.whiteStain, texture: textures.paintedTexture },
        leg4: { color: textures.whiteStain, texture: textures.paintedTexture },
      },
    },
    shelfA16: {
      parts: {
        top: {
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        bottom: {
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        cleat: { color: textures.whiteStain, texture: textures.paintedTexture },
      },
    },
    shelfA32: {
      parts: {
        top: {
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        bottom: {
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        cleat: { color: textures.whiteStain, texture: textures.paintedTexture },
      },
    },
    shelfB16: {
      parts: {
        top: {
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        middle: {
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        bottom: {
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        cleat: { color: textures.whiteStain, texture: textures.paintedTexture },
      },
    },
    shelfB32: {
      parts: {
        top: {
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        middle: {
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        bottom: {
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        cleat: { color: textures.whiteStain, texture: textures.paintedTexture },
      },
    },
  },

  updatePartColor: (itemName, partName, color) =>
    set(
      produce((state: State) => {
        state.items[itemName].parts[partName].color = color;
      }),
    ),
  updatePartTexture: (itemName, partName, texture) =>
    set(
      produce((state: State) => {
        state.items[itemName].parts[partName].texture = texture;
      }),
    ),

  updateGrampsTopColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateGrampsTopTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateGrampsBarBottomColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateGrampsBarBottomTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateGrampsBarTopColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateGrampsBarTopTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateGrampsLeg1Color: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateGrampsLeg1Texture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateGrampsLeg2Color: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateGrampsLeg2Texture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateGrampsLeg3Color: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateGrampsLeg3Texture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateGrampsLeg4Color: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateGrampsLeg4Texture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),

  updateSquatterTopColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateSquatterTopTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateSquatterCenterPanelColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateSquatterCenterPanelTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateSquatterSide1Color: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateSquatterSide1Texture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateSquatterSide2Color: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateSquatterSide2Texture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),

  updateBlockShelfTopColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateBlockShelfTopTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateBlockShelfMiddleColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateBlockShelfMiddleTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateBlockShelfBottomColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateBlockShelfBottomTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateBlockSide1Color: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateBlockSide1Texture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateBlockSide2Color: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateBlockSide2Texture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),

  updateHorseTopColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateHorseTopTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateHorseBarInnerColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateHorseBarInnerTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateHorseLeg1Color: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateHorseLeg1Texture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateHorseLeg2Color: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateHorseLeg2Texture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateHorseLeg3Color: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateHorseLeg3Texture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateHorseLeg4Color: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateHorseLeg4Texture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),

  updateShelfA16TopColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateShelfA16TopTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateShelfA16BottomColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateShelfA16BottomTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateShelfA16CleatColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateShelfA16CleatTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),

  updateShelfA32TopColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateShelfA32TopTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateShelfA32BottomColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateShelfA32BottomTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateShelfA32CleatColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateShelfA32CleatTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),

  updateShelfB16TopColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateShelfB16TopTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateShelfB16MiddleColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateShelfB16MiddleTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateShelfB16BottomColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateShelfB16BottomTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateShelfB16CleatColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateShelfB16CleatTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),

  updateShelfB32TopColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateShelfB32TopTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateShelfB32MiddleColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateShelfB32MiddleTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateShelfB32BottomColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateShelfB32BottomTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
  updateShelfB32CleatColor: (color) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.color = color;
      }),
    ),
  updateShelfB32CleatTexture: (texture) =>
    set(
      produce((state: State) => {
        state.items.gramps.parts.top.texture = texture;
      }),
    ),
}));
