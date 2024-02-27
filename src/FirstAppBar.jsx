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
  <Container maxWidth="xl">
    <Toolbar disableGutters>
      <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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
      >
        Eli Gfell
      </Typography>
      <Box
      // sx={{
      //   flexGrow: 1,
      // }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          // color="secondary"
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
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      {/* <Box
                component={"div"}
                sx={{
                  flexGrow: 1,
                }}
              >
                <Box
                  // sx={{
                  // backgroundColor: "primary.main",
                  // opacity: "0.75",
                  // width: "20.5ch",
                  // py: 0.25,
                  // px: 1,
                  // mt: 1,
                  // borderRadius: 3,
                  // }}
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    position: "absolute",
                    top: 0,
                    left: `calc(100svw/2 - 10.25ch)`,
                  }}
                >
                  <Typography
                    variant="h3"
                    component="div"
                    color="primary.light"
                    // sx={{
                    //   WebkitTextStroke: "0.125px #ffffff",
                    //   WebkitFontSmoothing: "antialiased",
                    // }}
                  >
                    Eli Gfell
                  </Typography>
                </Box>
              </Box> */}

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
          {/* <Tooltip title="Select item"> */}
          <Select
            autoWidth
            value={item}
            onChange={handleItemChange}
            inputProps={{
              MenuProps: {
                sx: { opacity: "0.85" },
                PaperProps: {
                  sx: {
                    // backgroundColor: `${theme.palette.secondary.light}`,
                    backgroundColor: "transparent",
                    color: "primary.light",
                  },
                },
              },
            }}
            sx={{
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
          mt: 1,
          mr: 0.4,
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
</AppBar>;
