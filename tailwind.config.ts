import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: {
                    primary: '#0f172a',      // Deep slate
                    secondary: '#1e293b',    // Slate 800
                    tertiary: '#334155',     // Slate 700
                    card: '#1e293b',         // Card background
                },
                accent: {
                    primary: '#3b82f6',      // Vibrant blue
                    secondary: '#8b5cf6',    // Purple
                    success: '#10b981',      // Green
                    warning: '#f59e0b',      // Amber
                    danger: '#ef4444',       // Red
                },
                text: {
                    primary: '#f8fafc',      // Almost white
                    secondary: '#cbd5e1',    // Slate 300
                    muted: '#94a3b8',        // Slate 400
                    inverse: '#0f172a',      // Dark text for light backgrounds
                },
                border: {
                    primary: '#334155',      // Slate 700
                    accent: '#3b82f6',       // Blue
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
            },
            animation: {
                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'breath': 'breath 4s ease-in-out infinite',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { opacity: '0.5' },
                    '50%': { opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                breath: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.02)' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
};

export default config;
