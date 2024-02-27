import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Leva } from "leva";
import BottomAppBar from "./AppBar.jsx";
import * as THREE from "three";
import "./style.css";
import Placeholder from "./Placeholder.jsx";
import Item from "./Item.jsx";
import { textures } from "./textures.jsx";

function App() {
  const [open, setOpen] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [animActive, setAnimActive] = useState(false);

  const [grampsTexture, setGrampsTexture] = useState(textures.whiteTexture);
  const [grampsStain, setGrampsStain] = useState(textures.whiteStain);
  const [grampsPaint, setGrampsPaint] = useState();
  const [grampsSelectedOption, setGrampsSelectedOption] = useState("white");
  const [grampsSelectedOptionType, setGrampsSelectedOptionType] =
    useState("stain");
  const [grampsSizeSelect, setGrampsSizeSelect] = useState(0);
  const grampSizes = ["16 x 16 x 18"]; //LDH

  const [squatterTexture, setSquatterTexture] = useState(
    textures.allBlackTexture,
  );
  const [squatterStain, setSquatterStain] = useState(textures.blackStain);
  const [squatterPaint, setSquatterPaint] = useState();
  const [squatterSelectedOption, setSquatterSelectedOption] = useState("black");
  const [squatterSelectedOptionType, setSquatterSelectedOptionType] =
    useState("stain");
  const [squatterSizeSelect, setSquatterSizeSelect] = useState(0);
  const squatterSizes = ["16 x 12 x 18"]; //LDH

  const [blockTexture, setBlockTexture] = useState(textures.allBlackTexture);
  const [blockStain, setBlockStain] = useState(textures.allBlackStain);
  const [blockPaint, setBlockPaint] = useState();
  const [blockSelectedOption, setBlockSelectedOption] = useState("allBlack");
  const [blockSelectedOptionType, setBlockSelectedOptionType] =
    useState("stain");
  const [blockSizeSelect, setBlockSizeSelect] = useState(0);
  const blockSizes = ["8 x 8 x 16"]; //LDH

  const [horseTexture, setHorseTexture] = useState(textures.naturalTexture);
  const [horseStain, setHorseStain] = useState(textures.naturalStain);
  const [horsePaint, setHorsePaint] = useState();
  const [horseSelectedOption, setHorseSelectedOption] = useState("natural");
  const [horseSelectedOptionType, setHorseSelectedOptionType] =
    useState("stain");
  const [horseSizeSelect, setHorseSizeSelect] = useState(0);
  const horseSizes = ["32 x 20 x 32"]; //LDH

  const [shelfATexture, setShelfATexture] = useState(textures.naturalTexture);
  const [shelfAStain, setShelfAStain] = useState(textures.naturalStain);
  const [shelfAPaint, setShelfAPaint] = useState(); //LDH
  const [shelfASelectedOption, setShelfASelectedOption] = useState("natural");
  const [shelfASelectedOptionType, setShelfASelectedOptionType] =
    useState("stain");
  const [shelfASizeSelect, setShelfASizeSelect] = useState(0);
  const shelfASizes = ["16 x 4 x 4", "32 x 4 x 4"]; //LDH

  const [shelfBTexture, setShelfBTexture] = useState(textures.naturalTexture);
  const [shelfBStain, setShelfBStain] = useState(textures.naturalStain);
  const [shelfBPaint, setShelfBPaint] = useState();
  const [shelfBSelectedOption, setShelfBSelectedOption] = useState("natural");
  const [shelfBSelectedOptionType, setShelfBSelectedOptionType] =
    useState("stain");
  const [shelfBSizeSelect, setShelfBSizeSelect] = useState(0);
  const shelfBSizes = ["16 x 6 x 4", "32 x 6 x 4"]; //LDH

  const [grampsPosition, setGrampsPosition] = useState({ x: -10, y: 0, z: 10 });
  const [squatterPosition, setSquatterPosition] = useState({
    x: -10,
    y: 0,
    z: -10,
  });
  const [blockPosition, setBlockPosition] = useState({ x: 10, y: 0, z: 10 });
  const [horsePosition, setHorsePosition] = useState({ x: 10, y: 0, z: -10 });
  const [shelfAPosition, setShelfAPosition] = useState({ x: 10, y: 0, z: 10 });
  const [shelfBPosition, setShelfBPosition] = useState({ x: 10, y: 0, z: -10 });

  const gramps = new Item(
    "gramps",
    0,
    "GRAMPS",
    "Handmade stool",
    900,
    750,
    grampsSelectedOption,
    setGrampsSelectedOption,
    grampsSelectedOptionType,
    setGrampsSelectedOptionType,
    // size properties
    grampsSizeSelect,
    setGrampsSizeSelect,
    grampSizes,
    //
    grampsStain,
    setGrampsStain,
    grampsPaint,
    setGrampsPaint,
    grampsTexture,
    setGrampsTexture,
    grampsPosition,
    setGrampsPosition,
  );

  const squatter = new Item(
    "squatter",
    1,
    "SQUATTER",
    "Handmade end table",
    700,
    600,
    squatterSelectedOption,
    setSquatterSelectedOption,
    squatterSelectedOptionType,
    setSquatterSelectedOptionType,
    squatterSizeSelect,
    setSquatterSizeSelect,
    squatterSizes,
    squatterStain,
    setSquatterStain,
    squatterPaint,
    setSquatterPaint,
    squatterTexture,
    setSquatterTexture,
    squatterPosition,
    setSquatterPosition,
  );

  const block = new Item(
    "block",
    2,
    "BLOCK",
    "Handmade room block",
    400,
    250,
    blockSelectedOption,
    setBlockSelectedOption,
    blockSelectedOptionType,
    setBlockSelectedOptionType,
    blockSizeSelect,
    setBlockSizeSelect,
    blockSizes,
    blockStain,
    setBlockStain,
    blockPaint,
    setBlockPaint,
    blockTexture,
    setBlockTexture,
    blockPosition,
    setBlockPosition,
  );

  const horse = new Item(
    "horse",
    3,
    "HORSE",
    "Handmade saw horse",
    500,
    400,
    horseSelectedOption,
    setHorseSelectedOption,
    horseSelectedOptionType,
    setHorseSelectedOptionType,
    horseSizeSelect,
    setHorseSizeSelect,
    horseSizes,
    horseStain,
    setHorseStain,
    horsePaint,
    setHorsePaint,
    horseTexture,
    setHorseTexture,
    horsePosition,
    setHorsePosition,
  );

  const shelfA = new Item(
    "shelfA",
    4,
    `\\SHELF/`,
    "Handmade angle shelf",
    400,
    350,
    shelfASelectedOption,
    setShelfASelectedOption,
    shelfASelectedOptionType,
    setShelfASelectedOptionType,
    shelfASizeSelect,
    setShelfASizeSelect,
    shelfASizes,
    shelfAStain,
    setShelfAStain,
    shelfAPaint,
    setShelfAPaint,
    shelfATexture,
    setShelfATexture,
    shelfAPosition,
    setShelfAPosition,
  );

  const shelfB = new Item(
    "shelfB",
    5,
    "(SHELF)",
    "Handmade block shelf",
    400,
    350,
    shelfBSelectedOption,
    setShelfBSelectedOption,
    shelfBSelectedOptionType,
    setShelfBSelectedOptionType,
    shelfBSizeSelect,
    setShelfBSizeSelect,
    shelfBSizes,
    shelfBStain,
    setShelfBStain,
    shelfBPaint,
    setShelfBPaint,
    shelfBTexture,
    setShelfBTexture,
    shelfBPosition,
    setShelfBPosition,
  );

  const shopItems = [gramps, squatter, block, horse, shelfA, shelfB];

  const [currentItemSelected, setCurrentItemSelected] = useState(gramps);
  const [currentItemOptionSelect, setCurrentItemOptionSelect] = useState(
    gramps.optionSelect,
  );
  const [currentItemOptionType, setCurrentItemOptionType] = useState(
    gramps.optionSelectType,
  );
  const [currentItemDescription, setCurrentItemDescription] = useState(
    gramps.itemDescription,
  );
  const [currentItemSizeSelect, setCurrentItemSizeSelect] = useState(
    gramps.sizeSelect,
  );

  useEffect(() => {
    setCurrentItemOptionSelect(currentItemSelected.optionSelect);
    setCurrentItemOptionType(currentItemSelected.optionSelectType);
    setCurrentItemDescription(currentItemSelected.itemDescription);
    setCurrentItemSizeSelect(
      currentItemSelected.sizes[currentItemSelected.sizeSelect],
    );
  }, [currentItemSelected]);

  const handleStainChange = (event, color) => {
    event.preventDefault();
    if (color === "white") {
      currentItemSelected.setItemStain(textures.whiteStain);
      currentItemSelected.setItemTexture(textures.whiteStain);
      currentItemSelected.setOptionSelect(color);
      currentItemSelected.setOptionSelectType("stain");
      setCurrentItemOptionSelect(color);
      setCurrentItemOptionType("stain");
    } else if (color === "natural") {
      currentItemSelected.setItemStain(textures.naturalStain);
      currentItemSelected.setItemTexture(textures.naturalTexture);
      currentItemSelected.setOptionSelect(color);
      currentItemSelected.setOptionSelectType("stain");
      setCurrentItemOptionSelect(color);
      setCurrentItemOptionType("stain");
    } else if (color === "black") {
      currentItemSelected.setItemStain(textures.blackStain);
      currentItemSelected.setItemTexture(textures.blackTexture);
      currentItemSelected.setOptionSelect(color);
      currentItemSelected.setOptionSelectType("stain");
      setCurrentItemOptionSelect(color);
      setCurrentItemOptionType("stain");
    } else if (color === "allBlack") {
      currentItemSelected.setItemStain(textures.allBlackStain);
      currentItemSelected.setItemTexture(textures.allBlackTexture);
      currentItemSelected.setOptionSelect(color);
      currentItemSelected.setOptionSelectType("stain");
      setCurrentItemOptionSelect(color);
      setCurrentItemOptionType("stain");
    }
  };

  const handlePaintChange = (event, color) => {
    event.preventDefault();
    if (color === "alabaster") {
      currentItemSelected.setItemPaint(textures.alabasterPaint);
      currentItemSelected.setItemTexture(textures.paintTexture);
      currentItemSelected.setOptionSelect(color);
      currentItemSelected.setOptionSelectType("paint");
      setCurrentItemOptionSelect(color);
      setCurrentItemOptionType("paint");
    } else if (color === "pink") {
      currentItemSelected.setItemPaint(textures.pinkPaint);
      currentItemSelected.setItemTexture(textures.paintTexture);
      currentItemSelected.setOptionSelect(color);
      currentItemSelected.setOptionSelectType("paint");
      setCurrentItemOptionSelect(color);
      setCurrentItemOptionType("paint");
    } else if (color === "basil") {
      currentItemSelected.setItemPaint(textures.basilPaint);
      currentItemSelected.setItemTexture(textures.paintTexture);
      currentItemSelected.setOptionSelect(color);
      currentItemSelected.setOptionSelectType("paint");
      setCurrentItemOptionSelect(color);
      setCurrentItemOptionType("paint");
    } else if (color === "yellow") {
      currentItemSelected.setItemPaint(textures.yellowPaint);
      currentItemSelected.setItemTexture(textures.paintTexture);
      currentItemSelected.setOptionSelect(color);
      currentItemSelected.setOptionSelectType("paint");
      setCurrentItemOptionSelect(color);
      setCurrentItemOptionType("paint");
    } else if (color === "blue") {
      currentItemSelected.setItemPaint(textures.bluePaint);
      currentItemSelected.setItemTexture(textures.paintTexture);
      currentItemSelected.setOptionSelect(color);
      currentItemSelected.setOptionSelectType("paint");
      setCurrentItemOptionSelect(color);
      setCurrentItemOptionType("paint");
    } else if (color === "gray") {
      currentItemSelected.setItemPaint(textures.grayPaint);
      currentItemSelected.setItemTexture(textures.paintTexture);
      currentItemSelected.setOptionSelect(color);
      currentItemSelected.setOptionSelectType("paint");
      setCurrentItemOptionSelect(color);
      setCurrentItemOptionType("paint");
    }
  };

  return (
    <>
      <Leva hidden oneLineLabels />
      <Canvas
        // shadows
        dpr={[1, 2]}
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{
          fov: 60, // was 45
          near: 0.1,
          far: 400,
          // position: [
          //   currentItemSelected.position.x * 3,
          //   currentItemSelected.position.y + 5 * 3,
          //   currentItemSelected.position.z * 3,
          // ],
          // decent close up position that still shows all models at a diamond angle to group
          // position: [50, 25, -70],
          // good far away angle looking into open wall side of scene
          position: [120, 70, -140],
        }}
      >
        <Suspense fallback={<Placeholder />}>
          <Experience
            open={open}
            setOpen={setOpen}
            toggled={toggled}
            setToggled={setToggled}
            animActive={animActive}
            setAnimActive={setAnimActive}
            gramps={gramps}
            squatter={squatter}
            block={block}
            horse={horse}
            shelfA={shelfA}
            shelfB={shelfB}
            shopItems={shopItems}
            currentItemSelected={currentItemSelected}
            setCurrentItemSelected={setCurrentItemSelected}
            setCurrentItemOptionSelect={setCurrentItemOptionSelect}
          />
        </Suspense>
      </Canvas>
      <BottomAppBar
        toggled={toggled}
        setToggled={setToggled}
        animActive={animActive}
        open={open}
        setOpen={setOpen}
        handleStainChange={handleStainChange}
        handlePaintChange={handlePaintChange}
        gramps={gramps}
        squatter={squatter}
        block={block}
        horse={horse}
        shelfA={shelfA}
        shelfB={shelfB}
        shopItems={shopItems}
        currentItemSelected={currentItemSelected}
        setCurrentItemSelected={setCurrentItemSelected}
        currentItemOptionSelect={currentItemOptionSelect}
        currentItemOptionType={currentItemOptionType}
        currentItemDescription={currentItemDescription}
        currentItemSizeSelect={currentItemSizeSelect}
      />
    </>
  );
}

export default App;
