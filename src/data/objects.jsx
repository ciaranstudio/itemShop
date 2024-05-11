import Item from "./item/Item.jsx";
import Part from "./item/Part.jsx";

export const objects = {
  gramps: new Item(
    0,
    "gramps",
    "GRAMPS",
    "Shop stool",
    "A sturdy shop stool that I designed as a tribute to my late grandfather. I made the first edition of these using inherited lumber that Gramps had milled from trees on family properties. A nice place to sit and think, suitable for working and remembering.",
    750, // painted single color
    150, // stained single color additional cost
    50, // mixed paint color additional cost
    150, // mixed stain color additional cost
    "16 x 16 x 18 in.", // L x D x H
    { x: 0, y: 0, z: 1.75 }, // { x: 0, y: 0, z: 70 },
    [
      new Part(
        "gramps",
        "top",
        "top",
        "posY2",
        "./models/grampsModels/grampsTop.gltf",
      ),
      new Part(
        "gramps",
        "barBottom",
        "bottom bar",
        "none",
        "./models/grampsModels/grampsBarBottom.gltf",
      ),
      new Part(
        "gramps",
        "barTop",
        "top bar",
        "posY1",
        "./models/grampsModels/grampsBarTop.gltf",
      ),
      new Part(
        "gramps",
        "leg1",
        "leg 1",
        "posZ",
        "./models/grampsModels/grampsLeg1.gltf",
      ),
      new Part(
        "gramps",
        "leg2",
        "leg 2",
        "posX",
        "./models/grampsModels/grampsLeg2.gltf",
      ),
      new Part(
        "gramps",
        "leg3",
        "leg 3",
        "negZ",
        "./models/grampsModels/grampsLeg3.gltf",
      ),
      new Part(
        "gramps",
        "leg4",
        "leg 4",
        "negX",
        "./models/grampsModels/grampsLeg4.gltf",
      ),
    ],
    [
      {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
      },
      {
        label: "Bird",
        imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
      },
      {
        label: "Bali, Indonesia",
        imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      },
      {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
      },
      {
        label: "Bird",
        imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
      },
      {
        label: "Bali, Indonesia",
        imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      },
    ],
  ),
  squatter: new Item(
    1,
    "squatter",
    "SQUATTER",
    "Low stool/end table",
    "This was one of my first furniture designs, meant to embody function, beauty and simplicity. It can be used as a low stool or end table, and has a compact footprint for easy storage. A solid spot to lace up your boots.",
    600, // painted single color
    100, // stained single color
    50,
    100,
    "16 x 12 x 16 in.", // L x D x H
    { x: -1.75, y: 0, z: 0 },
    [
      new Part(
        "squatter",
        "top",
        "top",
        "posY1",
        "./models/squatterModels/squatterTop.gltf",
      ),
      new Part(
        "squatter",
        "centerPanel",
        "center panel",
        "none",
        "./models/squatterModels/squatterCenterPanel.gltf",
      ),
      new Part(
        "squatter",
        "side1",
        "side 1",
        "posZ",
        "./models/squatterModels/squatterSide1.gltf",
      ),
      new Part(
        "squatter",
        "side2",
        "side 2",
        "negZ",
        "./models/squatterModels/squatterSide2.gltf",
      ),
    ],
    [
      {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
      },
      {
        label: "Bird",
        imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
      },
      {
        label: "Bali, Indonesia",
        imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      },
      {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
      },
      {
        label: "Bird",
        imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
      },
      {
        label: "Bali, Indonesia",
        imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      },
    ],
  ),
  block: new Item(
    2,
    "block",
    "BLOCK",
    "Wooden “cinderblock”",
    "I made my first “cinderblocks” for my exhibition “/X”. Based on the dimensions of a standard CMU (concrete masonry unit) these wooden blocks can be stacked horizontally and/or vertically.",
    250, // painted single color
    150, // stained single color
    50,
    150,
    "8 x 8 x 16 in.", // L x D x H
    { x: 0, y: 0, z: -1.75 }, // { x: 0, y: 0, z: -70 },
    [
      new Part(
        "block",
        "shelfTop",
        "top shelf",
        "none",
        "./models/blockModels/blockShelfTop.gltf",
      ),
      new Part(
        "block",
        "shelfMiddle",
        "middle shelf",
        "none",
        "./models/blockModels/blockShelfMiddle.gltf",
      ),
      new Part(
        "block",
        "shelfBottom",
        "bottom shelf",
        "none",
        "./models/blockModels/blockShelfBottom.gltf",
      ),
      new Part(
        "block",
        "side1",
        "side 1",
        "negX",
        "./models/blockModels/blockSide1.gltf",
      ),
      new Part(
        "block",
        "side2",
        "side 2",
        "posX",
        "./models/blockModels/blockSide2.gltf",
      ),
    ],
    [
      {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
      },
      {
        label: "Bird",
        imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
      },
      {
        label: "Bali, Indonesia",
        imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      },
      {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
      },
      {
        label: "Bird",
        imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
      },
      {
        label: "Bali, Indonesia",
        imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      },
    ],
  ),
  horse: new Item(
    3,
    "horse",
    "HORSE",
    "Furniture-grade sawhorse (flat pack)",
    "Originally featured in my exhibition “/X”, the sawhorse form is a universal symbol of functionality. This furniture grade version comes flat packed and is assembled with allen head screws.",
    400,
    100,
    50,
    100,
    "32 x 20 x 32 in.", // L x D x H
    { x: 1.75, y: 0, z: 0 }, // { x: 70, y: 0, z: 0 },
    [
      new Part(
        "horse",
        "top",
        "top",
        "posY1",
        "./models/horseModels/horseBarTop.gltf",
      ),
      new Part(
        "horse",
        "barInner",
        "inner bar",
        "none",
        "./models/horseModels/horseBarInner.gltf",
      ),
      new Part(
        "horse",
        "leg1",
        "leg 1",
        "negZ",
        "./models/horseModels/horseLeg1.gltf",
      ),
      new Part(
        "horse",
        "leg2",
        "leg 2",
        "negZ",
        "./models/horseModels/horseLeg2.gltf",
      ),
      new Part(
        "horse",
        "leg3",
        "leg 3",
        "posZ",
        "./models/horseModels/horseLeg3.gltf",
      ),
      new Part(
        "horse",
        "leg4",
        "leg 4",
        "posZ",
        "./models/horseModels/horseLeg4.gltf",
      ),
    ],
    [
      {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
      },
      {
        label: "Bird",
        imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
      },
      {
        label: "Bali, Indonesia",
        imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      },
      {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
      },
      {
        label: "Bird",
        imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
      },
      {
        label: "Bali, Indonesia",
        imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      },
    ],
  ),
  shelfA16: new Item(
    4,
    "shelfA16",
    "\\SHELF/ 16",
    "Floating shelf with crown profile",
    "I designed these floating shelves to display artwork, pictures and nick-nacks. The two simple profile options are intended to complement both traditional and contemporary millwork. Available in two stock sizes and profiles (custom dimensions available by request). Includes hanging cleat.",
    350,
    50,
    50,
    50,
    "16 x 4 x 4 in.", // L x D x H
    { x: -3, y: 0, z: -2.08 }, // { x: -118.3125, y: 0, z: -81.125 },
    [
      new Part(
        "shelfA16",
        "top",
        "top",
        "posXposY1",
        "./models/shelfA16Models/shelfA16Top.gltf",
      ),
      new Part(
        "shelfA16",
        "bottom",
        "bottom",
        "posXposY1",
        "./models/shelfA16Models/shelfA16Bottom.gltf",
      ),
      new Part(
        "shelfA16",
        "cleat",
        "cleat",
        "none",
        "./models/shelfA16Models/shelfA16Cleat.gltf",
      ),
    ],
    [
      {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
      },
      {
        label: "Bird",
        imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
      },
      {
        label: "Bali, Indonesia",
        imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      },
      {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
      },
      {
        label: "Bird",
        imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
      },
      {
        label: "Bali, Indonesia",
        imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      },
    ],
  ),
  shelfA32: new Item(
    5,
    "shelfA32",
    "\\SHELF/ 32",
    "Floating shelf with crown profile",
    "I designed these floating shelves to display artwork, pictures and nick-nacks. The two simple profile options are intended to complement both traditional and contemporary millwork. Available in two stock sizes and profiles (custom dimensions available by request). Includes hanging cleat.",
    550, // painted single color
    50, // stained single color
    50,
    50,
    "32 x 4 x 4 in.", // L x D x H
    { x: -3, y: 0, z: -1.0625 }, //  { x: -118.3125, y: 0, z: -40.6 },
    [
      new Part(
        "shelfA32",
        "top",
        "top",
        "posXposY1",
        "./models/shelfA32Models/shelfA32Top.gltf",
      ),
      new Part(
        "shelfA32",
        "bottom",
        "bottom",
        "posXposY1",
        "./models/shelfA32Models/shelfA32Bottom.gltf",
      ),
      new Part(
        "shelfA32",
        "cleat",
        "cleat",
        "none",
        "./models/shelfA32Models/shelfA32Cleat.gltf",
      ),
    ],
    [
      {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
      },
      {
        label: "Bird",
        imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
      },
      {
        label: "Bali, Indonesia",
        imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      },
      {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
      },
      {
        label: "Bird",
        imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
      },
      {
        label: "Bali, Indonesia",
        imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      },
    ],
  ),
  shelfB16: new Item(
    6,
    "shelfB16",
    "(SHELF) 16",
    "Floating shelf with rounded profile",
    "I designed these floating shelves to display artwork, pictures and nick-nacks. The two simple profile options are intended to complement both traditional and contemporary millwork. Available in two stock sizes and profiles (custom dimensions available by request). Includes hanging cleat.",
    350,
    50,
    50,
    50,
    "16 x 6 x 4 in.", // L x D x H
    { x: 0.86, y: 0, z: 3 }, //  { x: 33.685, y: 0, z: 118.25 },
    [
      new Part(
        "shelfB16",
        "top",
        "top",
        "negZposY1",
        "./models/shelfB16Models/shelfB16Top.gltf",
      ),
      new Part(
        "shelfB16",
        "middle",
        "middle",
        "negZposY1",
        "./models/shelfB16Models/shelfB16Middle.gltf",
      ),
      new Part(
        "shelfB16",
        "bottom",
        "bottom",
        "negZposY1",
        "./models/shelfB16Models/shelfB16Bottom.gltf",
      ),
      new Part(
        "shelfB16",
        "cleat",
        "cleat",
        "none",
        "./models/shelfB16Models/shelfB16Cleat.gltf",
      ),
    ],
    [
      {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
      },
      {
        label: "Bird",
        imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
      },
      {
        label: "Bali, Indonesia",
        imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      },
      {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
      },
      {
        label: "Bird",
        imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
      },
      {
        label: "Bali, Indonesia",
        imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      },
    ],
  ),
  shelfB32: new Item(
    7,
    "shelfB32",
    "(SHELF) 32",
    "Floating shelf with rounded profile",
    "I designed these floating shelves to display artwork, pictures and nick-nacks. The two simple profile options are intended to complement both traditional and contemporary millwork. Available in two stock sizes and profiles (custom dimensions available by request). Includes hanging cleat.",
    550,
    50,
    50,
    50,
    "32 x 6 x 4 in.", // L x D x H
    { x: 1.8775, y: 0, z: 3 }, // { x: 73.685, y: 0, z: 118.25 },
    [
      new Part(
        "shelfB32",
        "top",
        "top",
        "negZposY1",
        "./models/shelfB32Models/shelfB32Top.gltf",
      ),
      new Part(
        "shelfB32",
        "middle",
        "middle",
        "negZposY1",
        "./models/shelfB32Models/shelfB32Middle.gltf",
      ),
      new Part(
        "shelfB32",
        "bottom",
        "bottom",
        "negZposY1",
        "./models/shelfB32Models/shelfB32Bottom.gltf",
      ),
      new Part(
        "shelfB32",
        "cleat",
        "cleat",
        "none",
        "./models/shelfB32Models/shelfB32Cleat.gltf",
      ),
    ],
    [
      {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
      },
      {
        label: "Bird",
        imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
      },
      {
        label: "Bali, Indonesia",
        imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      },
      {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
      },
      {
        label: "Bird",
        imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
      },
      {
        label: "Bali, Indonesia",
        imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      },
    ],
  ),
};

export const unselectedItem = new Item(
  "", // itemNo
  "noSelect", // itemName
  "noSelectTitle", // itemTitle
  "Select item", // itemDescription
  "Select item",
  0, // itemBasePrice
  0, // itemStainCost
  0, // itemMixedPaintCost
  0, // itemMixedStainCost
  [], // size
  { x: 0, y: 0, z: 0 }, // position
  [new Part("", "", "", "", "")], // parts
  [
    {
      label: "San Francisco – Oakland Bay Bridge, United States",
      imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
    },
    {
      label: "Bird",
      imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
    },
    {
      label: "Bali, Indonesia",
      imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    },
    {
      label: "San Francisco – Oakland Bay Bridge, United States",
      imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
    },
    {
      label: "Bird",
      imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
    },
    {
      label: "Bali, Indonesia",
      imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    },
  ],
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

export const allImages = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
  },
  {
    label: "Bird",
    imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
  },
  {
    label: "Bali, Indonesia",
    imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
  },
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
  },
  {
    label: "Bird",
    imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7",
  },
  {
    label: "Bali, Indonesia",
    imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
  },
];
