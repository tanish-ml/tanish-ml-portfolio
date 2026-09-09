import os
import glob

js_files = ['src/js/deep-learning.js', 'src/js/federated-learning.js']

for file in js_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'LinearSRGBColorSpace' not in content:
        content = content.replace('renderer.setSize(window.innerWidth, window.innerHeight);', 'renderer.setSize(window.innerWidth, window.innerHeight);\n  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;\n  renderer.setClearColor(0x010203, 1);')
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Other JS files updated.")
