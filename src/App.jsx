import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import * as THREE from "three";
import Scene from "./components/Scene.jsx";
import SelectMenu from "./components/SelectMenu.jsx";
import Placeholder from "./components/Placeholder.jsx";
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

  const [currentItemOptionSelectGramps, setCurrentItemOptionSelectGramps] =
    useState("");
  const [currentItemOptionSelectSquatter, setCurrentItemOptionSelectSquatter] =
    useState("");
  const [currentItemOptionSelectBlock, setCurrentItemOptionSelectBlock] =
    useState("");
  const [currentItemOptionSelectHorse, setCurrentItemOptionSelectHorse] =
    useState("");
  const [currentItemOptionSelectShelfA, setCurrentItemOptionSelectShelfA] =
    useState("");
  const [currentItemOptionSelectShelfB, setCurrentItemOptionSelectShelfB] =
    useState("");

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
    // console.log(
    //   "previous item selected in useEffect[currentItemSelected]: ",
    //   previousItemSelected,
    // );
    // console.log(
    //   "current item selected in useEffect[currentItemSelected]: ",
    //   currentItemSelected,
    // );
  }, [currentItemSelected]);

  const handleStainChange = (event, color) => {
    event.preventDefault();
    setCurrentItemOptionSelect(color);
    setCurrentItemOptionType("stain");

    if (currentItemSelected.itemName === "gramps") {
      setCurrentItemOptionSelectGramps(color);
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

    if (currentItemSelected.itemName === "gramps") {
      setCurrentItemOptionSelectGramps(color);
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
      if (color === "alabaster") {
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

  return (
    <>
      <Leva hidden oneLineLabels />
      <Canvas
        dpr={[1, 2]}
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 1100,
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
            currentItemSelected={currentItemSelected}
            setCurrentItemSelected={setCurrentItemSelected}
            previousItemSelected={previousItemSelected}
            setPreviousItemSelected={setPreviousItemSelected}
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
          currentItemSelected={currentItemSelected}
          setCurrentItemSelected={setCurrentItemSelected}
          setPreviousItemSelected={setPreviousItemSelected}
          currentItemOptionSelect={currentItemOptionSelect}
          currentItemOptionType={currentItemOptionType}
          currentItemDescription={currentItemDescription}
        />
      </SnipcartProvider>
    </>
  );
}

export default App;
