import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6500)); 
        
        // Scroll to the absolute bottom (100% depth) to trigger the full Liquid Submersion
        await page.evaluate(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
        });
        
        // Wait 2 seconds for the morphing physics to settle and rise
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_liquid_submersion.webp' });
        
        console.log("Terminal Liquid Submersion screenshot captured.");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
