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
  ]; // [0, 0, 70]
  const squatterPosition = [
    { x: -70, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
  ]; // [-70, 0, 0]
  const blockPosition = [
    { x: 0, y: 0, z: -70 },
    { x: 0, y: 0, z: 0 },
  ]; // [0, 0, -70]
  const horsePosition = [
    { x: 70, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
  ]; // [70, 0, 0]
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
    { x: 0, y: 0, z: 0 }, // positionA
    { x: 0, y: 0, z: 0 }, // positionB
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
  const [currentItemSizeSelect, setCurrentItemSizeSelect] = useState(
    currentItemSelected.sizes[currentItemSizeSelectIndex],
  );

  const [currentTexture, setCurrentTexture] = useState(textures.whiteTexture);
  const [currentColor, setCurrentColor] = useState(textures.noSelectWhite);

  useEffect(() => {
    setCurrentItemDescription(currentItemSelected.itemDescription);
    setCurrentItemSizeSelectIndex(0);
    setCurrentItemSizeSelect(currentItemSelected.sizes[0]);
    console.log("previous item selected: ", previousItemSelected);
    console.log("current item selected: ", currentItemSelected);
  }, [currentItemSelected]);

  useEffect(() => {
    setCurrentItemSizeSelect(
      currentItemSelected.sizes[currentItemSizeSelectIndex],
    );
  }, [currentItemSizeSelectIndex]);

  const handleStainChange = (event, color) => {
    event.preventDefault();
    setCurrentItemOptionSelect(color);
    setCurrentItemOptionType("stain");
    if (color === "white") {
      setCurrentTexture(textures.whiteTexture);
      setCurrentColor(textures.whiteStain);
    } else if (color === "natural") {
      setCurrentTexture(textures.naturalTexture);
      setCurrentColor(textures.naturalStain);
    } else if (color === "black") {
      setCurrentTexture(textures.blackTexture);
      setCurrentColor(textures.blackStain);
    } else if (color === "allBlack") {
      setCurrentTexture(textures.allBlackTexture);
      setCurrentColor(textures.allBlackStain);
    }
  };

  const handlePaintChange = (event, color) => {
    event.preventDefault();
    setCurrentItemOptionSelect(color);
    setCurrentItemOptionType("paint");
    setCurrentTexture(textures.paintTexture);
    if (color === "alabaster") {
      setCurrentColor(textures.alabasterPaint);
    } else if (color === "pink") {
      setCurrentColor(textures.pinkPaint);
    } else if (color === "basil") {
      setCurrentColor(textures.basilPaint);
    } else if (color === "yellow") {
      setCurrentColor(textures.yellowPaint);
    } else if (color === "blue") {
      setCurrentColor(textures.bluePaint);
    } else if (color === "gray") {
      setCurrentColor(textures.grayPaint);
    }
  };

  const handleSizeChange = (event, size, index) => {
    event.preventDefault();
    setCurrentItemSizeSelectIndex(index);
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
          far: 1000,
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
            currentItemSizeSelectIndex={currentItemSizeSelectIndex}
            currentTexture={currentTexture}
            currentColor={currentColor}
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
        />
      </SnipcartProvider>
    </>
  );
}

export default App;
