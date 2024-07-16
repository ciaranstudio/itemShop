import { createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import PhotoGrid from "./PhotoGrid.jsx";
import ErrorPage from "../ErrorPage";
import { theme } from "../../data/theme.js";
import { allImages } from "../../data/objects.jsx";
import { toggleInfoBox } from "../../utils/toggleInfoPhoto.js";
import { togglePhotoBox } from "../../utils/toggleInfoPhoto.js";
import {
  loadShopImages,
  loadItemImages,
  loadArtImages,
  loadCustomImages,
  loadSaleImages,
  loadAboutImages,
} from "../../utils/loadImages.js";

export const router = createBrowserRouter([
  {
    // id: "root",
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    errorElement: <ErrorPage />,
    // loader: loadImages,
    // action: rootAction,
    children: [
      {
        path: "sale",
        element: (
          <PhotoGrid
            toggleInfoBox={toggleInfoBox}
            togglePhotoBox={togglePhotoBox}
            theme={theme}
            folders={true}
            single={false}
          />
        ),
        loader: loadSaleImages,
        // action: contactAction,
      },
      {
        path: "about",
        element: (
          <PhotoGrid
            toggleInfoBox={toggleInfoBox}
            togglePhotoBox={togglePhotoBox}
            theme={theme}
            folders={true}
            single={false}
          />
        ),
        loader: loadAboutImages,
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
            single={false}
          />
        ),
        loader: loadShopImages,
        // action: contactAction,
      },
      {
        path: ":itemName",
        element: (
          <PhotoGrid
            toggleInfoBox={toggleInfoBox}
            togglePhotoBox={togglePhotoBox}
            theme={theme}
            folders={true}
            single={true}
          />
        ),
        loader: loadItemImages,
        // action: contactAction,
      },
      {
        path: "custom",
        element: (
          <PhotoGrid
            toggleInfoBox={toggleInfoBox}
            togglePhotoBox={togglePhotoBox}
            theme={theme}
            folders={true}
            single={false}
          />
        ),
        loader: loadCustomImages,
        // action: contactAction,
      },
      {
        path: "exhibitions",
        element: (
          <PhotoGrid
            toggleInfoBox={toggleInfoBox}
            togglePhotoBox={togglePhotoBox}
            theme={theme}
            folders={true}
            single={false}
          />
        ),

        loader: loadArtImages,
        // action: contactAction,
      },
      {
        path: "contact",
        element: (
          <PhotoGrid
            toggleInfoBox={toggleInfoBox}
            togglePhotoBox={togglePhotoBox}
            theme={theme}
            folders={true}
            single={false}
          />
        ),
        // loader: loadImages,
        // action: contactAction,
      },
    ],
  },
]);
