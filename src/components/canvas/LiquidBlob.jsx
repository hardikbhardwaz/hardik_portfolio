import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const LiquidBlob = () => {
    const meshRef = useRef();
    const materialRef = useRef();
    const { viewport, size } = useThree();

    // Track previous scroll for velocity calculation (Violent Physics)
    const lastScrollY = useRef(0);
    const scrollVelocity = useRef(0);

    // Track the total document height to calculate percentage depth instead of fixed pixels
    const maxScroll = typeof document !== 'undefined' ? Math.max(0, document.body.scrollHeight - window.innerHeight) : 5000;

    // Safety flag to prevent NaN math on the very first render frame
    const isMounted = useRef(false);
    useEffect(() => {
        isMounted.current = true;
        lastScrollY.current = window.scrollY;
    }, []);

    // High fidelity geometry for the glass surface (Optimized from 64 down to 32 to prevent vertex overload)
    const geometry = useMemo(() => new THREE.IcosahedronGeometry(12, 32), []);

    // Phase 36: Realistic Fluid Splash (Points System)
    const SPLASH_PARTICLES = 15000;
    const pointsRef = useRef();

    // Circular drop texture for realistic water spray
    const dropTexture = useMemo(() => {
        if (typeof document === 'undefined') return null;
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
        gradient.addColorStop(0.2, 'rgba(200, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 150, 255, 0.0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
        return new THREE.CanvasTexture(canvas);
    }, []);

    // Deterministic physics arrays for 15000 droplets
    const splashArrays = useMemo(() => {
        const sX = new Float32Array(SPLASH_PARTICLES);
        const sY = new Float32Array(SPLASH_PARTICLES);
        const sZ = new Float32Array(SPLASH_PARTICLES);
        const vX = new Float32Array(SPLASH_PARTICLES);
        const vY = new Float32Array(SPLASH_PARTICLES);
        const vZ = new Float32Array(SPLASH_PARTICLES);

        for (let i = 0; i < SPLASH_PARTICLES; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * 8.0;

            sX[i] = Math.cos(angle) * r;
            sY[i] = -12.0 + (Math.random() * 4.0); // Originates near bottom of bubble on impact
            sZ[i] = Math.sin(angle) * r;

            if (Math.random() > 0.3) {
                // Radial Crown Splash (Explodes outward)
                const outwardSpeed = (Math.random() * 60) + 30;
                vX[i] = Math.cos(angle) * outwardSpeed;
                vY[i] = (Math.random() * 40) + 20; // gentle upward arc
                vZ[i] = Math.sin(angle) * outwardSpeed;
            } else {
                // Vertical Spout (Shoots straight up through the center)
                const spoutSpread = Math.random() * 15;
                vX[i] = Math.cos(angle) * spoutSpread;
                vY[i] = (Math.random() * 120) + 40; // intense upward thrust
                vZ[i] = Math.sin(angle) * spoutSpread;
            }
        }
        return { sX, sY, sZ, vX, vY, vZ };
    }, []);

    const positionsBuffer = useMemo(() => new Float32Array(SPLASH_PARTICLES * 3), []);
    const velocitiesBuffer = useMemo(() => new Float32Array(SPLASH_PARTICLES * 3), []);

    // Initialize static buffers once
    useMemo(() => {
        const { sX, sY, sZ, vX, vY, vZ } = splashArrays;
        let idx = 0;
        for (let i = 0; i < SPLASH_PARTICLES; i++) {
            positionsBuffer[idx] = sX[i];
            velocitiesBuffer[idx] = vX[i];
            idx++;

            positionsBuffer[idx] = sY[i];
            velocitiesBuffer[idx] = vY[i];
            idx++;

            positionsBuffer[idx] = sZ[i];
            velocitiesBuffer[idx] = vZ[i];
            idx++;
        }
    }, [splashArrays, positionsBuffer, velocitiesBuffer]);

    // Custom Shader Uniforms for 60fps GPU Physics
    const shaderUniforms = useMemo(() => ({
        uProgress: { value: 0 },
        uTexture: { value: dropTexture }
    }), [dropTexture]);

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

        // 1. Mouse Parallax (Follow cursor smoothly during normal state)
        // Map pointer from -1 to 1 to rotation angles
        let targetX = (state.pointer.x * viewport.width) / 10;
        let targetY = (state.pointer.y * viewport.height) / 10;
        if (isNaN(targetX)) targetX = 0;
        if (isNaN(targetY)) targetY = 0;

        let newPosX = THREE.MathUtils.lerp(meshRef.current.position.x || 0, targetX * 0.5, 0.05);
        let newPosY = THREE.MathUtils.lerp(meshRef.current.position.y || 0, (targetY * 0.5), 0.05);

        // 2. Violent Scroll Physics (Rotation and Scaling based on Velocity)
        const scrollFactor = Math.min(Math.max(currentScrollY / 5000, 0), 1.0); // 0 to 1 based on page depth
        const violence = Math.min(Math.abs(scrollVelocity.current) * 0.01, 2.0); // Cap extreme spikes

        // Fast rotation when scrolling quickly, otherwise slow idle
        let newRotY = time * 0.15 + (currentScrollY * 0.002) + (scrollVelocity.current * 0.05);
        let newRotX = time * 0.1 + (currentScrollY * 0.001) + (scrollVelocity.current * 0.02);
        if (!isNaN(newRotY)) meshRef.current.rotation.y = newRotY;
        if (!isNaN(newRotX)) meshRef.current.rotation.x = newRotX;

        // 4. Dynamic Morphing parameters via Scroll and Violence
        const distortionAmount = 0.8 + (scrollFactor * 1.5) + violence;
        const baseScale = 1.0 + Math.sin(time * 0.5) * 0.05;

        let finalScaleX = Math.min(baseScale + (scrollFactor * 0.15) + (Math.abs(scrollVelocity.current) * 0.002), 1.5);
        let finalScaleY = Math.max(baseScale + (scrollFactor * 0.15) - (Math.abs(scrollVelocity.current) * 0.001), 0.5); // Squash and stretch
        let finalScaleZ = finalScaleX; // Normally spherical

        // 5. Terminal Module Localized Death (Phase 35)
        const terminalEl = document.getElementById('terminal-module');
        let distortionMultiplier = 1.0;

        if (terminalEl) {
            const rect = terminalEl.getBoundingClientRect();
            const windowHeight = window.innerHeight || 900;
            const yRatio = rect.top / windowHeight; // 1.0 = entering bottom, 0.0 = hitting top

            // Phase 1: Vacuum dock to top lip (yRatio from 1.2 down to 1.05)
            // Gently pull the floating bubble to hover right above the terminal
            if (yRatio <= 1.2 && yRatio > 1.05) {
                const vacuumProgress = 1.0 - ((yRatio - 1.05) / 0.15);
                const terminalTopWebGL = viewport.height * (0.5 - yRatio);
                const targetY = terminalTopWebGL + (viewport.height * 0.15); // Hover above top edge
                newPosY = THREE.MathUtils.lerp(newPosY, targetY, vacuumProgress);
                newPosX = THREE.MathUtils.lerp(newPosX, 0, vacuumProgress);
            }

            // Phase 2: Instant Violin Shatter Splash (yRatio from 1.05 down to 0.60)
            // The millisecond it touches the terminal edge, it instantly vanishes and sprays
            if (yRatio <= 1.05 && yRatio > 0.60) {
                // Hard-pin the explosion origin point slightly above the terminal top edge
                const terminalTopWebGL = viewport.height * (0.5 - yRatio);
                newPosY = terminalTopWebGL + (viewport.height * 0.10);
                newPosX = 0;

                const t = 1.0 - ((yRatio - 0.60) / 0.45); // 0.0 to 1.0 explosion progress

                // 1. Instant Main Bubble Vanish (No squash, just gone)
                distortionMultiplier = 1.0;
                finalScaleX = 0;
                finalScaleY = 0;
                finalScaleZ = 0;

                if (materialRef.current) {
                    materialRef.current.opacity = 0;
                    materialRef.current.transmission = 0;
                }

                // 2. Wow Factor: 15,000 Particle High-Fidelity Splash Spray
                if (pointsRef.current) {
                    pointsRef.current.visible = true;
                    pointsRef.current.position.y = newPosY;
                    pointsRef.current.position.x = newPosX;

                    // AMAZING 60FPS UPGRADE: Update ONE uniform instead of looping 15,000 times in JS!
                    if (pointsRef.current.material.uniforms) {
                        pointsRef.current.material.uniforms.uProgress.value = t; // Full force 0 to 1
                    }
                }
            }

            // Phase 3: Functionally Dead (yRatio <= 0.60)
            if (yRatio <= 0.60) {
                if (materialRef.current) {
                    materialRef.current.opacity = 0;
                    materialRef.current.transmission = 0;
                }
                if (pointsRef.current) {
                    pointsRef.current.visible = false;
                }
            }

            // Phase 0: Normal Glass (yRatio > 1.2)
            if (yRatio > 1.2) {
                if (materialRef.current) {
                    materialRef.current.opacity = 0.9;
                    materialRef.current.transmission = 1.0;
                    materialRef.current.color.lerp(new THREE.Color("#ffffff"), 0.1);
                }
                if (pointsRef.current) {
                    pointsRef.current.visible = false;
                }
            }
        } else {
            // Failsafe: if DOM element missing, restore normal
            if (materialRef.current) {
                materialRef.current.opacity = 0.9;
                materialRef.current.transmission = 1.0;
                materialRef.current.color.lerp(new THREE.Color("#ffffff"), 0.1);
            }
            if (pointsRef.current) {
                pointsRef.current.visible = false;
            }
        }

        if (!isNaN(newPosX)) meshRef.current.position.x = newPosX;
        if (!isNaN(newPosY)) meshRef.current.position.y = newPosY;

        if (isNaN(finalScaleX) || finalScaleX < 0.1) finalScaleX = 1;
        if (isNaN(finalScaleY) || finalScaleY < 0.1) finalScaleY = 1;
        if (isNaN(finalScaleZ) || finalScaleZ < 0.1) finalScaleZ = 1;

        meshRef.current.scale.set(finalScaleX, finalScaleY, finalScaleZ);
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

            {/* Phase 36: Realistic Fluid Splash */}
            <points ref={pointsRef} visible={false}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={SPLASH_PARTICLES}
                        array={positionsBuffer}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-velocity"
                        count={SPLASH_PARTICLES}
                        array={velocitiesBuffer}
                        itemSize={3}
                    />
                </bufferGeometry>
                <shaderMaterial
                    uniforms={shaderUniforms}
                    vertexShader={`
                        attribute vec3 velocity;
                        uniform float uProgress;
                        varying float vAlpha;
                        
                        void main() {
                            // GPU Kinematic Physics: position = start + (velocity * time) - gravity
                            vec3 pos = position;
                            pos.x += velocity.x * uProgress;
                            pos.z += velocity.z * uProgress;
                            // Heavy downward gravity arc (-200.0 * t^2)
                            pos.y += (velocity.y * uProgress) - (200.0 * uProgress * uProgress);
                            
                            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                            
                            // Size attenuation so particles get smaller further away
                            gl_PointSize = 150.0 / -mvPosition.z; 
                            gl_Position = projectionMatrix * mvPosition;
                            
                            // Fade opacity based on progress settling into water
                            vAlpha = max(0.0, 1.0 - pow(uProgress * 1.5, 2.0));
                        }
                    `}
                    fragmentShader={`
                        uniform sampler2D uTexture;
                        varying float vAlpha;
                        
                        void main() {
                            // Sample the radial canvas texture
                            vec4 texColor = texture2D(uTexture, gl_PointCoord);
                            // Output glowing cyan spray
                            gl_FragColor = vec4(0.0, 1.0, 1.0, texColor.a * vAlpha);
                        }
                    `}
                    transparent={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
};

export default LiquidBlob;
