import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    try {
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6500)); 
        
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_animated_title.webp' });
        
        const titleText = await page.evaluate(() => {
            const el = document.querySelector('.tracking-\\[0\\.2em\\]');
            return el ? el.textContent : 'Not found';
        });
        console.log("Current Animated Title Text:", titleText);
        
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
