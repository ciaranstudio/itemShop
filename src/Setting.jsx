import { Sky } from "@react-three/drei";
import Lights from "./Lights";
// import RoomPanels from "./RoomPanels";

export default function Setting(props) {
  return (
    <>
      <Lights />
      <Sky
        distance={1000}
        sunPosition={[-70, 10000, 100]}
        inclination={0}
        azimuth={0.25}
      />
      {/* <RoomPanels /> */}
      {/* <Environment preset="dawn" /> */}
      {/* <SoftShadows size={25} samples={8} focus={0.85} /> */}
    </>
  );
}
