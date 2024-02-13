import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
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

export default function BottomAppBar() {
  const drawerBleeding = 24;
  const [open, setOpen] = useState(false);

  const [item, setItem] = useState(10);
  // const [cartCount, setCartCount] = useState(0);
  const [variant, setVariant] = React.useState("");

  const handleItemChange = (event) => {
    setItem(event.target.value);
  };

  const handleVariantChange = (event) => {
    setVariant(event.target.value);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const theme = createTheme({
    // shadows: ["none"],
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
    // overrides: {
    //   MuiAppBar: {
    //     root: {
    //       "box-shadow": "none",
    //     },
    //   },
    // },
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

  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    bottom: drawerBleeding + 3,
    left: 0,
    right: 0,
    margin: "0 auto",
  });

  const StyledBox = styled("div")(({ theme }) => ({
    // backgroundColor: "theme.palette.secondary.light",
  }));

  const Puller = styled("div")(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
  }));

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setOpen(true);
  //   }, "1000");
  // }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `calc(40% - ${drawerBleeding}px)`,
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
                eli gfell
              </Typography>
            </Box>

            <FormControl
              variant="outlined"
              size="small"
              sx={{ minWidth: 90, scale: "0.8" }}
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
                        backgroundColor: "transparent",
                        color: "secondary",
                      },
                    },
                  },
                }}
                // sx={{
                //   // ":before": { borderBottomColor: "secondary.light" },
                //   // ":after": { borderBottomColor: "secondary.light" },
                //   // "&.MuiInput-underline:hover:before": {
                //   //   borderColor: "secondary.light",
                //   // },
                //   },
                // }}
                sx={{
                  color: "secondary",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "secondary.main",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "secondary.light",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "secondary.main",
                  },
                  ".MuiSvgIcon-root ": {
                    fill: "secondary !important",
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
                <ShoppingCartIcon sx={{ color: "primary.light" }} />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <AppBar
          position="fixed"
          component="nav"
          color="transparent"
          elevation={0}
          sx={{ top: "auto", bottom: 0 }}
        >
          <Toolbar>
            <StyledFab
              aria-label="show sale options"
              onClick={toggleDrawer(true)}
              size="small"
              sx={{
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "secondary.light",
                },
                display: open ? "none" : "flex",
              }}
            >
              <NorthIcon sx={{ color: "primary.light" }} />
            </StyledFab>
            <Box component={"div"} sx={{ flexGrow: 1 }} />
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
          ModalProps={{
            keepMounted: true,
            slotProps: {
              backdrop: { sx: { background: "none" } },
            },
          }}
        >
          <StyledBox
            sx={{
              position: "absolute",
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: "visible",
              right: 0,
              left: 0,
              background: "#e8e8e8",
              opacity: 0.75,
              height: drawerBleeding,
              margin: "auto",
              maxWidth: "50ch",
              zIndex: 1,
              border: "1px solid #9E9E9E",
              borderBottom: "0px",
            }}
          >
            <Puller />
            <Typography sx={{ p: 4, color: "text.secondary" }}></Typography>
          </StyledBox>
          <StyledBox
            sx={{
              position: "absolute",
              right: 0,
              left: 0,
              height: "100%",
              overflow: "auto",

              m: "auto",
              maxWidth: "50ch",
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
                      // background: "#e8e8e8",
                      background: "#e8e8e8",
                      opacity: 0.75,
                      border: "1px solid #9E9E9E",
                      borderTop: "0px",
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
                      <Typography variant="h6" color="primary">
                        <Box sx={{ pb: 2 }}> {product.name}</Box>
                      </Typography>

                      <ButtonGroup
                        variant="outlined"
                        aria-label="Basic button group"
                        sx={{ pb: 2 }}
                        size="small"
                      >
                        <Button>white</Button>
                        <Button>natural</Button>
                        <Button>black</Button>
                        <Button>all black</Button>
                      </ButtonGroup>

                      <Box sx={{ pb: 1 }}>
                        <Typography variant="subtitle2" color="primary">
                          {product.description}
                        </Typography>
                      </Box>
                      <Box sx={{ pb: 2 }}>
                        <Typography variant="subtitle1" color="primary">
                          {product.price}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ color: "secondary.light" }}
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
