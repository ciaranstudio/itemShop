import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// import { defineConfig, loadEnv } from "vite";

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

// const isCodeSandbox =
//   "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env;

// export default defineConfig(({ command, mode }) => {
//   // Load env file based on `mode` in the current working directory.
//   // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
//   const env = loadEnv(mode, process.cwd(), "");
//   return {
//     // vite config
//     define: {
//       __APP_ENV__: JSON.stringify(env.APP_ENV),
//     },
//     plugins: [react(), svgr()],
//     root: "src/",
//     publicDir: "../public/",
//     base: "./",
//     server: {
//       host: true,
//       open: !isCodeSandbox, // Open if it's not a CodeSandbox
//     },
//     build: {
//       outDir: "../dist",
//       emptyOutDir: true,
//       sourcemap: false,
//     },
//   };
// });
