import React from "react";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useOptionStore } from "../../store/useOptionStore.tsx";

export default function PhotoNavControls() {
  const open = useOptionStore((state) => state.open);
  const locationPathname = useOptionStore((state) => state.locationPathname);
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
        <ToggleButtonGroup
          color="primary"
          exclusive
          // value={showCustomTheme}
          // onChange={toggleCustomTheme}
          aria-label="Platform"
          sx={{
            backgroundColor: "rgb(233, 234, 233)",
            "& .Mui-selected": {
              pointerEvents: "none",
            },
          }}
        >
          <ToggleButton value>
            <ArrowBackIcon sx={{ fontSize: "20px", mr: 1 }} />
            Back
          </ToggleButton>
          <ToggleButton value={false}>3D Shop</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </>
  );
}
