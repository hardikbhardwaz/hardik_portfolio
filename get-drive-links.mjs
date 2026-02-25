import puppeteer from 'puppeteer';

(async () => {
    const url = 'https://drive.google.com/drive/folders/1KM6vicM4uj3BpC3dVwRlLxagabjra9KK?usp=sharing';
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        console.log("Navigating to Google Drive...");
        await page.goto(url, { waitUntil: 'networkidle2' });
        
        // Wait for list items to render
        await page.waitForSelector('c-wiz div[role="row"]', { timeout: 15000 }).catch(() => console.log("Timeout waiting for rows"));
        
        // Scroll down a bit to trigger lazy loading if needed
        await page.evaluate(() => window.scrollBy(0, 500));
        await new Promise(r => setTimeout(r, 2000));

        const files = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('c-wiz div[role="row"]'));
            return rows.map(row => {
                const nameEl = row.querySelector('[aria-label]');
                const name = nameEl ? nameEl.getAttribute('aria-label') : 'Unknown';
                // the row usually has an ID attribute or data-id for the file
                const dataId = row.getAttribute('data-id');
                return { name, id: dataId };
            }).filter(f => f.id);
        });

        console.log("\nEXTRACTED FILES:");
        console.log(JSON.stringify(files, null, 2));

    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
