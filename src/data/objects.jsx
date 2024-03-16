// import * as THREE from "three";

export const objects = {
  block: {
    itemName: "block",
    parts: [
      {
        partName: "shelves",
        animation: "none",
        model: "./models/blockModels/blockShelves.gltf",
      },
      {
        partName: "side 1",
        animation: "vertical",
        model: "./models/blockModels/blockSide1.gltf",
      },
      {
        partName: "side 2",
        animation: "vertical",
        model: "./models/blockModels/blockSide2.gltf",
      },
    ],
  },
  gramps: {
    itemName: "gramps",
    parts: [
      {
        partName: "top",
        animation: "horizontal",
        model: "./models/grampsModels/grampsTop.gltf",
      },
      {
        partName: "bar bottom",
        animation: "none",
        model: "./models/grampsModels/grampsBarBottom.gltf",
      },
      {
        partName: "bar top",
        animation: "horizontal",
        model: "./models/grampsModels/grampsBarTop.gltf",
      },
      {
        partName: "leg 1",
        animation: "vertical",
        model: "./models/grampsModels/grampsLeg1.gltf",
      },
      {
        partName: "leg 2",
        animation: "vertical",
        model: "./models/grampsModels/grampsLeg2.gltf",
      },
      {
        partName: "leg 3",
        animation: "vertical",
        model: "./models/grampsModels/grampsLeg3.gltf",
      },
      {
        partName: "leg 4",
        animation: "vertical",
        model: "./models/grampsModels/grampsLeg4.gltf",
      },
    ],
  },
  horse: {
    itemName: "horse",
    parts: [
      {
        partName: "top",
        animation: "horizontal",
        model: "./models/horseModels/horseBarTop.gltf",
      },
      {
        partName: "bar inner",
        animation: "none",
        model: "./models/horseModels/horseBarInner.gltf",
      },
      {
        partName: "leg 1",
        animation: "vertical",
        model: "./models/horseModels/horseLeg1.gltf",
      },
      {
        partName: "leg 2",
        animation: "vertical",
        model: "./models/horseModels/horseLeg2.gltf",
      },
      {
        partName: "leg 3",
        animation: "vertical",
        model: "./models/horseModels/horseLeg3.gltf",
      },
      {
        partName: "leg 4",
        animation: "vertical",
        model: "./models/horseModels/horseLeg4.gltf",
      },
    ],
  },
  squatter: {
    itemName: "squatter",
    parts: [
      {
        partName: "top",
        animation: "horizontal",
        model: "./models/squatterModels/squatterTop.gltf",
      },
      {
        partName: "center panel",
        animation: "none",
        model: "./models/squatterModels/squatterCenterPanel.gltf",
      },
      {
        partName: "side 1",
        animation: "vertical",
        model: "./models/squatterModels/squatterSide1.gltf",
      },
      {
        partName: "side 2",
        animation: "vertical",
        model: "./models/squatterModels/squatterSide2.gltf",
      },
    ],
  },
  shelfAShort: {
    itemName: "shelfA",
    parts: [
      {
        partName: "shelf",
        animation: "vertical",
        model: "./models/shelfAShortModels/shelfAShortShelf.gltf",
      },
      {
        partName: "cleat",
        animation: "none",
        model: "./models/shelfAShortModels/shelfAShortCleat.gltf",
      },
    ],
  },
  shelfALong: {
    itemName: "shelfA",
    parts: [
      {
        partName: "shelf",
        animation: "vertical",
        model: "./models/shelfALongModels/shelfALongShelf.gltf",
      },
      {
        partName: "cleat",
        animation: "none",
        model: "./models/shelfALongModels/shelfALongCleat.gltf",
      },
    ],
  },
  shelfBShort: {
    itemName: "shelfB",
    parts: [
      {
        partName: "shelf",
        animation: "vertical",
        model: "./models/shelfBShortModels/shelfBShortShelf.gltf",
      },
      {
        partName: "cleat",
        animation: "none",
        model: "./models/shelfBShortModels/shelfBShortCleat.gltf",
      },
    ],
  },
  shelfBLong: {
    itemName: "shelfB",
    parts: [
      {
        partName: "shelf",
        animation: "vertical",
        model: "./models/shelfBLongModels/shelfBLongShelf.gltf",
      },
      {
        partName: "cleat",
        animation: "none",
        model: "./models/shelfBLongModels/shelfBLongCleat.gltf",
      },
    ],
  },
};

// create shopItems array of Item class instances in this file and replace in App / Scene / SelectMenu
// export const shopItems = [
//   objects.block,
//   objects.gramps,
//   objects.horse,
//   objects.squatter,
//   objects.block,
//   objects.block,
// ];

// discuss with Eli about issue with shelf short and long being bundled / advantages and disadvantages

// const grampSizes = ["16 x 16 x 18"]; //LDH
// const squatterSizes = ["16 x 12 x 18"]; //LDH
// const blockSizes = ["8 x 8 x 16"]; //LDH
// const horseSizes = ["32 x 20 x 32"]; //LDH
// const shelfASizes = ["16 x 4 x 4", "32 x 4 x 4"]; //LDH
// const shelfBSizes = ["16 x 6 x 4", "32 x 6 x 4"]; //LDH

// const grampsPosition = [
//   { x: 0, y: 0, z: 70 },
//   { x: 0, y: 0, z: 0 },
// ];
// const squatterPosition = [
//   { x: -70, y: 0, z: 0 },
//   { x: 1, y: 1, z: 1 },
// ];
// const blockPosition = [
//   { x: 0, y: 0, z: -70 },
//   { x: 2, y: 2, z: 2 },
// ];
// const horsePosition = [
//   { x: 70, y: 0, z: 0 },
//   { x: 3, y: 3, z: 3 },
// ];
// const shelfAPosition = [
//   { x: -118.3125, y: 0, z: -81.125 },
//   { x: -118.3125, y: 0, z: -40.6 },
// ];
// const shelfBPosition = [
//   { x: 33.685, y: 0, z: 118.25 },
//   { x: 73.685, y: 0, z: 118.25 },
// ];

// const unselectedItem = new Item(
//   "noSelect", // itemName
//   "", // itemNo
//   "noSelectTitle", // itemTitle
//   "Select item", // itemDescription
//   0, // itemBasePrice
//   0, // itemStainCost
//   0, // itemPaintCost
//   0, // sizeCost
//   [], // sizes
//   { x: 0, y: 1, z: 0 }, // positionA
//   { x: 0, y: 2, z: 0 }, // positionB
//   [0],
// );

// const gramps = new Item(
//   "gramps", // itemName
//   0, // itemNo
//   "GRAMPS", // itemTitle
//   "Handmade stool", // itemDescription
//   750, // itemBasePrice
//   150, // itemStainCost
//   0, // itemPaintCost
//   0, // sizeCost
//   grampSizes, // sizes
//   grampsPosition[0], // positionA
//   grampsPosition[1], // positionB
//   [0, 1, 2, 3, 4, 5, 6],
// );

// const squatter = new Item(
//   "squatter", // itemName
//   1, // itemNo
//   "SQUATTER", // itemTitle
//   "Handmade end table", // itemDescription
//   600, // itemBasePrice
//   100, // itemStainCost
//   0, // itemPaintCost
//   0, // sizeCost
//   squatterSizes, // sizes
//   squatterPosition[0], // positionA
//   squatterPosition[1], // positionB
//   [0, 1, 2, 3],
// );

// const block = new Item(
//   "block", // itemName
//   2, // itemNo
//   "BLOCK", // itemTitle
//   "Handmade room block", // itemDescription
//   250, // itemBasePrice
//   150, // itemStainCost
//   0, // itemPaintCost
//   0, // sizeCost
//   blockSizes, // sizes
//   blockPosition[0], // positionA
//   blockPosition[1], // positionB
//   [0, 1, 2, 3, 4],
// );

// const horse = new Item(
//   "horse", // itemName
//   3, // itemNo
//   "HORSE", // itemTitle
//   "Handmade saw horse", // itemDescription
//   400, // itemBasePrice
//   100, // itemStainCost
//   0, // itemPaintCost
//   0, // sizeCost
//   horseSizes, // sizes
//   horsePosition[0], // positionA
//   horsePosition[1], // positionB
//   [0, 1, 2, 3, 4, 5],
// );

// const shelfA = new Item(
//   "shelfA", // itemName
//   4, // itemNo
//   `\\SHELF/`, // itemTitle
//   "Handmade angle shelf", // itemDescription
//   350, // itemBasePrice
//   50, // itemStainCost
//   0, // itemPaintCost
//   200, // sizeCost
//   shelfASizes, // sizes
//   shelfAPosition[0], // positionA
//   shelfAPosition[1],
//   [0, 1],
// );

// const shelfB = new Item(
//   "shelfB", // itemName
//   5, // itemNo
//   "(SHELF)", // itemTitle
//   "Handmade block shelf", // itemDescription
//   350, // itemBasePrice
//   50, // itemStainCost
//   0, // itemPaintCost
//   200, // sizeCost
//   shelfBSizes, // sizes
//   shelfBPosition[0], // positionA
//   shelfBPosition[1], // positionB
//   [0, 1],
// );

// const shopItems = [gramps, squatter, block, horse, shelfA, shelfB];
// const stainsList = ["white", "natural", "black", "allBlack"];
// const paintsList = ["alabaster", "pink", "basil", "yellow", "blue", "gray"];
