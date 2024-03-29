import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import * as THREE from "three";
import Scene from "./components/Scene.jsx";
import SelectMenu from "./components/SelectMenu.jsx";
import Placeholder from "./components/Placeholder.jsx";
import { textures } from "./data/textures.jsx";
import { options } from "./data/options.jsx";
import { objects } from "./data/objects.jsx";
// import { shopItems } from "./data/objects.jsx";
import { unselectedItem } from "./data/objects.jsx";
import "./style.css";
import { SnipcartProvider } from "use-snipcart";
import { useOptionStore } from "./store/useOptionStore.tsx";
import BuyButton from "./components/BuyButton.jsx";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import InfoIcon from "@mui/icons-material/Info";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import OpenWithIcon from "@mui/icons-material/OpenWith";

function App() {
  const [open, setOpen] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [animActive, setAnimActive] = useState(false);

  const [currentItemSelected, setCurrentItemSelected] = useState(
    objects.gramps,
  );
  const [previousItemSelected, setPreviousItemSelected] =
    useState(unselectedItem);
  const [currentItemOptionSelect, setCurrentItemOptionSelect] = useState("");
  const [currentItemOptionType, setCurrentItemOptionType] =
    useState("stain or paint");
  const [currentItemDescription, setCurrentItemDescription] = useState(
    unselectedItem.itemDescription,
  );

  const [currentItemOptionSelectGramps, setCurrentItemOptionSelectGramps] =
    useState("");
  const [currentItemOptionSelectSquatter, setCurrentItemOptionSelectSquatter] =
    useState("");
  const [currentItemOptionSelectBlock, setCurrentItemOptionSelectBlock] =
    useState("");
  const [currentItemOptionSelectHorse, setCurrentItemOptionSelectHorse] =
    useState("");
  const [currentItemOptionSelectShelfA16, setCurrentItemOptionSelectShelfA16] =
    useState("");
  const [currentItemOptionSelectShelfA32, setCurrentItemOptionSelectShelfA32] =
    useState("");
  const [currentItemOptionSelectShelfB16, setCurrentItemOptionSelectShelfB16] =
    useState("");
  const [currentItemOptionSelectShelfB32, setCurrentItemOptionSelectShelfB32] =
    useState("");

  useEffect(() => {
    setCurrentItemDescription(currentItemSelected.itemDescription);
    if (currentItemSelected.itemName === "gramps") {
      setCurrentItemOptionSelect(currentItemOptionSelectGramps);
      if (options.stains.includes(currentItemOptionSelectGramps)) {
        setCurrentItemOptionType("stain");
      } else if (options.paints.includes(currentItemOptionSelectGramps)) {
        setCurrentItemOptionType("paint");
      }
    } else if (currentItemSelected.itemName === "squatter") {
      setCurrentItemOptionSelect(currentItemOptionSelectSquatter);
      if (options.stains.includes(currentItemOptionSelectSquatter)) {
        setCurrentItemOptionType("stain");
      } else if (options.paints.includes(currentItemOptionSelectSquatter)) {
        setCurrentItemOptionType("paint");
      }
    } else if (currentItemSelected.itemName === "block") {
      setCurrentItemOptionSelect(currentItemOptionSelectBlock);
      if (options.stains.includes(currentItemOptionSelectBlock)) {
        setCurrentItemOptionType("stain");
      } else if (options.paints.includes(currentItemOptionSelectBlock)) {
        setCurrentItemOptionType("paint");
      }
    } else if (currentItemSelected.itemName === "horse") {
      setCurrentItemOptionSelect(currentItemOptionSelectHorse);
      if (options.stains.includes(currentItemOptionSelectHorse)) {
        setCurrentItemOptionType("stain");
      } else if (options.paints.includes(currentItemOptionSelectHorse)) {
        setCurrentItemOptionType("paint");
      }
    } else if (currentItemSelected.itemName === "shelfA16") {
      setCurrentItemOptionSelect(currentItemOptionSelectShelfA16);
      if (options.stains.includes(currentItemOptionSelectShelfA16)) {
        setCurrentItemOptionType("stain");
      } else if (options.paints.includes(currentItemOptionSelectShelfA16)) {
        setCurrentItemOptionType("paint");
      }
    } else if (currentItemSelected.itemName === "shelfA32") {
      setCurrentItemOptionSelect(currentItemOptionSelectShelfA32);
      if (options.stains.includes(currentItemOptionSelectShelfA32)) {
        setCurrentItemOptionType("stain");
      } else if (options.paints.includes(currentItemOptionSelectShelfA32)) {
        setCurrentItemOptionType("paint");
      }
    } else if (currentItemSelected.itemName === "shelfB16") {
      setCurrentItemOptionSelect(currentItemOptionSelectShelfB16);
      if (options.stains.includes(currentItemOptionSelectShelfB16)) {
        setCurrentItemOptionType("stain");
      } else if (options.paints.includes(currentItemOptionSelectShelfB16)) {
        setCurrentItemOptionType("paint");
      }
    } else if (currentItemSelected.itemName === "shelfB32") {
      setCurrentItemOptionSelect(currentItemOptionSelectShelfB32);
      if (options.stains.includes(currentItemOptionSelectShelfB32)) {
        setCurrentItemOptionType("stain");
      } else if (options.paints.includes(currentItemOptionSelectShelfB32)) {
        setCurrentItemOptionType("paint");
      }
    }
    // console.log(
    //   "previous item selected in useEffect[currentItemSelected]: ",
    //   previousItemSelected,
    // );
    // console.log(
    //   "current item selected in useEffect[currentItemSelected]: ",
    //   currentItemSelected,
    // );
  }, [currentItemSelected]);

  // const handleStainChange = (event, color) => {
  //   event.preventDefault();
  //   setCurrentItemOptionSelect(color);
  //   setCurrentItemOptionType("stain");

  //   if (currentItemSelected.itemName === "gramps") {
  //     setCurrentItemOptionSelectGramps(color);
  //     if (color === "white") {
  //       setCurrentTextureGramps(textures.whiteTexture);
  //       setCurrentColorGramps(textures.whiteStain);
  //     } else if (color === "natural") {
  //       setCurrentTextureGramps(textures.naturalTexture);
  //       setCurrentColorGramps(textures.naturalStain);
  //     } else if (color === "black") {
  //       setCurrentTextureGramps(textures.blackTexture);
  //       setCurrentColorGramps(textures.blackStain);
  //     } else if (color === "allBlack") {
  //       setCurrentTextureGramps(textures.allBlackTexture);
  //       setCurrentColorGramps(textures.allBlackStain);
  //     }
  //   } else if (currentItemSelected.itemName === "squatter") {
  //     setCurrentItemOptionSelectSquatter(color);
  //     if (color === "white") {
  //       setCurrentTextureSquatter(textures.whiteTexture);
  //       setCurrentColorSquatter(textures.whiteStain);
  //     } else if (color === "natural") {
  //       setCurrentTextureSquatter(textures.naturalTexture);
  //       setCurrentColorSquatter(textures.naturalStain);
  //     } else if (color === "black") {
  //       setCurrentTextureSquatter(textures.blackTexture);
  //       setCurrentColorSquatter(textures.blackStain);
  //     } else if (color === "allBlack") {
  //       setCurrentTextureSquatter(textures.allBlackTexture);
  //       setCurrentColorSquatter(textures.allBlackStain);
  //     }
  //   } else if (currentItemSelected.itemName === "block") {
  //     setCurrentItemOptionSelectBlock(color);
  //     if (color === "white") {
  //       setCurrentTextureBlock(textures.whiteTexture);
  //       setCurrentColorBlock(textures.whiteStain);
  //     } else if (color === "natural") {
  //       setCurrentTextureBlock(textures.naturalTexture);
  //       setCurrentColorBlock(textures.naturalStain);
  //     } else if (color === "black") {
  //       setCurrentTextureBlock(textures.blackTexture);
  //       setCurrentColorBlock(textures.blackStain);
  //     } else if (color === "allBlack") {
  //       setCurrentTextureBlock(textures.allBlackTexture);
  //       setCurrentColorBlock(textures.allBlackStain);
  //     }
  //   } else if (currentItemSelected.itemName === "horse") {
  //     setCurrentItemOptionSelectHorse(color);
  //     if (color === "white") {
  //       setCurrentTextureHorse(textures.whiteTexture);
  //       setCurrentColorHorse(textures.whiteStain);
  //     } else if (color === "natural") {
  //       setCurrentTextureHorse(textures.naturalTexture);
  //       setCurrentColorHorse(textures.naturalStain);
  //     } else if (color === "black") {
  //       setCurrentTextureHorse(textures.blackTexture);
  //       setCurrentColorHorse(textures.blackStain);
  //     } else if (color === "allBlack") {
  //       setCurrentTextureHorse(textures.allBlackTexture);
  //       setCurrentColorHorse(textures.allBlackStain);
  //     }
  //   } else if (currentItemSelected.itemName === "shelfA16") {
  //     setCurrentItemOptionSelectShelfA16(color);
  //     if (color === "white") {
  //       setCurrentTextureShelfA16(textures.whiteTexture);
  //       setCurrentColorShelfA16(textures.whiteStain);
  //     } else if (color === "natural") {
  //       setCurrentTextureShelfA16(textures.naturalTexture);
  //       setCurrentColorShelfA16(textures.naturalStain);
  //     } else if (color === "black") {
  //       setCurrentTextureShelfA16(textures.blackTexture);
  //       setCurrentColorShelfA16(textures.blackStain);
  //     } else if (color === "allBlack") {
  //       setCurrentTextureShelfA16(textures.allBlackTexture);
  //       setCurrentColorShelfA16(textures.allBlackStain);
  //     }
  //   } else if (currentItemSelected.itemName === "shelfA32") {
  //     setCurrentItemOptionSelectShelfA32(color);
  //     if (color === "white") {
  //       setCurrentTextureShelfA32(textures.whiteTexture);
  //       setCurrentColorShelfA32(textures.whiteStain);
  //     } else if (color === "natural") {
  //       setCurrentTextureShelfA32(textures.naturalTexture);
  //       setCurrentColorShelfA32(textures.naturalStain);
  //     } else if (color === "black") {
  //       setCurrentTextureShelfA32(textures.blackTexture);
  //       setCurrentColorShelfA32(textures.blackStain);
  //     } else if (color === "allBlack") {
  //       setCurrentTextureShelfA32(textures.allBlackTexture);
  //       setCurrentColorShelfA32(textures.allBlackStain);
  //     }
  //   } else if (currentItemSelected.itemName === "shelfB16") {
  //     setCurrentItemOptionSelectShelfB16(color);
  //     if (color === "white") {
  //       setCurrentTextureShelfB16(textures.whiteTexture);
  //       setCurrentColorShelfB16(textures.whiteStain);
  //     } else if (color === "natural") {
  //       setCurrentTextureShelfB16(textures.naturalTexture);
  //       setCurrentColorShelfB16(textures.naturalStain);
  //     } else if (color === "black") {
  //       setCurrentTextureShelfB16(textures.blackTexture);
  //       setCurrentColorShelfB16(textures.blackStain);
  //     } else if (color === "allBlack") {
  //       setCurrentTextureShelfB16(textures.allBlackTexture);
  //       setCurrentColorShelfB16(textures.allBlackStain);
  //     }
  //   } else if (currentItemSelected.itemName === "shelfB32") {
  //     setCurrentItemOptionSelectShelfB32(color);
  //     if (color === "white") {
  //       setCurrentTextureShelfB32(textures.whiteTexture);
  //       setCurrentColorShelfB32(textures.whiteStain);
  //     } else if (color === "natural") {
  //       setCurrentTextureShelfB32(textures.naturalTexture);
  //       setCurrentColorShelfB32(textures.naturalStain);
  //     } else if (color === "black") {
  //       setCurrentTextureShelfB32(textures.blackTexture);
  //       setCurrentColorShelfB32(textures.blackStain);
  //     } else if (color === "allBlack") {
  //       setCurrentTextureShelfB32(textures.allBlackTexture);
  //       setCurrentColorShelfB32(textures.allBlackStain);
  //     }
  //   }
  // };

  // const handlePaintChange = (event, color) => {
  //   event.preventDefault();
  //   setCurrentItemOptionSelect(color);
  //   setCurrentItemOptionType("paint");

  //   if (currentItemSelected.itemName === "gramps") {
  //     setCurrentItemOptionSelectGramps(color);
  //     if (color === "alabaster") {
  //       setCurrentTextureGramps(textures.paintedTexture);
  //       setCurrentColorGramps(textures.alabasterPaint);
  //     } else if (color === "pink") {
  //       setCurrentTextureGramps(textures.paintedTexture);
  //       setCurrentColorGramps(textures.pinkPaint);
  //     } else if (color === "basil") {
  //       setCurrentTextureGramps(textures.paintedTexture);
  //       setCurrentColorGramps(textures.basilPaint);
  //     } else if (color === "yellow") {
  //       setCurrentTextureGramps(textures.paintedTexture);
  //       setCurrentColorGramps(textures.yellowPaint);
  //     } else if (color === "blue") {
  //       setCurrentTextureGramps(textures.paintedTexture);
  //       setCurrentColorGramps(textures.bluePaint);
  //     } else if (color === "gray") {
  //       setCurrentTextureGramps(textures.paintedTexture);
  //       setCurrentColorGramps(textures.grayPaint);
  //     }
  //   } else if (currentItemSelected.itemName === "squatter") {
  //     setCurrentItemOptionSelectSquatter(color);
  //     if (color === "alabaster") {
  //       setCurrentTextureSquatter(textures.paintedTexture);
  //       setCurrentColorSquatter(textures.alabasterPaint);
  //     } else if (color === "pink") {
  //       setCurrentTextureSquatter(textures.paintedTexture);
  //       setCurrentColorSquatter(textures.pinkPaint);
  //     } else if (color === "basil") {
  //       setCurrentTextureSquatter(textures.paintedTexture);
  //       setCurrentColorSquatter(textures.basilPaint);
  //     } else if (color === "yellow") {
  //       setCurrentTextureSquatter(textures.paintedTexture);
  //       setCurrentColorSquatter(textures.yellowPaint);
  //     } else if (color === "blue") {
  //       setCurrentTextureSquatter(textures.paintedTexture);
  //       setCurrentColorSquatter(textures.bluePaint);
  //     } else if (color === "gray") {
  //       setCurrentTextureSquatter(textures.paintedTexture);
  //       setCurrentColorSquatter(textures.grayPaint);
  //     }
  //   } else if (currentItemSelected.itemName === "block") {
  //     setCurrentItemOptionSelectBlock(color);
  //     if (color === "alabaster") {
  //       setCurrentTextureBlock(textures.paintedTexture);
  //       setCurrentColorBlock(textures.alabasterPaint);
  //     } else if (color === "pink") {
  //       setCurrentTextureBlock(textures.paintedTexture);
  //       setCurrentColorBlock(textures.pinkPaint);
  //     } else if (color === "basil") {
  //       setCurrentTextureBlock(textures.paintedTexture);
  //       setCurrentColorBlock(textures.basilPaint);
  //     } else if (color === "yellow") {
  //       setCurrentTextureBlock(textures.paintedTexture);
  //       setCurrentColorBlock(textures.yellowPaint);
  //     } else if (color === "blue") {
  //       setCurrentTextureBlock(textures.paintedTexture);
  //       setCurrentColorBlock(textures.bluePaint);
  //     } else if (color === "gray") {
  //       setCurrentTextureBlock(textures.paintedTexture);
  //       setCurrentColorBlock(textures.grayPaint);
  //     }
  //   } else if (currentItemSelected.itemName === "horse") {
  //     setCurrentItemOptionSelectHorse(color);
  //     if (color === "alabaster") {
  //       setCurrentTextureHorse(textures.paintedTexture);
  //       setCurrentColorHorse(textures.alabasterPaint);
  //     } else if (color === "pink") {
  //       setCurrentTextureHorse(textures.paintedTexture);
  //       setCurrentColorHorse(textures.pinkPaint);
  //     } else if (color === "basil") {
  //       setCurrentTextureHorse(textures.paintedTexture);
  //       setCurrentColorHorse(textures.basilPaint);
  //     } else if (color === "yellow") {
  //       setCurrentTextureHorse(textures.paintedTexture);
  //       setCurrentColorHorse(textures.yellowPaint);
  //     } else if (color === "blue") {
  //       setCurrentTextureHorse(textures.paintedTexture);
  //       setCurrentColorHorse(textures.bluePaint);
  //     } else if (color === "gray") {
  //       setCurrentTextureHorse(textures.paintedTexture);
  //       setCurrentColorHorse(textures.grayPaint);
  //     }
  //   } else if (currentItemSelected.itemName === "shelfA16") {
  //     setCurrentItemOptionSelectShelfA16(color);
  //     if (color === "alabaster") {
  //       setCurrentTextureShelfA16(textures.paintedTexture);
  //       setCurrentColorShelfA16(textures.alabasterPaint);
  //     } else if (color === "pink") {
  //       setCurrentTextureShelfA16(textures.paintedTexture);
  //       setCurrentColorShelfA16(textures.pinkPaint);
  //     } else if (color === "basil") {
  //       setCurrentTextureShelfA16(textures.paintedTexture);
  //       setCurrentColorShelfA16(textures.basilPaint);
  //     } else if (color === "yellow") {
  //       setCurrentTextureShelfA16(textures.paintedTexture);
  //       setCurrentColorShelfA16(textures.yellowPaint);
  //     } else if (color === "blue") {
  //       setCurrentTextureShelfA16(textures.paintedTexture);
  //       setCurrentColorShelfA16(textures.bluePaint);
  //     } else if (color === "gray") {
  //       setCurrentTextureShelfA16(textures.paintedTexture);
  //       setCurrentColorShelfA16(textures.grayPaint);
  //     }
  //   } else if (currentItemSelected.itemName === "shelfA32") {
  //     setCurrentItemOptionSelectShelfA32(color);
  //     if (color === "alabaster") {
  //       setCurrentTextureShelfA32(textures.paintedTexture);
  //       setCurrentColorShelfA32(textures.alabasterPaint);
  //     } else if (color === "pink") {
  //       setCurrentTextureShelfA32(textures.paintedTexture);
  //       setCurrentColorShelfA32(textures.pinkPaint);
  //     } else if (color === "basil") {
  //       setCurrentTextureShelfA32(textures.paintedTexture);
  //       setCurrentColorShelfA32(textures.basilPaint);
  //     } else if (color === "yellow") {
  //       setCurrentTextureShelfA32(textures.paintedTexture);
  //       setCurrentColorShelfA32(textures.yellowPaint);
  //     } else if (color === "blue") {
  //       setCurrentTextureShelfA32(textures.paintedTexture);
  //       setCurrentColorShelfA32(textures.bluePaint);
  //     } else if (color === "gray") {
  //       setCurrentTextureShelfA32(textures.paintedTexture);
  //       setCurrentColorShelfA32(textures.grayPaint);
  //     }
  //   } else if (currentItemSelected.itemName === "shelfB16") {
  //     setCurrentItemOptionSelectShelfB16(color);
  //     if (color === "alabaster") {
  //       setCurrentTextureShelfB16(textures.paintedTexture);
  //       setCurrentColorShelfB16(textures.alabasterPaint);
  //     } else if (color === "pink") {
  //       setCurrentTextureShelfB16(textures.paintedTexture);
  //       setCurrentColorShelfB16(textures.pinkPaint);
  //     } else if (color === "basil") {
  //       setCurrentTextureShelfB16(textures.paintedTexture);
  //       setCurrentColorShelfB16(textures.basilPaint);
  //     } else if (color === "yellow") {
  //       setCurrentTextureShelfB16(textures.paintedTexture);
  //       setCurrentColorShelfB16(textures.yellowPaint);
  //     } else if (color === "blue") {
  //       setCurrentTextureShelfB16(textures.paintedTexture);
  //       setCurrentColorShelfB16(textures.bluePaint);
  //     } else if (color === "gray") {
  //       setCurrentTextureShelfB16(textures.paintedTexture);
  //       setCurrentColorShelfB16(textures.grayPaint);
  //     }
  //   } else if (currentItemSelected.itemName === "shelfB32") {
  //     setCurrentItemOptionSelectShelfB32(color);
  //     if (color === "alabaster") {
  //       setCurrentTextureShelfB32(textures.paintedTexture);
  //       setCurrentColorShelfB32(textures.alabasterPaint);
  //     } else if (color === "pink") {
  //       setCurrentTextureShelfB32(textures.paintedTexture);
  //       setCurrentColorShelfB32(textures.pinkPaint);
  //     } else if (color === "basil") {
  //       setCurrentTextureShelfB32(textures.paintedTexture);
  //       setCurrentColorShelfB32(textures.basilPaint);
  //     } else if (color === "yellow") {
  //       setCurrentTextureShelfB32(textures.paintedTexture);
  //       setCurrentColorShelfB32(textures.yellowPaint);
  //     } else if (color === "blue") {
  //       setCurrentTextureShelfB32(textures.paintedTexture);
  //       setCurrentColorShelfB32(textures.bluePaint);
  //     } else if (color === "gray") {
  //       setCurrentTextureShelfB32(textures.paintedTexture);
  //       setCurrentColorShelfB32(textures.grayPaint);
  //     }
  //   }
  // };

  function totalPrice() {
    let calcualatedPrice = 0;
    if (currentItemOptionType === "stain") {
      calcualatedPrice =
        currentItemSelected.itemBasePrice + currentItemSelected.itemStainCost;
    } else if (currentItemOptionType === "paint") {
      calcualatedPrice = currentItemSelected.itemBasePrice;
    }
    return calcualatedPrice;
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: "#212121",
        light: "#757575",
      },

      secondary: {
        main: "#bdbdbd",
        light: "#E0E0E0",
      },
    },
    shadows: Array(25).fill("none"),
    components: {
      MuiDrawer: {
        styleOverrides: {
          modal: {
            ".MuiModal-backdrop": {
              background: "none",
            },
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          colorSecondary: {
            color: "#212121",
          },
        },
      },
    },
  });

  return (
    <>
      <Leva hidden oneLineLabels />
      <Canvas
        // flat // changes color rendering, see https://stackoverflow.com/questions/64899716/color-differences-between-threejs-vanilla-js-and-react-three-fiber-create-re
        dpr={[1, 2]}
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{
          fov: 45,
          near: 0.1, // 15
          // far: 21, // 900
          far: 900,
          position: [9, 5, -9],
        }}
      >
        <Suspense fallback={<Placeholder />}>
          <SnipcartProvider>
            <Scene
              currentItemSelected={currentItemSelected}
              setCurrentItemSelected={setCurrentItemSelected}
              previousItemSelected={previousItemSelected}
              setPreviousItemSelected={setPreviousItemSelected}
            />
          </SnipcartProvider>
        </Suspense>
      </Canvas>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          className="info"
          style={{
            color: theme.palette.primary.light,
            display:
              currentItemSelected.itemTitle === "noSelectTitle"
                ? "none"
                : "block",
          }}
        >
          <div>
            {/* The {model.replace(/([A-Z])/g, " $1").toLowerCase()} is selected. */}
            {currentItemSelected.itemTitle === "noSelectTitle"
              ? ""
              : `${currentItemSelected.itemTitle}`}
          </div>
          <span
            style={{
              display:
                currentItemSelected.itemTitle === "noSelectTitle"
                  ? "none"
                  : "block",
            }}
          >
            <Tooltip title="View photos">
              <IconButton>
                <PhotoLibraryIcon
                  sx={{
                    color: "primary.light",
                    // border: "0.75px solid #757575",
                    // borderRadius: Math.PI,
                    fontSize: "inherit",
                    pointerEvents: "auto",
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="View details">
              <IconButton sx={{ mx: 2 }}>
                <InfoIcon
                  sx={{
                    color: "primary.light",
                    // border: "0.75px solid #757575",
                    // borderRadius: Math.PI,
                    fontSize: "inherit",
                    pointerEvents: "auto",
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Exploding view">
              <IconButton
                onClick={() => {
                  setToggled(!toggled);
                  console.log("clicked animate");
                }}
                disabled={animActive ? true : false}
              >
                <OpenWithIcon
                  sx={{
                    color: "primary.light",
                    // border: "0.75px solid #757575",
                    // borderRadius: Math.PI,
                    fontSize: "inherit",
                    pointerEvents: "auto",
                  }}
                />
              </IconButton>
            </Tooltip>
          </span>
          <div id="description">
            {/* The {model.replace(/([A-Z])/g, " $1").toLowerCase()} is selected. */}
            {currentItemSelected.itemDescription}
          </div>
          <div id="size">
            {/* The {model.replace(/([A-Z])/g, " $1").toLowerCase()} is selected. */}
            {currentItemSelected.size}
          </div>
          <BuyButton
            theme={theme}
            item={currentItemSelected}
            itemNo={currentItemSelected.itemNo}
            // priceTotal={totalPrice()}
            // currentItemOptionSelect={currentItemOptionSelect}
            // currentItemOptionType={currentItemOptionType}
          >
            {currentItemSelected.itemTitle}
          </BuyButton>
        </div>
      </ThemeProvider>
      {/* <SnipcartProvider>
        <SelectMenu
          toggled={toggled}
          setToggled={setToggled}
          animActive={animActive}
          open={open}
          setOpen={setOpen}
          handleStainChange={handleStainChange}
          handlePaintChange={handlePaintChange}
          currentItemSelected={currentItemSelected}
          setCurrentItemSelected={setCurrentItemSelected}
          setPreviousItemSelected={setPreviousItemSelected}
          currentItemOptionSelect={currentItemOptionSelect}
          currentItemOptionType={currentItemOptionType}
          currentItemDescription={currentItemDescription}
        />
      </SnipcartProvider> */}
    </>
  );
}

export default App;
