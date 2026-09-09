import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

const server = spawn('npm.cmd', ['run', 'preview'], { stdio: 'pipe', shell: true });

setTimeout(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle2' });
  
  const canvasInfo = await page.evaluate(() => {
    const canvas = document.getElementById('ascii-canvas');
    if (!canvas) return 'Canvas not found';
    
    // Check if it's visible
    const style = window.getComputedStyle(canvas);
    const rect = canvas.getBoundingClientRect();
    
    // Check if it has drawn content by checking some pixel data
    const ctx = canvas.getContext('2d');
    const pixelData = ctx.getImageData(canvas.width/2, canvas.height/2, 1, 1).data;
    
    return {
      width: canvas.width,
      height: canvas.height,
      rectWidth: rect.width,
      rectHeight: rect.height,
      display: style.display,
      visibility: style.visibility,
      pixelAtCenter: Array.from(pixelData)
    };
  });
  
  console.log('Canvas Info:', canvasInfo);
  await browser.close();
  server.kill();
  process.exit(0);
}, 3000);
