import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6500)); 
        
        // scroll down to experience
        await page.evaluate(() => {
            const exp = document.getElementById('experience');
            if (exp) {
                exp.scrollIntoView({ behavior: 'auto', block: 'center' });
            } else {
                window.scrollBy(0, 3000);
            }
        });
        
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_work_experience.webp' });
        
        console.log("Work Experience screenshot captured.");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
