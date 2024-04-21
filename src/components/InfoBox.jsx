import { Html } from "@react-three/drei";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import IconButton from "@mui/material/IconButton";
import { useOptionStore } from "../store/useOptionStore.tsx";

export default function InfoBox({ toggleInfoBox, theme, openUserEmail }) {
  const aboutText = `This shop is meant to be an experimental and collaborative space. My designs are conceptually playful but functional and accessible.`;
  const aboutTextB = `Each piece is a unique artwork designed with utility and versatility in mind.`;

  const aboutText1 = `This deliberately humble furniture line is available in fully interchangeable, customizable paints and finishes.`;
  const aboutText1B = `Every design is built to last and made by hand at my studio in Cleveland, OH.`;

  const aboutText2 = `I use locally sawn white and red oak finished with hardwax oil for stained components. Painted components are made from poplar and MDO coated with vegan milk paint.`;
  const aboutText2B = `We\’re a small family-run operation and everything is made to order. Customers can expect lead times of 6-8 weeks for most orders.`;

  const aboutText3 = `We communicate at each stage of the process from design to production to shipping.`;
  const aboutText3B = `We work with care and precision, but value character over perfection.`;

  const aboutText4 = `Feel free to reach out to me with any questions, inquiries or ideas. I\’m always happy to discuss custom design work.`;
  const aboutText4B = `My team also provides custom wood working, finish carpentry, cabinetry, painting, art handling and consultation services for the greater Cleveland, OH area.`;

  // state from store
  const currentItemSelected = useOptionStore(
    (state) => state.currentItemSelected,
  );
  const open = useOptionStore((state) => state.open);
  const aboutInfo = useOptionStore((state) => state.aboutInfo);

  return (
    <Html center position={[0, 50, 0]}>
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
            sx={{
              position: "absolute",
              pointerEvents: "auto",
              top: "0.15rem",
              left: "0.15rem",
              padding: "0.5rem",
            }}
            aria-label="close info box"
          >
            <CloseOutlinedIcon color="success" />
          </IconButton>
          <div
            id="title"
            style={{
              color: aboutInfo
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "var(--leva-fonts-mono)",
                fontSize: aboutInfo ? "1rem" : "1.125rem",
              }}
            >
              {aboutInfo ? "About" : currentItemSelected.itemTitle}
            </Typography>
          </div>
          <div
            id="description"
            style={{ marginTop: aboutText ? "0.5rem" : "0.25rem" }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: "var(--leva-fonts-mono)",
                fontSize: aboutInfo ? ".78rem" : "0.82rem",
              }}
              color="prmimary"
            >
              {aboutInfo ? aboutText : currentItemSelected.itemLongDescription}
            </Typography>
          </div>
          <div
            id="size"
            // style={{ display: aboutInfo ? "none" : "block" }}
            style={{
              background: aboutInfo ? "lightGrey" : "transparent",
              borderRadius: aboutInfo ? "1rem" : "2rem",
              border: aboutInfo ? "none" : "2px solid lightGrey",
              padding: aboutInfo ? "0.85rem" : "0.25rem",
              marginTop: aboutInfo ? "0.5rem" : "0.75rem",
            }}
          >
            <Typography
              variant="subtitle2"
              color="primary"
              sx={{
                fontFamily: "var(--leva-fonts-mono)",
                fontSize: aboutInfo ? ".78rem" : "0.82rem",
              }}
            >
              {aboutInfo ? aboutTextB : currentItemSelected.size}
            </Typography>
          </div>
          <IconButton
            // onClick={(e) => openUserEmail(e)}
            onClick={(e) => {
              // set aboutText and aboutTextB values to next page (if end of pages length, then back to index 0)
              console.log(e);
            }}
            color="inherit"
            sx={{
              display: aboutInfo ? "block" : "none",
              position: "absolute",
              pointerEvents: "auto",
              top: "0.25rem",
              right: "0.5rem",
              padding: "0.5rem",
            }}
            aria-label="contact by email"
          >
            <ReadMoreIcon color="secondary" />
          </IconButton>
        </div>
      </ThemeProvider>
    </Html>
  );
}
