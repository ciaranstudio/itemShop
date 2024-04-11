import { Html } from "@react-three/drei";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";

export default function InfoBox({
  item,
  // currentItemSelected,
  toggleInfoBox,
  open,
  theme,
  aboutInfo,
}) {
  const aboutText = "About text...";
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
      position={[0, 80, 0]}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
              // sx={{ color: "primary.light" }}
              color="secondary"
            />
          </IconButton>
          <div id="title">
            <Typography
              variant="h6"
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
            >
              {aboutInfo ? "About" : item.itemTitle}
            </Typography>
          </div>
          <div id="description">
            <Typography
              variant="subtitle2"
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
            >
              {aboutInfo ? aboutText : item.itemLongDescription}
            </Typography>
          </div>
          <div
            id="size"
            // style={{ borderColor: aboutInfo ? "transparent" : "lightGrey" }}
            style={{ display: aboutInfo ? "none" : "block" }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: "var(--leva-fonts-mono)",
                // borderColor: aboutInfo ? "transparent" : "lightGrey",
                // border: aboutInfo ? "0px solid lightGrey" : "0",
              }}
            >
              {aboutInfo ? "" : item.size}
            </Typography>
          </div>
        </div>
      </ThemeProvider>
    </Html>
  );
}
