import { createBrowserRouter, redirect } from "react-router-dom";
import { authProvider } from "../../data/authProvider";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "../../routes/root.jsx";
import Record, {
  loader as recordLoader,
  action as recordAction,
} from "../../routes/record.jsx";
import EditRecord, { action as editAction } from "../../routes/edit.jsx";
import { action as destroyAction } from "../../routes/destroy";
import Index from "../../routes/index";
import LoginPage, {
  loader as loginLoader,
  action as loginAction,
} from "../../routes/login";
import { Outlet } from "react-router-dom";
import PhotoGrid from "./PhotoGrid.jsx";
import ErrorPage from "./ErrorPage.jsx";
import { theme } from "../../data/theme.js";
// import { allImages } from "../../data/objects.jsx";
// import { toggleInfoBox } from "../../utils/toggleInfoPhoto.js";
// import { togglePhotoBox } from "../../utils/toggleInfoPhoto.js";
import {
  loadShopImages,
  // loadItemImages,
  loadArtImages,
  loadCustomImages,
  // loadSaleImages,
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
        path: "shop",
        element: <PhotoGrid theme={theme} />,
        loader: loadShopImages,
        // action: recordAction,
      },
      {
        path: "custom",
        element: <PhotoGrid theme={theme} />,
        loader: loadCustomImages,
        // action: recordAction,
      },
      {
        path: "artwork",
        element: <PhotoGrid theme={theme} />,

        loader: loadArtImages,
        // action: recordAction,
      },
      {
        path: "about",
        element: <PhotoGrid theme={theme} />,
        loader: loadAboutImages,
        // action: recordAction,
      },
      {
        path: "contact",
        element: <PhotoGrid theme={theme} />,
        // loader: loadImages,
        // action: recordAction,
      },
      // {
      //   path: "sale",
      //   element: (
      //     <PhotoGrid
      //       theme={theme}
      //     />
      //   ),
      //   loader: loadSaleImages,
      //   // action: recordAction,
      // },
      // {
      //   path: ":itemName",
      //   element: (
      //     <PhotoGrid
      //       theme={theme}
      //     />
      //   ),
      //   loader: loadItemImages,
      //   // action: recordAction,
      // },
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
        path: "records/:imageRecordId",
        element: <Record />,
        loader: recordLoader,
        action: recordAction,
      },
      {
        path: "records/:imageRecordId/edit",
        element: <EditRecord />,
        loader: recordLoader,
        action: editAction,
      },
      {
        path: "records/:imageRecordId/destroy",
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
