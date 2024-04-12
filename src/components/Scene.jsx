import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  // useHelper,
  useTexture,
  Sky,
  ScreenSpace,
  useCursor,
} from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ItemPart } from "./ItemPart.jsx";
import { Bag } from "./Bag.jsx";
// import { Annotation } from "./Annotation.jsx";
import RingCircle from "./RingCircle.jsx";
import { Floor } from "./room/Floor.jsx";
import { Walls } from "./room/Walls.jsx";
import { objects, unselectedItem } from "../data/objects.jsx";
import { textures } from "../data/textures.jsx";
import { shopItems } from "../data/objects.jsx";
import useWindowDimensions from "../helpers/useWindowDimensions";
import { useSnipcart } from "use-snipcart";
import { Logo } from "./Logo.jsx";
import { SelectIcon } from "./SelectIcon.jsx";
// import { CameraHelper } from "three";
// import { DirectionalLightHelper } from "three";
// import { Perf } from "r3f-perf";
// import { ShelfPositions } from "./room/ShelfPositions.jsx";
import { ArrowIcon } from "./ArrowIcon.jsx";

export default function Scene({
  currentItemSelected,
  setCurrentItemSelected,
  previousItemSelected,
  setPreviousItemSelected,
  animDist,
  animActive,
  showBackground,
  setShowBackground,
  showPartOptions,
  setShowPartOptions,
  animateParts,
  handlePartOption,
  getRandomInt,
  randomAllItemsParts,
  open,
  setOpen,
  showPhotos,
  setShowPhotos,
  sceneLoaded,
  allPhotos,
  setAllPhotos,
  aboutInfo,
  setAboutInfo,
  optionBoxHeightMin,
  setOptionBoxHeightMin,
  stagePosY,
}) {
  const { height, width } = useWindowDimensions();
  // useEffect(() => {
  //   // console.log("height: ", height);
  //   // console.log("width: ", width);
  // }, [height, width]);

  const snipcart = useSnipcart();
  const { cart = {} } = useSnipcart();
  const { subtotal = "0.00" } = cart;
  const [snipcartLoaded, setSnipcartLoaded] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // console.log("snipcartLoaded: ", snipcartLoaded);
    // console.log("useSnipcart: ", snipcart);
    // let state = snipcart.getState();
    // console.log("snipCart state: ", state);
    // console.log("cart:", cart);
    // if (cart.items) {
    // console.log("cart.items.count:", cart.items.count);
    // }
    // console.log("subtotal:", subtotal);
    if (window.Snipcart) {
      setSnipcartLoaded(true);
      // console.log("setting snipcartLoaded state = true");
      // console.log("window.Snipcart.api: ", window.Snipcart);
      if (cart.items) setCartCount(cart.items.count);
      // window.Snipcart.api.theme.cart.open();
    } else {
      setSnipcartLoaded(false);
    }

    return () => {
      setSnipcartLoaded(false);
    };
  }, [window.Snipcart]);

  // const unsubscribe = window.Snipcart.events.on("item.removed", (cartItem) => {
  //   console.log("item removed: ", cartItem);
  // });

  // useEffect(() => {
  //   if (snipcartLoaded) {
  //     // console.log("snipcartLoaded: ", snipcartLoaded);
  //     // console.log(window.Snipcart);
  //     if (window.Snipcart.events) {
  //       // console.log("events loaded");
  //       window.Snipcart.events.on("item.removed", (cartItem) => {
  //         console.log("item removed: ", cartItem);
  //       });
  //     }
  //   }
  // }, [snipcartLoaded]);

  function handleCartClick() {
    if (snipcartLoaded) {
      window.Snipcart.api.theme.cart.open();
    }
  }

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

  const dirLightA = useRef();

  const overlayOpacity = { value: 1 };
  const [overlayAlpha, setOverlayAlpha] = useState(1);
  const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
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
            gl_FragColor = vec4(0.153, 0.153, 0.102, uAlpha);
        }
    `,
  });

  useEffect(() => {
    if (sceneLoaded) {
      window.setTimeout(() => {
        // animate overlay
        gsap.to(overlayOpacity, {
          duration: 3,
          value: 0,
          delay: 1,
          onUpdate: () => {
            setOverlayAlpha(overlayOpacity.value);
          },
          onComplete: () => {
            // setInitialLoad(true);
          },
        });
      }, 500);
    }
    // console.log(overlayGeometry);
  }, [sceneLoaded]);

  // const [initialLoad, setInitialLoad] = useState(false);
  const [controlsDragging, setControlsDragging] = useState(false);

  const [hovered, hover] = useState(false);
  useCursor(hovered);

  const [currentPartName, setCurrentPartName] = useState("top");
  const [currentItemName, setCurrentItemName] = useState("gramps");

  useEffect(() => {
    randomAllItemsParts(false);
  }, []);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (currentItemSelected === unselectedItem) {
      randomAllItemsParts(false);
    }
    //Implementing the setInterval method
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    //Clearing the interval
    return () => clearInterval(interval);
  }, [count]);

  // const [randomTime, setRandomTime] = useState(0);
  // useFrame((state, delta) => {
  //   setRandomTime(randomTime + delta);
  //   console.log(randomTime);
  //   if (Math.floor(randomTime) % 2 === 0) {
  //     if (currentItemSelected === unselectedItem) randomAllItemsParts(false);
  //   }
  // });

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
      setOptionBoxHeightMin(false);
      setShowPartOptions(true);
    }
    if (!showBackground) {
      setOpen(false);
      // setInfoBoxIcon(true);
      animateParts();
      // if (orbitRef.current) {
      //   orbitRef.current.enableZoom = false;
      // }
    } else if (showBackground && currentItemSelected !== unselectedItem) {
      animateParts();
      // if (orbitRef.current) {
      //   orbitRef.current.enableZoom = true;
      // }
    }
  }, [showBackground]);

  const handleClick = (e) => {
    e.stopPropagation();
    const { eventObject } = e;
    // console.log(eventObject.position);
    if (showBackground) {
      let tempObjectPosition = eventObject.position;
      let positionMatch = (element) =>
        element.position.x === tempObjectPosition.x &&
        element.position.y === tempObjectPosition.y &&
        element.position.z === tempObjectPosition.z;
      if (positionMatch) {
        // console.log(
        //   "shopItems.find(positionMatch): ",
        //   shopItems.find(positionMatch),
        // );
        let matchedItem = shopItems.find(positionMatch);
        // console.log("matchedItem from handleClick function: ", matchedItem);
        if (currentItemSelected === unselectedItem) {
          randomAllItemsParts(false);
        }
        setPreviousItemSelected(currentItemSelected);
        setCurrentItemSelected(matchedItem);
      }
    }
  };

  const handleItemPartClick = (e, part) => {
    // e.preventDefault; // not necessary
    // e.stopPropagation(); // disables item part / item click connecting to entire item mesh/group
    // console.log(part.itemName, part.partName, " clicked");
    if (!showBackground) {
      if (!showPhotos && !open) setShowPartOptions(true);
      if (part.itemName === currentItemSelected.itemName) {
        setCurrentItemName(part.itemName);
        setCurrentPartName(part.partName);
      }
    } else {
      setCurrentItemName(part.itemName);
      setCurrentPartName(part.partName);
    }
    // setCurrentItemName(part.itemName);
    // setCurrentPartName(part.partName);
    // if (!showBackground) {
    //   if (!showPhotos && !open) setShowPartOptions(true);
    // }
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    // if (currentItemSelected === unselectedItem) {
    //   setCurrentItemSelected(objects.gramps);
    // }
    if (showBackground) {
      if (!animActive) {
        setOpen(false);
        setShowPhotos(false);
        setShowBackground(!showBackground);
        // animateParts();
      }
    }
  };

  const handleArrowIconClick = (e) => {
    e.stopPropagation();
    if (currentItemSelected === unselectedItem) {
      setCurrentItemSelected(objects.gramps);
      setTimeout(() => {
        setOpen(false);
        setShowPhotos(false);
        setShowBackground(!showBackground);
      }, "750");
    } else {
      if (!animActive) {
        setOpen(false);
        setShowPhotos(false);
        setShowBackground(!showBackground);
      }
    }
  };

  // const handleOffClick = (e) => {
  //   e.stopPropagation();
  //   // console.log("onPointerMissed click");
  // };

  const orbitRef = useRef();
  // const shadowCameraRef = useRef();
  // useHelper(shadowCameraRef, CameraHelper, 1, "lightBlue");

  // reload window if orbit controls are broken by unusual gestures / touch behavior on mobile devices (especially iOS)
  const [prevStartAzimuthAng, setPrevStartAzimuthAng] = useState(0);
  const [prevEndAzimuthAng, setPrevEndAzimuthAng] = useState(0);
  const [startAzimuthAng, setStartAzimuthAng] = useState(0);
  const [endAzimuthAng, setEndAzimuthAng] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const [dragTime, setDragTime] = useState(0);
  const [brokenCount, setBrokenCount] = useState(0);
  // const [azCheckCount, setAzCheckCount] = useState(0);
  // const [azCheckAng, setAzCheckAng] = useState(0);

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
    // prevent swipe back navigation gesture on iOS mobile devices
    const element = document.querySelector("canvas");
    element.addEventListener("touchstart", (e) => {
      setIsTouching(true);
      // document.getElementById("footer").innerHTML +=
      //   " touchstart registered (outside of controls) ";
      // is not near edge of view, exit
      // if (e.pageX > 20 && e.pageX < window.innerWidth - 20) return; // suggested by reference showing this method of preventing edge swipes iOS
      if (e.pageX > 30 && e.pageX < window.innerWidth - 30) return;
      // prevent swipe to navigate gesture
      e.preventDefault();
    });
    element.addEventListener("touchmove", (e) => {
      setIsTouching(true);
      // document.getElementById("footer").innerHTML +=
      //   "   touchmove registered (outside of controls)";
    });
    element.addEventListener("touchend", (e) => {
      setIsTouching(false);
      // document.getElementById("footer").innerHTML +=
      //   " touchend registered (outside of controls) ";
    });
    // setInitialLoad(true);
    if (orbitRef.current) {
      orbitRef.current.addEventListener(
        "start",
        () => {
          // let position = orbitRef.current.getAzimuthalAngle(); // orbitRef.current.object.position.x;
          // if (position === null) {
          //   position = "null";
          // }
          // document.getElementById("footer").innerHTML =
          //   "start touch registered ";
          // document.getElementById("footer").innerHTML += position;
          // console.log("start");
          setDragTime(0);
          // console.log(
          //   "from `start` controls listener: orbitControls object.object.fov: ",
          //   orbitRef.current.object.position,
          // );
          setControlsDragging(true);
          setIsTouching(true);
          if (orbitRef.current.autoRotate) orbitRef.current.autoRotate = false;
          setStartAzimuthAng(orbitRef.current.getAzimuthalAngle());
        },
        true,
      );
      orbitRef.current.addEventListener(
        "change",
        () => {
          // let position = orbitRef.current.getAzimuthalAngle(); // orbitRef.current.object.position.x;
          // if (position === null) {
          //   position = "null";
          // }
          // document.getElementById("footer").innerHTML =
          //   "change touch registered ";
          // document.getElementById("footer").innerHTML += position;
          // console.log("change");
          // console.log(
          //   "from `change` controls listener: orbitControls orbitRef.current.object.position: ",
          //   orbitRef.current.object.position,
          // );
          // setPreviousAzimuthAng(orbitRef.current.getAzimuthalAngle());
          // setCurrentAzimuthAng(orbitRef.current.getAzimuthalAngle());
          // setControlsDragging(true);
        },
        true,
      );
      orbitRef.current.addEventListener(
        "end",
        () => {
          // let position = orbitRef.current.getAzimuthalAngle(); // orbitRef.current.object.position.x;
          // if (position === null) {
          //   position = "null";
          // }
          // document.getElementById("footer").innerHTML = "end touch registered ";
          // document.getElementById("footer").innerHTML += position;
          // console.log("end");
          // console.log(
          //   "from `end` controls listener: orbitControls orbitRef.current.object.position: ",
          //   orbitRef.current.object.position,
          // );
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
        orbitRef.current.removeEventListener(
          "change",
          () => console.log("removed event listener, 'change'"),
          true,
        );
        orbitRef.current.removeEventListener(
          "end",
          () => console.log("removed event listener, 'end'"),
          true,
        );
        setControlsDragging(false);
      }
    };
  }, []);

  // useEffect(() => {
  //   if (isTouching && !controlsDragging) {
  //     if (orbitRef.current) {
  //       setAzCheckAng(orbitRef.current.getAzimuthalAngle());
  //     }
  //   }
  // }, [isTouching]);

  useFrame((state, delta) => {
    if (controlsDragging) {
      setDragTime(dragTime + delta);
      // console.log("controls dragging for ", dragTime);
    } else if (!controlsDragging && !showBackground && !activeZoomAnim) {
    }
    // if (isTouching && !controlsDragging) {
    //   document.getElementById("footer").innerHTML =
    //     " isTouching = true & controlsDragging = false ";
    //   if (orbitRef.current) {
    //     let checkAzAng = orbitRef.current.getAzimuthalAngle();
    //     if (checkAzAng === azCheckAng || checkAzAng === endAzimuthAng) {
    //       // document.getElementById("footer").innerHTML =
    //       //   " controls aren't changing even though touches are registered ";
    //       document.getElementById("footer").innerHTML +=
    //         " useFrame azCheck: matched azimuth angles ";
    //       setAzCheckCount(azCheckCount + 1);
    //       // window.location.reload();
    //     }
    //   }
    // }
  });

  // useEffect(() => {
  //   if (azCheckCount === 1) {
  //     document.getElementById("footer").innerHTML =
  //       " useFrame azCheck: controls stuck, reloading ";
  //     window.location.reload();
  //   }
  // }, [azCheckCount]);

  const allEqual = (arr) => arr.every((v) => v === arr[0]);
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
          setBrokenCount(brokenCount + 1);
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

  // commented out for test on normal use but 04/05/2024
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

  // animation camera target on item click
  const controlsTargetVec = new THREE.Vector3();
  useGSAP(() => {
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
      let tl = gsap.timeline();
      tl.to(controlsTargetVec, {
        delay: 0.15,
        duration: 0.75,
        x: currentItemSelected.position.x,
        y: currentItemSelected.position.y,
        z: currentItemSelected.position.z,
        ease: "easeIn",
        onUpdate: () => {
          orbitRef.current.target.set(
            controlsTargetVec.x,
            controlsTargetVec.y,
            controlsTargetVec.z,
          );
          orbitRef.current.object.updateProjectionMatrix();
          orbitRef.current.update();
        },
      });
    } else if (
      currentItemSelected.itemName.includes("shelfA32") ||
      currentItemSelected.itemName.includes("shelfB16")
    ) {
      let tl = gsap.timeline();
      tl.to(controlsTargetVec, {
        delay: 0.15,
        duration: 0.75,
        x: currentItemSelected.position.x,
        y: currentItemSelected.position.y + 1,
        z: currentItemSelected.position.z,
        ease: "easeIn",
        onUpdate: () => {
          orbitRef.current.target.set(
            controlsTargetVec.x,
            controlsTargetVec.y,
            controlsTargetVec.z,
          );
          orbitRef.current.object.updateProjectionMatrix();
          orbitRef.current.update();
        },
      });
    } else if (
      currentItemSelected.itemName.includes("shelfA16") ||
      currentItemSelected.itemName.includes("shelfB32")
    ) {
      let tl = gsap.timeline();
      tl.to(controlsTargetVec, {
        delay: 0.15,
        duration: 0.75,
        x: currentItemSelected.position.x,
        y: currentItemSelected.position.y + 1.25,
        z: currentItemSelected.position.z,
        ease: "easeIn",
        onUpdate: () => {
          orbitRef.current.target.set(
            controlsTargetVec.x,
            controlsTargetVec.y,
            controlsTargetVec.z,
          );
          orbitRef.current.object.updateProjectionMatrix();
          orbitRef.current.update();
        },
      });
    }
  }, [currentItemSelected]);

  // animate camera position on item double click / showBackground turning false
  const controlsPositionVec = new THREE.Vector3();
  const [targetVec, setTargetVec] = useState(new THREE.Vector3());
  const [activeZoomAnim, setActiveZoomAnim] = useState(false);
  useGSAP(() => {
    if (!showBackground) {
      if (orbitRef.current) {
        if (orbitRef.current.object.position !== targetVec) {
          // console.log(
          //   "checking controls current position: ",
          //   orbitRef.current.object.position,
          // );
          let xPlus = -1.5;
          let yPlus = 1.25;
          let zPlus = -1.5;

          if (currentItemSelected.itemName === "gramps") {
            xPlus = -1.5; // -1.75
            yPlus = 1.35; // 0.5
            zPlus = -0.75; // -0.75
          } else if (currentItemSelected.itemName === "block") {
            xPlus = -0.5; // 0 // -0.75
            yPlus = 0.75; // 0.5 // 0.5
            zPlus = -1.5; // 1.75 // -1.25
          } else if (currentItemSelected.itemName === "horse") {
            xPlus = 1.75; // -1.75
            yPlus = 1.25; // 1
            zPlus = -2.1; // -1.75
          } else if (currentItemSelected.itemName === "squatter") {
            xPlus = 1.5; // 1.75
            yPlus = 0.5; // 0.5
            zPlus = -1.5; // 1
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
          let tl = gsap.timeline();
          tl.to(controlsPositionVec, {
            delay: 0.1,
            duration: 1.25,
            x: currentItemSelected.position.x + xPlus,
            y: currentItemSelected.position.y + yPlus,
            z: currentItemSelected.position.z + zPlus,
            ease: "easeIn",
            onStart: () => {
              // setOpen(!open);
              // setInfoBoxIcon(!infoBoxIcon);
              setActiveZoomAnim(true);
              orbitRef.current.enabled = false;
            },
            onUpdate: () => {
              setTargetVec(controlsPositionVec);
              orbitRef.current.object.position.set(
                controlsPositionVec.x,
                controlsPositionVec.y,
                controlsPositionVec.z,
              );
              orbitRef.current.object.updateProjectionMatrix();
              orbitRef.current.update();
            },
            onComplete: () => {
              setTargetVec(controlsPositionVec);
              orbitRef.current.enabled = true;
              setActiveZoomAnim(false);
            },
          });
        }
      }
    }
  }, [showBackground]);

  const stagePositionY = -0.1;

  const dirLightXPosition = 2.5; // 2.5
  const dirLightYPosition = 3.6; // 3.6
  const dirLightZPosition = -3; // -3

  const dirLightIntensity = 1.5;
  const dirLightNormBias = 0.04; // 0.04 previously, adjusted to reduce shadow acne on Block inner shelf cavities
  const dirLightMapSize = 512;
  const dirLightCamNear = -5;
  const dirLightCamFar = 8;
  const dirLightCamLeft = -5;
  const dirLightCamRight = 5;
  const dirLightCamBottom = -5;
  const dirLightCamTop = 5;

  const ambLightIntensity = 1;

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

  // useEffect(() => {
  //   if (aboutInfo && open) {
  //     setOpen(false);
  //     setTimeout(() => {
  //       setOpen(true);
  //       setShowPhotos(false);
  //       setShowPartOptions(false);
  //     }, "250");
  //   }
  // }, [aboutInfo]);

  // useEffect(() => {
  //   if (allPhotos && showPhotos) {
  //     setShowPhotos(false);
  //   }
  // }, [allPhotos]);

  // const toggleInfoBox = (e, aboutInfo) => {
  //   if (e) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   }
  //   if (aboutInfo) {
  //     setAboutInfo(true);
  //     setShowPartOptions(false);
  //   } else if (!aboutInfo) {
  //     setAboutInfo(false);
  //   }
  //   setOpen(!open);
  //   setShowPhotos(false);
  //   if (showPartOptions) {
  //     setShowPartOptions(false);
  //   } else {
  //     setShowPartOptions(true);
  //   }
  // };

  const toggleInfoBox = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setAboutInfo(false);
    setOpen(!open);
    setShowPhotos(false);
    if (showPartOptions) {
      setShowPartOptions(false);
    } else {
      setShowPartOptions(true);
    }
  };

  const togglePhotoBox = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setAllPhotos(false);
    setOpen(false);
    setShowPhotos(!showPhotos);
    if (showPartOptions) {
      setShowPartOptions(false);
    } else {
      setShowPartOptions(true);
    }
  };

  // const togglePhotoBox = (e, allPhotos) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (allPhotos) {
  //     setAllPhotos(true);
  //     setOpen(false);
  //     setShowPhotos(true);
  //     setShowPartOptions(false);
  //   } else if (!allPhotos) {
  //     setAllPhotos(false);
  //     setOpen(false);
  //     setShowPhotos(!showPhotos);
  //     if (showPartOptions) {
  //       setShowPartOptions(false);
  //     } else {
  //       setShowPartOptions(true);
  //     }
  //   }
  // };

  return (
    <>
      {/* <Perf position="bottom-left" /> */}

      {/* Logo and Cart/Bag at top of screen */}
      <ScreenSpace depth={1}>
        <pointLight position={[width / 2850, 0.2, 0.1]} intensity={0.15} />
        <mesh
          position={
            width >= 376 && width < 600
              ? [0.175, 0.345, 0] // looks right on actual device [width / 2600, 0.345, 0] // looks right on chrome simulator
              : width < 376
                ? [0.21, 0.345, 0] // looks right on chrome simulator [0.175, 0.345, 0]
                : width >= 600 && width < 1100
                  ? [0.23, 0.345, 0]
                  : [width / 2600, 0.345, 0]
          }
          scale={0.125}
          onClick={handleCartClick}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
        >
          <Bag
            currentColor={textures.brownBag}
            currentTexture={textures.paintedTexture}
            cartCount={cartCount}
            handleCartClick={handleCartClick}
          />
        </mesh>

        <pointLight
          position={[-width / 2800 + 0.2, 0.5, 0.1]}
          intensity={0.75}
        />
        <mesh
          position={
            width >= 376 && width < 600
              ? [-0.165, 0.345, 0] // looks right on actual device [-width / 2800, 0.36, 0] // looks right on chrome simulator [-width / 3100, 0.36, 0]
              : width < 376
                ? [-0.19, 0.345, 0] // looks right on chrome simulator [-0.165, 0.36, 0]
                : width >= 600 && width < 1100
                  ? [-0.21, 0.345, 0]
                  : [-width / 2800, 0.36, 0]
          }
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          scale={0.005}
        >
          <Logo
            currentColor={textures.blueTape}
            currentTexture={textures.paintedTexture}
            open={open}
            setOpen={setOpen}
            showPhotos={showPhotos}
            setShowPhotos={setShowPhotos}
            // showPartOptions={showPartOptions}
            setShowPartOptions={setShowPartOptions}
            aboutInfo={aboutInfo}
            setAboutInfo={setAboutInfo}
            allPhotos={allPhotos}
            setAllPhotos={setAllPhotos}
          />
          {/* <Html center position={[0, -12, 0]}>
             <div className="w3-container">
              <div className="w3-bar w3-light-grey">
                <div className="w3-dropdown-click">
                  <div className="w3-dropdown-content w3-bar-block w3-card">
                    <a href="#" className="w3-bar-item w3-button">
                      Link 1
                    </a>
                    <a href="#" className="w3-bar-item w3-button">
                      Link 2
                    </a>
                    <a href="#" className="w3-bar-item w3-button">
                      Link 3
                    </a>
                  </div>
                </div>
              </div>
            </div>        
          </Html> */}
        </mesh>
        {/* Arrow icon at bottom of screen */}
        <group
          onClick={handleArrowIconClick}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
        >
          <mesh
            position={
              width >= 376 && width < 600
                ? [0, -0.3, 0]
                : width < 376
                  ? [0, -0.3, 0] // looks right on chrome simulator [0, -0.275, 0]
                  : width >= 600 && width < 1100
                    ? [0, -0.3, 0]
                    : [0, -0.3, 0]
            }
            scale={0.0055}
            // rotation={[0, 0, 0]}
            // onClick={handleArrowIconClick}
            // onPointerOver={() => hover(true)}
            // onPointerOut={() => hover(false)}
          >
            <ArrowIcon
              currentColor={textures.alabasterPaint}
              currentTexture={textures.whiteTexture}
              currentItemSelected={currentItemSelected}
              toggleInfoBox={toggleInfoBox}
              open={open}
              togglePhotoBox={togglePhotoBox}
              showPhotos={showPhotos}
              currentItemName={currentItemName}
              currentPartName={currentPartName}
              showBackground={showBackground}
              setShowBackground={setShowBackground}
              showPartOptions={showPartOptions}
              setShowPartOptions={setShowPartOptions}
              handlePartOption={handlePartOption}
              getRandomInt={getRandomInt}
              allPhotos={allPhotos}
              aboutInfo={aboutInfo}
              // setAllPhotos={setAllPhotos}
              // setAboutInfo={setAboutInfo}
              optionBoxHeightMin={optionBoxHeightMin}
              setOptionBoxHeightMin={setOptionBoxHeightMin}
              animActive={animActive}
            />
          </mesh>
          <mesh
            position={
              width >= 376 && width < 600
                ? [0, -0.3, 0]
                : width < 376
                  ? [0, -0.3, 0] // looks right on chrome simulator [0, -0.275, 0]
                  : width >= 600 && width < 1100
                    ? [0, -0.3, 0]
                    : [0, -0.3, 0]
            }
          >
            <circleGeometry args={[0.06, 64]} />
            <meshBasicMaterial
              transparent
              opacity={0}
              // side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </ScreenSpace>

      <color args={["#27271a"]} attach="background" />
      <mesh geometry={overlayGeometry} material={overlayMaterial}></mesh>
      <OrbitControls
        makeDefault
        ref={orbitRef}
        enableZoom={showBackground ? true : false}
        enablePan={false}
        maxDistance={15}
        minDistance={1.5} // 1.75 good on iphone xr portrait // 1.375 // 60
        maxPolarAngle={
          showBackground && currentItemSelected.itemName.includes("shelf")
            ? Math.PI / 2 + Math.PI / 32
            : showBackground && !currentItemSelected.itemName.includes("shelf")
              ? Math.PI / 2 - Math.PI / 8
              : Math.PI * 2
        } // {Math.PI / 2 - Math.PI / 16}
        enableDamping={true}
        autoRotate
        autoRotateSpeed={0.8}
      />
      <Sky distance={55} sunPosition={[40, 8.5, -50]} />
      {/* grampsLight */}
      <directionalLight
        castShadow
        ref={dirLightA}
        position={[dirLightXPosition, dirLightYPosition, dirLightZPosition]} // {[0, 60, 0]}
        intensity={dirLightIntensity}
        shadow-normalBias={dirLightNormBias}
        shadow-mapSize-width={dirLightMapSize} // 5120
        shadow-mapSize-height={dirLightMapSize}
        shadow-camera-near={dirLightCamNear} // 50
        shadow-camera-far={dirLightCamFar} // 115
        shadow-camera-left={dirLightCamLeft} // -10
        shadow-camera-bottom={dirLightCamBottom} // -10
        shadow-camera-right={dirLightCamRight} // 10
        shadow-camera-top={dirLightCamTop} // 150
        // target={grampsRef.current}
      />
      {/* all objects (except logo and cart/bag) */}
      <group position={[0, stagePosY, 0]}>
        <ambientLight intensity={ambLightIntensity} />
        {/* furniture items */}
        {shopItems.map((item, index) => {
          return (
            <group
              key={index}
              position={[item.position.x, item.position.y, item.position.z]}
              onPointerOver={() => hover(true)}
              onPointerOut={() => hover(false)}
              onClick={handleClick}
              onDoubleClick={handleDoubleClick}
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
                    <mesh
                      position={animatedPosition(part.animation, animDist)}
                      // visible={false}
                    >
                      <ItemPart
                        model={part.model}
                        itemName={part.itemName}
                        partName={part.partName}
                      />
                    </mesh>

                    {/* <Annotation
                      model={part.model}
                      itemName={part.itemName}
                      itemTitle={item.itemTitle}
                      partName={part.partName}
                      descPartName={part.descPartName}
                      animation={part.animation}
                      animDist={animDist}
                      currentItemName={currentItemName}
                      currentPartName={currentPartName}
                      showBackground={showBackground}
                      setShowBackground={setShowBackground}
                      showPartOptions={showPartOptions}
                      setShowPartOptions={setShowPartOptions}
                      handlePartOption={handlePartOption}
                      getRandomInt={getRandomInt}
                      positionBottom={true}
                      toggleInfoBox={toggleInfoBox}                   
                      togglePhotoBox={togglePhotoBox}
                    /> */}

                    <SelectIcon
                      model={part.model}
                      itemName={part.itemName}
                      partName={part.partName}
                      animation={part.animation}
                      animDist={animDist}
                      currentItemName={currentItemName}
                      currentPartName={currentPartName}
                      showBackground={showBackground}
                      showPartOptions={showPartOptions}
                    />
                    <RingCircle
                      selected={currentItemSelected === item ? true : false}
                      showBackground={showBackground}
                      isShelf={part.itemName.includes("shelf") ? true : false}
                      itemName={part.itemName}
                    />
                  </group>
                );
              })}
            </group>
          );
        })}
        {/* floor */}
        <mesh
          visible={showBackground}
          position={[0, -0.498, 0]}
          // onClick={handleOffClick}
        >
          <Floor
            currentColor={textures.floorStain}
            currentTexture={textures.woodFloorWornPlanksTexture} // woodFloorWornPlanksTexture
          />
        </mesh>

        {/* wallsAndMoulding */}
        <mesh
          visible={showBackground}
          // onClick={handleOffClick}
        >
          <Walls
            currentColor={textures.floorStain} // whiteStain
            currentTexture={textures.paintedTexture}
          />
        </mesh>
        {/* shelfPositions */}
        {/* <mesh>
          <ShelfPositions />
        </mesh> */}
      </group>
    </>
  );
}
