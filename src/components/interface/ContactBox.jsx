import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import { goTo } from "../../utils/goTo.js";
import openUserEmail from "../../utils/openUserEmail.js";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { theme } from "../../data/theme.js";

export default function ContactBox() {
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
            onClick={() => goTo("/")}
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
              fontSize: "1.125rem",
              mb: 1,
            }}
          >
            CONTACT
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
            10252 Berea Rd Cleveland OH 44102
          </Typography>
        </div>
        <div
          id="description"
          style={{
            background: "rgb(233, 234, 233)",
            borderRadius: "2rem",
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
            eligfellstudio@gmail.com
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: "0.82rem",
              color: theme.palette.primary.main,
            }}
          >
            330-524-7748
          </Typography>
        </div>
      </div>
      <div className="size">
        <IconButton
          onClick={openUserEmail}
          color="inherit"
          sx={{
            position: "absolute",
            pointerEvents: "auto",
            bottom: -24,
            left: "50%",
            transform: "translate(-50%)",
          }}
          aria-label="contact by email"
        >
          <EmailOutlinedIcon color="info" />
        </IconButton>
      </div>
    </ThemeProvider>
  );
}
