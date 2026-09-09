document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lenis for global scroll speed throttling and smoothing
    // We only execute if Lenis is successfully loaded from CDN
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            wheelMultiplier: 0.7, // Globally limits scroll speed to 70%
            smoothWheel: true,
            touchMultiplier: 1, // Keep mobile touch scrolling normal
        });

        // Use native browser RAF for 100% stability
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Sync with GSAP if it exists on the page
        if (typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
        }
    }
});
