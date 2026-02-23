import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    try {
        await page.goto('http://localhost:5173/');
        // Wait for loader
        await new Promise(r => setTimeout(r, 6500)); 
        
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_askmeanything_pulse.webp' });
        
        console.log("Ask Me Anything Pulse screenshot captured.");
        
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
