import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    try {
        await page.goto('http://localhost:5173/');
        // Wait for loader
        await new Promise(r => setTimeout(r, 6500)); 
        
        // Find the sci-fi hex trigger to open the chat
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            // The last button in the DOM should be our hex trigger
            const hexTrigger = buttons[buttons.length - 1];
            if (hexTrigger) hexTrigger.click();
        });
        
        // Wait for sliding HUD animation
        await new Promise(r => setTimeout(r, 1000)); 
        
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_hud_revised.webp' });
        
        console.log("Sci-Fi HUD screenshot captured.");
        
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
