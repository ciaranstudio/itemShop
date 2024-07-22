import * as React from "react";
import { useState, useEffect } from "react";
import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  redirect,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { getImageRecords, createImageRecord } from "../utils/records.js";
import { authProvider } from "../data/authProvider.js";
import AuthStatus from "../components/interface/AuthStatus.jsx";
import Copyright from "../components/interface/Copyright.jsx";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Collapse from "@mui/material/Collapse";
import StarIcon from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Clear from "@mui/icons-material/Clear";
import { useOptionStore } from "../store/useOptionStore.tsx";
import ImageIcon from "@mui/icons-material/Image";

export async function action() {
  const imageRecord = await createImageRecord();
  return redirect(`/admin/records/${imageRecord.id}/edit`);
}

export async function loader({ request }) {
  const imageRecords = await getImageRecords();
  const email = authProvider.email;

  if (!authProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  } else {
    return { imageRecords, email };
  }
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    height: "100vh",
    overflowX: "hidden",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",

    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Root() {
  // get location from Router hook
  const routerLocation = useLocation();
  // store function disable three controls so that scroll works in admin interface with open set to true
  const setStoreOpen = useOptionStore((state) => state.setOpen);

  // useState
  const [open, setOpen] = useState(false);
  const [openNestedList, setOpenNestedList] = useState(false);

  // functions
  // toggle menu drawer open / closed
  const toggleDrawer = () => {
    setOpen(!open);
    setOpenNestedList(!open);
  };
  // click handlers
  const handleNestedClick = () => {
    setOpen(true);
    setOpenNestedList(!openNestedList);
  };
  const { imageRecords } = useLoaderData();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [value, setValue] = useState(imageRecords[0]);
  const [inputValue, setInputValue] = useState("");
  const loading = value && imageRecords.length === 0;

  const handleListItemClick = (id) => {
    setSelectedIndex(id);
  };

  // mui theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#424242",
        light: "#E0E0E0",
      },
      secondary: {
        main: "#E0E0E0",
        light: "#E0E0E0",
      },
    },
  });

  // useEffect
  useEffect(() => {
    if (value) {
      navigate(`records/${value.id}`);
      handleListItemClick(value.id);
    }
  }, [value]);

  useEffect(() => {
    setValue(null);
  }, []);

  // useEffect
  useEffect(() => {
    setStoreOpen(true);
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", width: "100svw" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open} color="primary">
            <Toolbar
              sx={{
                pr: "0",
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              ></Typography>
              <Autocomplete
                clearIcon={
                  <Clear fontSize="small" sx={{ color: "primary.light" }} />
                }
                selectOnFocus={false}
                forcePopupIcon={false}
                aria-label="Search image records"
                value={value}
                onChange={(event, newValue) => {
                  // console.log("newValue: ", newValue);
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                // isOptionEqualToValue={(option, value) =>
                //   option.first + " " + option.last ===
                //   value.first + " " + value.last
                // }
                // getOptionLabel={(option) => option.first + " " + option.last}
                isOptionEqualToValue={(option, value) =>
                  option.title === value.title
                }
                getOptionLabel={(option) => option.title}
                options={imageRecords}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Search (title)"
                    size="small"
                    InputLabelProps={{
                      sx: {
                        "&": { color: "primary.light" },
                        "&:hover": { color: "primary.light" },
                        "&.Mui-focused": { color: "primary.light" },
                      },
                    }}
                  />
                )}
                sx={{
                  width: "25ch",
                  marginRight: "2ch",
                  "& .MuiOutlinedInput-input": {
                    "&": {
                      color: "primary.light",
                    },
                    "&:hover": {
                      color: "primary.light",
                    },
                    "&.Mui-focused": {
                      color: "primary.light",
                    },
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "primary.light",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.light",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.light",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #E0E0E0",
                    },
                  },
                }}
              />
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />

            <List component="nav">
              <Form method="post">
                <ListItemButton
                  onClick={() => handleListItemClick(null)}
                  type="submit"
                  component="button"
                  sx={{ width: "100%" }}
                >
                  <ListItemIcon>
                    <AddCircleOutlineOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="New" />
                </ListItemButton>
              </Form>
              <Divider sx={{ my: 1 }} />
              <ListItemButton onClick={handleNestedClick}>
                <ListItemIcon>
                  <ImageIcon />
                </ListItemIcon>
                <ListItemText primary="Images" />
                {openNestedList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={openNestedList} timeout="auto" unmountOnExit>
                {imageRecords.length ? (
                  <List component="div" disablePadding>
                    {imageRecords.map((imageRecord, index) => (
                      <ListItemButton
                        sx={{ pl: 3 }}
                        key={imageRecord.id}
                        component={Link}
                        to={`records/${imageRecord.id}`}
                        selected={selectedIndex === imageRecord.id}
                        onClick={() => handleListItemClick(imageRecord.id)}
                      >
                        <ListItemIcon>
                          {imageRecord.favorite ? <StarIcon /> : <StarBorder />}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            imageRecord.title || imageRecord.year ? (
                              <>
                                {imageRecord.title} {imageRecord.year}
                              </>
                            ) : (
                              <i>No title</i>
                            )
                          }
                        />
                      </ListItemButton>
                    ))}
                  </List>
                ) : (
                  <p style={{ textAlign: "center" }}>
                    <i>No records</i>
                  </p>
                )}
              </Collapse>
              <Divider sx={{ my: 1 }} />
              <AuthStatus />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: "primary",
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      maxWidth: "77.5ch",
                      overflow: "auto",
                    }}
                  >
                    <Outlet />
                  </Paper>
                </Grid>
              </Grid>
              <Copyright
                sx={{
                  pt: 2.5,
                  pr: { md: 20 },
                }}
              />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
