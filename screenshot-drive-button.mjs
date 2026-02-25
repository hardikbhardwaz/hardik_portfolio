import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:5173/');
        // Wait for AILoader and the 4000ms DriveButton timeout
        await new Promise(r => setTimeout(r, 6500)); 
        
        await page.evaluate(() => {
            window.scrollTo({ top: 3000, behavior: 'instant' });
        });
        
        await page.hover('a[href*="drive.google"]');
        await new Promise(r => setTimeout(r, 500)); // wait for hover transition
        
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/global_drive_button.webp' });

        console.log("Global Drive Button Screenshot Taken!");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
