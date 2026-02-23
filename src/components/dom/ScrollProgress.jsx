import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ScrollProgress = () => {
    // Track global body scroll
    const { scrollYProgress } = useScroll();

    // Smooth out the progress bar so it doesn't snap instantly on fast scrolls
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Translate scroll into a 360 rotation for the crosshair
    const rotate = useTransform(scaleY, [0, 1], [0, 360]);

    // Map scroll percentage to digits (00 to 100)
    const progressPercentage = useTransform(scaleY, [0, 1], [0, 100]);

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6 pointer-events-none mix-blend-difference hidden md:flex">

            {/* Percentage Readout */}
            <motion.div className="text-[10px] tracking-[0.3em] font-black text-cyan-400 opacity-80" style={{ rotate: 90 }}>
                {/* Framer motion hack to display rounded animated numbers */}
                <motion.span>{useTransform(progressPercentage, (p) => `${Math.round(p)}%`)}</motion.span>
            </motion.div>

            {/* The Track */}
            <div className="relative w-[1px] h-[30vh] bg-white/10 overflow-hidden">
                {/* The fill line */}
                <motion.div
                    className="absolute top-0 left-0 w-full bg-cyan-400 origin-top shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                    style={{ height: "100%", scaleY }}
                />
            </div>

            {/* Rotating Crosshair */}
            <motion.div
                className="w-8 h-8 relative flex items-center justify-center"
                style={{ rotate }}
            >
                {/* Horizontal line */}
                <div className="absolute w-full h-[1px] bg-white/50" />
                {/* Vertical line */}
                <div className="absolute h-full w-[1px] bg-white/50" />
                {/* Center dot */}
                <div className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_5px_rgba(34,211,238,1)]" />
            </motion.div>

        </div>
    );
};

export default ScrollProgress;
