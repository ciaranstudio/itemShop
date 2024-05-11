import { Html } from "@react-three/drei";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import SimpleSlider from "./SimpleSlider.jsx";
import { allImages } from "../../data/objects.jsx";
import { useOptionStore } from "../../store/useOptionStore.tsx";

export default function PhotoBox({ togglePhotoBox, theme }) {
  // state from store
  const currentItemSelected = useOptionStore(
    (state) => state.currentItemSelected,
  );
  const showPhotos = useOptionStore((state) => state.showPhotos);
  const allPhotos = useOptionStore((state) => state.allPhotos);

  return (
    <Html center position={[0, 50, 0]}>
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
            aria-label="close photo box"
          >
            <CloseOutlinedIcon color="success" />
          </IconButton>
          <div
            id="title"
            style={{
              color: theme.palette.secondary.main,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "var(--leva-fonts-mono)",
                fontSize: "0.9rem",
              }}
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
