import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import * as THREE from "three";
import Scene from "./components/Scene.jsx";
import SelectMenu from "./components/SelectMenu.jsx";
import Placeholder from "./components/Placeholder.jsx";
import Item from "./data/Item.jsx";
import { textures } from "./data/textures.jsx";
import "./style.css";
import { SnipcartProvider } from "use-snipcart";

function App() {
  const [open, setOpen] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [animActive, setAnimActive] = useState(false);

  const grampSizes = ["16 x 16 x 18"]; //LDH
  const squatterSizes = ["16 x 12 x 18"]; //LDH
  const blockSizes = ["8 x 8 x 16"]; //LDH
  const horseSizes = ["32 x 20 x 32"]; //LDH
  const shelfASizes = ["16 x 4 x 4", "32 x 4 x 4"]; //LDH
  const shelfBSizes = ["16 x 6 x 4", "32 x 6 x 4"]; //LDH

  const grampsPosition = [
    { x: 0, y: 0, z: 70 },
    { x: 0, y: 0, z: 0 },
  ];
  const squatterPosition = [
    { x: -70, y: 0, z: 0 },
    { x: 1, y: 1, z: 1 },
  ];
  const blockPosition = [
    { x: 0, y: 0, z: -70 },
    { x: 2, y: 2, z: 2 },
  ];
  const horsePosition = [
    { x: 70, y: 0, z: 0 },
    { x: 3, y: 3, z: 3 },
  ];
  const shelfAPosition = [
    { x: -118.3125, y: 0, z: -81.125 },
    { x: -118.3125, y: 0, z: -40.6 },
  ];
  const shelfBPosition = [
    { x: 33.685, y: 0, z: 118.25 },
    { x: 73.685, y: 0, z: 118.25 },
  ];

  const unselectedItem = new Item(
    "noSelect", // itemName
    "", // itemNo
    "noSelectTitle", // itemTitle
    "Select item", // itemDescription
    0, // itemBasePrice
    0, // itemStainCost
    0, // itemPaintCost
    0, // sizeCost
    [], // sizes
    { x: 0, y: 1, z: 0 }, // positionA
    { x: 0, y: 2, z: 0 }, // positionB
    [0],
  );

  const gramps = new Item(
    "gramps", // itemName
    0, // itemNo
    "GRAMPS", // itemTitle
    "Handmade stool", // itemDescription
    750, // itemBasePrice
    150, // itemStainCost
    0, // itemPaintCost
    0, // sizeCost
    grampSizes, // sizes
    grampsPosition[0], // positionA
    grampsPosition[1], // positionB
    [0, 1, 2, 3, 4, 5, 6],
  );

  const squatter = new Item(
    "squatter", // itemName
    1, // itemNo
    "SQUATTER", // itemTitle
    "Handmade end table", // itemDescription
    600, // itemBasePrice
    100, // itemStainCost
    0, // itemPaintCost
    0, // sizeCost
    squatterSizes, // sizes
    squatterPosition[0], // positionA
    squatterPosition[1], // positionB
    [0, 1, 2, 3],
  );

  const block = new Item(
    "block", // itemName
    2, // itemNo
    "BLOCK", // itemTitle
    "Handmade room block", // itemDescription
    250, // itemBasePrice
    150, // itemStainCost
    0, // itemPaintCost
    0, // sizeCost
    blockSizes, // sizes
    blockPosition[0], // positionA
    blockPosition[1], // positionB
    [0, 1, 2, 3, 4],
  );

  const horse = new Item(
    "horse", // itemName
    3, // itemNo
    "HORSE", // itemTitle
    "Handmade saw horse", // itemDescription
    400, // itemBasePrice
    100, // itemStainCost
    0, // itemPaintCost
    0, // sizeCost
    horseSizes, // sizes
    horsePosition[0], // positionA
    horsePosition[1], // positionB
    [0, 1, 2, 3, 4, 5],
  );

  const shelfA = new Item(
    "shelfA", // itemName
    4, // itemNo
    `\\SHELF/`, // itemTitle
    "Handmade angle shelf", // itemDescription
    350, // itemBasePrice
    50, // itemStainCost
    0, // itemPaintCost
    200, // sizeCost
    shelfASizes, // sizes
    shelfAPosition[0], // positionA
    shelfAPosition[1],
    [0, 1],
  );

  const shelfB = new Item(
    "shelfB", // itemName
    5, // itemNo
    "(SHELF)", // itemTitle
    "Handmade block shelf", // itemDescription
    350, // itemBasePrice
    50, // itemStainCost
    0, // itemPaintCost
    200, // sizeCost
    shelfBSizes, // sizes
    shelfBPosition[0], // positionA
    shelfBPosition[1], // positionB
    [0, 1],
  );

  const shopItems = [gramps, squatter, block, horse, shelfA, shelfB];

  const [currentItemSelected, setCurrentItemSelected] =
    useState(unselectedItem);
  const [previousItemSelected, setPreviousItemSelected] =
    useState(unselectedItem);
  const [currentItemOptionSelect, setCurrentItemOptionSelect] = useState("");
  const [currentItemOptionType, setCurrentItemOptionType] =
    useState("stain or paint");
  const [currentItemDescription, setCurrentItemDescription] = useState(
    gramps.itemDescription,
  );
  const [currentItemSizeSelectIndex, setCurrentItemSizeSelectIndex] =
    useState(0);
  const [previousItemSizeSelectIndex, setPreviousItemSizeSelectIndex] =
    useState(0);
  const [currentItemSizeSelect, setCurrentItemSizeSelect] = useState(
    0, // currentItemSelected.sizes[currentItemSizeSelectIndex]
  );

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

  const [currentTextureFloor, setCurrentTextureFloor] = useState(
    textures.portlandConcreteTexture,
  );
  const [currentColorFloor, setCurrentColorFloor] = useState(
    textures.concreteFloor,
  );

  const [currentTextureWalls, setCurrentTextureWalls] = useState(
    textures.paintedTexture,
  );
  const [currentColorWalls, setCurrentColorWalls] = useState(
    textures.whiteStain,
  );

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

  const [sizeChangeToggle, setSizeChangeToggle] = useState(false);

  const stainsList = ["white", "natural", "black", "allBlack"];
  const paintsList = ["alabaster", "pink", "basil", "yellow", "blue", "gray"];

  useEffect(() => {
    setCurrentItemDescription(currentItemSelected.itemDescription);
    if (currentItemSelected.itemNo === 0) {
      setCurrentItemOptionSelect(currentItemOptionSelectGramps);
      if (stainsList.includes(currentItemOptionSelectGramps)) {
        setCurrentItemOptionType("stain");
      } else if (paintsList.includes(currentItemOptionSelectGramps)) {
        setCurrentItemOptionType("paint");
      }
    } else if (currentItemSelected.itemNo === 1) {
      setCurrentItemOptionSelect(currentItemOptionSelectSquatter);
      if (stainsList.includes(currentItemOptionSelectSquatter)) {
        setCurrentItemOptionType("stain");
      } else if (paintsList.includes(currentItemOptionSelectSquatter)) {
        setCurrentItemOptionType("paint");
      }
    } else if (currentItemSelected.itemNo === 2) {
      setCurrentItemOptionSelect(currentItemOptionSelectBlock);
      if (stainsList.includes(currentItemOptionSelectBlock)) {
        setCurrentItemOptionType("stain");
      } else if (paintsList.includes(currentItemOptionSelectBlock)) {
        setCurrentItemOptionType("paint");
      }
    } else if (currentItemSelected.itemNo === 3) {
      setCurrentItemOptionSelect(currentItemOptionSelectHorse);
      if (stainsList.includes(currentItemOptionSelectHorse)) {
        setCurrentItemOptionType("stain");
      } else if (paintsList.includes(currentItemOptionSelectHorse)) {
        setCurrentItemOptionType("paint");
      }
    } else if (currentItemSelected.itemNo === 4) {
      setCurrentItemOptionSelect(currentItemOptionSelectShelfA);
      if (stainsList.includes(currentItemOptionSelectShelfA)) {
        setCurrentItemOptionType("stain");
      } else if (paintsList.includes(currentItemOptionSelectShelfA)) {
        setCurrentItemOptionType("paint");
      }
    } else if (currentItemSelected.itemNo === 5) {
      setCurrentItemOptionSelect(currentItemOptionSelectShelfB);
      if (stainsList.includes(currentItemOptionSelectShelfB)) {
        setCurrentItemOptionType("stain");
      } else if (paintsList.includes(currentItemOptionSelectShelfB)) {
        setCurrentItemOptionType("paint");
      }
    }
    if (currentItemSelected.sizes.length === 1) {
      setCurrentItemSizeSelect(currentItemSelected.sizes[0]);
    } else if (currentItemSelected.sizes.length === 2) {
      setCurrentItemSizeSelect(
        currentItemSelected.sizes[currentItemSizeSelectIndex],
      );
    }

    console.log(
      "previous item selected in useEffect[currentItemSelected]: ",
      previousItemSelected,
    );
    console.log(
      "current item selected in useEffect[currentItemSelected]: ",
      currentItemSelected,
    );
  }, [currentItemSelected]);

  useEffect(() => {
    console.log(
      "currentItemSizeSelectIndex in useEffect[currentItemSizeSelectIndex]",
      currentItemSizeSelectIndex,
    );
    setCurrentItemSizeSelect(
      currentItemSelected.sizes[currentItemSizeSelectIndex],
    );
  }, [currentItemSizeSelectIndex]);

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

    if (currentItemSelected.itemNo === 0) {
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
    } else if (currentItemSelected.itemNo === 1) {
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
    } else if (currentItemSelected.itemNo === 2) {
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
    } else if (currentItemSelected.itemNo === 3) {
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
    } else if (currentItemSelected.itemNo === 4) {
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
    } else if (currentItemSelected.itemNo === 5) {
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

    if (currentItemSelected.itemNo === 0) {
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
    } else if (currentItemSelected.itemNo === 1) {
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
    } else if (currentItemSelected.itemNo === 2) {
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
    } else if (currentItemSelected.itemNo === 3) {
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
    } else if (currentItemSelected.itemNo === 4) {
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
    } else if (currentItemSelected.itemNo === 5) {
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

  const handleSizeChange = (event, size, index) => {
    event.preventDefault();
    setPreviousItemSizeSelectIndex(currentItemSizeSelectIndex);
    setCurrentItemSizeSelectIndex(index);
    setPreviousItemSelected(currentItemSelected);
    setSizeChangeToggle(!sizeChangeToggle);
  };

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
            shopItems={shopItems}
            currentItemSelected={currentItemSelected}
            setCurrentItemSelected={setCurrentItemSelected}
            previousItemSelected={previousItemSelected}
            setPreviousItemSelected={setPreviousItemSelected}
            previousItemSizeSelectIndex={previousItemSizeSelectIndex}
            setPreviousItemSizeSelectIndex={setPreviousItemSizeSelectIndex}
            currentItemSizeSelectIndex={currentItemSizeSelectIndex}
            setCurrentItemSizeSelectIndex={setCurrentItemSizeSelectIndex}
            // currentTexture={currentTexture}
            // currentColor={currentColor}
            currentTextureFloor={currentTextureFloor}
            currentColorFloor={currentColorFloor}
            currentTextureWalls={currentTextureWalls}
            currentColorWalls={currentColorWalls}
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
            sizeChangeToggle={sizeChangeToggle}
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
          handleSizeChange={handleSizeChange}
          shopItems={shopItems}
          currentItemSelected={currentItemSelected}
          setCurrentItemSelected={setCurrentItemSelected}
          setPreviousItemSelected={setPreviousItemSelected}
          currentItemOptionSelect={currentItemOptionSelect}
          currentItemOptionType={currentItemOptionType}
          currentItemDescription={currentItemDescription}
          currentItemSizeSelect={currentItemSizeSelect}
          currentItemSizeSelectIndex={currentItemSizeSelectIndex}
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
          setPreviousItemSizeSelectIndex={setPreviousItemSizeSelectIndex}
          setCurrentItemSizeSelectIndex={setCurrentItemSizeSelectIndex}
          stainsList={stainsList}
          paintsList={paintsList}
        />
      </SnipcartProvider>
    </>
  );
}

export default App;
