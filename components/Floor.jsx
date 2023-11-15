import { MeshReflectorMaterial } from "@react-three/drei";

export default function Floor(){
  return(
    <group position={[0, -1.5, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <ambientLight intensity={0.7} />
            <spotLight
              intensity={2.5}
              angle={2.1}
              penumbra={1}
              position={[10, 15, 10]}
              castShadow
            />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={80}
              roughness={1}
              depthScale={1.8}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#050505"
              metalness={0.2}
            />
          </mesh>
        </group>
  )
}