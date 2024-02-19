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
        shadow-camera-far={150}
        shadow-camera-left={-40}
        shadow-camera-bottom={-30}
        shadow-camera-right={40}
        shadow-camera-top={35}
        // target={stoolRef.current}
      >
        {/* <orthographicCamera ref={shadowCameraRef} attach="shadow-camera" /> */}
      </directionalLight>
      <ambientLight intensity={debugControls.ambientLight} />
    </>
  );
}
