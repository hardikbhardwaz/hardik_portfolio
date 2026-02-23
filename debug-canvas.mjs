import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Set desktop viewport
  await page.setViewport({ width: 1920, height: 1080 });

  page.on('pageerror', err => {
    console.log(`PAGE ERROR: ${err.message}`);
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`CONSOLE ERROR: ${msg.text()}`);
    }
  });

  try {
    await page.goto('http://localhost:5173/');
    await new Promise(r => setTimeout(r, 2000)); // wait for loader

    await page.mouse.move(500, 500);
    await page.mouse.move(600, 600, { steps: 10 });
    await new Promise(r => setTimeout(r, 1000));

    await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_webgl_context2.webp', fullPage: true });
    console.log('Script completed.');
  } catch (e) {
    console.log('NODE SCRIPT ERROR:', e);
  } finally {
    await browser.close();
  }
})();
