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

    // Scroll to top on mount and handle URL hash
    useEffect(() => {
        // Remove hash from URL if present
        if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
        }
        // Scroll to top after a short delay to ensure content is rendered
        const timer = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const handleEntryComplete = () => {
        setShowEntry(false);
        // Small delay before showing main content
        setTimeout(() => {
            setShowMain(true);
            // Ensure we scroll to top when main content appears
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 100);
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
