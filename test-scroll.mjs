import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log('BROWSER ERROR:', msg.text());
        }
    });
    page.on('pageerror', err => {
        console.log('PAGE ERROR:', err.toString());
    });

    await page.goto('http://localhost:5173/');
    console.log('Page loaded. Simulating scroll...');
    
    // Scroll down 1000px at a time and wait
    for(let i=0; i<9; i++) {
        await page.evaluate(`window.scrollBy(0, 1000)`);
        await new Promise(r => setTimeout(r, 500));
    }
    
    console.log('Scrolled to bottom. Waiting 2s for crash...');
    await new Promise(r => setTimeout(r, 2000));
    
    await browser.close();
})();
