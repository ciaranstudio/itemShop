import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
// import { useGLTF } from "@react-three/drei";

export default function Placeholder() {
  // const { scene, nodes, materials } = useGLTF("./models/bag.gltf");

  const boxRef = useRef();

  // const loadingBarElement = document.querySelector(".loading-bar");
  // const { active, progress, errors, item, loaded, total } = useProgress();
  // const overlayOpacity = { value: 1 };
  // const [overlayAlpha, setOverlayAlpha] = useState(1);
  // const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
  // const overlayMaterial = new THREE.ShaderMaterial({
  //   transparent: true,
  //   uniforms: {
  //     uAlpha: { value: overlayAlpha },
  //   },
  //   vertexShader: `
  //       void main()
  //       {
  //           gl_Position = vec4(position, 1.0);
  //       }
  //   `,
  //   fragmentShader: `
  //       uniform float uAlpha;

  //       void main()
  //       {
  //           gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
  //       }
  //   `,
  // });

  // useEffect(() => {
  //   loadingBarElement.style.transform = `scaleX(${progress / 100})`;
  // if (progress > 99) {
  //   window.setTimeout(() => {
  //     // Animate overlay
  //     gsap.to(overlayOpacity, {
  //       duration: 3,
  //       value: 0,
  //       delay: 1,
  //       onUpdate: () => {
  //         setOverlayAlpha(overlayOpacity.value);
  //       },
  //     });
  //     // Update loadingBarElement
  //     loadingBarElement.classList.add("ended");
  //     loadingBarElement.style.transform = "";
  // }, 500);
  // }
  // }, [progress]);

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    boxRef.current.rotation.y = angle / 2;
  });

  return (
    <>
      {/* <color args={["#000000"]} attach="background" /> */}
      {/* <mesh geometry={overlayGeometry} material={overlayMaterial}></mesh> */}
      {/* <mesh position={[0, 0, 0]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[130, 130, 16, 16]} />
        <meshBasicMaterial color="darkGreen" wireframe />
      </mesh> */}
      <mesh ref={boxRef} position={[0, 0.65, 0]}>
        {/* <boxGeometry args={[150, 90, 150, 8, 8, 8]} /> */}
        <boxGeometry args={[0.5, 0.5, 0.5, 3, 3, 3]} />
        {/* <primitive object={scene} />; */}
        <meshBasicMaterial wireframe />
      </mesh>
    </>
  );
}
