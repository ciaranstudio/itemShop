import * as THREE from "three";

export const textures = {
  noSelectWhite: new THREE.Color(0xffffff),
  concreteFloor: new THREE.Color(0x909090),
  blueTape: new THREE.Color(0x5580b0), // 0x006ed2 blue tape color grab from photo
  brownBag: new THREE.Color(0x957c5f), // 0xd7a87b brown uline paper bag color grab from photo

  whiteStain: new THREE.Color(0xa9a9a9),
  naturalStain: new THREE.Color(0x989898),
  blackStain: new THREE.Color(0x787878),
  allBlackStain: new THREE.Color(0x787878),

  alabasterPaint: new THREE.Color(0xfffdf0),
  pinkPaint: new THREE.Color(0xf2d1c6),
  basilPaint: new THREE.Color(0x929d84),
  yellowPaint: new THREE.Color(0xf2d684),
  bluePaint: new THREE.Color(0x96b0aa),
  grayPaint: new THREE.Color(0x8c8b81),

  paintedTexture: [
    "./textures/MetalSteelBrushed001/CeramicPlainWhite001_COL_2K.jpg",
    // "./textures/MetalSteelBrushed001/MetalSteelBrushed001_DISP_2K_METALNESS.png",
    "./textures/MetalSteelBrushed001/MetalSteelBrushed001_NRM_2K_METALNESS.png",
    "./textures/MetalSteelBrushed001/MetalSteelBrushed001_ROUGHNESS_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    // "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ],

  woodFloorAshWhiteTexture: [
    "./textures/WoodFlooringAshSuperWhite001/WoodFlooringAshSuperWhite001_COL_2K.jpg",
    "./textures/WoodFlooringAshSuperWhite001/WoodFlooringAshSuperWhite001_DISP_2K.jpg",
    "./textures/WoodFlooringAshSuperWhite001/WoodFlooringAshSuperWhite001_NRM_2K.png",
    "./textures/WoodFlooringAshSuperWhite001/WoodFlooringAshSuperWhite001_GLOSS_2K_inverted.jpg",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    "./textures/WoodFlooringAshSuperWhite001/WoodFlooringAshSuperWhite001_AO_2K.jpg",
  ],

  woodFloorWornPlanksTexture: [
    "./textures/WoodPlanksWorn001/WoodPlanksWorn001_COL_2K.jpg",
    "./textures/WoodPlanksWorn001/WoodPlanksWorn001_DISP_2K.jpg",
    "./textures/WoodPlanksWorn001/WoodPlanksWorn001_NRM_2K.jpg",
    "./textures/WoodPlanksWorn001/WoodPlanksWorn001_GLOSS_2K_inverted.jpg",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    "./textures/WoodPlanksWorn001/WoodPlanksWorn001_AO_2K.jpg",
  ],

  whiteTexture: [
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS_white4.png",
    // "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    // "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ],

  naturalTexture: [
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS_natural.png",
    // "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    // "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ],

  blackTexture: [
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS_black.png",
    // "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    // "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ],

  allBlackTexture: [
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS_allBlack.png",
    // "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    // "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ],
};
