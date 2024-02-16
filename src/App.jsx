import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Leva } from "leva";
import Placeholder from "./Placeholder.jsx";
import BottomAppBar from "./AppBar.jsx";
import * as THREE from "three";
import "./style.css";
// import { useLoader } from "@react-three/fiber";
// import { TextureLoader } from "three/src/loaders/TextureLoader";

function App() {
  const [open, setOpen] = useState(false);

  const superWhite = new THREE.Color(0xffffff);
  const naturalStain = new THREE.Color(0xdddddd);
  const blackStain = new THREE.Color(0xbababa);
  const allBlackStain = new THREE.Color(0x585858);

  const white = [
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ];

  const natural = [
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ];

  const black = [
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ];

  const allBlack = [
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ];

  const [currentTexture, setCurrentTexture] = useState(white);
  const [currentColor, setCurrentColor] = useState(allBlackStain);

  const handleColorChange = (event, color) => {
    event.preventDefault();
    if (color === "superWhite") {
      setCurrentColor(superWhite);
    } else if (color === "naturalStain") {
      setCurrentColor(naturalStain);
    } else if (color === "blackStain") {
      setCurrentColor(blackStain);
    } else if (color === "blackStain") {
      setCurrentColor(blackStain);
    } else if (color === "allBlackStain") {
      setCurrentColor(allBlackStain);
    }
  };

  const handleTextureChange = (event, texture) => {
    event.preventDefault();
    if (texture === "white") {
      setCurrentTexture(white);
    } else if (texture === "natural") {
      setCurrentTexture(natural);
    } else if (texture === "black") {
      setCurrentTexture(black);
    } else if (texture === "allBlack") {
      setCurrentTexture(allBlack);
    }
  };

  useEffect(() => {
    console.log("currentTexture: ", currentTexture);
  }, []);

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
            open={open}
            setOpen={setOpen}
            currentTexture={currentTexture}
            currentColor={currentColor}
          />
        </Suspense>
      </Canvas>
      <BottomAppBar
        open={open}
        setOpen={setOpen}
        handleColorChange={handleColorChange}
        handleTextureChange={handleTextureChange}
      />
    </>
  );
}

export default App;
