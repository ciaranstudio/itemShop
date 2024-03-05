import * as THREE from "three";

export const textures = {
  floorStain: new THREE.Color(0xf4f4e6), // antique white hex from general finishes paint

  whiteStain: new THREE.Color(0xc0c0c0),
  naturalStain: new THREE.Color(0x989898),
  blackStain: new THREE.Color(0x696969),
  allBlackStain: new THREE.Color(0x202020),

  alabasterPaint: new THREE.Color(0xfffdf0),
  pinkPaint: new THREE.Color(0xf2d1c6),
  basilPaint: new THREE.Color(0x929d84),
  yellowPaint: new THREE.Color(0xf2d684),
  bluePaint: new THREE.Color(0x96b0aa),
  grayPaint: new THREE.Color(0x8c8b81),

  whiteTexture: [
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png",
    // "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    // "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ],

  naturalTexture: [
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png",
    // "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    // "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ],

  blackTexture: [
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png",
    // "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    // "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ],

  allBlackTexture: [
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png",
    // "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    // "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ],

  // replace with same base texture for all paint finishes, paint will be opaque, just needs to have clean paint sheen with slight recessed grain shadows
  paintTexture: [
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png",
    // "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    // "./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ],

  concreteTexture: [
    "./ConcretePoured001/ConcretePoured001_COL_2K_METALNESS.png",
    // "./ConcretePoured001/ConcretePoured001_DISP_2K_METALNESS.png",
    "./ConcretePoured001/ConcretePoured001_NRM_2K_METALNESS.png",
    "./ConcretePoured001/ConcretePoured001_METALNESS_2K_METALNESS.png",
    "./ConcretePoured001/ConcretePoured001_ROUGHNESS_2K_METALNESS.png",
    // "./ConcretePoured001/ConcretePoured001_AO_2K_METALNESS_AO_2K_METALNESS.png",
  ],
};
