import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { goTo } from "../../utils/goTo.js";

export default function PhotoNavControls() {
  const locationPathname = useOptionStore((state) => state.locationPathname);
  const selectedImage = useOptionStore((state) => state.selectedImage);
  const setSelectedImage = useOptionStore((state) => state.setSelectedImage);

  const backButtonHandler = () => {
    console.log("selectedImage: ", selectedImage);
    if (locationPathname !== "/view") {
      if (!selectedImage) {
        goTo("/");
      } else {
        setSelectedImage(null);
      }
    } else {
      const route = selectedImage.route;
      goTo(`/${route}`);
    }
  };
  return (
    <>
      <Box
        sx={{
          display:
            locationPathname === "/shop" ||
            locationPathname === "/custom" ||
            locationPathname === "/artwork" ||
            locationPathname === "/view"
              ? "flex"
              : "none",
          flexDirection: "column",
          alignItems: "center",
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translate( -50%, -50%)",
          width: "80svw",
          zIndex: 2,
          pointerEvents: "auto",
        }}
      >
        {locationPathname === "/shop" ||
        (selectedImage && selectedImage.route === "shop") ? (
          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="Basic button group"
            // sx={{
            //   backgroundColor: "rgb(233, 234, 233)",
            //   "& .Mui-selected": {
            //     pointerEvents: "none",
            //   },
            // }}
          >
            <Button onClick={backButtonHandler}>
              <ArrowBackIcon sx={{ fontSize: "20px", mr: 1 }} />
              Back
            </Button>
            <Button
              onClick={() => {
                goTo("/");
              }}
            >
              <StorefrontIcon sx={{ fontSize: "20px", mr: 1 }} />
              Shop
            </Button>
          </ButtonGroup>
        ) : (
          <Button onClick={backButtonHandler}>
            <ArrowBackIcon sx={{ fontSize: "20px", mr: 1 }} />
            Back
          </Button>
        )}
      </Box>
    </>
  );
}
