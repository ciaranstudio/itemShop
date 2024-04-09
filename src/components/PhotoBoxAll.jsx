import { Html } from "@react-three/drei";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import SimpleSlider from "./SimpleSlider.jsx";

export default function PhotoBoxAll({ item, togglePhotoBox, showPhotos }) {
  return (
    <Html
      center
      // position={[
      //   0,
      //   item.itemName.includes("shelf") &&
      //   item.itemName.includes("B") &&
      //   item.itemName.includes("16")
      //     ? 0.35
      //     : item.itemName.includes("shelf") &&
      //         item.itemName.includes("B") &&
      //         item.itemName.includes("32")
      //       ? 0.15
      //       : item.itemName.includes("shelf") &&
      //           item.itemName.includes("A") &&
      //           item.itemName.includes("32")
      //         ? 0.35
      //         : item.itemName.includes("shelf") &&
      //             item.itemName.includes("A") &&
      //             item.itemName.includes("16")
      //           ? 0.15
      //           : item.itemName.includes("horse")
      //             ? -1.1
      //             : -0.85, // -0.65
      //   0,
      // ]}
      position={[0, -15, 0]}
    >
      <div
        className="photos"
        style={{
          display: showPhotos ? "block" : "none",
        }}
      >
        <IconButton
          onClick={(e) => togglePhotoBox(e)}
          color="inherit"
          // disabled={
          //   currentItemSelected.itemTitle === "noSelectTitle" ? true : false
          // }
          sx={{
            position: "absolute",
            pointerEvents: "auto",
            top: "0.15rem",
            left: "0.15rem",
            padding: "0.5rem",
          }}
          aria-label="close order box"
        >
          <CloseOutlinedIcon fontSize="small" sx={{ color: "primary.light" }} />
        </IconButton>
        <div id="title">{item.itemTitle}</div>
        <SimpleSlider />
      </div>
    </Html>
  );
}
