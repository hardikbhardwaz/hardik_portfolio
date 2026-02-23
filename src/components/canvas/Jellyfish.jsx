import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Jellyfish = () => {
    const groupRef = useRef();
    const pointsRef = useRef();

    // 1. Geometry for the dark mushroom/cone bell (matching the reference image)
    const bellPoints = useMemo(() => {
        const pts = [];
        pts.push(new THREE.Vector2(0, 2.0));        // tip
        pts.push(new THREE.Vector2(0.2, 1.9));      // rounded top
        pts.push(new THREE.Vector2(0.8, 1.2));      // slope down
        pts.push(new THREE.Vector2(1.5, 0));        // flare out to wide base
        pts.push(new THREE.Vector2(1.8, -0.8));     // bottom edge peak
        pts.push(new THREE.Vector2(1.7, -1.0));     // inner lip tucked in
        pts.push(new THREE.Vector2(0, -0.5));       // inner center (where tentacles spawn)
        return pts;
    }, []);

    // 2. Tentacles as a pure Points particle system dropping down like rain
    const particleCount = 2000;
    const { positions, speeds, phases } = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const spd = new Float32Array(particleCount);
        const phs = new Float32Array(particleCount);
        for (let i = 0; i < particleCount; i++) {
            const r = Math.random() * 0.9; // Spawn only within inner bell radius (0.9 max)
            const theta = Math.random() * Math.PI * 2;
            pos[i * 3 + 0] = Math.cos(theta) * r;
            pos[i * 3 + 1] = (Math.random() - 1.0) * 12.0; // Y starts randomly distributed all the way down to -12
            pos[i * 3 + 2] = Math.sin(theta) * r;

            spd[i] = Math.random() * 2.0 + 1.5; // Base falling speed
            phs[i] = Math.random() * Math.PI * 2; // Phase for tiny sine wave wiggle
        }
        return { positions: pos, speeds: spd, phases: phs };
    }, []);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();

        // Float the entire jellyfish softly through space
        if (groupRef.current) {
            // Slow undulating drift through the background
            const globalX = Math.sin(t * 0.1) * 20 - 10;
            const globalZ = Math.cos(t * 0.15) * 10 - 25; // Deep push
            const globalY = Math.sin(t * 0.2) * 8 + 5;

            groupRef.current.position.set(globalX, globalY, globalZ);

            // Subtle breathing/tilting
            groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
            groupRef.current.rotation.x = Math.cos(t * 0.4) * 0.1;
        }

        // Animate the internal particles falling to simulate raining light trails
        if (pointsRef.current) {
            const posAttr = pointsRef.current.geometry.attributes.position;
            for (let i = 0; i < particleCount; i++) {
                let y = posAttr.array[i * 3 + 1];
                y -= speeds[i] * delta;

                // Reset particle to top of bell when it falls too far
                if (y < -12.0) {
                    y = 0.0;
                }

                // Add a very subtle wiggle, mostly it just drops straight down like the reference
                const pX = posAttr.array[i * 3 + 0] + Math.cos(phases[i] + t * 4 + y) * 0.005;
                const pZ = posAttr.array[i * 3 + 2] + Math.sin(phases[i] + t * 4 + y) * 0.005;

                posAttr.array[i * 3 + 0] = pX;
                posAttr.array[i * 3 + 1] = y;
                posAttr.array[i * 3 + 2] = pZ;
            }
            posAttr.needsUpdate = true;
        }
    });

    return (
        <group ref={groupRef} scale={2.5}>
            {/* The Dark Conical Bell */}
            <mesh position={[0, 0, 0]}>
                <latheGeometry args={[bellPoints, 64]} />
                <meshStandardMaterial
                    color="#020408" // Deep dark alien blue/black
                    roughness={0.2}
                    metalness={0.9} // Shiny to catch rim lights
                />
            </mesh>

            {/* Cyan Rim Light illuminating the top side of the bell to match reference */}
            <pointLight position={[0, 4, 3]} intensity={10.0} distance={15} color="#00ffff" />
            <pointLight position={[3, 2, -3]} intensity={5.0} distance={15} color="#00ffff" />

            {/* Core Light illuminating the inside of the bell and falling particles */}
            <pointLight position={[0, -1, 0]} intensity={6.0} distance={15} color="#00ffff" />

            {/* Tentacle Particles (Dense Raining Cyan Light) */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particleCount}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    color="#00ffff"
                    transparent={true}
                    opacity={0.8}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>
        </group>
    );
};

export default Jellyfish;
