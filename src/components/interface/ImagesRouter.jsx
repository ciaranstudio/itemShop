import React from "react";
import { RouterProvider } from "react-router-dom";
import { DashContextProvider } from "../../context/ViewContext";
import { router } from "../../utils/router.jsx";

export default function ImagesRouter() {
  return (
    <DashContextProvider>
      <RouterProvider router={router} />
    </DashContextProvider>
  );
}
