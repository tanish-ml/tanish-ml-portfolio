import os

depth_chamber_code = """
  // --- DEPTH CHAMBER SCROLL LOGIC ---
  document.addEventListener('scroll', () => {
      const container = document.getElementById("projects");
      const world = document.getElementById("world");
      if (!container || !world) return;

      const rect = container.getBoundingClientRect();
      let progress = 0;
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        progress = Math.abs(rect.top) / (rect.height - window.innerHeight);
      } else if (rect.bottom < window.innerHeight) {
        progress = 1;
      }

      // 3D Depth Fly-through
      const maxZ = 11800; // Fly through the Z-axis
      const currentZ = progress * maxZ;

      // Add a slight "snake" camera wobble
      const camX = Math.sin(progress * Math.PI * 10) * 100;
      const camY = Math.cos(progress * Math.PI * 6) * 50;

      world.style.transform = `translate3d(${camX}px, ${camY}px, ${currentZ}px)`;
  });
"""

with open('src/js/main.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add to DOMContentLoaded
content = content.replace('initHTMLGSAP();', 'initHTMLGSAP();\n  initDepthChamber();')

# Append the function
init_depth_chamber_wrapper = """
function initDepthChamber() {
""" + depth_chamber_code + """
}
"""

with open('src/js/main.js', 'w', encoding='utf-8') as f:
    f.write(content + "\n" + init_depth_chamber_wrapper)

print("Restored Depth Chamber logic")
