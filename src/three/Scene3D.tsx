import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function GlassShape() {
  const mesh = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.12;
      mesh.current.rotation.y += delta * 0.2;
      mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.08;
    }
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -state.pointer.y * 0.3, 4, delta);
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, state.pointer.x * 0.4, 4, delta);
    }
  });
  return <group ref={group}>
    <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.25}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.35, 1]} />
        <MeshTransmissionMaterial backside samples={4} thickness={0.35} roughness={0.16} transmission={0.88} ior={1.25} chromaticAberration={0.04} color="#a7b7ff" />
      </mesh>
      <mesh scale={1.55}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#718bff" wireframe transparent opacity={0.24} />
      </mesh>
    </Float>
  </group>;
}

export default function Scene3D() {
  return <Canvas
    camera={{ position: [0, 0, 5], fov: 42 }}
    dpr={[1, 1.5]}
    gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    fallback={<div className="canvas-fallback" />}
  >
    <ambientLight intensity={1.1} />
    <pointLight position={[4, 3, 4]} intensity={35} color="#8ba0ff" />
    <pointLight position={[-4, -2, 1]} intensity={18} color="#b58aff" />
    <GlassShape />
    <Sparkles count={35} scale={5} size={1.7} speed={0.25} opacity={0.6} color="#b8c4ff" />
  </Canvas>;
}