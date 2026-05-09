"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Fish from "./Fish";
import type { Fish as FishType } from "@/lib/db";

export default function Aquarium({ fish }: { fish: FishType[] }) {
  return (
    <Canvas camera={{ position: [0, 1, 7], fov: 55 }}>
      <color attach="background" args={["#0a3d62"]} />
      <fog attach="fog" args={["#0a3d62", 6, 18]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 2]} intensity={1.2} color="#bde0ff" />
      <pointLight position={[0, -3, 0]} intensity={0.4} color="#1e90ff" />

      {/* sandy floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#d4b483" />
      </mesh>

      {fish.map((f) => (
        <Fish key={f.id} fish={f} />
      ))}

      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={12}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}
