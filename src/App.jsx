import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { Leva } from "leva";
import * as THREE from "three";
import Scene from "./components/Scene.jsx";
import Placeholder from "./components/Placeholder.jsx";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SnipcartProvider } from "use-snipcart";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { textures } from "./data/textures.jsx";
import { shopItems, unselectedItem } from "./data/objects.jsx";
import { allOptions } from "./data/options.jsx";
import { useOptionStore } from "./store/useOptionStore.tsx";
import toast, { Toaster } from "react-hot-toast";

function App() {
  // constants
  const toastDuration = 10000;
  const toastFontSize = "0.9rem";
  const toastBackground = "lightGrey";
  const toastColor = "#212121";
  // animation constants for position Y (up and down)
  const yPosRunHighTarg = 0.015;
  const yPosRunLowTarg = -0.075;
  const stagePosYRunTarget = yPosRunHighTarg;
  const stagePosYReturnTarget = yPosRunLowTarg;
  const dropDelay = 0.15;
  const dropDuration = 0.75;
  const raiseDelay = 0.15;
  const raiseDuration = 0.75;
  // animation constants for exploding view animation / distance of parts from origin position (opening and closing exploding view)
  const animDistRunTarget = 0.15;
  const animDistReturnTarget = 0;
  const runDelay = 1.2;
  const runDuration = 0.9;
  const returnDelay = 0.15;
  const returnDuration = 0.9;
  // loading bar element for left to right on animation on app load
  const loadingBarElement = document.querySelector(".loading-bar");
  const toastId = toast;
  // animation value objects for object raise/lower animation and exploding view animation
  const animDistRun = {
    value: animDistReturnTarget,
  };
  const animDistReturn = {
    value: animDistRunTarget,
  };
  const stagePosYRun = {
    value: yPosRunLowTarg,
  };
  const stagePosYReturn = {
    value: yPosRunHighTarg,
  };

  // useRef
  const container = useRef();

  // loading progress hook
  const { active, progress, errors, item, loaded, total } = useProgress();

  // useState
  const [animDist, setAnimDist] = useState(0);
  const [stagePosY, setStagePosY] = useState(yPosRunLowTarg);

  // state from store
  const animToggled = useOptionStore((state) => state.animToggled);
  const animActive = useOptionStore((state) => state.animActive);
  const animIconToggle = useOptionStore((state) => state.animIconToggle);
  const animateButton = useOptionStore((state) => state.animateButton);
  const previousItemSelected = useOptionStore(
    (state) => state.previousItemSelected,
  );

  // actions from store
  const setMobileView = useOptionStore((state) => state.setMobileView);
  const setSceneLoaded = useOptionStore((state) => state.setSceneLoaded);
  const setAnimToggled = useOptionStore((state) => state.setAnimToggled);
  const setAnimActive = useOptionStore((state) => state.setAnimActive);
  const setPartsOpen = useOptionStore((state) => state.setPartsOpen);
  const getRandomInt = useOptionStore((state) => state.getRandomInt);

  // useEffect
  useEffect(() => {
    // Check if using a touch control device
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      // console.log("mobile view");
      setMobileView(true);
    } else {
      // console.log("not mobile view");
      setMobileView(false);
    }
    window.LoadSnipcart();
  }, []);

  useEffect(() => {
    window.LoadSnipcart();
  }, []);
  // useEffect(() => {
  //   console.log("loaded: ", loaded);
  //   console.log("total: ", total);
  // }, [loaded, total]);
  useEffect(() => {
    toastId.loading("Loading...", {
      id: "loadingToast",
      position: "top-left",
      style: {
        fontSize: toastFontSize,
        background: toastBackground,
        color: toastColor,
        fontFamily: "var(--leva-fonts-mono)",
        borderTop: "0.1rem solid #e0e0e0,",
      },
    });
  }, []);
  useEffect(() => {
    // loadingBarElement.style.transform = `scaleX(${progress / 100})`;
    loadingBarElement.style.transform = `scaleX(${loaded / 149})`;
    // console.log("progress: ", progress);
    if (loaded >= 143) {
      if (loaded / 149 === 1 || progress === 100) {
        setSceneLoaded(true);
        window.setTimeout(() => {
          // update loadingBarElement
          loadingBarElement.classList.add("ended");
          loadingBarElement.style.transform = "";
          toastId.success("All set!", {
            id: "loadingToast",
            duration: toastDuration - 7000,
            position: "top-left",
            style: {
              fontSize: toastFontSize,
              background: toastBackground,
              color: toastColor,
              fontFamily: "var(--leva-fonts-mono)",
              borderTop: "0.1rem solid #e0e0e0,",
            },
          });
        }, 50); // was 500
      }
    }
  }, [progress]);
  useEffect(() => {
    if (animIconToggle) animateParts();
  }, [animateButton]);

  // functions
  const { contextSafe } = useGSAP({ scope: container });
  const animateParts = contextSafe(() => {
    if (!animActive) {
      setAnimToggled(!animToggled);
      // check state of animation switch, if animToggled = false then open the object, if true close it
      if (!animToggled) {
        setPartsOpen(false);
        setAnimActive(true);
        let tl = gsap.timeline();
        tl.to(stagePosYRun, {
          delay: raiseDelay,
          duration: raiseDuration,
          value: stagePosYRunTarget,
          ease: "easeIn",
          onUpdate: () => {
            setStagePosY(stagePosYRun.value);
          },
        });
        // open
        // animating the item's parts away from eachother / opening parts, end of this animation partsOpen = true
        tl.to(animDistRun, {
          delay:
            previousItemSelected === unselectedItem
              ? runDelay + 0.5
              : animIconToggle
                ? runDelay - 1
                : runDelay,
          duration: runDuration,
          value: animDistRunTarget,
          ease: "easeOut",
          onUpdate: () => {
            setAnimDist(animDistRun.value);
          },
          onComplete: () => {
            setAnimActive(false);
            setPartsOpen(true);
          },
        });
      } else if (animToggled) {
        setAnimActive(true);
        let tl = gsap.timeline();

        // close
        // close the object, bring parts back together, ending with no distance between them
        tl.to(animDistReturn, {
          delay: returnDelay,
          duration: returnDuration,
          value: animDistReturnTarget,
          ease: "easeOut",
          onUpdate: () => {
            setAnimDist(animDistReturn.value);
          },
        });

        tl.to(stagePosYReturn, {
          delay: dropDelay,
          duration: dropDuration,
          value: stagePosYReturnTarget,
          ease: "easeIn",
          onUpdate: () => {
            setStagePosY(stagePosYReturn.value);
          },
          onComplete: () => {
            setPartsOpen(false);
            setAnimActive(false);
          },
        });
      }
    }
  });

  // actions from store
  const updatePartColor = useOptionStore((state) => state.updatePartColor);
  const updatePartColorName = useOptionStore(
    (state) => state.updatePartColorName,
  );
  const updatePartTexture = useOptionStore((state) => state.updatePartTexture);
  const calculateItemPrice = useOptionStore(
    (state) => state.calculateItemPrice,
  );

  // update part(s) color option(s) using actions from store
  const handlePartOption = (e, itemName, partName, color, stopPropogation) => {
    if (e) {
      e.preventDefault();
      if (stopPropogation) {
        e.stopPropagation();
      }
    }
    if (color === "white") {
      updatePartTexture(itemName, partName, textures.whiteTexture);
      updatePartColor(itemName, partName, textures.whiteStain);
      updatePartColorName(itemName, partName, "white");
    } else if (color === "natural") {
      updatePartTexture(itemName, partName, textures.naturalTexture);
      updatePartColor(itemName, partName, textures.naturalStain);
      updatePartColorName(itemName, partName, "natural");
    } else if (color === "black") {
      updatePartTexture(itemName, partName, textures.blackTexture);
      updatePartColor(itemName, partName, textures.blackStain);
      updatePartColorName(itemName, partName, "black");
    } else if (color === "allBlack") {
      updatePartTexture(itemName, partName, textures.allBlackTexture);
      updatePartColor(itemName, partName, textures.allBlackStain);
      updatePartColorName(itemName, partName, "allBlack");
    } else if (color === "alabaster") {
      updatePartTexture(itemName, partName, textures.paintedTexture);
      updatePartColor(itemName, partName, textures.alabasterPaint);
      updatePartColorName(itemName, partName, "alabaster");
    } else if (color === "pink") {
      updatePartTexture(itemName, partName, textures.paintedTexture);
      updatePartColor(itemName, partName, textures.pinkPaint);
      updatePartColorName(itemName, partName, "pink");
    } else if (color === "basil") {
      updatePartTexture(itemName, partName, textures.paintedTexture);
      updatePartColor(itemName, partName, textures.basilPaint);
      updatePartColorName(itemName, partName, "basil");
    } else if (color === "yellow") {
      updatePartTexture(itemName, partName, textures.paintedTexture);
      updatePartColor(itemName, partName, textures.yellowPaint);
      updatePartColorName(itemName, partName, "yellow");
    } else if (color === "blue") {
      updatePartTexture(itemName, partName, textures.paintedTexture);
      updatePartColor(itemName, partName, textures.bluePaint);
      updatePartColorName(itemName, partName, "blue");
    } else if (color === "gray") {
      updatePartTexture(itemName, partName, textures.paintedTexture);
      updatePartColor(itemName, partName, textures.grayPaint);
      updatePartColorName(itemName, partName, "gray");
    }
    calculateItemPrice(itemName);
  };
  const randomAllItemsParts = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    let randomAllItemsColors = shopItems.map((item) => {
      let itemColors = item.parts.map((part) => {
        let color = allOptions[getRandomInt(allOptions.length)];
        handlePartOption(e, item.itemName, part.partName, color, false);
        return color;
      });
      return itemColors;
    });
    // console.log("random colors generated list: ", randomAllItemsColors);
  };

  return (
    <>
      <Toaster reverseOrder={true} />
      <Canvas
        ref={container}
        // flat
        dpr={[1, 2]}
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 22,
          position: [12, 12, -12],
        }}
      >
        <Suspense fallback={<Placeholder />}>
          <SnipcartProvider>
            <Scene
              animDist={animDist}
              animateParts={animateParts}
              handlePartOption={handlePartOption}
              randomAllItemsParts={randomAllItemsParts}
              stagePosY={stagePosY}
              toastDuration={toastDuration}
              toastFontSize={toastFontSize}
              toastBackground={toastBackground}
              toastColor={toastColor}
            />
          </SnipcartProvider>
        </Suspense>
      </Canvas>
      <div id="footer">Eli Gfell Studio</div>
    </>
  );
}

export default App;
