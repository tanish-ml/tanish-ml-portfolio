with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_render_ascii = """      // --- ASCII ART RENDERING (floating top-right) ---
      const renderASCII = () => {
        // Fixed container in top-right corner
        const container = document.createElement("div");
        container.id = "ascii-floating";
        const width = 250; // base width
        
        Object.assign(container.style, {
          position: "fixed",
          top: "20px",
          right: "20px",
          width: width + "px",
          overflow: "hidden",
          borderRadius: "20px",
          background: "rgba(0,0,0,0.8)",
          boxShadow: "0 0 20px rgba(0,255,102,0.3)",
          zIndex: "1000",
          border: "2px solid rgba(0, 255, 102, 0.3)"
        });

        document.body.appendChild(container);

        // Overlay for the blurred inner edges effect
        const overlay = document.createElement("div");
        Object.assign(overlay.style, {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            boxShadow: "inset 0 0 25px rgba(0,0,0,1)",
            pointerEvents: "none",
            borderRadius: "20px"
        });

        const canvas = document.createElement("canvas");
        canvas.style.display = "block";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        
        container.appendChild(canvas);
        container.appendChild(overlay);

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

          const cols = 100;
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

start_str = "// --- ASCII ART RENDERING (floating top-right) ---"
end_str = "renderASCII();"

start_idx = content.find(start_str)
if start_idx == -1:
    start_str = "// --- ASCII ART RENDERING ---"
    start_idx = content.find(start_str)

end_idx = content.find(end_str, start_idx) + len(end_str)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + new_render_ascii + content[end_idx:]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully updated index.html")
else:
    print("Could not find replacement block")
