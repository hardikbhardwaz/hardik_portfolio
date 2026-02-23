import React, { useState, useEffect } from 'react';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:',.<>/?";

const AnimatedTitle = () => {
    const titles = [
        "DIGITAL MARKETING | GRAPHICs/VIDEO EDITOR",
        "WEB DEVELOPMENT | AI AGENTS & AUTOMATIONS"
    ];
    const [titleIndex, setTitleIndex] = useState(0);
    const [displayText, setDisplayText] = useState(titles[0]);

    // Switch the target title every 4 seconds (gives time to read after the 1s decrypt)
    useEffect(() => {
        const interval = setInterval(() => {
            setTitleIndex((prev) => (prev + 1) % titles.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Matrix / Cyberpunk Decrypt Animation
    useEffect(() => {
        let iteration = 0;
        const targetText = titles[titleIndex];
        let animationFrame;

        const scramble = () => {
            setDisplayText((prev) => {
                return targetText
                    .split("")
                    .map((char, index) => {
                        // Keep spaces intact so the width doesn't jump crazily
                        if (char === " ") return " ";

                        // If we've passed this index, reveal the true character
                        if (index < iteration) {
                            return targetText[index];
                        }

                        // Otherwise, return a random glitch character
                        return LETTERS[Math.floor(Math.random() * LETTERS.length)];
                    })
                    .join("");
            });

            if (iteration >= targetText.length) {
                cancelAnimationFrame(animationFrame);
            } else {
                // Speed of deciphering. 1/2 = 2 frames per character. 
                // String is ~40 chars, so ~80 frames = ~1.2 seconds for full decrypt.
                iteration += 1 / 2;
                animationFrame = requestAnimationFrame(scramble);
            }
        };

        animationFrame = requestAnimationFrame(scramble);

        return () => cancelAnimationFrame(animationFrame);
    }, [titleIndex]);

    return (
        <div className="relative h-6 md:h-8 w-full flex items-center justify-center overflow-hidden">
            {/* 
                We use a mono-spaced font or close tracking here so the 
                random characters don't cause the container to violently shake.
                Adjusted the font size and tracking to prevent the text from clipping on mobile.
            */}
            <span className="text-[7px] sm:text-[9px] md:text-xs lg:text-sm tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.3em] font-mono font-bold text-cyan-300 uppercase whitespace-nowrap drop-shadow-[0_0_8px_rgba(0,255,208,0.8)]">
                {displayText}
            </span>
        </div>
    );
};

export default AnimatedTitle;
