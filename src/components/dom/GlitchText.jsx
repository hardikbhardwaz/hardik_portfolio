import React from 'react';
import { motion } from 'framer-motion';

// This wrapper requires the CSS keyframes defined in index.css
const GlitchText = ({ text, as: Component = "span", className = "", style = {} }) => {
    return (
        <Component className={`glitch-wrapper ${className}`} data-text={text} style={style}>
            {text}
        </Component>
    );
};

export default GlitchText;
