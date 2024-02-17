import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Leva } from "leva";
import Placeholder from "./Placeholder.jsx";
import BottomAppBar from "./AppBar.jsx";
import * as THREE from "three";
import "./style.css";

function App() {
  const [open, setOpen] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [animActive, setAnimActive] = useState(false);

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

  const [currentTexture, setCurrentTexture] = useState(allBlackTexture);
  const [currentColor, setCurrentColor] = useState(blackStain);
  const [currentSelect, setCurrentSelect] = useState(currentColor);

  const handleColorChange = (event, color) => {
    event.preventDefault();
    setCurrentSelect(color);
    if (color === "white") {
      setCurrentColor(whiteStain);
    } else if (color === "natural") {
      setCurrentColor(naturalStain);
    } else if (color === "black") {
      setCurrentColor(blackStain);
    } else if (color === "black") {
      setCurrentColor(blackStain);
    } else if (color === "allBlack") {
      setCurrentColor(allBlackStain);
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
  //   setCurrentSelect()
  // }, []);

  return (
    <>
      <Leva hidden oneLineLabels />
      <Canvas
        // shadows
        dpr={[1, 2]}
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{
          fov: 45,
          near: 20,
          far: 140,
          position: [0, 60, 0],
        }}
      >
        <Suspense fallback={<Placeholder />}>
          <Experience
            toggled={toggled}
            setToggled={setToggled}
            open={open}
            setOpen={setOpen}
            currentTexture={currentTexture}
            currentColor={currentColor}
            animActive={animActive}
            setAnimActive={setAnimActive}
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
        currentColor={currentColor}
        currentSelect={currentSelect}
        animActive={animActive}
      />
    </>
  );
}

export default App;
