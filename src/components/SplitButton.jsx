import * as React from "react";
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

const options = ["Stain", "Stains", "All", "Paints", "Paint"];

export default function SplitButton({
  theme,
  currentItemName,
  randomCurrentItemParts,
}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(2);

  const handleClick = (e) => {
    console.info(`You clicked ${options[selectedIndex]}`);
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

  // (e) => randomCurrentItemParts(e, currentItemName, "stainSingle")
  // (e) => randomCurrentItemParts(e, currentItemName, "stainMixed")
  // (e) => randomCurrentItemParts(e, currentItemName, "allMixed")
  // (e) => randomCurrentItemParts(e, currentItemName, "paintMixed")
  // (e) => randomCurrentItemParts(e, currentItemName, "paintSingle")

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
