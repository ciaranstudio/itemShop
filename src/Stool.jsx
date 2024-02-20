import React, { useRef, useState, useEffect } from "react";
import { useTexture, useGLTF, Edges } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import controls from "./debugControls";
import { forwardRef } from "react";

export default forwardRef(function Stool(props, ref) {
  const [introComplete, setIntroComplete] = useState(false);
  const { nodes, materials } = useGLTF("/oakStool.glb");
  const debugControls = controls();

  const [
    colorMap,
    displacementMap,
    normalMap,
    metalnessMap,
    roughnessMap,
    aoMap,
  ] = useTexture(props.data.itemTexture);

  const woodMaterial = {
    metalness: debugControls.metalness,
    roughness: debugControls.roughness,
    displacementScale: 0,
    map: colorMap,
    displacementMap: displacementMap,
    normalMap: normalMap,
    metalnessMap: metalnessMap,
    roughnessMap: roughnessMap,
    aoMap: aoMap,
    color: props.data.itemColor,
    wireframe: debugControls.wireframe,
  };

  // const circleEdgeRef = useRef();
  const tableTopPaddingY = 2.25;
  const positionOffset = { value: 0 };
  const verticalOffset = { value: 0 };
  // const totalPositionY = { value: 0 };
  const stoolSpin = { value: 0 };
  const [offset, setOffset] = useState(positionOffset.value);
  const [jumpOffset, setJumpOffset] = useState(verticalOffset.value);
  // const [stoolY, setStoolY] = useState(totalPositionY.value);
  // const [stoolSpinAmount, setStoolSpinAmount] = useState(stoolSpin.value);

  const handleStoolClick = () => {
    props.setOpen(true);
    props.setCurrentItemSelected(props.data);
    props.setCurrentOptionSelected(props.data.optionSelect);
    console.log("handleStoolClick()");
    console.log("setting selectedItem state value to ", props.data);
    if (props.animActive || !introComplete) {
      return;
    } else {
      props.setToggled(!props.toggled);
    }
  };

  // useEffect(() => {
  //   if (props.toggled) {
  //     circleEdgeRef.current.visible = true;
  //   } else {
  //     circleEdgeRef.current.visible = false;
  //   }
  //   console.log("selectedItem: ", props.selectedItem);
  // }, [props.toggled]);

  useEffect(() => {
    setTimeout(() => {
      setIntroComplete(true);
      // props.setToggled(!props.toggled);
    }, "3000");
    return () => {};
  }, []);

  useGSAP(
    () => {
      if (props.toggled && introComplete) {
        if (props.currentItemSelected.itemNo == props.data.itemNo) {
          let tl = gsap.timeline();
          props.setAnimActive(true);

          // tl.to(totalPositionY, {
          //   value: debugControls.positionY,
          //   duration: debugControls.durationDownPositionY,
          //   ease: "expoIn",
          //   onUpdate: () => {
          //     console.log("moving totalPositionY up");
          //     setStoolY(totalPositionY.value);
          //   },
          // });

          tl.to(verticalOffset, {
            value: debugControls.jumpOffset,
            duration: debugControls.jumpUpDuration,
            ease: "expoIn",
            onUpdate: () => {
              setJumpOffset(verticalOffset.value);
            },
          });
          tl.to(positionOffset, {
            value: debugControls.mainOffset,
            duration: debugControls.mainUpDuration,
            ease: "expoIn",
            delay: debugControls.beforeMainUpDelay,
            onUpdate: () => {
              setOffset(positionOffset.value);
            },
          });

          // tl.to(stoolSpin, {
          //   value: debugControls.stoolSpin,
          //   duration: debugControls.stoolSpinDuration,
          //   ease: "easeIn",
          //   onUpdate: () => {
          //     setStoolSpinAmount(stoolSpin.value);
          //   },
          // });
          // tl.to(stoolSpin, {
          //   value: 0,
          //   duration: debugControls.stoolSpinDuration + 0.25,
          //   ease: "easeOut",
          //   onUpdate: () => {
          //     setStoolSpinAmount(stoolSpin.value);
          //   },
          // });

          tl.to(positionOffset, {
            value: 0,
            duration: debugControls.mainDownDuration,
            ease: "expoOut",
            delay: debugControls.afterMainUpDelay,
            onUpdate: () => {
              setOffset(positionOffset.value);
            },
          });
          tl.to(verticalOffset, {
            value: 0,
            duration: debugControls.jumpDownDuration,
            ease: "expoIn",
            delay: debugControls.afterJumpDownDelay,
            onUpdate: () => {
              setJumpOffset(verticalOffset.value);
            },
            onComplete: () => {
              // circleEdgeRef.current.visible = false;
              props.setAnimActive(false);
              props.setToggled(false);
              // props.setOpen(true);
            },
          });

          // tl.to(totalPositionY, {
          //   value: 2,
          //   duration: debugControls.durationUpPositionY,
          //   ease: "expoIn",
          //   onUpdate: () => {
          //     console.log("moving totalPositionY up");
          //     setStoolY(totalPositionY.value);
          //   },
          //   onComplete: () => {
          //     circleEdgeRef.current.visible = false;
          //     props.setAnimActive(false);
          //     props.setToggled(false);
          //     props.setOpen(true);
          //   },
          // });
        }
      }
    },
    [props.toggled],
    true,
  );

  // useLayoutEffect(() => {
  //   Object.assign(materials.Material, {
  //     displacementScale: 0,
  //     map: props.colorMap,
  //     displacementMap: props.displacementMap,
  //     normalMap: props.normalMap,
  //     metalnessMap: props.metalnessMap,
  //     roughnessMap: props.roughnessMap,
  //     aoMap: props.aoMap,
  //     color: props.currentColor,
  //   });

  //   //   metalness: debugControls.metalness,
  //   //   roughness: debugControls.roughness,
  //   //   color: debugControls.stainColor,

  //   //   displacementScale: 0,
  //   //   map: colorMap,
  //   //   displacementMap: displacementMap,
  //   //   normalMap: normalMap,
  //   //   metalnessMap: metalnessMap,
  //   //   roughnessMap: roughnessMap,
  //   //   aoMap: aoMap,
  // }, [
  //   nodes,
  //   materials,
  //   currentColor,
  //   currentTexture,
  //   props.colorMap,
  //   props.normalMap,
  //   props.roughnessMap,
  //   props.metalnessMap,
  // ]);

  return (
    <>
      <group
        {...props}
        dispose={null}
        // position={[0, stoolY, 0]}
        position={props.data.position}
        // rotation={[0, stoolSpinAmount, 0]} // ^
      >
        <group
          position={[-8.26, 0 + offset * 2 + jumpOffset, 8.26]}
          scale={1}
          visible={debugControls.visible}
          onClick={handleStoolClick}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.blockA.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[
              0.765,
              16.5 + offset * tableTopPaddingY + offset / 1.5,
              -0.753,
            ]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.blockB.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[
              0.765,
              16.5 + offset * tableTopPaddingY + offset / 1.5,
              -0.753,
            ]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.blockC.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[
              0.765,
              16.5 + offset * tableTopPaddingY + offset / 1.5,
              -0.753,
            ]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.blockD.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[
              0.765,
              16.5 + offset * tableTopPaddingY + offset / 1.5,
              -0.753,
            ]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.legA.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[13 + offset, 0, -9.219]}
            rotation={[0, -1.571, 0]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.legB.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[7.75, 0, -12.969 - offset]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.legC.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[4 - offset, 0, -7.719]}
            rotation={[0, 1.571, 0]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.legD.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[9.25, 0, -3.969 + offset]}
            rotation={[-Math.PI, 0, -Math.PI]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.lowBar.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[7.75, 14.5 + offset, -2.969]}
            // ref={ref}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            ref={ref}
            castShadow
            receiveShadow
            geometry={nodes.tableTop.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[
              0.765,
              16.5 + offset * tableTopPaddingY + offset / 1.5,
              -0.753,
            ]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.topBar.geometry}
            material={materials.VeneerWhiteOakRandomMatched001_2K}
            position={[3, 16.5 + offset * 2, -7.719]}
            rotation={[Math.PI, -1.571, 0]}
          >
            <meshStandardMaterial {...woodMaterial} />
          </mesh>
        </group>
      </group>
    </>
  );
});

useGLTF.preload("/oakStool.glb");
