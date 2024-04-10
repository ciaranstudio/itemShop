import { Html } from "@react-three/drei";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";

export default function InfoBox({
  item,
  // currentItemSelected,
  toggleInfoBox,
  open,
  theme,
}) {
  return (
    <Html
      center
      // position={[
      //   0,
      //   item.itemName.includes("shelf") &&
      //   item.itemName.includes("B") &&
      //   item.itemName.includes("16")
      //     ? 0.4
      //     : item.itemName.includes("shelf") &&
      //         item.itemName.includes("B") &&
      //         item.itemName.includes("32")
      //       ? 0.18
      //       : item.itemName.includes("shelf") &&
      //           item.itemName.includes("A") &&
      //           item.itemName.includes("32")
      //         ? 0.4
      //         : item.itemName.includes("shelf") &&
      //             item.itemName.includes("A") &&
      //             item.itemName.includes("16")
      //           ? 0.18
      //           : item.itemName.includes("horse")
      //             ? -0.8
      //             : -0.6,
      //   0,
      // ]}
      position={[0, -10, 0]}
    >
      <div
        className="info"
        style={{
          display: open ? "block" : "none",
        }}
      >
        <IconButton
          onClick={(e) => toggleInfoBox(e)}
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
          <CloseOutlinedIcon
            // fontSize="medium"
            sx={{ color: "primary.light" }}
          />
        </IconButton>
        <div id="title">
          {item.itemTitle === "noSelectTitle" ? "" : item.itemTitle}
        </div>
        <div id="description">{item.itemLongDescription}</div>
        <div id="size">{item.size}</div>
      </div>
    </Html>
  );
}
