import re

with open('src/js/main.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove Server Monoliths
monolith_pattern = r'// Server Monoliths[\s\S]*?masterGroup\.add\(m\);\n  \}'
content = re.sub(monolith_pattern, '', content)

# Change numCubes
content = content.replace('const numCubes = 400;', 'const numCubes = 1500;')

# Make particles closer to the path (Z-axis is the scroll axis, X and Y should be tighter)
# Original: const x = (Math.random() - 0.5) * 400;
# We want them to form a denser "tunnel"
content = re.sub(r'const x = \(Math\.random\(\) - 0\.5\) \* 400;', r'const x = (Math.random() - 0.5) * 200;', content)
content = re.sub(r'const y = \(Math\.random\(\) - 0\.5\) \* 100;', r'const y = (Math.random() - 0.5) * 80;', content)
content = re.sub(r'const z = \(Math\.random\(\) - 0\.5\) \* 400;', r'const z = (Math.random() - 0.5) * 500;', content)

# Add constant drift to particles
animate_loop_pattern = r'data\.ry \+= 0\.01;'
drift_replacement = r'data.ry += 0.01;\n      data.z += 0.1;\n      if (data.z > 100) data.z = -400;'
content = re.sub(animate_loop_pattern, drift_replacement, content)

# Make Bloom punchier
content = content.replace('1.2, 0.4, 0.2', '1.8, 0.3, 0.1')

# Ensure color space is correct
if 'LinearSRGBColorSpace' not in content:
    content = content.replace('renderer.setSize(window.innerWidth, window.innerHeight);', 'renderer.setSize(window.innerWidth, window.innerHeight);\n  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;')

with open('src/js/main.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Main.js updated for visual fixes.")
