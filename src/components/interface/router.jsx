import {
  createBrowserRouter,
  RouterProvider,
  Link,
  useLocation,
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import PhotoGrid from "./PhotoGrid.jsx";
import { toggleInfoBox } from "../../utils/toggleInfoPhoto.js";
import { togglePhotoBox } from "../../utils/toggleInfoPhoto.js";
import { theme } from "../../utils/theme.js";
import { allImages } from "../../data/objects.jsx";

export const router = createBrowserRouter([
  {
    // path: "/",
    // element: (
    //   <PhotoGrid
    //     toggleInfoBox={toggleInfoBox}
    //     togglePhotoBox={togglePhotoBox}
    //     theme={theme}
    //     images={[allImages[0], allImages[1], allImages[2]]}
    //     flag={true}
    //   />
    // ),
    // path: "about",
    // element: (
    //   <PhotoGrid
    //     toggleInfoBox={toggleInfoBox}
    //     togglePhotoBox={togglePhotoBox}
    //     theme={theme}
    //     images={[allImages[2], allImages[3], allImages[2]]}
    //     flag={true}
    //   />
    // ),

    // id: "root",
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    // errorElement: <ErrorPage />,
    // loader: rootLoader,
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
            flag={true}
          />
        ),
        // loader: contactLoader,
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
            flag={true}
          />
        ),
        // loader: contactLoader,
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
            flag={true}
          />
        ),
        // loader: contactLoader,
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
            flag={true}
          />
        ),
        // loader: contactLoader,
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
            flag={true}
          />
        ),

        // loader: contactLoader,
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
            flag={true}
          />
        ),

        // loader: contactLoader,
        // action: contactAction,
      },
    ],
  },
]);
