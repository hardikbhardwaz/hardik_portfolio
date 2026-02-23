import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const KineticText = ({ text, className, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const sentence = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delay: delay,
                staggerChildren: 0.04, // Snappy character stagger
            },
        },
    };

    const letter = {
        hidden: { opacity: 0, y: 50, rotateX: -90 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 200,
            },
        },
    };

    // Support multiple words by splitting by space, then splitting by letter
    return (
        <motion.h2
            ref={ref}
            className={`flex flex-wrap m-0 ${className}`}
            variants={sentence}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ perspective: "1000px" }}
        >
            {text.split(" ").map((word, index) => {
                return (
                    <span key={index} className="inline-block overflow-hidden mr-2 md:mr-4 last:mr-0">
                        {word.split("").map((char, index) => {
                            return (
                                <motion.span key={index} className="inline-block origin-bottom" variants={letter}>
                                    {char}
                                </motion.span>
                            );
                        })}
                    </span>
                );
            })}
        </motion.h2>
    );
};

export default KineticText;
