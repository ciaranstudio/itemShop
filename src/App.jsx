import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Leva } from "leva";
import Placeholder from "./Placeholder.jsx";
import BottomAppBar from "./AppBar.jsx";
import * as THREE from "three";
import "./style.css";

function App() {
  // handle color texture function (to pass to BottomAppBar to call on user stain option select)
  // listing and loading of various texture options
  // can i write this in separate texture handler file and import to here to call and pass same way?
  const [open, setOpen] = useState(false);

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
          far: 120,
          position: [0, 60, 0],
        }}
      >
        <Suspense fallback={<Placeholder />}>
          <Experience open={open} setOpen={setOpen} />
        </Suspense>
      </Canvas>
      <BottomAppBar open={open} setOpen={setOpen} />
    </>
  );
}

export default App;
