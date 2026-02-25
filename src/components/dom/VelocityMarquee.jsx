import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";

const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ParallaxText = ({ children, baseVelocity = 100 }) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const directionFactor = useRef(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    return (
        <div className="parity-marquee py-12 md:py-24 overflow-hidden m-0 whitespace-nowrap flex flex-nowrap rotate-[-2deg] my-12 md:my-24 bg-green-500/10 border-y border-green-500/30 backdrop-blur-sm pointer-events-none origin-left shadow-[0_0_50px_rgba(0,255,128,0.1)]">
            <motion.div className="flex whitespace-nowrap flex-nowrap font-black uppercase text-[10vw] leading-none tracking-tighter text-transparent stroke-text" style={{ x, willChange: 'transform' }}>
                {/* We map multiple children to ensure an infinite loop without clipping */}
                <span className="block mr-[2vw]">{children} </span>
                <span className="block mr-[2vw]">{children} </span>
                <span className="block mr-[2vw]">{children} </span>
                <span className="block mr-[2vw]">{children} </span>
            </motion.div>
        </div>
    );
};

const VelocityMarquee = () => {
    // Injecting custom CSS for the outline text effect here so we don't bloat index.css
    return (
        <section className="w-full relative z-20 overflow-hidden mix-blend-difference">
            <style>{`
                .stroke-text {
                    color: transparent;
                    -webkit-text-stroke: 1px rgba(0, 255, 128, 0.4);
                }
            `}</style>
            <ParallaxText baseVelocity={-2}>DIGITAL MARKETING — GRAPHIC DESIGN — VIDEO EDITING — WEB DEVELOPMENT — </ParallaxText>
            <ParallaxText baseVelocity={2}>SEO & ANALYTICS — AI CREATIVE AUTOMATION — UX/UI EXPERTISE — PRODUCTION — </ParallaxText>
        </section>
    );
};

export default VelocityMarquee;
