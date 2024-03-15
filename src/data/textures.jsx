import * as THREE from "three";

export const textures = {
  noSelectWhite: new THREE.Color(0xffffff),
  concreteFloor: new THREE.Color(0x909090),

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

  paintedTexture: [
    "./textures/MetalSteelBrushed001/CeramicPlainWhite001_COL_2K.jpg",
    "./textures/MetalSteelBrushed001/MetalSteelBrushed001_NRM_2K_METALNESS.png",
    "./textures/MetalSteelBrushed001/MetalSteelBrushed001_ROUGHNESS_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
  ],

  woodFloorTexture: [
    "./textures/Wood_Floor_kilwcuham_2k/Wood_Floor_kilwcuham_2k_Albedo.jpg",
    "./textures/Wood_Floor_kilwcuham_2k/Wood_Floor_kilwcuham_2k_Displacement.jpg",
    "./textures/Wood_Floor_kilwcuham_2k/Wood_Floor_kilwcuham_2k_Normal.jpg",
    "./textures/Wood_Floor_kilwcuham_2k/Wood_Floor_kilwcuham_2k_Roughness_inverted.jpg",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./textures/Wood_Floor_kilwcuham_2k/Wood_Floor_kilwcuham_2k_AmbientOcclusion.jpg",
  ],

  portlandConcreteTexture: [
    "./textures/Grey_Portland_Concrete_zghgprrtc_2k/Grey_Portland_Concrete_zghgprrtc_2k_Albedo_desaturated.jpg",
    "./textures/Grey_Portland_Concrete_zghgprrtc_2k/Grey_Portland_Concrete_zghgprrtc_2k_Displacement.jpg",
    "./textures/Grey_Portland_Concrete_zghgprrtc_2k/Grey_Portland_Concrete_zghgprrtc_2k_Normal.jpg",
    "./textures/Grey_Portland_Concrete_zghgprrtc_2k/Grey_Portland_Concrete_zghgprrtc_2k_Roughness.jpg",
    "./textures/Grey_Portland_Concrete_zghgprrtc_2k/ConcretePoured001_METALNESS_2K_METALNESS.png",
    "./textures/Grey_Portland_Concrete_zghgprrtc_2k/Grey_Portland_Concrete_zghgprrtc_2k_AmbientOcclusion.jpg",
  ],

  whiteTexture: [
    // poliigon free veneer white oak texture
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png",
    // "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    // "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ],

  naturalTexture: [
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png",
    // "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    // "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ],

  blackTexture: [
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png",
    // "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    // "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ],

  allBlackTexture: [
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png",
    // "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
    // "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  ],

  // concreteTexture: [
  //   "./ConcretePoured001/ConcretePoured001_COL_2K_METALNESS.png",
  //   // "./ConcretePoured001/ConcretePoured001_DISP_2K_METALNESS.png",
  //   "./ConcretePoured001/ConcretePoured001_NRM_2K_METALNESS.png",
  //   "./ConcretePoured001/ConcretePoured001_METALNESS_2K_METALNESS.png",
  //   "./ConcretePoured001/ConcretePoured001_ROUGHNESS_2K_METALNESS.png",
  //   // "./ConcretePoured001/ConcretePoured001_AO_2K_METALNESS_AO_2K_METALNESS.png",
  // ],
};
