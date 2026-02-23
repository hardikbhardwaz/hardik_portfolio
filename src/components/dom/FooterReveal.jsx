import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Contact from './Contact';

const FooterReveal = () => {
    const containerRef = useRef(null);

    // Track the scroll specifically when this closing container breaches the viewport
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"] // Track from when it enters the screen to when it fully occupies it
    });

    // We map the Y translation from -50% to 0%.
    // Because the user is scrolling DOWN, translating the inner Y from a negative percentage UP to 0
    // counter-acts the scroll speed, making the footer feel incredibly "heavy" 
    // and giving the illusion that the rest of the site is a curtain pulling up to reveal it.
    const y = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);

    return (
        <div ref={containerRef} className="relative w-full overflow-hidden" style={{ minHeight: '100vh' }}>
            <motion.div style={{ y }} className="w-full h-full">
                <Contact />
            </motion.div>
        </div>
    );
};

export default FooterReveal;
