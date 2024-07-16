import React from "react";
import { RouterProvider } from "react-router-dom";
import { DashContextProvider } from "../../context/ViewContext";
import { router } from "./router.jsx";

export default function ImagesRouter() {
  return (
    <DashContextProvider>
      <RouterProvider router={router} />
    </DashContextProvider>
  );
}
