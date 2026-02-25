import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Image, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion-3d';
import { AnimatePresence, motion as motionDOM } from 'framer-motion';
import KineticText from './KineticText';

// Import the curated JSON Manifest (Phase 45)
import archiveData from '../../data/galleryManifest.json';

// --- 3D Floating Video Plane (Custom Shader Material for Video Texture) ---
const VideoPlane = ({ url, position, index, total, title, onClick }) => {
    const meshRef = useRef();
    const videoRef = useRef(null);
    const [hovered, setHovered] = useState(false);
    const { viewport } = useThree();

    // Scale down massively on portrait mobile screens to stop clipping
    const scaleFactor = viewport.width < 5 ? 0.6 : 1;

    // Initialize Video DOM Element exactly once
    const videoTexture = useMemo(() => {
        const vid = document.createElement('video');
        vid.src = url;
        vid.crossOrigin = "Anonymous";
        vid.loop = true;
        vid.muted = true;
        vid.playsInline = true;
        vid.preload = "none"; // Hard throttle network
        videoRef.current = vid;
        const texture = new THREE.VideoTexture(vid);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBAFormat;
        return texture;
    }, [url]);

    // Spring Physics on Hover
    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Target Z position springs forward if hovered
        const targetZ = hovered ? position[2] + 2 : position[2];
        const targetScale = hovered ? 1.05 * scaleFactor : 1.0 * scaleFactor;

        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, delta * 4);
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, delta * 4));

        // Slight organic float
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.1;
    });

    const handlePointerOver = (e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
        if (videoRef.current) videoRef.current.play().catch(() => { });
    };

    const handlePointerOut = (e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <group position={position} onClick={onClick}>
            <mesh
                ref={meshRef}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
            >
                <planeGeometry args={[16 / 4, 9 / 4]} />
                <meshBasicMaterial map={videoTexture} toneMapped={false} />

                {/* 3D Title rendered natively in WebGL */}
                <Text
                    position={[0, -1.4 * scaleFactor, 0]}
                    fontSize={0.15 * scaleFactor}
                    color={hovered ? "#22d3ee" : "white"}
                    anchorX="center"
                    anchorY="top"
                    maxWidth={4 * scaleFactor}
                    textAlign="center"
                >
                    {title.toUpperCase()}
                </Text>
            </mesh>
        </group>
    );
};

// --- 3D Floating Image Plane (Using Drei Image) ---
const ImagePlane = ({ url, position, index, title, onClick }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);
    const { viewport } = useThree();

    const scaleFactor = viewport.width < 5 ? 0.6 : 1;

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        const targetZ = hovered ? position[2] + 2 : position[2];
        const targetScale = hovered ? 1.05 * scaleFactor : 1.0 * scaleFactor;

        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, delta * 4);
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, delta * 4));
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.15;
    });

    const handlePointerOver = (e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = (e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
    };

    return (
        <group position={position} onClick={onClick}>
            <mesh ref={meshRef} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
                <Image url={url} transparent opacity={0.9} scale={[(16 / 4) * scaleFactor, (9 / 4) * scaleFactor]} />
                <Text
                    position={[0, -1.4 * scaleFactor, 0]}
                    fontSize={0.15 * scaleFactor}
                    color={hovered ? "#22d3ee" : "white"}
                    anchorX="center"
                    anchorY="top"
                    maxWidth={4 * scaleFactor}
                    textAlign="center"
                >
                    {title.toUpperCase()}
                </Text>
            </mesh>
        </group>
    );
};

// --- The Scrollable 3D Cloud ---
const CloudScene = ({ items, onSelect }) => {
    const scroll = useScroll();
    const groupRef = useRef();
    const { viewport } = useThree();

    // Mathematically distribute items along a massive Z-axis tube
    const positions = useMemo(() => {
        return items.map((_, i) => {
            const z = -(i * 3); // Space them out heavily on Z
            // Stagger X and Y slightly for an scattered "cloud" look
            const x = (Math.random() - 0.5) * (viewport.width * 0.5);
            const y = (Math.random() - 0.5) * (viewport.height * 0.3);
            return [x, y, z];
        });
    }, [items, viewport]);

    useFrame((state, delta) => {
        // Tie camera Z position directly to scroll progress
        // Total depth is items.length * 3
        const scrollOffset = scroll.offset;
        const totalDepth = items.length * 3;

        state.camera.position.z = THREE.MathUtils.lerp(
            state.camera.position.z,
            (-(scrollOffset * totalDepth)) + 5, // Offset slightly so we see the first item
            delta * 4
        );
    });

    return (
        <group ref={groupRef}>
            {items.map((item, index) => {
                if (item.type === 'video' && item.video) {
                    return <VideoPlane key={item.id} url={item.video} title={item.title} position={positions[index]} index={index} onClick={() => onSelect(item)} />
                } else if (item.type === 'image' && item.image) {
                    return <ImagePlane key={item.id} url={item.image} title={item.title} position={positions[index]} index={index} onClick={() => onSelect(item)} />
                }
                return null;
            })}

            {/* End of Registry Marker */}
            <Text
                position={[0, 0, -(items.length * 3) - 5]}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
                opacity={0.3}
            >
                [ END OF ARCHIVE ]
            </Text>
        </group>
    );
};

// --- Main Overlay Component ---
const AdvancedGallery3D = ({ category, onClose }) => {
    const items = archiveData[category] || [];

    // Safety Fallback if the array is empty
    if (items.length === 0) return null;

    const handleSelect = (item) => {
        console.log("Selected 3D Item:", item.title);
        // We could implement a fullscreen pop-out here later 
    };

    return (
        <AnimatePresence>
            <motionDOM.div
                data-lenis-prevent="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="fixed inset-0 z-[10000] bg-[#050505] overflow-hidden"
            >
                {/* HUD Overlay */}
                <div className="absolute inset-x-0 top-0 z-50 flex justify-between items-center p-6 md:p-8 pointer-events-none">
                    <div className="flex flex-col">
                        <span className="text-[10px] tracking-widest text-cyan-400 font-mono mb-2">
                            SPATIAL ARCHIVE // WEBGL RENDER
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-lg">
                            {category}
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="pointer-events-auto group relative px-6 py-3 border border-white/20 hover:border-cyan-400 rounded-full overflow-hidden transition-colors bg-black/50 backdrop-blur-md"
                    >
                        <span className="relative z-10 text-[10px] font-mono tracking-widest font-bold text-white group-hover:text-black transition-colors">
                            [ EXIT SIMULATION ]
                        </span>
                        <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                    </button>
                </div>

                {/* Cyberpunk Instructions */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none opacity-50 flex flex-col items-center">
                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase animate-pulse mb-2">Scroll To Navigate Z-Axis Depth</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400 to-transparent"></div>
                </div>

                {/* Massive 3D Canvas */}
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 45 }}
                    dpr={[1, 1.2]}
                    gl={{ antialias: true, powerPreference: "high-performance" }}
                >
                    <color attach="background" args={['#050505']} />

                    {/* Fog to hide the massive depth */}
                    <fog attach="fog" args={['#050505', 5, 20]} />

                    {/* Physics Scroll Wrapper with Asynchronous Image Loading Protection */}
                    <Suspense fallback={<Text position={[0, 0, 0]} color="cyan">INITIALIZING 3D ENVIRONMENT...</Text>}>
                        <ScrollControls pages={Math.max(1, items.length * 0.5)} damping={0.15} distance={1} infinite={false}>
                            <CloudScene items={items} onSelect={handleSelect} />
                        </ScrollControls>
                    </Suspense>
                </Canvas>
            </motionDOM.div>
        </AnimatePresence>
    );
};

export default AdvancedGallery3D;
