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
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
            <body>
                <FloatingNav />
                {children}
            </body>
        </html>
    );
}
