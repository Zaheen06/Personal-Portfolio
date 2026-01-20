'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { projects } from '@/data/portfolio';
import { ExternalLink, Github, X, ArrowRight } from 'lucide-react';
import { fadeIn, fadeInUp, staggerContainer } from '@/lib/animations';

export default function ProjectExperience() {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const selectedProjectData = selectedProject !== null ? projects[selectedProject] : null;

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20"
            id="projects"
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
                        Featured Projects
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Experiences I&apos;ve crafted to solve real-world problems
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            variants={fadeInUp}
                            className="group relative cursor-pointer"
                            onClick={() => setSelectedProject(idx)}
                            whileHover={{ y: -10 }}
                        >
                            <div
                                className="glass-dark p-6 rounded-2xl h-full transition-all duration-500 group-hover:shadow-2xl"
                                style={{
                                    boxShadow: `0 10px 40px ${project.color}20`,
                                }}
                            >
                                {/* Project preview with Abstract Identity Watermark */}
                                <div
                                    className="w-full h-48 rounded-xl mb-6 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500"
                                >
                                    {/* Animated Gradient Background */}
                                    <div
                                        className="absolute inset-0 w-[200%] h-[200%] animate-gradient-move"
                                        style={{
                                            background: `linear-gradient(45deg, ${project.color}10, ${project.color}30, ${project.color}10)`,
                                            backgroundSize: '200% 200%',
                                        }}
                                    />

                                    {/* Abstract Identity: Giant Watermark Letter */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                                        <span
                                            className="text-[12rem] font-bold opacity-10 mix-blend-overlay filter blur-sm select-none transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700"
                                            style={{ color: project.color }}
                                        >
                                            {project.title.charAt(0)}
                                        </span>
                                    </div>

                                    {/* Noise Overlay */}
                                    <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />

                                    {/* Outcome Label (Top Right) */}
                                    <div className="absolute top-4 right-4 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white shadow-lg">
                                            {project.impact.includes('users') ? 'User Growth' : project.impact.includes('collaboration') ? 'Realtime' : 'Product'}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-display font-bold mb-3 text-text-primary group-hover:gradient-text transition-all duration-300">
                                    {project.title}
                                </h3>

                                <p className="text-text-secondary mb-4 line-clamp-2">
                                    {project.description}
                                </p>

                                {/* Tech stack with Glow on Hover */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.slice(0, 3).map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-xs px-3 py-1 rounded-full glass text-text-secondary group-hover:text-white group-hover:border-accent-primary/30 transition-colors duration-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 3 && (
                                        <span className="text-xs px-3 py-1 rounded-full glass text-text-secondary">
                                            +{project.technologies.length - 3}
                                        </span>
                                    )}
                                </div>

                                {/* Impact Line */}
                                <div className="mt-auto pt-4 border-t border-white/5 mb-4">
                                    <p className="text-sm font-medium text-accent-primary/90 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse"></span>
                                        {project.impact.split(' ').slice(0, 6).join(' ')}...
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-text-primary group-hover:text-accent-primary transition-colors duration-300">
                                    <span>View Details</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </div>

                                {/* Hover glow effect */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle at 50% 50%, ${project.color}15, transparent 70%)`,
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProjectData && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                background: `linear-gradient(135deg, ${selectedProjectData.color}20, ${selectedProjectData.color}05)`,
                                backdropFilter: 'blur(10px)',
                            }}
                        />

                        {/* Modal Content */}
                        <motion.div
                            className="relative glass-dark rounded-3xl p-8 md:p-12 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center glass rounded-full hover:bg-white/20 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Project content */}
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 gradient-text">
                                {selectedProjectData.title}
                            </h2>

                            <p className="text-lg text-text-secondary mb-8">
                                {selectedProjectData.description}
                            </p>

                            {/* Problem → Solution → Impact */}
                            <div className="space-y-6 mb-8">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-accent-warm">Problem</h3>
                                    <p className="text-text-secondary">{selectedProjectData.problem}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-accent-neon">Solution</h3>
                                    <p className="text-text-secondary">{selectedProjectData.solution}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-accent-glow">Impact</h3>
                                    <p className="text-text-secondary">{selectedProjectData.impact}</p>
                                </div>
                            </div>

                            {/* Technologies */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProjectData.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 glass rounded-full text-sm text-text-primary"
                                            style={{
                                                borderColor: selectedProjectData.color,
                                                borderWidth: '1px',
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Links */}
                            <div className="flex gap-4">
                                {selectedProjectData.demoUrl && (
                                    <a
                                        href={selectedProjectData.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="glass px-6 py-3 rounded-full flex items-center gap-2 hover:glow transition-all"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        <span>Live Demo</span>
                                    </a>
                                )}
                                {selectedProjectData.githubUrl && (
                                    <a
                                        href={selectedProjectData.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="glass-dark px-6 py-3 rounded-full flex items-center gap-2 hover:bg-white/10 transition-all"
                                    >
                                        <Github className="w-4 h-4" />
                                        <span>View Code</span>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
