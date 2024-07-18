import React, { useEffect } from "react";
import { useDashContext } from "../../context/ViewContext";
import { useLocation } from "react-router-dom";

export default function HtmlOutletRoot({ children }) {
  const { location, setLocation } = useDashContext();
  // get location from Router hook
  const routerLocation = useLocation();
  useEffect(() => {
    console.log("routerLocation in HtmlOutletRoot: ", routerLocation);
    setLocation(routerLocation);
  }, [routerLocation]);
  useEffect(() => {
    console.log("dash context location in HtmlOutletRoot: ", location);
  }, [location]);
  return <>{children}</>;
}
