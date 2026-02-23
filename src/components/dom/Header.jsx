
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import Magnetic from './Magnetic';

const Header = () => {
    const { scrollY } = useScroll();
    const lenis = useLenis();

    const scrollTo = (targetId) => {
        if (lenis) {
            lenis.scrollTo(targetId, { offset: 0, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } else {
            document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Map scroll position to a subtle vertical drag on the center line
    const lineY = useTransform(scrollY, [0, 2000], [0, 15]);

    return (
        <header className="fixed top-8 left-0 w-full z-50 flex justify-between items-start px-12 pointer-events-none mix-blend-difference text-white">
            {/* Top Left Logo */}
            <div className="pointer-events-auto cursor-pointer opacity-90 hover:opacity-100 transition-opacity mt-2 md:mt-3 flex items-center h-10 md:h-12">
                <img
                    src="/hardik_logo.webp"
                    alt="Hardik Sharma Portfolio Logo"
                    className="h-full w-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                />
            </div>

            {/* Top Right Glowing Container */}
            <div
                className="flex items-center gap-6 px-8 py-3 rounded-full border border-green-500/30 bg-black/40 backdrop-blur-md pointer-events-auto"
                style={{
                    boxShadow: '0 0 20px rgba(0, 255, 128, 0.15), inset 0 0 10px rgba(0, 255, 128, 0.1)',
                }}
            >
                <div className="flex gap-4 md:gap-8 items-center pointer-events-auto">
                    <Magnetic strength={0.2} threshold={0.5}>
                        <button onClick={() => scrollTo('#work')} className="text-xs tracking-[0.2em] font-medium hover:text-cyan-400 transition-colors uppercase p-2">
                            Work
                        </button>
                    </Magnetic>
                    <Magnetic strength={0.2} threshold={0.5}>
                        <button onClick={() => scrollTo('#contact')} className="text-xs tracking-[0.2em] font-medium hover:text-cyan-400 transition-colors uppercase p-2">
                            Contact
                        </button>
                    </Magnetic>
                </div>
            </div>
        </header>
    );
};

export default Header;
