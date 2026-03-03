// lib/chatbot.ts
// Smart lexical rule engine for the portfolio chatbot

import { personalInfo, skills, projects, currentlyExploring } from '@/data/portfolio';

// ─── Intent Definitions ────────────────────────────────────────────────────────

type Intent =
    | 'greeting'
    | 'who_are_you'
    | 'skills'
    | 'frontend'
    | 'backend'
    | 'database'
    | 'projects'
    | 'specific_project'
    | 'experience'
    | 'education'
    | 'contact'
    | 'hire'
    | 'freelance'
    | 'availability'
    | 'social'
    | 'github'
    | 'linkedin'
    | 'email'
    | 'resume'
    | 'learning'
    | 'ai'
    | 'tech_stack'
    | 'location'
    | 'languages'
    | 'frameworks'
    | 'hobbies'
    | 'pricing'
    | 'process'
    | 'strengths'
    | 'weaknesses'
    | 'joke'
    | 'small_talk'
    | 'compliment'
    | 'help'
    | 'thanks'
    | 'goodbye'
    | 'unknown';

// ─── Lexical Rule Definitions ──────────────────────────────────────────────────

interface LexicalRule {
    intent: Intent;
    patterns: RegExp[];
}

const LEXICAL_RULES: LexicalRule[] = [
    {
        intent: 'greeting',
        patterns: [
            /\b(hi|hello|hey|howdy|what'?s up|sup|good (morning|afternoon|evening)|hiya|yo)\b/i,
        ],
    },
    {
        intent: 'thanks',
        patterns: [
            /\b(thanks?|thank you|thx|cheers|appreciate|grateful)\b/i,
        ],
    },
    {
        intent: 'small_talk',
        patterns: [
            /\b(how are you|how'?s it going|what'?s up|how do you do|how are things)\b/i,
        ],
    },
    {
        intent: 'compliment',
        patterns: [
            /\b(cool|awesome|great|nice|good job|impressive|wow|love it|amazing)\b/i,
        ],
    },
    {
        intent: 'goodbye',
        patterns: [
            /\b(bye|goodbye|see ya|later|take care|cya|farewell|peace out)\b/i,
        ],
    },
    {
        intent: 'help',
        patterns: [
            /\b(help|what can you (do|answer|tell)|options|commands|menu|show me|guide)\b/i,
        ],
    },
    {
        intent: 'who_are_you',
        patterns: [
            /\b(who (are you|is zaheen|is mohammad)|about (you|yourself|him)|tell me about|introduce|bio|background|describe yourself)\b/i,
        ],
    },
    {
        intent: 'skills',
        patterns: [
            /\b(skills?|technologies|tech|stack|what (can|do) you (know|build|use)|expertise|proficient|tools?)\b/i,
        ],
    },
    {
        intent: 'languages',
        patterns: [
            /\b(languages?|programming languages?|typescript|javascript|python|c\+\+|java)\b/i,
        ],
    },
    {
        intent: 'frameworks',
        patterns: [
            /\b(frameworks?|libraries|react|next\.?js|vue|angular|express|django)\b/i,
        ],
    },
    {
        intent: 'frontend',
        patterns: [
            /\b(front[- ]?end|ui|user interface|tailwind|css|html|design)\b/i,
        ],
    },
    {
        intent: 'backend',
        patterns: [
            /\b(back[- ]?end|server|node\.?js|api|rest|express|python|django|fastapi)\b/i,
        ],
    },
    {
        intent: 'database',
        patterns: [
            /\b(database|db|sql|postgres|postgresql|mongo|mongodb|supabase|redis|storage|data)\b/i,
        ],
    },
    {
        intent: 'ai',
        patterns: [
            /\b(ai|artificial intelligence|machine learning|ml|gemini|openai|gpt|llm|generative|nlp)\b/i,
        ],
    },
    {
        intent: 'projects',
        patterns: [
            /\b(projects?|portfolio|work|built|created|apps?|applications?|demos?|showcase)\b/i,
        ],
    },
    {
        intent: 'specific_project',
        patterns: [
            /\b(expense|guru|quiz|quiznest|roadside|rescue|resume|pilot|infinity|group)\b/i,
        ],
    },
    {
        intent: 'experience',
        patterns: [
            /\b(experience|years?|worked|career|professional|job|role|position|history)\b/i,
        ],
    },
    {
        intent: 'education',
        patterns: [
            /\b(education|degree|college|university|study|studies|student|academic|school|certif)\b/i,
        ],
    },
    {
        intent: 'hire',
        patterns: [
            /\b(hire|hiring|available|work together|collaborate|opportunity|join|onboard|recruit)\b/i,
        ],
    },
    {
        intent: 'freelance',
        patterns: [
            /\b(freelance|freelancer|contract|gig|part.?time|remote|project basis)\b/i,
        ],
    },
    {
        intent: 'availability',
        patterns: [
            /\b(available|availability|when|open to|looking for|currently|status)\b/i,
        ],
    },
    {
        intent: 'location',
        patterns: [
            /\b(where|location|city|country|based in|timezone|live)\b/i,
        ],
    },
    {
        intent: 'pricing',
        patterns: [
            /\b(price|pricing|cost|rate|rates|charge|budget|estimate|how much)\b/i,
        ],
    },
    {
        intent: 'process',
        patterns: [
            /\b(process|workflow|steps|how do you work|approach|methodology|agile)\b/i,
        ],
    },
    {
        intent: 'strengths',
        patterns: [
            /\b(strengths?|best at|good at|excel at|superpower)\b/i,
        ],
    },
    {
        intent: 'weaknesses',
        patterns: [
            /\b(weakness(?:es)?|bad at|struggle with|fail)\b/i,
        ],
    },
    {
        intent: 'hobbies',
        patterns: [
            /\b(hobbies|interests|fun|outside (of|the)|free time|spare time|like to do)\b/i,
        ],
    },
    {
        intent: 'joke',
        patterns: [
            /\b(joke|funny|laugh|humor|tell me something funny)\b/i,
        ],
    },
    {
        intent: 'contact',
        patterns: [
            /\b(contact|reach|get in touch|connect|message|drop (a|an)? (line|note|mail))\b/i,
        ],
    },
    {
        intent: 'email',
        patterns: [
            /\b(email|e[-]?mail|mail|inbox)\b/i,
        ],
    },
    {
        intent: 'github',
        patterns: [
            /\b(github|git|repo(sitory)?|code|source)\b/i,
        ],
    },
    {
        intent: 'linkedin',
        patterns: [
            /\b(linkedin|linked in|professional network|network)\b/i,
        ],
    },
    {
        intent: 'social',
        patterns: [
            /\b(social|twitter|x\.com|instagram|media|profiles?|handle)\b/i,
        ],
    },
    {
        intent: 'resume',
        patterns: [
            /\b(resume|cv|curriculum vitae|download)\b/i,
        ],
    },
    {
        intent: 'learning',
        patterns: [
            /\b(learning|exploring|studying|currently (into|doing|working on)|new (tech|skills?)|improving)\b/i,
        ],
    },
    {
        intent: 'tech_stack',
        patterns: [
            /\b(tech stack|mern|full.?stack|full stack)\b/i,
        ],
    },
];

// ─── Intent Classifier ─────────────────────────────────────────────────────────

export function classifyIntent(input: string): Intent {
    const trimmed = input.trim().toLowerCase();

    for (const rule of LEXICAL_RULES) {
        for (const pattern of rule.patterns) {
            if (pattern.test(trimmed)) {
                return rule.intent;
            }
        }
    }

    return 'unknown';
}

// ─── Response Generator ────────────────────────────────────────────────────────

function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

const frontendSkills = skills.filter(s => s.category === 'Frontend');
const backendSkills = skills.filter(s => s.category === 'Backend');
const dbSkills = skills.filter(s => s.category === 'Database');
const featuredProjects = projects.filter(p => p.featured);

export function generateBotResponse(intent: Intent, userName?: string): string {
    const name = userName ? `, ${userName}` : '';

    switch (intent) {

        case 'greeting':
            return pickRandom([
                `Hey${name}! 👋 Great to see you here! Ask me anything — my skills, projects, how to hire me, or anything else!`,
                `Hello${name}! 😊 I'm here to answer all your questions about Mohammad Zaheen. What would you like to know?`,
                `Hi there${name}! ✨ What can I help you with today? Ask me about skills, projects, or more!`,
            ]);

        case 'who_are_you':
            return `I'm **${personalInfo.name}** — a ${personalInfo.title}. ${personalInfo.bio} I'm currently exploring ${currentlyExploring.join(' & ')}. 🚀`;

        case 'skills':
            const topSkills = skills.slice(0, 5).map(s => `${s.name} (${s.level})`).join(', ');
            return `Here are some of my core skills 🛠️:\n\n${skills.map(s => `• **${s.name}** — ${s.level} (${s.proficiency}%)`).join('\n')}\n\nAsk me about frontend, backend, or databases specifically!`;

        case 'frontend':
            const fe = frontendSkills.map(s => `• **${s.name}** — ${s.description}`).join('\n');
            return `For frontend, I specialize in:\n\n${fe}\n\nI build fast, beautiful, responsive UIs that users love! ⚡`;

        case 'backend':
            const be = backendSkills.map(s => `• **${s.name}** — ${s.description}`).join('\n');
            return `On the backend, I work with:\n\n${be}\n\nI design scalable APIs and server-side logic. 🖥️`;

        case 'database':
            const db = dbSkills.map(s => `• **${s.name}** — ${s.description}`).join('\n');
            return `For databases, I use:\n\n${db}\n\nI also work with Supabase for real-time and auth! 🗄️`;

        case 'ai':
            return `I'm currently exploring **Generative AI** and have already shipped AI-powered products! 🤖\n\n• Used **Gemini API** in Expense Guru for auto-categorization\n• Built **QuizNest** — converts notes to AI-generated quizzes\n• Exploring LLM integrations and prompt engineering`;

        case 'tech_stack':
            return `My full-stack is:\n\n⚡ **Frontend**: React, Next.js, Tailwind CSS, TypeScript\n🖥️ **Backend**: Node.js, REST APIs\n🗄️ **Database**: PostgreSQL, MongoDB, Supabase\n🚢 **DevOps**: Docker, Vercel\n🤖 **AI**: Gemini API`;

        case 'projects':
            const projectList = projects.map(p => `• **${p.title}** — ${p.description}`).join('\n');
            return `Here are some of my featured projects 🚀:\n\n${projectList}\n\nYou can ask me for more details about a specific project!`;

        case 'specific_project':
            // Instead of dumping all, encourage them to ask about a single one, or show a random detail
            const p = pickRandom(projects);
            return `One of my favorites is **${p.title}** 🔗\n\n**Problem**: ${p.problem}\n**Solution**: ${p.solution}\n**Tech Stack**: ${p.technologies.join(', ')}\n\n_${p.impact}_\n\nIf you want to know about another project, just mention its name!`;

        case 'experience':
            return `I'm a passionate Full Stack Developer with experience building end-to-end web applications. I've shipped **5+ production apps** across expense tracking, education, emergency services, and more. Each project tackles real-world problems with scalable, AI-powered solutions. 💼`;

        case 'education':
            return `I'm a self-driven developer who has built real-world products rather than just studying theory. I've honed my skills through hands-on projects, building with modern stacks like Next.js, Node.js, PostgreSQL, and AI APIs. 🎓`;

        case 'hire':
            return `I'm **open to opportunities**! 🌟 Whether it's a full-time role, freelance project, or collaboration — let's talk!\n\nBest way to reach me:\n📧 ${personalInfo.email}\n💼 ${personalInfo.social.linkedin}`;

        case 'freelance':
            return `Yes, I do **freelance projects**! 🤝 I've built production-ready apps for clients like **Infinity Group** (with full backend and CMS). If you have a project in mind, drop me an email at **${personalInfo.email}** and let's discuss!`;

        case 'availability':
            return `I'm currently **available for freelance work and full-time opportunities**! 🟢 I can start on new projects right away. Reach out at ${personalInfo.email} and I'll reply within 24 hours!`;

        case 'contact':
            return `You can reach me through:\n\n📧 **Email**: ${personalInfo.email}\n💼 **LinkedIn**: ${personalInfo.social.linkedin}\n🐙 **GitHub**: ${personalInfo.social.github}\n🐦 **Twitter**: ${personalInfo.social.twitter}\n\nI typically reply within 24 hours! ⚡`;

        case 'email':
            return `My email address is 📧 **${personalInfo.email}**. Feel free to drop me a message and I'll reply within 24 hours!`;

        case 'github':
            return `Check out my GitHub 🐙: **${personalInfo.social.github}**\n\nYou'll find all my open-source projects, contributions, and code samples there!`;

        case 'linkedin':
            return `Connect with me on LinkedIn 💼: **${personalInfo.social.linkedin}**\n\nLet's grow our professional network!`;

        case 'social':
            return `Here are all my social profiles 🌐:\n\n🐙 **GitHub**: ${personalInfo.social.github}\n💼 **LinkedIn**: ${personalInfo.social.linkedin}\n🐦 **Twitter**: ${personalInfo.social.twitter}`;

        case 'resume':
            return `You can download my **Resume/CV** right here on the page! 📄 Click the **"Download Resume"** button on the right side, or visit my LinkedIn for the latest version.`;

        case 'learning':
            return `I'm currently exploring ✨:\n\n🤖 **${currentlyExploring[0]}** — Working with LLMs, Gemini API, and AI-powered products\n🔌 **${currentlyExploring[1]}** — Real-time communication for live apps\n\nAlways excited to add new tools to my arsenal!`;

        case 'thanks':
            return pickRandom([
                `You're welcome${name}! 😊 Feel free to ask anything else!`,
                `Happy to help${name}! ✨ Is there anything else you'd like to know?`,
                `Anytime${name}! 🚀 Got more questions? Fire away!`,
            ]);

        case 'small_talk':
            return pickRandom([
                `I'm doing great, thanks for asking! 😊 Ready to answer more questions about Mohammad Zaheen.`,
                `I'm operating at 100% capacity and feeling excellent! 🤖 What's on your mind?`,
                `All silicon and circuits are functioning perfectly! I'm here to help you get to know Mohammad better.`,
            ]);

        case 'compliment':
            return pickRandom([
                `Thank you so much! That means a lot. 💙 If you like what you see, we should definitely chat about working together!`,
                `I appreciate the kind words! ✨ Mohammad worked hard on this portfolio.`,
                `You're too kind! 😊 I'm blushing (if code could blush).`,
            ]);

        case 'location':
            return `I'm based remotely and am comfortable working across various time zones to ensure seamless collaboration! 🌍 I primarily communicate via Email, Slack/Discord, or video calls.`;

        case 'languages':
            return `I primarily code in **TypeScript** and **JavaScript** for both frontend and backend development. 📝 I'm also familiar with languages like Python and C++ for specific use-cases and algorithms.`;

        case 'frameworks':
            return `My go-to frameworks are **Next.js** and **React** for building blazing fast user interfaces, and **Node.js / Express** for robust backend APIs. ⚛️ I also heavily use **Tailwind CSS** for styling!`;

        case 'pricing':
            return `My rates vary depending on the scope, complexity, and timeline of the project. 💰\n\nThe best way to get an accurate estimate is to email me at **${personalInfo.email}** with some details about your project, and we can discuss from there!`;

        case 'process':
            return `My standard workflow for projects goes like this 🛠️:\n\n1️⃣ **Discovery**: Understanding your requirements and goals\n2️⃣ **Design & Architecture**: Planning the database schema, UI/UX, and tech stack\n3️⃣ **Development**: Iterative coding with regular updates\n4️⃣ **Testing & Polish**: Ensuring responsiveness, SEO, and squash bugs\n5️⃣ **Deployment & Handoff**: Launching the app smoothly!`;

        case 'strengths':
            return `I'd say my core strengths are:\n\n🔥 **Full-Stack Proficiency**: Getting both Next.js UIs and PostgreSQL databases to sing.\n⚡ **Fast Execution**: I build systems meant to ship quickly without sacrificing architecture.\n🤖 **AI Integrations**: I'm great at wiring up Gemini/OpenAI tools to solve real problems.`;

        case 'weaknesses':
            return `While I can handle full-stack, I'm more of an engineer than an illustrator! 🎨 I rely on strong UI design systems, component libraries, and tools like Tailwind rather than drawing custom graphics by hand.`;

        case 'hobbies':
            return `When I'm not coding, I love staying updated with the latest in technology, reading up on Generative AI, and working on side projects to learn new tools. 🎮 Continuous learning is a big part of my life!`;

        case 'joke':
            return pickRandom([
                `Why do programmers prefer dark mode?\n\nBecause light attracts bugs! 🐛`,
                `How many programmers does it take to change a light bulb?\n\nNone. It's a hardware problem. 💡`,
                `A SQL query goes into a bar, walks up to two tables and asks...\n\n"Can I join you?" 🍻`,
            ]);

        case 'goodbye':
            return pickRandom([
                `Goodbye${name}! 👋 It was great chatting with you. Hope we get to work together soon! 🚀`,
                `Take care${name}! 😊 Feel free to come back anytime. Cheers! ✨`,
                `See ya${name}! 🤝 Don't hesitate to reach out if you want to collaborate!`,
            ]);

        case 'help':
            return `Here's what you can ask me about 💡:\n\n🛠️ **Skills** — "What skills do you have?"\n🚀 **Projects** — "Show me your projects"\n💼 **Hiring** — "Are you available for hire?"\n🤖 **AI** — "Tell me about your AI experience"\n📧 **Contact** — "How can I contact you?"\n📄 **Resume** — "Download your CV"\n🌐 **Social** — "GitHub or LinkedIn?"\n\nJust ask naturally — I'll understand! 😊`;

        case 'unknown':
        default:
            return pickRandom([
                `Hmm, I'm not sure I caught that${name}. 🤔 Try asking something like:\n• "What are your main skills?"\n• "Show me the projects you've built"\n• "Are you available for work?"`,
                `I didn't quite get that${name}. 😅 You can ask me about Mohammad's **tech stack**, his **work process**, or even ask me to **tell a joke**!`,
                `That's an interesting question, but I'm not sure I have the exact answer for it${name}. 🤷 Some good things to ask are about **experience**, **location**, or **how to contact**!`,
            ]);
    }
}

// ─── Main Chat Handler ─────────────────────────────────────────────────────────

export function handleChatMessage(input: string, userName?: string): string {
    const trimmed = input.trim();

    // Project specific matching (override standard intents if a specific project name is mentioned)
    const lowerInput = trimmed.toLowerCase();
    if (lowerInput.includes('expense guru')) {
        const p = projects.find(proj => proj.title === 'Expense Guru');
        return p ? `Ah, **Expense Guru**! 📊\n\n${p.description}\n\n**Tech**: ${p.technologies.join(', ')}\n**Impact**: ${p.impact}` : generateBotResponse('unknown', userName);
    }
    if (lowerInput.includes('quiznest') || lowerInput.includes('quiz nest')) {
        const p = projects.find(proj => proj.title === 'QuizNest');
        return p ? `**QuizNest** is super cool! 📝\n\n${p.description}\n\n**Tech**: ${p.technologies.join(', ')}\n**Impact**: ${p.impact}` : generateBotResponse('unknown', userName);
    }
    if (lowerInput.includes('roadside rescue')) {
        const p = projects.find(proj => proj.title === 'Roadside Rescue');
        return p ? `**Roadside Rescue** 🚗\n\n${p.description}\n\n**Tech**: ${p.technologies.join(', ')}\n**Impact**: ${p.impact}` : generateBotResponse('unknown', userName);
    }
    if (lowerInput.includes('resume pilot') || lowerInput.includes('resumepilot')) {
        const p = projects.find(proj => proj.title === 'ResumePilot');
        return p ? `**ResumePilot** 📄\n\n${p.description}\n\n**Tech**: ${p.technologies.join(', ')}\n**Impact**: ${p.impact}` : generateBotResponse('unknown', userName);
    }
    if (lowerInput.includes('infinity group')) {
        const p = projects.find(proj => proj.title === 'Infinity Group');
        return p ? `**Infinity Group** 🏗️\n\n${p.description}\n\n**Tech**: ${p.technologies.join(', ')}\n**Impact**: ${p.impact}` : generateBotResponse('unknown', userName);
    }

    const intent = classifyIntent(trimmed);
    return generateBotResponse(intent, userName);
}
