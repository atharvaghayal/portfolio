import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, MeshTransmissionMaterial, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Tech Data Nodes - representing data points/analytics
function DataNodes() {
  const groupRef = useRef();
  const nodeCount = 12;
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2;
    const radius = 2.5;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = (Math.random() - 0.5) * 1.5;
    nodes.push({ x, y, z, offset: Math.random() * Math.PI * 2 });
  }

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#60a5fa"
            emissiveIntensity={1.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
      
      {/* Connection lines between nodes */}
      {nodes.map((node, i) => {
        const nextNode = nodes[(i + 1) % nodes.length];
        const points = [
          new THREE.Vector3(node.x, node.y, node.z),
          new THREE.Vector3(nextNode.x, nextNode.y, nextNode.z)
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        return (
          <line key={`line-${i}`} geometry={geometry}>
            <lineBasicMaterial color="#3B82F6" opacity={0.3} transparent />
          </line>
        );
      })}
    </group>
  );
}

// Central Tech Core - representing CPU/brain/data processing
function TechCore() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
      
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Octahedron = diamond/gem shape (tech/data) */}
      <octahedronGeometry args={[1.2, 0]} />
      <MeshTransmissionMaterial
        backside
        samples={16}
        resolution={512}
        transmission={0.9}
        roughness={0.15}
        thickness={1.2}
        ior={1.5}
        chromaticAberration={0.4}
        anisotropy={0.3}
        distortion={0.3}
        distortionScale={0.4}
        temporalDistortion={0.1}
        color={hovered ? "#6366f1" : "#3B82F6"}
        emissive="#3B82F6"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

// Inner Glowing Sphere - representing energy/processing power
function GlowCore() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef} scale={0.6}>
      <icosahedronGeometry args={[1, 1]} />
      <MeshDistortMaterial
        color="#fbbf24"
        emissive="#f59e0b"
        emissiveIntensity={2}
        metalness={0.9}
        roughness={0.1}
        distort={0.3}
        speed={2}
      />
    </mesh>
  );
}

// Circuit Board Rings - representing technology/circuitry
function CircuitRings() {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += 0.004;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= 0.003;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += 0.002;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#a78bfa"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <torusGeometry args={[2.2, 0.06, 16, 100]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#f472b6"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[2.0, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#34d399"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </>
  );
}

// Floating Data Particles
function DataParticles() {
  const particlesRef = useRef();
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const radius = 3 + Math.random() * 1.5;
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
    
    // Random colors for particles (blue, purple, cyan)
    const colorChoice = Math.random();
    if (colorChoice < 0.33) {
      colors[i * 3] = 0.23; colors[i * 3 + 1] = 0.51; colors[i * 3 + 2] = 0.96; // Blue
    } else if (colorChoice < 0.66) {
      colors[i * 3] = 0.54; colors[i * 3 + 1] = 0.36; colors[i * 3 + 2] = 0.96; // Purple
    } else {
      colors[i * 3] = 0.06; colors[i * 3 + 1] = 0.72; colors[i * 3 + 2] = 0.88; // Cyan
    }
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0003;
      particlesRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Complete Tech Structure
function TechStructure() {
  return (
    <Float
      speed={1.2}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <GlowCore />
      <TechCore />
      <CircuitRings />
      <DataNodes />
      <DataParticles />
    </Float>
  );
}

// Scene Setup Component
function Scene() {
  const controlsRef = useRef();
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <>
      {/* Responsive Camera */}
      <perspectiveCamera position={[0, 0, 8]} />
      
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.6} color="#60a5fa" />
      <pointLight position={[10, -10, -5]} intensity={0.6} color="#f472b6" />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#8b5cf6" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.4}
        castShadow
      />
      
      {/* Environment & Reflections */}
      <Environment preset="city" />
      
      {/* Tech Structure */}
      <TechStructure />
      
      {/* Interactive Controls - ENABLED for user interaction */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        autoRotate={!isInteracting}
        autoRotateSpeed={0.8}
        dampingFactor={0.05}
        enableDamping={true}
        rotateSpeed={0.6}
        onStart={() => setIsInteracting(true)}
        onEnd={() => setIsInteracting(false)}
      />
    </>
  );
}

// Main Component
export default function Abstract3D() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}