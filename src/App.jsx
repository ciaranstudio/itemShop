import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import * as THREE from "three";
import Scene from "./components/Scene.jsx";
import SelectMenu from "./components/SelectMenu.jsx";
import Placeholder from "./components/Placeholder.jsx";
// import Item from "./data/Item.jsx";
import { textures } from "./data/textures.jsx";
import { options } from "./data/options.jsx";
// import { objects } from "./data/objects.jsx";
// import { shopItems } from "./data/objects.jsx";
import { unselectedItem } from "./data/objects.jsx";
import "./style.css";
import { SnipcartProvider } from "use-snipcart";

function App() {
  const [open, setOpen] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [animActive, setAnimActive] = useState(false);

  const [currentItemSelected, setCurrentItemSelected] =
    useState(unselectedItem);
  const [previousItemSelected, setPreviousItemSelected] =
    useState(unselectedItem);
  const [currentItemOptionSelect, setCurrentItemOptionSelect] = useState("");
  const [currentItemOptionType, setCurrentItemOptionType] =
    useState("stain or paint");
  const [currentItemDescription, setCurrentItemDescription] = useState(
    unselectedItem.itemDescription,
  );
  // const [currentItemSizeSelectIndex, setCurrentItemSizeSelectIndex] =
  //   useState(0);
  // const [previousItemSizeSelectIndex, setPreviousItemSizeSelectIndex] =
  //   useState(0);
  // const [currentItemSizeSelect, setCurrentItemSizeSelect] = useState(
  //   0, // currentItemSelected.sizes[currentItemSizeSelectIndex]
  // );

  // const [currentTexture, setCurrentTexture] = useState(textures.whiteTexture);
  // const [currentColor, setCurrentColor] = useState(textures.noSelectWhite);

  // state variables for editing color and texture state of each individual furniture part (to allow mixing of finishes in single item)
  const [currentItemOptionSelectGramps, setCurrentItemOptionSelectGramps] =
    useState("");
  // const [currentItemOptionTypeGramps, setCurrentItemOptionTypeGramps] =
  //   useState("stain or paint");

  const [currentItemOptionSelectSquatter, setCurrentItemOptionSelectSquatter] =
    useState("");
  // const [currentItemOptionTypeSquatter, setCurrentItemOptionTypeSquatter] =
  //   useState("stain or paint");

  const [currentItemOptionSelectBlock, setCurrentItemOptionSelectBlock] =
    useState("");
  // const [currentItemOptionTypeBlock, setCurrentItemOptionTypeBlock] =
  //   useState("stain or paint");

  const [currentItemOptionSelectHorse, setCurrentItemOptionSelectHorse] =
    useState("");
  // const [currentItemOptionTypeHorse, setCurrentItemOptionTypeHorse] =
  //   useState("stain or paint");

  const [currentItemOptionSelectShelfA, setCurrentItemOptionSelectShelfA] =
    useState("");
  // const [currentItemOptionTypeShelfA, setCurrentItemOptionTypeShelfA] =
  //   useState("stain or paint");

  const [currentItemOptionSelectShelfB, setCurrentItemOptionSelectShelfB] =
    useState("");
  // const [currentItemOptionTypeShelfB, setCurrentItemOptionTypeShelfB] =
  //   useState("stain or paint");

  const [currentTextureGramps, setCurrentTextureGramps] = useState(
    textures.paintedTexture,
  );
  const [currentColorGramps, setCurrentColorGramps] = useState(
    textures.whiteStain,
  );

  const [currentTextureSquatter, setCurrentTextureSquatter] = useState(
    textures.paintedTexture,
  );
  const [currentColorSquatter, setCurrentColorSquatter] = useState(
    textures.whiteStain,
  );

  const [currentTextureBlock, setCurrentTextureBlock] = useState(
    textures.paintedTexture,
  );
  const [currentColorBlock, setCurrentColorBlock] = useState(
    textures.whiteStain,
  );

  const [currentTextureHorse, setCurrentTextureHorse] = useState(
    textures.paintedTexture,
  );
  const [currentColorHorse, setCurrentColorHorse] = useState(
    textures.whiteStain,
  );

  const [currentTextureShelfA, setCurrentTextureShelfA] = useState(
    textures.paintedTexture,
  );
  const [currentColorShelfA, setCurrentColorShelfA] = useState(
    textures.whiteStain,
  );

  const [currentTextureShelfB, setCurrentTextureShelfB] = useState(
    textures.paintedTexture,
  );
  const [currentColorShelfB, setCurrentColorShelfB] = useState(
    textures.whiteStain,
  );

  // const [sizeChangeToggle, setSizeChangeToggle] = useState(false);

  useEffect(() => {
    setCurrentItemDescription(currentItemSelected.itemDescription);
    if (currentItemSelected.itemName === "gramps") {
      setCurrentItemOptionSelect(currentItemOptionSelectGramps);
      if (options.stains.includes(currentItemOptionSelectGramps)) {
        setCurrentItemOptionType("stain");
      } else if (options.paints.includes(currentItemOptionSelectGramps)) {
        setCurrentItemOptionType("paint");
      }
    } else if (currentItemSelected.itemName === "squatter") {
      setCurrentItemOptionSelect(currentItemOptionSelectSquatter);
      if (options.stains.includes(currentItemOptionSelectSquatter)) {
        setCurrentItemOptionType("stain");
      } else if (options.paints.includes(currentItemOptionSelectSquatter)) {
        setCurrentItemOptionType("paint");
      }
    } else if (currentItemSelected.itemName === "block") {
      setCurrentItemOptionSelect(currentItemOptionSelectBlock);
      if (options.stains.includes(currentItemOptionSelectBlock)) {
        setCurrentItemOptionType("stain");
      } else if (options.paints.includes(currentItemOptionSelectBlock)) {
        setCurrentItemOptionType("paint");
      }
    } else if (currentItemSelected.itemName === "horse") {
      setCurrentItemOptionSelect(currentItemOptionSelectHorse);
      if (options.stains.includes(currentItemOptionSelectHorse)) {
        setCurrentItemOptionType("stain");
      } else if (options.paints.includes(currentItemOptionSelectHorse)) {
        setCurrentItemOptionType("paint");
      }
    } else if (currentItemSelected.itemName === "shelfA16") {
      setCurrentItemOptionSelect(currentItemOptionSelectShelfA);
      if (options.stains.includes(currentItemOptionSelectShelfA)) {
        setCurrentItemOptionType("stain");
      } else if (options.paints.includes(currentItemOptionSelectShelfA)) {
        setCurrentItemOptionType("paint");
      }
    } else if (currentItemSelected.itemName === "shelfA32") {
      setCurrentItemOptionSelect(currentItemOptionSelectShelfA);
      if (options.stains.includes(currentItemOptionSelectShelfA)) {
        setCurrentItemOptionType("stain");
      } else if (options.paints.includes(currentItemOptionSelectShelfA)) {
        setCurrentItemOptionType("paint");
      }
    } else if (currentItemSelected.itemName === "shelfB16") {
      setCurrentItemOptionSelect(currentItemOptionSelectShelfB);
      if (options.stains.includes(currentItemOptionSelectShelfB)) {
        setCurrentItemOptionType("stain");
      } else if (options.paints.includes(currentItemOptionSelectShelfB)) {
        setCurrentItemOptionType("paint");
      }
    } else if (currentItemSelected.itemName === "shelfB32") {
      setCurrentItemOptionSelect(currentItemOptionSelectShelfB);
      if (options.stains.includes(currentItemOptionSelectShelfB)) {
        setCurrentItemOptionType("stain");
      } else if (options.paints.includes(currentItemOptionSelectShelfB)) {
        setCurrentItemOptionType("paint");
      }
    }
    // if (currentItemSelected.sizes.length === 1) {
    //   setCurrentItemSizeSelect(currentItemSelected.sizes[0]);
    // } else if (currentItemSelected.sizes.length === 2) {
    //   setCurrentItemSizeSelect(
    //     currentItemSelected.sizes[currentItemSizeSelectIndex],
    //   );
    // }

    console.log(
      "previous item selected in useEffect[currentItemSelected]: ",
      previousItemSelected,
    );
    console.log(
      "current item selected in useEffect[currentItemSelected]: ",
      currentItemSelected,
    );
  }, [currentItemSelected]);

  // useEffect(() => {
  //   console.log(
  //     "currentItemSizeSelectIndex in useEffect[currentItemSizeSelectIndex]",
  //     currentItemSizeSelectIndex,
  //   );
  //   setCurrentItemSizeSelect(
  //     currentItemSelected.sizes[currentItemSizeSelectIndex],
  //   );
  // }, [currentItemSizeSelectIndex]);

  const handleStainChange = (event, color) => {
    event.preventDefault();
    setCurrentItemOptionSelect(color);
    setCurrentItemOptionType("stain");
    // if (color === "white") {
    //   setCurrentTexture(textures.whiteTexture);
    //   setCurrentColor(textures.whiteStain);
    // } else if (color === "natural") {
    //   setCurrentTexture(textures.naturalTexture);
    //   setCurrentColor(textures.naturalStain);
    // } else if (color === "black") {
    //   setCurrentTexture(textures.blackTexture);
    //   setCurrentColor(textures.blackStain);
    // } else if (color === "allBlack") {
    //   setCurrentTexture(textures.allBlackTexture);
    //   setCurrentColor(textures.allBlackStain);
    // }

    if (currentItemSelected.itemName === "gramps") {
      setCurrentItemOptionSelectGramps(color);
      // setCurrentItemOptionTypeGramps("stain");
      if (color === "white") {
        setCurrentTextureGramps(textures.whiteTexture);
        setCurrentColorGramps(textures.whiteStain);
      } else if (color === "natural") {
        setCurrentTextureGramps(textures.naturalTexture);
        setCurrentColorGramps(textures.naturalStain);
      } else if (color === "black") {
        setCurrentTextureGramps(textures.blackTexture);
        setCurrentColorGramps(textures.blackStain);
      } else if (color === "allBlack") {
        setCurrentTextureGramps(textures.allBlackTexture);
        setCurrentColorGramps(textures.allBlackStain);
      }
    } else if (currentItemSelected.itemName === "squatter") {
      setCurrentItemOptionSelectSquatter(color);
      // setCurrentItemOptionTypeSquatter("stain");
      if (color === "white") {
        setCurrentTextureSquatter(textures.whiteTexture);
        setCurrentColorSquatter(textures.whiteStain);
      } else if (color === "natural") {
        setCurrentTextureSquatter(textures.naturalTexture);
        setCurrentColorSquatter(textures.naturalStain);
      } else if (color === "black") {
        setCurrentTextureSquatter(textures.blackTexture);
        setCurrentColorSquatter(textures.blackStain);
      } else if (color === "allBlack") {
        setCurrentTextureSquatter(textures.allBlackTexture);
        setCurrentColorSquatter(textures.allBlackStain);
      }
    } else if (currentItemSelected.itemName === "block") {
      setCurrentItemOptionSelectBlock(color);
      // setCurrentItemOptionTypeBlock("stain");
      if (color === "white") {
        setCurrentTextureBlock(textures.whiteTexture);
        setCurrentColorBlock(textures.whiteStain);
      } else if (color === "natural") {
        setCurrentTextureBlock(textures.naturalTexture);
        setCurrentColorBlock(textures.naturalStain);
      } else if (color === "black") {
        setCurrentTextureBlock(textures.blackTexture);
        setCurrentColorBlock(textures.blackStain);
      } else if (color === "allBlack") {
        setCurrentTextureBlock(textures.allBlackTexture);
        setCurrentColorBlock(textures.allBlackStain);
      }
    } else if (currentItemSelected.itemName === "horse") {
      setCurrentItemOptionSelectHorse(color);
      // setCurrentItemOptionTypeHorse("stain");
      if (color === "white") {
        setCurrentTextureHorse(textures.whiteTexture);
        setCurrentColorHorse(textures.whiteStain);
      } else if (color === "natural") {
        setCurrentTextureHorse(textures.naturalTexture);
        setCurrentColorHorse(textures.naturalStain);
      } else if (color === "black") {
        setCurrentTextureHorse(textures.blackTexture);
        setCurrentColorHorse(textures.blackStain);
      } else if (color === "allBlack") {
        setCurrentTextureHorse(textures.allBlackTexture);
        setCurrentColorHorse(textures.allBlackStain);
      }
    } else if (currentItemSelected.itemName === "shelfA16") {
      setCurrentItemOptionSelectShelfA(color);
      // setCurrentItemOptionTypeShelfA("stain");
      if (color === "white") {
        setCurrentTextureShelfA(textures.whiteTexture);
        setCurrentColorShelfA(textures.whiteStain);
      } else if (color === "natural") {
        setCurrentTextureShelfA(textures.naturalTexture);
        setCurrentColorShelfA(textures.naturalStain);
      } else if (color === "black") {
        setCurrentTextureShelfA(textures.blackTexture);
        setCurrentColorShelfA(textures.blackStain);
      } else if (color === "allBlack") {
        setCurrentTextureShelfA(textures.allBlackTexture);
        setCurrentColorShelfA(textures.allBlackStain);
      }
    } else if (currentItemSelected.itemName === "shelfA32") {
      setCurrentItemOptionSelectShelfA(color);
      // setCurrentItemOptionTypeShelfB("stain");
      if (color === "white") {
        setCurrentTextureShelfA(textures.whiteTexture);
        setCurrentColorShelfA(textures.whiteStain);
      } else if (color === "natural") {
        setCurrentTextureShelfA(textures.naturalTexture);
        setCurrentColorShelfA(textures.naturalStain);
      } else if (color === "black") {
        setCurrentTextureShelfA(textures.blackTexture);
        setCurrentColorShelfA(textures.blackStain);
      } else if (color === "allBlack") {
        setCurrentTextureShelfA(textures.allBlackTexture);
        setCurrentColorShelfA(textures.allBlackStain);
      }
    } else if (currentItemSelected.itemName === "shelfB16") {
      setCurrentItemOptionSelectShelfB(color);
      // setCurrentItemOptionTypeShelfB("stain");
      if (color === "white") {
        setCurrentTextureShelfB(textures.whiteTexture);
        setCurrentColorShelfB(textures.whiteStain);
      } else if (color === "natural") {
        setCurrentTextureShelfB(textures.naturalTexture);
        setCurrentColorShelfB(textures.naturalStain);
      } else if (color === "black") {
        setCurrentTextureShelfB(textures.blackTexture);
        setCurrentColorShelfB(textures.blackStain);
      } else if (color === "allBlack") {
        setCurrentTextureShelfB(textures.allBlackTexture);
        setCurrentColorShelfB(textures.allBlackStain);
      }
    } else if (currentItemSelected.itemName === "shelfB32") {
      setCurrentItemOptionSelectShelfB(color);
      // setCurrentItemOptionTypeShelfB("stain");
      if (color === "white") {
        setCurrentTextureShelfB(textures.whiteTexture);
        setCurrentColorShelfB(textures.whiteStain);
      } else if (color === "natural") {
        setCurrentTextureShelfB(textures.naturalTexture);
        setCurrentColorShelfB(textures.naturalStain);
      } else if (color === "black") {
        setCurrentTextureShelfB(textures.blackTexture);
        setCurrentColorShelfB(textures.blackStain);
      } else if (color === "allBlack") {
        setCurrentTextureShelfB(textures.allBlackTexture);
        setCurrentColorShelfB(textures.allBlackStain);
      }
    }
  };

  const handlePaintChange = (event, color) => {
    event.preventDefault();
    setCurrentItemOptionSelect(color);
    setCurrentItemOptionType("paint");
    // setCurrentTexture(textures.paintTexture);
    // if (color === "alabaster") {
    //   setCurrentTexture(textures.paintTexture);
    //   setCurrentColor(textures.alabasterPaint);
    // } else if (color === "pink") {
    //   setCurrentTexture(textures.paintTexture);
    //   setCurrentColor(textures.pinkPaint);
    // } else if (color === "basil") {
    //   setCurrentTexture(textures.paintTexture);
    //   setCurrentColor(textures.basilPaint);
    // } else if (color === "yellow") {
    //   setCurrentTexture(textures.paintTexture);
    //   setCurrentColor(textures.yellowPaint);
    // } else if (color === "blue") {
    //   setCurrentTexture(textures.paintTexture);
    //   setCurrentColor(textures.bluePaint);
    // } else if (color === "gray") {
    //   setCurrentTexture(textures.paintTexture);
    //   setCurrentColor(textures.grayPaint);
    // }

    if (currentItemSelected.itemName === "gramps") {
      setCurrentItemOptionSelectGramps(color);
      // setCurrentItemOptionTypeGramps("paint");
      if (color === "alabaster") {
        setCurrentTextureGramps(textures.paintedTexture);
        setCurrentColorGramps(textures.alabasterPaint);
      } else if (color === "pink") {
        setCurrentTextureGramps(textures.paintedTexture);
        setCurrentColorGramps(textures.pinkPaint);
      } else if (color === "basil") {
        setCurrentTextureGramps(textures.paintedTexture);
        setCurrentColorGramps(textures.basilPaint);
      } else if (color === "yellow") {
        setCurrentTextureGramps(textures.paintedTexture);
        setCurrentColorGramps(textures.yellowPaint);
      } else if (color === "blue") {
        setCurrentTextureGramps(textures.paintedTexture);
        setCurrentColorGramps(textures.bluePaint);
      } else if (color === "gray") {
        setCurrentTextureGramps(textures.paintedTexture);
        setCurrentColorGramps(textures.grayPaint);
      }
    } else if (currentItemSelected.itemName === "squatter") {
      setCurrentItemOptionSelectSquatter(color);
      // setCurrentItemOptionTypeSquatter("paint");
      if (color === "alabaster") {
        // setCurrentTextureSquatter(textures.paintTexture);
        setCurrentTextureSquatter(textures.paintedTexture);
        setCurrentColorSquatter(textures.alabasterPaint);
      } else if (color === "pink") {
        setCurrentTextureSquatter(textures.paintedTexture);
        setCurrentColorSquatter(textures.pinkPaint);
      } else if (color === "basil") {
        setCurrentTextureSquatter(textures.paintedTexture);
        setCurrentColorSquatter(textures.basilPaint);
      } else if (color === "yellow") {
        setCurrentTextureSquatter(textures.paintedTexture);
        setCurrentColorSquatter(textures.yellowPaint);
      } else if (color === "blue") {
        setCurrentTextureSquatter(textures.paintedTexture);
        setCurrentColorSquatter(textures.bluePaint);
      } else if (color === "gray") {
        setCurrentTextureSquatter(textures.paintedTexture);
        setCurrentColorSquatter(textures.grayPaint);
      }
    } else if (currentItemSelected.itemName === "block") {
      setCurrentItemOptionSelectBlock(color);
      // setCurrentItemOptionTypeBlock("paint");
      if (color === "alabaster") {
        setCurrentTextureBlock(textures.paintedTexture);
        setCurrentColorBlock(textures.alabasterPaint);
      } else if (color === "pink") {
        setCurrentTextureBlock(textures.paintedTexture);
        setCurrentColorBlock(textures.pinkPaint);
      } else if (color === "basil") {
        setCurrentTextureBlock(textures.paintedTexture);
        setCurrentColorBlock(textures.basilPaint);
      } else if (color === "yellow") {
        setCurrentTextureBlock(textures.paintedTexture);
        setCurrentColorBlock(textures.yellowPaint);
      } else if (color === "blue") {
        setCurrentTextureBlock(textures.paintedTexture);
        setCurrentColorBlock(textures.bluePaint);
      } else if (color === "gray") {
        setCurrentTextureBlock(textures.paintedTexture);
        setCurrentColorBlock(textures.grayPaint);
      }
    } else if (currentItemSelected.itemName === "horse") {
      setCurrentItemOptionSelectHorse(color);
      // setCurrentItemOptionTypeHorse("paint");
      if (color === "alabaster") {
        setCurrentTextureHorse(textures.paintedTexture);
        setCurrentColorHorse(textures.alabasterPaint);
      } else if (color === "pink") {
        setCurrentTextureHorse(textures.paintedTexture);
        setCurrentColorHorse(textures.pinkPaint);
      } else if (color === "basil") {
        setCurrentTextureHorse(textures.paintedTexture);
        setCurrentColorHorse(textures.basilPaint);
      } else if (color === "yellow") {
        setCurrentTextureHorse(textures.paintedTexture);
        setCurrentColorHorse(textures.yellowPaint);
      } else if (color === "blue") {
        setCurrentTextureHorse(textures.paintedTexture);
        setCurrentColorHorse(textures.bluePaint);
      } else if (color === "gray") {
        setCurrentTextureHorse(textures.paintedTexture);
        setCurrentColorHorse(textures.grayPaint);
      }
    } else if (currentItemSelected.itemName === "shelfA16") {
      setCurrentItemOptionSelectShelfA(color);
      // setCurrentItemOptionTypeShelfA("paint");
      if (color === "alabaster") {
        setCurrentTextureShelfA(textures.paintedTexture);
        setCurrentColorShelfA(textures.alabasterPaint);
      } else if (color === "pink") {
        setCurrentTextureShelfA(textures.paintedTexture);
        setCurrentColorShelfA(textures.pinkPaint);
      } else if (color === "basil") {
        setCurrentTextureShelfA(textures.paintedTexture);
        setCurrentColorShelfA(textures.basilPaint);
      } else if (color === "yellow") {
        setCurrentTextureShelfA(textures.paintedTexture);
        setCurrentColorShelfA(textures.yellowPaint);
      } else if (color === "blue") {
        setCurrentTextureShelfA(textures.paintedTexture);
        setCurrentColorShelfA(textures.bluePaint);
      } else if (color === "gray") {
        setCurrentTextureShelfA(textures.paintedTexture);
        setCurrentColorShelfA(textures.grayPaint);
      }
    } else if (currentItemSelected.itemName === "shelfA32") {
      setCurrentItemOptionSelectShelfA(color);
      // setCurrentItemOptionTypeShelfA("paint");
      if (color === "alabaster") {
        setCurrentTextureShelfA(textures.paintedTexture);
        setCurrentColorShelfA(textures.alabasterPaint);
      } else if (color === "pink") {
        setCurrentTextureShelfA(textures.paintedTexture);
        setCurrentColorShelfA(textures.pinkPaint);
      } else if (color === "basil") {
        setCurrentTextureShelfA(textures.paintedTexture);
        setCurrentColorShelfA(textures.basilPaint);
      } else if (color === "yellow") {
        setCurrentTextureShelfA(textures.paintedTexture);
        setCurrentColorShelfA(textures.yellowPaint);
      } else if (color === "blue") {
        setCurrentTextureShelfA(textures.paintedTexture);
        setCurrentColorShelfA(textures.bluePaint);
      } else if (color === "gray") {
        setCurrentTextureShelfA(textures.paintedTexture);
        setCurrentColorShelfA(textures.grayPaint);
      }
    } else if (currentItemSelected.itemName === "shelfB16") {
      setCurrentItemOptionSelectShelfB(color);
      // setCurrentItemOptionTypeShelfB("paint");
      if (color === "alabaster") {
        setCurrentTextureShelfB(textures.paintedTexture);
        setCurrentColorShelfB(textures.alabasterPaint);
      } else if (color === "pink") {
        setCurrentTextureShelfB(textures.paintedTexture);
        setCurrentColorShelfB(textures.pinkPaint);
      } else if (color === "basil") {
        setCurrentTextureShelfB(textures.paintedTexture);
        setCurrentColorShelfB(textures.basilPaint);
      } else if (color === "yellow") {
        setCurrentTextureShelfB(textures.paintedTexture);
        setCurrentColorShelfB(textures.yellowPaint);
      } else if (color === "blue") {
        setCurrentTextureShelfB(textures.paintedTexture);
        setCurrentColorShelfB(textures.bluePaint);
      } else if (color === "gray") {
        setCurrentTextureShelfB(textures.paintedTexture);
        setCurrentColorShelfB(textures.grayPaint);
      }
    } else if (currentItemSelected.itemName === "shelfB32") {
      setCurrentItemOptionSelectShelfB(color);
      // setCurrentItemOptionTypeShelfB("paint");
      if (color === "alabaster") {
        setCurrentTextureShelfB(textures.paintedTexture);
        setCurrentColorShelfB(textures.alabasterPaint);
      } else if (color === "pink") {
        setCurrentTextureShelfB(textures.paintedTexture);
        setCurrentColorShelfB(textures.pinkPaint);
      } else if (color === "basil") {
        setCurrentTextureShelfB(textures.paintedTexture);
        setCurrentColorShelfB(textures.basilPaint);
      } else if (color === "yellow") {
        setCurrentTextureShelfB(textures.paintedTexture);
        setCurrentColorShelfB(textures.yellowPaint);
      } else if (color === "blue") {
        setCurrentTextureShelfB(textures.paintedTexture);
        setCurrentColorShelfB(textures.bluePaint);
      } else if (color === "gray") {
        setCurrentTextureShelfB(textures.paintedTexture);
        setCurrentColorShelfB(textures.grayPaint);
      }
    }
  };

  // const handleSizeChange = (event, size, index) => {
  //   event.preventDefault();
  //   setPreviousItemSizeSelectIndex(currentItemSizeSelectIndex);
  //   setCurrentItemSizeSelectIndex(index);
  //   setPreviousItemSelected(currentItemSelected);
  //   setSizeChangeToggle(!sizeChangeToggle);
  // };

  return (
    <>
      <Leva hidden oneLineLabels />
      <Canvas
        // shadows
        dpr={[1, 2]}
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{
          fov: 45, // was 60
          near: 0.1,
          far: 1100,
          // near: 0.1,
          // far: 5000,
          // relative to current selected item position
          // position: [
          //   currentItemSelected.position.x * 3,
          //   currentItemSelected.position.y + 10 * 3,
          //   currentItemSelected.position.z * 3,
          // ],
          // decent close up position that still shows all models at a diamond angle to group
          // position: [50, 25, -70],
          // good far away angle looking into open wall side of scene
          position: [350, 200, -300],
        }}
      >
        <Suspense fallback={<Placeholder />}>
          <Scene
            open={open}
            setOpen={setOpen}
            toggled={toggled}
            setToggled={setToggled}
            animActive={animActive}
            setAnimActive={setAnimActive}
            // shopItems={shopItems}
            currentItemSelected={currentItemSelected}
            setCurrentItemSelected={setCurrentItemSelected}
            previousItemSelected={previousItemSelected}
            setPreviousItemSelected={setPreviousItemSelected}
            // previousItemSizeSelectIndex={previousItemSizeSelectIndex}
            // setPreviousItemSizeSelectIndex={setPreviousItemSizeSelectIndex}
            // currentItemSizeSelectIndex={currentItemSizeSelectIndex}
            // setCurrentItemSizeSelectIndex={setCurrentItemSizeSelectIndex}
            // currentTexture={currentTexture}
            // currentColor={currentColor}
            // currentTextureFloor={currentTextureFloor}
            // currentColorFloor={currentColorFloor}
            // currentTextureWalls={currentTextureWalls}
            // currentColorWalls={currentColorWalls}
            currentTextureGramps={currentTextureGramps}
            currentColorGramps={currentColorGramps}
            currentTextureSquatter={currentTextureSquatter}
            currentColorSquatter={currentColorSquatter}
            currentTextureBlock={currentTextureBlock}
            currentColorBlock={currentColorBlock}
            currentTextureHorse={currentTextureHorse}
            currentColorHorse={currentColorHorse}
            currentTextureShelfA={currentTextureShelfA}
            currentColorShelfA={currentColorShelfA}
            currentTextureShelfB={currentTextureShelfB}
            currentColorShelfB={currentColorShelfB}
            // currentItemOptionSelectGramps={currentItemOptionSelectGramps}
            // currentItemOptionTypeGramps={currentItemOptionTypeGramps}
            // currentItemOptionSelectSquatter={currentItemOptionSelectSquatter}
            // currentItemOptionTypeSquatter={currentItemOptionTypeSquatter}
            // currentItemOptionSelectBlock={currentItemOptionSelectBlock}
            // currentItemOptionTypeBlock={currentItemOptionTypeBlock}
            // currentItemOptionSelectHorse={currentItemOptionSelectHorse}
            // currentItemOptionTypeHorse={currentItemOptionTypeHorse}
            // currentItemOptionSelectShelfA={currentItemOptionSelectShelfA}
            // currentItemOptionTypeShelfA={currentItemOptionTypeShelfA}
            // currentItemOptionSelectShelfB={currentItemOptionSelectShelfB}
            // currentItemOptionTypeShelfB={currentItemOptionTypeShelfB}
            // sizeChangeToggle={sizeChangeToggle}
          />
        </Suspense>
      </Canvas>
      <SnipcartProvider>
        <SelectMenu
          toggled={toggled}
          setToggled={setToggled}
          animActive={animActive}
          open={open}
          setOpen={setOpen}
          handleStainChange={handleStainChange}
          handlePaintChange={handlePaintChange}
          // handleSizeChange={handleSizeChange}
          // shopItems={shopItems}
          currentItemSelected={currentItemSelected}
          setCurrentItemSelected={setCurrentItemSelected}
          setPreviousItemSelected={setPreviousItemSelected}
          currentItemOptionSelect={currentItemOptionSelect}
          currentItemOptionType={currentItemOptionType}
          currentItemDescription={currentItemDescription}
          // currentTextureGramps={currentTextureGramps}
          // currentColorGramps={currentColorGramps}
          // currentTextureSquatter={currentTextureSquatter}
          // currentColorSquatter={currentColorSquatter}
          // currentTextureBlock={currentTextureBlock}
          // currentColorBlock={currentColorBlock}
          // currentTextureHorse={currentTextureHorse}
          // currentColorHorse={currentColorHorse}
          // currentTextureShelfA={currentTextureShelfA}
          // currentColorShelfA={currentColorShelfA}
          // currentTextureShelfB={currentTextureShelfB}
          // currentColorShelfB={currentColorShelfB}
          // currentItemOptionSelectGramps={currentItemOptionSelectGramps}
          // currentItemOptionTypeGramps={currentItemOptionTypeGramps}
          // currentItemOptionSelectSquatter={currentItemOptionSelectSquatter}
          // currentItemOptionTypeSquatter={currentItemOptionTypeSquatter}
          // currentItemOptionSelectBlock={currentItemOptionSelectBlock}
          // currentItemOptionTypeBlock={currentItemOptionTypeBlock}
          // currentItemOptionSelectHorse={currentItemOptionSelectHorse}
          // currentItemOptionTypeHorse={currentItemOptionTypeHorse}
          // currentItemOptionSelectShelfA={currentItemOptionSelectShelfA}
          // currentItemOptionTypeShelfA={currentItemOptionTypeShelfA}
          // currentItemOptionSelectShelfB={currentItemOptionSelectShelfB}
          // currentItemOptionTypeShelfB={currentItemOptionTypeShelfB}
          // currentItemSizeSelect={currentItemSizeSelect}
          // currentItemSizeSelectIndex={currentItemSizeSelectIndex}
          // setPreviousItemSizeSelectIndex={setPreviousItemSizeSelectIndex}
          // setCurrentItemSizeSelectIndex={setCurrentItemSizeSelectIndex}
          // options.stains={options.stains}
          // options.paints={options.paints}
        />
      </SnipcartProvider>
    </>
  );
}

export default App;
