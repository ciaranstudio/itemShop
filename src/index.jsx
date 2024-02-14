import "./style.css";
import { SoftShadows } from "@react-three/drei";
import ReactDOM from "react-dom/client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Leva } from "leva";
import Placeholder from "./Placeholder.jsx";
import BottomAppBar from "./AppBar.jsx";
import Loading from "./Loading.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Suspense fallback={<Loading />}>
      <Leva hidden oneLineLabels />
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 60, 0],
        }}
      >
        <Suspense fallback={<Placeholder />}>
          <SoftShadows size={25} samples={10} focus={0} />
          <Experience />
        </Suspense>
      </Canvas>
      <BottomAppBar />
    </Suspense>
  </>,
);
