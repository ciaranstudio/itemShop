import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import { goTo } from "../../utils/goTo.js";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { ABOUT_TEXT } from "../../data/constants.js";
import { theme } from "../../data/theme.js";

export default function AboutBox() {
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className="shop-item-description"
        style={{
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
            <CloseOutlinedIcon color="primary" fontSize={"small"} />
          </IconButton>
          <IconButton
            onClick={nextPage}
            color="inherit"
            sx={{
              position: "absolute",
              pointerEvents: "auto",
              top: -3,
              right: 0,
              padding: "0.5rem",
            }}
            aria-label="next page of About info"
          >
            <ReadMoreIcon color="primary" />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
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
            border: "2px solid lightGrey",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: "0.82rem",
              color: theme.palette.primary.main,
            }}
          >
            {ABOUT_TEXT[aboutIndex].textB}
          </Typography>
        </div>
      </div>
    </ThemeProvider>
  );
}
