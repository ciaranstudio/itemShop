import controls from "./debugControls";

export default function Lights() {
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
        // shadow-normalBias={0.001}
        // shadow-mapSize-width={1024}
        // shadow-mapSize-height={1024}
        shadow-camera-near={250}
        shadow-camera-far={500}
        shadow-camera-left={-150}
        shadow-camera-bottom={-100}
        shadow-camera-right={150}
        shadow-camera-top={100}
        // target={stoolRef.current}
      ></directionalLight>
      <ambientLight intensity={debugControls.ambientLight} />
      {/* for lighting walls behind main light */}
      {/* <pointLight position={[-50, 60, -50]} intensity={100} />
      <pointLight position={[50, 60, 50]} intensity={100} /> */}
      {/* {/* <pointLight position={[-50, 60, -50]} intensity={100} /> */}
      {/* pointLight to represent dirLight source in scene, to be replaced with light fixture model */}
      {/* <pointLight
        position={[
          debugControls.directionalAposition.x / 2,
          debugControls.directionalAposition.y / 2,
          debugControls.directionalAposition.z / 2,
        ]}
        intensity={1000}
      /> */}
      {/* <directionalLight
        // castShadow
        position={[
          -debugControls.directionalAposition.x,
          debugControls.directionalAposition.y + 100,
          -debugControls.directionalAposition.z,
        ]}
        intensity={debugControls.directionalAintensity / 2}
      /> */}
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
    </>
  );
}
