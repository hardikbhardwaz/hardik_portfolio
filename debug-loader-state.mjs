import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    try {
        await page.goto('http://localhost:5173/');
        
        await new Promise(r => setTimeout(r, 4000)); 
        
        const loaderState = await page.evaluate(() => {
            const progressEl = document.querySelector('.mix-blend-screen.drop-shadow-\\[0_0_15px_rgba\\(0\\,255\\,208\\,0\\.6\\)\\]');
            const progressText = progressEl ? progressEl.textContent : 'No progress element';
            const button = document.querySelector('button');
            const buttonText = button ? button.textContent : 'No button';
            return { progressText, buttonText };
        });
        console.log("Loader State:", loaderState);
        
    } catch (e) {
        console.log('NODE SCRIPT ERROR:', e);
    } finally {
        await browser.close();
    }
})();
