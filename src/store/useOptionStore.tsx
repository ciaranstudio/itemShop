import { create } from "zustand";
import { produce } from "immer";
import * as THREE from "three";
import { textures } from "../data/textures.jsx";
import { options } from "../data/options.jsx";
import { objects } from "../data/objects.jsx";

// // (from App component)
// // move these to store:
// const [mobileView, setMobileView] = useState(false);
// const [open, setOpen] = useState(false);
// // const [infoBoxIcon, setInfoBoxIcon] = useState(true);
// const [showPhotos, setShowPhotos] = useState(false);
// const [allPhotos, setAllPhotos] = useState(false);
// const [aboutInfo, setAboutInfo] = useState(false);
// const [optionBoxHeightMin, setOptionBoxHeightMin] = useState(false);
// const [showBackground, setShowBackground] = useState(true);
// const [showPartOptions, setShowPartOptions] = useState(false);
// const [currentItemSelected, setCurrentItemSelected] = useState(unselectedItem);
// const [previousItemSelected, setPreviousItemSelected] =
//   useState(unselectedItem);
// const [optionBoxItemChanged, setOptionBoxItemChanged] = useState(false);
// const [optionBoxItemToggle, setOptionBoxItemToggle] = useState(false);
// const [animToggled, setAnimToggled] = useState(false);
// const [animActive, setAnimActive] = useState(false);
// const [activeCamPosAnim, setActiveCamPosAnim] = useState(false);
// const [activeCamTargAnim, setActiveCamTargAnim] = useState(false);
// const [activeCamAnim, setActiveCamAnim] = useState(false);
// const [partsOpen, setPartsOpen] = useState(false);
// const [stagePosY, setStagePosY] = useState(yPosRunLowTarg);
// const [animIconToggle, setAnimIconToggle] = useState(false);
// // move these to store ^

// // (from Scene component)
// // move these to store:
// const [currentPartName, setCurrentPartName] = useState("top");
// const [currentItemName, setCurrentItemName] = useState("gramps");
// // move these to store ^

type State = {
  currentItemSelected: {};
  previousItemSelected: {};
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
};

export const useOptionStore = create<State & Action>((set) => ({
  currentItemSelected: {},
  previousItemSelected: {},
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
}));
