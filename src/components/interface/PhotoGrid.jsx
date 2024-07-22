import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { useLoaderData } from "react-router-dom";
// import { router } from "../../utils/router.jsx";
import { goTo } from "../../utils/goTo.js";
// import { unselectedItem } from "../../data/objects.jsx";
// import { shopItems } from "../../data/objects.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function PhotoGrid({ theme }) {
  // selected image useState
  // const [selectedImage, setSelectedImage] = useState(null);

  // Router loader data
  const data = useLoaderData();

  useEffect(() => {
    console.log("useLoader data in PhotoGrid: ", data);
  }, [data]);

  // router navigate function
  // const goTo = (route) => {
  //   router.navigate(route);
  // };

  // get location from Router hook
  // const routerLocation = useLocation();

  // state from store
  const open = useOptionStore((state) => state.open);
  const selectedImage = useOptionStore((state) => state.selectedImage);
  // const selectedImageIndex = useOptionStore(
  //   (state) => state.selectedImageIndex,
  // );
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
  const setSelectedImageIndex = useOptionStore(
    (state) => state.setSelectedImageIndex,
  );
  const mobileView = useOptionStore((state) => state.mobileView);

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

  const handleImageClickOuterGrid = (imageRecord) => () => {
    // if (imageRecord.route === "shop") {
    //   const tempSelectedTitle = imageRecord.title;
    //   const titleMatch = (element) => element.itemTitle === tempSelectedTitle;
    //   if (titleMatch) {
    //     let matchedItem = shopItems.find(titleMatch);
    //     console.log("matched item from shop image click: ", matchedItem);
    //     setPreviousItemSelected(currentItemSelected);
    //     setCurrentItemSelected(matchedItem);
    //   }
    // }
    if (imageRecord.imgPath.length > 1) {
      setSelectedImage(imageRecord);
      console.log("show grid of related (sub) images");
    } else {
      setSelectedImage(imageRecord);
      setSelectedImageIndex(0);
      goTo("/view");
      console.log("go to single view route of selected image");
    }
  };

  const handleImageClickInnerGrid = (index) => () => {
    setSelectedImageIndex(index);
    goTo("/view");
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
                  <CloseOutlinedIcon fontSize="small" color="info" />
                </IconButton>
              </span>
            </span>

            <Box
              sx={
                {
                  // display: "grid",
                  // gridTemplateColumns: {
                  //   sm: "auto auto",
                  //   md: "auto auto auto",
                  //   lg: "auto auto auto auto",
                  // },
                  // columnGap: "1rem",
                  // rowGap: "1rem",
                  // borderRadius: "0.75rem",
                  // border: "0.085rem solid rgb(155, 155, 155)",
                  // overflow: "auto",
                }
              }
            >
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
              >
                <Masonry gutter="1rem">
                  {data.images.map((imageRecord, index) => {
                    return (
                      <img
                        key={index}
                        style={{
                          objectFit: "contain",
                          width: "100%",
                        }}
                        src={imageRecord.imgPath[0]}
                        onClick={handleImageClickOuterGrid(imageRecord)}
                      ></img>
                    );
                  })}
                </Masonry>
              </ResponsiveMasonry>
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
                  <ArrowBackIcon fontSize="small" color="info" />
                </IconButton>
              </span>
            </span>
            <span
              style={{
                position: "absolute",
                top: 0,
                right: 0,
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
                  <CloseOutlinedIcon fontSize="small" color="info" />
                </IconButton>
              </span>
            </span>
            {/* <Box sx={{ display: "flex" }}>
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
                    // onClick={() => goTo("/shop")}
                    onClick={() => {
                      setSelectedImage(null);
                    }}
                    color="inherit"
                    sx={{
                      py: "0.9rem",
                    }}
                    aria-label="close info box"
                  >
                    <ArrowBackIcon fontSize="small" color="info" />
                  </IconButton>
                </span>
              </span>
            </Box> */}

            <Box
              sx={{
                // display: "grid",
                // gridTemplateColumns: {
                //   sm: "auto auto",
                //   md: "auto auto auto",
                //   lg: "auto auto auto auto",
                // },
                // columnGap: "1rem",
                // rowGap: "1rem",
                borderRadius: "0.75rem",
                // border: "0.085rem solid rgb(155, 155, 155)",
                // overflow: "auto",
              }}
            >
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
              >
                <Masonry gutter="1rem">
                  {selectedImage.imgPath.map((image, index) => {
                    return (
                      <img
                        key={index}
                        style={{
                          objectFit: "contain",
                          width: "100%",
                        }}
                        src={image}
                        onClick={handleImageClickInnerGrid(index)}
                      ></img>
                    );
                  })}
                </Masonry>
              </ResponsiveMasonry>
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
