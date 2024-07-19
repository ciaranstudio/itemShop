import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { useLoaderData } from "react-router-dom";
import { router } from "./router.jsx";
// import { unselectedItem } from "../../data/objects.jsx";
// import { shopItems } from "../../data/objects.jsx";

export default function PhotoGrid({ theme }) {
  // selected image useState
  // const [selectedImage, setSelectedImage] = useState(null);

  // Router loader data
  const data = useLoaderData();

  useEffect(() => {
    console.log("useLoader data in PhotoGrid: ", data);
  }, [data]);

  // router navigate function
  const goTo = (route) => {
    router.navigate(route);
  };

  // get location from Router hook
  // const routerLocation = useLocation();

  // state from store
  const open = useOptionStore((state) => state.open);
  const selectedImage = useOptionStore((state) => state.selectedImage);
  // const currentItemSelected = useOptionStore(
  //   (state) => state.currentItemSelected,
  // );
  // const previousItemSelected = useOptionStore(
  //   (state) => state.previousItemSelected,
  // );
  // const showBackground = useOptionStore((state) => state.showBackground);
  // const aboutInfo = useOptionStore((state) => state.aboutInfo);
  // const showPhotos = useOptionStore((state) => state.showPhotos);
  // const allPhotos = useOptionStore((state) => state.allPhotos);

  // action from store
  const setSelectedImage = useOptionStore((state) => state.setSelectedImage);
  // const setCurrentItemSelected = useOptionStore(
  //   (state) => state.setCurrentItemSelected,
  // );
  // const setPreviousItemSelected = useOptionStore(
  //   (state) => state.setPreviousItemSelected,
  // );
  // const setShowBackground = useOptionStore((state) => state.setShowBackground);
  // const setShowPartOptions = useOptionStore(
  //   (state) => state.setShowPartOptions,
  // );
  // const setOpen = useOptionStore((state) => state.setOpen);
  // const setAboutInfo = useOptionStore((state) => state.setAboutInfo);
  // const setShowPhotos = useOptionStore((state) => state.setShowPhotos);
  // const setAllPhotos = useOptionStore((state) => state.setAllPhotos);

  // go to 3d shop page and enable orbit controls with open state val (zustand store useStore)
  const returnTo3dView = () => {
    goTo("/");
    // setOpen(false);
    // if (aboutInfo) setAboutInfo(false);
    // if (showPhotos) setShowPhotos(false);
    // if (allPhotos) setAllPhotos(false);
    // if (showBackground) {
    //   if (currentItemSelected !== unselectedItem)
    //     setTimeout(() => {
    //       setShowBackground(false);
    //     }, 500);
    // } else {
    //   // setShowPartOptions(true);
    //   setShowBackground(true);
    //   setTimeout(() => {
    //     setShowBackground(false);
    //   }, 1500);
    //   // setShowBackground(false);
    // }
  };

  const handleImageClick = (m) => () => {
    // if (m.route === "shop") {
    //   const tempSelectedTitle = m.title;
    //   const titleMatch = (element) => element.itemTitle === tempSelectedTitle;
    //   if (titleMatch) {
    //     let matchedItem = shopItems.find(titleMatch);
    //     console.log("matched item from shop image click: ", matchedItem);
    //     setPreviousItemSelected(currentItemSelected);
    //     setCurrentItemSelected(matchedItem);
    //   }
    // }
    if (m.imgPath.length > 1) {
      setSelectedImage(m);
    } else {
      console.log(
        "go to single view route (and set context to hold selected image record id ?",
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className="info"
        style={{
          paddingBottom: "1rem",
          overflow: "auto",
          pointerEvents: open ? "auto" : "none",
          marginTop: "0.5rem",
          // overflow: selectedImage === null ? "auto" : "hidden",
        }}
      >
        {selectedImage === null && data ? (
          <>
            {/* photos grid */}
            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                pointerEvents: "auto",
                zIndex: "1",
              }}
            >
              <span>
                <IconButton
                  onClick={returnTo3dView}
                  color="inherit"
                  sx={{
                    padding: "0.5rem",
                  }}
                  aria-label="close info box"
                >
                  <CloseOutlinedIcon fontSize="small" color="success" />
                </IconButton>
              </span>
            </span>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  sm: "auto auto",
                  md: "auto auto auto",
                  lg: "auto auto auto auto",
                },
                columnGap: "1rem",
                rowGap: "1rem",
                borderRadius: "0.75rem",
                // border: "0.085rem solid rgb(155, 155, 155)",
                // overflow: "auto",
              }}
            >
              {data.images.map((m, index) => {
                return (
                  <img
                    key={index}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                    }}
                    src={m.imgPath[0]}
                    onClick={handleImageClick(m)}
                  ></img>
                );
              })}
            </Box>
          </>
        ) : selectedImage && selectedImage.imgPath.length > 1 ? (
          <>
            {/* photos grid */}
            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                pointerEvents: "auto",
                zIndex: "1",
              }}
            >
              <span>
                <IconButton
                  // onClick={returnTo3dView}
                  onClick={() => {
                    setSelectedImage(null);
                  }}
                  color="inherit"
                  sx={{
                    padding: "0.5rem",
                  }}
                  aria-label="close info box"
                >
                  <CloseOutlinedIcon fontSize="small" color="success" />
                </IconButton>
              </span>
            </span>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  sm: "auto auto",
                  md: "auto auto auto",
                  lg: "auto auto auto auto",
                },
                columnGap: "1rem",
                rowGap: "1rem",
                borderRadius: "0.75rem",
                // border: "0.085rem solid rgb(155, 155, 155)",
                // overflow: "auto",
              }}
            >
              {selectedImage.imgPath.map((m, index) => {
                return (
                  <img
                    key={index}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                    }}
                    src={m}
                    onClick={() => {
                      // setSelectedImage(m);
                      console.log(
                        "go to single view route (and set context to hold selected image record id ?",
                      );
                    }}
                  ></img>
                );
              })}
            </Box>
          </>
        ) : (
          <>
            {/* <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                pointerEvents: "auto",
                zIndex: "1",
              }}
            >
              <span>
                <IconButton
                  onClick={() => {
                    setSelectedImage(null);
                  }}
                  color="inherit"
                  sx={{
                    padding: "0.5rem",
                  }}
                  aria-label="close info box"
                >
                  <CloseOutlinedIcon fontSize="small" color="success" />
                </IconButton>
              </span>
            </span>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  sm: "auto",
                },
                borderRadius: "0.75rem",
                // border: "0.085rem solid rgb(155, 155, 155)",
                justifyContent: "center",
                mt: 3,
              }}
            >
              <img
                style={{
                  objectFit: "contain",
                  maxHeight: "80vh",
                }}
                src={selectedImage.imgPath[0]}
              ></img>
            </Box> */}
          </>
        )}

        {/* <div>
          <span>
            <Link to="/">home</Link>
          </span>
        </div>
        <div>
          <span>
            <Link to="/gramps">gramps</Link>
          </span>
        </div> */}
      </div>
    </ThemeProvider>
  );
}
