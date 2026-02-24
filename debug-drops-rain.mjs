import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6500)); 
        
        // Scroll exactly to 85% depth to trigger both the dissolving Blob and the raining Drops
        await page.evaluate(() => {
            const maxScroll = Math.max(0, document.body.scrollHeight - window.innerHeight);
            window.scrollTo({ top: maxScroll * 0.85, behavior: 'instant' });
        });
        
        // Wait 2 seconds for gravity to pull the drops into the viewport
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_liquid_drops_rain.webp' });
        
        console.log("Terminal Liquid Drops screenshot captured.");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
