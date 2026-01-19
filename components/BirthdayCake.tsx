'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshStandardMaterial, PointLight } from 'three';
import * as THREE from 'three';

function Candle({ position }: { position: [number, number, number] }) {
  const candleRef = useRef<Mesh>(null);
  const flameRef = useRef<Mesh>(null);
  const innerFlameRef = useRef<Mesh>(null);
  const flameMaterialRef = useRef<MeshStandardMaterial>(null);
  const innerFlameMaterialRef = useRef<MeshStandardMaterial>(null);
  const lightRef = useRef<PointLight>(null);

  // Enhanced flickering flame animation with glow
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (flameRef.current) {
      flameRef.current.scale.x = 1 + Math.sin(time * 12) * 0.15;
      flameRef.current.scale.y = 1 + Math.sin(time * 10) * 0.2;
      flameRef.current.scale.z = 1 + Math.sin(time * 14) * 0.15;
      flameRef.current.rotation.z = Math.sin(time * 6) * 0.15;
    }
    
    if (innerFlameRef.current) {
      innerFlameRef.current.scale.x = 0.6 + Math.sin(time * 15) * 0.1;
      innerFlameRef.current.scale.y = 0.7 + Math.sin(time * 13) * 0.15;
      innerFlameRef.current.rotation.z = Math.sin(time * 7) * 0.1;
    }
    
    if (flameMaterialRef.current) {
      const intensity = 1.2 + Math.sin(time * 12) * 0.3;
      flameMaterialRef.current.emissiveIntensity = intensity;
    }
    
    if (innerFlameMaterialRef.current) {
      const intensity = 1.5 + Math.sin(time * 15) * 0.4;
      innerFlameMaterialRef.current.emissiveIntensity = intensity;
    }
    
    // Animate candle glow light
    if (lightRef.current) {
      lightRef.current.intensity = 0.8 + Math.sin(time * 10) * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Candle body with gradient effect */}
      <mesh ref={candleRef} position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#fff8e1"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Outer flame (orange) */}
      <mesh ref={flameRef} position={[0, 0.65, 0]}>
        <coneGeometry args={[0.04, 0.18, 8]} />
        <meshStandardMaterial
          ref={flameMaterialRef}
          color="#ff6b35"
          emissive="#ff6b35"
          emissiveIntensity={1.2}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Inner flame (yellow, brighter) */}
      <mesh ref={innerFlameRef} position={[0, 0.7, 0]}>
        <coneGeometry args={[0.025, 0.12, 8]} />
        <meshStandardMaterial
          ref={innerFlameMaterialRef}
          color="#ffd700"
          emissive="#ffd700"
          emissiveIntensity={1.5}
          transparent
          opacity={0.95}
        />
      </mesh>
      
      {/* Glowing light from candle */}
      <pointLight
        ref={lightRef}
        position={[0, 0.75, 0]}
        color="#ffd700"
        intensity={0.8}
        distance={2}
        decay={2}
      />
    </group>
  );
}

// Decorative sprinkles
function Sprinkle({ position }: { position: [number, number, number] }) {
  const sprinkleRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (sprinkleRef.current) {
      sprinkleRef.current.rotation.z = state.clock.elapsedTime * 2;
    }
  });

  const colors = ['#ff6b6b', '#4ecdc4', '#f9ca24', '#eb4d4b', '#6c5ce7', '#ffd700'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <mesh ref={sprinkleRef} position={position}>
      <boxGeometry args={[0.02, 0.05, 0.02]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
    </mesh>
  );
}

// Frosting decoration
function Frosting({ layerIndex, radius }: { layerIndex: number; radius: number }) {
  const frostingRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (frostingRef.current) {
      frostingRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={frostingRef} position={[0, layerIndex * 0.35 + 0.15, 0]}>
      <torusGeometry args={[radius + 0.02, 0.02, 8, 32]} />
      <meshStandardMaterial 
        color="#ffffff" 
        emissive="#fff8e1"
        emissiveIntensity={0.2}
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  );
}

export default function BirthdayCake() {
  const cakeRef = useRef<Mesh>(null);
  const middleLayerRef = useRef<Mesh>(null);
  const topLayerRef = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Gentle rotation and floating animation
    if (cakeRef.current) {
      cakeRef.current.rotation.y = Math.sin(time * 0.3) * 0.15;
      cakeRef.current.position.y = Math.sin(time * 0.8) * 0.05;
    }
    
    // Subtle layer animations
    if (middleLayerRef.current) {
      middleLayerRef.current.rotation.y = Math.sin(time * 0.4) * 0.1;
    }
    
    if (topLayerRef.current) {
      topLayerRef.current.rotation.y = Math.sin(time * 0.35) * 0.12;
      topLayerRef.current.position.y = 0.7 + Math.sin(time * 0.9) * 0.03;
    }
  });

  const cakeLayers = useMemo(() => [
    { 
      position: [0, 0, 0] as [number, number, number], 
      radius: 0.8, 
      height: 0.3, 
      color: '#f4a261',
      emissive: '#ffb347',
      emissiveIntensity: 0.1,
    },
    { 
      position: [0, 0.35, 0] as [number, number, number], 
      radius: 0.7, 
      height: 0.3, 
      color: '#e76f51',
      emissive: '#ff6b6b',
      emissiveIntensity: 0.1,
    },
    { 
      position: [0, 0.7, 0] as [number, number, number], 
      radius: 0.6, 
      height: 0.3, 
      color: '#264653',
      emissive: '#2a5d6b',
      emissiveIntensity: 0.15,
    },
  ], []);

  const candlePositions: [number, number, number][] = useMemo(() => [
    [-0.2, 1.1, 0.2],
    [0, 1.1, 0.2],
    [0.2, 1.1, 0.2],
  ], []);

  // Generate sprinkles positions
  const sprinkles = useMemo(() => {
    const sprinklePositions: [number, number, number][] = [];
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2;
      const radius = 0.65 + Math.random() * 0.15;
      const height = 0.7 + Math.random() * 0.3;
      sprinklePositions.push([
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius,
      ]);
    }
    return sprinklePositions;
  }, []);

  return (
    <group>
      {/* Cake layers with enhanced materials */}
      {cakeLayers.map((layer, index) => (
        <mesh
          key={index}
          ref={
            index === 0 ? cakeRef : 
            index === 1 ? middleLayerRef : 
            topLayerRef
          }
          position={layer.position}
        >
          <cylinderGeometry args={[layer.radius, layer.radius, layer.height, 32]} />
          <meshStandardMaterial 
            color={layer.color} 
            emissive={layer.emissive}
            emissiveIntensity={layer.emissiveIntensity}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
      ))}
      
      {/* Frosting decorations */}
      {cakeLayers.map((layer, index) => (
        <Frosting key={`frosting-${index}`} layerIndex={index} radius={layer.radius} />
      ))}
      
      {/* Decorative sprinkles */}
      {sprinkles.map((pos, index) => (
        <Sprinkle key={`sprinkle-${index}`} position={pos} />
      ))}
      
      {/* Candles with enhanced glow */}
      {candlePositions.map((pos, index) => (
        <Candle key={index} position={pos} />
      ))}
      
      {/* Enhanced lighting */}
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-5, 5, -5]} intensity={0.8} color="#fff8e1" />
      <pointLight position={[0, 6, 0]} intensity={0.6} color="#ffd700" />
      <directionalLight position={[0, 5, 0]} intensity={0.6} color="#ffffff" />
    </group>
  );
}
