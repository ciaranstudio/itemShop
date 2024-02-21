import controls from "./debugControls";

export default function Lights(props) {
  const debugControls = controls();

  return (
    <>
      <directionalLight
        castShadow
        position={[
          debugControls.directionalAposition.x,
          debugControls.directionalAposition.y,
          debugControls.directionalAposition.z,
        ]}
        intensity={debugControls.directionalAintensity}
        shadow-normalBias={0.04}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={40}
        shadow-camera-far={210}
        shadow-camera-left={-30}
        shadow-camera-bottom={-30}
        shadow-camera-right={30}
        shadow-camera-top={35}
        // target={stoolRef.current}
      >
        {/* <orthographicCamera ref={shadowCameraRef} attach="shadow-camera" /> */}
      </directionalLight>

      {/* second light in opposite x-position to interior left wall of room */}
      {/* <directionalLight
        castShadow
        position={[
          -debugControls.directionalAposition.x / 2,
          debugControls.directionalAposition.y,
          debugControls.directionalAposition.z,
        ]}
        intensity={debugControls.directionalAintensity}
        shadow-normalBias={0.04}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={40}
        shadow-camera-far={180}
        shadow-camera-left={-20}
        shadow-camera-bottom={-30}
        shadow-camera-right={20}
        shadow-camera-top={35}
        // target={stoolRef.current}
      ></directionalLight> */}
      <ambientLight intensity={debugControls.ambientLight} />
    </>
  );
}
