import { Leva } from "leva";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SnipcartProvider } from "use-snipcart";
import { Toaster } from "react-hot-toast";
import ResponsiveAppBar from "./components/interface/header/AppBar.jsx";
import Experience from "./components/Experience.jsx";
import { createTheme } from "@mui/material";
import { DashContextProvider } from "./context/ViewContext";

function App() {
  const theme = createTheme({
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

  return (
    <>
      <DashContextProvider>
        <Toaster reverseOrder={true} />
        <SnipcartProvider>
          <ResponsiveAppBar theme={theme} />
          {/* <ResponsiveBottomBar theme={theme} /> */}
          <Experience theme={theme} />
        </SnipcartProvider>
        <div id="footer">Eli Gfell Studio</div>
      </DashContextProvider>
      {/* <div className="bottom-B-test">
        color options toggle, info button, open / close parts
      </div> */}
      {/* <div className="bottom-A-test">
        item select, buy button, shuffle button / select
      </div> */}
    </>
  );
}

export default App;
