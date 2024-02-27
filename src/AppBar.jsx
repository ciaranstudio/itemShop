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
// import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import Container from "@mui/material/Container";
import CarpenterIcon from "@mui/icons-material/Carpenter";
import Avatar from "@mui/material/Avatar";

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
  const drawerBleeding = 42;

  const pages = ["Products", "Pricing", "Blog"];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const { height, width } = useWindowDimensions();
  const [cartCount, setCartCount] = useState(0);
  const [item, setItem] = useState(10);
  const [mobileView, setMobileView] = useState(false);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    // console.log("window.innerHeight: ", height);
  }, [height]);

  useEffect(() => {
    // console.log("currentItemSelected: ", currentItemSelected);
  }, [currentItemSelected]);

  useEffect(() => {
    // console.log("currentOptionSelected: ", currentOptionSelected);
  }, [currentOptionSelected]);

  useEffect(() => {
    // console.log("item value: ", item);
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

  function handleAddToCart() {
    setCartCount(cartCount + 1);
    // console.log("cartCount: ", cartCount);
  }

  const handleItemChange = (event) => {
    setItem(event.target.value);
    // console.log("item value: ", event.target.value);
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
    width: 64,
    height: 4,
    backgroundColor: open
      ? theme.palette.secondary.light
      : theme.palette.primary.light,
    borderRadius: 3,
    position: "absolute",
    top: 5,
    left: "calc(50% - 32px)",
  }));

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    // Check if using a touch control device, show/hide joystick
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      console.log("mobile view");
      setMobileView(true);
    } else {
      console.log("not mobile view");
      setMobileView(false);
    }
    window.addEventListener("pointerdown", (e) => {
      e.preventDefault;
    });
    return () => {
      window.removeEventListener("pointerdown", (e) => {
        e.preventDefault;
      });
    };
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              // height: `calc(( ${height <= 400 ? "50svh" : height <= 600 ? "35svh" : "25svh"} + ${drawerBleeding}px))`,
              height: `calc((${drawerBleeding * 4.75}px))`, // the 0.1 over *3 is bottom gap
              overflow: "visible",
              background: "transparent",
            },
          }}
        />
        <AppBar position="fixed" color="transparent">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <CarpenterIcon
                sx={{
                  color: "primary.light",
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "primary.light",
                  textDecoration: "none",
                }}
              >
                ELI GFELL
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                >
                  <MenuIcon sx={{ color: "primary.light" }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    "& .MuiPaper-root": {
                      backgroundColor: "secondary.light",
                    },
                    opacity: "0.8",
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        sx={{ color: "primary.light", fontFamily: "monospace" }}
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <CarpenterIcon
                sx={{
                  color: "primary.light",
                  display: { xs: "flex", md: "none" },
                  mr: 1,
                }}
              />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "primary.light",
                  textDecoration: "none",
                }}
              >
                ELI GFELL
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "primary.light", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Box
                sx={{
                  // backgroundColor: "secondary.light",
                  // opacity: "0.75",
                  borderRadius: 3,
                  mr: 1,
                  // p: 1,
                  // py: 0.5,
                  // mt: 1,
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
                  {/* <Tooltip title="Select item"> */}
                  <Select
                    autoWidth
                    value={item}
                    onChange={handleItemChange}
                    inputProps={{
                      MenuProps: {
                        sx: { opacity: "0.8" },
                        PaperProps: {
                          sx: {
                            backgroundColor: `${theme.palette.secondary.light}`,
                            // backgroundColor: "transparent",
                            color: "primary.light",
                          },
                        },
                      },
                    }}
                    sx={{
                      fontFamily: "monospace",
                      backgroundColor: "transparent",
                      // backgroundColor: "secondary.light",
                      // opacity: "0.85",
                      color: "primary.light",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderWidth: "0.5px",
                        borderColor: "primary.light",
                        WebkitFontSmoothing: "antialiased",
                        // height: "90%",
                        // top: -1,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "0.5px",
                        borderColor: "primary.light",
                        WebkitFontSmoothing: "antialiased",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "0.5px",
                        borderColor: "primary.light",
                        WebkitFontSmoothing: "antialiased",
                      },
                      ".MuiSvgIcon-root ": {
                        fill: `${theme.palette.primary.light} !important`,
                      },
                    }}
                  >
                    {/* TODO: replace with mapping values retrieved from Shopify storefront api */}
                    <MenuItem
                      key={1}
                      value={10}
                      sx={{ fontFamily: "monospace" }}
                    >
                      gramps
                    </MenuItem>
                    <MenuItem
                      key={2}
                      value={20}
                      sx={{ fontFamily: "monospace" }}
                      disabled
                    >
                      squatter
                    </MenuItem>
                    <MenuItem
                      key={3}
                      value={30}
                      sx={{ fontFamily: "monospace" }}
                      disabled
                    >
                      shelf
                    </MenuItem>
                    <MenuItem
                      key={4}
                      value={40}
                      sx={{ fontFamily: "monospace" }}
                      disabled
                    >
                      horse
                    </MenuItem>
                    <MenuItem
                      key={5}
                      value={50}
                      sx={{ fontFamily: "monospace" }}
                      disabled
                    >
                      block
                    </MenuItem>
                  </Select>
                  {/* </Tooltip> */}
                </FormControl>
              </Box>

              <Box
                sx={{
                  backgroundColor: "transparent",
                  // backgroundColor: "secondary.light",
                  // opacity: "0.85",
                  // borderColor: "primary",
                  // borderWidth: 1.5,
                  // borderRadius: 1.5,
                  // mt: 1,
                  // mr: 0.4,
                  // border: "0.75px solid #757575",
                  // WebkitFontSmoothing: "antialiased",
                }}
              >
                <Tooltip title="View cart">
                  <IconButton color="inherit">
                    <Badge
                      badgeContent={cartCount}
                      color="transparent"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <ShoppingCartIcon sx={{ color: "primary.light" }} />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        {mobileView ? (
          ""
        ) : (
          <Tooltip title="View item details">
            <IconButton
              onClick={toggleDrawer(true)}
              color="inherit"
              sx={{
                position: "absolute",
                bottom: drawerBleeding + 10,
                left: `calc(100svw/2 - 12px)`,
              }}
            >
              {!open ? (
                <InfoIcon
                  sx={{
                    color: "primary.light",
                    border: "0.75px solid #757575",
                    borderRadius: Math.PI,
                    fontSize: "inherit",
                  }}
                />
              ) : (
                ""
              )}
            </IconButton>
          </Tooltip>
        )}

        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          transitionDuration={200}
          ModalProps={{
            keepMounted: true,
            slotProps: {
              backdrop: { sx: { background: "none" } },
            },
          }}
        >
          {mobileView ? (
            <>
              <StyledBox
                onClick={toggleDrawer(!open)}
                sx={{
                  top: -drawerBleeding,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  visibility: "visible",
                  // background: "#e8e8e8",
                  opacity: 0.75,
                  height: -drawerBleeding,
                  p: 2.75,
                  zIndex: 1,
                  border: "1px solid #9E9E9E",
                  borderBottomWidth: 0,
                }}
              >
                {open ? "" : <Puller />}
                {/* <IconButton
                  color="inherit"
                  sx={{ position: "absolute", top: 2, left: 3 }}
                >
                  <CloseIcon
                    sx={{
                      color: "secondary.light",
                    }}
                  />
                </IconButton> */}
              </StyledBox>
            </>
          ) : (
            ""
          )}
          {/* <IconButton
                  color="inherit"
                  sx={{ position: "absolute", top: 0, right: 8 }}
                >
                  <CloseIcon
                    sx={{
                      color: "secondary.main",
                    }}
                  />
                </IconButton> */}

          {/* <Puller /> */}

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
          <StyledBox
            sx={{
              bottom: 0,
              height: `100%-${drawerBleeding}`,
              overflow: "auto",
              background: "transparent",
            }}
          >
            {mobileView ? <Puller /> : ""}
            {products.map((product, index) => (
              <Grid container key={index}>
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      mt: 0,
                      p: 2,
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8,
                      background: "transparent",
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

                      <Box sx={{ pb: 0 }}>
                        <Typography variant="subtitle2" color="primary">
                          {product.description}
                        </Typography>
                      </Box>

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
