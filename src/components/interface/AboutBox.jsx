import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
// import { useOptionStore } from "../../store/useOptionStore.tsx";
import { goTo } from "../../utils/goTo.js";
// import openUserEmail from "../../utils/openUserEmail.js";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { ABOUT_TEXT } from "../../data/constants.js";

export default function AboutBox({ theme }) {
  // state from store
  // const currentItemSelected = useOptionStore(
  //   (state) => state.currentItemSelected,
  // );
  // const open = useOptionStore((state) => state.open);

  // useState
  const [aboutPageToggle, setAboutPageToggle] = useState(false);
  const [aboutIndex, setAboutIndex] = useState(0);

  // useEffect
  useEffect(() => {
    if (aboutPageToggle) {
      if (aboutIndex === ABOUT_TEXT.length - 1) {
        setAboutIndex(0);
      } else {
        setAboutIndex((prev) => prev + 1);
      }
      setAboutPageToggle(false);
    }
  }, [aboutPageToggle]);

  // functions
  const nextPage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setAboutPageToggle(!aboutPageToggle);
  };

  return (
    // <Html center position={[0, 50, 0]}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className="shop-item-description"
        style={{
          // display: open ? "block" : "none",
          paddingBottom: "1rem",
        }}
      >
        <div
          id="title"
          style={{
            color: theme.palette.info.main,
          }}
        >
          <IconButton
            onClick={(e) => goTo("/")}
            color="inherit"
            sx={{
              position: "absolute",
              pointerEvents: "auto",
              top: -3,
              left: 0,
              padding: "0.5rem",
            }}
            aria-label="close info box"
          >
            <CloseOutlinedIcon color="info" fontSize={"small"} />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "var(--leva-fonts-mono)",
              fontSize: "1.125rem",
              mb: 1,
            }}
          >
            ABOUT
          </Typography>
        </div>
        <div id="description" style={{ marginTop: "0.25rem" }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: "var(--leva-fonts-mono)",
              fontSize: "0.82rem",
            }}
            color="prmimary"
          >
            {ABOUT_TEXT[aboutIndex].textA}
          </Typography>
        </div>
        <div
          id="description"
          style={{
            background: "rgb(233, 234, 233)",
            // borderRadius: "2rem",
            border: "2px solid lightGrey",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: "var(--leva-fonts-mono)",
              fontSize: "0.82rem",
              color: theme.palette.primary.main,
            }}
          >
            {ABOUT_TEXT[aboutIndex].textB}
          </Typography>
        </div>
      </div>
      <div className="size">
        <IconButton
          onClick={nextPage}
          color="inherit"
          sx={{
            position: "absolute",
            pointerEvents: "auto",
            bottom: -24,
            // right: "0.5rem",
            right: 0,
            transform: "translate(-50%)",
          }}
          aria-label="next page of About info"
        >
          <ReadMoreIcon color="info" />
        </IconButton>
      </div>
    </ThemeProvider>
    // </Html>
  );
}
