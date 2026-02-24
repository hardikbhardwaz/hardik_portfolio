import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6500)); 
        
        // Scroll exactly to 85% to capture the bubble exploding (Distortion/Pop)
        await page.evaluate(() => {
            const maxScroll = Math.max(0, document.body.scrollHeight - window.innerHeight);
            window.scrollTo({ top: maxScroll * 0.82, behavior: 'instant' });
        });
        
        await new Promise(r => setTimeout(r, 500));
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_bubble_burst.webp' });
        
        // Scroll to absolute bottom to capture the Terminal fully submerged by the SVG wave
        await page.evaluate(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
        });
        
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_terminal_water_fill.webp' });
        
        console.log("Terminal Water Fill screenshots captured.");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
