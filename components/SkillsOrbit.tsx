'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { skills } from '@/data/portfolio';
import { fadeIn, staggerContainer, staggerContainerFast } from '@/lib/animations';

export default function SkillsOrbit() {
    const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // Group skills by category
    const categories = Array.from(new Set(skills.map(s => s.category)));

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20"
            id="skills"
        >
            <motion.div
                className="max-w-7xl mx-auto w-full"
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
            >
                {/* Section Header */}
                <motion.div variants={fadeIn} className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-display font-bold gradient-text mb-4">
                        Skills & Expertise
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Technologies and tools I use to bring ideas to life
                    </p>
                </motion.div>

                {/* Skills organized by category */}
                <motion.div variants={staggerContainerFast} className="space-y-12">
                    {categories.map((category) => {
                        const categorySkills = skills.filter(s => s.category === category);

                        return (
                            <motion.div key={category} variants={fadeIn}>
                                <h3 className="text-xl font-display font-semibold mb-6 text-accent-neon">
                                    {category}
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {categorySkills.map((skill, idx) => (
                                        <motion.div
                                            key={skill.name}
                                            className="relative group cursor-pointer"
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            onHoverStart={() => setSelectedSkill(idx)}
                                            onHoverEnd={() => setSelectedSkill(null)}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <div className="glass-dark p-6 rounded-xl h-full flex flex-col items-center text-center transition-all duration-300 group-hover:glow">
                                                {/* Skill icon/initial */}
                                                <div
                                                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4 font-display text-2xl font-bold transition-all duration-300"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${skill.color}40, ${skill.color}10)`,
                                                        border: `2px solid ${skill.color}`,
                                                    }}
                                                >
                                                    {skill.name.charAt(0)}
                                                </div>

                                                <h4 className="font-semibold text-text-primary mb-2">{skill.name}</h4>

                                                {/* Description on hover */}
                                                <motion.p
                                                    className="text-sm text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    initial={{ height: 0 }}
                                                    animate={{ height: 'auto' }}
                                                >
                                                    {skill.description}
                                                </motion.p>

                                                {/* Animated border on hover */}
                                                <motion.div
                                                    className="absolute inset-0 rounded-xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    style={{ borderColor: skill.color }}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-accent-neon/30 rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.3, 1, 0.3],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 3 + i,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: i * 0.3,
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
