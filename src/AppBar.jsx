import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
// import AddIcon from "@mui/icons-material/Add";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Global } from "@emotion/react";
// import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// import SwipeUpAltIcon from "@mui/icons-material/SwipeUpAlt";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import NorthIcon from "@mui/icons-material/North";

export default function BottomAppBar() {
  const drawerBleeding = 56;
  const [open, setOpen] = useState(false);

  const [item, setItem] = useState(10);
  const [cartCount, setCartCount] = useState(0);

  // function addClick() {
  //   setCartCount(cartCount + 1);
  // }

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const theme = createTheme({
    shadows: ["none"],
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
    components: {
      MuiDrawer: {
        styleOverrides: {
          // this will only apply to drawer modals
          modal: {
            ".MuiModal-backdrop": {
              background: "none",
            },
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          // Name of the slot
          colorSecondary: {
            color: "#757575",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          standard: {
            backgroundColor: "#e8e8e8",
            color: "#757575",
            "&:hover": {
              color: "#424242",
            },
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
    backgroundColor: theme.palette.secondary.light,
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

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `calc(40% - ${drawerBleeding}px)`,
              overflow: "visible",
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
            {/* <IconButton color="inherit">
              <InfoIcon sx={{ color: "primary.light" }} />
            </IconButton> */}
            <Box component={"div"} sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="div"
                color="primary"
                // sx={{
                //   flexGrow: 1,
                //   display: { xs: "none", sm: "block" },
                // }}
              >
                eli gfell
              </Typography>
            </Box>
            {/* <Button
              sx={{
                color: "primary.light",
                textTransform: "lowercase",
                py: 0,
              }}
            >
              <Typography variant="h7" component="div" color="primary">
                collection
              </Typography>
            </Button> */}
            <FormControl
              variant="standard"
              size="small"
              sx={{ minWidth: 90, scale: "0.8" }}
            >
              <Select
                autoWidth
                value={item}
                onChange={handleChange}
                inputProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        scale: "0.8",
                        backgroundColor: "secondary.light",
                        color: "primary.light",
                      },
                    },
                  },
                }}
                sx={{
                  ":before": { borderBottomColor: "secondary.light" },
                  ":after": { borderBottomColor: "secondary.light" },
                  "&.MuiInput-underline:hover:before": {
                    borderColor: "secondary.light",
                  },
                }}
              >
                <MenuItem value={10}>stool</MenuItem>
                <MenuItem value={20} disabled>
                  squatter
                </MenuItem>
                <MenuItem value={30} disabled>
                  shelf
                </MenuItem>
              </Select>
            </FormControl>
            <Box component={"div"} sx={{ flexGrow: 1 }} />
            <IconButton color="inherit">
              <Badge
                badgeContent={cartCount}
                color="primary"
                // overlap="circular"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                // size="small"
                // variant="dot"
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
              }}
            >
              <NorthIcon sx={{ color: "secondary.main" }} />
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
          // PaperProps={{
          //   style: {
          //     //style props for your drawer menu here
          //   },
          // }}
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
            }}
          >
            <Puller />

            <Typography sx={{ p: 4, color: "text.secondary" }}></Typography>
          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: "100%",
              overflow: "auto",
            }}
          >
            <Skeleton variant="rounded" height="100%" animation={false} />
          </StyledBox>
        </SwipeableDrawer>
      </ThemeProvider>
    </React.Fragment>
  );
}
