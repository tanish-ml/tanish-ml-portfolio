import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_render_ascii = """      // --- ASCII ART RENDERING (floating top-right) ---
      const renderASCII = () => {
        // Fixed container in top-right corner
        const container = document.createElement("div");
        container.id = "ascii-floating";
        const width = 300; // base width
        
        Object.assign(container.style, {
          position: "fixed",
          top: "20px",
          right: "20px",
          width: width + "px",
          overflow: "hidden",
          borderRadius: "16px",
          filter: "blur(0.5px)",
          background: "rgba(0,0,0,0.6)",
          boxShadow: "0 0 15px rgba(0,255,102,0.4)",
          zIndex: "1000",
          border: "1px solid rgba(0, 255, 102, 0.2)",
          transition: "filter 0.3s ease"
        });
        
        // Slightly unblur on hover for cool effect
        container.addEventListener('mouseenter', () => {
          container.style.filter = "blur(0px)";
        });
        container.addEventListener('mouseleave', () => {
          container.style.filter = "blur(0.5px)";
        });

        document.body.appendChild(container);

        const canvas = document.createElement("canvas");
        canvas.style.display = "block";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        container.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        const offCanvas = document.createElement("canvas");
        const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });

        const img = new Image();
        img.onload = () => {
          const aspect = img.height / img.width;
          const cardWidth = width;
          const cardHeight = Math.floor(cardWidth * aspect);

          // Apply aspect ratio height to container
          container.style.height = cardHeight + "px";

          const cols = 120;
          const rows = Math.floor(cols * aspect * 0.5);

          offCanvas.width = cols;
          offCanvas.height = rows;
          offCtx.drawImage(img, 0, 0, cols, rows);
          const imgData = offCtx.getImageData(0, 0, cols, rows).data;

          canvas.width = cardWidth;
          const fontSize = canvas.width / cols;
          canvas.height = rows * fontSize;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.font = `bold ${fontSize}px "Courier New", monospace`;
          ctx.textBaseline = "top";

          const asciiChars = ' .\\\\`^",:;Il!i><~+_-?][}{1)(|\\\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';

          for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
              const idx = (y * cols + x) * 4;
              const r = imgData[idx];
              const g = imgData[idx + 1];
              const b = imgData[idx + 2];
              const brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
              const charIdx = Math.floor(brightness * (asciiChars.length - 1));
              const char = asciiChars[charIdx];

              if (char !== " ") {
                ctx.fillStyle = brightness > 0.6 ? "#ffffff" : brightness > 0.3 ? "#00ff66" : "#008800";
                ctx.fillText(char, x * fontSize * 0.6, y * fontSize);
              }
            }
          }
        };
        img.src = "rsz_image.png";
      };
      renderASCII();"""

# We find the start of the ASCII rendering
pattern = r"// --- ASCII ART RENDERING ---.*?renderASCII\(\);"

# Replace
new_content = re.sub(pattern, new_render_ascii.replace('\\', '\\\\'), content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
    
print("Successfully updated index.html")
