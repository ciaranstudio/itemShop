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

  const [currentItemSelected, setCurrentItemSelected] =
    useState(unselectedItem);
  const [previousItemSelected, setPreviousItemSelected] =
    useState(unselectedItem);

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
          far: 21, // 900
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
          <BuyButton theme={theme} item={currentItemSelected}>
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
