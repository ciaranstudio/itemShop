import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import Fab from "@mui/material/Fab";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Global } from "@emotion/react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import NorthIcon from "@mui/icons-material/North";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { products } from "./products";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { keyframes } from "@mui/system";
import controls from "./debugControls";

export default function BottomAppBar({
  open,
  setOpen,
  handleColorChange,
  handleTextureChange,
  currentColor,
  currentSelect,
  toggled,
  setToggled,
  animActive,
}) {
  const debugControls = controls();
  const drawerBleeding = 28;

  const spinUp = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(540deg);

  }`;

  const spinDown = keyframes`
  from {
   transform: rotate(540deg);
  }
  to {
    transform: rotate(0deg);
  }`;

  const moveUp = keyframes`
  from {
    transform: translate(0, 0 );
  }
  to {
     transform: translate(0, -29.5svh );

  }`;

  const moveDown = keyframes`
  from {
    transform: translate(0, -29.5svh );
  }
  to {
     transform: translate(0, 0);

  }`;

  const [item, setItem] = useState(10);
  // const [{ stainColor }, set] = useControls(() => ({
  //   stainColor: "#ff0000",
  // }));
  // const [{ stainColor }, set] = useControls(() => ({
  //   stainColor: {
  //     value: "#ff0000",
  //     // onChange: (value) => {
  //     //   // imperatively update the world after Leva input changes
  //     // },
  //   },
  // }));

  const handleItemChange = (event) => {
    setItem(event.target.value);
  };

  // const handleVariantChange = (event) => {
  //   setVariant(event.target.value);
  // };

  // const handleSelect = () => {
  //   console.log("handle select clicked");
  //   debugControls.stainColor = "#00ff00";
  //   console.log(debugControls.stainColor);
  //   // set({ stainColor: "#ff0000" });
  // };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#424242",
        light: "#757575",
      },

      secondary: {
        main: "#9E9E9E",
        light: "#E0E0E0",
      },
    },
    shadows: Array(25).fill("none"),
    components: {
      MuiDrawer: {
        styleOverrides: {
          modal: {
            ".MuiModal-backdrop": {
              background: "none",
            },
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          colorSecondary: {
            color: "#757575",
          },
        },
      },
    },
  });

  // const StyledFab = styled(Fab)({
  //   position: "absolute",
  //   zIndex: 1,
  //   bottom: drawerBleeding + 58,
  //   left: 0,
  //   right: 0,
  //   margin: "0 auto",
  // });

  const StyledBox = styled("div")(({ theme }) => ({
    position: "absolute",
    right: 0,
    left: 0,
    margin: "auto",
    maxWidth: "50ch",
  }));

  const Puller = styled("div")(({ theme }) => ({
    width: 30,
    height: 4,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 3,
    position: "absolute",
    top: 10,
    left: "calc(50% - 15px)",
  }));

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Global
          // TO DO: increase from 32% for landscape mobile media query
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `calc(32.25% - ${drawerBleeding}px)`,
              overflow: "visible",
              background: "transparent",
            },
          }}
        />
        <AppBar
          position="fixed"
          component="nav"
          color="transparent"
          elevation={0}
          sx={{ top: 0 }}
        >
          <Toolbar>
            <Box component={"div"} sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="div" color="primary">
                Eli Gfell
              </Typography>
            </Box>

            <FormControl
              variant="outlined"
              size="small"
              sx={{ minWidth: 90, scale: "0.8", left: "calc(0% - 24px)" }}
            >
              <Select
                autoWidth
                value={item}
                onChange={handleItemChange}
                inputProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        scale: "0.8",
                        background: "transparent",
                        color: "secondary",
                      },
                    },
                  },
                }}
                sx={{
                  color: "secondary",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "secondary.main",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "1px",
                    borderColor: "secondary.main",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "secondary.main",
                  },
                  ".MuiSvgIcon-root ": {
                    fill: "primary !important",
                  },
                }}
              >
                <MenuItem key={1} value={10}>
                  stool
                </MenuItem>
                <MenuItem key={2} value={20} disabled>
                  squatter
                </MenuItem>
                <MenuItem key={3} value={30} disabled>
                  shelf
                </MenuItem>
              </Select>
            </FormControl>
            <Box component={"div"} sx={{ flexGrow: 1 }} />
            <IconButton color="inherit">
              <Badge
                // badgeContent={cartCount}
                color="primary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <ShoppingCartIcon sx={{ color: "primary.main" }} />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={true}
          transitionDuration={800}
          ModalProps={{
            keepMounted: true,
            slotProps: {
              backdrop: { sx: { background: "none" } },
            },
          }}
        >
          <StyledBox
            sx={{
              top: -drawerBleeding - 1,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: "visible",

              background: "#e8e8e8",
              opacity: 0.75,
              height: drawerBleeding,

              zIndex: 1,
              border: "1px solid #9E9E9E",
              // borderBottom: "0px",
            }}
          >
            <Puller onClick={toggleDrawer(!open)} />

            <Box sx={{ position: "absolute", top: 0, left: 0 }}>
              <Button
                variant="contained"
                size="small"
                sx={{ p: 0, scale: "0.65" }}
                color="primary"
              >
                info
              </Button>
            </Box>
            <Box sx={{ position: "absolute", top: 0, right: 0 }}>
              <Button
                variant="contained"
                size="small"
                sx={{ p: 0, scale: "0.65" }}
                onClick={() => {
                  setToggled(!toggled);
                }}
                color="primary"
                disabled={animActive ? true : false}
              >
                move
              </Button>
            </Box>
          </StyledBox>
          <StyledBox
            sx={{
              height: `100%-${drawerBleeding}`,
              overflow: "auto",

              background: "transparent",
            }}
          >
            {products.map((product, index) => (
              <Grid container key={index}>
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      mt: 0,
                      p: 2,
                      borderTopLeftRadius: "0px",
                      borderTopRightRadius: "0px",
                      borderBottomLeftRadius: "8px",
                      borderBottomRightRadius: "8px",
                      background: "#e8e8e8",
                      opacity: 0.75,
                      border: "1px solid #9E9E9E",
                    }}
                  >
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 1,
                        pt: 0,
                        background: "transparent",
                      }}
                    >
                      <Box sx={{ pt: 0, pb: 1 }}>
                        <Typography variant="h6" color="primary">
                          {product.name}
                        </Typography>
                      </Box>
                      <ButtonGroup
                        variant="outlined"
                        aria-label="Basic button group"
                        sx={{ pb: 1 }}
                        size="small"
                      >
                        <Button
                          onClick={(e) => handleColorChange(e, "white")}
                          variant={
                            currentSelect === "white" ? "contained" : "outlined"
                          }
                        >
                          white
                        </Button>
                        <Button
                          onClick={(e) => handleColorChange(e, "natural")}
                          variant={
                            currentSelect === "natural"
                              ? "contained"
                              : "outlined"
                          }
                        >
                          natural
                        </Button>
                        <Button
                          onClick={(e) => handleColorChange(e, "black")}
                          variant={
                            currentSelect === "black" ? "contained" : "outlined"
                          }
                        >
                          black
                        </Button>
                        <Button
                          onClick={(e) => handleColorChange(e, "allBlack")}
                          variant={
                            currentSelect === "allBlack"
                              ? "contained"
                              : "outlined"
                          }
                        >
                          all black
                        </Button>
                      </ButtonGroup>

                      {/* <Box sx={{ pb: 1 }}>
                        <Typography variant="subtitle2" color="primary">
                          {product.description}
                        </Typography>
                      </Box> */}
                      <Box sx={{ pb: 1 }}>
                        <Typography variant="subtitle1" color="primary">
                          {product.price}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ color: "secondary.light" }}
                        size="small"
                      >
                        add to cart
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            ))}
          </StyledBox>
        </SwipeableDrawer>
      </ThemeProvider>
    </React.Fragment>
  );
}
