import React from "react";
import { Html } from "@react-three/drei";
import ImagesRouter from "./ImagesRouter.jsx";

export default function HtmlOutlet({ theme }) {
  return (
    <Html center position={[0, 0, 0]}>
      <ImagesRouter theme={theme} />
    </Html>
  );
}
