import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import LiquidBlob from './LiquidBlob';
import MouseTrail from './MouseTrail';
import ParticleBackground from './ParticleBackground';

import { useScroll, useTransform } from 'framer-motion';

// Safe extraction of camera physics mapped strictly to document height and screen width
const CameraRig = () => {
    const { scrollYProgress } = useScroll();
    const { viewport } = useThree();

    // Dynamic Z-Depth based on aspect ratio (Portrait mobile phones need to pull the camera WAY back)
    const isMobileAspect = viewport.width < viewport.height;
    const startZ = isMobileAspect ? 80 : 45; // Pull back massively on phones so the blob fits horizontally
    const endZ = isMobileAspect ? 10 : 0; // Don't dive as dangerously close on phones

    // Maps the 0-100% total page scroll safely into the 3D Z-depth.
    const targetZ = useTransform(scrollYProgress, [0, 1], [startZ, endZ]);

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
                dpr={[1, 1.2]} // Capped tightly at 1.2 to drastically boost FPS on 4K Retina Mac displays
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

                <Suspense fallback={null}>
                    <SceneContent />
                </Suspense>
            </Canvas>
        </div>
    );
};

// Inner component layer required because useThree() hooks MUST be inside a Canvas parent
const SceneContent = () => {
    const { viewport } = useThree();
    const isMobileAspect = viewport.width < viewport.height;

    return (
        <>
            <ParticleBackground count={isMobileAspect ? 800 : 1500} />
            <LiquidBlob />

            {/* STRICT HARDWARE EXCLUSION: Post-processing crashes low-VRAM mobile browsers heavily. Only render on Desktop. */}
            {!isMobileAspect && (
                <EffectComposer disableNormalPass multisampling={0}>
                    <Bloom
                        luminanceThreshold={0.5}
                        luminanceSmoothing={0.9}
                        intensity={1.5}
                        mipmapBlur
                    />
                    <ChromaticAberration
                        blendFunction={BlendFunction.NORMAL}
                        offset={new THREE.Vector2(0.002, 0.002)}
                        radialModulation={true}
                        modulationOffset={0.5}
                    />
                    <Noise
                        opacity={0.03}
                        premultiply
                        blendFunction={BlendFunction.SCREEN}
                    />
                </EffectComposer>
            )}
        </>
    );
};

export default Scene;
