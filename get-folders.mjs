import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('https://drive.google.com/drive/folders/1KM6vicM4uj3BpC3dVwRlLxagabjra9KK?usp=sharing', { waitUntil: 'networkidle2' });
        
        await new Promise(r => setTimeout(r, 5000));
        
        const folders = await page.evaluate(() => {
            const results = {};
            const elements = document.querySelectorAll('div[role="row"]');
            for (let el of elements) {
                const label = el.getAttribute('aria-label');
                if (label && label.includes('Folder')) {
                    const name = label.split(' ')[0]; // usually "Graphics Folder"
                    // we want to find the ID or href
                    const dataId = el.getAttribute('data-id');
                    if (dataId) {
                        results[label] = `https://drive.google.com/drive/folders/${dataId}?usp=sharing`;
                    }
                }
            }
            return results;
        });
        
        console.log("EXTRACTED_FOLDERS:", JSON.stringify(folders));
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
