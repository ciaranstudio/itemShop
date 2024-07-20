import React, { useEffect } from "react";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { useLocation } from "react-router-dom";
import { unselectedItem } from "../../data/objects.js";
import { shopItems } from "../../data/objects.js";
// import { goTo } from "../../utils/goTo.js";

export default function HtmlOutletRoot({ children }) {
  // state from store
  const selectedImage = useOptionStore((state) => state.selectedImage);
  const selectedImageIndex = useOptionStore(
    (state) => state.selectedImageIndex,
  );
  // const locationPathname = useOptionStore((state) => state.locationPathname);
  // const open = useOptionStore((state) => state.open);
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
    // console.log("routerLocation in HtmlOutletRoot: ", routerLocation);
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
          // if (currentItemSelected !== unselectedItem)
          //   setTimeout(() => {
          //     setShowBackground(false);
          //   }, 500);
        } else {
          // setShowPartOptions(true);
          // setShowBackground(true);
          // setTimeout(() => {
          //   setShowBackground(false);
          // }, 1500);
          // setShowBackground(false);
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
        if (titleMatch) {
          let matchedItem = shopItems.find(titleMatch);
          console.log("matched item from shop image click: ", matchedItem);
          setPreviousItemSelected(currentItemSelected);
          setCurrentItemSelected(matchedItem);
        }
      }
    }
  }, [selectedImage]);

  useEffect(() => {
    console.log("selectedImage: ", selectedImage);
    console.log("selectedImageIndex: ", selectedImageIndex);
  }, [selectedImageIndex]);

  // useEffect(() => {
  //   console.log(
  //     "router location (store) in HtmlOutletRoot: ",
  //     locationPathname,
  //   );
  //   console.log("open (store state): ", open);
  // }, [locationPathname]);

  return <>{children}</>;
}
