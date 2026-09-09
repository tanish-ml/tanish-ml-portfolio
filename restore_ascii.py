import os

render_ascii_code = """
  // --- ASCII ART RENDERING ---
  const renderASCII = () => {
      const canvas = document.getElementById('ascii-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      const img = new Image();
      img.onload = () => {
          const cols = 150;
          const aspect = img.height / img.width;
          const rows = Math.floor(cols * aspect * 0.5);

          const offCanvas = document.createElement('canvas');
          offCanvas.width = cols;
          offCanvas.height = rows;
          const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
          offCtx.drawImage(img, 0, 0, cols, rows);
          const imgData = offCtx.getImageData(0, 0, cols, rows).data;

          const fontSize = 800 / cols;
          canvas.width = 800;
          canvas.height = rows * fontSize;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.font = `bold ${fontSize}px "Courier New", monospace`;
          ctx.textBaseline = 'top';

          const asciiChars = ' .\\\\`^",:;Il!i><~+_-?][}{1)(|\\\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';

          for (let y = 0; y < rows; y++) {
              for (let x = 0; x < cols; x++) {
                  const idx = (y * cols + x) * 4;
                  const r = imgData[idx];
                  const g = imgData[idx+1];
                  const b = imgData[idx+2];
                  const brightness = (0.2126*r + 0.7152*g + 0.0722*b) / 255;
                  const charIdx = Math.floor(brightness * (asciiChars.length - 1));
                  const char = asciiChars[charIdx];

                  if (char !== ' ') {
                      ctx.fillStyle = brightness > 0.6 ? '#ffffff' : (brightness > 0.3 ? '#33ff33' : '#008800');
                      ctx.fillText(char, x * fontSize * 0.6, y * fontSize);
                  }
              }
          }
      };
      img.src = '/rsz_image.png'; // Need absolute path because main.js is inside /src/js
  };
  renderASCII();
"""

with open('src/js/main.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add to DOMContentLoaded
content = content.replace('initHTMLGSAP();', 'initHTMLGSAP();\n  renderASCII();')

# Append the function
with open('src/js/main.js', 'w', encoding='utf-8') as f:
    f.write(content + "\n" + render_ascii_code)

print("Added renderASCII back to main.js")
