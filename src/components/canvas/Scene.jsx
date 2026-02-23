import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import LiquidBlob from './LiquidBlob';
import MouseTrail from './MouseTrail';
import ParticleBackground from './ParticleBackground';

import { useScroll, useTransform } from 'framer-motion';

// Safe extraction of camera physics mapped strictly to document height
const CameraRig = () => {
    const { scrollYProgress } = useScroll();
    // Maps the 0-100% total page scroll safely into the 3D Z-depth.
    // Starts at 45 (zoomed out), ends at 0 (deep inside the particle field, but safely in front of the Blob at -25)
    const targetZ = useTransform(scrollYProgress, [0, 1], [45, 0]);

    useFrame((state) => {
        // Pushing the camera safely into the Z axis without overshooting
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ.get(), 0.05);
    });
    return null;
};

const Scene = () => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-0 overflow-hidden bg-[#000000]">
            <Canvas
                camera={{ position: [0, 0, 45], fov: 60, near: 0.1, far: 2000 }}
                gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
                dpr={[1, 1.5]} // Capped at 1.5 to prevent massive VRAM exhaustion on 4K Retina Mac displays
                className="pointer-events-auto"
            >
                {/* Pure deep black background for contrast against the bright fluid */}
                <color attach="background" args={['#020202']} />

                {/* Handle extreme Z-depth camera pulling cleanly */}
                <CameraRig />

                {/* Advanced Lighting Rig */}
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 20, 30]} intensity={3.0} color="#ffffff" />

                {/* Dramatic colored underlights designed to heavily refract inside the liquid glass */}
                <pointLight position={[20, -10, 10]} intensity={150} distance={200} color="#9900ff" />
                <pointLight position={[-20, 15, 5]} intensity={150} distance={200} color="#00ffd0" />

                {/* Environment map for realistic glass reflections */}
                <Environment preset="city" />

                <MouseTrail />

                {/* The Core Advanced Shader Component and Particle Field */}
                <Suspense fallback={null}>
                    <ParticleBackground count={1500} />
                    <LiquidBlob />
                </Suspense>

                {/* Cinematic Post-Processing Pipeline - Multisampling disabled to save VRAM on Retina displays */}
                <EffectComposer disableNormalPass multisampling={0}>
                    <Bloom
                        luminanceThreshold={0.5}
                        luminanceSmoothing={0.9}
                        intensity={1.5}
                        mipmapBlur
                    />
                    <ChromaticAberration
                        blendFunction={BlendFunction.NORMAL} // blend mode
                        offset={new THREE.Vector2(0.002, 0.002)} // color offset
                        radialModulation={true}
                        modulationOffset={0.5}
                    />
                    <Noise
                        opacity={0.03}
                        premultiply
                        blendFunction={BlendFunction.SCREEN}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default Scene;
