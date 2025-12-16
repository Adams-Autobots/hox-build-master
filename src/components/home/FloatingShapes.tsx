import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Mouse position state shared across components
const mouseState = { x: 0, y: 0, worldX: 0, worldY: 0 };

function Shape({ position, rotation, scale, color, shape }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  shape: 'box' | 'octahedron' | 'tetrahedron' | 'icosahedron';
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const basePosition = useMemo(() => new THREE.Vector3(...position), [position]);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
      
      // Mouse parallax - shapes move opposite to mouse for depth effect
      const parallaxStrength = 0.3 * (1 + position[2] * 0.1); // Closer shapes move more
      meshRef.current.position.x = basePosition.x - mouseState.x * parallaxStrength;
      meshRef.current.position.y = basePosition.y - mouseState.y * parallaxStrength;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'box':
        return new THREE.BoxGeometry(0.5, 0.5, 0.5);
      case 'octahedron':
        return new THREE.OctahedronGeometry(0.4);
      case 'tetrahedron':
        return new THREE.TetrahedronGeometry(0.4);
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(0.3);
      default:
        return new THREE.BoxGeometry(0.5, 0.5, 0.5);
    }
  }, [shape]);

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={1.5}
      floatingRange={[-0.15, 0.15]}
    >
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale * 0.5}
        geometry={geometry}
      >
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.35}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

function ParticleNetwork({ count = 60 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  // Store original and current positions
  const { originalPositions, currentPositions } = useMemo(() => {
    const original = new Float32Array(count * 3);
    const current = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8 - 2;
      original[i * 3] = x;
      original[i * 3 + 1] = y;
      original[i * 3 + 2] = z;
      current[i * 3] = x;
      current[i * 3 + 1] = y;
      current[i * 3 + 2] = z;
    }
    return { originalPositions: original, currentPositions: current };
  }, [count]);

  // Pre-allocate line geometry (max possible lines)
  const maxLines = count * count;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, [linePositions, lineColors]);

  useFrame(() => {
    if (!pointsRef.current) return;

    const repulsionRadius = 2.5;
    const repulsionStrength = 0.15;
    const returnSpeed = 0.03;
    const connectionDistance = 2.0;

    // Convert mouse to world coordinates (approximate)
    const mouseWorld = new THREE.Vector3(mouseState.x * 8, mouseState.y * 6, 0);

    // Update particle positions with repulsion
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      
      // Current particle position
      const px = currentPositions[idx];
      const py = currentPositions[idx + 1];
      const pz = currentPositions[idx + 2];
      
      // Distance to mouse (2D, ignore z for repulsion)
      const dx = px - mouseWorld.x;
      const dy = py - mouseWorld.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Apply repulsion if within radius
      if (distance < repulsionRadius && distance > 0.01) {
        const force = (1 - distance / repulsionRadius) * repulsionStrength;
        const dirX = dx / distance;
        const dirY = dy / distance;
        currentPositions[idx] += dirX * force;
        currentPositions[idx + 1] += dirY * force;
      }
      
      // Lerp back to original position
      currentPositions[idx] += (originalPositions[idx] - currentPositions[idx]) * returnSpeed;
      currentPositions[idx + 1] += (originalPositions[idx + 1] - currentPositions[idx + 1]) * returnSpeed;
      currentPositions[idx + 2] += (originalPositions[idx + 2] - currentPositions[idx + 2]) * returnSpeed;
    }

    // Update points geometry
    const positionAttr = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
    positionAttr.array.set(currentPositions);
    positionAttr.needsUpdate = true;

    // Build connecting lines
    let lineIndex = 0;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const idx1 = i * 3;
        const idx2 = j * 3;
        
        const dx = currentPositions[idx1] - currentPositions[idx2];
        const dy = currentPositions[idx1 + 1] - currentPositions[idx2 + 1];
        const dz = currentPositions[idx1 + 2] - currentPositions[idx2 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < connectionDistance) {
          const opacity = 1 - dist / connectionDistance;
          
          // Line start
          linePositions[lineIndex * 6] = currentPositions[idx1];
          linePositions[lineIndex * 6 + 1] = currentPositions[idx1 + 1];
          linePositions[lineIndex * 6 + 2] = currentPositions[idx1 + 2];
          // Line end
          linePositions[lineIndex * 6 + 3] = currentPositions[idx2];
          linePositions[lineIndex * 6 + 4] = currentPositions[idx2 + 1];
          linePositions[lineIndex * 6 + 5] = currentPositions[idx2 + 2];
          
          // Red color with distance-based opacity
          const r = 0.93 * opacity;
          const g = 0.12 * opacity;
          const b = 0.15 * opacity;
          lineColors[lineIndex * 6] = r;
          lineColors[lineIndex * 6 + 1] = g;
          lineColors[lineIndex * 6 + 2] = b;
          lineColors[lineIndex * 6 + 3] = r;
          lineColors[lineIndex * 6 + 4] = g;
          lineColors[lineIndex * 6 + 5] = b;
          
          lineIndex++;
        }
      }
    }

    // Update line geometry
    if (linesRef.current) {
      const linePosAttr = linesRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
      const lineColAttr = linesRef.current.geometry.getAttribute('color') as THREE.BufferAttribute;
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={currentPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#ED1E25"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.4} />
      </lineSegments>
    </>
  );
}

function MouseTracker() {
  const { size } = useThree();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseState.x = (e.clientX / size.width) * 2 - 1;
      mouseState.y = -(e.clientY / size.height) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);
  
  return null;
}

function Scene() {
  const shapes = useMemo(() => [
    { position: [-4, 2, -3] as [number, number, number], rotation: [0.5, 0.5, 0] as [number, number, number], scale: 0.4, color: '#ED1E25', shape: 'octahedron' as const },
    { position: [4, -1, -4] as [number, number, number], rotation: [0.3, 0.8, 0.2] as [number, number, number], scale: 0.5, color: '#00AEEF', shape: 'icosahedron' as const },
    { position: [-3, -2, -2] as [number, number, number], rotation: [0.7, 0.2, 0.5] as [number, number, number], scale: 0.3, color: '#F4A545', shape: 'tetrahedron' as const },
    { position: [3, 2.5, -5] as [number, number, number], rotation: [0.2, 0.6, 0.3] as [number, number, number], scale: 0.45, color: '#8DC63F', shape: 'box' as const },
    { position: [0, -3, -3] as [number, number, number], rotation: [0.4, 0.4, 0.4] as [number, number, number], scale: 0.35, color: '#ED1E25', shape: 'octahedron' as const },
    { position: [-5, 0, -6] as [number, number, number], rotation: [0.1, 0.9, 0.1] as [number, number, number], scale: 0.6, color: '#00AEEF', shape: 'icosahedron' as const },
    { position: [5, 1, -4] as [number, number, number], rotation: [0.6, 0.3, 0.7] as [number, number, number], scale: 0.25, color: '#F4A545', shape: 'tetrahedron' as const },
  ], []);

  return (
    <>
      <MouseTracker />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <ParticleNetwork count={60} />
      {shapes.map((shape, index) => (
        <Shape key={index} {...shape} />
      ))}
    </>
  );
}

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
