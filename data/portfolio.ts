// Portfolio Data - Update this with your personal information

export const personalInfo = {
    name: "Mohammad Zaheen",
    title: "Full Stack Developer",
    bio: "I design and build intelligent web experiences that push the boundaries of what's possible. Passionate about creating seamless, performant applications with cutting-edge technologies.",
    email: "mdzaheenattari@gmail.com",
    social: {
        github: "https://github.com/Zaheen06",
        linkedin: "https://linkedin.com/in/Mohammad-Zaheen",
        twitter: "https://twitter.com/Mohammad-Zaheen",
    },
    // Add your personal image path here
    imagePath: "/my_photo.jpg",
};

export const skills = [
    {
        name: "React",
        category: "Frontend",
        description: "Building dynamic, responsive user interfaces",
        color: "#61DAFB",
        usage: "Used in most projects for component-based architecture",
        proficiency: 95,
    },
    {
        name: "Next.js",
        category: "Frontend",
        description: "Server-side rendering and static site generation",
        color: "#000000",
        usage: "Core framework for the Personal Portfolio and SaaS apps",
        proficiency: 90,
    },
    {
        name: "TypeScript",
        category: "Language",
        description: "Type-safe, scalable code architecture",
        color: "#3178C6",
        usage: "Standard language for all modern web applications",
        proficiency: 85,
    },
    {
        name: "Node.js",
        category: "Backend",
        description: "Building scalable server applications",
        color: "#339933",
        usage: "Backend runtime for API services and microservices",
        proficiency: 80,
    },
    {
        name: "MongoDB",
        category: "Database",
        description: "NoSQL database design and optimization",
        color: "#47A248",
        usage: "Primary database for storing unstructured flexible data",
        proficiency: 75,
    },
    {
        name: "Tailwind CSS",
        category: "Styling",
        description: "Rapid UI development with utility-first CSS",
        color: "#06B6D4",
        usage: "Styled the entire Portfolio and Dashboard UI",
        proficiency: 95,
    },
    {
        name: "Framer Motion",
        category: "Animation",
        description: "Creating fluid, performant animations",
        color: "#FF0055",
        usage: "Powered all the animations and transitions in the portfolio",
        proficiency: 85,
    },
    {
        name: "PostgreSQL",
        category: "Database",
        description: "Relational database design and queries",
        color: "#4169E1",
        usage: "Used for complex data relationships and transactions",
        proficiency: 70,
    },
    {
        name: "GraphQL",
        category: "API",
        description: "Efficient data fetching and management",
        color: "#E10098",
        usage: "Optimized data fetching in high-traffic applications",
        proficiency: 65,
    },
    {
        name: "Docker",
        category: "DevOps",
        description: "Containerization and deployment",
        color: "#2496ED",
        usage: "Containerized applications for consistent deployment",
        proficiency: 60,
    },
];

export const projects = [
    {
        id: 1,
        title: "Expense Guru",
        description: "Smart expense tracking system that auto-categorizes expenses and provides monthly insights.",
        problem: "Tracking daily expenses manually is tedious and often lacks meaningful insights for better financial health.",
        solution: "Built a smart tracking system with transparent AI auto-categorization and monthly trend analysis.",
        impact: "Automated categorization and monthly financial insights",
        technologies: ["Next.js", "Node.js", "PostgreSQL", "Supabase", "Gemini API"],
        color: "#10b981", // Emerald
        demoUrl: "https://ai-spend-guru.vercel.app",
        githubUrl: "https://github.com/Zaheen06/Expense-Guru", // Assuming standard pattern or leave generic
        imageUrl: "/projects/expense-guru.png",
    },
    {
        id: 2,
        title: "QuizNest",
        description: "AI-powered quiz platform converting notes and PDFs into structured quizzes with instant evaluation.",
        problem: "Creating quizzes from study notes manually is time-consuming for students and educators.",
        solution: "Developed an AI generator that converts PDFs and notes into MCQs with difficulty control.",
        impact: "Instant quiz generation from notes with evaluation",
        technologies: ["Next.js", "Node.js", "PostgreSQL", "Supabase", "Gemini API"],
        color: "#8b5cf6", // Violet
        demoUrl: "https://ai-quiz-maker-sigma.vercel.app",
        githubUrl: "https://github.com/Zaheen06/QuizNest",
        imageUrl: "/projects/quiznest.png",
    },
    {
        id: 3,
        title: "Roadside Rescue",
        description: "Location-based emergency assistance platform connecting users with nearby mechanics and towing.",
        problem: "Drivers facing breakdowns often struggle to find reliable nearby help quickly and efficiently.",
        solution: "Created a location-aware request system connecting drivers to nearby service providers in real-time.",
        impact: "Enabled location-based emergency help requests",
        technologies: ["Next.js", "Node.js", "PostgreSQL", "Supabase"],
        color: "#ef4444", // Red
        demoUrl: "https://roadside-rescue.vercel.app",
        githubUrl: "https://github.com/Zaheen06/Roadside-Rescue",
        imageUrl: "/projects/roadside-rescue.png",
    },
    {
        id: 4,
        title: "ResumePilot",
        description: "AI-powered builder creating professional, ATS-friendly resumes with intelligent content suggestions.",
        problem: "Job seekers often fail to pass ATS filters due to poor formatting and lack of optimized keywords.",
        solution: "Built an intelligent builder with ATS-friendly templates and smart content suggestions.",
        impact: "Creates ATS-friendly resumes with smart suggestions",
        technologies: ["React", "Node.js", "PostgreSQL", "Supabase"],
        color: "#3b82f6", // Blue
        demoUrl: "https://resume-pilot.vercel.app",
        githubUrl: "https://github.com/Zaheen06/ResumePilot",
        imageUrl: "/projects/resumepilot.png",
    },
    {
        id: 5,
        title: "Infinity Group",
        description: "Professional client website with dynamic content management for a construction company.",
        problem: "The client lacked a modern digital presence to showcase their portfolio and services effectively.",
        solution: "Delivered a fully responsive website with a custom backend for dynamic content management.",
        impact: "Delivered responsive site with dynamic CMS",
        technologies: ["HTML", "CSS", "JavaScript", "PHP", "Supabase"],
        color: "#f59e0b", // Amber
        demoUrl: "https://infinitygroup.tech",
        githubUrl: "https://github.com/Zaheen06", // Generic as no specific repo given
        imageUrl: "/projects/infinity-group.png",
    }
];
