import { createBrowserRouter, redirect } from "react-router-dom";
import { authProvider } from "../data/authProvider.js";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "../routes/root.jsx";
import Record, {
  loader as recordLoader,
  action as recordAction,
} from "../routes/record.jsx";
import EditRecord, { action as editAction } from "../routes/edit.jsx";
import { action as destroyAction } from "../routes/destroy.jsx";
import Index from "../routes/index";
import LoginPage, {
  loader as loginLoader,
  action as loginAction,
} from "../routes/login.jsx";
import { Outlet } from "react-router-dom";
import PhotoGrid from "../components/interface/PhotoGrid.jsx";
import PhotoSingle from "../components/interface/PhotoSingle.jsx";
import ErrorPage from "../components/interface/ErrorPage.jsx";
import { theme } from "../data/theme.js";
import {
  loadShopImages,
  loadArtworkImages,
  loadCustomImages,
  loadAboutImages,
} from "./loadImages.js";
import HtmlOutletRoot from "../components/interface/HtmlOutletRoot.jsx";
import ItemDescBox from "../components/interface/ItemDescBox.jsx";
import ContactBox from "../components/interface/ContactBox.jsx";
import AboutBox from "../components/interface/AboutBox.jsx";
import SubscribeEmailBox from "../components/interface/SubscribeEmailBox.jsx";
// import { createSubscribedEmailRecord } from "./records.js";

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
    children: [
      {
        path: "info",
        element: <ItemDescBox theme={theme} />,
      },
      {
        path: "view",
        element: <PhotoSingle theme={theme} />,
      },
      {
        path: "shop",
        element: <PhotoGrid theme={theme} />,
        loader: loadShopImages,
      },
      {
        path: "custom",
        element: <PhotoGrid theme={theme} />,
        loader: loadCustomImages,
      },
      {
        path: "artwork",
        element: <PhotoGrid theme={theme} />,

        loader: loadArtworkImages,
      },
      {
        path: "about",
        element: <AboutBox theme={theme} />,
        loader: loadAboutImages,
      },
      {
        path: "contact",
        element: <ContactBox theme={theme} />,
      },
      {
        path: "subscribe",
        element: <SubscribeEmailBox theme={theme} />,
        // action: createSubscribedEmailRecord,
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
