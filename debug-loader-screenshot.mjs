import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6000)); 
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/loader_stuck.webp' });
        
        const loaderInfo = await page.evaluate(() => {
            const progressEl = document.querySelector('.text-6xl.font-black');
            const progress = progressEl ? progressEl.textContent : 'none';
            const logEl = document.querySelector('.flex.flex-col.items-center.gap-2 p:nth-child(2)');
            const log = logEl ? logEl.textContent : 'none';
            const btn = document.querySelector('button');
            const btnText = btn ? btn.textContent : 'none';
            return { progress, log, btnText };
        });
        console.log("Loader State:", loaderInfo);
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
