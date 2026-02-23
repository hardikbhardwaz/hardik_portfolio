import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, Text3D } from '@react-three/drei';
import * as THREE from 'three';
import CustomShaderMaterial from 'three-custom-shader-material';

// We intercept the mesh vertex shader to pass raw world positions to the fragment
const textVertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
        vUv = uv;
        vPosition = position;
        csm_Position = position;
    }
`;

// A completely custom 3D glowing plasma fragment shader
const textFragmentShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vPosition;

    // Fast 2D noise algorithm for the glowing plasma
    float random (in vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
        // Map the moving coordinates relative to the 3D vertex position
        vec2 uv = vPosition.xy * 0.2;
        uv.y += uTime * 0.8; // Flow upward faster

        // Layer the noise to create sharp, electric scanlines/lightning inside the text
        float n1 = noise(uv * 4.0 + uTime * 2.0);
        float n2 = noise(uv * 8.0 - uTime * 1.5);
        
        // Use an absolute sine wave on the noise to create sharp glowing rings/bands inside
        float finalNoise = sin((n1 + n2) * 3.1415) * 0.5 + 0.5;
        // Sharpen the bands
        finalNoise = pow(finalNoise, 3.0); 
        
        // Colors mapping - Electric Blue and Intense Neon Pink (Contrast with the background liquid)
        vec3 colorBlue = vec3(0.0, 0.5, 1.0);
        vec3 colorPink = vec3(1.0, 0.0, 0.5);
        vec3 colorWhite = vec3(1.0, 1.0, 1.0);
        
        // Define intensely glowing hotspots inside the text
        vec3 baseGlow = mix(colorBlue, colorPink, n1);
        vec3 finalColor = mix(baseGlow, colorWhite, finalNoise);
        
        csm_Emissive = finalColor * (1.5 + finalNoise * 4.0); // Extreme bloom on the sharp lines
        csm_DiffuseColor = vec4(0.0, 0.0, 0.0, 1.0); // Pure black base for maximum contrast
    }
`;

const AnimatedText = () => {
    const materialRef = useRef();

    // Uniform object for time injection
    const uniforms = useMemo(() => ({
        uTime: { value: 0 }
    }), []);

    // Physics tick loop
    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <group position={[0, 0.5, 15]}> {/* Pulled MUCH further forward, away from the liquid bubble */}
            <Center>
                {/* 
                  Extruded 3D Text Geometry 
                  Using stable unpkg proxy for standard Helvetiker font to avoid build compilation bugs 
                */}
                <Text3D
                    font="https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.json"
                    size={3}
                    height={0.4} // Depth of extrusion
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.06}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    HARDIK
                    {/* Native Physical Lighting intertwined with our Custom GLSL Glow */}
                    <CustomShaderMaterial
                        ref={materialRef}
                        baseMaterial={THREE.MeshStandardMaterial}
                        vertexShader={textVertexShader}
                        fragmentShader={textFragmentShader}
                        uniforms={uniforms}
                        toneMapped={false} /* Tells ThreeJS not to cap the colors, allowing unlimited glow intensity */
                        roughness={0.2}
                        metalness={0.6}
                    />
                </Text3D>
            </Center>

            <Center position={[0, -3.8, 0]}>
                <Text3D
                    font="https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.json"
                    size={3}
                    height={0.4}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.06}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    SHARMA
                    <CustomShaderMaterial
                        ref={materialRef}
                        baseMaterial={THREE.MeshStandardMaterial}
                        vertexShader={textVertexShader}
                        fragmentShader={textFragmentShader}
                        uniforms={uniforms}
                        toneMapped={false}
                        roughness={0.2}
                        metalness={0.6}
                    />
                </Text3D>
            </Center>
        </group>
    );
};

export default AnimatedText;
