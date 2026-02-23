import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 4000)); 
        
        console.log("Attempting to click INITIATE SYSTEM...");
        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const btn = btns.find(b => b.textContent.includes('INITIATE SYSTEM'));
            if(btn) {
                console.log("Found button. Emulating real mouse click...");
                btn.click();
            }
        });
        
        await new Promise(r => setTimeout(r, 1000));
        
        const isLoaderRemoved = await page.evaluate(() => {
            const loader = document.querySelector('.z-\\[999999\\]');
            return !loader;
        });
        
        console.log("Loader Unmounted after click?", isLoaderRemoved);
    } catch (e) {
        console.log('NODE SCRIPT ERROR:', e);
    } finally {
        await browser.close();
    }
})();
