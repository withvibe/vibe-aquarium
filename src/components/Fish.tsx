"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import type { Fish as FishType } from "@/lib/db";

export default function Fish({ fish }: { fish: FishType }) {
  const group = useRef<THREE.Group>(null);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime * fish.speed + phase;
    // gentle wandering loop around the seeded position
    group.current.position.x = fish.x + Math.cos(t * 0.5) * 1.5;
    group.current.position.y = fish.y + Math.sin(t * 0.7) * 0.4;
    group.current.position.z = fish.z + Math.sin(t * 0.5) * 1.5;
    // face direction of motion
    group.current.rotation.y = Math.atan2(
      -Math.sin(t * 0.5) * 1.5,
      -Math.sin(t * 0.5) * 1.5
    ) + t * 0.5;
  });

  return (
    <group ref={group}>
      {/* body */}
      <mesh>
        <sphereGeometry args={[0.25, 16, 12]} />
        <meshStandardMaterial color={fish.color} />
      </mesh>
      {/* tail */}
      <mesh position={[-0.28, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshStandardMaterial color={fish.color} />
      </mesh>
      {/* eye */}
      <mesh position={[0.18, 0.06, 0.18]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
    </group>
  );
}
