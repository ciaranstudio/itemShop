import Item from "./Item.jsx";
import Part from "./Part.jsx";

export const objects = {
  gramps: new Item(
    0,
    "gramps",
    "GRAMPS",
    "Handmade stool",
    750, // painted single color
    150, // stained single color
    50,
    150,
    "16 x 16 x 18", // L x D x H
    { x: 0, y: 0, z: 70 },
    [
      new Part("top", "posY2", "./models/grampsModels/grampsTop.gltf"),
      new Part(
        "bar bottom",
        "none",
        "./models/grampsModels/grampsBarBottom.gltf",
      ),
      new Part("bar top", "posY1", "./models/grampsModels/grampsBarTop.gltf"),
      new Part("leg 1", "posZ", "./models/grampsModels/grampsLeg1.gltf"),
      new Part("leg 2", "negX", "./models/grampsModels/grampsLeg2.gltf"),
      new Part("leg 3", "negZ", "./models/grampsModels/grampsLeg3.gltf"),
      new Part("leg 4", "posX", "./models/grampsModels/grampsLeg4.gltf"),
    ],
  ),
  squatter: new Item(
    1,
    "squatter",
    "SQUATTER",
    "Handmade end table",
    600, // painted single color
    100, // stained single color
    50,
    100,
    "16 x 12 x 18", // L x D x H
    { x: -70, y: 0, z: 0 },
    [
      new Part("top", "posY1", "./models/squatterModels/squatterTop.gltf"),
      new Part(
        "center panel",
        "none",
        "./models/squatterModels/squatterCenterPanel.gltf",
      ),
      new Part("side 1", "posZ", "./models/squatterModels/squatterSide1.gltf"),
      new Part("side 2", "negZ", "./models/squatterModels/squatterSide2.gltf"),
    ],
  ),
  block: new Item(
    2,
    "block",
    "BLOCK",
    "Handmade room block",
    250, // painted single color
    150, // stained single color
    50,
    150,
    "8 x 8 x 16", // L x D x H
    { x: 0, y: 0, z: -70 },
    [
      new Part("shelves", "none", "./models/blockModels/blockShelves.gltf"),
      new Part("side 1", "posX", "./models/blockModels/blockSide1.gltf"),
      new Part("side 2", "negX", "./models/blockModels/blockSide2.gltf"),
    ],
  ),
  horse: new Item(
    3,
    "horse",
    "HORSE",
    "Handmade saw horse",
    400, // painted single color
    100, // stained single color
    50,
    100,
    "32 x 20 x 32", // L x D x H
    { x: 70, y: 0, z: 0 },
    [
      new Part("top", "posY1", "./models/horseModels/horseBarTop.gltf"),
      new Part("bar inner", "none", "./models/horseModels/horseBarInner.gltf"),
      new Part("leg 1", "posZ", "./models/horseModels/horseLeg1.gltf"),
      new Part("leg 2", "negX", "./models/horseModels/horseLeg2.gltf"),
      new Part("leg 3", "negZ", "./models/horseModels/horseLeg3.gltf"),
      new Part("leg 4", "posX", "./models/horseModels/horseLeg4.gltf"),
    ],
  ),
  shelfA16: new Item(
    4,
    "shelfA16",
    "\\SHELF/ 16",
    "Handmade angle shelf",
    350, // painted single color
    50, // stained single color
    50,
    50,
    "16 x 4 x 4", // L x D x H
    { x: -118.3125, y: 0, z: -81.125 },
    [
      new Part("shelf", "posX", "./models/shelfA16Models/shelfA16Shelf.gltf"),
      new Part("cleat", "none", "./models/shelfA16Models/shelfA16Cleat.gltf"),
    ],
  ),
  shelfA32: new Item(
    5,
    "shelfA32",
    "\\SHELF/ 32",
    "Handmade angle shelf",
    550, // painted single color
    50, // stained single color
    50,
    50,
    "32 x 4 x 4", // L x D x H
    { x: -118.3125, y: 0, z: -40.6 },
    [
      new Part("shelf", "posX", "./models/shelfA32Models/shelfA32Shelf.gltf"),
      new Part("cleat", "none", "./models/shelfA32Models/shelfA32Cleat.gltf"),
    ],
  ),
  shelfB16: new Item(
    6,
    "shelfB16",
    "(SHELF) 16",
    "Handmade block shelf",
    350, // painted single color
    50, // stained single color
    50,
    50,
    "16 x 4 x 4", // L x D x H
    { x: 33.685, y: 0, z: 118.25 },
    [
      new Part("shelf", "negZ", "./models/shelfB16Models/shelfB16Shelf.gltf"),
      new Part("cleat", "none", "./models/shelfB16Models/shelfB16Cleat.gltf"),
    ],
  ),
  shelfB32: new Item(
    7,
    "shelfB32",
    "(SHELF) 32",
    "Handmade block shelf",
    550, // painted single color
    50, // stained single color
    50,
    50,
    "32 x 4 x 4", // L x D x H
    { x: 73.685, y: 0, z: 118.25 },
    [
      new Part("shelf", "negZ", "./models/shelfB32Models/shelfB32Shelf.gltf"),
      new Part("cleat", "none", "./models/shelfB32Models/shelfB32Cleat.gltf"),
    ],
  ),
};

export const unselectedItem = new Item(
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
  [new Part("", "", "")], // parts
);

export const shopItems = [
  objects.gramps,
  objects.squatter,
  objects.block,
  objects.horse,
  objects.shelfA16,
  objects.shelfA32,
  objects.shelfB16,
  objects.shelfB32,
];

// previous objects data (before Item and Part integration)
// export const objects = {
//   gramps: {
//     itemNo: 0,
//     itemName: "gramps",
//     itemTitle: "GRAMPS",
//     itemDescription: "Handmade stool",
//     itemBasePrice: 750, // painted single color
//     itemStainCost: 150, // stained single color
//     itemMixedPaintCost: 50,
//     itemMixedStainCost: 150,
//     size: "16 x 16 x 18", // L x D x H
//     position: { x: 0, y: 0, z: 70 },
//     parts: [
//       {
//         partName: "top",
//         animation: "horizontal",
//         model: "./models/grampsModels/grampsTop.gltf",
//       },
//       {
//         partName: "bar bottom",
//         animation: "none",
//         model: "./models/grampsModels/grampsBarBottom.gltf",
//       },
//       {
//         partName: "bar top",
//         animation: "horizontal",
//         model: "./models/grampsModels/grampsBarTop.gltf",
//       },
//       {
//         partName: "leg 1",
//         animation: "vertical",
//         model: "./models/grampsModels/grampsLeg1.gltf",
//       },
//       {
//         partName: "leg 2",
//         animation: "vertical",
//         model: "./models/grampsModels/grampsLeg2.gltf",
//       },
//       {
//         partName: "leg 3",
//         animation: "vertical",
//         model: "./models/grampsModels/grampsLeg3.gltf",
//       },
//       {
//         partName: "leg 4",
//         animation: "vertical",
//         model: "./models/grampsModels/grampsLeg4.gltf",
//       },
//     ],
//   },
//   squatter: {
//     itemNo: 1,
//     itemName: "squatter",
//     itemTitle: "SQUATTER",
//     itemDescription: "Handmade end table",
//     itemBasePrice: 600, // painted single color
//     itemStainCost: 100, // stained single color
//     itemMixedPaintCost: 50,
//     itemMixedStainCost: 100,
//     size: "16 x 12 x 18", // L x D x H
//     position: { x: -70, y: 0, z: 0 },
//     parts: [
//       {
//         partName: "top",
//         animation: "horizontal",
//         model: "./models/squatterModels/squatterTop.gltf",
//       },
//       {
//         partName: "center panel",
//         animation: "none",
//         model: "./models/squatterModels/squatterCenterPanel.gltf",
//       },
//       {
//         partName: "side 1",
//         animation: "vertical",
//         model: "./models/squatterModels/squatterSide1.gltf",
//       },
//       {
//         partName: "side 2",
//         animation: "vertical",
//         model: "./models/squatterModels/squatterSide2.gltf",
//       },
//     ],
//   },
//   block: {
//     itemNo: 2,
//     itemName: "block",
//     itemTitle: "BLOCK",
//     itemDescription: "Handmade room block",
//     itemBasePrice: 250, // painted single color
//     itemStainCost: 150, // stained single color
//     itemMixedPaintCost: 50,
//     itemMixedStainCost: 150,
//     size: "8 x 8 x 16", // L x D x H
//     position: { x: 0, y: 0, z: -70 },
//     parts: [
//       {
//         partName: "shelves",
//         animation: "none",
//         model: "./models/blockModels/blockShelves.gltf",
//       },
//       {
//         partName: "side 1",
//         animation: "vertical",
//         model: "./models/blockModels/blockSide1.gltf",
//       },
//       {
//         partName: "side 2",
//         animation: "vertical",
//         model: "./models/blockModels/blockSide2.gltf",
//       },
//     ],
//   },
//   horse: {
//     itemNo: 3,
//     itemName: "horse",
//     itemTitle: "HORSE",
//     itemDescription: "Handmade saw horse",
//     itemBasePrice: 400, // painted single color
//     itemStainCost: 100, // stained single color
//     itemMixedPaintCost: 50,
//     itemMixedStainCost: 100,
//     size: "32 x 20 x 32", // L x D x H
//     position: { x: 70, y: 0, z: 0 },
//     parts: [
//       {
//         partName: "top",
//         animation: "horizontal",
//         model: "./models/horseModels/horseBarTop.gltf",
//       },
//       {
//         partName: "bar inner",
//         animation: "none",
//         model: "./models/horseModels/horseBarInner.gltf",
//       },
//       {
//         partName: "leg 1",
//         animation: "vertical",
//         model: "./models/horseModels/horseLeg1.gltf",
//       },
//       {
//         partName: "leg 2",
//         animation: "vertical",
//         model: "./models/horseModels/horseLeg2.gltf",
//       },
//       {
//         partName: "leg 3",
//         animation: "vertical",
//         model: "./models/horseModels/horseLeg3.gltf",
//       },
//       {
//         partName: "leg 4",
//         animation: "vertical",
//         model: "./models/horseModels/horseLeg4.gltf",
//       },
//     ],
//   },
//   shelfA16: {
//     itemNo: 4,
//     itemName: "shelfA",
//     itemTitle: "\\SHELF/ 16",
//     itemDescription: "Handmade angle shelf",
//     itemBasePrice: 350, // painted single color
//     itemStainCost: 50, // stained single color
//     itemMixedPaintCost: 50,
//     itemMixedStainCost: 50,
//     size: "16 x 4 x 4", // L x D x H
//     position: { x: -118.3125, y: 0, z: -81.125 },
//     parts: [
//       {
//         partName: "shelf",
//         animation: "vertical",
//         model: "./models/shelfA16Models/shelfA16Shelf.gltf",
//       },
//       {
//         partName: "cleat",
//         animation: "none",
//         model: "./models/shelfA16Models/shelfA16Cleat.gltf",
//       },
//     ],
//   },
//   shelfA32: {
//     itemNo: 5,
//     itemName: "shelfA",
//     itemTitle: "\\SHELF/ 32",
//     itemDescription: "Handmade angle shelf",
//     itemBasePrice: 550, // painted single color
//     itemStainCost: 50, // stained single color
//     itemMixedPaintCost: 50,
//     itemMixedStainCost: 50,
//     size: "32 x 4 x 4", // L x D x H
//     position: { x: -118.3125, y: 0, z: -40.6 },
//     parts: [
//       {
//         partName: "shelf",
//         animation: "vertical",
//         model: "./models/shelfA32Models/shelfA32Shelf.gltf",
//       },
//       {
//         partName: "cleat",
//         animation: "none",
//         model: "./models/shelfA32Models/shelfA32Cleat.gltf",
//       },
//     ],
//   },
//   shelfB16: {
//     itemNo: 6,
//     itemName: "shelfB",
//     itemTitle: "(SHELF) 16",
//     itemDescription: "Handmade block shelf",
//     itemBasePrice: 350, // painted single color
//     itemStainCost: 50, // stained single color
//     itemMixedPaintCost: 50,
//     itemMixedStainCost: 50,
//     size: "16 x 4 x 4", // L x D x H
//     position: { x: 33.685, y: 0, z: 118.25 },
//     parts: [
//       {
//         partName: "shelf",
//         animation: "vertical",
//         model: "./models/shelfB16Models/shelfB16Shelf.gltf",
//       },
//       {
//         partName: "cleat",
//         animation: "none",
//         model: "./models/shelfB16Models/shelfB16Cleat.gltf",
//       },
//     ],
//   },
//   shelfB32: {
//     itemNo: 7,
//     itemName: "shelfB",
//     itemTitle: "(SHELF) 32",
//     itemDescription: "Handmade block shelf",
//     itemBasePrice: 550, // painted single color
//     itemStainCost: 50, // stained single color
//     itemMixedPaintCost: 50,
//     itemMixedStainCost: 50,
//     size: "32 x 4 x 4", // L x D x H
//     position: { x: 73.685, y: 0, z: 118.25 },
//     parts: [
//       {
//         partName: "shelf",
//         animation: "vertical",
//         model: "./models/shelfB32Models/shelfB32Shelf.gltf",
//       },
//       {
//         partName: "cleat",
//         animation: "none",
//         model: "./models/shelfB32Models/shelfB32Cleat.gltf",
//       },
//     ],
//   },
// };
