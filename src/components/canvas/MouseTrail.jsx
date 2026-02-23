import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const MAX_PARTICLES = 300;

const MouseTrail = () => {
    const meshRef = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const vec = new THREE.Vector3();

    // Store Particle State manually to avoid React state overhead
    const particles = useRef(
        Array.from({ length: MAX_PARTICLES }, () => ({
            active: false,
            position: new THREE.Vector3(),
            velocity: new THREE.Vector3(),
            scale: 0,
            life: 0,
            maxLife: Math.random() * 0.5 + 0.5 // 0.5 to 1.0 seconds
        }))
    );

    const { camera } = useThree();
    const lastMousePos = useRef(new THREE.Vector2());
    const currentIndex = useRef(0);

    // To add specific glowing neon colors to individual instances
    const colorArray = useMemo(() => new Float32Array(MAX_PARTICLES * 3), []);
    const colors = [new THREE.Color('#00ffff'), new THREE.Color('#ff00ff'), new THREE.Color('#ffffff')];

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Check if mouse moved significantly
        const mouseDelta = lastMousePos.current.distanceTo(state.pointer);

        if (mouseDelta > 0.005) { // Threshold for spawning to avoid standing-still clutter
            // Unproject mouse coordinate to 3D space
            // Project it ~70 units out from the camera, putting it perfectly in front of the background
            vec.set(state.pointer.x, state.pointer.y, 0.5);
            vec.unproject(camera);
            vec.sub(camera.position).normalize();

            const distance = 70;
            const spawnPos = new THREE.Vector3().copy(camera.position).add(vec.multiplyScalar(distance));

            // Spawn multiple glitter particles per movement based on speed
            const particlesToSpawn = Math.min(Math.floor(mouseDelta * 100) + 1, 6);

            for (let i = 0; i < particlesToSpawn; i++) {
                const idx = currentIndex.current;
                const p = particles.current[idx];

                p.active = true;
                p.life = p.maxLife;
                p.scale = Math.random() * 0.8 + 0.3; // Random starting size

                // Add jitter to spawn position so it feels like a wide brush of glitter
                p.position.copy(spawnPos);
                p.position.x += (Math.random() - 0.5) * 2.0;
                p.position.y += (Math.random() - 0.5) * 2.0;
                p.position.z += (Math.random() - 0.5) * 2.0;

                // Random slow drift
                p.velocity.set(
                    (Math.random() - 0.5) * 3,
                    (Math.random() - 0.5) * 3 + 1.0, // Slight upward gravity / star drift
                    (Math.random() - 0.5) * 3
                );

                // Set Random Neon Color directly in the instanced buffer
                const c = colors[Math.floor(Math.random() * colors.length)];
                c.toArray(colorArray, idx * 3);

                currentIndex.current = (idx + 1) % MAX_PARTICLES;
            }

            lastMousePos.current.copy(state.pointer);
            meshRef.current.geometry.attributes.color.needsUpdate = true;
        }

        // Update all alive particles every frame
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
                    // Drift position physically
                    p.position.addScaledVector(p.velocity, delta);

                    // Ease the scale down over its lifetime
                    const currentScale = (p.life / p.maxLife) * p.scale;

                    // Spin randomly
                    dummy.rotation.x += delta * (Math.random() * 5);
                    dummy.rotation.y += delta * (Math.random() * 5);

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
            <octahedronGeometry args={[0.4, 0]}>
                <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
            </octahedronGeometry>
            {/* Extremely bright, additively blended material for glowing star look */}
            <meshBasicMaterial
                vertexColors
                toneMapped={false}
                transparent={true}
                opacity={0.9}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </instancedMesh>
    );
};

export default MouseTrail;
