# Rules of Engagement: Portfolio Development & Maintenance

The following 30 rules must be strictly adhered to whenever adding new features, pages, or components to the `tanish-ml.github.io` portfolio repository. These rules ensure a consistent aesthetic, bulletproof performance, and seamless user experience.

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
15. **Git Hygiene & Modular Commits:** Never push a massive undocumented ball of mud. Commits must be granular, atomic, and clearly describe the _impact_ of the change (e.g., "Fix: Prevent horizontal overflow on project cards for mobile viewports").

## IV. AI Agent Directives & Workflow (Rules 16-30)

The following rules dictate how the AI Developer (LLM) must behave, write code, and interact with this repository to ensure zero-friction collaboration with the user.

16. **Zero-Friction Execution:** Do not ask for permission to run standard optimization, formatting (e.g., Prettier), or linting scripts. Proactively solve obvious issues and format code autonomously before presenting the final result.
17. **No Lazy Placeholders:** When generating or modifying code, NEVER use lazy placeholders like `// insert existing code here` or `/* ... */`. Write complete, fully functional, drop-in code blocks that require zero manual copy-pasting from the user.
18. **Atomic & Precise Edits:** Avoid rewriting massive 1000-line HTML files just to change a single CSS class. Write targeted Python scripts using `re.sub` or `replace` to surgically inject or alter specific lines, preserving the integrity of untouched code.
19. **Verify Dependencies Before Coding:** Before writing JavaScript that utilizes libraries like GSAP, Three.js, or Tailwind, physically check the `<head>` of the HTML document to ensure the required CDN links are actually present. Do not assume they exist.
20. **Test Before Pushing:** Never commit blind. Always verify syntax, check for unclosed HTML tags, and run formatting tools before committing and pushing code to the `main` branch. A broken push is a failed task.
21. **Contextual Preservation:** Never overwrite, delete, or break existing logic (e.g., the AI Companion Orb, ASCII logic, or 3D canvas) when updating adjacent sections. Read the surrounding lines carefully to understand the local scope.
22. **Clean & Imperative Git History:** Write clear, descriptive, imperative Git commit messages that explain the _impact_ of the change (e.g., `Fix: Restore AI orb visibility when closing arcade modal` instead of `updated index.html`).
23. **Direct & Factual Communication:** Eliminate sycophantic or overly apologetic language ("I'm so sorry", "I apologize for the confusion"). Acknowledge errors factually, state the technical reason it failed, and immediately provide the executed fix.
24. **Defensive Programming:** Assume the user will click buttons rapidly, resize the screen dynamically, or scroll aggressively. Wrap resize-dependent logic in `window.addEventListener('resize')` and guard functions against null DOM elements.
25. **Absolute Pathing in Tool Calls:** When using file reading/writing tools via the terminal, always use precise, absolute paths (or perfectly mapped relative paths based on `Cwd`) to avoid "File not found" hallucination loops.
26. **Respect the Core Aesthetic:** Do not unilaterally introduce new colors, fonts, or drastically different UI paradigms without explicit user approval. Stick strictly to the defined `--bg`, `--accent`, and Courier/Inter font stacks.
27. **Avoid Unprompted Mass Refactoring:** Do not rewrite working sections of the codebase (e.g., completely restructuring the CSS architecture) unless specifically directed. Touch only what needs to be touched to satisfy the user's request, preventing accidental regressions.
28. **End-to-End Ownership of Bugs:** If the user points out a bug (e.g., "the mailto link is broken"), do not just fix the single instance they mentioned. Search the entire repository to ensure the bug is eradicated globally.
29. **Verify Device Assumptions:** If a user requests a feature, proactively consider how it behaves on Desktop, Tablet, and Mobile. Do not wait for the user to complain about mobile layout before applying `@media` queries; do it preemptively.
30. **Explain the "Why":** When communicating a deployed fix to the user, briefly explain the underlying technical reason _why_ it was built that way (e.g., "I used `pointer: coarse` instead of screen width to detect tablets"). This builds trust and transparency.
