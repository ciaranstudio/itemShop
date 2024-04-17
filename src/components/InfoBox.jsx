import { Html } from "@react-three/drei";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import IconButton from "@mui/material/IconButton";
// import { ReportGmailerrorred } from "@mui/icons-material";
import { useOptionStore } from "../store/useOptionStore.tsx";

export default function InfoBox({
  // item,
  // currentItemSelected,
  toggleInfoBox,
  // open,
  theme,
  // aboutInfo,
  // mobileView,
  openUserEmail,
}) {
  const aboutText = "About text...";

  const currentItemSelected = useOptionStore(
    (state) => state.currentItemSelected,
  );
  const setCurrentItemSelected = useOptionStore(
    (state) => state.setCurrentItemSelected,
  );

  // const previousItemSelected = useOptionStore(
  //   (state) => state.previousItemSelected,
  // );
  // const setPreviousItemSelected = useOptionStore((state) => state.setPreviousItemSelected);

  // const currentPartName = useOptionStore(
  //   (state) => state.currentPartName,
  // );
  // const setCurrentPartName = useOptionStore((state) => state.setCurrentPartName);

  // const currentItemName = useOptionStore(
  //   (state) => state.currentItemName,
  // );
  // const setCurrentItemName = useOptionStore((state) => state.setCurrentItemName);

  const mobileView = useOptionStore((state) => state.mobileView);
  const setMobileView = useOptionStore((state) => state.setMobileView);

  const open = useOptionStore((state) => state.open);
  const setOpen = useOptionStore((state) => state.setOpen);

  // const showPhotos = useOptionStore((state) => state.showPhotos);
  // const setShowPhotos = useOptionStore((state) => state.setShowPhotos);

  // const allPhotos = useOptionStore((state) => state.allPhotos);
  // const setAllPhotos = useOptionStore((state) => state.setAllPhotos);

  const aboutInfo = useOptionStore((state) => state.aboutInfo);
  const setAboutInfo = useOptionStore((state) => state.setAboutInfo);

  // const optionBoxHeightMin = useOptionStore((state) => state.optionBoxHeightMin);
  // const setOptionBoxHeightMin = useOptionStore((state) => state.setOptionBoxHeightMin);

  // const showBackground = useOptionStore((state) => state.showBackground);
  // const setShowBackground = useOptionStore((state) => state.setShowBackground);

  // const showPartOptions = useOptionStore((state) => state.showPartOptions);
  // const setShowPartOptions = useOptionStore((state) => state.setShowPartOptions);

  // const optionBoxItemChanged = useOptionStore(
  //   (state) => state.optionBoxItemChanged,
  // );
  // const setOptionBoxItemChanged = useOptionStore((state) => state.setOptionBoxItemChanged);

  // const optionBoxItemToggle = useOptionStore(
  //   (state) => state.optionBoxItemToggle,
  // );
  // const setOptionBoxItemToggle = useOptionStore((state) => state.setOptionBoxItemToggle);

  // const animToggled = useOptionStore((state) => state.animToggled);
  // const setAnimToggled = useOptionStore((state) => state.setAnimToggled);

  // const animActive = useOptionStore((state) => state.animActive);
  // const setAnimActive = useOptionStore((state) => state.setAnimActive);

  // const activeCamPosAnim = useOptionStore((state) => state.activeCamPosAnim);
  // const setActiveCamPosAnim = useOptionStore((state) => state.setActiveCamPosAnim);

  // const activeCamTargAnim = useOptionStore((state) => state.activeCamTargAnim);
  // const setActiveCamTargAnim = useOptionStore((state) => state.setActiveCamTargAnim);

  // const activeCamAnim = useOptionStore((state) => state.activeCamAnim);
  // const setActiveCamAnim = useOptionStore((state) => state.setActiveCamAnim);

  // const partsOpen = useOptionStore((state) => state.partsOpen);
  // const setPartsOpen = useOptionStore((state) => state.setPartsOpen);

  // const animIconToggle = useOptionStore((state) => state.animIconToggle);
  // const setAnimIconToggle = useOptionStore((state) => state.setAnimIconToggle);

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
              {aboutInfo ? "About" : currentItemSelected.itemTitle}
            </Typography>
          </div>
          <div id="description">
            <Typography
              variant="subtitle2"
              sx={{ fontFamily: "var(--leva-fonts-mono)" }}
              color="primary"
            >
              {aboutInfo ? aboutText : currentItemSelected.itemLongDescription}
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
              {aboutInfo ? "" : currentItemSelected.size}
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
