import { createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import PhotoGrid from "./PhotoGrid.jsx";
import { theme } from "../../data/theme.js";
import { allImages } from "../../data/objects.jsx";
import { toggleInfoBox } from "../../utils/toggleInfoPhoto.js";
import { togglePhotoBox } from "../../utils/toggleInfoPhoto.js";
import { loadImages } from "../../utils/loadImages.js";

export const router = createBrowserRouter([
  {
    // id: "root",
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    // errorElement: <ErrorPage />,
    loader: loadImages,
    // action: rootAction,
    children: [
      {
        path: "sale",
        element: (
          <PhotoGrid
            toggleInfoBox={toggleInfoBox}
            togglePhotoBox={togglePhotoBox}
            theme={theme}
            images={[allImages[0], allImages[0], allImages[0]]}
            folders={true}
          />
        ),
        // loader: loadImages,
        // action: contactAction,
      },
      {
        path: "about",
        element: (
          <PhotoGrid
            toggleInfoBox={toggleInfoBox}
            togglePhotoBox={togglePhotoBox}
            theme={theme}
            images={[allImages[1], allImages[1], allImages[1]]}
            folders={true}
          />
        ),
        // loader: loadImages,
        // action: contactAction,
      },
      {
        path: "images",
        element: (
          <PhotoGrid
            toggleInfoBox={toggleInfoBox}
            togglePhotoBox={togglePhotoBox}
            theme={theme}
            images={[allImages[2], allImages[2], allImages[2]]}
            folders={true}
          />
        ),
        // loader: loadImages,
        // action: contactAction,
      },
      {
        path: "custom",
        element: (
          <PhotoGrid
            toggleInfoBox={toggleInfoBox}
            togglePhotoBox={togglePhotoBox}
            theme={theme}
            images={[allImages[3], allImages[3], allImages[3]]}
            folders={true}
          />
        ),
        // loader: loadImages,
        // action: contactAction,
      },
      {
        path: "exhibitions",
        element: (
          <PhotoGrid
            toggleInfoBox={toggleInfoBox}
            togglePhotoBox={togglePhotoBox}
            theme={theme}
            images={[allImages[4], allImages[4], allImages[4]]}
            folders={true}
          />
        ),

        // loader: loadImages,
        // action: contactAction,
      },
      {
        path: "contact",
        element: (
          <PhotoGrid
            toggleInfoBox={toggleInfoBox}
            togglePhotoBox={togglePhotoBox}
            theme={theme}
            images={[allImages[5], allImages[5], allImages[5]]}
            folders={true}
          />
        ),

        // loader: loadImages,
        // action: contactAction,
      },
    ],
  },
]);
