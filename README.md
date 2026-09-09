# Tanish Mittal – Interactive Portfolio

Welcome to the source code of my personal portfolio. This isn't just a static website; it is an immersive, highly interactive, WebGL-powered narrative experience designed to reflect my focus in Edge AI, Computer Vision, and Generative NLP.

This document serves as a deep dive into the technology stack, architectural decisions, and the "smoke and mirrors" tricks used to build the seamless cyber-aesthetic experience you see on the screen.

## 💻 Tech Stack

*   **Core:** Vanilla HTML5, CSS3, and JavaScript (ES Modules).
*   **Styling:** Tailwind CSS (via CDN during dev, compiled via Vite for production) for rapid, responsive utility classes.
*   **3D Graphics & Rendering:** [Three.js](https://threejs.org/) (r160+) for all WebGL backgrounds, neural network topologies, and particle systems.
*   **Post-Processing:** Three.js UnrealBloomPass and EffectComposer for high-end glowing neon effects.
*   **Animations:** [GSAP (GreenSock)](https://gsap.com/) and ScrollTrigger for buttery smooth, scroll-linked timeline animations.
*   **Build Tool & Bundler:** [Vite](https://vitejs.dev/) to instantly bundle modules, handle asset management (/public directory), and minify code.
*   **CI/CD Pipeline:** GitHub Actions automatically runs 
pm run build on every push to main and deploys the optimized /dist folder to GitHub Pages.

---

## 🎩 The "Tricks" & UX Decisions

Every interaction on this site was meticulously engineered to feel deliberate and immersive. Here is a breakdown of the specific techniques we used:

### 1. The Infinite 3D Particle Storm
Instead of a static background or a heavy looping video, the background consists of **8,000 floating data cubes** rendered via a Three.js InstancedMesh (which requires only a single draw call for massive performance gains).
*   **The Trick:** To prevent "dead zones" when scrolling deep into the site, the particles do not exist in a static box. We wrote a **relative infinite-looping algorithm**. The second a particle drifts behind the physical Z-coordinate of the camera, it instantly teleports 1,800 units *ahead* of the camera and re-randomizes its X and Y coordinates. You can scroll forever, and you will always be physically trapped in the exact center of a dense particle storm.

### 2. Z-Axis Depth Chamber (Scroll Hijacking)
In the #projects section, standard vertical (Y-axis) scrolling is intercepted and converted entirely into **Z-axis depth translation**.
*   **The Trick:** We pinned the section to the viewport (100vh) but gave its container a massive scroll height (700vh). As you scroll, GSAP calculates your scroll progress (0 to 1) and translates the inner 3D container mathematically: 	ranslate3d(0px, 0px, px). It creates a perfectly straight bullet trajectory that flies exactly 8,300 units deep, stopping precisely at the final GitHub card without any awkward gaps.

### 3. Real-Time ASCII Profile Canvas
The hero section features a profile picture that looks like a terminal printout. This is not a pre-rendered image!
*   **The Trick:** We draw a standard .png onto a hidden, off-screen HTML5 <canvas>. We then extract the raw pixel array, calculate the luminance (0.2126*r + 0.7152*g + 0.0722*b) of every single pixel, and map that brightness to a string of ASCII characters (ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!).
*   **Layout Integrity:** To prevent the canvas from warping, the rendering math strictly bounds the canvas.width to the aspect ratio of the generated characters (accounting for a monospace font's ~0.6 width-to-height ratio). 

### 4. Cyber Text Scramble (Decoder Effect)
When the page loads (or when you hover your mouse over the title), the "TANISH MITTAL" text scrambles through random characters before settling on the real name.
*   **The Trick:** A setInterval loop replaces the text node with randomized strings, steadily unlocking the correct letters from left to right using a fractional iteration step.
*   **Layout Integrity:** Because scrambling characters can have micro-pixel width differences, the text previously caused the entire Flexbox layout to literally jitter and squish the ASCII image next to it. We solved this by locking the text container with a lex-1 min-w-0 strict CSS boundary. The text can now dance inside its invisible box without ever pushing the DOM layout. We also applied white-space: nowrap; and a negative letter-spacing (-2px) to force the typography into a single, dense, unbroken line.

### 5. Kinematic Ghost Cursor
The standard mouse cursor is hidden and replaced by a primary glowing reticle and four trailing "ghost" nodes.
*   **The Trick:** The ghosts don't just follow the mouse—they use Linear Interpolation (LERP) math (current += (target - current) * speed). By giving each ghost a progressively slower LERP speed (1.0, 0.42, 0.28, etc.), it creates a spectral, lagging drag effect.
*   **Micro-interactions:** When hovering over interactive elements (like project cards), the body gets a .target-locked class. This triggers CSS transitions that scale the reticle, spin its borders, and snap its color from neon green to absolute red. 

### 6. Glow & Post-Processing (Experiences Sub-Pages)
The sub-pages (like Deep Learning and Federated Learning) utilize Three.js UnrealBloomPass to create glowing neural topologies.
*   **The Trick:** Managing color spaces in WebGL is tricky. Forcing the renderer into LinearSRGBColorSpace would crush the emissive neon colors into total blackness. By keeping the sub-pages strictly in standard sRGB mode, the bloom pass accurately captures the emissive thresholds of the materials, making the nodes literally "glow" off the screen.

### 7. Seamless UX & Sidebar Drawer
*   **The Trick:** The mobile hamburger menu opens a right-side drawer. We injected a global document.addEventListener("click") that monitors where the user clicks. If the menu is open, and the user clicks *anywhere* outside of the drawer (or the toggle button), the drawer instantly dismisses itself. It feels natively responsive without forcing the user to find a tiny "X" button.

---

### Booting Locally

1. Clone the repository.
2. Run 
pm install to install Vite and dependencies.
3. Run 
pm run dev to start the local development server.
4. Run 
pm run build to compile the production /dist folder.
