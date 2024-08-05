import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import * as THREE from "three";
import Scene from "./Scene.jsx";
import Placeholder from "./Placeholder.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useOptionStore } from "../store/useOptionStore.tsx";
import toast from "react-hot-toast";
import {
  LOADED,
  TOAST,
  STAGE_POSITION_Y_ANIM,
  ITEM_PARTS_ANIM,
} from "../data/constants.js";

function Experience() {
  // loading bar element for left to right on animation on app load
  const loadingBarElement = document.querySelector(".loading-bar");

  // animation value objects for object raise/lower animation and exploding view animation
  const animDistRun = {
    value: ITEM_PARTS_ANIM.animDistReturnTarget,
  };
  const animDistReturn = {
    value: ITEM_PARTS_ANIM.animDistRunTarget,
  };

  // useRef
  const container = useRef();

  // loading progress hook
  const { progress, loaded } = useProgress();

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
  const adminFlag = useOptionStore((state) => state.adminFlag);

  // actions from store
  const setMobileView = useOptionStore((state) => state.setMobileView);
  const setSceneLoaded = useOptionStore((state) => state.setSceneLoaded);
  const setAnimToggled = useOptionStore((state) => state.setAnimToggled);
  const setAnimActive = useOptionStore((state) => state.setAnimActive);
  const setAnimIconToggle = useOptionStore((state) => state.setAnimIconToggle);
  const setPartsOpen = useOptionStore((state) => state.setPartsOpen);

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
        }, 50);
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
        const tl = gsap.timeline();

        // open
        // animating the item's parts away from eachother / opening parts, end of this animation partsOpen = true
        tl.to(animDistRun, {
          delay:
            // previousItemSelected === unselectedItem
            //   ? ITEM_PARTS_ANIM.runDelay - 0.5
            //   :
            adminFlag
              ? 0.1
              : animIconToggle
                ? ITEM_PARTS_ANIM.runDelay - 1
                : ITEM_PARTS_ANIM.runDelay + 1.15,
          duration: adminFlag ? 0.1 : ITEM_PARTS_ANIM.runDuration,
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
        const tl = gsap.timeline();

        // close
        // close the object, bring parts back together, ending with no distance between them
        tl.to(animDistReturn, {
          delay: adminFlag ? 0.1 : ITEM_PARTS_ANIM.returnDelay,
          duration: adminFlag ? 0.1 : ITEM_PARTS_ANIM.returnDuration,
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
      }
    }
  });

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
            animDist={animDist}
            animateParts={animateParts}
            stagePosY={stagePosY}
          />
        </Suspense>
      </Canvas>
    </>
  );
}

export default Experience;
