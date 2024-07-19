import React from "react";
import { Html } from "@react-three/drei";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import ImagesRouter from "./ImagesRouter.jsx";

export default function HtmlOutlet({ toggleInfoBox, togglePhotoBox, theme }) {
  return (
    <Html center position={[0, 0, 0]}>
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
            onClick={(e) => toggleInfoBox(e)}
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
      <ImagesRouter
        toggleInfoBox={toggleInfoBox}
        togglePhotoBox={togglePhotoBox}
        theme={theme}
      />
    </Html>
  );
}
