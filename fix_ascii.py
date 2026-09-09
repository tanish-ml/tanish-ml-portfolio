import re

with open('src/js/main.js', 'r', encoding='utf-8') as f:
    content = f.read()

target = '''      const cols = 150;
      const aspect = img.height / img.width;
      const rows = Math.floor(cols * aspect * 0.5);

      const offCanvas = document.createElement("canvas");
      offCanvas.width = cols;
      offCanvas.height = rows;
      const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });
      offCtx.drawImage(img, 0, 0, cols, rows);
      const imgData = offCtx.getImageData(0, 0, cols, rows).data;

      const fontSize = 800 / cols;
      canvas.width = 800;
      canvas.height = rows * fontSize;'''

replacement = '''      const cols = 150;
      const fontAspectRatio = 0.6; // font width is ~0.6 of font height
      const aspect = img.height / img.width;
      const rows = Math.floor(cols * aspect * fontAspectRatio);

      const offCanvas = document.createElement("canvas");
      offCanvas.width = cols;
      offCanvas.height = rows;
      const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });
      offCtx.drawImage(img, 0, 0, cols, rows);
      const imgData = offCtx.getImageData(0, 0, cols, rows).data;

      const fontSize = 800 / cols;
      canvas.width = cols * fontSize * fontAspectRatio;
      canvas.height = rows * fontSize;'''

if target in content:
    content = content.replace(target, replacement)
    with open('src/js/main.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("SUCCESS: Fixed ASCII canvas dimensions")
else:
    print("FAILED: Target not found")
