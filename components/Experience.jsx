import { useFrame } from "@react-three/fiber";
import { Clickbox } from "./Clickbox";
import { easing } from "maath";
import * as THREE from "three";
import BoxUI from "./BoxUI";
// import BoxUI from "./BoxUI";
import { useRef, useState, useEffect } from "react";
const Experience = ({ groupRef }) => {
  const clicked = useRef();
  const cameraRef = useRef();
  const [active, setActive] = useState(-1);
  const [cubes, setCubes] = useState([
    [0, 0, -3],
    [3, 0, -3],
  ]);

  const handleActive = (e, index) => {
    clicked.current = groupRef.current.getObjectByName(index);
    console.log(cubes);

    if (clicked.current !== undefined) {
      setActive(index);
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(
        cameraRef.current.set(
          clicked.current.position.x,
          clicked.current.position.y,
          1.85,
        ),
      );
    } else {
      setActive(-1);
      cameraRef.current.set(0, 0, 5.5);
    }
  };
  useEffect(() => {
    cameraRef.current = new THREE.Vector3(0, 0, 5.5);
  }, []);

  useFrame((state, delta) => {
    if (cameraRef.current !== undefined) {
      easing.damp3(state.camera.position, cameraRef.current, 0.3, delta);
    }
  });
  return (
    <>
      {/* <OrbitControls ref={controls} minPolarAngle={Math.PI / 2} zoom={false} maxPolarAngle={Math.PI / 2} /> */}
      <group ref={groupRef}>
        {cubes.map((cubePos, index) => {
          return (
            <Clickbox
              name={index}
              key={index}
              cubes={cubes}
              setCubes={setCubes}
              position={cubePos}
              clicked={clicked.current}
              onClick={(e) => (e.stopPropagation(), handleActive(e, index))}
              onPointerMissed={(e) => handleActive(e, null)}
              active={active}
            ></Clickbox>
          );
        })}
      </group>
    </>
  );
};

export default Experience;
