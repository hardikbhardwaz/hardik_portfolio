import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const LiquidBlob = () => {
    const meshRef = useRef();
    const materialRef = useRef();
    const { viewport } = useThree();

    // Track previous scroll for velocity calculation (Violent Physics)
    const lastScrollY = useRef(0);
    const scrollVelocity = useRef(0);

    // Safety flag to prevent NaN math on the very first render frame
    const isMounted = useRef(false);
    useEffect(() => {
        isMounted.current = true;
        lastScrollY.current = window.scrollY;
    }, []);

    // High fidelity geometry for the glass surface (Optimized from 64 down to 32 to prevent vertex overload)
    const geometry = useMemo(() => new THREE.IcosahedronGeometry(12, 32), []);

    useFrame((state, delta) => {
        if (!meshRef.current || !materialRef.current) return;

        const time = state.clock.elapsedTime;

        // Calculate true scroll velocity safely
        const currentScrollY = window.scrollY || 0;
        let deltaScroll = currentScrollY - (lastScrollY.current || 0);
        if (isNaN(deltaScroll)) deltaScroll = 0;

        // Lerp the velocity so it smooths out rather than snapping back to zero instantly
        let targetVelocity = THREE.MathUtils.lerp(scrollVelocity.current || 0, deltaScroll, 0.05);
        if (isNaN(targetVelocity)) targetVelocity = 0;
        scrollVelocity.current = targetVelocity;

        lastScrollY.current = currentScrollY;

        // 1. Mouse Parallax (Follow cursor smoothly)
        // Map pointer from -1 to 1 to rotation angles
        let targetX = (state.pointer.x * viewport.width) / 10;
        let targetY = (state.pointer.y * viewport.height) / 10;
        if (isNaN(targetX)) targetX = 0;
        if (isNaN(targetY)) targetY = 0;

        // Base Idle Floating
        let newPosX = THREE.MathUtils.lerp(meshRef.current.position.x || 0, targetX * 0.5, 0.05);
        let newPosY = THREE.MathUtils.lerp(meshRef.current.position.y || 0, (targetY * 0.5), 0.05);
        if (!isNaN(newPosX)) meshRef.current.position.x = newPosX;
        if (!isNaN(newPosY)) meshRef.current.position.y = newPosY;

        // 2. Violent Scroll Physics (Rotation and Scaling based on Velocity)
        const scrollFactor = Math.min(Math.max(currentScrollY / 5000, 0), 1.0); // 0 to 1 based on page depth
        const violence = Math.min(Math.abs(scrollVelocity.current) * 0.01, 2.0); // Cap extreme spikes

        // Fast rotation when scrolling quickly, otherwise slow idle
        let newRotY = time * 0.15 + (currentScrollY * 0.002) + (scrollVelocity.current * 0.05);
        let newRotX = time * 0.1 + (currentScrollY * 0.001) + (scrollVelocity.current * 0.02);
        if (!isNaN(newRotY)) meshRef.current.rotation.y = newRotY;
        if (!isNaN(newRotX)) meshRef.current.rotation.x = newRotX;

        // 4. Dynamic Morphing parameters via Scroll and Violence
        // Distorts heavily when scrolling fast (boiling effect)
        // Since we are using standard meshPhysicalMaterial, we strictly scale the geometry 
        // to mimic the visceral morphing of the FBO shader without crashing the GPU
        const distortionAmount = 0.8 + (scrollFactor * 1.5) + violence;

        // Organic scale pumping + velocity stretching (Capped strictly)
        const baseScale = 1.0 + Math.sin(time * 0.5) * 0.05;
        // Expand slightly when scrolled down, and stretch based on speed
        let finalScaleX = Math.min(baseScale + (scrollFactor * 0.15) + (Math.abs(scrollVelocity.current) * 0.002), 1.5);
        let finalScaleY = Math.max(baseScale + (scrollFactor * 0.15) - (Math.abs(scrollVelocity.current) * 0.001), 0.5); // Squash and stretch

        if (isNaN(finalScaleX) || finalScaleX < 0.1) finalScaleX = 1;
        if (isNaN(finalScaleY) || finalScaleY < 0.1) finalScaleY = 1;

        meshRef.current.scale.set(finalScaleX, finalScaleY, finalScaleX);
    });

    return (
        <group position={[0, 0, -25]}>
            <mesh ref={meshRef} geometry={geometry}>
                <meshPhysicalMaterial
                    ref={materialRef}
                    color="#ffffff"
                    metalness={0.05}     // MUST BE NEAR ZERO for pure glass, otherwise it becomes opaque chrome
                    roughness={0.1}      // Slight surface imperfection
                    transmission={1.0}   // 100% transmission (Native Three.js physical refraction)
                    transparent={true}   // Required to properly composite with DOM UI behind WebGL
                    opacity={0.9}        // Slight fade to ensure DOM text piercing
                    ior={1.4}            // True glass Index of Refraction
                    thickness={2.0}      // Volume depth for the physical refraction
                    envMapIntensity={2.0}// Picks up the Scene's environment lighting
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </mesh>
        </group>
    );
};

export default LiquidBlob;
