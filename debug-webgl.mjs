import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    page.on('console', msg => {
        if (msg.type() === 'error' || msg.type() === 'warning') {
            console.log(`BROWSER [${msg.type().toUpperCase()}]:`, msg.text());
        }
    });

    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 4500)); 
        
        await page.evaluate(() => {
            window.scrollTo({ top: 1800, behavior: 'instant' });
            const tabs = document.querySelectorAll('button');
            for (let btn of tabs) {
                if (btn.textContent.includes('Graphic Design')) btn.click();
            }
        });
        await new Promise(r => setTimeout(r, 1000));
        
        await page.evaluate(() => {
            const tiles = document.querySelectorAll('.group.relative.h-72');
            if (tiles.length > 0) tiles[0].click();
        });
        
        await new Promise(r => setTimeout(r, 4000));
        
    } catch (e) {
        console.log('PUPPETEER ERROR:', e);
    } finally {
        await browser.close();
    }
})();
