import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Shape({ position, rotation, scale, color, shape }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  shape: 'box' | 'octahedron' | 'tetrahedron' | 'icosahedron';
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'box':
        return new THREE.BoxGeometry(1, 1, 1);
      case 'octahedron':
        return new THREE.OctahedronGeometry(0.8);
      case 'tetrahedron':
        return new THREE.TetrahedronGeometry(0.8);
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(0.6);
      default:
        return new THREE.BoxGeometry(1, 1, 1);
    }
  }, [shape]);

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={2}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale}
        geometry={geometry}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.15}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 50 }: { count?: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.0005;
      ref.current.rotation.x += 0.0002;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ED1E25"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  const shapes = useMemo(() => [
    { position: [-4, 2, -3] as [number, number, number], rotation: [0.5, 0.5, 0] as [number, number, number], scale: 0.8, color: '#ED1E25', shape: 'octahedron' as const },
    { position: [4, -1, -4] as [number, number, number], rotation: [0.3, 0.8, 0.2] as [number, number, number], scale: 1, color: '#00AEEF', shape: 'icosahedron' as const },
    { position: [-3, -2, -2] as [number, number, number], rotation: [0.7, 0.2, 0.5] as [number, number, number], scale: 0.6, color: '#F4A545', shape: 'tetrahedron' as const },
    { position: [3, 2.5, -5] as [number, number, number], rotation: [0.2, 0.6, 0.3] as [number, number, number], scale: 0.9, color: '#8DC63F', shape: 'box' as const },
    { position: [0, -3, -3] as [number, number, number], rotation: [0.4, 0.4, 0.4] as [number, number, number], scale: 0.7, color: '#ED1E25', shape: 'octahedron' as const },
    { position: [-5, 0, -6] as [number, number, number], rotation: [0.1, 0.9, 0.1] as [number, number, number], scale: 1.2, color: '#00AEEF', shape: 'icosahedron' as const },
    { position: [5, 1, -4] as [number, number, number], rotation: [0.6, 0.3, 0.7] as [number, number, number], scale: 0.5, color: '#F4A545', shape: 'tetrahedron' as const },
  ], []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Particles count={80} />
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
