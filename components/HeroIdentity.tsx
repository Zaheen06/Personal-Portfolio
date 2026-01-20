'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { personalInfo } from '@/data/portfolio';
import { fadeIn, fadeInUp, staggerContainer } from '@/lib/animations';
import Image from 'next/image';
import { ArrowRight, Download, Sparkles } from 'lucide-react';

export default function HeroIdentity() {
    const mouse = useMousePosition();
    const heroRef = useRef<HTMLDivElement>(null);
    const [displayedTitle, setDisplayedTitle] = useState('');
    const fullTitle = personalInfo.title;

    // Typewriter effect
    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= fullTitle.length) {
                setDisplayedTitle(fullTitle.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 50); // Speed of typing

        return () => clearInterval(interval);
    }, [fullTitle]);

    // Calculate parallax offset based on mouse position
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

    const offsetX = useSpring(useTransform(useMotionValue(mouse.x), [0, centerX * 2], [-20, 20]), {
        damping: 20,
        stiffness: 100,
    });

    const offsetY = useSpring(useTransform(useMotionValue(mouse.y), [0, centerY * 2], [-20, 20]), {
        damping: 20,
        stiffness: 100,
    });

    // Update motion values when mouse moves
    useEffect(() => {
        offsetX.set((mouse.x - centerX) / 50);
        offsetY.set((mouse.y - centerY) / 50);
    }, [mouse, centerX, centerY, offsetX, offsetY]);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20"
            id="home"
        >
            {/* Enhanced ambient background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-accent-primary/20 rounded-full blur-3xl opacity-20"
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.1, 0.25, 0.1],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-accent-secondary/20 rounded-full blur-3xl opacity-20"
                    animate={{
                        scale: [1.15, 1, 1.15],
                        opacity: [0.1, 0.25, 0.1],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Floating code snippets decoration */}
                <motion.div
                    className="absolute top-32 right-32 text-accent-primary/20 font-mono text-sm hidden lg:block"
                    animate={{ y: [0, -10, 0], opacity: [0.1, 0.2, 0.1], rotate: [0, 3, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                >
                    const developer = &#123; creative: true &#125;;
                </motion.div>
                <motion.div
                    className="absolute bottom-40 left-20 text-accent-secondary/20 font-mono text-sm hidden lg:block"
                    animate={{ y: [0, 10, 0], opacity: [0.1, 0.2, 0.1], rotate: [0, -3, 0] }}
                    transition={{ duration: 12, repeat: Infinity }}
                >
                    &lt;Future /&gt;
                </motion.div>
            </div>

            <motion.div
                className="relative z-10 max-w-6xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div variants={fadeInUp} className="text-center md:text-left order-2 md:order-1">
                        {/* Status Badge */}
                        <motion.div
                            variants={fadeIn}
                            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark border-accent-success/20 hover:bg-accent-success/10 transition-colors duration-300 group"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-success opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-success group-hover:scale-110 transition-transform duration-300"></span>
                            </span>
                            <span className="text-accent-success/90 text-sm font-medium tracking-wide">Available for Freelance</span>
                        </motion.div>

                        <motion.div variants={fadeIn} className="mb-4">
                            <span className="text-accent-warm text-sm md:text-base font-mono tracking-wider uppercase flex items-center gap-2 justify-center md:justify-start">
                                <Sparkles className="w-4 h-4 animate-pulse" />
                                Building Intelligent Web Experiences
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
                        >
                            <span className="animate-gradient bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-warm bg-[length:200%_auto] bg-clip-text text-transparent">
                                {personalInfo.name}
                            </span>
                        </motion.h1>

                        <motion.div
                            variants={fadeInUp}
                            className="text-xl md:text-2xl text-text-secondary mb-6 font-light flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start h-20 md:h-10"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-white font-medium">
                                    {displayedTitle}
                                </span>
                                <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="w-[2px] h-6 bg-accent-primary block"
                                />
                            </div>
                            <span className="hidden md:inline text-white/20">|</span>
                            <span className="text-accent-secondary flex items-center gap-2 bg-accent-secondary/10 px-3 py-1 rounded-full text-sm border border-accent-secondary/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary"></span>
                                AI Enthusiast
                            </span>
                        </motion.div>

                        <motion.p
                            variants={fadeInUp}
                            className="text-base md:text-lg text-text-secondary/80 mb-10 max-w-lg leading-relaxed"
                        >
                            {personalInfo.bio}
                        </motion.p>



                        {/* CTA Buttons - Improved hierarchy */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <motion.a
                                href="#projects"
                                whileHover={{ y: -4, scale: 1.02, boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.4)" }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold shadow-lg shadow-accent-primary/25 flex items-center gap-2 group transition-all duration-300 relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    View Projects
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                                {/* Button shine effect */}
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                            </motion.a>

                            <motion.a
                                href="#contact"
                                whileHover={{ y: -4, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="glass-dark px-8 py-4 rounded-full text-text-primary font-medium hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
                            >
                                Get in Touch
                            </motion.a>


                        </motion.div>
                    </motion.div>

                    {/* Hero Image with Parallax Effect */}
                    <motion.div
                        variants={fadeIn}
                        className="relative order-1 md:order-2 flex justify-center perspective-1000"
                    >
                        <motion.div
                            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
                            style={{ x: offsetX, y: offsetY, rotateX: useTransform(offsetY, [-20, 20], [5, -5]), rotateY: useTransform(offsetX, [-20, 20], [-5, 5]) }}
                        >
                            {/* Detailed Glow effects */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-accent-primary/40 to-accent-secondary/40 rounded-full blur-3xl opacity-40 mix-blend-screen"
                                animate={{
                                    scale: [1, 1.15, 1],
                                    opacity: [0.4, 0.6, 0.4],
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            />

                            {/* Glass frame with Breathing Animation */}
                            <motion.div
                                className="relative w-full h-full rounded-full glass p-3 border border-white/10"
                                animate={{
                                    y: [0, -10, 0]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 shadow-2xl bg-bg-secondary group">
                                    <Image
                                        src={personalInfo.imagePath}
                                        alt={personalInfo.name}
                                        fill
                                        sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />
                                    {/* Vignette & Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent pointer-events-none opacity-60" />
                                    <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] rounded-full pointer-events-none" />
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary/60">Scroll</span>
                    <motion.div
                        className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent"
                    />
                </div>
            </motion.div>
        </section>
    );
}
