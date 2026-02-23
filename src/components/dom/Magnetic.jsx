import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Magnetic = ({ children, threshold = 0.5, strength = 0.5, className = "" }) => {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Track the physical offset from the center
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Apply strict spring physics for that "snappy" rubber-band feel
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        // Calculate the center of the element
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Calculate distance from center
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        // Apply threshold and strength to pull the element towards the mouse
        x.set(distanceX * threshold * strength);
        y.set(distanceY * threshold * strength);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        // Snap back to zero origin instantly via spring
        x.set(0);
        y.set(0);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{ x: springX, y: springY }}
            className={`inline-block origin-center ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.div>
    );
};

export default Magnetic;
