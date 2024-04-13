import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
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
// import OrderBox from "./components/OrderBox.jsx";
import { textures } from "./data/textures.jsx";
import { shopItems } from "./data/objects.jsx";
// import { objects } from "./data/objects.jsx";
import {
  // options,
  allOptions,
} from "./data/options.jsx";
import { useOptionStore } from "./store/useOptionStore.tsx";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [mobileView, setMobileView] = useState(false);
  // const iOS =
  //   typeof navigator !== "undefined" &&
  //   /iPad|iPhone|iPod/.test(navigator.userAgent);

  // optionBoxItemChanged
  // setOptionBoxItemChanged
  // optionBoxItemChanged
  // setOptionBoxItemChanged

  useEffect(() => {
    // Check if using a touch control device
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      // console.log("mobile view");
      setMobileView(true);
    } else {
      // console.log("not mobile view");
      setMobileView(false);
    }
  }, []);

  const [open, setOpen] = useState(false);
  const [infoBoxIcon, setInfoBoxIcon] = useState(true);
  // const [showLongDesc, setShowLongDesc] = useState(true);
  const [showPhotos, setShowPhotos] = useState(false);
  const [allPhotos, setAllPhotos] = useState(false);
  const [aboutInfo, setAboutInfo] = useState(false);
  const [optionBoxHeightMin, setOptionBoxHeightMin] = useState(false);

  const [showBackground, setShowBackground] = useState(true);
  const [showPartOptions, setShowPartOptions] = useState(false);

  const [currentItemSelected, setCurrentItemSelected] =
    useState(unselectedItem);
  const [previousItemSelected, setPreviousItemSelected] =
    useState(unselectedItem);

  // use this to trigger gsap camera position animation to zoom to new target when changing while in !showBackground view,
  // change select from OptionBox menu (like old title as select box format from March)
  // need to call this after the currentItemSelected is swapped in state
  // after setCurrentItemSelected call to change selected object/item
  const [optionBoxItemChanged, setOptionBoxItemChanged] = useState(false);
  const [optionBoxItemToggle, setOptionBoxItemToggle] = useState(false);

  // useEffect(() => {
  //   console.log("optionBoxItemChanged: ", optionBoxItemChanged);
  // }, [optionBoxItemChanged]);

  useEffect(() => {
    window.LoadSnipcart();
  }, []);

  const container = useRef();

  const [animDist, setAnimDist] = useState(0);
  const animDistRunTarget = 0.15;
  const animDistReturnTarget = 0;

  const animDistRun = {
    value: animDistReturnTarget,
  };
  const animDistReturn = {
    value: animDistRunTarget,
  };

  const dropDelay = 0;
  const dropDuration = 1.05;
  const raiseDelay = 0.75;
  const raiseDuration = 0.55;

  const runDelay = 0.45;
  const runDuration = 1.25;
  const returnDelay = 0.1;
  const returnDuration = 1;

  // floor y position
  const yPosRunHighTarg = 0.015;
  const yPosRunLowTarg = -0.075;

  const stagePosYRunTarget = yPosRunHighTarg;
  const stagePosYReturnTarget = yPosRunLowTarg;

  const stagePosYRun = {
    value: yPosRunLowTarg,
  };
  const stagePosYReturn = {
    value: yPosRunHighTarg,
  };

  const [animToggled, setAnimToggled] = useState(false);
  const [animActive, setAnimActive] = useState(false);
  const [activeCamPosAnim, setActiveCamPosAnim] = useState(false);
  const [activeCamTargAnim, setActiveCamTargAnim] = useState(false);
  const [activeCamAnim, setActiveCamAnim] = useState(false);

  const [partsOpen, setPartsOpen] = useState(false);
  const [stagePosY, setStagePosY] = useState(yPosRunLowTarg);

  const { contextSafe } = useGSAP({ scope: container });

  // need to disable zoom while this animation is happening on way in / to showBackground false / parts opened (maybe not on way out / back to showBackground normal)
  const animateParts = contextSafe(() => {
    if (!animActive) {
      // if (orbitRef.current) orbitRef.current.autoRotate = false;
      // orbitRef.current.autoRotateSpeed = 1.25;
      setAnimToggled(!animToggled);
      // check state of animation switch, if animToggled = false then open the object, if true close it
      if (!animToggled) {
        setPartsOpen(false);
        setAnimActive(true);
        let tl = gsap.timeline();

        tl.to(stagePosYRun, {
          delay: raiseDelay,
          duration: dropDuration,
          value: stagePosYRunTarget,
          ease: "easeIn",
          onStart: () => {
            // console.log("starting animDistRun animation: ", animDistRun.value);
            // setAnimActive(true);
            // if (currentItemSelected.itemName.includes("block")) {
            //   setStagePosY(0.1);
            // }
          },
          onUpdate: () => {
            // console.log("updating animDistRun animation: ", animDistRun.value);
            setStagePosY(stagePosYRun.value);
          },
          onComplete: () => {
            // console.log("animDistRun.value: ", animDistRun.value);
            // setAnimActive(false);
          },
        });

        // open
        // animating the item's parts away from eachother / opening parts, end of this animation partsOpen = true
        tl.to(animDistRun, {
          delay: runDelay,
          duration: runDuration,
          value: animDistRunTarget,
          ease: "easeIn",
          onStart: () => {
            // console.log("starting animDistRun animation: ", animDistRun.value);
            // if (!currentItemSelected.itemName.includes("block")) {
            //   setAnimActive(true);
            // }
          },
          onUpdate: () => {
            // console.log("updating animDistRun animation: ", animDistRun.value);
            setAnimDist(animDistRun.value);
          },
          onComplete: () => {
            // console.log("animDistRun.value: ", animDistRun.value);
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
          onStart: () => {
            // console.log(
            //   "starting animDistReturn animation: ",
            //   animDistReturn.value,
            // );
            // setAnimActive(true);
            // if (!currentItemSelected.itemName.includes("block")) {
            //   setAnimActive(true);
            // }
            // if (currentItemSelected.itemName.includes("block")) {
            //   setStagePosY(-0.1);
            // }
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
            // setAnimActive(false);
            // if (!currentItemSelected.itemName.includes("block")) {
            //   setAnimActive(false);
            // }
          },
        });

        tl.to(stagePosYReturn, {
          delay: dropDelay,
          duration: raiseDuration,
          value: stagePosYReturnTarget,
          ease: "easeIn",
          onStart: () => {
            // console.log("starting animDistRun animation: ", animDistRun.value);
            // setAnimActive(true);
            // if (currentItemSelected.itemName.includes("block")) {
            //   setStagePosY(0.1);
            // }
          },
          onUpdate: () => {
            // console.log("updating animDistRun animation: ", animDistRun.value);
            setStagePosY(stagePosYReturn.value);
          },
          onComplete: () => {
            // console.log("animDistRun.value: ", animDistRun.value);
            // setAnimActive(false);
            setPartsOpen(false);
            setAnimActive(false);
          },
        });
      }
    }
  });

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const updatePartColor = useOptionStore((state) => state.updatePartColor);
  const updatePartColorName = useOptionStore(
    (state) => state.updatePartColorName,
  );
  const updatePartTexture = useOptionStore((state) => state.updatePartTexture);
  const calculateItemPrice = useOptionStore(
    (state) => state.calculateItemPrice,
  );

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
      //  is this necessary if it is also being called in handlePartOption function ? Remove from one of them or make conditional in handlePartOption like e.stopPropogation ?
      e.preventDefault();
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

  const [sceneLoaded, setSceneLoaded] = useState(false);
  const loadingBarElement = document.querySelector(".loading-bar");
  const { active, progress, errors, item, loaded, total } = useProgress();

  const toastId = toast;
  useEffect(() => {
    toast.loading("Loading...", {
      id: toastId,
      position: "top-center",
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
          toast.success("All set!", {
            id: toastId,
            duration: 2000,
          });
        }, 50); // was 500
      }
    }
  }, [progress]);

  // useEffect(() => {
  //   console.log("loaded: ", loaded);
  //   console.log("total: ", total);
  // }, [loaded, total]);

  return (
    <>
      <Toaster />
      <Canvas
        ref={container} // will this work, if not use forwardRef and pass into Scene for use in objects group?
        // flat // changes color rendering, see https://stackoverflow.com/questions/64899716/color-differences-between-threejs-vanilla-js-and-react-three-fiber-create-re
        dpr={[1, 2]}
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{
          fov: 45, // 45
          near: 0.1, // 15
          far: 22, // 900
          position: [12, 12, -12], // [0, 16, 0], // position: [9, 5, -9], // position: [7.5, 15, 7.5],
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
              animActive={animActive}
              showBackground={showBackground}
              setShowBackground={setShowBackground}
              showPartOptions={showPartOptions}
              setShowPartOptions={setShowPartOptions}
              animateParts={animateParts}
              handlePartOption={handlePartOption}
              getRandomInt={getRandomInt}
              randomAllItemsParts={randomAllItemsParts}
              open={open}
              setOpen={setOpen}
              infoBoxIcon={infoBoxIcon}
              setInfoBoxIcon={setInfoBoxIcon}
              showPhotos={showPhotos}
              setShowPhotos={setShowPhotos}
              sceneLoaded={sceneLoaded}
              allPhotos={allPhotos}
              setAllPhotos={setAllPhotos}
              aboutInfo={aboutInfo}
              setAboutInfo={setAboutInfo}
              optionBoxHeightMin={optionBoxHeightMin}
              setOptionBoxHeightMin={setOptionBoxHeightMin}
              stagePosY={stagePosY}
              mobileView={mobileView}
              partsOpen={partsOpen}
              // setPartsOpen={setPartsOpen}
              optionBoxItemChanged={optionBoxItemChanged}
              setOptionBoxItemChanged={setOptionBoxItemChanged}
              optionBoxItemToggle={optionBoxItemToggle}
              setOptionBoxItemToggle={setOptionBoxItemToggle}
              // activeCamPosAnim={activeCamPosAnim}
              setActiveCamPosAnim={setActiveCamPosAnim}
              // activeCamTargAnim={activeCamTargAnim}
              setActiveCamTargAnim={setActiveCamTargAnim}
              activeCamAnim={activeCamAnim}
              setActiveCamAnim={setActiveCamAnim}
            />
          </SnipcartProvider>
        </Suspense>
      </Canvas>
      <div id="footer">Eli Gfell Studio</div>
    </>
  );
}

export default App;
