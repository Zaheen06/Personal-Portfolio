// Portfolio Data - Update this with your personal information

export const personalInfo = {
    name: "Mohammad Zaheen",
    title: "Full Stack Developer",
    bio: "I design and build intelligent web experiences that push the boundaries of what's possible. Passionate about creating seamless, performant applications with cutting-edge technologies.",
    email: "your.email@example.com",
    social: {
        github: "https://github.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername",
        twitter: "https://twitter.com/yourusername",
    },
    // Add your personal image path here
    imagePath: "/images/profile.jpg",
};

export const skills = [
    {
        name: "React",
        category: "Frontend",
        description: "Building dynamic, responsive user interfaces",
        color: "#61DAFB",
    },
    {
        name: "Next.js",
        category: "Frontend",
        description: "Server-side rendering and static site generation",
        color: "#000000",
    },
    {
        name: "TypeScript",
        category: "Language",
        description: "Type-safe, scalable code architecture",
        color: "#3178C6",
    },
    {
        name: "Node.js",
        category: "Backend",
        description: "Building scalable server applications",
        color: "#339933",
    },
    {
        name: "MongoDB",
        category: "Database",
        description: "NoSQL database design and optimization",
        color: "#47A248",
    },
    {
        name: "Tailwind CSS",
        category: "Styling",
        description: "Rapid UI development with utility-first CSS",
        color: "#06B6D4",
    },
    {
        name: "Framer Motion",
        category: "Animation",
        description: "Creating fluid, performant animations",
        color: "#FF0055",
    },
    {
        name: "PostgreSQL",
        category: "Database",
        description: "Relational database design and queries",
        color: "#4169E1",
    },
    {
        name: "GraphQL",
        category: "API",
        description: "Efficient data fetching and management",
        color: "#E10098",
    },
    {
        name: "Docker",
        category: "DevOps",
        description: "Containerization and deployment",
        color: "#2496ED",
    },
];

export const projects = [
    {
        id: 1,
        title: "AI-Powered Task Manager",
        description: "Intelligent task management with ML-based prioritization and smart scheduling",
        problem: "Traditional task managers lack intelligent prioritization and context awareness",
        solution: "Built an AI-powered system that learns from user behavior to suggest optimal task ordering",
        impact: "Increased user productivity by 40% through intelligent task suggestions",
        technologies: ["Next.js", "OpenAI API", "PostgreSQL", "Prisma", "Tailwind CSS"],
        color: "#6366F1", // Indigo
        demoUrl: "https://example.com",
        githubUrl: "https://github.com/yourusername/project",
        imageUrl: "/images/project1.jpg",
    },
    {
        id: 2,
        title: "Real-Time Collaboration Platform",
        description: "Seamless team collaboration with live editing and instant sync",
        problem: "Teams struggle with delayed updates and version conflicts in collaborative work",
        solution: "Developed real-time synchronization using WebSockets with operational transformation",
        impact: "Reduced collaboration friction by 60% and eliminated version conflicts",
        technologies: ["React", "Socket.io", "Redis", "MongoDB", "Express"],
        color: "#8B5CF6", // Purple
        demoUrl: "https://example.com",
        githubUrl: "https://github.com/yourusername/project",
        imageUrl: "/images/project2.jpg",
    },
    {
        id: 3,
        title: "E-Commerce Analytics Dashboard",
        description: "Real-time analytics and insights for e-commerce businesses",
        problem: "Business owners lack actionable insights from their e-commerce data",
        solution: "Created a comprehensive dashboard with real-time metrics and predictive analytics",
        impact: "Helped businesses increase revenue by 25% through data-driven decisions",
        technologies: ["Next.js", "D3.js", "Python", "FastAPI", "PostgreSQL"],
        color: "#EC4899", // Pink
        demoUrl: "https://example.com",
        githubUrl: "https://github.com/yourusername/project",
        imageUrl: "/images/project3.jpg",
    },
];
