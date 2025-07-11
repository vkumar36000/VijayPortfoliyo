import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// Animated floating spheres
function FloatingSphere({ position, color, size = 1 }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} position={position} args={[size, 32, 32]}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

// Animated particles
function Particles({ count = 100 }) {
  const points = useRef()
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    
    return positions
  }, [count])

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x += delta * 0.05
      points.current.rotation.y += delta * 0.1
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#7e5bef"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Animated blob
function AnimatedBlob() {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1)
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        color="#7e5bef"
        transparent
        opacity={0.1}
        roughness={0.1}
        metalness={0.9}
        wireframe
      />
    </mesh>
  )
}

const Background3D = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#7e5bef" intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#6d39e3" intensity={0.5} />

        {/* Animated elements */}
        <AnimatedBlob />
        <Particles count={50} />
        
        {/* Floating spheres */}
        <FloatingSphere position={[-4, 3, -2]} color="#7e5bef" size={0.5} />
        <FloatingSphere position={[4, -2, -3]} color="#6d39e3" size={0.3} />
        <FloatingSphere position={[2, 4, -4]} color="#9575ff" size={0.4} />
        <FloatingSphere position={[-3, -3, -2]} color="#b8a6ff" size={0.2} />
        <FloatingSphere position={[5, 1, -5]} color="#5c2bc7" size={0.6} />
      </Canvas>
    </div>
  )
}

export default Background3D