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

  smoothPlasticTexture: [
    "./textures/Soft_Plastic_dixkqklcl_2k/Soft_Plastic_dixkqklcl_2k_Albedo.jpg",
    "./textures/Soft_Plastic_dixkqklcl_2k/Soft_Plastic_dixkqklcl_2k_Normal.jpg",
    "./textures/Soft_Plastic_dixkqklcl_2k/Soft_Plastic_dixkqklcl_2k_Roughness.jpg",
    "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
  ],

  smoothStoneTexture: [
    "./textures/Super_White_Homogenueous_Serana_Stone_zwtuvgxff_2k/Super_White_Homogenueous_Serana_Stone_zwtuvgxff_2k_Albedo.jpg",
    "./textures/Super_White_Homogenueous_Serana_Stone_zwtuvgxff_2k/Super_White_Homogenueous_Serana_Stone_zwtuvgxff_2k_Normal.jpg",
    "./textures/Super_White_Homogenueous_Serana_Stone_zwtuvgxff_2k/Super_White_Homogenueous_Serana_Stone_zwtuvgxff_2k_Roughness.jpg",
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

  concreteTexture: [
    "./textures/Grey_Portland_Concrete_zghgprrtc_2k/Grey_Portland_Concrete_zghgprrtc_2k_Albedo_desaturated.jpg",
    "./textures/Grey_Portland_Concrete_zghgprrtc_2k/Grey_Portland_Concrete_zghgprrtc_2k_Displacement.jpg",
    "./textures/Grey_Portland_Concrete_zghgprrtc_2k/Grey_Portland_Concrete_zghgprrtc_2k_Normal.jpg",
    "./textures/Grey_Portland_Concrete_zghgprrtc_2k/Grey_Portland_Concrete_zghgprrtc_2k_Roughness.jpg",
    "./textures/Grey_Portland_Concrete_zghgprrtc_2k/ConcretePoured001_METALNESS_2K_METALNESS.png",
    "./textures/Grey_Portland_Concrete_zghgprrtc_2k/Grey_Portland_Concrete_zghgprrtc_2k_AmbientOcclusion.jpg",
  ],

  smoothMetalTexture: [
    // submarine metal smooth texture - replace with something more homogenous, this one has scratches
    "./textures/SmoothMetal030/Metal030_1K_Color_desaturated.jpg",
    "./textures/SmoothMetal030/Metal030_1K_NormalGL.jpg",
    "./textures/SmoothMetal030/Metal030_1K_Roughness.jpg",
    "./textures/SmoothMetal030/Metal030_1K_Metalness.jpg",
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

  // paintTexture: [
  //   "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS.png", // "./VeneerWhiteOakRandomMatched001/CeramicPlainWhite001_COL_2K.jpg",  //"./VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_COL_2K_METALNESS_DESAT.png", //
  //   // "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_DISP_2K_METALNESS.png",
  //   "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_NRM_2K_METALNESS.png",
  //   "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_METALNESS_2K_METALNESS.png",
  //   "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_ROUGHNESS_2K_METALNESS.png",
  //   // "./textures/VeneerWhiteOakRandomMatched001/VeneerWhiteOakRandomMatched001_AO_2K_METALNESS.png",
  // ],

  // concreteTexture: [
  //   "./ConcretePoured001/ConcretePoured001_COL_2K_METALNESS.png",
  //   // "./ConcretePoured001/ConcretePoured001_DISP_2K_METALNESS.png",
  //   "./ConcretePoured001/ConcretePoured001_NRM_2K_METALNESS.png",
  //   "./ConcretePoured001/ConcretePoured001_METALNESS_2K_METALNESS.png",
  //   "./ConcretePoured001/ConcretePoured001_ROUGHNESS_2K_METALNESS.png",
  //   // "./ConcretePoured001/ConcretePoured001_AO_2K_METALNESS_AO_2K_METALNESS.png",
  // ],
};
