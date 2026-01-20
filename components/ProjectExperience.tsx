'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '@/data/portfolio';
import Image from 'next/image';
import { ArrowRight, TrendingUp, Zap, MapPin, FileText, Layout, ArrowUpRight } from 'lucide-react';
import { fadeIn, fadeInUp, staggerContainer } from '@/lib/animations';

interface ProjectCardProps {
    project: typeof projects[0];
    index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);
    const brightness = useTransform(mouseY, [-0.5, 0.5], [1.1, 0.9]);

    return (
        <motion.div
            variants={fadeInUp}
            className="group relative flex flex-col h-full perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    filter: useTransform(brightness, (b) => `brightness(${b})`),
                    transformStyle: "preserve-3d",
                }}
                className="relative glass-dark rounded-2xl overflow-hidden border border-white/5 group-hover:border-white/10 transition-colors duration-500 h-full flex flex-col shadow-xl"
            >
                {/* Shine Effect */}
                <motion.div
                    className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                    style={{
                        background: useTransform(
                            mouseX,
                            [-0.5, 0.5],
                            [
                                "linear-gradient(to right, transparent 0%, rgba(255,255,255,0) 100%)",
                                "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 100%)"
                            ] // Simplified shine for performance, or use a radial gradient tracking mouse
                        ),
                        backgroundImage: useTransform(
                            [mouseX, mouseY],
                            ([xVal, yVal]: number[]) => `radial-gradient(circle at ${50 + xVal * 100}% ${50 + yVal * 100}%, rgba(255,255,255,0.1), transparent 50%)`
                        )
                    }}
                />

                {/* Project Showcase Area */}
                <div className="relative h-64 w-full overflow-hidden bg-bg-secondary transform-style-3d">
                    {/* Background Gradient */}
                    <div
                        className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30"
                        style={{ background: `linear-gradient(45deg, ${project.color}, transparent)` }}
                    />

                    {/* Browser Mockup */}
                    <div className="absolute top-6 left-6 right-6 bottom-0 bg-bg-primary rounded-t-xl shadow-2xl border border-white/5 overflow-hidden transform transition-transform duration-500 group-hover:translate-y-2 group-hover:scale-[1.02]">
                        {/* Browser Header */}
                        <div className="h-6 bg-white/5 border-b border-white/5 flex items-center px-3 gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-400/80" />
                            <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                            <div className="w-2 h-2 rounded-full bg-green-400/80" />
                        </div>

                        {/* Project Image */}
                        <div className="relative h-full w-full">
                            {project.imageUrl ? (
                                <Image
                                    src={project.imageUrl}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/5">
                                    <Layout className="w-16 h-16" />
                                </div>
                            )}

                            {/* Hover Overlay with Button */}
                            <div className="absolute inset-0 bg-bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                <a
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 rounded-full bg-white text-bg-primary font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 hover:bg-gray-100"
                                >
                                    View Project <ArrowUpRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Category Categories Badge */}
                    <div className="absolute top-4 right-4 z-10 transform translate-z-10">
                        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white shadow-lg flex items-center gap-1">
                            {project.title.includes('Expense') ? 'FinTech' :
                                project.title.includes('Quiz') ? 'EduTech' :
                                    project.title.includes('Roadside') ? 'Realtime' :
                                        project.title.includes('Resume') ? 'Productivity' :
                                            'Client Work'}
                        </span>
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col transform-style-3d">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-2xl font-display font-bold text-text-primary group-hover:gradient-text transition-all duration-300">
                            {project.title}
                        </h3>
                    </div>

                    <p className="text-text-secondary mb-6 line-clamp-3 text-sm leading-relaxed">
                        {project.description}
                    </p>

                    <div className="mt-auto space-y-4">
                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 4).map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-text-muted transition-colors duration-300 group-hover:border-white/10 group-hover:text-text-secondary"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        {/* Impact / Stats */}
                        <div className="flex items-center gap-2 text-xs font-medium text-accent-primary/80">
                            {project.impact.toLowerCase().includes('insight') || project.impact.toLowerCase().includes('trend') ? (
                                <TrendingUp className="w-3.5 h-3.5" />
                            ) : project.impact.toLowerCase().includes('instant') || project.impact.toLowerCase().includes('automated') ? (
                                <Zap className="w-3.5 h-3.5" />
                            ) : project.impact.toLowerCase().includes('location') ? (
                                <MapPin className="w-3.5 h-3.5" />
                            ) : project.impact.toLowerCase().includes('resume') || project.impact.toLowerCase().includes('ats') ? (
                                <FileText className="w-3.5 h-3.5" />
                            ) : (
                                <Layout className="w-3.5 h-3.5" />
                            )}
                            <span className="truncate">{project.impact}</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Glow Line */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"
                    style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                />
            </motion.div>
        </motion.div>
    );
};

export default function ProjectExperience() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, idx) => (
                        <ProjectCard key={project.id} project={project} index={idx} />
                    ))}
                </div>

                {/* View All Projects Link */}
                <motion.div variants={fadeInUp} className="mt-16 text-center">
                    <a
                        href="https://github.com/Zaheen06"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-1"
                    >
                        View more on GitHub
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
