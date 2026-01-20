import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import FloatingNav from '@/components/FloatingNav';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Mohammad Zaheen | Full Stack Developer',
    description: 'Building fast, scalable, and AI-powered web products that solve real-world problems. View my latest work in Full Stack Development.',
    keywords: ['web development', 'full stack', 'portfolio', 'react', 'next.js', 'AI', 'software engineer'],
    authors: [{ name: 'Mohammad Zaheen' }],
    openGraph: {
        title: 'Mohammad Zaheen | Full Stack Developer',
        description: 'Building fast, scalable, and AI-powered web products that solve real-world problems. View my latest work in Full Stack Development.',
        type: 'website',
    },
    icons: {
        icon: '/icon.png',
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
            <body className="antialiased selection:bg-accent-primary/30 selection:text-white">
                <FloatingNav />

                {/* Global Ambient Background */}
                <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                    {/* Top Right Orb */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[100px] animate-pulse-slow mix-blend-screen transform translate-x-1/2 -translate-y-1/2" />

                    {/* Bottom Left Orb */}
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-[100px] animate-pulse-slow mix-blend-screen transform -translate-x-1/2 translate-y-1/2" style={{ animationDelay: '2s' }} />

                    {/* Middle random orb */}
                    <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-accent-tertiary/5 rounded-full blur-[80px] animate-pulse-slow mix-blend-screen" style={{ animationDelay: '4s' }} />
                </div>

                {children}
            </body>
        </html>
    );
}
