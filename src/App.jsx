import { useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import * as THREE from "three";
import Scene from "./components/Scene.jsx";
import Placeholder from "./components/Placeholder.jsx";
import { unselectedItem } from "./data/objects.jsx";
import "./style.css";
import { SnipcartProvider } from "use-snipcart";
import CssBaseline from "@mui/material/CssBaseline";
import BuyButton from "./components/BuyButton.jsx";
import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
// import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function App() {
  const [open, setOpen] = useState(false);
  const [infoBoxIcon, setInfoBoxIcon] = useState(true);
  const [toggled, setToggled] = useState(false);
  const [animActive, setAnimActive] = useState(false);

  const [showBackground, setShowBackground] = useState(true);
  const [showPartOptions, setShowPartOptions] = useState(false);

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

  const toggleInfoBox = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // setShowPartOptions(false);
    // setShowBackground(true);
    setOpen(!open);
    setInfoBoxIcon(!infoBoxIcon);
  };
  const toggleBackground = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // setShowPartOptions(false);
    setShowBackground(!showBackground);
    // setOpen(!open);
    // setInfoBoxIcon(!infoBoxIcon);
  };
  const container = useRef();
  const animDist = 0; // 0.095
  const { contextSafe } = useGSAP({ scope: container }); // we can pass in a config object as the 1st parameter to make scoping simple
  // ✅ wrapped in contextSafe() - animation will be cleaned up correctly
  // selector text is scoped properly to the container.
  const onClickGood = contextSafe(() => {
    gsap.to(".good", { rotation: 180 });
    // tl.to(controlsTargetVec, {
    //   delay: 0.15,
    //   duration: 0.75,
    //   x: currentItemSelected.position.x,
    //   y: currentItemSelected.position.y,
    //   z: currentItemSelected.position.z,
    //   ease: "easeIn",
    //   // onStart: () => {
    //   //   console.log("targetVec: ", targetVec);
    //   // },
    //   onUpdate: () => {
    //     setTargetVec(controlsTargetVec);
    //     orbitRef.current.target.set(
    //       controlsTargetVec.x,
    //       controlsTargetVec.y,
    //       controlsTargetVec.z,
    //     );
    //     orbitRef.current.object.updateProjectionMatrix();
    //     orbitRef.current.update();
    //   },
    // });
  });

  return (
    <>
      <Leva hidden oneLineLabels />
      <Canvas
        ref={container} // will this work, if not use forwardRef and pass into Scene for use in objects group?
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
              animDist={animDist}
              showBackground={showBackground}
              setShowBackground={setShowBackground}
              showPartOptions={showPartOptions}
              setShowPartOptions={setShowPartOptions}
            />
          </SnipcartProvider>
        </Suspense>
      </Canvas>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* <Tooltip
          title="View details"
          // enterDelay={0}
          leaveDelay={0}
          // disableFocusListener
          // disableTouchListener
          // open={infoBoxIcon}
        > */}
        <IconButton
          onClick={(e) => toggleInfoBox(e)}
          color="inherit"
          disabled={
            currentItemSelected.itemTitle === "noSelectTitle" ? true : false
          }
          sx={{
            position: "absolute",
            bottom: "3rem",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: !infoBoxIcon ? "none" : "block",
          }}
        >
          <RadioButtonCheckedOutlinedIcon
            sx={{
              color:
                currentItemSelected.itemTitle === "noSelectTitle"
                  ? "secondary.main"
                  : "white",
              fontSize: "inherit",
            }}
          />
        </IconButton>
        {/* </Tooltip> */}

        <div
          className="info"
          style={{
            color: theme.palette.primary.light,
            // display:
            //   currentItemSelected.itemTitle === "noSelectTitle"
            //     ? "none"
            //     : "block",
            display: !open ? "none" : "block",
          }}
        >
          <IconButton
            onClick={(e) => toggleInfoBox(e)}
            color="inherit"
            // disabled={
            //   currentItemSelected.itemTitle === "noSelectTitle" ? true : false
            // }
            sx={{
              position: "absolute",
              pointerEvents: "auto",
              top: "0.25rem",
              left: "0.25rem",
            }}
          >
            <CloseOutlinedIcon sx={{ color: "secondary.main" }} />
          </IconButton>

          <IconButton
            onClick={(e) => toggleBackground(e)}
            color="inherit"
            // disabled={
            //   currentItemSelected.itemTitle === "noSelectTitle" ? true : false
            // }
            sx={{
              position: "absolute",
              pointerEvents: "auto",
              top: "0.25rem",
              right: "0.25rem",
            }}
          >
            {showBackground ? (
              <VisibilityIcon sx={{ color: "secondary.main" }} />
            ) : (
              <VisibilityOffIcon sx={{ color: "secondary.main" }} />
            )}
          </IconButton>

          <div>
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
            {/* <Tooltip
              title="View photos"
              // disableFocusListener
              // disableTouchListener
              leaveDelay={0}
              // open={open}
            > */}
            <IconButton>
              <PhotoLibraryIcon
                sx={{
                  color: "secondary.light",
                  // border: "0.75px solid #757575",
                  // borderRadius: Math.PI,
                  fontSize: "inherit",
                  pointerEvents: "auto",
                }}
              />
            </IconButton>
            {/* </Tooltip> */}

            {/* <Tooltip
              title="View details"
              disableFocusListener
              disableTouchListener
              leaveDelay={0}
              // open={open}
            > */}
            <IconButton sx={{ mx: 2 }}>
              <InfoIcon
                sx={{
                  color: "secondary.light",
                  // border: "0.75px solid #757575",
                  // borderRadius: Math.PI,
                  fontSize: "inherit",
                  pointerEvents: "auto",
                }}
              />
            </IconButton>
            {/* </Tooltip> */}

            {/* <Tooltip
              title="Exploding view"
              // disableFocusListener
              // disableTouchListener
              leaveDelay={0}
              // open={open}
            > */}
            <IconButton
              onClick={onClickGood}
              // onClick={() => {
              //   setToggled(!toggled);
              //   console.log("clicked animate");
              // }}
              // disabled={animActive ? true : false}
            >
              <OpenWithIcon
                sx={{
                  color: "secondary.main",
                  // border: "0.75px solid #757575",
                  // borderRadius: Math.PI,
                  fontSize: "inherit",
                  pointerEvents: "auto",
                }}
              />
            </IconButton>
            {/* </Tooltip> */}
          </span>
          <div id="description">{currentItemSelected.itemDescription}</div>
          <div id="size">{currentItemSelected.size}</div>
          <BuyButton theme={theme} item={currentItemSelected}>
            {currentItemSelected.itemTitle}
          </BuyButton>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
