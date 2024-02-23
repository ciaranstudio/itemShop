import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Global } from "@emotion/react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { keyframes } from "@mui/system";
import useWindowDimensions from "./useWindowDimensions";
// TODO: replace 'products' with data retrieved from Shopify Storefront API
import { products } from "./products";

// const theme = createTheme({
// palette: {
//   primary: {
//     main: "#212121",
//     light: "#757575",
//   },

//   secondary: {
//     main: "#bdbdbd",
//     light: "#E0E0E0",
//   },
// },

export default function BottomAppBar({
  open,
  setOpen,
  handleColorChange,
  // handleTextureChange, // for finalizing custom wood texture files, may need to adjust all texture elements
  currentItemSelected,
  // setCurrentItemSelected, // for updating type of item selected from user input in Select box top right corner
  currentOptionSelected,
  toggled,
  setToggled,
  animActive,
}) {
  const drawerBleeding = 60;
  const { height, width } = useWindowDimensions();
  const [cartCount, setCartCount] = useState(0);
  const [item, setItem] = useState(10);

  useEffect(() => {
    console.log("window.innerHeight: ", height);
  }, [height]);

  useEffect(() => {
    console.log("currentItemSelected: ", currentItemSelected);
  }, [currentItemSelected]);

  useEffect(() => {
    console.log("currentOptionSelected: ", currentOptionSelected);
  }, [currentOptionSelected]);

  useEffect(() => {
    console.log("item value: ", item);
    // switch logic here for matching to object options
    // setCurrentItemSelected()
  }, [item]);

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

  // for updating Leva debug controls values from user input as option while developing wood textures
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

  function handleAddToCart() {
    setCartCount(cartCount + 1);
    console.log("cartCount: ", cartCount);
  }

  const handleItemChange = (event) => {
    setItem(event.target.value);
    console.log("item value: ", event.target.value);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#212121",
        light: "#757575",
      },

      secondary: {
        main: "#bdbdbd",
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
            color: "#212121",
          },
        },
      },
    },
  });

  const StyledBox = styled("div")(({ theme }) => ({
    position: "absolute",
    right: 0,
    left: 0,
    margin: "auto",
    maxWidth: "50ch",
  }));

  const Puller = styled("div")(({ theme }) => ({
    width: 56,
    height: 4,
    backgroundColor: open
      ? theme.palette.secondary.main
      : theme.palette.primary.light,
    borderRadius: 3,
    position: "absolute",
    top: 20,
    left: "calc(50% - 28px)",
  }));

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              // height: `calc(( ${height <= 400 ? "50svh" : height <= 600 ? "35svh" : "25svh"} + ${drawerBleeding}px))`,
              height: `calc((${drawerBleeding * 3.1}px))`, // the 0.1 over *3 is bottom gap
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
          sx={{
            // backgroundColor: "secondary.light",
            // opacity: "0.75",
            top: 0,
          }}
        >
          <Toolbar>
            <Box
              component={"div"}
              sx={{
                flexGrow: 1,
              }}
            >
              <Box
                sx={{
                  // backgroundColor: "primary.main",
                  // opacity: "0.75",
                  width: "20.5ch",
                  py: 0.25,
                  px: 1,
                  mt: 1,
                  borderRadius: 3,
                }}
              >
                <Typography
                  variant="h3"
                  component="div"
                  color="secondary.light"
                  sx={{
                    WebkitTextStroke: "0.75px #757575",
                    WebkitFontSmoothing: "antialiased",
                  }}
                >
                  Eli Gfell
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                // backgroundColor: "secondary.light",
                // opacity: "0.75",
                borderRadius: 3,
                mr: 2,
                p: 1,
                py: 0.5,
                mt: 1,
              }}
            >
              {" "}
              <FormControl
                variant="outlined"
                size="small"
                sx={{
                  minWidth: 90,
                  maxWidth: 180,
                  right: 0,
                  // mr: 3,
                  // backgroundColor: "secondary.light",
                  // opacity: "0.75",
                }}
              >
                <Select
                  autoWidth
                  value={item}
                  onChange={handleItemChange}
                  inputProps={{
                    MenuProps: {
                      sx: { opacity: "0.85" },
                      PaperProps: {
                        sx: {
                          backgroundColor: `${theme.palette.secondary.light}`,
                          color: "primary.main",
                        },
                      },
                    },
                  }}
                  sx={{
                    backgroundColor: "secondary.light",
                    opacity: "0.85",
                    color: "primary.main",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderWidth: "0.75px",
                      borderColor: "primary.light",
                      WebkitFontSmoothing: "antialiased",
                      // height: "90%",
                      // top: -1,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderWidth: "0.75px",
                      borderColor: "primary.light",
                      WebkitFontSmoothing: "antialiased",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.light",
                      WebkitFontSmoothing: "antialiased",
                    },
                    // ".MuiSvgIcon-root ": {
                    //   fill: `${theme.palette.secondary.main} !important`,
                    // },
                  }}
                >
                  {/* TODO: replace with mapping values retrieved from Shopify storefront api */}
                  <MenuItem key={1} value={10}>
                    gramps
                  </MenuItem>
                  <MenuItem key={2} value={20} disabled>
                    squatter
                  </MenuItem>
                  <MenuItem key={3} value={30} disabled>
                    shelf
                  </MenuItem>
                  <MenuItem key={4} value={40} disabled>
                    horse
                  </MenuItem>
                  <MenuItem key={5} value={50} disabled>
                    block
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* <Box component={"div"} sx={{ flexGrow: 1 }} /> */}
            <Box
              sx={{
                backgroundColor: "secondary.light",
                opacity: "0.85",
                // borderColor: "primary",
                // borderWidth: 1.5,
                borderRadius: 1.5,
                mt: 1,
                mr: 0.4,
                border: "0.75px solid #757575",
                WebkitFontSmoothing: "antialiased",
              }}
            >
              <IconButton color="inherit">
                <Badge
                  badgeContent={cartCount}
                  color="primary"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <ShoppingCartIcon sx={{ color: "primary.light" }} />
                </Badge>
              </IconButton>
            </Box>
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
          disableSwipeToOpen={false}
          transitionDuration={500}
          ModalProps={{
            keepMounted: true,
            slotProps: {
              backdrop: { sx: { background: "none" } },
            },
          }}
        >
          <StyledBox
            onClick={toggleDrawer(!open)}
            sx={{
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: "visible",
              background: "#e8e8e8",
              opacity: 0.75,
              height: drawerBleeding - 1,
              p: 2.75,
              zIndex: 1,
              // border: "1px solid #757575",
            }}
          >
            <Puller />

            {/* <Box sx={{ position: "absolute", top: 0, left: 0 }}>
              <Button
                variant="contained"
                size="small"
                sx={{
                  py: 0,
                  ml: 1.5,
                  mt: 1.5,
                }}
                color="primary"
              >
                info
              </Button>
            </Box>
            <Box sx={{ position: "absolute", top: 0, right: 0 }}>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  py: 0,
                  mr: 1.5,
                  mt: 1.25,
                }}
                onClick={() => {
                  setToggled(!toggled);
                }}
                color="primary"
                disabled={animActive ? true : false}
              >
                show design
              </Button>
            </Box> */}
          </StyledBox>
          <StyledBox
            sx={{
              top: 0,
              height: `100svh-${drawerBleeding}`,
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
                      {/* <Box sx={{ pt: 0, pb: 1 }}>
                        <Typography variant="h5" color="primary.main">
                          {product.name}
                        </Typography>
                      </Box> */}
                      <Box sx={{ pt: 1.5, pb: 1.5 }}>
                        <Typography variant="h5" color="primary.main">
                          {product.name}
                        </Typography>
                      </Box>
                      <ButtonGroup
                        variant="outlined"
                        aria-label="Basic button group"
                        sx={{ mb: 1 }}
                        color="primary"
                        size="small"
                      >
                        <Button
                          onClick={(e) => handleColorChange(e, "white")}
                          variant={
                            currentOptionSelected === "white"
                              ? "contained"
                              : "outlined"
                          }
                        >
                          white
                        </Button>
                        <Button
                          onClick={(e) => handleColorChange(e, "natural")}
                          variant={
                            currentOptionSelected === "natural"
                              ? "contained"
                              : "outlined"
                          }
                        >
                          natural
                        </Button>
                        <Button
                          onClick={(e) => handleColorChange(e, "black")}
                          variant={
                            currentOptionSelected === "black"
                              ? "contained"
                              : "outlined"
                          }
                        >
                          black
                        </Button>
                        <Button
                          onClick={(e) => handleColorChange(e, "allBlack")}
                          variant={
                            currentOptionSelected === "allBlack"
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

                      <Box sx={{ pt: 1 }}>
                        <Box sx={{ position: "absolute", top: 0, left: 0 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              py: 0,
                              ml: 1.5,
                              mt: 1.5,
                            }}
                            color="primary"
                          >
                            info
                          </Button>
                        </Box>
                        <Box sx={{ position: "absolute", top: 0, right: 0 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              py: 0,
                              mr: 1.5,
                              mt: 1.5,
                            }}
                            onClick={() => {
                              setToggled(!toggled);
                            }}
                            color="primary"
                            disabled={animActive ? true : false}
                          >
                            animate
                          </Button>
                        </Box>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleAddToCart}
                        >
                          {product.price}
                        </Button>
                      </Box>
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
