import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SvgIcon from "@mui/material/SvgIcon";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { createSvgIcon } from "@mui/material/utils";
import { useOptionStore } from "../../../store/useOptionStore.tsx";
import { useSnipcart } from "use-snipcart";
import { router } from "../router.jsx";
import { PAGES } from "../../../data/constants.tsx";

function ResponsiveAppBar({ theme }) {
  // useState for Snipcart
  const [snipcartLoaded, setSnipcartLoaded] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // snipcart hook values
  // const snipcart = useSnipcart();
  const { cart = {} } = useSnipcart();
  // const { subtotal = "0.00" } = cart;

  const goTo = (route) => {
    router.navigate(route);
  };

  useEffect(() => {
    // let state = snipcart.getState();
    // console.log("snipCart state: ", state);
    if (window.Snipcart) {
      setSnipcartLoaded(true);
      // console.log("window.Snipcart.api: ", window.Snipcart);
      if (cart.items) setCartCount(cart.items.count);
    } else {
      setSnipcartLoaded(false);
    }
    return () => {
      setSnipcartLoaded(false);
    };
  }, [window.Snipcart]);
  useEffect(() => {
    if (snipcartLoaded) {
      if (cart) {
        if (cart.items) {
          setCartCount(cart.items.count);
          // document.getElementById("footer").innerHTML =
          //   `snipcartLoaded = ${snipcartLoaded}, cartCount = ${cart.items.count}, cart = ${cart}`;
        }
      }
    }
  }, [snipcartLoaded, cart]);

  // snipcart cart click function
  function handleCartClick() {
    if (snipcartLoaded) {
      window.Snipcart.api.theme.cart.open();
    }
  }

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 15,
      top: 20,
      // border: `0.75px solid ${cartCount > 0 ? theme.palette.background.paper : "none"}`,
      // padding: "0 4px",
      backgroundColor: cartCount > 0 ? "#dedede" : "transparent",
      color: "black",
      // fontWeight: "bold",
    },
  }));

  const [anchorElNav, setAnchorElNav] = useState(null);
  // const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // state from store
  const allPhotos = useOptionStore((state) => state.allPhotos);
  const aboutInfo = useOptionStore((state) => state.aboutInfo);

  // actions from store
  const setShowPartOptions = useOptionStore(
    (state) => state.setShowPartOptions,
  );

  // navigation selection function utlizing router navigation method
  //  to access links outside of Router context
  const selectHandler = (e, menuItem) => {
    // console.log(menuItem);
    handleCloseNavMenu();
    setShowPartOptions(false);
    switch (menuItem) {
      case "about":
        goTo("/about");
        break;
      case "images":
        goTo("/images");
        break;
      case "custom":
        window.open(
          "https://www.eligfellstudio.com/new-page",
          "_blank",
          "noreferrer",
        );
        goTo("/custom");
        break;
      case "contact":
        window.open(
          "https://www.eligfellstudio.com/contact-1",
          "_blank",
          "noreferrer",
        );
        goTo("/contact");
        break;
      case "exhibitions":
        window.open(
          "https://cargocollective.com/eligfell",
          "_blank",
          "noreferrer",
        );
        goTo("/exhibitions");
        break;
    }
  };

  const LogoIcon = createSvgIcon(
    <svg viewBox="0 -10 100 100" width="100">
      <image href="logoBlenderRender.png" height="100" width="100" />
    </svg>,
    "Plus",
  );

  const BagIcon = createSvgIcon(
    <svg viewBox="0 -10 100 100" width="100">
      <image href="bag.png" height="100" width="100" />
    </svg>,
    "Plus",
  );

  return (
    <>
      <AppBar position="fixed" color="transparent" elevation={0}>
        <Container
          maxWidth="xl"
          sx={{
            pt: 0.5,
          }}
        >
          <Toolbar disableGutters>
            <SvgIcon
              component={LogoIcon}
              // inheritViewBox
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                fontSize: "60px",
                pb: 1,
                // transition: "all .5s",
              }}
              // fontSize="large"
            ></SvgIcon>
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
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="main navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="primary"
              >
                <MenuIcon />
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
                  display: { xs: "block", md: "none" },
                  "& .MuiPaper-root": {
                    backgroundColor: "lightgrey",
                    border: "0.05rem solid rgb(155, 155, 155);",
                  },
                }}
              >
                {PAGES.map((page, i) => (
                  <MenuItem
                    key={i}
                    onClick={(e) => selectHandler(e, page.menuItem)}
                    selected={
                      aboutInfo && page.menuItem === "about"
                        ? true
                        : allPhotos && page.menuItem === "images"
                          ? true
                          : false
                    }
                  >
                    {/* <Link to={`/${page.menuItem}`}> */}
                    <Typography
                      textAlign="center"
                      sx={{
                        fontFamily: "var(--leva-fonts-mono)",
                        fontSize: "0.9rem",
                      }}
                    >
                      {page.navTitle}
                    </Typography>
                    {/* </Link> */}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <SvgIcon
              component={LogoIcon}
              // inheritViewBox
              sx={{
                display: { xs: "flex", md: "none" },
                ml: 3.75,
                fontSize: "60px",
                // transition: "all .5s",
              }}
              // fontSize="large"
            ></SvgIcon>
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
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {PAGES.map((page, i) => (
                <Button
                  key={i}
                  onClick={(e) => selectHandler(e, page.menuItem)}
                  sx={{
                    my: 3,
                    mx: 3,
                    color: `${
                      aboutInfo && page.menuItem === "about"
                        ? theme.palette.primary.main
                        : allPhotos && page.menuItem === "images"
                          ? theme.palette.primary.main
                          : theme.palette.secondary.main
                    }`,
                    display: "block",
                    fontFamily: "var(--leva-fonts-mono)",
                  }}
                >
                  {page.navTitle}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open cart">
                <StyledBadge
                  badgeContent={cartCount > 0 ? cartCount : ""}
                  color={cartCount > 0 ? "info" : "default"}
                >
                  <IconButton onClick={handleCartClick} sx={{ p: 0 }}>
                    <SvgIcon
                      component={BagIcon}
                      // inheritViewBox
                      sx={{
                        fontSize: "64px",
                        // fontSize: "60px",
                        fontFamily: "var(--leva-fonts-mono)",
                        // transition: "all .5s",
                      }}
                      // fontSize="large"
                    ></SvgIcon>
                  </IconButton>
                </StyledBadge>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
