import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import PhotoGrid from "./PhotoGrid.jsx";
import PhotoBox from "./PhotoBox.jsx";
import { allImages } from "../../data/objects.jsx";
import ImagesRouter from "./ImagesRouter.jsx";
import { Outlet } from "react-router-dom";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function HtmlOutlet({ toggleInfoBox, togglePhotoBox, theme }) {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: (
  //       <PhotoGrid
  //         toggleInfoBox={toggleInfoBox}
  //         togglePhotoBox={togglePhotoBox}
  //         theme={theme}
  //         images={[allImages[0], allImages[1], allImages[2]]}
  //       />
  //     ),
  //     children: [
  //       {
  //         path: "about",
  //         element: (
  //           <PhotoGrid
  //             toggleInfoBox={toggleInfoBox}
  //             togglePhotoBox={togglePhotoBox}
  //             theme={theme}
  //             images={[allImages[3], allImages[4], allImages[5]]}
  //           />
  //         ),
  //       },
  //     ],
  //   },
  // ]);
  // infobox Y axis position for drei Html component
  // const htmlPosY = 50;
  const htmlPosY = 0;
  // about text blocks
  // useState

  // state from store
  const open = useOptionStore((state) => state.open);

  // useEffect
  // useEffect(() => {
  //   let nextIndex;
  //   if (aboutIndex === 4) {
  //     nextIndex = 0;
  //   } else {
  //     nextIndex = aboutIndex + 1;
  //   }
  //   setAboutIndex(nextIndex);
  // }, [aboutPageToggle]);

  // state from store
  // actions from store
  // functions

  return (
    <Html center position={[0, htmlPosY, 0]}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          className="info"
          style={{
            display: open ? "block" : "none",
            paddingBottom: "1rem",
            overflow: "auto",
            pointerEvents: "auto",
            marginTop: "0.5rem",
          }}
        >
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
          {/* <Outlet /> */}
          {/* <PhotoGrid
            toggleInfoBox={toggleInfoBox}
            // openUserEmail={openUserEmail}
            // handlePartOption={handlePartOption}
            togglePhotoBox={togglePhotoBox}
            theme={theme}
            image={allImages}
          /> */}

          {/* <RouterProvider router={router} /> */}
          <ImagesRouter
            toggleInfoBox={toggleInfoBox}
            // openUserEmail={openUserEmail}
            // handlePartOption={handlePartOption}
            togglePhotoBox={togglePhotoBox}
            theme={theme}
          />
        </div>
      </ThemeProvider>
    </Html>
  );
}
