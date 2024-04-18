import { Html } from "@react-three/drei";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import SimpleSlider from "./SimpleSlider.jsx";
import { allImages } from "../data/objects.jsx";
import { useOptionStore } from "../store/useOptionStore.tsx";

export default function PhotoBox({ togglePhotoBox, theme }) {
  // state from store
  const currentItemSelected = useOptionStore(
    (state) => state.currentItemSelected,
  );
  const showPhotos = useOptionStore((state) => state.showPhotos);
  const allPhotos = useOptionStore((state) => state.allPhotos);

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
      position={[0, 44, 0]} // 40 looked okay on simulator but small cut off at bottom on desktop/iPad //  when ArrowIcon position Y was -0.3: [0, 54, 0]
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          className="photos"
          style={{
            display: showPhotos ? "block" : "none",
          }}
        >
          <IconButton
            onClick={(e) => togglePhotoBox(e)}
            color="inherit"
            sx={{
              position: "absolute",
              pointerEvents: "auto",
              top: "0.15rem",
              left: "0.15rem",
              padding: "0.5rem",
            }}
            aria-label="close order box"
          >
            <CloseOutlinedIcon color="success" />
          </IconButton>
          <div id="title">
            <Typography
              variant="h6"
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
              color="primary"
            >
              {allPhotos ? "Images" : currentItemSelected.itemTitle}
            </Typography>
          </div>
          <SimpleSlider
            images={allPhotos ? allImages : currentItemSelected.images}
          />
        </div>
      </ThemeProvider>
    </Html>
  );
}
