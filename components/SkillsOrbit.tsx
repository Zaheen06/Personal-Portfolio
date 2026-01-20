'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { skills } from '@/data/portfolio';
import { fadeIn, staggerContainer } from '@/lib/animations';

export default function SkillsOrbit() {
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // Group skills into the 4 requested categories
    const skillGroups = {
        Frontend: skills.filter(s => ['Frontend', 'Styling', 'Animation'].includes(s.category)),
        Language: skills.filter(s => s.category === 'Language'),
        Backend: skills.filter(s => ['Backend', 'Database', 'API'].includes(s.category)),
        Tools: skills.filter(s => ['DevOps', 'Tools'].includes(s.category)),
    };

    // Stagger container animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Group enter one by one
            }
        }
    };

    const groupVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
        }
    };

    return (
        <section
            ref={ref}
            className="relative min-h-screen py-20 overflow-hidden"
            id="skills"
        >
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="space-y-16"
                >
                    {/* Header */}
                    <motion.div variants={fadeIn} className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-display font-bold gradient-text mb-4">
                            Skills & Expertise
                        </h2>
                        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                            My technical arsenal for building digital products
                        </p>
                    </motion.div>

                    {/* Skill Groups */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {Object.entries(skillGroups).map(([groupName, groupSkills], groupIndex) => (
                            <motion.div
                                key={groupName}
                                variants={groupVariants} // Animate groups
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="w-2 h-2 rounded-full bg-accent-primary"></span>
                                    <h3 className="text-sm font-mono uppercase tracking-widest text-text-muted">
                                        {groupName}
                                    </h3>
                                    <span className="h-px bg-border-primary flex-grow"></span>
                                </div>

                                <div className="flex flex-col gap-6">
                                    {groupSkills.map((skill, index) => (
                                        <motion.div
                                            key={skill.name}
                                            layoutId={`card-${skill.name}`}
                                            onClick={() => setSelectedSkill(skill.name)}
                                            className={`relative group cursor-pointer`}
                                            style={{
                                                // Controlled imbalance: Offset vertical position slightly for even vs odd items
                                                marginTop: index % 2 === 0 ? '0px' : '24px',
                                            }}
                                            whileHover={{
                                                scale: 1.02,
                                                x: 5, // Slight horizontal nudge on hover
                                            }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                        >
                                            <div
                                                className="glass-dark p-5 rounded-xl border border-white/5 group-hover:border-accent-primary/30 transition-colors duration-300 relative overflow-hidden"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold bg-bg-secondary group-hover:scale-110 transition-transform duration-300"
                                                        style={{
                                                            color: skill.color,
                                                            border: `1px solid ${skill.color}30`
                                                        }}
                                                    >
                                                        {skill.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
                                                            {skill.name}
                                                        </h4>
                                                        {/* Skill Context on Hover */}
                                                        <p className="text-xs text-text-muted group-hover:opacity-0 transition-opacity duration-200 absolute">
                                                            {skill.category}
                                                        </p>
                                                        <p className="text-xs text-accent-success opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1 truncate max-w-[150px]">
                                                            {(skill as any).usage ? (skill as any).usage.split(' ').slice(0, 4).join(' ') + '...' : 'Real-world production'}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Pulse glow on hover */}
                                                <div
                                                    className="absolute -right-4 -top-4 w-24 h-24 bg-accent-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                                    style={{ backgroundColor: skill.color }}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Expanded Card Overlay */}
            <AnimatePresence>
                {selectedSkill && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSkill(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                            {skills.filter(s => s.name === selectedSkill).map(skill => (
                                <motion.div
                                    key={skill.name}
                                    layoutId={`card-${skill.name}`}
                                    className="w-full max-w-lg bg-bg-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
                                >
                                    <div className="p-8 relative">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedSkill(null); }}
                                            className="absolute top-4 right-4 text-text-muted hover:text-white"
                                        >
                                            ✕
                                        </button>

                                        <div className="flex items-start gap-6 mb-6">
                                            <div
                                                className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-bold bg-bg-secondary shadow-lg"
                                                style={{ color: skill.color, border: `1px solid ${skill.color}40` }}
                                            >
                                                {skill.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-text-primary mb-1">{skill.name}</h3>
                                                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-text-secondary border border-white/10">
                                                    {skill.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-sm font-semibold text-accent-primary mb-1 uppercase tracking-wider">Description</h4>
                                                <p className="text-text-secondary text-base leading-relaxed">
                                                    {skill.description}
                                                </p>
                                            </div>

                                            {/* Usage Section as requested */}
                                            <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                                                <h4 className="text-sm font-semibold text-accent-success mb-2 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-success animate-pulse"></span>
                                                    Real World Usage
                                                </h4>
                                                <p className="text-sm text-text-secondary">
                                                    {(skill as any).usage || "Used in various production applications for scalable architecture."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer decoration */}
                                    <div
                                        className="h-2 w-full"
                                        style={{ background: `linear-gradient(90deg, ${skill.color}, transparent)` }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
