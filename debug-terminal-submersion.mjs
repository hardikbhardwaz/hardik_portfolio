import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6500)); 
        
        // Scroll specifically to the Terminal Module
        await page.evaluate(() => {
            const terminal = document.getElementById('terminal-module');
            if (terminal) {
                // Scroll so the terminal is exactly in the center of the viewport
                // This corresponds to yRatio ~ 0.5 (Phase 2: Demon Slayer Burst)
                const y = terminal.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 2) + (terminal.getBoundingClientRect().height / 2);
                window.scrollTo({ top: y, behavior: 'instant' });
            }
        });
        
        await new Promise(r => setTimeout(r, 600)); // Wait for burst geometry to expand
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_terminal_burst.webp' });
        
        // Scroll slightly further to trigger the full Water Fill and confirm the bubble is completely dead (Phase 3)
        await page.evaluate(() => {
            const terminal = document.getElementById('terminal-module');
            if (terminal) {
                // Scroll so terminal hits the top of the viewport (yRatio < 0.3)
                const y = terminal.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'instant' });
            }
        });
        
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_terminal_water_full.webp' });
        
        console.log("Terminal Hero Submersion screenshots captured.");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
