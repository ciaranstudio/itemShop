import { useRef, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { theme } from "../../data/theme.js";

const options = ["Stain", "Stains", "All", "Paints", "Paint"];

export default function SplitButton({ randomCurrentItemParts }) {
  // useState
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(2);

  // state from store
  const currentItemName = useOptionStore((state) => state.currentItemName);
  const adminFlag = useOptionStore((state) => state.adminFlag);

  // functions
  const handleClick = (e) => {
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ButtonGroup
          variant="outlined"
          ref={anchorRef}
          aria-label="Button group with a nested menu"
          color="primary"
        >
          <Button
            onClick={handleClick}
            // startIcon={<ShuffleOutlinedIcon color="primary" />}
            sx={{
              backgroundColor: "rgb(233, 234, 233)",
            }}
            aria-label="shuffle colors randomly"
          >
            {/* {options[selectedIndex]} */}
            <ShuffleOutlinedIcon color="primary" />
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
          // disablePortal
          disablePortal={adminFlag ? false : true}
          placement={adminFlag ? "right" : "right"}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "right" ? "bottom center" : "bottom center",
              }}
            >
              <Paper
                sx={{
                  backgroundColor: "white",
                  border: "0.075rem solid rgb(33, 33, 33);",
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
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
      </ThemeProvider>
    </>
  );
}
