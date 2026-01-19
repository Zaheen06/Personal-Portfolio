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
            style={{ opacity, y }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-40 hidden md:block"
        >
            <motion.div
                className="glass-dark rounded-full px-6 py-3 flex gap-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
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
                                    className="absolute inset-0 bg-white/10 rounded-full"
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
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
