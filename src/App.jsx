import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva"; // only here for the font as a placeholder, no longer using debugControls, find font replacement
import * as THREE from "three";
import Scene from "./components/Scene.jsx";
import Placeholder from "./components/Placeholder.jsx";
import { unselectedItem } from "./data/objects.jsx";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SnipcartProvider } from "use-snipcart";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import OrderBox from "./components/OrderBox.jsx";

function App() {
  const [open, setOpen] = useState(false);
  const [infoBoxIcon, setInfoBoxIcon] = useState(true);
  const [showLongDesc, setShowLongDesc] = useState(false);

  const [showBackground, setShowBackground] = useState(true);
  const [showPartOptions, setShowPartOptions] = useState(false);

  const [currentItemSelected, setCurrentItemSelected] =
    useState(unselectedItem);
  const [previousItemSelected, setPreviousItemSelected] =
    useState(unselectedItem);

  useEffect(() => {
    window.LoadSnipcart();
  }, []);

  const container = useRef();

  const [animDist, setAnimDist] = useState(0);
  const animDistRun = {
    value: 0,
  };
  const animDistReturn = {
    value: 0.15,
  };
  const animDistRunTarget = 0.15;
  const animDistReturnTarget = 0;

  const [animToggled, setAnimToggled] = useState(false);
  const [animActive, setAnimActive] = useState(false);

  const { contextSafe } = useGSAP({ scope: container });

  const animateParts = contextSafe(() => {
    if (!animActive) {
      setAnimToggled(!animToggled);
      if (!animToggled) {
        let tl = gsap.timeline();
        tl.to(animDistRun, {
          delay: 0.15,
          duration: 1,
          value: animDistRunTarget,
          ease: "easeIn",
          onStart: () => {
            // console.log("starting animDistRun animation: ", animDistRun.value);
            setAnimActive(true);
          },
          onUpdate: () => {
            // console.log("updating animDistRun animation: ", animDistRun.value);
            setAnimDist(animDistRun.value);
          },
          onComplete: () => {
            // console.log("animDistRun.value: ", animDistRun.value);
            setAnimActive(false);
          },
        });
      } else {
        let tl = gsap.timeline();
        tl.to(animDistReturn, {
          delay: 0.15,
          duration: 1,
          value: animDistReturnTarget,
          ease: "easeOut",
          onStart: () => {
            // console.log(
            //   "starting animDistReturn animation: ",
            //   animDistReturn.value,
            // );
            setAnimActive(true);
          },
          onUpdate: () => {
            // console.log(
            //   "updating anianimDistReturnmDist animation: ",
            //   animDistReturn.value,
            // );
            setAnimDist(animDistReturn.value);
          },
          onComplete: () => {
            // console.log("animDistReturn.value: ", animDistReturn.value);
            setAnimActive(false);
          },
        });
      }
    }
  });

  return (
    <>
      <Canvas
        ref={container} // will this work, if not use forwardRef and pass into Scene for use in objects group?
        // flat // changes color rendering, see https://stackoverflow.com/questions/64899716/color-differences-between-threejs-vanilla-js-and-react-three-fiber-create-re
        dpr={[1, 2]}
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{
          fov: 45,
          near: 0.1, // 15
          far: 21, // 900
          position: [0, 16, 0], // position: [9, 5, -9], // position: [7.5, 15, 7.5],
        }}
      >
        <Suspense fallback={<Placeholder />}>
          <SnipcartProvider>
            <Scene
              currentItemSelected={currentItemSelected}
              setCurrentItemSelected={setCurrentItemSelected}
              previousItemSelected={previousItemSelected}
              setPreviousItemSelected={setPreviousItemSelected}
              animDist={animDist}
              open={open}
              setOpen={setOpen}
              infoBoxIcon={infoBoxIcon}
              setInfoBoxIcon={setInfoBoxIcon}
              showBackground={showBackground}
              setShowBackground={setShowBackground}
              showPartOptions={showPartOptions}
              setShowPartOptions={setShowPartOptions}
              animateParts={animateParts}
            />
          </SnipcartProvider>
        </Suspense>
      </Canvas>
      <OrderBox
        open={open}
        setOpen={setOpen}
        infoBoxIcon={infoBoxIcon}
        setInfoBoxIcon={setInfoBoxIcon}
        showLongDesc={showLongDesc}
        setShowLongDesc={setShowLongDesc}
        showBackground={showBackground}
        setShowBackground={setShowBackground}
        animateParts={animateParts}
        animActive={animActive}
        currentItemSelected={currentItemSelected}
      />
    </>
  );
}

export default App;
