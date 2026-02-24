import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6500)); 
        
        // Scroll so the Terminal is ~65% of the way up (yRatio ~ 0.65)
        // This is exactly when the Bubble is bursting flat on the top edge
        // and the DOM waterfall is halfway down the screen.
        await page.evaluate(() => {
            const terminal = document.getElementById('terminal-box');
            if (terminal) {
                const y = terminal.getBoundingClientRect().top + window.scrollY - (window.innerHeight * 0.65);
                window.scrollTo({ top: y, behavior: 'instant' });
            }
        });
        
        await new Promise(r => setTimeout(r, 600)); 
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_waterfall_burst.webp' });
        
        // Scroll so the Terminal is 30% of the way up (fully filled)
        await page.evaluate(() => {
            const terminal = document.getElementById('terminal-box');
            if (terminal) {
                const y = terminal.getBoundingClientRect().top + window.scrollY - (window.innerHeight * 0.30);
                window.scrollTo({ top: y, behavior: 'instant' });
            }
        });
        
        await new Promise(r => setTimeout(r, 600));
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_waterfall_full.webp' });
        
        console.log("Waterfall Submersion screenshots captured.");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
