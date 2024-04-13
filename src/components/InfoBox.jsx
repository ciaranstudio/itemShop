import { Html } from "@react-three/drei";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import IconButton from "@mui/material/IconButton";
import { ReportGmailerrorred } from "@mui/icons-material";

export default function InfoBox({
  item,
  // currentItemSelected,
  toggleInfoBox,
  open,
  theme,
  aboutInfo,
  mobileView,
  openUserEmail,
}) {
  const aboutText = "About text...";

  // const openUserEmail = (e) => {
  //   if (e) {
  //     e.preventDefault();
  //     // e.stopPropagation();
  //   }
  //   const email = "eliwgfell@gmail.com";
  //   const subject = "Contact from shop";
  //   const emailBody = "Yeah yeah yeah...";

  //   document.location =
  //     "mailto:" + email + "?subject=" + subject + "&body=" + emailBody;
  // };

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
      // Set up a breakpoint for SE width < 390, and one for if width > 390, bring in useWindow for width and height of screen from OptionBox above
      // wait to see how long this element gets with incoming product specifications and disclaimer, TBD height necessary for div - 04/11/2024
      position={[0, 58, 0]} // when ArrowIcon position Y was -0.3: [0, 80, 0]
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
              color="success"
            />
          </IconButton>
          <div id="title">
            <Typography
              variant="h6"
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
              color="primary"
            >
              {aboutInfo ? "About" : item.itemTitle}
            </Typography>
          </div>
          <div id="description">
            <Typography
              variant="subtitle2"
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
              color="primary"
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
              color="primary"
              sx={{
                fontFamily: "var(--leva-fonts-mono)",
                // borderColor: aboutInfo ? "transparent" : "lightGrey",
                // border: aboutInfo ? "0px solid lightGrey" : "0",
              }}
            >
              {aboutInfo ? "" : item.size}
            </Typography>
          </div>
          <IconButton
            onClick={(e) => openUserEmail(e)}
            color="inherit"
            sx={{
              display: aboutInfo ? "block" : "none",
              position: "absolute",
              pointerEvents: "auto",
              top: "0.15rem",
              right: "0.2rem",
              padding: "0.5rem",
            }}
            aria-label="contact by email"
          >
            <MailOutlineIcon
              // fontSize="medium"
              // sx={{ color: "primary.light" }}
              color="info"
            />
          </IconButton>
        </div>
      </ThemeProvider>
    </Html>
  );
}
