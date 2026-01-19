'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import EntryExperience from '@/components/EntryExperience';
import HeroIdentity from '@/components/HeroIdentity';
import SkillsOrbit from '@/components/SkillsOrbit';
import ProjectExperience from '@/components/ProjectExperience';
import ChatContact from '@/components/ChatContact';

export default function Home() {
    const [showEntry, setShowEntry] = useState(true);
    const [showMain, setShowMain] = useState(false);

    const handleEntryComplete = () => {
        setShowEntry(false);
        // Small delay before showing main content
        setTimeout(() => {
            setShowMain(true);
        }, 600);
    };

    return (
        <SmoothScroll>
            <main className="relative">
                {/* Entry Experience */}
                <AnimatePresence>
                    {showEntry && <EntryExperience onComplete={handleEntryComplete} />}
                </AnimatePresence>

                {/* Main Portfolio Content */}
                {showMain && (
                    <>
                        <HeroIdentity />
                        <SkillsOrbit />
                        <ProjectExperience />
                        <ChatContact />

                        {/* Footer */}
                        <footer className="relative py-12 px-6 text-center border-t border-white/10">
                            <div className="max-w-7xl mx-auto">
                                <p className="text-text-secondary mb-4">
                                    Designed & Built by Mohammad Zaheen
                                </p>
                                <p className="text-sm text-text-secondary/60">
                                    © {new Date().getFullYear()} All rights reserved
                                </p>
                            </div>
                        </footer>
                    </>
                )}
            </main>
        </SmoothScroll>
    );
}
