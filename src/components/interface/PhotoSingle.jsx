import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import { useOptionStore } from "../../store/useOptionStore.tsx";
// import { useLoaderData } from "react-router-dom";
// import { router } from "../../utils/router.jsx";
// import { unselectedItem } from "../../data/objects.jsx";
// import { shopItems } from "../../data/objects.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { goTo } from "../../utils/goTo.js";

export default function PhotoSingle({ theme }) {
  // selected image useState
  // const [selectedImage, setSelectedImage] = useState(null);

  // Router loader data
  // const data = useLoaderData();

  // router navigate function
  // const goTo = (route) => {
  //   router.navigate(route);
  // };

  // get location from Router hook
  // const routerLocation = useLocation();

  // state from store
  const open = useOptionStore((state) => state.open);
  const selectedImage = useOptionStore((state) => state.selectedImage);
  const selectedImageIndex = useOptionStore(
    (state) => state.selectedImageIndex,
  );
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
  // const setSelectedImage = useOptionStore((state) => state.setSelectedImage);
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

  useEffect(() => {
    if (selectedImage === null) {
      goTo("/");
    }
  }, [selectedImage]);

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

  // const handleImageClick = (m) => () => {
  //   // if (m.route === "shop") {
  //   //   const tempSelectedTitle = m.title;
  //   //   const titleMatch = (element) => element.itemTitle === tempSelectedTitle;
  //   //   if (titleMatch) {
  //   //     let matchedItem = shopItems.find(titleMatch);
  //   //     console.log("matched item from shop image click: ", matchedItem);
  //   //     setPreviousItemSelected(currentItemSelected);
  //   //     setCurrentItemSelected(matchedItem);
  //   //   }
  //   // }
  //   if (m.imgPath.length > 1) {
  //     setSelectedImage(m);
  //     console.log("show grid of related (sub) images");
  //   } else {
  //     setSelectedImage(m);
  //     console.log("go to single view route of selected image");
  //   }
  // };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className="single-view"
        style={{
          paddingBottom: "1rem",
          overflow: "auto",
          pointerEvents: open ? "auto" : "none",
          marginTop: "0.5rem",
          // overflow: selectedImage === null ? "auto" : "hidden",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              sm: "auto",
            },
            borderRadius: "0.75rem",
            // border: "0.085rem solid rgb(155, 155, 155)",
            justifyContent: "center",
            mt: 7,
          }}
        >
          {selectedImage && (
            <img
              style={{
                // objectFit: "contain",
                maxWidth: "90svw",
                height: "75svh",
                // maxHeight: "75vh",
              }}
              src={selectedImage.imgPath[selectedImageIndex]}
            ></img>
          )}
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "auto, auto, auto",
            borderRadius: "0.75rem",
            // border: "0.085rem solid rgb(155, 155, 155)",
            textAlign: "center",
            mt: 1.5,
          }}
        >
          {selectedImage && (
            <>
              <span
                style={{
                  position: "absolute",
                  // top: "50%",
                  // left: "50%",
                  // transform: "translate(-50%, -50%)",
                  pointerEvents: "auto",
                  zIndex: "1",
                }}
              >
                <span>
                  <IconButton
                    onClick={() => goTo("/shop")}
                    color="inherit"
                    sx={{
                      py: "0.9rem",
                    }}
                    aria-label="close info box"
                  >
                    <ArrowBackIcon fontSize="small" color="secondary" />
                  </IconButton>
                </span>
              </span>
              <span
                style={{
                  position: "absolute",
                  // top: "50%",
                  right: 0,
                  // transform: "translate(-50%, -50%)",
                  pointerEvents: "auto",
                  zIndex: "1",
                }}
              >
                <span>
                  <IconButton
                    onClick={returnTo3dView}
                    color="inherit"
                    sx={{
                      py: "0.9rem",
                    }}
                    aria-label="close info box"
                  >
                    <CloseOutlinedIcon fontSize="small" color="secondary" />
                  </IconButton>
                </span>
              </span>
              <Typography variant="subtitle2" color="inherit">
                {selectedImage.title && <>{selectedImage.title}</>}
              </Typography>
              <Typography variant="subtitle2" color="inherit">
                {selectedImage.year && <>{selectedImage.year}</>}
              </Typography>
              <Typography variant="subtitle2" color="inherit">
                {selectedImage.materials && <>{selectedImage.materials}</>}
              </Typography>
            </>
          )}
        </Box>

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
