import React, { useEffect } from "react";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { useLocation } from "react-router-dom";
import { unselectedItem } from "../../data/objects.jsx";
import { shopItems } from "../../data/objects.jsx";

export default function HtmlOutletRoot({ children }) {
  // state from store
  const selectedImage = useOptionStore((state) => state.selectedImage);
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
  // const setShowPartOptions = useOptionStore(
  //   (state) => state.setShowPartOptions,
  // );

  // get location from Router hook
  const routerLocation = useLocation();

  useEffect(() => {
    // console.log("routerLocation in HtmlOutletRoot: ", routerLocation);
    setLocationPathname(routerLocation.pathname);

    if (routerLocation.pathname === "/" || routerLocation.pathname === "") {
      setOpen(false);
    } else {
      setOpen(true);
    }
    if (routerLocation.pathname === "/") {
      if (showBackground) {
        if (currentItemSelected !== unselectedItem)
          setTimeout(() => {
            setShowBackground(false);
          }, 500);
      } else {
        // setShowPartOptions(true);
        setShowBackground(true);
        setTimeout(() => {
          setShowBackground(false);
        }, 1500);
        // setShowBackground(false);
      }
      if (selectedImage !== null) {
        if (selectedImage.route === "shop") {
          const tempSelectedTitle = selectedImage.title;
          const titleMatch = (element) =>
            element.itemTitle === tempSelectedTitle;
          if (titleMatch) {
            let matchedItem = shopItems.find(titleMatch);
            console.log("matched item from shop image click: ", matchedItem);
            setPreviousItemSelected(currentItemSelected);
            setCurrentItemSelected(matchedItem);
          }
        }
        setSelectedImage(null);
      }
    }
  }, [routerLocation]);

  useEffect(() => {
    console.log("selectedImage: ", selectedImage);
  }, [selectedImage]);

  // useEffect(() => {
  //   console.log(
  //     "router location (store) in HtmlOutletRoot: ",
  //     locationPathname,
  //   );
  //   console.log("open (store state): ", open);
  // }, [locationPathname]);

  return <>{children}</>;
}
