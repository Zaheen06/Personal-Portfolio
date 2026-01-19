'use client';

import { ReactNode } from 'react';

interface SmoothScrollProps {
    children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    // Using native CSS smooth scrolling instead of Lenis for better performance
    return <div className="scroll-smooth">{children}</div>;
}
