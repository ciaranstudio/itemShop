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

import {
  createBrowserRouter,
  RouterProvider,
  Link,
  useLocation,
} from "react-router-dom";

export default function ImagesRouter({ toggleInfoBox, togglePhotoBox, theme }) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PhotoGrid
          toggleInfoBox={toggleInfoBox}
          togglePhotoBox={togglePhotoBox}
          theme={theme}
          images={[allImages[0], allImages[1], allImages[2]]}
          flag={true}
        />
      ),
      children: [
        {
          path: "about",
          element: (
            <PhotoGrid
              toggleInfoBox={toggleInfoBox}
              togglePhotoBox={togglePhotoBox}
              theme={theme}
              images={[allImages[3], allImages[4], allImages[5]]}
              flag={false}
            />
          ),
        },
      ],
    },
  ]);
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

  return <RouterProvider router={router} />;
}
