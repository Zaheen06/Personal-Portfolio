'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { personalInfo } from '@/data/portfolio';
import { fadeIn, fadeInUp, staggerContainer } from '@/lib/animations';
import Image from 'next/image';

export default function HeroIdentity() {
    const mouse = useMousePosition();
    const heroRef = useRef<HTMLDivElement>(null);

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
            {/* Ambient background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-accent-primary/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-accent-secondary/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
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
                        <motion.div variants={fadeIn} className="mb-4">
                            <span className="text-accent-warm text-sm md:text-base font-mono tracking-wider uppercase">
                                Welcome to my world
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
                        >
                            <span className="gradient-text glow-text">{personalInfo.name}</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-xl md:text-2xl text-text-secondary mb-8 font-light"
                        >
                            {personalInfo.title}
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className="text-base md:text-lg text-text-secondary/90 mb-10 max-w-md leading-[1.8] tracking-wide"
                        >
                            {personalInfo.bio}
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex gap-4 justify-center md:justify-start">
                            <motion.a
                                href="#contact"
                                whileHover={{ y: -4, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="glass px-8 py-4 rounded-full text-text-primary font-medium cursor-magnetic glow hover:glow-text transition-all duration-300 relative overflow-hidden group"
                            >
                                <span className="relative z-10">Get in Touch</span>
                                <div className="absolute inset-0 bg-accent-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.a>
                            <motion.a
                                href="#projects"
                                whileHover={{ y: -4, scale: 1.02, x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                className="glass-dark px-8 py-4 rounded-full text-text-primary font-medium cursor-magnetic hover:bg-white/10 transition-all duration-300 flex items-center gap-2 group"
                            >
                                View Work
                                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    {/* Hero Image with Parallax Effect */}
                    <motion.div
                        variants={fadeIn}
                        className="relative order-1 md:order-2 flex justify-center"
                    >
                        <motion.div
                            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
                            style={{ x: offsetX, y: offsetY }}
                        >
                            {/* Glow effects */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full blur-2xl opacity-40"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.4, 0.6, 0.4],
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            />

                            {/* Glass frame with Breathing Animation */}
                            <motion.div
                                className="relative w-full h-full rounded-full glass p-2 border-2 border-accent-primary/40"
                                animate={{
                                    scale: [1, 1.02, 1],
                                    rotate: [0, 1, -1, 0]
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-accent-primary/30 shadow-2xl">
                                    <Image
                                        src={personalInfo.imagePath}
                                        alt={personalInfo.name}
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-110"
                                        priority
                                    />
                                    {/* Subtle gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 via-transparent to-transparent pointer-events-none" />
                                </div>
                            </motion.div>

                            {/* Orbiting particles with purposeful connection look */}
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-3 h-3 bg-accent-primary rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] z-20"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                    }}
                                    animate={{
                                        rotate: 360,
                                        scale: [1, 1.2, 1],
                                        opacity: [0.7, 1, 0.7],
                                        x: [0, 160 * Math.cos((i * 2 * Math.PI) / 3)],
                                        y: [0, 160 * Math.sin((i * 2 * Math.PI) / 3)],
                                    }}
                                    transition={{
                                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 3, repeat: Infinity },
                                        opacity: { duration: 3, repeat: Infinity },
                                        x: { duration: 15, repeat: Infinity, ease: "linear" }, // Orbit movement
                                        y: { duration: 15, repeat: Infinity, ease: "linear" }
                                    }}
                                >
                                    {/* Trail effect */}
                                    <div className="absolute inset-0 bg-accent-secondary blur-sm rounded-full opacity-50" />
                                </motion.div>
                            ))}
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
                <motion.div
                    className="w-6 h-10 border-2 border-white/30 rounded-full p-1"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div
                        className="w-1 h-2 bg-white rounded-full mx-auto"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
