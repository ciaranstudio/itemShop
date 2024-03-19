// not in use, copy while testing new objects data (with Item and Part integration, shopItems array from there)

import Item from "./Item.jsx";
import objects from "./objects.jsx";

const unselectedItem = new Item(
  "", // itemNo
  "noSelect", // itemName
  "noSelectTitle", // itemTitle
  "Select item", // itemDescription
  0, // itemBasePrice
  0, // itemStainCost
  0, // itemMixedPaintCost
  0, // itemMixedStainCost
  [], // size
  { x: 0, y: 1, z: 0 }, // position
  [], // parts
);

const gramps = new Item(
  objects.gramps.itemNo, // itemNo
  objects.gramps.itemName, // itemName
  objects.gramps.itemTitle, // itemTitle
  objects.gramps.itemDescription, // itemDescription
  objects.gramps.itemBasePrice, // itemBasePrice
  objects.gramps.itemStainCost, // itemStainCost
  objects.gramps.itemMixedPaintCost, // itemMixedPaintCost
  objects.gramps.itemMixedStainCost, // itemMixedStainCost
  objects.gramps.size, // size
  objects.gramps.position, // position
  objects.gramps.parts, // parts
);

const squatter = new Item(
  objects.squatter.itemNo, // itemNo
  objects.squatter.itemName, // itemName
  objects.squatter.itemTitle, // itemTitle
  objects.squatter.itemDescription, // itemDescription
  objects.squatter.itemBasePrice, // itemBasePrice
  objects.squatter.itemStainCost, // itemStainCost
  objects.squatter.itemMixedPaintCost, // itemMixedPaintCost
  objects.squatter.itemMixedStainCost, // itemMixedStainCost
  objects.squatter.size, // size
  objects.squatter.position, // position
  objects.squatter.parts, // parts
);

const block = new Item(
  objects.block.itemNo, // itemNo
  objects.block.itemName, // itemName
  objects.block.itemTitle, // itemTitle
  objects.block.itemDescription, // itemDescription
  objects.block.itemBasePrice, // itemBasePrice
  objects.block.itemStainCost, // itemStainCost
  objects.block.itemMixedPaintCost, // itemMixedPaintCost
  objects.block.itemMixedStainCost, // itemMixedStainCost
  objects.block.size, // size
  objects.block.position, // position
  objects.block.parts, // parts
);

const horse = new Item(
  objects.horse.itemNo, // itemNo
  objects.horse.itemName, // itemName
  objects.horse.itemTitle, // itemTitle
  objects.horse.itemDescription, // itemDescription
  objects.horse.itemBasePrice, // itemBasePrice
  objects.horse.itemStainCost, // itemStainCost
  objects.horse.itemMixedPaintCost, // itemMixedPaintCost
  objects.horse.itemMixedStainCost, // itemMixedStainCost
  objects.horse.size, // size
  objects.horse.position, // position
  objects.horse.parts, // parts
);

const shelfA16 = new Item(
  objects.shelfA16.itemNo, // itemNo
  objects.shelfA16.itemName, // itemName
  objects.shelfA16.itemTitle, // itemTitle
  objects.shelfA16.itemDescription, // itemDescription
  objects.shelfA16.itemBasePrice, // itemBasePrice
  objects.shelfA16.itemStainCost, // itemStainCost
  objects.shelfA16.itemMixedPaintCost, // itemMixedPaintCost
  objects.shelfA16.itemMixedStainCost, // itemMixedStainCost
  objects.shelfA16.size, // size
  objects.shelfA16.position, // position
  objects.shelfA16.parts, // parts
);

const shelfA32 = new Item(
  objects.shelfA32.itemNo, // itemNo
  objects.shelfA32.itemName, // itemName
  objects.shelfA32.itemTitle, // itemTitle
  objects.shelfA32.itemDescription, // itemDescription
  objects.shelfA32.itemBasePrice, // itemBasePrice
  objects.shelfA32.itemStainCost, // itemStainCost
  objects.shelfA32.itemMixedPaintCost, // itemMixedPaintCost
  objects.shelfA32.itemMixedStainCost, // itemMixedStainCost
  objects.shelfA32.size, // size
  objects.shelfA32.position, // position
  objects.shelfA32.parts, // parts
);

const shelfB16 = new Item(
  objects.shelfB16.itemNo, // itemNo
  objects.shelfB16.itemName, // itemName
  objects.shelfB16.itemTitle, // itemTitle
  objects.shelfB16.itemDescription, // itemDescription
  objects.shelfB16.itemBasePrice, // itemBasePrice
  objects.shelfB16.itemStainCost, // itemStainCost
  objects.shelfB16.itemMixedPaintCost, // itemMixedPaintCost
  objects.shelfB16.itemMixedStainCost, // itemMixedStainCost
  objects.shelfB16.size, // size
  objects.shelfB16.position, // position
  objects.shelfB16.parts, // parts
);

const shelfB32 = new Item(
  objects.shelfB32.itemNo, // itemNo
  objects.shelfB32.itemName, // itemName
  objects.shelfB32.itemTitle, // itemTitle
  objects.shelfB32.itemDescription, // itemDescription
  objects.shelfB32.itemBasePrice, // itemBasePrice
  objects.shelfB32.itemStainCost, // itemStainCost
  objects.shelfB32.itemMixedPaintCost, // itemMixedPaintCost
  objects.shelfB32.itemMixedStainCost, // itemMixedStainCost
  objects.shelfB32.size, // size
  objects.shelfB32.position, // position
  objects.shelfB32.parts, // parts
);

// const shopItems = [gramps, squatter, block, horse, shelfA, shelfB];
