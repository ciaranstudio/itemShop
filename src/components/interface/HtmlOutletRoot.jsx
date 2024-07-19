import React, { useEffect } from "react";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { useLocation } from "react-router-dom";

export default function HtmlOutletRoot({ children }) {
  // state from store
  const locationPathname = useOptionStore((state) => state.locationPathname);
  const open = useOptionStore((state) => state.open);

  // action from store
  const setOpen = useOptionStore((state) => state.setOpen);
  const setLocationPathname = useOptionStore(
    (state) => state.setLocationPathname,
  );

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
  }, [routerLocation]);

  // useEffect(() => {
  //   console.log(
  //     "router location (store) in HtmlOutletRoot: ",
  //     locationPathname,
  //   );
  //   console.log("open (store state): ", open);
  // }, [locationPathname]);

  return <>{children}</>;
}
