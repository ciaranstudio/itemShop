import { useState, useEffect } from "react";
import { useOptionStore } from "../store/useOptionStore";
// can i expand this (keep same hook name) to tell me approx which phone screen size / model is viewing site
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const mobileView = useOptionStore((state) => state.mobileView);
  const setMobileView = useOptionStore((state) => state.setMobileView);

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    // // Check if using a touch control device
    // if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
    //   // console.log("mobile view");
    //   setMobileView(true);
    // } else {
    //   // console.log("not mobile view");
    //   setMobileView(false);
    // }

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const iOS =
  //   typeof navigator !== "undefined" &&
  //   /iPad|iPhone|iPod/.test(navigator.userAgent);

  return windowDimensions;
}
