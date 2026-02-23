import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 4000)); 
        
        const loaderHTML = await page.evaluate(() => {
            const loader = document.querySelector('.z-\\[999999\\]');
            return loader ? loader.innerHTML : 'No loader';
        });
        console.log("Loader HTML:", loaderHTML);
    } catch (e) {
        console.log('NODE SCRIPT ERROR:', e);
    } finally {
        await browser.close();
    }
})();
