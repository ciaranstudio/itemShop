import "./style.css";
import { SoftShadows } from "@react-three/drei";
import ReactDOM from "react-dom/client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Leva } from "leva";
import Placeholder from "./Placeholder.jsx";
import BottomAppBar from "./AppBar.jsx";

// import { Loader } from "@react-three/drei";
// import { useProgress, Html } from "@react-three/drei";

// function Loader() {
//   const { active, progress, errors, item, loaded, total } = useProgress();
//   console.log(active);
//   return <Html center>{progress} % loaded</Html>;
// }

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Suspense
      fallback={
        <div id="initialLoad">
          <div className="loader"></div>
        </div>
      }
    >
      <Leva hidden oneLineLabels />
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [-10, 60, -85],
        }}
      >
        <Suspense fallback={<Placeholder />}>
          <SoftShadows size={20} samples={20} focus={1} />
          <Experience />
        </Suspense>
      </Canvas>
      <BottomAppBar />
      {/* <Loader /> */}
    </Suspense>
  </>,
);
