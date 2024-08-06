import React, { useEffect } from "react";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { Html } from "@react-three/drei";
import ImagesRouter from "./ImagesRouter.jsx";
import { shopItems } from "../../data/objects.js";
import { handlePartOption } from "../../utils/handlePartOption.js";

export default function HtmlOutlet() {
  const selectedImage = useOptionStore((state) => state.selectedImage);
  // const selectedImageIndex = useOptionStore(
  //   (state) => state.selectedImageIndex,
  // );
  const currentItemSelected = useOptionStore(
    (state) => state.currentItemSelected,
  );
  const setCurrentItemSelected = useOptionStore(
    (state) => state.setCurrentItemSelected,
  );
  const setPreviousItemSelected = useOptionStore(
    (state) => state.setPreviousItemSelected,
  );

  const updatePartColor = useOptionStore((state) => state.updatePartColor);
  const updatePartColorName = useOptionStore(
    (state) => state.updatePartColorName,
  );
  const updatePartTexture = useOptionStore((state) => state.updatePartTexture);
  const calculateItemPrice = useOptionStore(
    (state) => state.calculateItemPrice,
  );

  useEffect(() => {
    if (selectedImage !== null) {
      if (Object.hasOwn(selectedImage, "shop")) {
        // const tempSelectedTitle = selectedImage.title.substring(
        //   0,
        //   selectedImage.title.indexOf("_"),
        // );
        if (selectedImage.shop === "on") {
          if (Object.hasOwn(selectedImage, "itemName")) {
            const titleMatch = (element) =>
              element.itemName === selectedImage.itemName;
            const matchedItem = shopItems.find(titleMatch);
            setPreviousItemSelected(currentItemSelected);
            setCurrentItemSelected(matchedItem);
            matchedItem.parts.map((part) => {
              if (Object.hasOwn(selectedImage, part.partName)) {
                handlePartOption(
                  false,
                  selectedImage.itemName,
                  part.partName,
                  selectedImage[part.partName],
                  false,
                  updatePartColor,
                  updatePartColorName,
                  updatePartTexture,
                  calculateItemPrice,
                );
              }
              return;
            });
          }
        }
      }
    }
  }, [selectedImage]);

  // useEffect(() => {
  //   console.log("selectedImage: ", selectedImage);
  //   console.log("selectedImageIndex: ", selectedImageIndex);
  // }, [selectedImageIndex]);

  return (
    <Html center position={[0, 0, 0]}>
      <ImagesRouter />
    </Html>
  );
}
