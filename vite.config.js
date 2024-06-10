import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const isCodeSandbox =
  "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env;

export default {
  plugins: [react(), svgr()],
  root: "src/",
  publicDir: "../public/",
  base: "./",
  server: {
    host: true,
    open: !isCodeSandbox, // Open if it's not a CodeSandbox
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: false,
  },
};
