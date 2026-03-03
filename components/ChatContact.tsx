'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useInView } from 'react-intersection-observer';
import { personalInfo } from '@/data/portfolio';
import { Send, Github, Linkedin, Twitter, MessageSquare, Mail, Download, ArrowRight, Sparkles, Bot } from 'lucide-react';
import { fadeIn, fadeInUp, staggerContainer } from '@/lib/animations';
import { handleChatMessage } from '@/lib/chatbot';

// ─── Types ──────────────────────────────────────────────────────────────────
type ChatMessage = {
    id: number;
    type: 'bot' | 'user';
    text: string;
};

type ChatPhase = 'collect_name' | 'smart_chat';

// ─── Quick-reply suggestions per phase ─────────────────────────────────────
const SMART_SUGGESTIONS = [
    'What are your skills?',
    'Show me your projects',
    'Are you available for hire?',
    'Tell me a joke! 🤖',
    'What is your work process?',
    'How do I contact you?',
];

// ─── Render message text with **bold** markdown ─────────────────────────────
function renderText(text: string) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
    });
}

let msgIdCounter = 100;
function nextId() { return ++msgIdCounter; }

// ─── Component ───────────────────────────────────────────────────────────────
export default function ChatContact() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 1, type: 'bot', text: `Hi there! 👋 I'm ${personalInfo.name}.` },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [phase, setPhase] = useState<ChatPhase>('collect_name');
    const [userName, setUserName] = useState<string | undefined>(undefined);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

    // Initial greeting sequence
    useEffect(() => {
        if (messages.length === 1) {
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                addBotMessage("Great to meet you! 😊 I'm a smart assistant for this portfolio. First, what's your name?");
            }, 1400);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function addBotMessage(text: string) {
        setMessages(prev => [...prev, { id: nextId(), type: 'bot', text }]);
    }

    function addUserMessage(text: string) {
        setMessages(prev => [...prev, { id: nextId(), type: 'user', text }]);
    }

    function botReply(text: string, delay = 1200) {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            addBotMessage(text);
        }, delay);
    }

    const handleSend = (text = inputValue) => {
        const trimmed = text.trim();
        if (!trimmed || isTyping) return;

        addUserMessage(trimmed);
        setInputValue('');

        if (phase === 'collect_name') {
            // Extract first name
            const firstName = trimmed.split(' ')[0];
            const capped = firstName.charAt(0).toUpperCase() + firstName.slice(1);
            setUserName(capped);

            botReply(
                `Awesome to meet you, ${capped}! ✨ I'm powered by lexical AI rules — I can answer questions about Mohammad Zaheen's skills, projects, experience, availability, and more. What would you like to know?`,
                1400,
            );

            // Small delay before showing suggestions
            setTimeout(() => {
                setPhase('smart_chat');
                setShowSuggestions(true);
            }, 1600);
        } else {
            // Smart Q&A mode — run through lexical rules
            const response = handleChatMessage(trimmed, userName);
            botReply(response, 1100);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
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
                {/* ── Section Header ── */}
                <motion.div variants={fadeIn} className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        Lexical AI Chatbot
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold gradient-text mb-4">
                        Let&apos;s Talk
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Chat with my AI assistant — it knows everything about my skills, projects, and availability
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* ── Chat Window ── */}
                    <motion.div
                        variants={fadeInUp}
                        className="glass-dark rounded-3xl p-6 md:p-8 h-[620px] flex flex-col border border-white/5 shadow-2xl relative overflow-hidden"
                    >
                        {/* Ambient glow */}
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent-secondary/5 rounded-full blur-3xl pointer-events-none" />

                        {/* Chat Header */}
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5 z-10">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center font-bold text-white text-lg">
                                    {personalInfo.name.charAt(0)}
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent-success rounded-full border-2 border-bg-secondary animate-pulse" />
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-lg">{personalInfo.name}</div>
                                <div className="text-sm text-text-secondary flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-success" />
                                    Online • Smart AI Assistant
                                </div>
                            </div>
                            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20">
                                <Bot className="w-3.5 h-3.5 text-accent-primary" />
                                <span className="text-xs text-accent-primary font-medium">AI</span>
                            </div>
                        </div>

                        {/* Messages */}
                        <div
                            ref={messagesContainerRef}
                            className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20"
                            style={{ scrollbarWidth: 'thin' }}
                        >
                            <AnimatePresence initial={false}>
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.25, ease: 'easeOut' }}
                                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {msg.type === 'bot' && (
                                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-xs font-bold mr-2 mt-1 shrink-0">
                                                {personalInfo.name.charAt(0)}
                                            </div>
                                        )}
                                        <div
                                            className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm leading-relaxed text-sm whitespace-pre-line ${msg.type === 'user'
                                                ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-br-none'
                                                : 'glass bg-white/5 text-text-primary rounded-bl-none border border-white/5'
                                                }`}
                                        >
                                            {renderText(msg.text)}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Typing Indicator */}
                            <AnimatePresence>
                                {isTyping && (
                                    <motion.div
                                        key="typing"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 6 }}
                                        className="flex justify-start items-end gap-2"
                                    >
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-xs font-bold shrink-0">
                                            {personalInfo.name.charAt(0)}
                                        </div>
                                        <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1.5 items-center">
                                            <div className="w-2 h-2 bg-accent-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-2 h-2 bg-accent-primary/60 rounded-full animate-bounce" style={{ animationDelay: '160ms' }} />
                                            <div className="w-2 h-2 bg-accent-primary/60 rounded-full animate-bounce" style={{ animationDelay: '320ms' }} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Quick Suggestions */}
                        <AnimatePresence>
                            {showSuggestions && phase === 'smart_chat' && !isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex gap-2 flex-wrap mb-3 overflow-hidden"
                                >
                                    {SMART_SUGGESTIONS.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => {
                                                setShowSuggestions(false);
                                                handleSend(s);
                                            }}
                                            className="px-3 py-1.5 text-xs bg-accent-primary/10 border border-accent-primary/20 rounded-full text-accent-primary hover:bg-accent-primary hover:text-white transition-all hover:scale-105 active:scale-95"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Input */}
                        <div className="flex gap-3 items-center bg-black/20 p-2 rounded-[2rem] border border-white/5 backdrop-blur-sm z-10">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={
                                    phase === 'collect_name'
                                        ? 'Type your name...'
                                        : 'Ask me anything...'
                                }
                                className="flex-1 px-5 py-3 bg-transparent border-none focus:ring-0 text-text-primary placeholder:text-text-secondary/50 text-sm"
                                disabled={isTyping}
                                autoComplete="off"
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={!inputValue.trim() || isTyping}
                                aria-label="Send message"
                                className={`w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 ${inputValue.trim() && !isTyping
                                    ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-lg hover:scale-110 hover:shadow-accent-primary/30'
                                    : 'bg-white/5 text-text-secondary cursor-not-allowed opacity-50'
                                    }`}
                            >
                                <Send className="w-4 h-4 ml-0.5" />
                            </button>
                        </div>
                    </motion.div>

                    {/* ── Right Column ── */}
                    <div className="space-y-6">
                        {/* Direct Contact */}
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
                                    <div className="text-base font-medium text-text-primary group-hover/email:text-accent-primary transition-colors">
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
                                    <div className="text-base font-medium text-text-primary group-hover/resume:text-accent-secondary transition-colors">
                                        Download Resume
                                    </div>
                                </div>
                                <Download className="w-5 h-5 text-text-secondary group-hover/resume:text-accent-secondary -translate-x-4 opacity-0 group-hover/resume:translate-x-0 group-hover/resume:opacity-100 transition-all" />
                            </a>
                        </motion.div>

                        {/* Social Links */}
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
                                        <div className="p-2.5 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors group-hover:scale-110 duration-300">
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
                                        <div className="p-2.5 bg-white/5 rounded-full group-hover:bg-[#0077b5]/20 transition-colors group-hover:scale-110 duration-300">
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
                                        <div className="p-2.5 bg-white/5 rounded-full group-hover:bg-[#1DA1F2]/20 transition-colors group-hover:scale-110 duration-300">
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
            </motion.div>
        </section>
    );
}
