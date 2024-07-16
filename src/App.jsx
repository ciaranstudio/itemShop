import { Leva } from "leva";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SnipcartProvider } from "use-snipcart";
import { Toaster } from "react-hot-toast";
import ResponsiveAppBar from "./components/interface/navMenu/AppBar.jsx";
import Experience from "./components/Experience.jsx";
import { theme } from "./data/theme.js";
import { DashContextProvider } from "./context/ViewContext";

function App() {
  return (
    <>
      <DashContextProvider>
        <Toaster reverseOrder={true} />
        <SnipcartProvider>
          <ResponsiveAppBar theme={theme} />
          <Experience theme={theme} />
        </SnipcartProvider>
        <div id="footer">Eli Gfell Studio</div>
      </DashContextProvider>
    </>
  );
}

export default App;
