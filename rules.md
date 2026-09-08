# Rules of Engagement: Portfolio Development & Maintenance

The following 15 rules must be strictly adhered to whenever adding new features, pages, or components to the `tanish-ml.github.io` portfolio repository. These rules ensure a consistent aesthetic, bulletproof performance, and seamless user experience.

## I. Aesthetic & Design (The "Cyberpunk Data Scientist")

1. **Strict Color Palette:** Stick to the neon/dark theme. Backgrounds must be pure deep blacks (`#000000` to `#030508`). Primary text is stark white or muted off-white. Accents MUST be neon green (`#00ffcc` or `#00aa44`) for active/success states, and neon pink (`#ff0055`) for hover/interactive states.
2. **Typography is UI:** Use `font-mono` (Courier New, Fira Code, or similar monospace) for titles, code blocks, labels, and system messages. Use `font-sans` (Inter or similar legible sans-serif) for body text and long descriptions.
3. **No Flat, Dead Elements:** Everything should feel alive. Apply subtle CSS glows (`box-shadow`, `text-shadow`), backdrop blurs (`backdrop-filter: blur()`), and wireframe aesthetics. Elements should pulse, type out, or smoothly fade in.
4. **Tasteful Parallax & 3D (No "Drunk" Physics):** When implementing 3D transforms (`rotateX`, `rotateY`) or GSAP scroll triggers, keep the degrees of rotation subtle (e.g., 2° to 5°). Avoid chaotic, aggressive spinning that makes the user nauseous or the text illegible.
5. **System-Level Microcopy:** Write UI text as if it's a secure mainframe terminal. Use prefixes like `> /sys/` or `INITIATING...` instead of generic marketing copy. Keep the tone sharp, technical, and slightly sci-fi.

## II. Mobile & Responsive Optimization

6. **Mobile-First Layouts:** Never assume a 1080p desktop. Use Tailwind's `md:`, `lg:` prefixes correctly. Components must stack gracefully on small screens (`flex-col md:flex-row`).
7. **Protect the Viewport:** Absolute bounds must be set on cards and containers (e.g., `max-width: 90vw`) to prevent horizontal scrolling on extreme edge-cases like the iPhone SE (320px width). 
8. **Touch-Driven Interaction:** Hover effects don't exist on mobile. Use `@media (hover: none) and (pointer: coarse)` to completely disable ghost cursors, AI companion orbs, and any other desktop-only pointer logic on touch devices.
9. **Conditional Content Rendering:** Be ruthless with mobile real estate. If a feature (like the WebGL Arcade Games) requires a physical keyboard or heavy desktop compute, use Tailwind classes (or JS logic) to hide it completely on mobile.
10. **Touch Targets:** Any interactive element (button, link, toggle) must have a minimum hit area of 44x44 pixels to ensure comfortable tapping on touchscreens.

## III. Web Development Best Practices

11. **Comprehensive SEO Metadata:** Every HTML page must include a unique `<title>`, a compelling `<meta name="description">`, `canonical` URLs matching the root domain, and full Open Graph (`og:`) and Twitter card tags.
12. **Uncompromising Accessibility (a11y):** All UI elements must be keyboard navigable. Provide visible focus states (`:focus-visible`), use semantic HTML (`<main>`, `<nav>`, `<section>`), and ensure decorative elements (like background canvases or ASCII art) are marked with `aria-hidden="true"`.
13. **Progressive Enhancement:** The site's core content must be readable even if JavaScript fails or is slow to load. Use GSAP `from()` animations so that the fallback CSS leaves the element visible if the JS timeline never triggers.
14. **Performance & Asset Loading:** Never block the main thread. Use `requestAnimationFrame` for WebGL/Canvas loops. Defer non-critical scripts, preconnect to CDNs, and keep geometry counts (e.g., Three.js cubes) low enough to maintain 60 FPS on mid-tier devices.
15. **Git Hygiene & Modular Commits:** Never push a massive undocumented ball of mud. Commits must be granular, atomic, and clearly describe the *impact* of the change (e.g., "Fix: Prevent horizontal overflow on project cards for mobile viewports").
