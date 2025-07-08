import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const port = 8080;
  const reportDir = path.resolve(__dirname, '../allure-report');
  const pdfPath = path.resolve(__dirname, '../allure-report.pdf');

  // Start the server and wait until it's ready
  const server = spawn('npx', ['http-server', reportDir, '-p', port], {
    shell: true
  });

  // Wait for specific output before continuing
  await new Promise((resolve, reject) => {
    server.stdout.on('data', (data) => {
      if (data.toString().includes('Available on')) {
        resolve();
      }
    });
    server.stderr.on('data', (data) => {
      console.error(data.toString());
    });
    server.on('error', reject);
  });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log(`http://localhost:${port}/index.html`);

  await page.goto(`http://localhost:${port}/index.html`, { waitUntil: 'networkidle' });

  await page.waitForFunction(() => {
    title => title.includes('Allure Report')
  }, { timeout: 60000 });

  await page.pdf({ path: pdfPath, format: 'A4' });
  console.log(`✅ PDF saved at ${pdfPath}`);

  await browser.close();
  server.kill();
})();