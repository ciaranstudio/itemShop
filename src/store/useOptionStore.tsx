import { create } from "zustand";
import { produce } from "immer";
import * as THREE from "three";
import { textures } from "../data/textures.jsx";
import { options } from "../data/options.jsx";
import { objects } from "../data/objects.jsx";

type State = {
  currentItemSelected: {};
  previousItemSelected: {};
  items: {
    gramps: {
      data: {};
      animActive: boolean;
      optionMixed: boolean;
      optionSelectedList: string[];
      optionCartList: string[];
      optionSelectedPrice: number;
      parts: {
        top: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        barBottom: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        barTop: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        leg1: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        leg2: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        leg3: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        leg4: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
      };
    };
    squatter: {
      data: {};
      animActive: boolean;
      optionMixed: boolean;
      optionSelectedList: string[];
      optionCartList: string[];
      optionSelectedPrice: number;
      parts: {
        top: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        centerPanel: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        side1: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        side2: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
      };
    };
    block: {
      data: {};
      animActive: boolean;
      optionMixed: boolean;
      optionSelectedList: string[];
      optionCartList: string[];
      optionSelectedPrice: number;
      parts: {
        shelfTop: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        shelfMiddle: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        shelfBottom: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        side1: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        side2: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
      };
    };
    horse: {
      data: {};
      animActive: boolean;
      optionMixed: boolean;
      optionSelectedList: string[];
      optionCartList: string[];
      optionSelectedPrice: number;
      parts: {
        top: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        barInner: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        leg1: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        leg2: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        leg3: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        leg4: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
      };
    };
    shelfA16: {
      data: {};
      animActive: boolean;
      optionMixed: boolean;
      optionSelectedList: string[];
      optionCartList: string[];
      optionSelectedPrice: number;
      parts: {
        top: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        bottom: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        cleat: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
      };
    };
    shelfA32: {
      data: {};
      animActive: boolean;
      optionMixed: boolean;
      optionSelectedList: string[];
      optionCartList: string[];
      optionSelectedPrice: number;
      parts: {
        top: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        bottom: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        cleat: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
      };
    };
    shelfB16: {
      data: {};
      animActive: boolean;
      optionMixed: boolean;
      optionSelectedList: string[];
      optionCartList: string[];
      optionSelectedPrice: number;
      parts: {
        top: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        middle: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        bottom: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        cleat: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
      };
    };
    shelfB32: {
      data: {};
      animActive: boolean;
      optionMixed: boolean;
      optionSelectedList: string[];
      optionCartList: string[];
      optionSelectedPrice: number;
      parts: {
        top: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        middle: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        bottom: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
        cleat: {
          partName: string;
          colorType: string;
          colorName: string;
          color: THREE.Color;
          texture: string[];
        };
      };
    };
  };
};

type Action = {
  updatePartTexture: (
    itemName: string,
    partName: string,
    texture: string[],
  ) => void;
  updatePartColor: (
    itemName: string,
    partName: string,
    color: THREE.Color,
  ) => void;
  updatePartColorName: (
    itemName: string,
    partName: string,
    colorName: string,
  ) => void;
  calculateItemPrice: (itemName: string) => void;
};

export const useOptionStore = create<State & Action>((set) => ({
  currentItemSelected: {},
  previousItemSelected: {},
  items: {
    gramps: {
      data: objects.gramps,
      animActive: false,
      optionMixed: false,
      optionSelectedList: [
        "default",
        "default",
        "default",
        "default",
        "default",
        "default",
        "default",
      ],
      optionCartList: [
        "default",
        "default",
        "default",
        "default",
        "default",
        "default",
        "default",
      ],
      optionSelectedPrice: 0,
      parts: {
        top: {
          partName: "top",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        barBottom: {
          partName: "bottom bar",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        barTop: {
          partName: "top bar",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        leg1: {
          partName: "leg 1",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        leg2: {
          partName: "leg 2",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        leg3: {
          partName: "leg 3",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        leg4: {
          partName: "leg 4",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
      },
    },
    squatter: {
      data: objects.squatter,
      animActive: false,
      optionMixed: false,
      optionSelectedList: ["default", "default", "default", "default"],
      optionCartList: ["default", "default", "default", "default"],
      optionSelectedPrice: 0,
      parts: {
        top: {
          partName: "top",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        centerPanel: {
          partName: "center panel",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        side1: {
          partName: "side 1",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        side2: {
          partName: "side 2",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
      },
    },
    block: {
      data: objects.block,
      animActive: false,
      optionMixed: false,
      optionSelectedList: [
        "default",
        "default",
        "default",
        "default",
        "default",
      ],
      optionCartList: ["default", "default", "default", "default", "default"],
      optionSelectedPrice: 0,
      parts: {
        shelfTop: {
          partName: "top shelf",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        shelfMiddle: {
          partName: "middle shelf",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        shelfBottom: {
          partName: "bottom shelf",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        side1: {
          partName: "side 1",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        side2: {
          partName: "side 2",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
      },
    },
    horse: {
      data: objects.horse,
      animActive: false,
      optionMixed: false,
      optionSelectedList: [
        "default",
        "default",
        "default",
        "default",
        "default",
        "default",
      ],
      optionCartList: [
        "default",
        "default",
        "default",
        "default",
        "default",
        "default",
      ],
      optionSelectedPrice: 0,
      parts: {
        top: {
          partName: "top",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        barInner: {
          partName: "inner bar",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        leg1: {
          partName: "leg 1",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        leg2: {
          partName: "leg 2",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        leg3: {
          partName: "leg 3",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        leg4: {
          partName: "leg 4",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
      },
    },
    shelfA16: {
      data: objects.shelfA16,
      animActive: false,
      optionMixed: false,
      optionSelectedList: ["default", "default"],
      optionCartList: ["default", "default"],
      optionSelectedPrice: 0,
      parts: {
        top: {
          partName: "top",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        bottom: {
          partName: "bottom",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        cleat: {
          partName: "cleat",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
      },
    },
    shelfA32: {
      data: objects.shelfA32,
      animActive: false,
      optionMixed: false,
      optionSelectedList: ["default", "default"],
      optionCartList: ["default", "default"],
      optionSelectedPrice: 0,
      parts: {
        top: {
          partName: "top",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        bottom: {
          partName: "bottom",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        cleat: {
          partName: "cleat",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
      },
    },
    shelfB16: {
      data: objects.shelfB16,
      animActive: false,
      optionMixed: false,
      optionSelectedList: ["default", "default", "default"],
      optionCartList: ["default", "default", "default"],
      optionSelectedPrice: 0,
      parts: {
        top: {
          partName: "top",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        middle: {
          partName: "middle",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        bottom: {
          partName: "bottom",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        cleat: {
          partName: "cleat",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
      },
    },
    shelfB32: {
      data: objects.shelfB32,
      animActive: false,
      optionMixed: false,
      optionSelectedList: ["default", "default", "default"],
      optionCartList: ["default", "default", "default"],
      optionSelectedPrice: 0,
      parts: {
        top: {
          partName: "top",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        middle: {
          partName: "middle",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        bottom: {
          partName: "bottom",
          colorType: "default",
          colorName: "default",
          color: textures.whiteStain,
          texture: textures.paintedTexture,
        },
        cleat: {
          partName: "cleat",
          colorType: "default",
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
        if (options.stains.includes(colorName)) {
          state.items[itemName].parts[partName].colorType = "stain";
        } else if (options.paints.includes(colorName)) {
          state.items[itemName].parts[partName].colorType = "paint";
        }
      }),
    ),
  updatePartTexture: (itemName, partName, texture) =>
    set(
      produce((state: State) => {
        state.items[itemName].parts[partName].texture = texture;
      }),
    ),
  calculateItemPrice: (itemName) =>
    set(
      produce((state: State) => {
        const allEqual = (arr: any[]) => arr.every((v: any) => v === arr[0]);
        let price: number = 0;
        let optionTypes: string[] = state.items[itemName].parts
          .filter((part: { partName: string }) => part.partName !== "cleat")
          .map((part: { colorType: string }) => {
            return part.colorType;
          });
        let optionCartList: string[] = state.items[itemName].parts
          .filter((part: { partName: string }) => part.partName !== "cleat")
          .map((part: { partName: any; colorName: any }) => {
            return `${part.partName}: ${part.colorName}`;
          });
        let optionSelectedList: string[] = state.items[itemName].parts
          .filter((part: { partName: string }) => part.partName !== "cleat")
          .map((part: { partName: any; colorName: any }) => {
            return part.colorName;
          });
        state.items[itemName].optionSelectedList = optionSelectedList;
        state.items[itemName].optionCartList = optionCartList;
        // check if all parts (except cleats, so check the filtered arrays) have color options selected before calculating price
        if (
          !optionTypes.includes("default") ||
          !optionSelectedList.includes("default")
        ) {
          if (optionTypes.includes("stain") && allEqual(optionTypes)) {
            state.items[itemName].optionMixed = false;
            price =
              state.items[itemName].data.itemBasePrice +
              state.items[itemName].data.itemStainCost;
          } else if (optionTypes.includes("stain") && !allEqual(optionTypes)) {
            state.items[itemName].optionMixed = true;
            price =
              state.items[itemName].data.itemBasePrice +
              state.items[itemName].data.itemMixedStainCost;
          } else if (optionTypes.includes("paint") && allEqual(optionTypes)) {
            if (allEqual(optionSelectedList)) {
              state.items[itemName].optionMixed = false;
              price = state.items[itemName].data.itemBasePrice;
            } else {
              state.items[itemName].optionMixed = true;
              price =
                state.items[itemName].data.itemBasePrice +
                state.items[itemName].data.itemMixedPaintCost;
            }
          }
        }
        state.items[itemName].optionSelectedPrice = price;
      }),
    ),
}));
