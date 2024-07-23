import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { useLoaderData } from "react-router-dom";
import { goTo } from "../../utils/goTo.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function PhotoGrid({ theme }) {
  // Router loader data
  const data = useLoaderData();

  useEffect(() => {
    console.log("useLoader data in PhotoGrid: ", data);
  }, [data]);

  // state from store
  const open = useOptionStore((state) => state.open);
  const selectedImage = useOptionStore((state) => state.selectedImage);

  // action from store
  const setSelectedImage = useOptionStore((state) => state.setSelectedImage);
  const setSelectedImageIndex = useOptionStore(
    (state) => state.setSelectedImageIndex,
  );

  // go to 3d shop page
  const returnTo3dView = () => {
    goTo("/");
  };

  const handleImageClickOuterGrid = (imageRecord) => () => {
    if (imageRecord.imgPath.length > 1) {
      setSelectedImage(imageRecord);
    } else {
      setSelectedImage(imageRecord);
      setSelectedImageIndex(0);
      goTo("/view");
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
          overflow: "auto",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {selectedImage === null && data ? (
          <>
            {/* photos grid (outer) - showing single images for both single and muliple image records */}
            {/* (shows sub-set of images related to clicked image in secondary
            photos grid inner (below)) */}
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
            <Box>
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
              >
                <Masonry gutter="1rem">
                  {data.images.map((imageRecord, index) => {
                    return (
                      <img
                        key={index}
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
            {/* photos grid (inner) - for sub-sets of images (muliple images related to an image in photos grid outer (^above)) */}
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

            <Box
              sx={{
                borderRadius: "0.75rem",
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
          <></>
        )}
      </div>
    </ThemeProvider>
  );
}
