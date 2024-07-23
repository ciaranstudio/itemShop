import React, { useEffect } from "react";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { useLocation } from "react-router-dom";
import { unselectedItem } from "../../data/objects.js";

export default function HtmlOutletRoot({ children }) {
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
  const setShowBackground = useOptionStore((state) => state.setShowBackground);

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

  return <>{children}</>;
}
