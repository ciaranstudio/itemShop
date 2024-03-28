import { create } from "zustand";
import { produce } from "immer";
import * as THREE from "three";
import { textures } from "../data/textures.jsx";
// import { options } from "../data/options.jsx";
import { objects } from "../data/objects.jsx";

type State = {
  currentItemSelected: {};
  previousItemSelected: {};
  items: {
    gramps: {
      data: {};
      animActive: boolean;
      optionSelectedType: string;
      optionSelectedPrice: number;
      optionSelectedList: string[];
      parts: {
        top: { colorName: string; color: THREE.Color; texture: string[] };
        barBottom: { colorName: string; color: THREE.Color; texture: string[] };
        barTop: { colorName: string; color: THREE.Color; texture: string[] };
        leg1: { colorName: string; color: THREE.Color; texture: string[] };
        leg2: { colorName: string; color: THREE.Color; texture: string[] };
        leg3: { colorName: string; color: THREE.Color; texture: string[] };
        leg4: { colorName: string; color: THREE.Color; texture: string[] };
      };
    };
    squatter: {
      data: {};
      animActive: boolean;
      optionSelectedType: string;
      optionSelectedPrice: number;
      optionSelectedList: string[];
      parts: {
        top: { colorName: string; color: THREE.Color; texture: string[] };
        centerPanel: {
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        side1: { colorName: string; color: THREE.Color; texture: string[] };
        side2: { colorName: string; color: THREE.Color; texture: string[] };
      };
    };
    block: {
      data: {};
      animActive: boolean;
      optionSelectedType: string;
      optionSelectedPrice: number;
      optionSelectedList: string[];
      parts: {
        shelfTop: { colorName: string; color: THREE.Color; texture: string[] };
        shelfMiddle: {
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        shelfBottom: {
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        side1: { colorName: string; color: THREE.Color; texture: string[] };
        side2: { colorName: string; color: THREE.Color; texture: string[] };
      };
    };
    horse: {
      data: {};
      animActive: boolean;
      optionSelectedType: string;
      optionSelectedPrice: number;
      optionSelectedList: string[];
      parts: {
        top: { colorName: string; color: THREE.Color; texture: string[] };
        barInner: { colorName: string; color: THREE.Color; texture: string[] };
        leg1: { colorName: string; color: THREE.Color; texture: string[] };
        leg2: { colorName: string; color: THREE.Color; texture: string[] };
        leg3: { colorName: string; color: THREE.Color; texture: string[] };
        leg4: { colorName: string; color: THREE.Color; texture: string[] };
      };
    };
    shelfA16: {
      data: {};
      animActive: boolean;
      optionSelectedType: string;
      optionSelectedPrice: number;
      optionSelectedList: string[];
      parts: {
        top: { colorName: string; color: THREE.Color; texture: string[] };
        bottom: { colorName: string; color: THREE.Color; texture: string[] };
        cleat: { colorName: string; color: THREE.Color; texture: string[] };
      };
    };
    shelfA32: {
      data: {};
      animActive: boolean;
      optionSelectedType: string;
      optionSelectedPrice: number;
      optionSelectedList: string[];
      parts: {
        top: { colorName: string; color: THREE.Color; texture: string[] };
        bottom: { colorName: string; color: THREE.Color; texture: string[] };
        cleat: { colorName: string; color: THREE.Color; texture: string[] };
      };
    };
    shelfB16: {
      data: {};
      animActive: boolean;
      optionSelectedType: string;
      optionSelectedPrice: number;
      optionSelectedList: string[];
      parts: {
        top: { colorName: string; color: THREE.Color; texture: string[] };
        middle: { colorName: string; color: THREE.Color; texture: string[] };
        bottom: { colorName: string; color: THREE.Color; texture: string[] };
        cleat: { colorName: string; color: THREE.Color; texture: string[] };
      };
    };
    shelfB32: {
      data: {};
      animActive: boolean;
      optionSelectedType: string;
      optionSelectedPrice: number;
      optionSelectedList: string[];
      parts: {
        top: { colorName: string; color: THREE.Color; texture: string[] };
        middle: { colorName: string; color: THREE.Color; texture: string[] };
        bottom: { colorName: string; color: THREE.Color; texture: string[] };
        cleat: { colorName: string; color: THREE.Color; texture: string[] };
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
  updatePartColorName: (
    itemName: string,
    partName: string,
    colorName: string[],
  ) => void;
  updatePartTexture: (
    itemName: string,
    partName: string,
    texture: string[],
  ) => void;
};

export const useOptionStore = create<State & Action>((set) => ({
  currentItemSelected: {},
  previousItemSelected: {},
  items: {
    gramps: {
      data: objects.gramps,
      animActive: false,
      optionSelectedType: "default",
      optionSelectedPrice: 0,
      optionSelectedList: [
        "default",
        "default",
        "default",
        "default",
        "default",
        "default",
        "default",
      ],
      parts: {
        top: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        barBottom: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        barTop: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        leg1: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        leg2: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        leg3: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        leg4: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
      },
    },
    squatter: {
      data: objects.squatter,
      animActive: false,
      optionSelectedType: "default",
      optionSelectedPrice: 0,
      optionSelectedList: ["default", "default", "default", "default"],
      parts: {
        top: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        centerPanel: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        side1: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        side2: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
      },
    },
    block: {
      data: objects.block,
      animActive: false,
      optionSelectedType: "default",
      optionSelectedPrice: 0,
      optionSelectedList: [
        "default",
        "default",
        "default",
        "default",
        "default",
      ],
      parts: {
        shelfTop: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        shelfMiddle: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        shelfBottom: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        side1: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        side2: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
      },
    },
    horse: {
      data: objects.horse,
      animActive: false,
      optionSelectedType: "default",
      optionSelectedPrice: 0,
      optionSelectedList: [
        "default",
        "default",
        "default",
        "default",
        "default",
        "default",
      ],
      parts: {
        top: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        barInner: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        leg1: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        leg2: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        leg3: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        leg4: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
      },
    },
    shelfA16: {
      data: objects.shelfA16,
      animActive: false,
      optionSelectedType: "default",
      optionSelectedPrice: 0,
      optionSelectedList: ["default", "default", "default"],
      parts: {
        top: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        bottom: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        cleat: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
      },
    },
    shelfA32: {
      data: objects.shelfA32,
      animActive: false,
      optionSelectedType: "default",
      optionSelectedPrice: 0,
      optionSelectedList: ["default", "default", "default"],
      parts: {
        top: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        bottom: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        cleat: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
      },
    },
    shelfB16: {
      data: objects.shelfB16,
      animActive: false,
      optionSelectedType: "default",
      optionSelectedPrice: 0,
      optionSelectedList: ["default", "default", "default", "default"],
      parts: {
        top: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        middle: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        bottom: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        cleat: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
      },
    },
    shelfB32: {
      data: objects.shelfB32,
      animActive: false,
      optionSelectedType: "default",
      optionSelectedPrice: 0,
      optionSelectedList: ["default", "default", "default", "default"],
      parts: {
        top: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        middle: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        bottom: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        cleat: {
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
      },
    },
  },

  updatePartColor: (itemName, partName, color) =>
    set(
      produce((state: State) => {
        state.items[itemName].parts[partName].color = color;
      }),
    ),
  updatePartColorName: (itemName, partName, colorName) =>
    set(
      produce((state: State) => {
        state.items[itemName].parts[partName].colorName = colorName;
      }),
    ),
  updatePartTexture: (itemName, partName, texture) =>
    set(
      produce((state: State) => {
        state.items[itemName].parts[partName].texture = texture;
      }),
    ),
}));
