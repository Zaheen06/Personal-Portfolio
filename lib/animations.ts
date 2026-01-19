import { Variants } from 'framer-motion';

// Fade in from bottom
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1],
        },
    },
};

// Fade in
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1],
        },
    },
};

// Scale up
export const scaleUp: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1],
        },
    },
};

// Slide in from left
export const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1],
        },
    },
};

// Slide in from right
export const slideInRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1],
        },
    },
};

// Stagger children
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

// Stagger children faster
export const staggerContainerFast: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
        },
    },
};

// Rotate in
export const rotateIn: Variants = {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: {
        opacity: 1,
        rotate: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1],
        },
    },
};

// Hover scale
export const hoverScale = {
    scale: 1.05,
    transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
};

// Hover lift
export const hoverLift = {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
};

// Page transition
export const pageTransition: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 1.2,
            ease: [0.23, 1, 0.32, 1],
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1],
        },
    },
};
