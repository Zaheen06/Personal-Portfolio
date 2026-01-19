# Personal Portfolio

A next-generation personal portfolio website that feels like a living digital identity.

## Features

- 🚀 **Terminal Entry Experience** - Typing animation introduction
- ✨ **Reactive Hero Image** - Parallax effects and glow animations
- 🎯 **Non-Traditional Navigation** - Floating nav with smooth scroll
- 💫 **Interactive Skills** - Category-based skill visualization
- 🎨 **Immersive Projects** - Modal showcases with problem-solution-impact flow
- 💬 **Chat-Style Contact** - Conversational interface for getting in touch
- ⚡ **Buttery Smooth Scrolling** - Lenis integration for premium feel
- 🎭 **Framer Motion Animations** - High-quality micro-interactions

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion
- **Smooth Scroll**: Lenis
- **Typography**: Inter + Space Grotesk (Google Fonts)
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Update your personal information**:
   - Edit `data/portfolio.ts` with your details, skills, and projects
   - Add your profile image to `public/images/profile.jpg`
   - Add project images to `public/images/`

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### Personal Information
Edit `data/portfolio.ts` to update:
- Name, title, bio
- Email and social links (GitHub, LinkedIn, Twitter)
- Skills with categories and descriptions
- Projects with problem-solution-impact details

### Colors & Design
Modify `tailwind.config.ts` and `app/globals.css` to adjust:
- Color palette
- Font families
- Animation timings
- Glassmorphism effects

### Images
- Add your personal photo as `public/images/profile.jpg`
- Add project screenshots/previews
- Update image paths in `data/portfolio.ts`

## Build for Production

```bash
npm run build
npm start
```

## Performance

- Optimized for 90+ Lighthouse score
- GPU-accelerated animations
- Lazy loading and code splitting
- Responsive images with Next.js Image
- Reduced motion support for accessibility

## License

Feel free to use this as a template for your own portfolio!

---

**Designed & Built with ❤️ by Mohammad Zaheen**
# Personal-Portfolio
