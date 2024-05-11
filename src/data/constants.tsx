// constants

// App
// toast constants
export const TOAST = {
  duration: 10000,
  fontSize: "0.9rem",
  background: "lightGrey",
  color: "#212121",
};

// Lights
// directional light constants
export const LIGHT = {
  dirLightXPosition: 2.5,
  dirLightYPosition: 3.6,
  dirLightZPosition: -3,
  dirLightIntensity: 1.5,
  dirLightNormBias: 0.04,
  dirLightMapSize: 512,
  dirLightCamNear: -5,
  dirLightCamFar: 8,
  dirLightCamLeft: -5,
  dirLightCamRight: 5,
  dirLightCamBottom: -5,
  dirLightCamTop: 5,
  ambLightIntensity: 1,
};

// Orbit controls
// polar angle min/max limits
export const ORBIT_CONTROLS = {
  orbitPolarShowBgdShelf: Math.PI / 2 + Math.PI / 16,
  orbitPolarShowBgdNotShelf: Math.PI / 2 - Math.PI / 7.25,
};

// Arrow icon
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

// OptionBox
// option box position (Y) constants
export const OPTION_BOX_POS_Y = {
  boxPosYMobileMax: 14,
  boxPosYMobileMin: 10.15,

  boxPosYDesktopMax: 4,
  boxPosYDesktopMin: 1,

  tinyScreenOffsetMinimized: 3.5,
  tinyScreenOffsetNotMinimized: 4.25,

  breakpointWidthSmallest: 380,
};
