import React, { useEffect } from "react";
import { useDashContext } from "../../context/ViewContext";
import { useLocation } from "react-router-dom";
import { useOptionStore } from "../../store/useOptionStore.tsx";

export default function HtmlOutletRoot({ children }) {
  // action from store
  const setOpen = useOptionStore((state) => state.setOpen);
  // context hook
  const { location, setLocation } = useDashContext();
  // get location from Router hook
  const routerLocation = useLocation();
  useEffect(() => {
    console.log("routerLocation in HtmlOutletRoot: ", routerLocation);
    setLocation(routerLocation);
  }, [routerLocation]);
  useEffect(() => {
    console.log("dash context location in HtmlOutletRoot: ", location);
    if (location.pathname === "/") {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [location]);
  return <>{children}</>;
}
