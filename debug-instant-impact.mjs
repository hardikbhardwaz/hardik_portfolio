import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6500)); 
        
        // 1. Hover just before impact (yRatio ~ 1.05)
        await page.evaluate(() => {
            const terminal = document.getElementById('terminal-box');
            if (terminal) {
                const y = terminal.getBoundingClientRect().top + window.scrollY - (window.innerHeight * 1.05);
                window.scrollTo({ top: y, behavior: 'instant' });
            }
        });
        await new Promise(r => setTimeout(r, 600)); 
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_instant_hover.webp' });

        // 2. Exact Millisecond of Impact Spray (yRatio ~ 0.95)
        await page.evaluate(() => {
            const terminal = document.getElementById('terminal-box');
            if (terminal) {
                const y = terminal.getBoundingClientRect().top + window.scrollY - (window.innerHeight * 0.95);
                window.scrollTo({ top: y, behavior: 'instant' });
            }
        });
        await new Promise(r => setTimeout(r, 600)); 
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_instant_impact.webp' });

        console.log("Instant terminal impact screenshots captured.");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
