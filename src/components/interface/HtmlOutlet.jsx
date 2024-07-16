import React from "react";
import { Html } from "@react-three/drei";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import ImagesRouter from "./ImagesRouter.jsx";
import { router } from "./router.jsx";
// import { useDashContext } from "../../context/ViewContext";

export default function HtmlOutlet({ toggleInfoBox, togglePhotoBox, theme }) {
  const goTo = (route) => {
    // if (route === "/") setOpen(false);
    router.navigate(route);
  };

  // infobox Y axis position for drei Html component
  // const htmlPosY = 50;
  const htmlPosY = 0;

  // const { location, setLocation } = useDashContext();

  // state from store
  // const open = useOptionStore((state) => state.open);

  // action from store
  // const setOpen = useOptionStore((state) => state.setOpen);

  // useEffect
  // useEffect(() => {
  //   if (location.pathName === "/") setOpen(false);
  // }, [location]);

  // useEffect(() => {
  //   let nextIndex;
  //   if (aboutIndex === 4) {
  //     nextIndex = 0;
  //   } else {
  //     nextIndex = aboutIndex + 1;
  //   }
  //   setAboutIndex(nextIndex);
  // }, [aboutPageToggle]);

  return (
    <Html center position={[0, htmlPosY, 0]}>
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          pointerEvents: "auto",
          zIndex: "1",
        }}
      >
        <span>
          <IconButton
            onClick={(e) => toggleInfoBox(e)}
            color="inherit"
            sx={{
              padding: "0.5rem",
            }}
            aria-label="close info box"
          >
            <CloseOutlinedIcon fontSize="small" color="success" />
          </IconButton>
        </span>
      </span>
      <ImagesRouter
        toggleInfoBox={toggleInfoBox}
        // openUserEmail={openUserEmail}
        // handlePartOption={handlePartOption}
        togglePhotoBox={togglePhotoBox}
        theme={theme}
      />
    </Html>
  );
}
