import { create } from "zustand";
import { produce } from "immer";
import * as THREE from "three";
import { textures } from "../data/textures.jsx";
import { options } from "../data/options.jsx";
import { objects, unselectedItem } from "../data/objects.jsx";
import Item from "../data/Item.jsx";

type State = {
  currentItemSelected: Item;
  previousItemSelected: Item;
  currentPartName: string;
  currentItemName: string;
  mobileView: boolean;
  sceneLoaded: boolean;
  open: boolean;
  showPhotos: boolean;
  allPhotos: boolean;
  aboutInfo: boolean;
  optionBoxHeightMin: boolean;
  showBackground: boolean;
  showPartOptions: boolean;
  optionBoxItemChanged: boolean;
  optionBoxItemToggle: boolean;
  animToggled: boolean;
  animActive: boolean;
  activeCamPosAnim: boolean;
  activeCamTargAnim: boolean;
  activeCamAnim: boolean;
  partsOpen: boolean;
  animIconToggle: boolean;
  animateButton: boolean;
  arrowAnimActive: boolean;
  items: {
    gramps: {
      data: {};
      animActive: boolean;
      stainSingle: boolean;
      stainMixed: boolean;
      stainPaintMixed: boolean;
      paintSingle: boolean;
      paintMixed: boolean;
      snipCartOption: string;
      snipCartOptionDesc: string;
      optionColorNameList: string[];
      optionCompleteList: string[];
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
      stainSingle: boolean;
      stainMixed: boolean;
      stainPaintMixed: boolean;
      paintSingle: boolean;
      paintMixed: boolean;
      snipCartOption: string;
      snipCartOptionDesc: string;
      optionColorNameList: string[];
      optionCompleteList: string[];
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
      stainSingle: boolean;
      stainMixed: boolean;
      stainPaintMixed: boolean;
      paintSingle: boolean;
      paintMixed: boolean;
      snipCartOption: string;
      snipCartOptionDesc: string;
      optionColorNameList: string[];
      optionCompleteList: string[];
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
      stainSingle: boolean;
      stainMixed: boolean;
      stainPaintMixed: boolean;
      paintSingle: boolean;
      paintMixed: boolean;
      snipCartOption: string;
      snipCartOptionDesc: string;
      optionColorNameList: string[];
      optionCompleteList: string[];
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
      stainSingle: boolean;
      stainMixed: boolean;
      stainPaintMixed: boolean;
      paintSingle: boolean;
      paintMixed: boolean;
      snipCartOption: string;
      snipCartOptionDesc: string;
      optionColorNameList: string[];
      optionCompleteList: string[];
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
      stainSingle: boolean;
      stainMixed: boolean;
      stainPaintMixed: boolean;
      paintSingle: boolean;
      paintMixed: boolean;
      snipCartOption: string;
      snipCartOptionDesc: string;
      optionColorNameList: string[];
      optionCompleteList: string[];
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
      stainSingle: boolean;
      stainMixed: boolean;
      stainPaintMixed: boolean;
      paintSingle: boolean;
      paintMixed: boolean;
      snipCartOption: string;
      snipCartOptionDesc: string;
      optionColorNameList: string[];
      optionCompleteList: string[];
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
      stainSingle: boolean;
      stainMixed: boolean;
      stainPaintMixed: boolean;
      paintSingle: boolean;
      paintMixed: boolean;
      snipCartOption: string;
      snipCartOptionDesc: string;
      optionColorNameList: string[];
      optionCompleteList: string[];
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
  setCurrentItemSelected: (item: Item) => void;
  setPreviousItemSelected: (item: Item) => void;
  setCurrentPartName: (partName: string) => void;
  setCurrentItemName: (itemName: string) => void;
  setMobileView: (value: boolean) => void;
  setSceneLoaded: (value: boolean) => void;
  setOpen: (value: boolean) => void;
  setShowPhotos: (value: boolean) => void;
  setAllPhotos: (value: boolean) => void;
  setAboutInfo: (value: boolean) => void;
  setOptionBoxHeightMin: (value: boolean) => void;
  setShowBackground: (value: boolean) => void;
  setShowPartOptions: (value: boolean) => void;
  setOptionBoxItemChanged: (value: boolean) => void;
  setOptionBoxItemToggle: (value: boolean) => void;
  setAnimToggled: (value: boolean) => void;
  setAnimActive: (value: boolean) => void;
  setActiveCamPosAnim: (value: boolean) => void;
  setActiveCamTargAnim: (value: boolean) => void;
  setActiveCamAnim: (value: boolean) => void;
  setPartsOpen: (value: boolean) => void;
  setAnimIconToggle: (value: boolean) => void;
  setAnimateButton: (value: boolean) => void;
  getRandomInt: (max: number) => number;
  setArrowAnimActive: (value: boolean) => void;
};

export const useOptionStore = create<State & Action>((set) => ({
  currentItemSelected: unselectedItem,
  previousItemSelected: unselectedItem,
  currentPartName: "top",
  currentItemName: "gramps",
  mobileView: false,
  sceneLoaded: false,
  open: false,
  showPhotos: false,
  allPhotos: false,
  aboutInfo: false,
  optionBoxHeightMin: false,
  showBackground: true,
  showPartOptions: false,
  optionBoxItemChanged: false,
  optionBoxItemToggle: false,
  animToggled: false,
  animActive: false,
  activeCamPosAnim: false,
  activeCamTargAnim: false,
  activeCamAnim: false,
  partsOpen: false,
  animIconToggle: false,
  animateButton: false,
  arrowAnimActive: false,
  items: {
    gramps: {
      data: objects.gramps,
      animActive: false,
      stainSingle: false,
      stainMixed: false,
      stainPaintMixed: false,
      paintSingle: false,
      paintMixed: false,
      snipCartOption: "default",
      snipCartOptionDesc: "default",
      optionColorNameList: [
        "default",
        "default",
        "default",
        "default",
        "default",
        "default",
        "default",
      ],
      optionCompleteList: [
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
      stainSingle: false,
      stainMixed: false,
      stainPaintMixed: false,
      paintSingle: false,
      paintMixed: false,
      snipCartOption: "default",
      snipCartOptionDesc: "default",
      optionColorNameList: ["default", "default", "default", "default"],
      optionCompleteList: ["default", "default", "default", "default"],
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
      stainSingle: false,
      stainMixed: false,
      stainPaintMixed: false,
      paintSingle: false,
      paintMixed: false,
      snipCartOption: "default",
      snipCartOptionDesc: "default",
      optionColorNameList: [
        "default",
        "default",
        "default",
        "default",
        "default",
      ],
      optionCompleteList: [
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
      stainSingle: false,
      stainMixed: false,
      stainPaintMixed: false,
      paintSingle: false,
      paintMixed: false,
      snipCartOption: "default",
      snipCartOptionDesc: "default",
      optionColorNameList: [
        "default",
        "default",
        "default",
        "default",
        "default",
        "default",
      ],
      optionCompleteList: [
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
      stainSingle: false,
      stainMixed: false,
      stainPaintMixed: false,
      paintSingle: false,
      paintMixed: false,
      snipCartOption: "default",
      snipCartOptionDesc: "default",
      optionColorNameList: ["default", "default"],
      optionCompleteList: ["default", "default"],
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
      stainSingle: false,
      stainMixed: false,
      stainPaintMixed: false,
      paintSingle: false,
      paintMixed: false,
      snipCartOption: "default",
      snipCartOptionDesc: "default",
      optionColorNameList: ["default", "default"],
      optionCompleteList: ["default", "default"],
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
      stainSingle: false,
      stainMixed: false,
      stainPaintMixed: false,
      paintSingle: false,
      paintMixed: false,
      snipCartOption: "default",
      snipCartOptionDesc: "default",
      optionColorNameList: ["default", "default", "default"],
      optionCompleteList: ["default", "default", "default"],
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
      stainSingle: false,
      stainMixed: false,
      stainPaintMixed: false,
      paintSingle: false,
      paintMixed: false,
      snipCartOption: "default",
      snipCartOptionDesc: "default",
      optionColorNameList: ["default", "default", "default"],
      optionCompleteList: ["default", "default", "default"],
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
  calculateItemPrice: (itemName) =>
    set(
      produce((state: State) => {
        let price: number = state.items[itemName].optionSelectedPrice;
        const allEqual = (arr: any[]) => arr.every((v: any) => v === arr[0]);
        let arrayItemParts: any[] = Object.values(state.items[itemName].parts);
        let optionTypes: string[] = arrayItemParts
          .filter((part: { partName: string }) => part.partName !== "cleat")
          .map((part: { colorType: string }) => {
            return part.colorType;
          });
        let optionCartList: string[] = arrayItemParts
          .filter((part: { partName: string }) => part.partName !== "cleat")
          .map((part: { partName: any; colorName: any }) => {
            let type = "";
            if (options.stains.includes(part.colorName)) {
              type = "stain";
            } else if (options.paints.includes(part.colorName)) {
              type = "paint";
            }
            return ` ${part.partName}: ${part.colorName} ${type} `;
          });
        let optionSelectedList: string[] = arrayItemParts
          .filter((part: { partName: string }) => part.partName !== "cleat")
          .map((part: { partName: any; colorName: any }) => {
            return part.colorName;
          });

        state.items[itemName].optionColorNameList = optionSelectedList;
        state.items[itemName].optionCompleteList = arrayItemParts;
        state.items[itemName].optionCartList = optionCartList;

        if (
          !optionTypes.includes("default") ||
          !optionSelectedList.includes("default")
        ) {
          if (optionTypes.includes("stain") && allEqual(optionTypes)) {
            if (allEqual(optionSelectedList)) {
              state.items[itemName].stainSingle = true;
              state.items[itemName].stainMixed = false;
              state.items[itemName].stainPaintMixed = false;
              state.items[itemName].paintSingle = false;
              state.items[itemName].paintMixed = false;
              state.items[itemName].snipCartOptionDesc = "Single stain";
              state.items[itemName].snipCartOption = "singleStain";
              price =
                state.items[itemName].data.itemBasePrice +
                state.items[itemName].data.itemStainCost;
            } else if (!allEqual(optionSelectedList)) {
              state.items[itemName].stainSingle = false;
              state.items[itemName].stainMixed = true;
              state.items[itemName].stainPaintMixed = false;
              state.items[itemName].paintSingle = false;
              state.items[itemName].paintMixed = false;
              state.items[itemName].snipCartOptionDesc = "Mixed stain";
              state.items[itemName].snipCartOption = "mixedStain";
              price =
                state.items[itemName].data.itemBasePrice +
                state.items[itemName].data.itemStainCost;
            }
          } else if (optionTypes.includes("stain") && !allEqual(optionTypes)) {
            state.items[itemName].stainSingle = false;
            state.items[itemName].stainMixed = false;
            state.items[itemName].stainPaintMixed = true;
            state.items[itemName].paintSingle = false;
            state.items[itemName].paintMixed = false;
            state.items[itemName].snipCartOptionDesc = "Mixed stain and paint";
            state.items[itemName].snipCartOption = "mixedStainPaint";
            price =
              state.items[itemName].data.itemBasePrice +
              state.items[itemName].data.itemMixedStainCost;
          } else if (optionTypes.includes("paint") && allEqual(optionTypes)) {
            if (allEqual(optionSelectedList)) {
              state.items[itemName].stainSingle = false;
              state.items[itemName].stainMixed = false;
              state.items[itemName].stainPaintMixed = false;
              state.items[itemName].paintSingle = true;
              state.items[itemName].paintMixed = false;
              state.items[itemName].snipCartOptionDesc = "Single paint";
              state.items[itemName].snipCartOption = "singlePaint";
              price = state.items[itemName].data.itemBasePrice;
            } else if (!allEqual(optionSelectedList)) {
              state.items[itemName].stainSingle = false;
              state.items[itemName].stainMixed = false;
              state.items[itemName].stainPaintMixed = false;
              state.items[itemName].paintSingle = false;
              state.items[itemName].paintMixed = true;
              state.items[itemName].snipCartOptionDesc = "Mixed paint";
              state.items[itemName].snipCartOption = "mixedPaint";
              price =
                state.items[itemName].data.itemBasePrice +
                state.items[itemName].data.itemMixedPaintCost;
            }
          }
        }
        state.items[itemName].optionSelectedPrice = price;
      }),
    ),
  updatePartColor: (itemName, partName, color) =>
    set(
      produce((state: State) => {
        state.items[itemName].parts[partName].color = color;
      }),
    ),
  updatePartColorName: (itemName, partName, colorName) =>
    set(
      produce((state: State & Action) => {
        // console.log(
        //   "state.items[itemName].optionSelectedPrice: ",
        //   state.items[itemName].optionSelectedPrice,
        // );
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
  setCurrentItemSelected: (item) =>
    set(
      produce((state: State) => {
        state.currentItemSelected = item;
      }),
    ),
  setPreviousItemSelected: (item) =>
    set(
      produce((state: State) => {
        state.previousItemSelected = item;
      }),
    ),
  setCurrentPartName: (partName) =>
    set(
      produce((state: State) => {
        state.currentPartName = partName;
      }),
    ),
  setCurrentItemName: (itemName) =>
    set(
      produce((state: State) => {
        state.currentItemName = itemName;
      }),
    ),
  setMobileView: (value) =>
    set(
      produce((state: State) => {
        state.mobileView = value;
      }),
    ),
  setSceneLoaded: (value) =>
    set(
      produce((state: State) => {
        state.sceneLoaded = value;
      }),
    ),
  setOpen: (value) =>
    set(
      produce((state: State) => {
        state.open = value;
      }),
    ),
  setShowPhotos: (value) =>
    set(
      produce((state: State) => {
        state.showPhotos = value;
      }),
    ),
  setAllPhotos: (value) =>
    set(
      produce((state: State) => {
        state.allPhotos = value;
      }),
    ),
  setAboutInfo: (value) =>
    set(
      produce((state: State) => {
        state.aboutInfo = value;
      }),
    ),
  setOptionBoxHeightMin: (value) =>
    set(
      produce((state: State) => {
        state.optionBoxHeightMin = value;
      }),
    ),
  setShowBackground: (value) =>
    set(
      produce((state: State) => {
        state.showBackground = value;
      }),
    ),
  setShowPartOptions: (value) =>
    set(
      produce((state: State) => {
        state.showPartOptions = value;
      }),
    ),
  setOptionBoxItemChanged: (value) =>
    set(
      produce((state: State) => {
        state.optionBoxItemChanged = value;
      }),
    ),
  setOptionBoxItemToggle: (value) =>
    set(
      produce((state: State) => {
        state.optionBoxItemToggle = value;
      }),
    ),
  setAnimToggled: (value) =>
    set(
      produce((state: State) => {
        state.animToggled = value;
      }),
    ),
  setAnimActive: (value) =>
    set(
      produce((state: State) => {
        state.animActive = value;
      }),
    ),
  setActiveCamPosAnim: (value) =>
    set(
      produce((state: State) => {
        state.activeCamPosAnim = value;
      }),
    ),
  setActiveCamTargAnim: (value) =>
    set(
      produce((state: State) => {
        state.activeCamTargAnim = value;
      }),
    ),
  setActiveCamAnim: (value) =>
    set(
      produce((state: State) => {
        state.activeCamAnim = value;
      }),
    ),
  setPartsOpen: (value) =>
    set(
      produce((state: State) => {
        state.partsOpen = value;
      }),
    ),
  setAnimIconToggle: (value) =>
    set(
      produce((state: State) => {
        state.animIconToggle = value;
      }),
    ),
  setAnimateButton: (value) =>
    set(
      produce((state: State) => {
        state.animateButton = value;
      }),
    ),
  getRandomInt: (max) => {
    return Math.floor(Math.random() * max);
  },
  setArrowAnimActive: (value) =>
    set(
      produce((state: State) => {
        state.arrowAnimActive = value;
      }),
    ),
}));
