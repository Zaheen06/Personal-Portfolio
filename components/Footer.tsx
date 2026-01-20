'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/data/portfolio';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Heart } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'GitHub', icon: Github, url: personalInfo.social.github },
        { name: 'LinkedIn', icon: Linkedin, url: personalInfo.social.linkedin },
        { name: 'Twitter', icon: Twitter, url: personalInfo.social.twitter },
        { name: 'Email', icon: Mail, url: `mailto:${personalInfo.email}` },
    ];

    return (
        <footer className="relative pt-24 pb-12 overflow-hidden border-t border-white/5 bg-bg-secondary">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-secondary/5 rounded-full blur-[128px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    {/* Brand & CTA */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl font-display font-bold mb-6"
                        >
                            Let&apos;s build something <br />
                            <span className="text-white">legendary</span> together.
                        </motion.h2>
                        <p className="text-text-secondary text-lg max-w-md mb-8">
                            Open for freelance opportunities and collaborations. I&apos;m always looking for ambitious projects to contribute to.
                        </p>
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="inline-flex items-center gap-2 text-accent-primary font-medium text-lg hover:text-white transition-colors group"
                        >
                            Start a conversation
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </div>

                    {/* Navigation */}
                    <div className="grid grid-cols-2 gap-8 md:pl-20">
                        <div>
                            <h3 className="text-white font-bold mb-6">Navigation</h3>
                            <ul className="space-y-4">
                                {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <a
                                            href={`#${item.toLowerCase()}`}
                                            className="text-text-secondary hover:text-white transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/0 group-hover:bg-accent-primary transition-colors" />
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-6">Connect</h3>
                            <ul className="space-y-4">
                                {socialLinks.map((link) => (
                                    link.url && (
                                        <li key={link.name}>
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-text-secondary hover:text-white transition-colors flex items-center gap-2 group"
                                            >
                                                <link.icon className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
                                                {link.name}
                                            </a>
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex justify-center items-center text-sm text-text-muted">
                    <p>© {currentYear} {personalInfo.name}. All rights reserved.</p>

                </div>
            </div>
        </footer>
    );
}
