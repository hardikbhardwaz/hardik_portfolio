import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);

    const springConfigOuter = { damping: 20, stiffness: 300, mass: 0.5 };
    const springConfigInner = { damping: 30, stiffness: 400, mass: 0.2 };

    // We spring the outer ring a bit looser for a liquid drag effect
    const cursorXSpring = useSpring(cursorX, springConfigOuter);
    const cursorYSpring = useSpring(cursorY, springConfigOuter);

    // The inner dot tracks tighter
    const cursorXInner = useSpring(cursorX, springConfigInner);
    const cursorYInner = useSpring(cursorY, springConfigInner);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            // Detect if hovering over clickable or interactive DOM nodes
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('interactive')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="hidden md:block">
            {/* Outer Plasma Ring */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: isHovering ? 80 : 32,
                    height: isHovering ? 80 : 32,
                    border: isHovering ? '1px solid rgba(255,255,255,0.8)' : '1px solid rgba(255,255,255,0.4)',
                    backgroundColor: isHovering ? 'rgba(255,255,255,0.1)' : 'transparent',
                    backdropFilter: isHovering ? 'blur(2px)' : 'none',
                    transition: 'width 0.3s ease-out, height 0.3s ease-out, border 0.3s ease-out, background-color 0.3s ease-out'
                }}
            />
            {/* Inner Precision Dot */}
            <motion.div
                className="fixed top-0 left-0 rounded-full bg-white pointer-events-none z-[10000] mix-blend-difference"
                style={{
                    x: cursorXInner,
                    y: cursorYInner,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: isHovering ? 4 : 8,
                    height: isHovering ? 4 : 8,
                    transition: 'width 0.2s ease-out, height 0.2s ease-out'
                }}
            />
        </div>
    );
};

export default CustomCursor;
