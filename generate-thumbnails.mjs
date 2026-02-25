import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        
        // 1. Screenshot rsesolution.com
        await page.goto('https://www.rsesolution.com/', { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: '/Users/hardiksharma/Downloads/Portfolio/public/works/rse_solution.jpg', quality: 80 });
        
        // 2. Screenshot clicknbliss.com
        await page.goto('https://www.clicknbliss.com/', { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: '/Users/hardiksharma/Downloads/Portfolio/public/works/clicknbliss.jpg', quality: 80 });

        console.log("Thumbnails generated successfully relative to /public!");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
