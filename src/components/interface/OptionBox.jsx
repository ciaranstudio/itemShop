import React, { useState } from "react";
import { Html } from "@react-three/drei";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { objects, shopItems } from "../../data/objects.jsx";
import { options, allOptions } from "../../data/options.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FilterOutlinedIcon from "@mui/icons-material/FilterOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import BuyButton from "./BuyButton.jsx";
import SplitButton from "./SplitButton.jsx";
import useWindowDimensions from "../../hooks/useWindowDimensions.jsx";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import toast from "react-hot-toast";
import { OPTION_BOX_POS_Y } from "../../data/constants.tsx";
import OptionsOnly from "./OptionsOnly.jsx";

export default function OptionBox({
  handlePartOption,
  toggleInfoBox,
  togglePhotoBox,
  theme,
}) {
  // helper hook
  const { height, width } = useWindowDimensions();

  // useState
  const [mobilePosYMax, setMobilePosYMax] = useState(
    OPTION_BOX_POS_Y.boxPosYMobileMax,
  );
  const [mobilePosYMin, setMobilePosYMin] = useState(
    OPTION_BOX_POS_Y.boxPosYMobileMin,
  );
  const [desktopPosYMax, setDesktopPosYMax] = useState(
    OPTION_BOX_POS_Y.boxPosYDesktopMax,
  );
  const [desktopPosYMin, setDesktopPosYMin] = useState(
    OPTION_BOX_POS_Y.boxPosYDesktopMin,
  );
  const [stainSingle, setStainSingle] = useState("");
  const [paintSingle, setPaintSingle] = useState("");

  // state from store
  const currentItemSelected = useOptionStore(
    (state) => state.currentItemSelected,
  );
  const currentPartName = useOptionStore((state) => state.currentPartName);
  const currentItemName = useOptionStore((state) => state.currentItemName);
  const mobileView = useOptionStore((state) => state.mobileView);
  const optionBoxHeightMin = useOptionStore(
    (state) => state.optionBoxHeightMin,
  );
  const showBackground = useOptionStore((state) => state.showBackground);
  const showPartOptions = useOptionStore((state) => state.showPartOptions);
  const optionBoxItemToggle = useOptionStore(
    (state) => state.optionBoxItemToggle,
  );
  const animActive = useOptionStore((state) => state.animActive);
  const activeCamAnim = useOptionStore((state) => state.activeCamAnim);
  const thisPartColorName = useOptionStore(
    (state) => state.items[currentItemName].parts[currentPartName].colorName,
  );
  const animateButton = useOptionStore((state) => state.animateButton);
  const setAnimateButton = useOptionStore((state) => state.setAnimateButton);

  // actions from store
  const setCurrentItemSelected = useOptionStore(
    (state) => state.setCurrentItemSelected,
  );
  const setPreviousItemSelected = useOptionStore(
    (state) => state.setPreviousItemSelected,
  );
  const setCurrentPartName = useOptionStore(
    (state) => state.setCurrentPartName,
  );
  const setCurrentItemName = useOptionStore(
    (state) => state.setCurrentItemName,
  );
  const setOptionBoxHeightMin = useOptionStore(
    (state) => state.setOptionBoxHeightMin,
  );
  const setShowBackground = useOptionStore((state) => state.setShowBackground);
  const setShowPartOptions = useOptionStore(
    (state) => state.setShowPartOptions,
  );
  const setOptionBoxItemChanged = useOptionStore(
    (state) => state.setOptionBoxItemChanged,
  );
  const setOptionBoxItemToggle = useOptionStore(
    (state) => state.setOptionBoxItemToggle,
  );
  const setAnimIconToggle = useOptionStore((state) => state.setAnimIconToggle);
  const getRandomInt = useOptionStore((state) => state.getRandomInt);

  // functions
  const toggleOptionBoxHeight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOptionBoxHeightMin(!optionBoxHeightMin);
  };
  const toggleAnimateParts = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimIconToggle(true);
    setAnimateButton(!animateButton);
  };
  const randomCurrentItemParts = (e, currentItemName, type) => {
    e.preventDefault();
    let color = "";
    let tempStainSingle = options.stains[getRandomInt(options.stains.length)];
    let tempPaintSingle = options.paints[getRandomInt(options.paints.length)];
    while (tempStainSingle === stainSingle) {
      tempStainSingle = options.stains[getRandomInt(options.stains.length)];
    }
    setStainSingle(tempStainSingle);
    while (tempPaintSingle === paintSingle) {
      tempPaintSingle = options.paints[getRandomInt(options.paints.length)];
    }
    setPaintSingle(tempPaintSingle);
    let randomThisItemColors = objects[currentItemName].parts.map((part) => {
      if (type === "stainMixed") {
        color = options.stains[getRandomInt(options.stains.length)];
      } else if (type === "stainSingle") {
        color = tempStainSingle;
      } else if (type === "allMixed") {
        color = allOptions[getRandomInt(allOptions.length)];
      } else if (type === "paintMixed") {
        color = options.paints[getRandomInt(options.paints.length)];
      } else if (type === "paintSingle") {
        color = tempPaintSingle;
      }
      handlePartOption(e, currentItemName, part.partName, color, false);
      return color;
    });
    console.log("random colors generated list: ", randomThisItemColors);
  };
  const closePartOptions = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPartOptions(false);
  };
  const partShowBackground = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // if animation is active then disable
    if (!animActive && !showBackground) {
      setShowPartOptions(false);
      setShowBackground(true);
      toast.dismiss();
    }
  };
  const itemMenuSelectHandler = (e, itemNo, popupState) => {
    if (!activeCamAnim) {
      setOptionBoxItemChanged(true);
      setOptionBoxItemToggle(!optionBoxItemToggle);
      setCurrentItemName(shopItems[itemNo].itemName);
      setCurrentPartName(shopItems[itemNo].parts[0].partName);
      setPreviousItemSelected(currentItemSelected);
      setCurrentItemSelected(shopItems[itemNo]);
    }
    popupState.close();
  };

  return (
    <group position={[0, 0, 0]}>
      <OptionsOnly
        toggleInfoBox={toggleInfoBox}
        theme={theme}
        handlePartOption={handlePartOption}
        togglePhotoBox={togglePhotoBox}
      />
    </group>
  );
}
