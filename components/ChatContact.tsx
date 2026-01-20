'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { personalInfo } from '@/data/portfolio';
import { Send, Github, Linkedin, Twitter, MessageSquare, Mail, Download, ArrowRight } from 'lucide-react';
import { fadeIn, fadeInUp, staggerContainer } from '@/lib/animations';

export default function ChatContact() {
    const [messages, setMessages] = useState([
        { type: 'bot', text: `Hi! I'm ${personalInfo.name}.` },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [step, setStep] = useState(0);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Initial message delay
    useEffect(() => {
        if (messages.length === 1) {
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, { type: 'bot', text: 'I help businesses build high-performance web apps. Tell me about your project!' }]);
            }, 1500);
        }
    }, [messages.length]);

    const handleSendMessage = (text = inputValue) => {
        if (!text.trim()) return;

        // Add user message
        const newMessages = [...messages, { type: 'user', text }];
        setMessages(newMessages);
        setInputValue(''); // Clear input immediately
        setIsTyping(true);

        // Bot responses based on step
        setTimeout(() => {
            setIsTyping(false);
            if (step === 0) {
                setFormData({ ...formData, name: text });
                setMessages(prev => [...prev, { type: 'bot', text: `Nice to meet you, ${text}! What's your email address so I can get back to you?` }]);
                setStep(1);
            } else if (step === 1) {
                setFormData({ ...formData, email: text });
                setMessages(prev => [...prev, {
                    type: 'bot', text: 'Perfect. What are you looking to collaborate on?'
                }]);
                setStep(2);
            } else if (step === 2) {
                setFormData({ ...formData, message: text });
                setMessages(prev => [
                    ...prev,
                    { type: 'bot', text: `Thanks! I've received your message about "${text}". I'll review it and email you at ${formData.email} within 24 hours! 🚀` },
                ]);
                setStep(3);
                // Here you would normally send the form data to your backend/email service
                console.log('Form submitted:', { ...formData, message: text });
            }
        }, 1500); // Simulate typing delay
    };

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20"
            id="contact"
        >
            <motion.div
                className="max-w-6xl mx-auto w-full"
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

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Chat Interface */}
                    <motion.div variants={fadeInUp} className="glass-dark rounded-3xl p-6 md:p-8 h-[600px] flex flex-col border border-white/5 shadow-2xl relative overflow-hidden">
                        {/* Chat Header */}
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5 z-10">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center font-bold text-white text-lg overflow-hidden">
                                    {personalInfo.name.charAt(0)}
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent-success rounded-full border-2 border-bg-secondary animate-pulse" />
                            </div>
                            <div>
                                <div className="font-bold text-lg">{personalInfo.name}</div>
                                <div className="text-sm text-text-secondary flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-success"></span>
                                    Online • Usually replies &lt; 24h
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-5 py-3.5 rounded-2xl shadow-sm leading-relaxed ${msg.type === 'user'
                                            ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-br-none'
                                            : 'glass bg-white/5 text-text-primary rounded-bl-none border border-white/5'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1.5 items-center">
                                        <div className="w-1.5 h-1.5 bg-text-secondary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-1.5 h-1.5 bg-text-secondary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-1.5 h-1.5 bg-text-secondary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Quick Replies for Step 2 */}
                        {step === 2 && !isTyping && (
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

                        {/* Input Area */}
                        {step < 3 ? (
                            <div className="flex gap-3 items-end bg-black/20 p-2 rounded-[2rem] border border-white/5 backdrop-blur-sm">
                                <input
                                    type={step === 1 ? 'email' : 'text'}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder={
                                        step === 0
                                            ? 'Your name...'
                                            : step === 1
                                                ? 'Your email address...'
                                                : 'Type your message...'
                                    }
                                    className="flex-1 px-6 py-3 bg-transparent border-none focus:ring-0 text-text-primary placeholder:text-text-secondary/50"
                                    disabled={isTyping}
                                    autoFocus
                                />
                                <button
                                    onClick={() => handleSendMessage()}
                                    disabled={!inputValue.trim() || isTyping}
                                    className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${inputValue.trim()
                                        ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-lg hover:scale-105 hover:shadow-accent-primary/25'
                                        : 'bg-white/5 text-text-secondary cursor-not-allowed'
                                        }`}
                                >
                                    <Send className="w-5 h-5 ml-0.5" />
                                </button>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-4 glass rounded-2xl border border-accent-success/20 bg-accent-success/5"
                            >
                                <div className="text-3xl mb-2">🎉</div>
                                <div className="font-bold text-lg gradient-text">Message Sent!</div>
                                <div className="text-sm text-text-secondary">I&apos;ll be in touch with you shortly.</div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Contact Info & Social */}
                    <div className="space-y-6">
                        {/* Direct Contact Card */}
                        <motion.div
                            variants={fadeInUp}
                            className="glass-dark rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-colors group"
                        >
                            <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                                <Mail className="w-6 h-6 text-accent-primary" />
                                Direct Contact
                            </h3>

                            <a
                                href={`mailto:${personalInfo.email}`}
                                className="flex items-center justify-between p-4 glass rounded-xl hover:bg-white/10 transition-all group/email border border-white/5 hover:border-accent-primary/30"
                            >
                                <div>
                                    <div className="text-sm text-text-secondary mb-1">Email Address</div>
                                    <div className="text-lg font-medium text-text-primary group-hover/email:text-accent-primary transition-colors">
                                        {personalInfo.email}
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-text-secondary group-hover/email:text-accent-primary -translate-x-4 opacity-0 group-hover/email:translate-x-0 group-hover/email:opacity-100 transition-all" />
                            </a>

                            <a
                                href="/resume.pdf"
                                target="_blank"
                                className="mt-4 flex items-center justify-between p-4 glass rounded-xl hover:bg-white/10 transition-all group/resume border border-white/5 hover:border-accent-secondary/30"
                            >
                                <div>
                                    <div className="text-sm text-text-secondary mb-1">Curriculum Vitae</div>
                                    <div className="text-lg font-medium text-text-primary group-hover/resume:text-accent-secondary transition-colors">
                                        Download Resume
                                    </div>
                                </div>
                                <Download className="w-5 h-5 text-text-secondary group-hover/resume:text-accent-secondary -translate-x-4 opacity-0 group-hover/resume:translate-x-0 group-hover/resume:opacity-100 transition-all" />
                            </a>
                        </motion.div>

                        {/* Social Links Grid */}
                        <motion.div variants={fadeInUp} className="glass-dark rounded-3xl p-8 border border-white/5">
                            <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                                <MessageSquare className="w-6 h-6 text-accent-secondary" />
                                Connect With Me
                            </h3>

                            <div className="grid gap-3">
                                {personalInfo.social.github && (
                                    <a
                                        href={personalInfo.social.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/10 transition-all group border border-white/5 hover:border-white/20"
                                    >
                                        <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors group-hover:scale-110 duration-300">
                                            <Github className="w-5 h-5 text-text-secondary group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-text-primary group-hover:text-white transition-colors">GitHub</div>
                                            <div className="text-xs text-text-secondary">Explore my code</div>
                                        </div>
                                        <ArrowRight className="ml-auto w-4 h-4 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                    </a>
                                )}

                                {personalInfo.social.linkedin && (
                                    <a
                                        href={personalInfo.social.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/10 transition-all group border border-white/5 hover:border-[#0077b5]/30"
                                    >
                                        <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#0077b5]/20 transition-colors group-hover:scale-110 duration-300">
                                            <Linkedin className="w-5 h-5 text-text-secondary group-hover:text-[#0077b5] transition-colors" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-text-primary group-hover:text-[#0077b5] transition-colors">LinkedIn</div>
                                            <div className="text-xs text-text-secondary">Professional network</div>
                                        </div>
                                        <ArrowRight className="ml-auto w-4 h-4 text-white/20 group-hover:text-[#0077b5] group-hover:translate-x-1 transition-all" />
                                    </a>
                                )}

                                {personalInfo.social.twitter && (
                                    <a
                                        href={personalInfo.social.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/10 transition-all group border border-white/5 hover:border-[#1DA1F2]/30"
                                    >
                                        <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#1DA1F2]/20 transition-colors group-hover:scale-110 duration-300">
                                            <Twitter className="w-5 h-5 text-text-secondary group-hover:text-[#1DA1F2] transition-colors" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-text-primary group-hover:text-[#1DA1F2] transition-colors">Twitter</div>
                                            <div className="text-xs text-text-secondary">Thoughts & updates</div>
                                        </div>
                                        <ArrowRight className="ml-auto w-4 h-4 text-white/20 group-hover:text-[#1DA1F2] group-hover:translate-x-1 transition-all" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div >
        </section >
    );
}
