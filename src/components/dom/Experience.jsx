import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const services = [
    {
        number: "01",
        title: "STRATEGIC SEO & DATA ANALYTICS",
        description: "Algorithm-driven growth architecture. I engineer deep-rooted SEO strategies backed by precision analytics to ensure extreme digital visibility."
    },
    {
        number: "02",
        title: "ELITE WEB DEVELOPMENT",
        description: "High-performance digital experiences. Specializing in WebGL, React Three Fiber, and brutalist performance-optimized architectures that dominate the browser."
    },
    {
        number: "03",
        title: "CINEMATIC VIDEO PRODUCTION",
        description: "Hollywood-grade post-production. From aggressive motion graphics to AI-augmented generative rendering, I build visual stories that overload the senses."
    },
    {
        number: "04",
        title: "GRAPHIC DESIGN & BRANDING",
        description: "Unforgiving aesthetic direction. I forge brand identities that cut through the noise using striking typography and high-contrast brutalist design."
    }
];

const Experience = () => {
    const targetRef = useRef(null);

    // The container is 300vh tall to give us plenty of vertical scrolling room.
    // The useScroll hook tracks how far down this specific container we are.
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // We map 0% -> 100% of the vertical scroll into a 1% -> -75% horizontal shift (sliding 4 cards left)
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-black pointer-events-auto">
            {/* The sticky container stays glued to the screen while we scroll the 300vh height */}
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-6 md:gap-12 px-6 md:px-24">
                    {/* Intro Card */}
                    <div className="min-w-[80vw] md:min-w-[40vw] flex flex-col justify-center border-l-2 border-green-500/50 pl-6 md:pl-12">
                        <h2 className="text-sm tracking-[0.4em] font-bold text-green-400 opacity-80 mb-4">EXPERIENCE</h2>
                        <h3 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">
                            THE <br /><span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>SERVICES</span>
                        </h3>
                    </div>

                    {/* Service Cards */}
                    {services.map((service, index) => (
                        <div key={index} className="min-w-[80vw] md:min-w-[40vw] group relative h-[60vh] md:h-[50vh] flex flex-col justify-between p-6 md:p-12 overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl hover:bg-white/10 transition-colors duration-500">
                            <div className="absolute top-0 right-0 p-4 md:p-8 text-6xl md:text-8xl font-black text-white/5 group-hover:text-green-500/10 transition-colors duration-500 leading-none">
                                {service.number}
                            </div>

                            <h4 className="text-xl md:text-4xl font-bold uppercase tracking-tight max-w-[80%] relative z-10">
                                {service.title}
                            </h4>

                            <p className="text-sm md:text-lg opacity-60 font-medium relative z-10 max-w-[95%] md:max-w-[90%]">
                                {service.description}
                            </p>

                            {/* Hover accent line */}
                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-green-500 group-hover:w-full transition-all duration-700 ease-out" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
