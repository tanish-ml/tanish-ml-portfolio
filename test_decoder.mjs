import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

const server = spawn('npm.cmd', ['run', 'preview'], { stdio: 'pipe', shell: true });

setTimeout(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle2' });
  
  await browser.close();
  server.kill();
  process.exit(0);
}, 3000);
