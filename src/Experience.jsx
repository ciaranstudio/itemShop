import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { Leva } from "leva";
import * as THREE from "three";
import Scene from "./components/Scene.jsx";
import Placeholder from "./components/Placeholder.jsx";
// import "./style.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { SnipcartProvider } from "use-snipcart";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { textures } from "./data/textures.jsx";
import { shopItems, unselectedItem } from "./data/objects.jsx";
import { allOptions } from "./data/options.jsx";
import { useOptionStore } from "./store/useOptionStore.tsx";
import toast, { Toaster } from "react-hot-toast";
import {
  LOADED,
  TOAST,
  STAGE_POSITION_Y_ANIM,
  ITEM_PARTS_ANIM,
} from "./data/constants.tsx";
// import ResponsiveAppBar from "./components/interface/header/AppBar.jsx";

function Experience({ theme }) {
  // loading bar element for left to right on animation on app load
  const loadingBarElement = document.querySelector(".loading-bar");

  // animation value objects for object raise/lower animation and exploding view animation
  const animDistRun = {
    value: ITEM_PARTS_ANIM.animDistReturnTarget,
  };
  const animDistReturn = {
    value: ITEM_PARTS_ANIM.animDistRunTarget,
  };
  const stagePosYRun = {
    value: STAGE_POSITION_Y_ANIM.yPosRunLowTarg,
  };
  const stagePosYReturn = {
    value: STAGE_POSITION_Y_ANIM.yPosRunHighTarg,
  };

  // useRef
  const container = useRef();

  // loading progress hook
  const { active, progress, errors, item, loaded, total } = useProgress();

  // useState
  const [animDist, setAnimDist] = useState(0);
  const [stagePosY, setStagePosY] = useState(
    STAGE_POSITION_Y_ANIM.yPosRunLowTarg,
  );

  // state from store
  const animToggled = useOptionStore((state) => state.animToggled);
  const animActive = useOptionStore((state) => state.animActive);
  const animIconToggle = useOptionStore((state) => state.animIconToggle);
  const animateButton = useOptionStore((state) => state.animateButton);
  const previousItemSelected = useOptionStore(
    (state) => state.previousItemSelected,
  );
  const showBackground = useOptionStore((state) => state.showBackground);
  const showPartOptions = useOptionStore((state) => state.showPartOptions);

  // actions from store
  const setMobileView = useOptionStore((state) => state.setMobileView);
  const setSceneLoaded = useOptionStore((state) => state.setSceneLoaded);
  const setAnimToggled = useOptionStore((state) => state.setAnimToggled);
  const setAnimActive = useOptionStore((state) => state.setAnimActive);
  const setAnimIconToggle = useOptionStore((state) => state.setAnimIconToggle);
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
    toast.loading("Loading...", {
      id: "loadingToast",
      position: "bottom-center",
      style: {
        fontSize: TOAST.fontSize,
        background: TOAST.background,
        color: TOAST.color,
        fontFamily: "var(--leva-fonts-mono)",
        borderTop: "0.1rem solid #e0e0e0,",
      },
    });
  }, []);

  useEffect(() => {
    // loadingBarElement.style.transform = `scaleX(${progress / 100})`;
    loadingBarElement.style.transform = `scaleX(${loaded / 149})`;
    console.log("progress: ", progress, "loaded: ", loaded);
    if (loaded >= LOADED.nearTotal) {
      if (loaded / LOADED.total === 1 || progress === 100) {
        setSceneLoaded(true);
        window.setTimeout(() => {
          // update loadingBarElement
          loadingBarElement.classList.add("ended");
          loadingBarElement.style.transform = "";
          toast.success("All set!", {
            id: "loadingToast",
            duration: TOAST.duration - 7000,
            position: "bottom-center",
            style: {
              fontSize: TOAST.fontSize,
              background: TOAST.background,
              color: TOAST.color,
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
      // check state of animation switch, if animToggled = false then open the object, if true close it
      if (!animToggled) {
        setPartsOpen(false);
        setAnimActive(true);
        let tl = gsap.timeline();
        // if (!animIconToggle) {
        //   tl.to(stagePosYRun, {
        //     delay: STAGE_POSITION_Y_ANIM.raiseDelay,
        //     duration: STAGE_POSITION_Y_ANIM.raiseDuration,
        //     value: STAGE_POSITION_Y_ANIM.stagePosYRunTarget,
        //     ease: "easeIn",
        //     onUpdate: () => {
        //       setStagePosY(stagePosYRun.value);
        //     },
        //   });
        // }

        // open
        // animating the item's parts away from eachother / opening parts, end of this animation partsOpen = true
        tl.to(animDistRun, {
          delay:
            // previousItemSelected === unselectedItem
            //   ? ITEM_PARTS_ANIM.runDelay - 0.5
            //   :
            animIconToggle
              ? ITEM_PARTS_ANIM.runDelay - 1
              : ITEM_PARTS_ANIM.runDelay + 1.15,
          duration: ITEM_PARTS_ANIM.runDuration,
          value: ITEM_PARTS_ANIM.animDistRunTarget,
          ease: "easeOut",
          onUpdate: () => {
            setAnimDist(animDistRun.value);
          },
          onComplete: () => {
            setAnimIconToggle(false);
            setAnimActive(false);
            setPartsOpen(true);
            setAnimToggled(!animToggled);
          },
        });
      } else if (animToggled) {
        setAnimActive(true);
        let tl = gsap.timeline();

        // close
        // close the object, bring parts back together, ending with no distance between them
        tl.to(animDistReturn, {
          delay: ITEM_PARTS_ANIM.returnDelay,
          duration: ITEM_PARTS_ANIM.returnDuration,
          value: ITEM_PARTS_ANIM.animDistReturnTarget,
          ease: "easeOut",
          onUpdate: () => {
            setAnimDist(animDistReturn.value);
          },
          onComplete: () => {
            setAnimIconToggle(false);
            setPartsOpen(false);
            setAnimActive(false);
            setAnimToggled(!animToggled);
          },
        });
        // if (!animIconToggle) {
        //   tl.to(stagePosYReturn, {
        //     delay: STAGE_POSITION_Y_ANIM.dropDelay,
        //     duration: STAGE_POSITION_Y_ANIM.dropDuration,
        //     value: STAGE_POSITION_Y_ANIM.stagePosYReturnTarget,
        //     ease: "easeIn",
        //     onUpdate: () => {
        //       setStagePosY(stagePosYReturn.value);
        //     },
        //     onComplete: () => {
        //       setAnimIconToggle(false);
        //       setPartsOpen(false);
        //       setAnimActive(false);
        //     },
        //   });
        // }
      }
    }
  });
  const animateStageY = contextSafe(() => {
    let tl = gsap.timeline();
    if (!showBackground) {
      tl.to(stagePosYRun, {
        delay: STAGE_POSITION_Y_ANIM.raiseDelay,
        duration: STAGE_POSITION_Y_ANIM.raiseDuration,
        value: STAGE_POSITION_Y_ANIM.stagePosYRunTarget,
        ease: "easeIn",
        onUpdate: () => {
          setStagePosY(stagePosYRun.value);
        },
      });
    } else {
      tl.to(stagePosYReturn, {
        delay: STAGE_POSITION_Y_ANIM.dropDelay,
        duration: STAGE_POSITION_Y_ANIM.dropDuration,
        value: STAGE_POSITION_Y_ANIM.stagePosYReturnTarget,
        ease: "easeIn",
        onUpdate: () => {
          setStagePosY(stagePosYReturn.value);
        },
      });
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
          <Scene
            theme={theme}
            animDist={animDist}
            animateParts={animateParts}
            animateStageY={animateStageY}
            handlePartOption={handlePartOption}
            randomAllItemsParts={randomAllItemsParts}
            stagePosY={stagePosY}
          />
        </Suspense>
      </Canvas>
    </>
  );
}

export default Experience;
