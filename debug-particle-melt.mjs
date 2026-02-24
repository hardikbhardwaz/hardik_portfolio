import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6500)); 
        
        // Scroll to mid-melt (yRatio ~ 0.55) to catch the particles mid-air
        await page.evaluate(() => {
            const terminal = document.getElementById('terminal-box');
            if (terminal) {
                const y = terminal.getBoundingClientRect().top + window.scrollY - (window.innerHeight * 0.55);
                window.scrollTo({ top: y, behavior: 'instant' });
            }
        });
        
        await new Promise(r => setTimeout(r, 600)); 
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_particle_melt.webp' });
        
        console.log("Particle Melt screenshots captured.");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
