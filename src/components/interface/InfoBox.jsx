import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import IconButton from "@mui/material/IconButton";
import { useOptionStore } from "../../store/useOptionStore.tsx";
import { allImages } from "../../data/objects.jsx";

export default function InfoBox({ toggleInfoBox, theme }) {
  // infobox Y axis position for drei Html component
  // const htmlPosY = 50;
  const htmlPosY = 0;
  // about text blocks
  const aboutTextArr = [
    {
      id: 0,
      textA: `This shop is meant to be an experimental and collaborative space. My designs are conceptually playful but functional and accessible.`,
      textB: `Each piece is a unique artwork designed with utility and versatility in mind.`,
    },
    {
      id: 1,
      textA: `This deliberately humble furniture line is available in fully interchangeable, customizable paints and finishes.`,
      textB: `Every design is built to last and made by hand at my studio in Cleveland, OH.`,
    },
    {
      id: 2,
      textA: `I use locally sawn white and red oak finished with hardwax oil for stained components. Painted components are made from poplar and MDO coated with vegan milk paint.`,
      textB: `We\’re a small family-run operation and everything is made to order. Customers can expect lead times of 6-8 weeks for most orders.`,
    },
    {
      id: 3,
      textA: `We communicate at each stage of the process from design to production to shipping.`,
      textB: `We work with care and precision, but value character over perfection.`,
    },
    {
      id: 4,
      textA: `Feel free to reach out to me with any questions, inquiries or ideas. I\’m always happy to discuss custom design work.`,
      textB: `My team also provides custom wood working, finish carpentry, cabinetry, painting, art handling and consultation services for the greater Cleveland, OH area.`,
    },
  ];

  // useState
  const [aboutPageToggle, setAboutPageToggle] = useState(false);
  const [aboutIndex, setAboutIndex] = useState(0);

  // state from store
  const currentItemSelected = useOptionStore(
    (state) => state.currentItemSelected,
  );
  const open = useOptionStore((state) => state.open);
  const aboutInfo = useOptionStore((state) => state.aboutInfo);

  // useEffect
  useEffect(() => {
    let nextIndex;
    if (aboutIndex === 4) {
      nextIndex = 0;
    } else {
      nextIndex = aboutIndex + 1;
    }
    setAboutIndex(nextIndex);
  }, [aboutPageToggle]);

  // functions
  const nextPage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setAboutPageToggle(!aboutPageToggle);
  };

  const gridCells = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];

  return (
    <Html center position={[0, htmlPosY, 0]}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div
          className="info"
          style={{
            display: open ? "block" : "none",
            paddingBottom: aboutInfo ? "2.75rem" : "1rem",
            overflow: "auto",
            pointerEvents: "auto",
          }}
        >
          {/* <div
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
          </div> */}
          {/* <div
            id="description"
            style={{ marginTop: aboutInfo ? "0.75rem" : "0.25rem" }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: "var(--leva-fonts-mono)",
                fontSize: aboutInfo ? ".75rem" : "0.82rem",
              }}
              color="prmimary"
            >
              {aboutInfo
                ? aboutTextArr[aboutIndex].textA
                : currentItemSelected.itemLongDescription}
            </Typography>
          </div>
          <div
            id="size"
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
                fontSize: aboutInfo ? ".75rem" : "0.82rem",
              }}
            >
              {aboutInfo
                ? aboutTextArr[aboutIndex].textB
                : currentItemSelected.size}
            </Typography>
          </div> */}

          {/* <div className="size">
            <div>
              <IconButton
                onClick={(e) => nextPage(e)}
                color="inherit"
                sx={{
                  display: aboutInfo ? "block" : "none",
                  position: "absolute",
                  pointerEvents: "auto",
                  bottom: 0,
                  // right: "0.5rem",
                  left: "50%",
                  transform: "translate(-50%)",
                }}
                aria-label="contact by email"
              >
                <ReadMoreIcon color="secondary" />
              </IconButton>
            </div>
          </div> */}

          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
            }}
          >
            <div style={{ position: "sticky", top: 0 }}>
              <IconButton
                onClick={(e) => toggleInfoBox(e)}
                color="inherit"
                sx={{
                  padding: "0.5rem",
                }}
                aria-label="close info box"
              >
                <CloseOutlinedIcon fontSize="small" color="success" />
              </IconButton>
            </div>
          </span>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                sm: "auto auto",
                md: "auto auto auto",
                lg: "auto auto auto auto",
              },
              columnGap: "1rem",
              rowGap: "1rem",
              borderRadius: "0.75rem",
              // border: "0.085rem solid rgb(155, 155, 155)",
              overflow: "auto",
            }}
          >
            {allImages.map((m, index) => {
              return (
                <>
                  <img
                    key={index}
                    style={{ objectFit: "contain", width: "100%" }}
                    src={m.imgPath}
                  ></img>
                </>
              );
            })}
          </Box>
        </div>
      </ThemeProvider>
    </Html>
  );
}
