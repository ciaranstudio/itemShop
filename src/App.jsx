// import { useRef, useState, useEffect, Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import { useProgress } from "@react-three/drei";
import { Leva } from "leva";
// import * as THREE from "three";
// import Scene from "./components/Scene.jsx";
// import Placeholder from "./components/Placeholder.jsx";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SnipcartProvider } from "use-snipcart";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { textures } from "./data/textures.jsx";
// import { shopItems, unselectedItem } from "./data/objects.jsx";
// import { allOptions } from "./data/options.jsx";
// import { useOptionStore } from "./store/useOptionStore.tsx";
import toast, { Toaster } from "react-hot-toast";
// import {
//   TOAST,
//   STAGE_POSITION_Y_ANIM,
//   ITEM_PARTS_ANIM,
// } from "./data/constants.tsx";
import ResponsiveAppBar from "./components/interface/header/AppBar.jsx";
import Experience from "./Experience.jsx";
import { createTheme } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#17385b", // "#373737"
        light: "#bdbdbd",
      },
      secondary: {
        main: "#636363",
        light: "#E0E0E0",
      },
      success: {
        main: "#929d84",
        light: "#c8cec1",
      },
      info: { main: "#ffffff" },
      warning: { main: "#BDBDBD" },
      error: { main: "#d3d3d3" },
    },
    shadows: Array(25).fill("none"),
  });

  return (
    <>
      <Toaster reverseOrder={true} />
      <SnipcartProvider>
        <ResponsiveAppBar theme={theme} />
        <Experience theme={theme} />
      </SnipcartProvider>
      <div id="footer">Eli Gfell Studio</div>
    </>
  );
}

export default App;
