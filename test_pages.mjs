import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text(), msg.location().url));
  page.on('pageerror', error => console.log('PAGE ERROR:', error));

  console.log("Checking deep-learning...");
  await page.goto('http://localhost:8080/deep-learning-architecture.html', { waitUntil: 'networkidle2' });

  console.log("Checking federated-learning...");
  await page.goto('http://localhost:8080/federated-learning.html', { waitUntil: 'networkidle2' });

  await page.screenshot({path: "screenshot-fed.png"}); await page.goto("http://localhost:8080/deep-learning-architecture.html", {waitUntil: "networkidle2"}); await page.screenshot({path: "screenshot-deep.png"}); await browser.close();
})();
