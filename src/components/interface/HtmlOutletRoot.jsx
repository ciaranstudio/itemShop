import React, { useEffect } from "react";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { useLocation } from "react-router-dom";
import { unselectedItem } from "../../data/objects.js";
import { shopItems } from "../../data/objects.js";

export default function HtmlOutletRoot({ children }) {
  // state from store
  const selectedImage = useOptionStore((state) => state.selectedImage);
  const selectedImageIndex = useOptionStore(
    (state) => state.selectedImageIndex,
  );
  const showBackground = useOptionStore((state) => state.showBackground);
  const currentItemSelected = useOptionStore(
    (state) => state.currentItemSelected,
  );

  // action from store
  const setSelectedImage = useOptionStore((state) => state.setSelectedImage);
  const setOpen = useOptionStore((state) => state.setOpen);
  const setLocationPathname = useOptionStore(
    (state) => state.setLocationPathname,
  );
  const setCurrentItemSelected = useOptionStore(
    (state) => state.setCurrentItemSelected,
  );
  const setPreviousItemSelected = useOptionStore(
    (state) => state.setPreviousItemSelected,
  );
  const setShowBackground = useOptionStore((state) => state.setShowBackground);
  const setShowPartOptions = useOptionStore(
    (state) => state.setShowPartOptions,
  );

  // get location from Router hook
  const routerLocation = useLocation();

  useEffect(() => {
    setLocationPathname(routerLocation.pathname);
    if (routerLocation.pathname !== "/view") {
      setSelectedImage(null);
    }
    if (routerLocation.pathname === "/" || routerLocation.pathname === "") {
      setOpen(false);
    } else {
      setOpen(true);
    }
    if (routerLocation.pathname === "/") {
      if (currentItemSelected !== unselectedItem) {
        if (showBackground) {
          setShowBackground(false);
        }
      }
    } else {
      setShowBackground(true);
    }
  }, [routerLocation]);

  useEffect(() => {
    console.log("selectedImage: ", selectedImage);
    if (selectedImage !== null) {
      if (selectedImage.route === "shop") {
        const tempSelectedTitle = selectedImage.title.substring(
          0,
          selectedImage.title.indexOf("_"),
        );
        const titleMatch = (element) => element.itemTitle === tempSelectedTitle;
        // if (titleMatch) {
        const matchedItem = shopItems.find(titleMatch);
        console.log("matched item from shop image click: ", matchedItem);
        setPreviousItemSelected(currentItemSelected);
        setCurrentItemSelected(matchedItem);
        // }
      }
    }
  }, [selectedImage]);

  useEffect(() => {
    console.log("selectedImage: ", selectedImage);
    console.log("selectedImageIndex: ", selectedImageIndex);
  }, [selectedImageIndex]);

  return <>{children}</>;
}
