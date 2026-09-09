import re

with open('src/js/main.js', 'r', encoding='utf-8') as f:
    content = f.read()

target = '''    // Add a slight "snake" camera wobble
    const camX = Math.sin(progress * Math.PI * 10) * 100;
    const camY = Math.cos(progress * Math.PI * 6) * 50;

    world.style.transform = 	ranslate3d(px, px, px);'''

replacement = '''    // Straight Z-axis zoom
    world.style.transform = 	ranslate3d(0px, 0px, px);'''

# Need to escape backticks and $ for powershell if we used powershell, but in python string literals it's fine
content = content.replace(target, replacement)

with open('src/js/main.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS")
