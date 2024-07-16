import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#17385b", // "#373737"
      light: "#bdbdbd",
    },
    secondary: {
      main: "#636363",
      light: "#E0E0E0",
    },
    success: {
      main: "#929d84",
      light: "#c8cec1",
    },
    info: { main: "#ffffff" },
    warning: { main: "#BDBDBD" },
    error: { main: "#d3d3d3" },
  },
  shadows: Array(25).fill("none"),
});
