const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// New floating ASCII rendering block (escaped inner backticks)
const newBlock = `// --- ASCII ART RENDERING (floating top-right) ---
const renderASCII = () => {
    // Fixed container in top‑right corner
    const container = document.createElement('div');
    container.id = 'ascii-floating';
    const size = 300; // square size in pixels
    Object.assign(container.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: size + 'px',
        height: size + 'px',
        overflow: 'hidden',
        borderRadius: '12px',
        filter: 'blur(1.5px)',
        background: 'rgba(0,0,0,0.6)',
        boxShadow: '0 0 12px rgba(0,255,102,0.5)',
        zIndex: 1000,
    });
    document.body.appendChild(container);

    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });

    const img = new Image();
    img.onload = () => {
        const aspect = img.height / img.width;
        const cardWidth = size; // keep square container
        const cols = 150;
        const rows = Math.floor(cols * aspect * 0.5);
        offCanvas.width = cols;
        offCanvas.height = rows;
        offCtx.drawImage(img, 0, 0, cols, rows);
        const imgData = offCtx.getImageData(0, 0, cols, rows).data;

        canvas.width = cardWidth;
        const fontSize = canvas.width / cols;
        canvas.height = rows * fontSize;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = \`bold ${fontSize}px "Courier New", monospace\`;
        ctx.textBaseline = 'top';
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
                if (char !== ' ') {
                    ctx.fillStyle = brightness > 0.6 ? '#ffffff' : (brightness > 0.3 ? '#00ff66' : '#008800');
                    ctx.fillText(char, x * fontSize * 0.6, y * fontSize);
                }
            }
        }
    };
    img.src = 'rsz_image.png';
};
renderASCII();`;

// Replace the old ASCII block (search by comment marker)
html = html.replace(/\/\/ --- ASCII ART RENDERING ---[\s\S]*?renderASCII\(\);/, newBlock);
fs.writeFileSync('index.html', html);
console.log('Floating ASCII renderer applied.');
