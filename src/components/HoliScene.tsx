"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef, useState } from "react";

function ExplosionParticles({ trigger }: { trigger: number }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const count = 3000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;
    }
    return pos;
  }, []);

  const velocities = useMemo(() => {
    const vel = [];
    for (let i = 0; i < count; i++) {
      vel.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 5
        )
      );
    }
    return vel;
  }, []);

  useFrame(() => {
    if (!ref.current) return;

    const positionsArray = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      positionsArray[i * 3] += velocities[i].x * 0.01;
      positionsArray[i * 3 + 1] += velocities[i].y * 0.01;
      positionsArray[i * 3 + 2] += velocities[i].z * 0.01;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  // Reset particles when triggered
  useMemo(() => {
    if (!ref.current) return;
    const positionsArray = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      positionsArray[i * 3] = 0;
      positionsArray[i * 3 + 1] = 0;
      positionsArray[i * 3 + 2] = 0;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color={"#ff4d6d"}
        size={0.08}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export default function HoliScene() {
  const [trigger, setTrigger] = useState(0);

  return (
    <div
      className="absolute inset-0 z-0"
      onClick={() => setTrigger((prev) => prev + 1)}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ExplosionParticles trigger={trigger} />
      </Canvas>
    </div>
  );
}
