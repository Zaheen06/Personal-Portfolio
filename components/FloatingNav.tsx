'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
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
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 100], [0, 1]);
    const y = useTransform(scrollY, [0, 100], [100, 0]);

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => item.href.slice(1));
            const currentSection = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });

            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 hidden md:block" // Increased z-index
        >
            <motion.div
                className="backdrop-blur-md rounded-full px-6 py-3 flex gap-2 border border-white/10 transition-all duration-300"
                style={{
                    backgroundColor: useTransform(scrollY, [0, 50], ["rgba(15, 23, 42, 0.6)", "rgba(15, 23, 42, 0.3)"]), // Fade out background slightly on scroll
                    borderColor: useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)"]),
                    backdropFilter: "blur(12px)" // Constant blur
                }}
            >
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.href.slice(1);

                    return (
                        <motion.button
                            key={item.name}
                            onClick={() => scrollToSection(item.href)}
                            className={`relative px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeSection"
                                    className="absolute inset-0 bg-white/10 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-white/5"
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                >
                                    <div className="absolute bottom-1 left-3 right-3 h-[2px] bg-accent-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                </motion.div>
                            )}
                            <Icon className="w-4 h-4 relative z-10" />
                            <span className="text-sm font-medium relative z-10">{item.name}</span>
                        </motion.button>
                    );
                })}
            </motion.div>
        </motion.nav>
    );
}
