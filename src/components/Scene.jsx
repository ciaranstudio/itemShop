import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
// import { Perf } from "r3f-perf";
import {
  OrbitControls,
  useTexture,
  Sky,
  ScreenSpace,
  useCursor,
} from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ItemPart } from "./item/ItemPart.jsx";
import RingCircle from "./item/RingCircle.jsx";
import { Floor } from "./room/Floor.jsx";
import { Walls } from "./room/Walls.jsx";
import { objects, unselectedItem, shopItems } from "../data/objects.js";
import { textures } from "../data/textures.js";
import { allOptions } from "../data/options.js";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useSnipcart } from "use-snipcart";
import { SelectIcon } from "./item/SelectIcon.jsx";
import { ArrowIcon } from "./interface/ArrowIcon.jsx";
// import toast from "react-hot-toast";
import { useOptionStore } from "../store/useOptionStore.tsx";
import {
  LIGHT,
  ORBIT_CONTROLS,
  ARROW_ICON,
  CAM_TARG_ANIM,
  CAM_POS_ANIM,
} from "../data/constants.js";
import { CenterAnchor } from "./interface/CenterAnchor.jsx";
import { handlePartOption } from "../utils/handlePartOption.js";
// import { theme } from "../data/theme.js";

export default function Scene({ animDist, animateParts, stagePosY }) {
  // textures
  const [
    colorMapWhiteStain,
    // displacementMap,
    normalMapWhiteStain,
    roughnessWhiteMapStain,
    metalnessWhiteMapStain,
    // aoMap,
  ] = useTexture(textures.whiteTexture);
  const [
    colorMapNaturalStain,
    // displacementMap,
    normalMapNaturalStain,
    roughnessNaturalMapStain,
    metalnessNaturalMapStain,
    // aoMap,
  ] = useTexture(textures.naturalTexture);
  const [
    colorMapBlackStain,
    // displacementMap,
    normalMapBlackStain,
    roughnessBlackMapStain,
    metalnessBlackMapStain,
    // aoMap,
  ] = useTexture(textures.blackTexture);
  const [
    colorMapAllBlackStain,
    // displacementMap,
    normalMapAllBlackStain,
    roughnessAllBlackMapStain,
    metalnessAllBlackMapStain,
    // aoMap,
  ] = useTexture(textures.allBlackTexture);
  const [
    colorMapPainted,
    // displacementMapPainted,
    normalMapPainted,
    roughnessMapPainted,
    metalnessMapPainted,
    // aoMapPainted,
  ] = useTexture(textures.paintedTexture);

  // useRef
  const dirLightA = useRef();
  const orbitRef = useRef();

  // useState
  const [snipcartLoaded, setSnipcartLoaded] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [overlayAlpha, setOverlayAlpha] = useState(1);
  const [controlsDragging, setControlsDragging] = useState(false);
  const [hovered, hover] = useState(false);
  const [count, setCount] = useState(0);
  const [prevStartAzimuthAng, setPrevStartAzimuthAng] = useState(0);
  const [prevEndAzimuthAng, setPrevEndAzimuthAng] = useState(0);
  const [startAzimuthAng, setStartAzimuthAng] = useState(0);
  const [endAzimuthAng, setEndAzimuthAng] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const [dragTime, setDragTime] = useState(0);
  const [brokenCount, setBrokenCount] = useState(0);
  const [targetVec, setTargetVec] = useState(new THREE.Vector3());
  const [arrowRotationX, setArrowRotationX] = useState(Math.PI * 2);

  // state from store
  const currentItemSelected = useOptionStore(
    (state) => state.currentItemSelected,
  );
  const previousItemSelected = useOptionStore(
    (state) => state.previousItemSelected,
  );
  const sceneLoaded = useOptionStore((state) => state.sceneLoaded);
  const open = useOptionStore((state) => state.open);
  const showBackground = useOptionStore((state) => state.showBackground);
  const showPartOptions = useOptionStore((state) => state.showPartOptions);
  const optionBoxItemChanged = useOptionStore(
    (state) => state.optionBoxItemChanged,
  );
  const optionBoxItemToggle = useOptionStore(
    (state) => state.optionBoxItemToggle,
  );
  const animActive = useOptionStore((state) => state.animActive);
  const partsOpen = useOptionStore((state) => state.partsOpen);
  const arrowAnimActive = useOptionStore((state) => state.arrowAnimActive);
  const showPaintOptions = useOptionStore((state) => state.showPaintOptions);
  const locationPathname = useOptionStore((state) => state.locationPathname);
  const adminFlag = useOptionStore((state) => state.adminFlag);

  // actions from store
  const setCurrentItemSelected = useOptionStore(
    (state) => state.setCurrentItemSelected,
  );
  const setPreviousItemSelected = useOptionStore(
    (state) => state.setPreviousItemSelected,
  );
  const setCurrentPartName = useOptionStore(
    (state) => state.setCurrentPartName,
  );
  const setCurrentItemName = useOptionStore(
    (state) => state.setCurrentItemName,
  );
  const setShowPaintOptions = useOptionStore(
    (state) => state.setShowPaintOptions,
  );
  const setShowBackground = useOptionStore((state) => state.setShowBackground);
  const setOptionBoxItemChanged = useOptionStore(
    (state) => state.setOptionBoxItemChanged,
  );
  const setActiveCamPosAnim = useOptionStore(
    (state) => state.setActiveCamPosAnim,
  );
  const setActiveCamTargAnim = useOptionStore(
    (state) => state.setActiveCamTargAnim,
  );
  const setActiveCamAnim = useOptionStore((state) => state.setActiveCamAnim);
  const setArrowAnimActive = useOptionStore(
    (state) => state.setArrowAnimActive,
  );

  const updatePartColor = useOptionStore((state) => state.updatePartColor);
  const updatePartColorName = useOptionStore(
    (state) => state.updatePartColorName,
  );
  const updatePartTexture = useOptionStore((state) => state.updatePartTexture);
  const calculateItemPrice = useOptionStore(
    (state) => state.calculateItemPrice,
  );
  const getRandomInt = useOptionStore((state) => state.getRandomInt);

  // random colors for all item parts on initinal load
  const randomAllItemsParts = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const randomAllItemsColors = shopItems.map((item) => {
      const itemColors = item.parts.map((part) => {
        const color = allOptions[getRandomInt(allOptions.length)];
        handlePartOption(
          e,
          item.itemName,
          part.partName,
          color,
          false,
          updatePartColor,
          updatePartColorName,
          updatePartTexture,
          calculateItemPrice,
        );
        return color;
      });
      return itemColors;
    });
    // console.log("random colors generated list: ", randomAllItemsColors);
  };

  // hooks
  const { width } = useWindowDimensions();
  useCursor(hovered);

  // snipcart hook values
  const snipcart = useSnipcart();
  const { cart = {} } = useSnipcart();
  const { subtotal = "0.00" } = cart;

  // animation geometry and material for loading overlay opacity animation
  const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
  // gl_FragColor = vec4(0.153, 0.153, 0.102, uAlpha); // (previous gl_FragColor)
  const overlayMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      uAlpha: { value: overlayAlpha },
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.67843137126, 0.72941176332, 0.72941176332, uAlpha);
        }
    `,
  });
  // animation object for loading overlay opacity animation
  const overlayOpacity = { value: 1 };
  // vector3s for camera target and camera position animations
  const controlsTargetVec = new THREE.Vector3();
  const controlsPositionVec = new THREE.Vector3();
  // animation object for rotating ArrowIcon on toggle
  const arrowRotationUp = { value: Math.PI * 2 };
  const arrowRotationDown = { value: 0 };

  // useEffect
  useEffect(() => {
    // prevent swipe back navigation gesture on iOS mobile devices
    const element = document.querySelector("canvas");
    element.addEventListener("touchstart", (e) => {
      setIsTouching(true);
      // is not near edge of view, exit
      // if (e.pageX > 20 && e.pageX < window.innerWidth - 20) return; // suggested by reference showing this method of preventing edge swipes iOS
      if (e.pageX > 30 && e.pageX < window.innerWidth - 30) return;
      // prevent swipe to navigate gesture
      e.preventDefault();
    });
    element.addEventListener("touchmove", (e) => {
      setIsTouching(true);
    });
    element.addEventListener("touchend", (e) => {
      setIsTouching(false);
    });
    // setInitialLoad(true);
    if (orbitRef.current) {
      orbitRef.current.addEventListener(
        "start",
        () => {
          // console.log("start");
          setDragTime(0);
          setControlsDragging(true);
          setIsTouching(true);
          if (orbitRef.current.autoRotate) orbitRef.current.autoRotate = false;
          setStartAzimuthAng(orbitRef.current.getAzimuthalAngle());
        },
        true,
      );
      // orbitRef.current.addEventListener(
      //   "change",
      //   () => {
      //     // console.log("change");
      //     // setControlsDragging(true);
      //   },
      //   true,
      // );
      orbitRef.current.addEventListener(
        "end",
        () => {
          // console.log("end");
          setIsTouching(false);
          setControlsDragging(false);
          setEndAzimuthAng(orbitRef.current.getAzimuthalAngle());
        },
        true,
      );
    }
    return () => {
      element.removeEventListener("touchstart", (e) => {
        // prevent swipe to navigate gesture
        console.log("removed event listener, 'touchstart'");
      });
      element.removeEventListener("touchmove", (e) => {
        console.log("removed event listener, 'touchmove'");
      });
      element.removeEventListener("touchend", (e) => {
        console.log("removed event listener, 'touchend'");
      });
      if (orbitRef.current) {
        orbitRef.current.removeEventListener(
          "start",
          () => console.log("removed event listener, 'start'"),
          true,
        );
        // orbitRef.current.removeEventListener(
        //   "change",
        //   () => console.log("removed event listener, 'change'"),
        //   true,
        // );
        orbitRef.current.removeEventListener(
          "end",
          () => console.log("removed event listener, 'end'"),
          true,
        );
        setControlsDragging(false);
      }
    };
  }, []);
  useEffect(() => {
    // const state = snipcart.getState();
    if (window.Snipcart) {
      setSnipcartLoaded(true);
      if (cart.items) setCartCount(cart.items.count);
    } else {
      setSnipcartLoaded(false);
    }
    return () => {
      setSnipcartLoaded(false);
    };
  }, [window.Snipcart]);
  useEffect(() => {
    if (snipcartLoaded) {
      if (cart) {
        if (cart.items) {
          setCartCount(cart.items.count);
          // document.getElementById("footer").innerHTML =
          //   `snipcartLoaded = ${snipcartLoaded}, cartCount = ${cart.items.count}, cart = ${cart}`;
        }
      }
    }
  }, [snipcartLoaded, cart, controlsDragging]);
  useEffect(() => {
    if (sceneLoaded) {
      window.setTimeout(() => {
        // animate overlay
        gsap.to(overlayOpacity, {
          duration: 3,
          value: 0,
          delay: 0, //
          onStart: () => {
            window.document.body.style.cursor = "auto";
          },
          onUpdate: () => {
            setOverlayAlpha(overlayOpacity.value);
          },
        });
      }, 500);
    }
  }, [sceneLoaded]);
  useEffect(() => {
    if (adminFlag) handleArrowIconClick(null);
  }, [adminFlag]);
  useEffect(() => {
    if (currentItemSelected === unselectedItem) {
      randomAllItemsParts(false);
    }
    // shuffle color randomly on initial load counter
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    if (count === 4 && showBackground) {
      // // toast.dismiss();
      // toast("Cart", {
      //   duration: TOAST.duration,
      //   position: "top-right",
      //   // Styling
      //   style: {
      //     fontSize: TOAST.fontSize,
      //     background: TOAST.background,
      //     color: TOAST.color,
      //     fontFamily: "var(--leva-fonts-mono)",
      //   },
      //   className: "",
      //   // Custom Icon
      //   // icon: "🛒",
      //   // Change colors of success/error/loading icon
      //   iconTheme: {
      //     primary: "#000",
      //     secondary: "#fff",
      //   },
      //   // Aria
      //   ariaProps: {
      //     role: "status",
      //     "aria-live": "polite",
      //   },
      // });
      // toast("Menu", {
      //   duration: TOAST.duration,
      //   position: "top-left",
      //   // Styling
      //   style: {
      //     fontSize: TOAST.fontSize,
      //     background: TOAST.background,
      //     color: TOAST.color,
      //     fontFamily: "var(--leva-fonts-mono)",
      //   },
      //   className: "",
      //   // Custom Icon
      //   // icon: "📑",
      //   // Change colors of success/error/loading icon
      //   iconTheme: {
      //     primary: "#000",
      //     secondary: "#fff",
      //   },
      //   // Aria
      //   ariaProps: {
      //     role: "status",
      //     "aria-live": "polite",
      //   },
      // });
    } else if (count === 5 && showBackground) {
      // // toast.dismiss();
      // toast("Drag to rotate", {
      //   duration: TOAST.duration,
      //   position: "top-right",
      //   // Styling
      //   style: {
      //     fontSize: TOAST.fontSize,
      //     background: TOAST.background,
      //     color: TOAST.color,
      //     fontFamily: "var(--leva-fonts-mono)",
      //   },
      //   className: "",
      //   // Custom Icon
      //   iconTheme: {
      //     primary: "#000",
      //     secondary: "#fff",
      //   },
      //   // Aria
      //   ariaProps: {
      //     role: "status",
      //     "aria-live": "polite",
      //   },
      // });
    } else if (count === 7 && showBackground) {
      // toast("Pinch to zoom", {
      //   duration: TOAST.duration,
      //   position: "top-right",
      //   // Styling
      //   style: {
      //     fontSize: TOAST.fontSize,
      //     background: TOAST.background,
      //     color: TOAST.color,
      //     fontFamily: "var(--leva-fonts-mono)",
      //   },
      //   className: "",
      //   // Custom Icon
      //   iconTheme: {
      //     primary: "#000",
      //     secondary: "#fff",
      //   },
      //   // Aria
      //   ariaProps: {
      //     role: "status",
      //     "aria-live": "polite",
      //   },
      // });
    } else if (count === 9 && showBackground) {
      // toast("Tap to select", {
      //   duration: TOAST.duration,
      //   position: "top-right",
      //   // Styling
      //   style: {
      //     fontSize: TOAST.fontSize,
      //     background: TOAST.background,
      //     color: TOAST.color,
      //     fontFamily: "var(--leva-fonts-mono)",
      //   },
      //   className: "",
      //   // Custom Icon
      //   iconTheme: {
      //     primary: "#000",
      //     secondary: "#fff",
      //   },
      //   // Aria
      //   ariaProps: {
      //     role: "status",
      //     "aria-live": "polite",
      //   },
      // });
    } else if (count === 10 && currentItemSelected === unselectedItem) {
      handleArrowIconClick(null);
    } else if (count === 12 && showBackground) {
      // toast("Toggles options", {
      //   duration: TOAST.duration,
      //   position: "top-right",
      //   // Styling
      //   style: {
      //     fontSize: TOAST.fontSize,
      //     background: TOAST.background,
      //     color: TOAST.color,
      //     fontFamily: "var(--leva-fonts-mono)",
      //   },
      //   className: "",
      //   // Custom Icon
      //   icon: <KeyboardArrowUpIcon />,
      //   iconTheme: {
      //     primary: "#000",
      //     secondary: "#fff",
      //   },
      //   // Aria
      //   ariaProps: {
      //     role: "status",
      //     "aria-live": "polite",
      //   },
      // });
    }
    //Clearing the interval
    return () => clearInterval(interval);
  }, [count]);
  useEffect(() => {
    if (!showBackground && !showPartOptions) {
      // console.log(
      //   "showBackground false and showPartOptions false so fetching objects[thisItemName].parts[0].itemName: ",
      //   objects[currentItemSelected.itemName].parts[0].itemName,
      // );
      setCurrentItemName(
        objects[currentItemSelected.itemName].parts[0].itemName,
      );
      setCurrentPartName(
        objects[currentItemSelected.itemName].parts[0].partName,
      );
      setShowPaintOptions(true);
    }
    if (!showBackground) {
      animateParts();
    } else if (showBackground && currentItemSelected !== unselectedItem) {
      setShowPaintOptions(false);
      setOptionBoxItemChanged(false);
      if (partsOpen) animateParts();
    }
    if (!showBackground && previousItemSelected.itemName === "noSelect") {
      // toast("Toggles background", {
      //   duration: TOAST.duration,
      //   position: "top-right",
      //   // Styling
      //   style: {
      //     fontSize: TOAST.fontSize,
      //     background: TOAST.background,
      //     color: TOAST.color,
      //     fontFamily: "var(--leva-fonts-mono)",
      //   },
      //   className: "",
      //   // Custom Icon
      //   icon: "⮐",
      //   // Change colors of success/error/loading icon
      //   iconTheme: {
      //     primary: "#000",
      //     secondary: "#fff",
      //   },
      //   // Aria
      //   ariaProps: {
      //     role: "status",
      //     "aria-live": "polite",
      //   },
      // });
      // toast("Also toggles background", {
      //   duration: TOAST.duration,
      //   position: "top-right",
      //   // Styling
      //   style: {
      //     fontSize: TOAST.fontSize,
      //     background: TOAST.background,
      //     color: TOAST.color,
      //     fontFamily: "var(--leva-fonts-mono)",
      //   },
      //   className: "",
      //   // Custom Icon
      //   icon: <KeyboardArrowUpIcon />,
      //   // Change colors of success/error/loading icon
      //   iconTheme: {
      //     primary: "#000",
      //     secondary: "#fff",
      //   },
      //   // Aria
      //   ariaProps: {
      //     role: "status",
      //     "aria-live": "polite",
      //   },
      // });
    }
  }, [showBackground]);

  useEffect(() => {
    if (controlsDragging) {
      setPrevEndAzimuthAng(endAzimuthAng);
      // document.getElementById("footer").innerHTML =
      //   " controls dragging = true ";
      // document.getElementById("footer").innerHTML +=
      //   ` start: ${startAzimuthAng} end: ${endAzimuthAng} `;
      // document.getElementById("footer").innerHTML += ` dragTime: ${dragTime} `;
      // document.getElementById("footer").innerHTML +=
      //   ` prevStart: ${prevStartAzimuthAng} prevEnd: ${prevEndAzimuthAng} `;
    } else {
      setPrevStartAzimuthAng(startAzimuthAng);
      if (startAzimuthAng !== 0 && endAzimuthAng !== 0) {
        let startAzString = String(startAzimuthAng);
        let endAzString = String(endAzimuthAng);
        let prevStartAzString = String(prevStartAzimuthAng);
        let prevEndAzString = String(prevEndAzimuthAng);

        startAzString = startAzString.substring(
          0,
          startAzString.indexOf(".") + 7,
        );
        endAzString = endAzString.substring(0, endAzString.indexOf(".") + 7);
        prevStartAzString = prevStartAzString.substring(
          0,
          prevStartAzString.indexOf(".") + 7,
        );
        prevEndAzString = prevEndAzString.substring(
          0,
          prevEndAzString.indexOf(".") + 7,
        );
        let azArr = [
          startAzString,
          endAzString,
          prevStartAzString,
          prevEndAzString,
        ];
        // document.getElementById("footer").innerHTML =
        //   " controls dragging = false ";
        // document.getElementById("footer").innerHTML +=
        //   ` start: ${startAzString} end: ${endAzString} `;
        // document.getElementById("footer").innerHTML +=
        //   ` dragTime: ${dragTime} `;
        // document.getElementById("footer").innerHTML +=
        //   ` prevStart: ${prevStartAzString} prevEnd: ${prevEndAzString} `;
        if (allEqual(azArr) && dragTime > 0.5 && brokenCount < 4) {
          // document.getElementById("footer").innerHTML +=
          //   "might need to reset page, controls could be broken ";
          setBrokenCount((prev) => prev + 1);
        }
      }
    }
  }, [controlsDragging]);
  useEffect(() => {
    if (brokenCount === 4) {
      // document.getElementById("footer").innerHTML +=
      //   "confirmed need to reset page, controls are broken ";
      window.location.reload();
    }
  }, [brokenCount]);
  useEffect(() => {
    if (isTouching && !controlsDragging) {
      // document.getElementById("footer").innerHTML = " isTouching = true ";
      if (orbitRef.current) {
        let firstAzAng = orbitRef.current.getAzimuthalAngle();
        let secondAzAng = 0;
        let thirdAzAng = 0;
        let fourthAzAng = 0;
        let fifthAzAng = 0;
        let azArr = [
          firstAzAng,
          secondAzAng,
          thirdAzAng,
          fourthAzAng,
          fifthAzAng,
        ];
        setTimeout(() => {
          if (isTouching && !controlsDragging) {
            secondAzAng = orbitRef.current.getAzimuthalAngle();
            // document.getElementById("footer").innerHTML =
            //   " running stuck check 1 ";
            if (firstAzAng === secondAzAng) {
              // document.getElementById("footer").innerHTML =
              //   " current stuck check = true ";
              setTimeout(() => {
                if (isTouching && !controlsDragging) {
                  thirdAzAng = orbitRef.current.getAzimuthalAngle();
                  // document.getElementById("footer").innerHTML =
                  //   " running stuck check 2 ";
                  if (firstAzAng === secondAzAng && firstAzAng === thirdAzAng) {
                    // document.getElementById("footer").innerHTML =
                    //   " current stuck check = true ";
                    setTimeout(() => {
                      if (isTouching && !controlsDragging) {
                        fourthAzAng = orbitRef.current.getAzimuthalAngle();
                        // document.getElementById("footer").innerHTML =
                        //   " running stuck check 3 ";
                        if (
                          firstAzAng === secondAzAng &&
                          firstAzAng === thirdAzAng &&
                          firstAzAng === fourthAzAng
                        ) {
                          // document.getElementById("footer").innerHTML =
                          //   " current stuck check = true ";
                          setTimeout(() => {
                            if (isTouching && !controlsDragging) {
                              fifthAzAng = orbitRef.current.getAzimuthalAngle();
                              // document.getElementById("footer").innerHTML =
                              //   " running stuck check 4 ";
                              if (allEqual(azArr)) {
                                // document.getElementById("footer").innerHTML =
                                //   " controls aren't changing, force reload ";
                                window.location.reload();
                              } else {
                                // document.getElementById("footer").innerHTML =
                                //   " current stuck check = false ";
                              }
                            }
                          }, "600");
                        } else {
                          // document.getElementById("footer").innerHTML =
                          //   " current stuck check = false ";
                        }
                      }
                    }, "300");
                  } else {
                    // document.getElementById("footer").innerHTML =
                    //   " current stuck check = false ";
                  }
                }
              }, "450");
            } else {
              // document.getElementById("footer").innerHTML =
              //   " current stuck check = false ";
            }
          }
        }, "150");
      }
    }
  }, [isTouching]);

  // functions
  // function handleCartClick() {
  //   if (snipcartLoaded) {
  //     window.Snipcart.api.theme.cart.open();
  //   }
  // }
  const handleClick = (e) => {
    e.stopPropagation();
    const { eventObject } = e;
    if (showBackground) {
      let tempObjectPosition = eventObject.position;
      let positionMatch = (element) =>
        element.position.x === tempObjectPosition.x &&
        element.position.y === tempObjectPosition.y &&
        element.position.z === tempObjectPosition.z;
      let matchedItem = shopItems.find(positionMatch);
      setPreviousItemSelected(currentItemSelected);
      setCurrentItemSelected(matchedItem);
    }
  };
  const handleItemPartClick = (e, part) => {
    if (!showBackground) {
      if (part.itemName === currentItemSelected.itemName) {
        setCurrentItemName(part.itemName);
        setCurrentPartName(part.partName);
      }
    } else {
      setCurrentItemName(part.itemName);
      setCurrentPartName(part.partName);
    }
  };

  const handleArrowIconClick = (e) => {
    if (e) e.stopPropagation();
    // if showPaintOptions is true then disable this click handler
    // (paint options layer on top of this arrow icon on mobile devices)
    // // toast.dismiss();
    if (!showPaintOptions) {
      if (currentItemSelected === unselectedItem) {
        setCurrentItemSelected(objects.gramps);
        setTimeout(() => {
          setShowBackground(!showBackground);
        }, "750");
      } else {
        if (!animActive && !arrowAnimActive) {
          setShowBackground(!showBackground);
        }
      }
    }
  };

  // const handleOffClick = (e) => {
  //   e.stopPropagation();
  //   // console.log("onPointerMissed click");
  // };
  const allEqual = (arr) => arr.every((v) => v === arr[0]);
  const animatedPosition = (animation, animDist) => {
    let x = 0;
    let y = 0;
    let z = 0;
    switch (animation) {
      case "negX":
        x = -animDist;
        break;
      case "posX":
        x = animDist;
        break;
      case "negZ":
        z = -animDist;
        break;
      case "posZ":
        z = animDist;
        break;
      case "posY1":
        y = animDist;
        break;
      case "posY2":
        y = animDist + animDist / 2;
        break;
      case "negZposY1":
        z = -animDist;
        y = animDist;
        break;
      case "posXposY1":
        x = animDist;
        y = animDist;
        break;
      case "none":
        break;
    }
    let position = [x, y, z];
    return position;
  };

  // useFrame
  useFrame((state, delta) => {
    if (controlsDragging) {
      setDragTime(dragTime + delta);
      // console.log("controls dragging for ", dragTime);
    }
  });

  // gsap animation hooks
  // camera (target and position) animations
  useGSAP(() => {
    // setAnimActive()
    if (
      previousItemSelected.itemName.includes("shelfA32") ||
      previousItemSelected.itemName.includes("shelfB16")
    ) {
      controlsTargetVec.set(
        previousItemSelected.position.x,
        previousItemSelected.position.y + 1,
        previousItemSelected.position.z,
      );
    } else if (
      previousItemSelected.itemName.includes("shelfA16") ||
      previousItemSelected.itemName.includes("shelfB32")
    ) {
      controlsTargetVec.set(
        previousItemSelected.position.x,
        previousItemSelected.position.y + 1.25,
        previousItemSelected.position.z,
      );
    } else {
      controlsTargetVec.set(
        previousItemSelected.position.x,
        previousItemSelected.position.y,
        previousItemSelected.position.z,
      );
    }
    if (
      currentItemSelected.itemName !== "noSelect" &&
      !currentItemSelected.itemName.includes("shelf")
    ) {
      const tl = gsap.timeline();
      tl.to(controlsTargetVec, {
        delay: adminFlag
          ? 0.1
          : optionBoxItemChanged
            ? CAM_TARG_ANIM.camTargAnimDelay - 0.075
            : CAM_TARG_ANIM.camTargAnimDelay,
        duration: adminFlag
          ? 0.1
          : previousItemSelected === unselectedItem
            ? CAM_TARG_ANIM.camTargAnimDuration + 0.5 // CAM_TARG_ANIM.camTargAnimDuration - 0.15
            : optionBoxItemChanged
              ? CAM_TARG_ANIM.camTargAnimDuration * 1.5
              : CAM_TARG_ANIM.camTargAnimDuration,
        x: currentItemSelected.position.x,
        y: currentItemSelected.position.y,
        z: currentItemSelected.position.z,
        ease: "easeIn",
        onStart: () => {
          setActiveCamTargAnim(true);
          setActiveCamAnim(true);
          orbitRef.current.enableRotate = false;
          orbitRef.current.enableZoom = false;
        },
        onUpdate: () => {
          orbitRef.current.target.set(
            controlsTargetVec.x,
            controlsTargetVec.y,
            controlsTargetVec.z,
          );
          // orbitRef.current.object.updateProjectionMatrix();
          // orbitRef.current.update();
        },
        onComplete: () => {
          orbitRef.current.object.updateProjectionMatrix();
          orbitRef.current.update();
          orbitRef.current.enableRotate = true;
          orbitRef.current.enableZoom = true;
          setActiveCamTargAnim(false);
          if (!optionBoxItemChanged) setActiveCamAnim(false);
        },
      });
    } else if (
      currentItemSelected.itemName.includes("shelfA32") ||
      currentItemSelected.itemName.includes("shelfB16")
    ) {
      const tl = gsap.timeline();
      tl.to(controlsTargetVec, {
        delay: adminFlag
          ? 0.1
          : optionBoxItemChanged
            ? CAM_TARG_ANIM.camTargAnimDelay - 0.075
            : CAM_TARG_ANIM.camTargAnimDelay,
        duration: adminFlag
          ? 0.1
          : optionBoxItemChanged
            ? CAM_TARG_ANIM.camTargAnimDuration * 1.5
            : CAM_TARG_ANIM.camTargAnimDuration,
        x: currentItemSelected.position.x,
        y: currentItemSelected.position.y + 1,
        z: currentItemSelected.position.z,
        ease: "easeIn",
        onStart: () => {
          setActiveCamTargAnim(true);
          setActiveCamAnim(true);
          orbitRef.current.enableRotate = false;
          orbitRef.current.enableZoom = false;
        },
        onUpdate: () => {
          orbitRef.current.target.set(
            controlsTargetVec.x,
            controlsTargetVec.y,
            controlsTargetVec.z,
          );
          // orbitRef.current.object.updateProjectionMatrix();
          // orbitRef.current.update();
        },
        onComplete: () => {
          orbitRef.current.object.updateProjectionMatrix();
          orbitRef.current.update();
          orbitRef.current.enableRotate = true;
          orbitRef.current.enableZoom = true;
          setActiveCamTargAnim(false);
          if (!optionBoxItemChanged) setActiveCamAnim(false);
        },
      });
    } else if (
      currentItemSelected.itemName.includes("shelfA16") ||
      currentItemSelected.itemName.includes("shelfB32")
    ) {
      const tl = gsap.timeline();
      tl.to(controlsTargetVec, {
        delay: adminFlag
          ? 0.1
          : optionBoxItemChanged
            ? CAM_TARG_ANIM.camTargAnimDelay - 0.075
            : CAM_TARG_ANIM.camTargAnimDelay,
        duration: adminFlag
          ? 0.1
          : optionBoxItemChanged
            ? CAM_TARG_ANIM.camTargAnimDuration * 1.5
            : CAM_TARG_ANIM.camTargAnimDuration,
        x: currentItemSelected.position.x,
        y: currentItemSelected.position.y + 1.25,
        z: currentItemSelected.position.z,
        ease: "easeIn",
        onStart: () => {
          setActiveCamTargAnim(true);
          setActiveCamAnim(true);
          orbitRef.current.enableRotate = false;
          orbitRef.current.enableZoom = false;
        },
        onUpdate: () => {
          orbitRef.current.target.set(
            controlsTargetVec.x,
            controlsTargetVec.y,
            controlsTargetVec.z,
          );
          // orbitRef.current.object.updateProjectionMatrix();
          // orbitRef.current.update();
        },
        onComplete: () => {
          orbitRef.current.object.updateProjectionMatrix();
          orbitRef.current.update();
          orbitRef.current.enableRotate = true;
          orbitRef.current.enableZoom = true;
          setActiveCamTargAnim(false);
          if (!optionBoxItemChanged) setActiveCamAnim(false);
        },
      });
    }
  }, [currentItemSelected]);
  useGSAP(() => {
    if (!showBackground) {
      if (orbitRef.current) {
        if (orbitRef.current.object.position !== targetVec) {
          let xPlus = -1.65;
          let yPlus = 1.25;
          let zPlus = -1.165;

          if (currentItemSelected.itemName === "gramps") {
            xPlus = -1.75; // xPlus = -2.15; // -1.75
            yPlus = 0.75; // yPlus = 1; // 0.5
            zPlus = -0.575; // zPlus = -0.575; // -0.75
          } else if (currentItemSelected.itemName === "block") {
            xPlus = -0.5;
            yPlus = 0.25; //   yPlus = 0.75;
            zPlus = -0.75; // zPlus = -1.5;
          } else if (currentItemSelected.itemName === "horse") {
            xPlus = 2; // xPlus = 2; // -1.75
            yPlus = 1.5; // yPlus = 1.25; // 1.25
            zPlus = -1.75; // zPlus = -2.5; // -2.1
          } else if (currentItemSelected.itemName === "squatter") {
            xPlus = 1.75; // xPlus = 1.95; // 1.75
            yPlus = 0.5; // yPlus = 0.75; // 0.5
            zPlus = 0.6375; // zPlus = 1.15; // 1
          } else if (currentItemSelected.itemName === "shelfA16") {
            xPlus = 1.5; // 1 // 1.5
            yPlus = 2; // 1.75 // 1.25
            zPlus = -0.5; // -1 // 1.5
          } else if (currentItemSelected.itemName === "shelfA32") {
            xPlus = 2; // 1.5
            yPlus = 1.5; // 1
            zPlus = -1; // 1.5
          } else if (currentItemSelected.itemName === "shelfB16") {
            xPlus = -0.75; // -1.5
            yPlus = 1.25; //  1
            zPlus = -1.75; // -1.5
          } else if (currentItemSelected.itemName === "shelfB32") {
            xPlus = -1; // -1.5
            yPlus = 1.75; // 1.75  // 1.25
            zPlus = -2.25; // -1.5
          }

          controlsPositionVec.set(
            orbitRef.current.object.position.x,
            orbitRef.current.object.position.y,
            orbitRef.current.object.position.z,
          );
          const tl = gsap.timeline();
          tl.to(controlsPositionVec, {
            delay: adminFlag
              ? 0.1
              : previousItemSelected === unselectedItem
                ? CAM_POS_ANIM.camPosAnimDelay + 0.1
                : optionBoxItemChanged
                  ? CAM_POS_ANIM.camPosAnimDelay + 0.2
                  : CAM_POS_ANIM.camPosAnimDelay,
            duration: adminFlag
              ? 0.1
              : previousItemSelected === unselectedItem
                ? CAM_POS_ANIM.camPosAnimDuration + 1
                : optionBoxItemChanged
                  ? CAM_POS_ANIM.camPosAnimDuration + 0.75
                  : CAM_POS_ANIM.camPosAnimDuration,
            x: currentItemSelected.position.x + xPlus,
            y: currentItemSelected.position.y + yPlus,
            z: currentItemSelected.position.z + zPlus,
            ease: "easeIn",
            onStart: () => {
              setActiveCamPosAnim(true);
              setActiveCamAnim(true);
              if (optionBoxItemChanged) orbitRef.current.autoRotate = false;
              orbitRef.current.enableRotate = false;
              orbitRef.current.enableZoom = false;
            },
            onUpdate: () => {
              setTargetVec(controlsPositionVec);
              orbitRef.current.object.position.set(
                controlsPositionVec.x,
                controlsPositionVec.y,
                controlsPositionVec.z,
              );
              // orbitRef.current.object.updateProjectionMatrix();
              // orbitRef.current.update();
            },
            onComplete: () => {
              setTargetVec(controlsPositionVec);
              // orbitRef.current.enabled = true;
              orbitRef.current.object.updateProjectionMatrix();
              orbitRef.current.update();
              orbitRef.current.enableRotate = true;
              orbitRef.current.enableZoom = true;
              setActiveCamPosAnim(false);
              setActiveCamAnim(false);
              // TODO: set a timeout to delay this toggle of autoRotate?
              orbitRef.current.autoRotate = true;
              orbitRef.current.autoRotateSpeed = 1.1;
              // setOptionBoxItemChanged(false);
            },
          });
        }
      }
    }
  }, [showBackground, optionBoxItemToggle]);

  // ArrowIcon rotation on x axis
  useGSAP(() => {
    if (!showBackground) {
      if (orbitRef.current) {
        const tl = gsap.timeline();
        tl.to(arrowRotationUp, {
          delay: 0.1,
          duration: 1.5,
          value: 0,
          ease: "easeIn",
          onStart: () => {
            setArrowAnimActive(true);
          },
          onUpdate: () => {
            setArrowRotationX(arrowRotationUp.value);
          },
          onComplete: () => {
            setArrowAnimActive(false);
          },
        });
      }
    } else if (showBackground) {
      const tl = gsap.timeline();
      tl.to(arrowRotationDown, {
        delay: 0.1,
        duration: 1.5,
        value: Math.PI * 2,
        ease: "easeOut",
        onStart: () => {
          setArrowAnimActive(true);
        },
        onUpdate: () => {
          setArrowRotationX(arrowRotationDown.value);
        },
        onComplete: () => {
          setArrowAnimActive(false);
        },
      });
    }
  }, [showBackground]);

  return (
    <>
      {/* <Perf position="bottom-left" /> */}
      {/* ArrowIcon object and invisible CenterAnchor objects for pinning Html option box, photo grid / single views, and other routes */}
      <ScreenSpace depth={1}>
        {/* light in very center for illuminating on zoom in !showBackground desktop / wide screens */}
        <pointLight
          position={[0.15, 0.1, 0.56]}
          intensity={LIGHT.pointLightIntensity}
        />
        {/* <pointLight position={[width / 2750, 0.2, 0.1]} intensity={0.15} /> */}
        <pointLight
          position={[-0.15, 0.1, 0.56]}
          intensity={LIGHT.pointLightIntensity}
        />
        {/* <pointLight
          position={[-width / 3000 + 0.2, 0.5, 0.1]}
          intensity={0.75}
        /> */}
        <group position={[0, 0, 0]} visible={false}>
          <CenterAnchor
            currentColor={textures.alabasterPaint}
            currentTexture={textures.whiteTexture}
          />
        </group>
        {/* Arrow icon at bottom of screen */}
        <group
          onClick={handleArrowIconClick}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          visible={!open}
        >
          <mesh
            position={[0, ARROW_ICON.arrowY, 0]}
            scale={0.0055}
            rotation={[arrowRotationX, 0, 0]}
          >
            <ArrowIcon
              currentColor={
                showPaintOptions ? textures.bluePaint : textures.alabasterPaint
              }
              currentTexture={textures.whiteTexture}
            />
          </mesh>
          <group
            position={[0, open ? ARROW_ICON.arrowY + 0.01 : -0.3 + 0.01, 0]}
          >
            <RingCircle
              selected={false}
              showBackground={showBackground}
              isShelf={false}
              itemName={"arrow"}
              forArrow={true}
            />
          </group>
        </group>
      </ScreenSpace>
      <color args={["#adbaba"]} attach="background" />
      <mesh geometry={overlayGeometry} material={overlayMaterial}></mesh>
      <OrbitControls
        enabled={!open}
        makeDefault
        ref={orbitRef}
        enableZoom={!animActive}
        enablePan={false}
        maxDistance={!showBackground && partsOpen ? 4 : 15}
        minDistance={1.45} // 1.65 on 04/11/2024 // before 04/11/2024 1.75 good on iphone xr portrait // 1.375 // 60
        maxPolarAngle={
          showBackground && currentItemSelected.itemName.includes("shelf")
            ? ORBIT_CONTROLS.orbitPolarShowBgdShelf // Math.PI / 2 + Math.PI / 128
            : showBackground && !currentItemSelected.itemName.includes("shelf")
              ? ORBIT_CONTROLS.orbitPolarShowBgdNotShelf // 04/11/24 - was Math.PI / 2 - Math.PI / 8
              : Math.PI * 2
        } // {Math.PI / 2 - Math.PI / 16}
        enableDamping={true}
        autoRotate
        autoRotateSpeed={0.8}
      />
      <Sky distance={55} sunPosition={[40, 8.5, -50]} />
      {/* directional light for all objects */}
      <directionalLight
        castShadow
        ref={dirLightA}
        position={[
          LIGHT.dirLightXPosition,
          LIGHT.dirLightYPosition,
          LIGHT.dirLightZPosition,
        ]} // {[0, 60, 0]}
        intensity={LIGHT.dirLightIntensity}
        shadow-normalBias={LIGHT.dirLightNormBias}
        shadow-mapSize-width={LIGHT.dirLightMapSize} // 5120
        shadow-mapSize-height={LIGHT.dirLightMapSize}
        shadow-camera-near={LIGHT.dirLightCamNear} // 50
        shadow-camera-far={LIGHT.dirLightCamFar} // 115
        shadow-camera-left={LIGHT.dirLightCamLeft} // -10
        shadow-camera-bottom={LIGHT.dirLightCamBottom} // -10
        shadow-camera-right={LIGHT.dirLightCamRight} // 10
        shadow-camera-top={LIGHT.dirLightCamTop} // 150
        // target={grampsRef.current}
      />
      {/* all objects (except logo, cart/bag, arrow / objects in ScreenSpace) */}
      <group
        position={[0, stagePosY, 0]}
        visible={
          !open ||
          locationPathname === "/info" ||
          locationPathname === "/contact" ||
          locationPathname === "/about" ||
          locationPathname === "/subscribe"
            ? true
            : false
        }
      >
        <ambientLight intensity={LIGHT.ambLightIntensity} />
        {/* furniture items */}
        {shopItems.map((item, index) => {
          return (
            <group
              key={index}
              position={[item.position.x, item.position.y, item.position.z]}
              onPointerOver={() => hover(true)}
              onPointerOut={() => hover(false)}
              onClick={handleClick}
              // onDoubleClick={handleDoubleClick}
              visible={
                !showBackground && currentItemSelected === item
                  ? true
                  : showBackground
                    ? true
                    : false
              }
            >
              {item.parts.map((part, index) => {
                return (
                  <group
                    key={part.partName}
                    onClick={(e) => handleItemPartClick(e, part)}
                  >
                    <mesh position={animatedPosition(part.animation, animDist)}>
                      <ItemPart
                        model={part.model}
                        itemName={part.itemName}
                        partName={part.partName}
                      />
                    </mesh>
                    <SelectIcon
                      model={part.model}
                      itemName={part.itemName}
                      partName={part.partName}
                      animation={part.animation}
                      animDist={animDist}
                    />
                    <RingCircle
                      selected={currentItemSelected === item ? true : false}
                      isShelf={part.itemName.includes("shelf") ? true : false}
                      itemName={part.itemName}
                      forArrow={false}
                    />
                  </group>
                );
              })}
            </group>
          );
        })}
        {/* floor */}
        <mesh visible={showBackground} position={[0, -0.498, 0]}>
          <Floor
            currentColor={textures.floorStain}
            currentTexture={textures.woodFloorWornPlanksTexture} // woodFloorWornPlanksTexture
          />
        </mesh>

        {/* wallsAndMoulding */}
        <mesh
          visible={
            showBackground &&
            locationPathname !== "/about" &&
            locationPathname !== "/contact" &&
            locationPathname !== "/info"
          }
        >
          <Walls
            currentColor={textures.floorStain}
            currentTexture={textures.paintedTexture}
          />
        </mesh>
      </group>
    </>
  );
}
