// import { toggleInfoBox } from "./toggleInfoPhoto.js";
// import { togglePhotoBox } from "./toggleInfoPhoto.js";
// import { useOptionStore } from "../store/useOptionStore.tsx";
import { Link, useLocation } from "react-router-dom";
import { useDashContext } from "../context/ViewContext";

export async function loadImages({ params }) {
  //   toggleInfoBox();
  //   const open = useOptionStore((state) => state.open);
  //   const setOpen = useOptionStore((state) => state.setOpen);
  //   setOpen(false);
  // get location from Router hook
  // const routerLocation = useLocation();

  // get and set context location value
  // const { location, setLocation } = useDashContext();
  // console.log("routerLocation: ", routerLocation);
  // console.log("location: ", location);
  console.log("params: ", params);
  return null;
}
