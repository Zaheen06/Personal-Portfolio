'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Palette, Server, Database, Wrench, Code2, Sparkles } from 'lucide-react';

export default function SkillsOrbit() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const skillCategories = [
        {
            name: 'Frontend Development',
            icon: Palette,
            gradient: 'from-blue-500 to-cyan-500',
            skills: [
                { name: 'React', level: 'Advanced', progress: 90 },
                { name: 'Next.js', level: 'Advanced', progress: 90 },
                { name: 'TypeScript', level: 'Intermediate', progress: 70 },
                { name: 'Tailwind CSS', level: 'Advanced', progress: 90 },
            ]
        },
        {
            name: 'Backend Development',
            icon: Server,
            gradient: 'from-green-500 to-emerald-500',
            skills: [
                { name: 'Node.js', level: 'Intermediate', progress: 70 },
                { name: 'Express.js', level: 'Intermediate', progress: 70 },
                { name: 'RESTful APIs', level: 'Advanced', progress: 90 },
            ]
        },
        {
            name: 'Database & Storage',
            icon: Database,
            gradient: 'from-purple-500 to-pink-500',
            skills: [
                { name: 'PostgreSQL', level: 'Intermediate', progress: 70 },
                { name: 'MongoDB', level: 'Intermediate', progress: 70 },
                { name: 'Prisma ORM', level: 'Intermediate', progress: 70 },
            ]
        },
        {
            name: 'DevOps & Tools',
            icon: Wrench,
            gradient: 'from-orange-500 to-red-500',
            skills: [
                { name: 'Docker', level: 'Learning', progress: 50 },
                { name: 'Git & GitHub', level: 'Advanced', progress: 90 },
                { name: 'Vercel/Netlify', level: 'Advanced', progress: 90 },
            ]
        },
        {
            name: 'Programming Languages',
            icon: Code2,
            gradient: 'from-yellow-500 to-amber-500',
            skills: [
                { name: 'JavaScript', level: 'Advanced', progress: 90 },
                { name: 'TypeScript', level: 'Intermediate', progress: 70 },
                { name: 'Python', level: 'Intermediate', progress: 70 },
                { name: 'SQL', level: 'Intermediate', progress: 70 },
            ]
        },
    ];

    const getLevelStyle = (level: string) => {
        switch (level) {
            case 'Advanced':
                return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
            case 'Intermediate':
                return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
            case 'Learning':
                return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
            case 'Exploring':
                return 'bg-green-500/10 border-green-500/30 text-green-400';
            default:
                return 'bg-white/10 border-white/30 text-white';
        }
    };

    const getProgressColor = (level: string) => {
        switch (level) {
            case 'Advanced':
                return 'from-blue-500 to-cyan-500';
            case 'Intermediate':
                return 'from-purple-500 to-pink-500';
            case 'Learning':
                return 'from-orange-500 to-red-500';
            case 'Exploring':
                return 'from-green-500 to-emerald-500';
            default:
                return 'from-white to-gray-400';
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section
            ref={ref}
            className="relative min-h-screen py-20 overflow-hidden"
            id="skills"
        >
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Orbiting Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/5 rounded-full animate-[spin_80s_linear_infinite_reverse] opacity-50" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-dashed border-white/5 rounded-full animate-[spin_100s_linear_infinite]" />
                </div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 relative"
                >
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
                        <span className="animate-gradient bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-warm bg-[length:200%_auto] bg-clip-text text-transparent">
                            Skills & Expertise
                        </span>
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        My technical arsenal for building digital products
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {skillCategories.map((category, categoryIndex) => {
                        const Icon = category.icon;
                        return (
                            <motion.div
                                key={category.name}
                                variants={cardVariants}
                                whileHover={{
                                    y: -8,
                                    transition: { duration: 0.3 }
                                }}
                                className="group relative glass-dark rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl"
                            >
                                {/* Category Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-text-primary group-hover:text-white transition-colors">
                                        {category.name}
                                    </h3>
                                </div>

                                {/* Skills List */}
                                <div className="space-y-4">
                                    {category.skills.map((skill, skillIndex) => (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={inView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05, duration: 0.4 }}
                                            className="space-y-2"
                                        >
                                            {/* Skill Name & Badge */}
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-text-primary hover:text-white transition-colors cursor-default">
                                                    {skill.name}
                                                </span>
                                                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md border ${getLevelStyle(skill.level)}`}>
                                                    {skill.level}
                                                </span>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={inView ? { width: `${skill.progress}%` } : {}}
                                                    transition={{
                                                        delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2,
                                                        duration: 0.8,
                                                        ease: "easeOut"
                                                    }}
                                                    className={`h-full bg-gradient-to-r ${getProgressColor(skill.level)} rounded-full shadow-lg`}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Hover Glow Effect */}
                                <div
                                    className={`absolute -inset-0.5 bg-gradient-to-r ${category.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10`}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Legend */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-16 flex flex-wrap justify-center gap-6"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-sm text-text-secondary">Advanced</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <span className="text-sm text-text-secondary">Intermediate</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500" />
                        <span className="text-sm text-text-secondary">Learning</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-sm text-text-secondary">Exploring</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
