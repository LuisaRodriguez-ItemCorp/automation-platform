import { chromium } from 'playwright';
import { child_process} from 'child_process';
import path from 'path';

(async () => {
  const port = 8888;
  const reportDir = path.resolve(__dirname, 'allure-report');

  // Start a simple server
  const server = child_process.spawn('npx', ['http-server', reportDir, '-p', port], {
    stdio: 'inherit',
    shell: true
  });

  // Wait for the server to boot
  await new Promise(resolve => setTimeout(resolve, 3000));

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Go to hosted report
  await page.goto(`http://localhost:${port}/index.html`, { waitUntil: 'networkidle' });

  // Wait for a key element to ensure the page has loaded
  await page.waitForSelector('.tree__item', { timeout: 60000 });

  // Save PDF
  await page.pdf({ path: 'allure-report.pdf', format: 'A4' });

  await browser.close();
  server.kill();
})();