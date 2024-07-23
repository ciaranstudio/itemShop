// constants

// experience
// loaded magic number (total items to load before 3d scene is loaded)
export const LOADED = {
  nearTotal: 140,
  total: 146,
};
// toast constants
export const TOAST = {
  duration: 10000,
  fontSize: "0.9rem",
  background: "lightGrey",
  color: "#212121",
};

// lights
// directional light constants
export const LIGHT = {
  dirLightXPosition: 2.5,
  dirLightYPosition: 3.6,
  dirLightZPosition: -3,
  dirLightIntensity: 2.75, // 1.5
  dirLightNormBias: 0.04,
  dirLightMapSize: 512,
  dirLightCamNear: -5,
  dirLightCamFar: 8,
  dirLightCamLeft: -5,
  dirLightCamRight: 5,
  dirLightCamBottom: -5,
  dirLightCamTop: 5,
  ambLightIntensity: 0.35, // 1
  pointLightIntensity: 0.75,
};

// orbit controls
// polar angle min/max limits
export const ORBIT_CONTROLS = {
  orbitPolarShowBgdShelf: Math.PI / 2 + Math.PI / 16,
  orbitPolarShowBgdNotShelf: Math.PI / 2 - Math.PI / 7.25,
};

// arrow icon
// carrot arrow shaped icon bottom center (UI element)
export const ARROW_ICON = {
  arrowY: -0.3,
};

// GSAP
// animation of camera target (orbit controls)
export const CAM_TARG_ANIM = {
  camTargAnimDelay: 0.1,
  camTargAnimDuration: 0.75,
};

// animation of camera position (orbit controls)
export const CAM_POS_ANIM = {
  camPosAnimDelay: 0.175,
  camPosAnimDuration: 1.85,
};

// animation of stage position Y
// (up and down)
export const STAGE_POSITION_Y_ANIM = {
  yPosRunHighTarg: 0.015,
  yPosRunLowTarg: -0.075,
  stagePosYRunTarget: 0.015,
  stagePosYReturnTarget: -0.075,
  dropDelay: 0.15,
  dropDuration: 0.75,
  raiseDelay: 0.15,
  raiseDuration: 0.75,
};

// parts animation
// distance of parts from origin position
// (opening and closing exploding view)
export const ITEM_PARTS_ANIM = {
  animDistRunTarget: 0.15,
  animDistReturnTarget: 0,
  runDelay: 1.2,
  runDuration: 0.9,
  returnDelay: 0.15,
  returnDuration: 0.9,
};

// optionBox
// option box position (Y) constants
export const OPTION_BOX = {
  verticalPositionMobile: 8,
  verticalPositionDesktop: 4,
};

// router
// pages for AppBar navigation list
export const PAGES = [
  { navTitle: "HOME", menuItem: "home" },
  { navTitle: "SHOP", menuItem: "shop" },
  { navTitle: "CUSTOM WORK", menuItem: "custom" },
  { navTitle: "ARTWORK", menuItem: "artwork" },
  { navTitle: "ABOUT", menuItem: "about" },
  { navTitle: "CONTACT", menuItem: "contact" },
];

// about route/page shop description information
export const ABOUT_TEXT = [
  {
    id: 0,
    textA: `This shop is meant to be an experimental and collaborative space. My designs are conceptually playful but functional and accessible.`,
    textB: `Each piece is a unique artwork designed with utility and versatility in mind.`,
  },
  {
    id: 1,
    textA: `This deliberately humble furniture line is available in fully interchangeable, customizable paints and finishes.`,
    textB: `Every design is built to last and made by hand at my studio in Cleveland, OH.`,
  },
  {
    id: 2,
    textA: `I use locally sawn white and red oak finished with hardwax oil for stained components. Painted components are made from poplar and MDO coated with vegan milk paint.`,
    textB: `We\’re a small family-run operation and everything is made to order. Customers can expect lead times of 6-8 weeks for most orders.`,
  },
  {
    id: 3,
    textA: `We communicate at each stage of the process from design to production to shipping.`,
    textB: `We work with care and precision, but value character over perfection.`,
  },
  {
    id: 4,
    textA: `Feel free to reach out to me with any questions, inquiries or ideas. I\’m always happy to discuss custom design work.`,
    textB: `My team also provides custom wood working, finish carpentry, cabinetry, painting, art handling and consultation services for the greater Cleveland, OH area.`,
  },
];
