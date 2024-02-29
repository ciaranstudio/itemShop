import {
  Sky,
  // Environment
} from "@react-three/drei";
import Lights from "./Lights";
// import RoomPanels from "./RoomPanels";

export default function Setting(props) {
  // const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
  //   useControls("environment map", {
  //     envMapIntensity: { value: 7, min: 0, max: 12 },
  //     envMapHeight: { value: 7, min: 0, max: 100 },
  //     envMapRadius: { value: 28, min: 10, max: 1000 },
  //     envMapScale: { value: 100, min: 10, max: 1000 },
  //   });
  return (
    <>
      <Lights />
      <Sky
        distance={4000000}
        sunPosition={[1.5, 2, -10]}
        // inclination={1}
        // azimuth={0.85}
      />
      {/* <Environment
        background
        preset="sunset"
        // resolution={32}
      ></Environment> */}
      {/* <RoomPanels /> */}
      {/* <SoftShadows size={25} samples={8} focus={0.85} /> */}
    </>
  );
}
