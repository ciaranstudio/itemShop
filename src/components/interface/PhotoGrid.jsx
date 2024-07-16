import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { Link, useLocation } from "react-router-dom";
import { useDashContext } from "../../context/ViewContext";
import { router } from "./router.jsx";

export default function PhotoGrid({ theme, images, folders }) {
  const goTo = (route) => {
    router.navigate(route);
  };

  const returnTo3dView = () => {
    setOpen(false);
    goTo("/");
  };

  // infobox Y axis position for drei Html component
  // const htmlPosY = 50;
  const htmlPosY = 0;

  const routerLocation = useLocation();
  const { location, setLocation } = useDashContext();

  // state from store
  const currentItemSelected = useOptionStore(
    (state) => state.currentItemSelected,
  );
  const open = useOptionStore((state) => state.open);

  // action from store
  const setOpen = useOptionStore((state) => state.setOpen);

  // useEffect
  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    console.log("routerLocation: ", routerLocation);
    setLocation(routerLocation);
  }, [routerLocation]);

  useEffect(() => {
    console.log("dash location: ", location);
    // setLocation(routerLocation);
  }, [location]);

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
        }}
      >
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
              overflow: "auto",
            }}
          >
            {images.map((m, index) => {
              return (
                <img
                  key={index}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                  }}
                  src={m.imgPath}
                ></img>
              );
            })}
          </Box>
        </>
        <div>
          <span>
            <Link to="/">home</Link>
          </span>
        </div>
      </div>
    </ThemeProvider>
  );
}
