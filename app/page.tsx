'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import EntryExperience from '@/components/EntryExperience';
import HeroIdentity from '@/components/HeroIdentity';
import SkillsOrbit from '@/components/SkillsOrbit';
import ProjectExperience from '@/components/ProjectExperience';
import ChatContact from '@/components/ChatContact';
import Footer from '@/components/Footer';

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

                        <Footer />
                    </>
                )}
            </main>
        </SmoothScroll>
    );
}
