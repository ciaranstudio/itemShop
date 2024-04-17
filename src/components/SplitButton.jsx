import { useRef, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
// import ShuffleOnIcon from "@mui/icons-material/ShuffleOn";
import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import { useOptionStore } from "../store/useOptionStore.tsx";

const options = ["Stain", "Stains", "All", "Paints", "Paint"];

export default function SplitButton({
  theme,
  // currentItemName,
  randomCurrentItemParts,
}) {
  // useStates
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(2);

  // const currentItemSelected = useOptionStore(
  //   (state) => state.currentItemSelected,
  // );
  // const setCurrentItemSelected = useOptionStore((state) => state.setCurrentItemSelected);

  // const previousItemSelected = useOptionStore(
  //   (state) => state.previousItemSelected,
  // );
  // const setPreviousItemSelected = useOptionStore((state) => state.setPreviousItemSelected);

  // const currentPartName = useOptionStore(
  //   (state) => state.currentPartName,
  // );
  // const setCurrentPartName = useOptionStore((state) => state.setCurrentPartName);

  const currentItemName = useOptionStore((state) => state.currentItemName);
  const setCurrentItemName = useOptionStore(
    (state) => state.setCurrentItemName,
  );

  // const mobileView = useOptionStore((state) => state.mobileView);
  // const setMobileView = useOptionStore((state) => state.setMobileView);

  // const open = useOptionStore((state) => state.open);
  // const setOpen = useOptionStore((state) => state.setOpen);

  // const showPhotos = useOptionStore((state) => state.showPhotos);
  // const setShowPhotos = useOptionStore((state) => state.setShowPhotos);

  // const allPhotos = useOptionStore((state) => state.allPhotos);
  // const setAllPhotos = useOptionStore((state) => state.setAllPhotos);

  // const aboutInfo = useOptionStore((state) => state.aboutInfo);
  // const setAboutInfo = useOptionStore((state) => state.setAboutInfo);

  // const optionBoxHeightMin = useOptionStore((state) => state.optionBoxHeightMin);
  // const setOptionBoxHeightMin = useOptionStore((state) => state.setOptionBoxHeightMin);

  // const showBackground = useOptionStore((state) => state.showBackground);
  // const setShowBackground = useOptionStore((state) => state.setShowBackground);

  // const showPartOptions = useOptionStore((state) => state.showPartOptions);
  // const setShowPartOptions = useOptionStore((state) => state.setShowPartOptions);

  // const optionBoxItemChanged = useOptionStore(
  //   (state) => state.optionBoxItemChanged,
  // );
  // const setOptionBoxItemChanged = useOptionStore((state) => state.setOptionBoxItemChanged);

  // const optionBoxItemToggle = useOptionStore(
  //   (state) => state.optionBoxItemToggle,
  // );
  // const setOptionBoxItemToggle = useOptionStore((state) => state.setOptionBoxItemToggle);

  // const animToggled = useOptionStore((state) => state.animToggled);
  // const setAnimToggled = useOptionStore((state) => state.setAnimToggled);

  // const animActive = useOptionStore((state) => state.animActive);
  // const setAnimActive = useOptionStore((state) => state.setAnimActive);

  // const activeCamPosAnim = useOptionStore((state) => state.activeCamPosAnim);
  // const setActiveCamPosAnim = useOptionStore((state) => state.setActiveCamPosAnim);

  // const activeCamTargAnim = useOptionStore((state) => state.activeCamTargAnim);
  // const setActiveCamTargAnim = useOptionStore((state) => state.setActiveCamTargAnim);

  // const activeCamAnim = useOptionStore((state) => state.activeCamAnim);
  // const setActiveCamAnim = useOptionStore((state) => state.setActiveCamAnim);

  // const partsOpen = useOptionStore((state) => state.partsOpen);
  // const setPartsOpen = useOptionStore((state) => state.setPartsOpen);

  // const animIconToggle = useOptionStore((state) => state.animIconToggle);
  // const setAnimIconToggle = useOptionStore((state) => state.setAnimIconToggle);

  // functions
  const handleClick = (e) => {
    // console.info(`You clicked ${options[selectedIndex]}`);
    if (selectedIndex === 0) {
      randomCurrentItemParts(e, currentItemName, "stainSingle");
    } else if (selectedIndex === 1) {
      randomCurrentItemParts(e, currentItemName, "stainMixed");
    } else if (selectedIndex === 2) {
      randomCurrentItemParts(e, currentItemName, "allMixed");
    } else if (selectedIndex === 3) {
      randomCurrentItemParts(e, currentItemName, "paintMixed");
    } else if (selectedIndex === 4) {
      randomCurrentItemParts(e, currentItemName, "paintSingle");
    }
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        variant="outlined"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
        color="primary"
      >
        <Button
          onClick={handleClick}
          startIcon={<ShuffleOutlinedIcon color="primary" />}
          sx={{
            fontFamily: "var(--leva-fonts-mono)",
            backgroundColor: "rgb(233, 234, 233)",
          }}
        >
          {options[selectedIndex]}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select shuffle colors option"
          aria-haspopup="menu"
          onClick={handleToggle}
          sx={{ backgroundColor: "rgb(233, 234, 233)" }}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper
              sx={{
                backgroundColor: "lightGrey",
                // border: "0.075rem solid rgb(155, 155, 155);",
                border: "0.075rem solid rgb(255, 255, 255);",
              }}
              // sx={{
              //   "& .MuiPaper-root": {
              //     backgroundColor: "lightgrey",
              //   },
              // }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      // disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                      sx={{ fontFamily: "var(--leva-fonts-mono)" }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
