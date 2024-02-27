import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Leva } from "leva";
import BottomAppBar from "./AppBar.jsx";
import * as THREE from "three";
import "./style.css";
import Placeholder from "./Placeholder.jsx";
import Item from "./Item.jsx";

function App() {
  const whiteStain = new THREE.Color(0xffffff);
  const naturalStain = new THREE.Color(0xdddddd);
  const blackStain = new THREE.Color(0xbababa);
  const allBlackStain = new THREE.Color(0x585858);

  const whiteTexture = [
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ];

  const naturalTexture = [
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ];

  const blackTexture = [
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ];

  const allBlackTexture = [
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ];

  const [stoolATexture, setStoolATexture] = useState(whiteTexture);
  const [stoolAStain, setStoolAStain] = useState(whiteStain);
  const [stoolAPaint, setStoolAPaint] = useState();
  const [stoolASelectedOption, setStoolASelectedOption] = useState("white");

  const [stoolBTexture, setStoolBTexture] = useState(allBlackTexture);
  const [stoolBStain, setStoolBStain] = useState(blackStain);
  const [stoolBPaint, setStoolBPaint] = useState();
  const [stoolBSelectedOption, setStoolBSelectedOption] = useState("black");

  const [stoolCTexture, setStoolCTexture] = useState(allBlackTexture);
  const [stoolCStain, setStoolCStain] = useState(allBlackStain);
  const [stoolCPaint, setStoolCPaint] = useState();
  const [stoolCSelectedOption, setStoolCSelectedOption] = useState("allBlack");

  const [stoolDTexture, setStoolDTexture] = useState(naturalTexture);
  const [stoolDStain, setStoolDStain] = useState(naturalStain);
  const [stoolDPaint, setStoolDPaint] = useState();
  const [stoolDSelectedOption, setStoolDSelectedOption] = useState("natural");

  const [stoolAPosition, setStoolAPosition] = useState({ x: -10, y: 0, z: 10 });
  const [stoolBPosition, setStoolBPosition] = useState({
    x: -10,
    y: 0,
    z: -10,
  });
  const [stoolCPosition, setStoolCPosition] = useState({ x: 10, y: 0, z: 10 });
  const [stoolDPosition, setStoolDPosition] = useState({ x: 10, y: 0, z: -10 });

  const [open, setOpen] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [animActive, setAnimActive] = useState(false);

  const stool = new Item(
    "stool",
    1,
    stoolASelectedOption,
    setStoolASelectedOption,
    stoolAStain,
    setStoolAStain,
    stoolAPaint,
    setStoolAPaint,
    stoolATexture,
    setStoolATexture,
    stoolAPosition,
    setStoolAPosition,
  );

  const stoolDataA = {
    itemType: "stool",
    itemNo: 1,
    optionSelect: stoolASelectedOption,
    setOptionSelect: setStoolASelectedOption,
    itemStain: stoolAStain,
    setItemStain: setStoolAStain,
    itemPaint: stoolAPaint,
    setItemPaint: setStoolAPaint,
    itemTexture: stoolATexture,
    setItemTexture: setStoolATexture,
    position: stoolAPosition,
    setPosition: setStoolAPosition,
  };

  const stoolDataB = {
    itemType: "stool",
    itemNo: 2,
    optionSelect: stoolBSelectedOption,
    setOptionSelect: setStoolBSelectedOption,
    itemStain: stoolBStain,
    setItemStain: setStoolBStain,
    itemPaint: stoolBPaint,
    setItemPaint: setStoolBPaint,
    itemTexture: stoolBTexture,
    setItemTexture: setStoolBTexture,
    position: stoolBPosition,
    setPosition: setStoolBPosition,
  };

  const stoolDataC = {
    itemType: "stool",
    itemNo: 3,
    optionSelect: stoolCSelectedOption,
    setOptionSelect: setStoolCSelectedOption,
    itemStain: stoolCStain,
    setItemStain: setStoolCStain,
    itemPaint: stoolCPaint,
    setItemPaint: setStoolCPaint,
    itemTexture: stoolCTexture,
    setItemTexture: setStoolCTexture,
    position: stoolCPosition,
    setPosition: setStoolCPosition,
  };

  const stoolDataD = {
    itemType: "stool",
    itemNo: 4,
    optionSelect: stoolDSelectedOption,
    setOptionSelect: setStoolDSelectedOption,
    itemStain: stoolDStain,
    setItemStain: setStoolDStain,
    itemPaint: stoolDPaint,
    setItemPaint: setStoolDPaint,
    itemTexture: stoolDTexture,
    setItemTexture: setStoolDTexture,
    position: stoolDPosition,
    setPosition: setStoolDPosition,
  };

  const [currentItemSelected, setCurrentItemSelected] = useState(stoolDataA);
  const [currentOptionSelected, setCurrentOptionSelected] =
    useState(stoolASelectedOption);

  const handleStainChange = (event, color) => {
    event.preventDefault();
    if (color === "white") {
      currentItemSelected.setItemStain(whiteStain);
      currentItemSelected.setOptionSelect(color);
      setCurrentOptionSelected(color);
      // setCurrentColor(whiteStain);
    } else if (color === "natural") {
      currentItemSelected.setItemStain(naturalStain);
      currentItemSelected.setOptionSelect(color);
      setCurrentOptionSelected(color);
      // setCurrentColor(naturalStain);
    } else if (color === "black") {
      currentItemSelected.setItemStain(blackStain);
      currentItemSelected.setOptionSelect(color);
      setCurrentOptionSelected(color);
      // setCurrentColor(blackStain);
    } else if (color === "allBlack") {
      currentItemSelected.setItemStain(allBlackStain);
      currentItemSelected.setOptionSelect(color);
      setCurrentOptionSelected(color);
      // setCurrentColor(allBlackStain);
    }
  };

  const handlePaintChange = (event, color) => {
    event.preventDefault();
    if (color === "alabaster") {
      // currentItemSelected.setItemPaint(whiteStain);
      currentItemSelected.setOptionSelect(color);
      setCurrentOptionSelected(color);
    } else if (color === "pink") {
      // currentItemSelected.setItemPaint(naturalStain);
      currentItemSelected.setOptionSelect(color);
      setCurrentOptionSelected(color);
    } else if (color === "basil") {
      // currentItemSelected.setItemPaint(blackStain);
      currentItemSelected.setOptionSelect(color);
      setCurrentOptionSelected(color);
    } else if (color === "yellow") {
      // currentItemSelected.setItemPaint(allBlackStain);
      currentItemSelected.setOptionSelect(color);
      setCurrentOptionSelected(color);
    } else if (color === "blue") {
      // currentItemSelected.setItemPaint(allBlackStain);
      currentItemSelected.setOptionSelect(color);
      setCurrentOptionSelected(color);
    } else if (color === "gray") {
      // currentItemSelected.setItemPaint(allBlackStain);
      currentItemSelected.setOptionSelect(color);
      setCurrentOptionSelected(color);
    }
  };

  const handleTextureChange = (event, texture) => {
    event.preventDefault();
    if (texture === "white") {
      setCurrentTexture(whiteTexture);
    } else if (texture === "natural") {
      setCurrentTexture(naturalTexture);
    } else if (texture === "black") {
      setCurrentTexture(blackTexture);
    } else if (texture === "allBlack") {
      setCurrentTexture(allBlackTexture);
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
            // currentTexture={currentTexture}
            // currentColor={currentColor}
            stoolDataA={stoolDataA}
            stoolDataB={stoolDataB}
            stoolDataC={stoolDataC}
            stoolDataD={stoolDataD}
            currentItemSelected={currentItemSelected}
            setCurrentItemSelected={setCurrentItemSelected}
            setCurrentOptionSelected={setCurrentOptionSelected}
          />
        </Suspense>
      </Canvas>
      <BottomAppBar
        toggled={toggled}
        setToggled={setToggled}
        open={open}
        setOpen={setOpen}
        handleStainChange={handleStainChange}
        handlePaintChange={handlePaintChange}
        handleTextureChange={handleTextureChange}
        currentItemSelected={currentItemSelected}
        setCurrentItemSelected={setCurrentItemSelected}
        // currentColor={currentColor}
        // currentSelect={currentSelect}
        animActive={animActive}
        currentOptionSelected={currentOptionSelected}
      />
    </>
  );
}

export default App;
