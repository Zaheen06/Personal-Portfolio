'use client';

import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initialize

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return scrollProgress;
};
