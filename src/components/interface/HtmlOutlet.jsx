import React, { useEffect } from "react";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { Html } from "@react-three/drei";
import ImagesRouter from "./ImagesRouter.jsx";
import { shopItems } from "../../data/objects.js";

export default function HtmlOutlet() {
  const selectedImage = useOptionStore((state) => state.selectedImage);
  const selectedImageIndex = useOptionStore(
    (state) => state.selectedImageIndex,
  );
  const currentItemSelected = useOptionStore(
    (state) => state.currentItemSelected,
  );
  // const setSelectedImage = useOptionStore((state) => state.setSelectedImage);
  const setCurrentItemSelected = useOptionStore(
    (state) => state.setCurrentItemSelected,
  );
  const setPreviousItemSelected = useOptionStore(
    (state) => state.setPreviousItemSelected,
  );
  useEffect(() => {
    // console.log("selectedImage: ", selectedImage);
    if (selectedImage !== null) {
      if (selectedImage.route === "shop") {
        const tempSelectedTitle = selectedImage.title.substring(
          0,
          selectedImage.title.indexOf("_"),
        );
        const titleMatch = (element) => element.itemTitle === tempSelectedTitle;
        // if (titleMatch) {
        const matchedItem = shopItems.find(titleMatch);
        // console.log("matched item from shop image click: ", matchedItem);
        setPreviousItemSelected(currentItemSelected);
        setCurrentItemSelected(matchedItem);
        // }
      }
    }
  }, [selectedImage]);

  // useEffect(() => {
  //   console.log("selectedImage: ", selectedImage);
  //   console.log("selectedImageIndex: ", selectedImageIndex);
  // }, [selectedImageIndex]);

  // useEffect(() => {
  //   console.log("currentItemSelected: ", currentItemSelected);
  // }, [currentItemSelected]);
  return (
    <Html center position={[0, 0, 0]}>
      <ImagesRouter />
    </Html>
  );
}
