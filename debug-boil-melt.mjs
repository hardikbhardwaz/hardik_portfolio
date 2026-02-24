import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6500)); 
        
        // 1. The Boil Phase (yRatio ~ 0.75 -> meltProgress ~ 0.15)
        await page.evaluate(() => {
            const terminal = document.getElementById('terminal-box');
            if (terminal) {
                const y = terminal.getBoundingClientRect().top + window.scrollY - (window.innerHeight * 0.75);
                window.scrollTo({ top: y, behavior: 'instant' });
            }
        });
        await new Promise(r => setTimeout(r, 600)); 
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_boiling_impact.webp' });
        
        // 2. The Slow Rain Phase (yRatio ~ 0.50 -> meltProgress ~ 0.65 -> shatterProgress ~ 0.5)
        await page.evaluate(() => {
            const terminal = document.getElementById('terminal-box');
            if (terminal) {
                const y = terminal.getBoundingClientRect().top + window.scrollY - (window.innerHeight * 0.50);
                window.scrollTo({ top: y, behavior: 'instant' });
            }
        });
        await new Promise(r => setTimeout(r, 600)); 
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_slow_rain.webp' });

        console.log("Demon Slayer Boil screenshots captured.");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
