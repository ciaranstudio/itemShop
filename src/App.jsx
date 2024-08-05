import { Leva } from "leva";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SnipcartProvider } from "use-snipcart";
import { Toaster } from "react-hot-toast";
import ResponsiveAppBar from "./components/interface/navMenu/AppBar.jsx";
import Experience from "./components/Experience.jsx";
import { DashContextProvider } from "./context/ViewContext";
import { useOptionStore } from "./store/useOptionStore.tsx";

function App() {
  const open = useOptionStore((state) => state.open);
  return (
    <>
      <DashContextProvider>
        <Toaster reverseOrder={true} />
        <SnipcartProvider>
          <ResponsiveAppBar />
          <Experience />
        </SnipcartProvider>
        <div id="footer" style={{ display: open ? "none" : "block" }}>
          Eli Gfell Studio
        </div>
      </DashContextProvider>
    </>
  );
}

export default App;
