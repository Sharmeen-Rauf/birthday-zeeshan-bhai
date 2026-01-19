'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshStandardMaterial } from 'three';
import * as THREE from 'three';

function Candle({ position }: { position: [number, number, number] }) {
  const candleRef = useRef<Mesh>(null);
  const flameRef = useRef<Mesh>(null);
  const flameMaterialRef = useRef<MeshStandardMaterial>(null);

  // Flickering flame animation
  useFrame((state) => {
    if (flameRef.current) {
      const time = state.clock.elapsedTime;
      flameRef.current.scale.x = 1 + Math.sin(time * 10) * 0.1;
      flameRef.current.scale.y = 1 + Math.sin(time * 8) * 0.15;
      flameRef.current.scale.z = 1 + Math.sin(time * 12) * 0.1;
      flameRef.current.rotation.z = Math.sin(time * 5) * 0.1;
    }
    if (flameMaterialRef.current) {
      const time = state.clock.elapsedTime;
      const intensity = 0.8 + Math.sin(time * 10) * 0.2;
      flameMaterialRef.current.emissiveIntensity = intensity;
    }
  });

  return (
    <group position={position}>
      {/* Candle body */}
      <mesh ref={candleRef} position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Flame */}
      <mesh ref={flameRef} position={[0, 0.65, 0]}>
        <coneGeometry args={[0.03, 0.15, 8]} />
        <meshStandardMaterial
          ref={flameMaterialRef}
          color="#ff6b35"
          emissive="#ff6b35"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

export default function BirthdayCake() {
  const cakeRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (cakeRef.current) {
      cakeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const cakeLayers = useMemo(() => [
    { position: [0, 0, 0] as [number, number, number], radius: 0.8, height: 0.3, color: '#f4a261' },
    { position: [0, 0.35, 0] as [number, number, number], radius: 0.7, height: 0.3, color: '#e76f51' },
    { position: [0, 0.7, 0] as [number, number, number], radius: 0.6, height: 0.3, color: '#264653' },
  ], []);

  const candlePositions: [number, number, number][] = useMemo(() => [
    [-0.2, 1.1, 0.2],
    [0, 1.1, 0.2],
    [0.2, 1.1, 0.2],
  ], []);

  return (
    <group>
      {/* Cake layers */}
      {cakeLayers.map((layer, index) => (
        <mesh
          key={index}
          ref={index === 0 ? cakeRef : undefined}
          position={layer.position}
        >
          <cylinderGeometry args={[layer.radius, layer.radius, layer.height, 32]} />
          <meshStandardMaterial color={layer.color} />
        </mesh>
      ))}
      
      {/* Candles */}
      {candlePositions.map((pos, index) => (
        <Candle key={index} position={pos} />
      ))}
      
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />
      <directionalLight position={[0, 5, 0]} intensity={0.5} />
    </group>
  );
}
