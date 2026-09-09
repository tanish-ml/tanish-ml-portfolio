(function() {
    let frameCount = 0;
    let lastTime = performance.now();
    let droppedFrames = 0;
    let downgraded = false;

    function checkPerformance() {
        if (downgraded) return;

        const now = performance.now();
        frameCount++;

        if (now - lastTime >= 1000) {
            const fps = frameCount;
            frameCount = 0;
            lastTime = now;

            // If FPS is critically low (< 40)
            if (fps < 40) {
                droppedFrames++;
            } else {
                droppedFrames = 0; // Reset if it recovers
            }

            // 3 consecutive seconds of low FPS triggers silent graphics downgrade
            if (droppedFrames >= 3) {
                downgraded = true;
                console.warn("[Adaptive FPS] Framerate dropped below 40 FPS. Silently degrading graphics to restore buttery smoothness...");
                window.dispatchEvent(new CustomEvent('fpsDowngrade'));
            }
        }
        
        requestAnimationFrame(checkPerformance);
    }
    
    // Delay monitoring start by 4 seconds so the initial heavy page load doesn't trigger a false positive
    setTimeout(() => {
        requestAnimationFrame(checkPerformance);
    }, 4000);
})();
