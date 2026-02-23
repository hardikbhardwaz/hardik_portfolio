import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const MAX_PARTICLES = 3500; // High count for massive fluid density

const MouseTrail = () => {
    const meshRef = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const vec = new THREE.Vector3();

    // Store Particle State manually
    const particles = useRef(
        Array.from({ length: MAX_PARTICLES }, () => ({
            active: false,
            position: new THREE.Vector3(),
            velocity: new THREE.Vector3(),
            scale: 0,
            life: 0,
            maxLife: Math.random() * 0.8 + 0.4, // 0.4s to 1.2s lifespan
            randomSeed: Math.random() * 100 // Seed for unique turbulence offsets
        }))
    );

    const { camera } = useThree();
    const lastPointer = useRef(new THREE.Vector2());
    const lastSpawnPos = useRef(new THREE.Vector3());
    const currentIndex = useRef(0);
    const hasInitialized = useRef(false);

    // Deep Cyan / Fluid Smoke Colors
    const colorArray = useMemo(() => new Float32Array(MAX_PARTICLES * 3), []);
    const colors = [
        new THREE.Color('#00ffff'), // Bright Cyan
        new THREE.Color('#00ffaa'), // Aqua/Teal
        new THREE.Color('#0088ff'), // Deep Blue
        new THREE.Color('#ffffff'), // White Core
    ];

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Unproject current mouse coordinate to 3D space
        vec.set(state.pointer.x, state.pointer.y, 0.5);
        vec.unproject(camera);
        vec.sub(camera.position).normalize();

        const distance = 70; // Map perfectly to the Z-plane in front of the background
        const spawnPos = new THREE.Vector3().copy(camera.position).add(vec.multiplyScalar(distance));

        if (!hasInitialized.current) {
            lastSpawnPos.current.copy(spawnPos);
            lastPointer.current.copy(state.pointer);
            hasInitialized.current = true;
        }

        const pointerDelta = lastPointer.current.distanceTo(state.pointer);
        const pointerVelocity = new THREE.Vector3().copy(spawnPos).sub(lastSpawnPos.current);

        // 1. STANDBY EMISSION (Idle Smoke)
        let particlesToSpawn = 2; // Keep a slow burn going when idle

        // 2. ACTIVE EMISSION (Thick Fluid Trail)
        if (pointerDelta > 0.005) {
            const pathLength = pointerVelocity.length();
            // Emit densely based on movement. 
            // Capped at 40 per frame to avoid jumping the pointer array too fast
            particlesToSpawn += Math.min(Math.floor(pathLength * 10) + 5, 40);
        }

        // Execute Spawning
        for (let i = 0; i < particlesToSpawn; i++) {
            const idx = currentIndex.current;
            const p = particles.current[idx];

            p.active = true;
            p.life = Math.random() * 0.8 + 0.4;
            p.maxLife = p.life;
            p.scale = Math.random() * 0.6 + 0.1; // Varied particle sizes for liquid look

            // Interpolate position across the movement frame to prevent DOT-gaps
            if (pointerDelta > 0.005) {
                const fraction = i / particlesToSpawn;
                p.position.copy(lastSpawnPos.current).lerp(spawnPos, fraction);
            } else {
                p.position.copy(spawnPos);
            }

            // Scatter the spawn slightly
            p.position.x += (Math.random() - 0.5) * 0.5;
            p.position.y += (Math.random() - 0.5) * 0.5;
            p.position.z += (Math.random() - 0.5) * 0.5;

            // FLUID EJECTION PHYSICS
            // Particles are thrown outward and slightly backwards (against mouse movement)
            p.velocity.set(
                (Math.random() - 0.5) * 15.0, // Explosive spray X
                (Math.random() - 0.5) * 15.0, // Explosive spray Y
                (Math.random() - 0.5) * 15.0  // Explosive spray Z
            );

            // Add reverse momentum so the fluid drags behind the cursor
            if (pointerDelta > 0.005) {
                // Normalize pointer velocity and shoot particles backwards
                const backwards = pointerVelocity.clone().normalize().multiplyScalar(-15.0);
                p.velocity.add(backwards);
            } else {
                // Idle drift
                p.velocity.multiplyScalar(0.2);
            }

            // Set Color randomly based on fluid palette
            const c = colors[Math.floor(Math.random() * colors.length)];
            c.toArray(colorArray, idx * 3);

            currentIndex.current = (idx + 1) % MAX_PARTICLES;
        }

        lastPointer.current.copy(state.pointer);
        lastSpawnPos.current.copy(spawnPos);
        meshRef.current.geometry.attributes.color.needsUpdate = true;

        // Execute Fluid Physics simulation on all active particles
        let hasActive = false;
        for (let i = 0; i < MAX_PARTICLES; i++) {
            const p = particles.current[i];

            if (p.active) {
                hasActive = true;
                p.life -= delta;

                if (p.life <= 0) {
                    p.active = false;
                    dummy.position.set(0, 0, 0);
                    dummy.scale.setScalar(0);
                } else {
                    // Fluid Drag: Slow down the initial burst velocity over time
                    p.velocity.multiplyScalar(0.92);

                    // Fluid Turbulence (Curl-like noise simulation using Sine/Cosine)
                    const time = p.maxLife - p.life;
                    const freq = 2.0;
                    const amp = 8.0;

                    p.velocity.x += Math.sin(p.position.y * freq + time + p.randomSeed) * amp * delta;
                    p.velocity.y += Math.cos(p.position.x * freq + time + p.randomSeed) * amp * delta;
                    p.velocity.z += Math.sin(p.position.z * freq + time + p.randomSeed) * amp * delta;

                    // Apply integrated velocity to position
                    p.position.addScaledVector(p.velocity, delta);

                    // Organic Scale Decay
                    const normalizedLife = p.life / p.maxLife; // 1 -> 0
                    // Starts small -> blooms thick -> shrinks to dust
                    const currentScale = p.scale * normalizedLife * (1.0 - Math.pow(1.0 - normalizedLife, 3.0));

                    dummy.position.copy(p.position);
                    dummy.scale.setScalar(currentScale);
                }

                dummy.updateMatrix();
                meshRef.current.setMatrixAt(i, dummy.matrix);
            }
        }

        if (hasActive) {
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, MAX_PARTICLES]}>
            {/* Small glowing specs to build massive density */}
            <icosahedronGeometry args={[0.2, 0]}>
                <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
            </icosahedronGeometry>
            {/* Additive Blending merges thousands of tiny faint spheres into a brilliant, solid glowing fluid mass */}
            <meshBasicMaterial
                vertexColors
                toneMapped={false}
                transparent={true}
                opacity={0.6}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </instancedMesh>
    );
};

export default MouseTrail;
