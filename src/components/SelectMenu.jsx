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
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import CarpenterIcon from "@mui/icons-material/Carpenter";
import useWindowDimensions from "../helpers/useWindowDimensions";
import { useSnipcart } from "use-snipcart";
import BuyButton from "./BuyButton";

export default function SelectMenu({
  open,
  setOpen,
  toggled,
  setToggled,
  animActive,
  handleStainChange,
  handlePaintChange,
  handleSizeChange,
  shopItems,
  currentItemSelected,
  setCurrentItemSelected,
  // previousItemSelected,
  setPreviousItemSelected,
  currentItemOptionSelect,
  currentItemOptionType,
  currentItemDescription,
  currentItemSizeSelect,
  currentItemSizeSelectIndex,
  // setCurrentItemSizeSelectIndex,
  // currentTexture,
  // currentColor,
}) {
  const drawerBleeding = 60;
  // const settings = ["Profile", "Account", "Dashboard", "Logout"
  const pages = ["Shop", "Custom", "Portfolio", "Contact"];
  const stains = ["white", "natural", "black", "allBlack"];
  const paints1 = ["alabaster", "pink", "basil"];
  const paints2 = ["yellow", "blue", "gray"];

  const { height, width } = useWindowDimensions();
  // const [cartCount, setCartCount] = useState(0);
  const [itemNo, setItemNo] = useState(currentItemSelected.itemNo);
  const [mobileView, setMobileView] = useState(false);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // const [showSwipeableDrawer, setShowSwipeableDrawer] = React.useState(true);

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
    console.log("window.innerHeight: ", height);
  }, [height]);

  useEffect(() => {
    setItemNo(currentItemSelected.itemNo);
  }, [currentItemSelected]);

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
    // setCartCount(cartCount + 1);
    setOpen(false);
    // setShowSwipeableDrawer(false);
    // console.log("cartCount: ", cartCount);
  }

  const handleItemChange = (e) => {
    console.log("selected value: ", e.target.value);
    let tempNo = e.target.value;
    setItemNo(tempNo);

    let itemMatch = (element) => element.itemNo === tempNo;
    if (itemMatch) {
      let itemMatchIndex = shopItems.findIndex(itemMatch);
      setPreviousItemSelected(currentItemSelected);
      setCurrentItemSelected(shopItems[itemMatchIndex]);
    }
  };

  function handleCartClick() {
    if (snipcartLoaded) {
      window.Snipcart.api.theme.cart.open();
    }
  }

  function totalPrice() {
    let calcualatedPrice = 0;
    if (currentItemOptionType === "stain") {
      calcualatedPrice =
        parseInt(currentItemSelected.itemBasePrice) +
        currentItemSelected.itemStainCost +
        currentItemSelected.sizeCost * currentItemSizeSelectIndex;
    } else if (currentItemOptionType === "paint") {
      calcualatedPrice =
        currentItemSelected.itemBasePrice +
        currentItemSelected.itemPaintCost +
        currentItemSelected.sizeCost * currentItemSizeSelectIndex;
    }
    return calcualatedPrice;
  }

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
    // Check if using a touch control device
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      console.log("mobile view");
      setMobileView(true);
    } else {
      console.log("not mobile view");
      setMobileView(false);
    }
  }, []);

  const snipcart = useSnipcart();
  const { cart = {} } = useSnipcart();
  const { subtotal = "0.00" } = cart;
  const [snipcartLoaded, setSnipcartLoaded] = useState(false);

  useEffect(() => {
    console.log("snipcartLoaded: ", snipcartLoaded);
    console.log("useSnipcart: ", snipcart);
    // let state = snipcart.getState();
    // console.log("snipCart state: ", state);
    console.log("cart:", cart);
    if (cart.items) {
      console.log("cart.items.count:", cart.items.count);
    }

    console.log("subtotal:", subtotal);
    if (window.Snipcart) {
      setSnipcartLoaded(true);
      console.log("window.Snipcart.api: ", window.Snipcart);
      // window.Snipcart.api.theme.cart.open();
    }
  }, [cart]);

  // const unsubscribe = window.Snipcart.events.on("item.removed", (cartItem) => {
  //   console.log("item removed: ", cartItem);
  // });

  useEffect(() => {
    if (snipcartLoaded) {
      console.log("snipcartLoaded: ", snipcartLoaded);
      console.log(window.Snipcart);
      if (window.Snipcart.events) {
        console.log("events loaded");
        window.Snipcart.events.on("item.removed", (cartItem) => {
          console.log("item removed: ", cartItem);
        });
      }
    }
  }, [snipcartLoaded]);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `calc((${drawerBleeding * 5.5}px))`,
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
                  sx={{ p: 0 }}
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
                      backgroundColor: "secondary.main",
                    },
                    opacity: "1.0",
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        sx={{
                          color: "primary.light",
                          fontFamily: "monospace",
                        }}
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
                  backgroundColor: "transparent",
                  flexGrow: 0,
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
                  <IconButton onClick={handleCartClick} sx={{ p: 0 }}>
                    {/* <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    /> */}
                    <Badge
                      badgeContent={cart.items ? cart.items.count : 0}
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
                {/* <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu> */}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        {mobileView ? (
          ""
        ) : (
          <Tooltip title="View details">
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
          transitionDuration={500}
          ModalProps={{
            keepMounted: true,
            slotProps: {
              backdrop: { sx: { background: "none" } },
            },
          }}
          // sx={{ display: !showSwipeableDrawer ? "none" : "block" }}
        >
          {mobileView ? (
            <>
              <StyledBox
                // onClick={toggleDrawer(!open)}
                sx={{
                  position: "absolute",
                  top: -drawerBleeding / 2,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  visibility: "visible",
                  right: 0,
                  left: 0,
                  // background: "#e8e8e8",
                  opacity: 0.75,
                  height: -drawerBleeding / 2,
                  p: 2.75,
                  zIndex: 1,
                  border: "1px solid #9E9E9E",
                  borderBottomWidth: 0,
                }}
              >
                <Puller />
              </StyledBox>
            </>
          ) : (
            ""
          )}

          <StyledBox
            sx={{
              bottom: 0,
              height: "100%",
              overflow: "auto",
              background: "transparent",
              zIndex: 2,
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    mt: 0,
                    p: 2,
                    borderTopLeftRadius: mobileView ? 0 : 8,
                    borderTopRightRadius: mobileView ? 0 : 8,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    background: "transparent",
                    opacity: 0.75,
                    border: "1px solid #9E9E9E",
                    borderTopWidth: mobileView ? 0 : 1,
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
                    <Box
                      sx={{
                        pb: 1,
                        // position: "absolute",
                        // backgroundColor: "secondary.light",
                        // opacity: "0.75",
                        borderRadius: 3,
                        // top: 50,
                        // left: `calc(100svw/2 - 5ch)`,
                        // mr: 1,
                        // p: 1,
                        // py: 0.5,
                        // mt: 1,
                      }}
                    >
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
                          name="item-select"
                          autoWidth
                          value={itemNo}
                          onChange={handleItemChange}
                          inputProps={{
                            MenuProps: {
                              sx: { opacity: "1.0" },
                              PaperProps: {
                                sx: {
                                  backgroundColor: `${theme.palette.secondary.main}`,
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
                            color: "primary.main",
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
                          {shopItems.map((shopItem, index) => (
                            <MenuItem
                              key={index}
                              // onClick={handleCloseNavMenu}
                              value={shopItem.itemNo}
                            >
                              <Typography
                                textAlign="center"
                                sx={{
                                  // color: "primary.main",
                                  fontFamily: "monospace",
                                }}
                              >
                                {shopItem.itemTitle}
                              </Typography>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        pb: 1,
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="subtitle2" color="primary">
                        {itemNo === -1
                          ? "Select item..."
                          : `${currentItemDescription} with ${currentItemOptionType} 
                        finish`}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        pb: 1.5,
                      }}
                    >
                      {currentItemSelected.sizes.map((size, index) => (
                        <Button
                          key={index}
                          onClick={(e) => handleSizeChange(e, size, index)}
                          variant={
                            index === currentItemSizeSelectIndex
                              ? "contained"
                              : "outlined"
                          }
                          sx={{ py: 0, px: 0.75, mx: 0.25 }}
                        >
                          {size}
                        </Button>
                      ))}
                    </Box>
                    {/* <Box sx={{ pt: 1.5, pb: 1.5 }}>
                        <Typography variant="h5" color="primary.main">
                          {product.name}
                        </Typography>
                      </Box> */}
                    <ButtonGroup
                      variant="outlined"
                      aria-label="Basic button group"
                      sx={{
                        mb: 0.5,
                        // , flexWrap: "wrap"
                      }}
                      color="primary"
                      size="small"
                    >
                      {stains.map((stain, index) => (
                        <Button
                          key={index}
                          onClick={(e) => handleStainChange(e, stain)}
                          variant={
                            currentItemOptionSelect === stain
                              ? "contained"
                              : "outlined"
                          }
                          sx={{ m: 0 }}
                        >
                          {stain}
                        </Button>
                      ))}
                    </ButtonGroup>

                    <ButtonGroup
                      variant="outlined"
                      aria-label="Basic button group"
                      sx={{
                        mb: 0.5,
                      }}
                      color="primary"
                      size="small"
                    >
                      {paints1.map((paint, index) => (
                        <Button
                          key={index}
                          onClick={(e) => handlePaintChange(e, paint)}
                          variant={
                            currentItemOptionSelect === paint
                              ? "contained"
                              : "outlined"
                          }
                          sx={{ m: 0 }}
                        >
                          {paint}
                        </Button>
                      ))}
                    </ButtonGroup>

                    <ButtonGroup
                      variant="outlined"
                      aria-label="Basic button group"
                      sx={{
                        mb: 1,
                      }}
                      color="primary"
                      size="small"
                    >
                      {paints2.map((paint, index) => (
                        <Button
                          key={index}
                          onClick={(e) => handlePaintChange(e, paint)}
                          variant={
                            currentItemOptionSelect === paint
                              ? "contained"
                              : "outlined"
                          }
                          sx={{ m: 0 }}
                        >
                          {paint}
                        </Button>
                      ))}
                    </ButtonGroup>

                    <Box sx={{ pt: 0.5 }}>
                      <Box
                        sx={{
                          position: "absolute",
                          top: mobileView ? -12 : 0,
                          left: 0,
                        }}
                      >
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
                          images
                        </Button>
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          top: mobileView ? -12 : 0,
                          right: 0,
                        }}
                      >
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
                            console.log("clicked animate");
                          }}
                          color="primary"
                          disabled={animActive ? true : false}
                        >
                          animate
                        </Button>
                      </Box>

                      {itemNo === "" || currentItemOptionSelect === "" ? (
                        ""
                      ) : (
                        <React.Fragment>
                          {/* <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddToCart}
                            className="snipcart-add-item"
                            data-item-id={currentItemSelected.itemNo}
                            // data-item-image={imageUrl}
                            data-item-name={currentItemSelected.itemTitle}
                            // data-item-url="/"
                            data-item-description={
                              currentItemSelected.itemDescription
                            }
                            data-item-price={currentItemSelected.itemBasePrice}
                            data-item-custom1-name="Finish option"
                            data-item-custom1-options={`white[+${currentItemSelected.itemStainCost}]|natural[+${currentItemSelected.itemStainCost}]|black[+${currentItemSelected.itemStainCost}]|allBlack[+${currentItemSelected.itemStainCost}]|alabaster|pink|basil|yellow|blue|gray`}
                            data-item-custom1-value={currentItemOptionSelect}
                            data-item-custom2-name="Size option"
                            data-item-custom2-options={
                              currentItemSelected.sizes.length > 1
                                ? `${currentItemSelected.sizes[0]}|${currentItemSelected.sizes[1]}[+${currentItemSelected.sizeCost}]`
                                : `${currentItemSelected.sizes[0]}`
                            }
                            // data-item-custom2-value={
                            //   currentItemSelected.sizes.length === 1
                            //     ? currentItemSelected.sizes[0]
                            //     : currentItemSizeSelect
                            // }
                            data-item-custom2-value={currentItemSizeSelect}
                          >
                            ${totalPrice()}
                          </Button> */}
                          {shopItems.map((item, index) => (
                            <BuyButton
                              key={index}
                              item={item}
                              itemNo={itemNo}
                              priceTotal={totalPrice()}
                              handleAddToCart={handleAddToCart}
                              currentItemOptionSelect={currentItemOptionSelect}
                              currentItemOptionType={currentItemOptionType}
                              currentItemSizeSelect={currentItemSizeSelect}
                            >
                              {item.itemTitle}
                            </BuyButton>
                          ))}
                        </React.Fragment>
                      )}
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </StyledBox>
        </SwipeableDrawer>
      </ThemeProvider>
    </React.Fragment>
  );
}
