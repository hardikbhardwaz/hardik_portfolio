import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    await page.setViewport({ width: 375, height: 812, isMobile: true });
    
    // Pipe all page logs back to the terminal
    page.on('console', msg => {
        console.log('BROWSER CONSOLE:', msg.text());
    });
    page.on('pageerror', err => {
        console.log('BROWSER FATAL:', err.toString());
    });

    try {
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 4000));
        
        const metrics = await page.evaluate(() => {
            const appRoot = document.getElementById('root');
            const h1 = document.querySelector('h1');
            const canvas = document.querySelector('canvas');
            const loaderContainer = document.querySelector('div[style*="z-index: 9999999"]');
            
            return {
                rootExists: !!appRoot,
                rootHeight: appRoot ? appRoot.clientHeight : 0,
                h1Exists: !!h1,
                h1Opacity: h1 ? window.getComputedStyle(h1).opacity : 'N/A',
                h1Display: h1 ? window.getComputedStyle(h1).display : 'N/A',
                canvasExists: !!canvas,
                canvasZIndex: canvas ? window.getComputedStyle(canvas).zIndex : 'N/A',
                loaderExists: !!loaderContainer,
                loaderVisible: loaderContainer ? window.getComputedStyle(loaderContainer).display !== 'none' && window.getComputedStyle(loaderContainer).opacity !== '0' : false
            };
        });
        
        console.log('--- DOM METRICS ---', JSON.stringify(metrics, null, 2));
    } catch (e) {
        console.log('NODE SCRIPT ERROR:', e);
    } finally {
        await browser.close();
    }
})();
