import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Leva } from "leva";
import Placeholder from "./Placeholder.jsx";
import BottomAppBar from "./AppBar.jsx";
import * as THREE from "three";
import "./style.css";

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
  const [stoolAColor, setStoolAColor] = useState(whiteStain);
  const [stoolASelectedOption, setStoolASelectedOption] = useState("white");

  const [stoolBTexture, setStoolBTexture] = useState(allBlackTexture);
  const [stoolBColor, setStoolBColor] = useState(blackStain);
  const [stoolBSelectedOption, setStoolBSelectedOption] = useState("black");

  const [stoolCTexture, setStoolCTexture] = useState(allBlackTexture);
  const [stoolCColor, setStoolCColor] = useState(allBlackStain);
  const [stoolCSelectedOption, setStoolCSelectedOption] = useState("allBlack");

  const [stoolDTexture, setStoolDTexture] = useState(naturalTexture);
  const [stoolDColor, setStoolDColor] = useState(naturalStain);
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

  const stoolDataA = {
    itemType: "stool",
    itemNo: 1,
    optionSelect: stoolASelectedOption,
    setOptionSelect: setStoolASelectedOption,
    itemColor: stoolAColor,
    setItemColor: setStoolAColor,
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
    itemColor: stoolBColor,
    setItemColor: setStoolBColor,
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
    itemColor: stoolCColor,
    setItemColor: setStoolCColor,
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
    itemColor: stoolDColor,
    setItemColor: setStoolDColor,
    itemTexture: stoolDTexture,
    setItemTexture: setStoolDTexture,
    position: stoolDPosition,
    setPosition: setStoolDPosition,
  };

  const [currentItemSelected, setCurrentItemSelected] = useState(stoolDataB);
  const [currentOptionSelected, setCurrentOptionSelected] =
    useState(stoolASelectedOption);

  const handleColorChange = (event, color) => {
    // these will instead set their unique stoolDataD object values with its object setter methods
    event.preventDefault();

    // currentItemSelected.setOptionSelect(color);
    // setCurrentSelect(color);
    if (color === "white") {
      currentItemSelected.setItemColor(whiteStain);
      currentItemSelected.setOptionSelect("white");
      setCurrentOptionSelected("white");
      // setCurrentColor(whiteStain);
    } else if (color === "natural") {
      currentItemSelected.setItemColor(naturalStain);
      currentItemSelected.setOptionSelect("natural");
      setCurrentOptionSelected("natural");
      // setCurrentColor(naturalStain);
    } else if (color === "black") {
      currentItemSelected.setItemColor(blackStain);
      currentItemSelected.setOptionSelect("black");
      setCurrentOptionSelected("black");
      // setCurrentColor(blackStain);
    } else if (color === "allBlack") {
      currentItemSelected.setItemColor(allBlackStain);
      currentItemSelected.setOptionSelect("allBlack");
      setCurrentOptionSelected("allBlack");
      // setCurrentColor(allBlackStain);
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

  // useEffect(() => {
  //   console.log("stoolAColor", stoolAColor);
  //   console.log("stoolASelectedOption", stoolASelectedOption);
  //   console.log("stoolBColor", stoolBColor);
  //   console.log("stoolBSelectedOption", stoolBSelectedOption);

  //   console.log("stoolCColor", stoolCColor);
  //   console.log("stoolCSelectedOption", stoolCSelectedOption);
  //   console.log("stoolDColor", stoolDColor);
  //   console.log("stoolDSelectedOption", stoolDSelectedOption);
  // }, [
  //   stoolAColor,
  //   stoolASelectedOption,
  //   stoolBColor,
  //   stoolBSelectedOption,
  //   stoolCColor,
  //   stoolCSelectedOption,
  //   stoolDColor,
  //   stoolDSelectedOption,
  // ]);

  return (
    <>
      <Leva hidden oneLineLabels />
      <Canvas
        // shadows
        dpr={[1, 2]}
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{
          fov: 45,
          near: 30,
          far: 400,
          position: [0, 60, 0],
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
        handleColorChange={handleColorChange}
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
