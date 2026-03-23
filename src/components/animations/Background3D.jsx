import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';

function AnimatedBackground() {
  const pointsRef = useRef();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.001;
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <>
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1, 64, 64]} position={[2, 1, -5]}>
          <MeshDistortMaterial
            color="#3b82f6"
            attach="material"
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Float>
      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[0.5, 32, 32]} position={[-3, -2, -4]}>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.6}
            speed={1.5}
          />
        </Sphere>
      </Float>
    </>
  );
}

const Background3D = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AnimatedBackground />
      </Canvas>
    </div>
  );
};

export default Background3D;
