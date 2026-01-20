'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Home, Zap, Briefcase, Mail } from 'lucide-react';

const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'Skills', href: '#skills', icon: Zap },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
];

export default function FloatingNav() {
    const [activeSection, setActiveSection] = useState('home');
    const { scrollYProgress } = useScroll();

    // Smooth progress bar
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => item.href.slice(1));
            const currentSection = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Ideally we want to highlight the section that takes up most of the viewport
                    // or the one currently at the top
                    return rect.top <= 200 && rect.bottom >= 200;
                }
                return false;
            });

            if (currentSection) {
                setActiveSection(currentSection);
            } else {
                // If no section is active, default to home
                setActiveSection('home');
            }
        };

        // Delay the scroll handler to allow initial scroll to top and content to render
        const timer = setTimeout(() => {
            window.addEventListener('scroll', handleScroll);
        }, 1500);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToSection = (href: string) => {
        const element = document.getElementById(href.slice(1));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        >
            <div className="relative">
                <motion.div
                    className="backdrop-blur-xl bg-bg-primary/60 rounded-full px-2 py-2 flex gap-1 border border-white/10 shadow-2xl relative z-10"
                >
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.href.slice(1);

                        return (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item.href)}
                                className={`relative px-5 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 group outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded-full border border-white/10 shadow-[inset_0_0_8px_rgba(255,255,255,0.05)]"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    >
                                        {/* Glow effect for active tab */}
                                        <div className="absolute inset-0 rounded-full bg-accent-primary/5 blur-md" />
                                    </motion.div>
                                )}

                                <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-text-secondary group-hover:text-white'}`}>
                                    <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                                </span>

                                <span className={`text-sm font-medium relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-text-secondary group-hover:text-white'}`}>
                                    {item.name}
                                </span>
                            </button>
                        );
                    })}
                </motion.div>

                {/* Progress Bar Container - Attached to bottom of nav */}
                <div className="absolute -bottom-1 left-4 right-4 h-[2px] rounded-full overflow-hidden bg-white/5 backdrop-blur-sm -z-10 opacity-0 md:opacity-100 transition-opacity">
                    <motion.div
                        className="h-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary"
                        style={{ scaleX, transformOrigin: "0%" }}
                    />
                </div>
            </div>
        </motion.nav>
    );
}
