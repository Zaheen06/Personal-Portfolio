'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { personalInfo } from '@/data/portfolio';

interface EntryExperienceProps {
    onComplete: () => void;
}

export default function EntryExperience({ onComplete }: EntryExperienceProps) {
    const [showSecondLine, setShowSecondLine] = useState(false);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
                <div className="max-w-4xl px-8 text-center">
                    {/* Terminal-style container */}
                    <div className="glass rounded-lg p-8 md:p-12 font-mono border border-accent-primary/30">
                        {/* First line */}
                        <div className="text-xl md:text-3xl mb-6">
                            <span className="text-accent-primary">$ </span>
                            <TypeAnimation
                                sequence={[
                                    `Hello, I'm ${personalInfo.name}.`,
                                    300,
                                    () => setShowSecondLine(true),
                                ]}
                                wrapper="span"
                                speed={90}
                                className="text-text-primary font-semibold"
                                cursor={!showSecondLine}
                            />
                        </div>

                        {/* Second line */}
                        {showSecondLine && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-lg md:text-2xl mb-8"
                            >
                                <span className="text-accent-secondary">$ </span>
                                <TypeAnimation
                                    sequence={[
                                        'I design and build intelligent web experiences.',
                                        500,
                                        () => {
                                            // Wait then trigger unlock
                                            setTimeout(onComplete, 400);
                                        },
                                    ]}
                                    wrapper="span"
                                    speed={90}
                                    className="text-text-secondary"
                                    cursor={true}
                                />
                            </motion.div>
                        )}

                        {/* Loading indicator */}
                        {showSecondLine && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5, duration: 0.4 }}
                                className="flex items-center justify-center gap-2 text-sm text-accent-warm"
                            >
                                <div className="flex gap-1">
                                    <motion.div
                                        className="w-2 h-2 bg-accent-warm rounded-full"
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                                    />
                                    <motion.div
                                        className="w-2 h-2 bg-accent-warm rounded-full"
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                                    />
                                    <motion.div
                                        className="w-2 h-2 bg-accent-warm rounded-full"
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                                    />
                                </div>
                                <span>Initiating experience...</span>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
