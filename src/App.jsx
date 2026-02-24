import React, { Suspense, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/dom/Header';
import Skills from './components/dom/Skills';
import WorksGallery from './components/dom/WorksGallery';
import FooterReveal from './components/dom/FooterReveal';
import Scene from './components/canvas/Scene';
import CustomCursor from './components/dom/CustomCursor';
import VelocityMarquee from './components/dom/VelocityMarquee';
import Experience from './components/dom/Experience';
import WorkExperience from './components/dom/WorkExperience';
import KineticText from './components/dom/KineticText';
import ScrollProgress from './components/dom/ScrollProgress';
import PerimeterLights from './components/dom/PerimeterLights';
import SystemStats from './components/dom/SystemStats';
import AnimatedTitle from './components/dom/AnimatedTitle';
import TerminalModule from './components/dom/TerminalModule';
import GlitchText from './components/dom/GlitchText';
import AILoader from './components/dom/AILoader';
import AIChatBot from './components/dom/AIChatBot';
import AdvancedGallery from './components/dom/AdvancedGallery';

function App() {
  const [activeAdvancedCategory, setActiveAdvancedCategory] = useState(null);
  const { scrollY } = useScroll();

  // Visceral Hero Parallax (Falls backward into the void)
  const heroY = useTransform(scrollY, [0, 1000], [0, 400]);
  const heroScale = useTransform(scrollY, [0, 1000], [1, 0.7]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  return (
    <>
      <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
        <PerimeterLights />
        <ScrollProgress />
        <SystemStats />
        <Header />
        {/* New combined DOM content */}
        <div className="w-full relative z-10 text-white mix-blend-difference pointer-events-none">
          {/* Hero space - Perfectly centered and slightly elevated */}
          <div className="h-screen flex flex-col justify-center items-center pointer-events-none pb-[15vh]">
            {/* Main Name pushed into Z-depth on scroll */}
            <motion.h1
              style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
              className="text-6xl md:text-[10vw] font-black tracking-tighter leading-[0.85] text-center text-3d-glow flex flex-col items-center"
            >
              <GlitchText text="HARDIK" as="span" className="block" />
              <GlitchText text="SHARMA" as="span" className="block" />
            </motion.h1>

            {/* Animated Professional Text Strip (Fades out quickly) */}
            <motion.div
              style={{ opacity: useTransform(scrollY, [0, 400], [1, 0]) }}
              className="relative w-[90%] md:w-[600px] px-4 py-2 bg-cyan-900/20 border border-cyan-500/30 backdrop-blur-md rounded-full mt-6 flex justify-center items-center"
            >
              <AnimatedTitle />
            </motion.div>
          </div>

          {/* About Section */}
          <div className="min-h-[150vh] flex flex-col justify-center px-6 md:px-24">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <KineticText
                text="01 — ABOUT & SKILLS"
                className="text-md md:text-xl tracking-[0.3em] font-bold text-cyan-400 opacity-80 mb-6 md:mb-8"
              />
              <p className="text-xl md:text-5xl leading-tight font-medium opacity-90 max-w-3xl">
                I build digital experiences that live at the intersection of extreme mathematics and elite aesthetics.
              </p>

              {/* The cinematic skills grid */}
              <div className="w-full flex justify-center text-left mt-12">
                <Skills />
              </div>
            </div>
          </div>

          {/* Interactive Work Experience Timeline */}
          <WorkExperience />

          {/* Epic Scrolling Marquee Break */}
          <VelocityMarquee />

          {/* GSAP-Style Horizontal Timeline */}
          <Experience />

          {/* Epic Cyberpunk Terminal Intermission */}
          <TerminalModule />

          {/* Work Section */}
          <div id="work" className="min-h-[150vh] flex flex-col justify-center px-6 md:px-24 scroll-mt-24">
            <div className="w-full flex flex-col items-center text-center mx-auto">
              <KineticText
                text="02 — SELECTED WORKS"
                className="text-md md:text-xl tracking-[0.3em] font-bold text-cyan-400 opacity-80 mb-4 max-w-4xl"
              />
              <p className="tracking-widest opacity-50 text-[10px] md:text-sm max-w-xl py-1 mb-6 md:mb-8">
                EXPLORE THE TECHNICAL ARCHITECTURE BY DISCIPLINE
              </p>
              <WorksGallery onOpenAdvanced={(cat) => setActiveAdvancedCategory(cat)} />
            </div>
          </div>

          {/* Animated Parallax Footer Section */}
          <FooterReveal />
        </div>

        {/* 3D Canvas Layer (Strictly background) */}
        <Suspense fallback={null}>
          <Scene />
        </Suspense>

        {/* Aesthetic Vignette */}
        <div className="fixed inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.45) 100%)',
          zIndex: 5
        }}></div>

        {/* Custom Physics Cursor */}
        <CustomCursor />
      </ReactLenis>

      {/* Vercel Speed Insights */}
      <SpeedInsights />

      {/* Cinematic Hacker/Sci-Fi Boot Sequence  */}
      <AILoader />

      {/* Simulated Heuristic AI Chat Agent */}
      <AIChatBot />

      {/* Advanced Full-Screen Gallery Overlay (z-[10000]) */}
      <AdvancedGallery
        category={activeAdvancedCategory}
        onClose={() => setActiveAdvancedCategory(null)}
      />
    </>
  );
}

export default App;
