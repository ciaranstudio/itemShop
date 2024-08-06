import { textures } from "../data/textures.js";

// update part(s) color option(s): color and texture applied to item part mesh object
export const handlePartOption = (
  e,
  itemName,
  partName,
  color,
  stopPropogation,
  updatePartColor,
  updatePartColorName,
  updatePartTexture,
  calculateItemPrice,
) => {
  if (e) {
    e.preventDefault();
    if (stopPropogation) {
      e.stopPropagation();
    }
  }
  const updatePart = (
    itemName,
    partName,
    colorName,
    textureSurface,
    textureColor,
  ) => {
    updatePartTexture(itemName, partName, textureSurface);
    updatePartColor(itemName, partName, textureColor);
    updatePartColorName(itemName, partName, colorName);
  };
  switch (color) {
    case "white":
      updatePart(
        itemName,
        partName,
        color,
        textures.whiteTexture,
        textures.whiteStain,
      );
      break;
    case "natural":
      updatePart(
        itemName,
        partName,
        color,
        textures.naturalTexture,
        textures.naturalStain,
      );
      break;
    case "black":
      updatePart(
        itemName,
        partName,
        color,
        textures.blackTexture,
        textures.blackStain,
      );
      break;
    case "allBlack":
      updatePart(
        itemName,
        partName,
        color,
        textures.allBlackTexture,
        textures.allBlackStain,
      );
      break;
    case "alabaster":
      updatePart(
        itemName,
        partName,
        color,
        textures.paintedTexture,
        textures.alabasterPaint,
      );
      break;
    case "pink":
      updatePart(
        itemName,
        partName,
        color,
        textures.paintedTexture,
        textures.pinkPaint,
      );
      break;
    case "basil":
      updatePart(
        itemName,
        partName,
        color,
        textures.paintedTexture,
        textures.basilPaint,
      );
      break;
    case "yellow":
      updatePart(
        itemName,
        partName,
        color,
        textures.paintedTexture,
        textures.yellowPaint,
      );
      break;
    case "blue":
      updatePart(
        itemName,
        partName,
        color,
        textures.paintedTexture,
        textures.bluePaint,
      );
      break;
    case "gray":
      updatePart(
        itemName,
        partName,
        color,
        textures.paintedTexture,
        textures.grayPaint,
      );
      break;
    case "none":
      break;
  }
  calculateItemPrice(itemName);
};
