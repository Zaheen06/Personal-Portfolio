'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { personalInfo } from '@/data/portfolio';
import { Send, Github, Linkedin, Twitter } from 'lucide-react';
import { fadeIn, fadeInUp, staggerContainer } from '@/lib/animations';

export default function ChatContact() {
    const [messages, setMessages] = useState([
        { type: 'bot', text: `Hi! I'm ${personalInfo.name}.` },
        { type: 'bot', text: 'I help businesses build high-performance web apps. Tell me about your project!' },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [step, setStep] = useState(0);

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const handleSendMessage = (text = inputValue) => {
        if (!text.trim()) return;

        // Add user message
        const newMessages = [...messages, { type: 'user', text }];
        setMessages(newMessages);
        setInputValue(''); // Clear input immediately

        // Bot responses based on step
        setTimeout(() => {
            if (step === 0) {
                setFormData({ ...formData, name: text });
                setMessages(prev => [...prev, { type: 'bot', text: `Nice to meet you, ${text}! What's your email address?` }]);
                setStep(1);
            } else if (step === 1) {
                setFormData({ ...formData, email: text });
                setMessages(prev => [...prev, {
                    type: 'bot', text: 'Got it. What are you looking to collaborate on?'
                }]);
                setStep(2);
            } else if (step === 2) {
                setFormData({ ...formData, message: text });
                setMessages(prev => [
                    ...prev,
                    { type: 'bot', text: `Thanks! I've received your message about "${text}". I'll get back to you at ${formData.email} soon! 🚀` },
                ]);
                setStep(3);
                // Here you would normally send the form data to your backend/email service
                console.log('Form submitted:', { ...formData, message: text });
            }
        }, 1000);
    };

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20"
            id="contact"
        >
            <motion.div
                className="max-w-5xl mx-auto w-full"
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
            >
                {/* Section Header */}
                <motion.div variants={fadeIn} className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-display font-bold gradient-text mb-4">
                        Let&apos;s Talk
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Have a project in mind? Let&apos;s create something amazing together
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Chat Interface */}
                    <motion.div variants={fadeInUp} className="glass-dark rounded-3xl p-6 md:p-8">
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-neon to-accent-glow flex items-center justify-center font-bold">
                                    {personalInfo.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold">{personalInfo.name}</div>
                                    <div className="text-sm text-text-secondary flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        Usually replies within 24 hours ⏱️
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] px-4 py-3 rounded-2xl ${msg.type === 'user'
                                            ? 'bg-gradient-to-r from-accent-neon to-accent-glow text-bg-dark'
                                            : 'glass text-text-primary'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {step < 3 && messages.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-1 px-4 py-3 glass rounded-2xl w-16"
                                >
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-2 h-2 bg-text-secondary rounded-full"
                                            animate={{ opacity: [0.3, 1, 0.3] }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        {/* Quick Replies for Step 2 */}
                        {step === 2 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex gap-2 flex-wrap mb-4"
                            >
                                {['Freelance Project', 'Internship', 'Collaboration', 'Just saying Hi'].map((reply) => (
                                    <button
                                        key={reply}
                                        onClick={() => handleSendMessage(reply)}
                                        className="px-4 py-2 text-sm bg-accent-primary/10 border border-accent-primary/20 rounded-full text-accent-primary hover:bg-accent-primary hover:text-white transition-all hover:scale-105"
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        {/* Input */}
                        {step < 3 && (
                            <div className="flex gap-2">
                                <input
                                    type={step === 1 ? 'email' : 'text'}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    // Fix: pass no args to use inputValue
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder={
                                        step === 0
                                            ? 'Your name...'
                                            : step === 1
                                                ? 'Your email...'
                                                : 'Your message...'
                                    }
                                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-accent-neon transition-all text-text-primary placeholder:text-text-secondary"
                                />
                                <button
                                    onClick={() => handleSendMessage()}
                                    className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-accent-neon to-accent-glow rounded-full hover:scale-105 transition-transform"
                                >
                                    <Send className="w-5 h-5 text-bg-dark" />
                                </button>
                            </div>
                        )}

                        {step === 3 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-6 glass rounded-2xl"
                            >
                                <div className="text-4xl mb-2">🎉</div>
                                <div className="font-semibold mb-2">Message Sent!</div>
                                <div className="text-sm text-text-secondary">I&apos;ll be in touch soon</div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Contact Info & Social */}
                    <motion.div variants={fadeInUp} className="space-y-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
                        {/* Direct Contact */}
                        <div className="glass-dark rounded-3xl p-6 md:p-8">
                            <h3 className="text-2xl font-display font-bold mb-6">Get in Touch</h3>

                            <div className="space-y-4">
                                <a
                                    href={`mailto:${personalInfo.email}`}
                                    className="block p-4 glass rounded-xl hover:bg-white/10 transition-all group"
                                >
                                    <div className="text-sm text-text-secondary mb-1">Email</div>
                                    <div className="text-text-primary group-hover:text-accent-neon transition-colors">
                                        {personalInfo.email}
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="glass-dark rounded-3xl p-6 md:p-8">
                            <h3 className="text-xl font-display font-bold mb-6">Connect With Me</h3>

                            <div className="flex flex-col gap-3">
                                {personalInfo.social.github && (
                                    <a
                                        href={personalInfo.social.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/10 transition-all group"
                                    >
                                        <div className="p-2 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                                            <Github className="w-5 h-5 text-text-secondary group-hover:text-accent-neon transition-colors" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-text-primary group-hover:text-accent-neon transition-colors">GitHub</div>
                                            <div className="text-xs text-text-secondary">Code & Projects</div>
                                        </div>
                                    </a>
                                )}

                                {personalInfo.social.linkedin && (
                                    <a
                                        href={personalInfo.social.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/10 transition-all group"
                                    >
                                        <div className="p-2 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                                            <Linkedin className="w-5 h-5 text-text-secondary group-hover:text-[#0077b5] transition-colors" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-text-primary group-hover:text-[#0077b5] transition-colors">LinkedIn</div>
                                            <div className="text-xs text-text-secondary">Professional Profile</div>
                                        </div>
                                    </a>
                                )}

                                {personalInfo.social.twitter && (
                                    <a
                                        href={personalInfo.social.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/10 transition-all group"
                                    >
                                        <div className="p-2 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                                            <Twitter className="w-5 h-5 text-text-secondary group-hover:text-[#1DA1F2] transition-colors" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-text-primary group-hover:text-[#1DA1F2] transition-colors">Twitter</div>
                                            <div className="text-xs text-text-secondary">Updates & Thoughts</div>
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div >
        </section >
    );
}
