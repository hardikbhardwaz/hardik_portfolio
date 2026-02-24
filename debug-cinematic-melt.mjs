import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6500)); 
        
        // 1. Initial Melt (yRatio ~ 0.7) - Water is about 25% up
        await page.evaluate(() => {
            const terminal = document.getElementById('terminal-box');
            if (terminal) {
                const y = terminal.getBoundingClientRect().top + window.scrollY - (window.innerHeight * 0.70);
                window.scrollTo({ top: y, behavior: 'instant' });
            }
        });
        await new Promise(r => setTimeout(r, 600)); 
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_melt_start.webp' });
        
        // 2. Mid Melt (yRatio ~ 0.5) - Water is about 65% up
        await page.evaluate(() => {
            const terminal = document.getElementById('terminal-box');
            if (terminal) {
                const y = terminal.getBoundingClientRect().top + window.scrollY - (window.innerHeight * 0.50);
                window.scrollTo({ top: y, behavior: 'instant' });
            }
        });
        await new Promise(r => setTimeout(r, 600));
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_melt_mid.webp' });

        // 3. Fully Melted (yRatio ~ 0.3) - Water is 100% up
        await page.evaluate(() => {
            const terminal = document.getElementById('terminal-box');
            if (terminal) {
                const y = terminal.getBoundingClientRect().top + window.scrollY - (window.innerHeight * 0.30);
                window.scrollTo({ top: y, behavior: 'instant' });
            }
        });
        await new Promise(r => setTimeout(r, 600));
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_melt_end.webp' });

        console.log("Cinematic Melt screenshots captured.");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
