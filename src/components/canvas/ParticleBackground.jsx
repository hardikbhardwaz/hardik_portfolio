import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleBackground = ({ count = 3000 }) => {
    const pointsRef = useRef();

    // Generate advanced 3D spatial data for the particles
    const particlesData = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        const colorPurple = new THREE.Color("#9900ff");
        const colorCyan = new THREE.Color("#00ffd0");

        for (let i = 0; i < count; i++) {
            // Distribute particles in a massive spatial volume
            const r = 100 + Math.random() * 200; // Radius distance
            const theta = Math.random() * Math.PI * 2; // Angle XZ
            const phi = Math.acos((Math.random() * 2) - 1); // Angle Y Spread

            // Convert Spherical to Cartesian coords
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi) - 50; // Push backwards into the scene

            positions[i * 3 + 0] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Mix colors randomly based on proximity to center
            const mixedColor = colorPurple.clone().lerp(colorCyan, Math.random());
            colors[i * 3 + 0] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;

            // Variable point sizes for depth illusion
            sizes[i] = Math.random() * 2.5;
        }

        return { positions, colors, sizes };
    }, [count]);

    // Animate the entire massive particle field
    useFrame((state) => {
        if (!pointsRef.current) return;

        const time = state.clock.elapsedTime;
        const pointer = state.pointer;

        // Slow cinematic rotation
        pointsRef.current.rotation.y = time * 0.05;
        pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;

        // Mouse Parallax reaction for the floaters
        pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, pointer.x * 10, 0.05);
        pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, pointer.y * 10, 0.05);
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={particlesData.positions} itemSize={3} />
                <bufferAttribute attach="attributes-color" count={count} array={particlesData.colors} itemSize={3} />
                <bufferAttribute attach="attributes-size" count={count} array={particlesData.sizes} itemSize={1} />
            </bufferGeometry>
            <pointsMaterial
                size={1.5}
                sizeAttenuation={true}
                depthWrite={false}
                vertexColors={true}
                blending={THREE.AdditiveBlending}
                transparent={true}
                opacity={0.8}
            />
        </points>
    );
};

export default ParticleBackground;
