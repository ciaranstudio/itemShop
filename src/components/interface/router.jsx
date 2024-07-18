import { createBrowserRouter, redirect } from "react-router-dom";
import { authProvider } from "../../data/authProvider";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "../../routes/root";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "../../routes/contact";
import EditContact, { action as editAction } from "../../routes/edit";
import { action as destroyAction } from "../../routes/destroy";
import Index from "../../routes/index";
import LoginPage, {
  loader as loginLoader,
  action as loginAction,
} from "../../routes/login";

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
import HtmlOutletRoot from "./HtmlOutletRoot.jsx";

export const router = createBrowserRouter([
  {
    // id: "root",
    path: "/",
    element: (
      <HtmlOutletRoot>
        <Outlet />
      </HtmlOutletRoot>
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
  {
    id: "root",
    path: "/admin",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
    ],
  },
  {
    path: "/login",
    action: loginAction,
    loader: loginLoader,
    Component: LoginPage,
  },
  {
    path: "/logout",
    async action() {
      await authProvider.signout();
      return redirect("/");
    },
  },
]);
