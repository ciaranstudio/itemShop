import "./style.css";
// import { SoftShadows } from "@react-three/drei";
import ReactDOM from "react-dom/client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Leva } from "leva";
import Placeholder from "./Placeholder.jsx";
import BottomAppBar from "./AppBar.jsx";
import Loading from "./Loading.jsx";
import * as THREE from "three";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Suspense fallback={<Loading />}>
      <Leva hidden oneLineLabels />
      <Canvas
        // shadows
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{
          fov: 45,
          near: 1,
          far: 100,
          position: [0, 60, 0],
        }}
      >
        <Suspense fallback={<Placeholder />}>
          {/* <SoftShadows size={10} samples={10} focus={1} /> */}
          <Experience />
        </Suspense>
      </Canvas>
      <BottomAppBar />
    </Suspense>
  </>,
);
