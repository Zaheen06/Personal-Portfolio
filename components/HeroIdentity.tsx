'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { personalInfo } from '@/data/portfolio';
import { fadeIn, fadeInUp, staggerContainer } from '@/lib/animations';

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
                            className="text-base md:text-lg text-text-secondary/80 mb-10 max-w-lg"
                        >
                            {personalInfo.bio}
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex gap-4 justify-center md:justify-start">
                            <a
                                href="#contact"
                                className="glass px-8 py-4 rounded-full text-text-primary font-medium cursor-magnetic glow hover:glow-text transition-all duration-300"
                            >
                                Get in Touch
                            </a>
                            <a
                                href="#projects"
                                className="glass-dark px-8 py-4 rounded-full text-text-primary font-medium cursor-magnetic hover:bg-white/10 transition-all duration-300"
                            >
                                View Work
                            </a>
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

                            {/* Glass frame */}
                            <div className="relative w-full h-full rounded-full glass p-2 animate-breath border-2 border-accent-primary/40">
                                <div className="w-full h-full rounded-full overflow-hidden border-2 border-accent-primary/30 shadow-2xl">
                                    {/* Placeholder for personal image */}
                                    <div className="w-full h-full bg-gradient-to-br from-accent-primary/30 to-accent-secondary/30 flex items-center justify-center text-7xl font-bold text-text-primary shadow-lg">
                                        {personalInfo.name.charAt(0)}
                                    </div>
                                    {

                                        //   <Image
                                        //     src={personalInfo.imagePath}
                                        //   alt={personalInfo.name}
                                        //     fill
                                        //     className="object-cover"
                                        //     priority
                                        //   />
                                    }
                                </div>
                            </div>

                            {/* Orbiting particles */}
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-3 h-3 bg-accent-primary rounded-full shadow-lg"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                    }}
                                    animate={{
                                        rotate: 360,
                                        x: [0, 150 * Math.cos((i * 2 * Math.PI) / 3)],
                                        y: [0, 150 * Math.sin((i * 2 * Math.PI) / 3)],
                                    }}
                                    transition={{
                                        duration: 10 + i * 2,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}
                                />
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
